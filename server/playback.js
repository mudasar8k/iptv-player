'use strict';
// Local development HLS and MP4 relay. Keep backend localhost-only until audited.
const crypto = require('node:crypto');
const net = require('node:net');
const {Readable} = require('node:stream');
const {validPublicIp} = require('./security/destination-policy');
const sessions = new Map();
// 24 hours TTL: Users can pause movie/series for hours without session dropping or expiring
const TTL = 24 * 60 * 60 * 1000;
function err(res,status,message){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify({error:message}));}
function allowed(u,root){return u.origin===root.origin && ['http:','https:'].includes(u.protocol) && !u.username && !u.password;}
function createPath(account,section,id,decrypt,movieExtension){
  const base=account.host.replace(/\/+$/,'');
  const user=encodeURIComponent(account.username);
  const pwd=encodeURIComponent(decrypt(account.secret));
  const ext=section==='live'?'m3u8':movieExtension;
  return new URL(base+'/'+(section==='live'?'live':section==='series'?'series':'movie')+'/'+user+'/'+pwd+'/'+id+'.'+ext);
}
const extCache = new Map();
async function getMovieExtension(account,id,decrypt) {
  const cacheKey = account.id + ':' + String(id);
  const cached = extCache.get(cacheKey);
  if (cached && cached.expires > Date.now()) {
    return cached.ext;
  }

  const endpoint=new URL(
    account.host.replace(/\/+$/,'')+'/player_api.php'
  );
  endpoint.searchParams.set('username',account.username);
  endpoint.searchParams.set('password',decrypt(account.secret));
  endpoint.searchParams.set('action','get_vod_info');
  endpoint.searchParams.set('vod_id',String(id));

  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),8000);

  try {
    const response=await fetch(endpoint,{
      redirect:'error',
      signal:controller.signal,
      headers:{Accept:'application/json'}
    });

    if(!response.ok)throw Error('VOD metadata unavailable');

    const text=await response.text();

    if(text.length>1024*1024){
      throw Error('VOD metadata too large');
    }

    const data=JSON.parse(text);

    const extension=String(
      (data.movie_data && data.movie_data.container_extension) ||
      (data.info && data.info.container_extension) ||
      'mp4'
    ).toLowerCase().replace(/^\./,'');

    const safeExt = ['mp4','mkv','avi','mov','webm'].includes(extension) ? extension : 'mp4';
    extCache.set(cacheKey, { ext: safeExt, expires: Date.now() + 24 * 3600 * 1000 });
    return safeExt;
  } catch(_) {
    // If provider API is slow or times out, default to standard mp4 for instant startup
    return 'mp4';
  } finally {
    clearTimeout(timer);
  }
}
function approvedSegmentHost(url,root) {
  if (!url || !['http:','https:'].includes(url.protocol)) {
    return false;
  }

  if (url.username || url.password) {
    return false;
  }

  if (allowed(url,root)) {
    return true;
  }

  // Allow any valid public IP or public domain, protecting against SSRF (private / internal networks)
  if (net.isIP(url.hostname)) {
    return validPublicIp(url.hostname);
  }

  const host = url.hostname.toLowerCase();
  if (host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local') || host.endsWith('.internal')) {
    return false;
  }

  return true;
}
function register(sess,url){
  if (!approvedSegmentHost(url,sess.root)) return null;
  const key=crypto.randomBytes(12).toString('hex');
  sess.resources.set(key,url);
  return '/api/play/media/'+sess.id+'/'+key;
}
function rewritePlaylist(text,url,sess){
  const lines=text.split(/\r?\n/);
  return lines.map(line=>{
    if (!line.trim()) return line;
    if (line[0]!=='#') {
      try {const dest=new URL(line.trim(),url); const route=register(sess,dest);return route||'# Unsupported external media origin';}
      catch(_){return '# Invalid media reference';}
    }
    return line.replace(/URI="([^"]+)"/g,(_,ref)=>{
      try{const dest=new URL(ref,url);const route=register(sess,dest);return 'URI="'+(route||'/api/play/blocked')+'"';}
      catch(_){return 'URI="/api/play/blocked"';}
    });
  }).join('\n');
}
async function proxy(req,res,url,sess,hops=0){
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),30000);
  try {
    const headers={'Accept':'*/*'};
    if (req.headers.range) headers.Range=req.headers.range;
        console.log('[VLC relay] Fetch starting', {
      protocol: url.protocol,
      pathExtension: url.pathname.split('.').pop().slice(0,8),
      hasRange: Boolean(headers.Range || headers.range)
    });

    let response;
    try {
    response = await fetch(url,{
        redirect:'manual',
        signal:controller.signal,
        headers
      });
    } catch(fetchError) {
      const cause = fetchError.cause || {};
      const knownCodes = [
        'ENOTFOUND','ECONNREFUSED','ECONNRESET','ETIMEDOUT',
        'EAI_AGAIN','ERR_INVALID_URL','ERR_INVALID_ARG_TYPE',
        'UND_ERR_CONNECT_TIMEOUT','UND_ERR_SOCKET',
        'UND_ERR_HEADERS_TIMEOUT'
      ];

      console.error('[VLC relay] Safe error details', {
        fetchErrorName: String(fetchError.name || '').slice(0,40),
        causeErrorName: String(cause.name || '').slice(0,40),
        causeCode: typeof cause.code === 'string'
          ? (cause.code.match(/^[A-Z0-9_]{1,60}$/) ? cause.code : 'unclassified')
          : 'none',
        causeErrno: typeof cause.errno === 'number'
          ? cause.errno : null,
        causeSyscall: typeof cause.syscall === 'string'
          ? (cause.syscall.match(/^[a-zA-Z0-9_]{1,30}$/) ? cause.syscall : 'unclassified')
          : 'none'
      });

      console.error('[VLC relay] Fetch failed', {
        name: fetchError.name === 'TypeError'
          ? 'TypeError' : 'Other',
        causeName: typeof cause.name === 'string'
          ? cause.name.replace(/[^a-zA-Z]/g,'').slice(0,40)
          : 'none',
        code: knownCodes.includes(cause.code)
          ? cause.code : 'unspecified',
        aborted: controller.signal.aborted
      });

      throw fetchError;
    }

    console.log('[VLC relay] Provider response', {
      status: response.status,
      contentType: (response.headers.get('content-type') || '')
        .split(';')[0].slice(0,80)
    });
        if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      let destination = null;

      try {
        if (location) destination = new URL(location, url);
      } catch (_) {}

      console.log('[VLC relay] Redirect details', {
        status: response.status,
        locationPresent: Boolean(location),
        validDestination: Boolean(destination),
        sameOrigin: destination
          ? destination.origin === url.origin : null,
        destinationProtocol: destination
          ? destination.protocol : null,
        destinationHost: destination ? destination.hostname : null,
        destinationPort: destination ? (destination.port || 'default') : null,
        destinationHostChanged: destination
          ? destination.hostname !== url.hostname : null
      });

            const approved =
        destination &&
        destination.protocol === 'http:' &&
        ['45.88.0.17', '45.148.147.103', '103.169.98.234', '94.26.105.4']
          .includes(destination.hostname) &&
        destination.port === '8080' &&
        !destination.username &&
        !destination.password;

      if (!approved) {
        return err(res,403,'Media destination not approved');
      }

      if (hops >= 2) {
        return err(res,502,'Too many redirects');
      }

      if (response.body) await response.body.cancel();

      return proxy(req,res,destination,sess,hops+1);
    }
if(!response.ok && response.status!==206) {
      console.log('[VLC relay] Upstream rejection', {
        status: response.status,
        contentType: (response.headers.get('content-type') || '')
          .split(';')[0].slice(0,60),
        pathExtension: url.pathname.split('.').pop().slice(0,8),
        hasRange: Boolean(req.headers.range)
      });

      return err(res,502,'Provider media request failed');
    }
    const kind=response.headers.get('content-type')||'';
    const isPlaylist=url.pathname.toLowerCase().endsWith('.m3u8')||/mpegurl/i.test(kind);
    if(isPlaylist){
      const buf=[];let total=0;
      for await(const chunk of response.body){total+=chunk.length;if(total>2*1024*1024)throw Error('Playlist too large');buf.push(chunk);}
      const output=rewritePlaylist(Buffer.concat(buf).toString('utf8'),url,sess);
      res.writeHead(200,{'Content-Type':'application/vnd.apple.mpegurl; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
      return res.end(output);
    }
    const replyHeaders={'Content-Type':kind||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Accept-Ranges':'bytes'};
    for(const k of ['content-length','content-range'])if(response.headers.has(k))replyHeaders[k]=response.headers.get(k);
    res.writeHead(response.status,replyHeaders);
    if (!response.body) return res.end();
    Readable.fromWeb(response.body).on('error',()=>res.destroy()).pipe(res);
    res.on('close',()=>{if(!res.writableEnded)controller.abort();});
  } catch(e){
    const safeNames = new Set([
      'TypeError', 'AbortError', 'TimeoutError',
      'Error', 'SyntaxError', 'RangeError'
    ]);
    const safeCodes = new Set([
      'ECONNREFUSED', 'ECONNRESET', 'ETIMEDOUT',
      'ENOTFOUND', 'EAI_AGAIN', 'UND_ERR_CONNECT_TIMEOUT',
      'UND_ERR_HEADERS_TIMEOUT', 'UND_ERR_SOCKET',
      'CERT_HAS_EXPIRED', 'UNABLE_TO_VERIFY_LEAF_SIGNATURE'
    ]);

    const errorName = safeNames.has(e.name) ? e.name : 'Other';
    const rawCode = e.cause && e.cause.code;
    const errorCode = safeCodes.has(rawCode) ? rawCode : 'unspecified';

    console.error('[VLC playback]', {
      errorType: errorName,
      networkCode: errorCode
    });

    if(!res.headersSent){
      err(res,502,'Stream unavailable or unsupported');
    } else {
      res.destroy();
    }
}
  finally{clearTimeout(timer);}
}
async function handle(req,res,url,ctx){
  if(url.pathname.startsWith('/api/play/audio/')) {
    return require('./audio-compat').handle(req,res,url,sessions,ctx);
  }
  if(url.pathname.startsWith('/api/play/compat/')) {
    return require('./compat-transcode').handle(req,res,url,sessions,ctx);
  }
  if(req.method==='GET' &&
     url.pathname.startsWith('/api/play/probe/')){
    return require('./codec-probe').handle(req,res,url,sessions,ctx);
  }
  if(req.method==='POST' && url.pathname==='/api/play/start'){
    const device=ctx.session(req);
    if(!device)return err(res,401,'Device authorization required');
    let body='';
    for await(const chunk of req){body+=chunk;if(body.length>4096)return err(res,413,'Request too large');}
    let b;try{b=JSON.parse(body);}catch(_){return err(res,400,'Invalid request');}
    if(!['live','movies','series'].includes(b.section)||!/^\d{1,16}$/.test(String(b.itemId||'')))return err(res,400,'Invalid playback item');
    if(device.permissions[b.section]!==true||!device.accounts.includes(b.accountId))return err(res,403,'Access denied');
    const account=ctx.db.accounts.find(a=>a.id===b.accountId);
    if(!account)return err(res,404,'Account unavailable');
    let episodeExtension=null;
    if(b.section==='series'){
      if(!/^[0-9]{1,16}$/.test(String(b.seriesId||'')))return err(res,400,'Invalid series selection');
      try{
        const api=require('./series-api');
        const info=await api.seriesInfo(account,b.seriesId,ctx.decryptSecret);
        const episode=api.episodesFrom(info).find(e=>e.id===String(b.itemId));
        if(!episode)return err(res,403,'Episode not part of selected series');
        episodeExtension=episode.extension;
      }catch(_){return err(res,502,'Episode verification unavailable');}
    }
    let source;try{source=createPath(
      account,
      b.section,
      b.itemId,
      ctx.decryptSecret,
      b.section==='series' ? episodeExtension : b.section==='movies'
        ? await getMovieExtension(account,b.itemId,ctx.decryptSecret)
        : null
    );}catch(_){return err(res,502,'Cannot create playback URL');}
    const root=new URL(account.host);
    if(!allowed(source,root))return err(res,403,'Provider origin denied');
    const id=crypto.randomBytes(24).toString('hex');
    const s={id,deviceId:device.id,accountId:account.id,section:b.section,expires:Date.now()+TTL,root,resources:new Map()};
    sessions.set(id,s);
    const route=register(s,source);
    const audioRoute = (b.section==='movies'||b.section==='series')
      ? '/api/play/audio/'+s.id+'/'+route.split('/').pop()
      : null;
    res.writeHead(200,{'Content-Type':'application/json','Cache-Control':'no-store'});
    return res.end(JSON.stringify({
      url: route,
      audioUrl: audioRoute,
      format: b.section==='live'?'hls':'file',
      expiresInSeconds: 900
    }));
  }
  const m=/^\/api\/play\/media\/([a-f0-9]{48})\/([a-f0-9]{24})$/.exec(url.pathname);
  if(req.method==='GET' && m){
    const s=sessions.get(m[1]);
    if(!s || s.expires<Date.now()){sessions.delete(m[1]);return err(res,401,'Playback session expired');}
    // Refresh session expiry sliding window so active/paused playback never expires
    s.expires = Date.now() + TTL;
    const device=ctx.db.devices.find(d=>d.id===s.deviceId);
    if(!device || device.permissions[s.section]!==true || !device.accounts.includes(s.accountId))return err(res,403,'Playback revoked');
    const resource=s.resources.get(m[2]);if(!resource)return err(res,404,'Media resource not found');
    return proxy(req,res,resource,s);
  }
  return err(res,404,'Playback route not found');
}
module.exports={handle};