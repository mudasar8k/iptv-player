'use strict';
const {secureFetch} = require('./secure-fetch');

// VLC IPTV central management. Node.js 22+, zero external packages.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const dbFile = path.join(__dirname, 'data', 'state.json');
const port = Number(process.env.VLC_PORT || 4471);
const host = process.env.VLC_BIND || '127.0.0.1';
const adminKey = process.env.VLC_ADMIN_KEY || '';
const masterKey = process.env.VLC_MASTER_KEY || '';
if (!adminKey || adminKey.length < 24) throw new Error('Set VLC_ADMIN_KEY to a random secret (at least 24 characters).');
if (!/^[0-9a-f]{64}$/i.test(masterKey)) throw new Error('Set VLC_MASTER_KEY to a 64-character hex secret.');
const encKey = Buffer.from(masterKey, 'hex');
fs.mkdirSync(path.dirname(dbFile), {recursive:true});
let db = fs.existsSync(dbFile) ? JSON.parse(fs.readFileSync(dbFile, 'utf8')) : {accounts:[],devices:[],pending:[]};
function save(){ const temp=dbFile+'.tmp'; fs.writeFileSync(temp,JSON.stringify(db,null,2),{mode:0o600});fs.renameSync(temp,dbFile); }
function random(bytes=24){return crypto.randomBytes(bytes).toString('base64url');}
function encrypt(value){const iv=crypto.randomBytes(12);const cipher=crypto.createCipheriv('aes-256-gcm',encKey,iv);const bytes=Buffer.concat([cipher.update(value,'utf8'),cipher.final()]);return {iv:iv.toString('base64'),data:bytes.toString('base64'),tag:cipher.getAuthTag().toString('base64')};}
function equal(a,b){const x=Buffer.from(a||'');const y=Buffer.from(b||'');return x.length===y.length&&crypto.timingSafeEqual(x,y);}
function body(req){return new Promise((resolve,reject)=>{let chunks=[],size=0;req.on('data',part=>{size+=part.length;if(size>32*1024){reject(Error('Request too large'));req.destroy();return;}chunks.push(part);});req.on('end',()=>{try{resolve(JSON.parse(Buffer.concat(chunks).toString()||'{}'));}catch(e){reject(Error('Invalid JSON'));}});req.on('error',reject);});}
function send(res,status,data){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(data));}
function safeAccount(a){return {id:a.id,label:a.label,host:a.host,username:a.username,createdAt:a.createdAt};}
function safeDevice(d){return {id:d.id,name:d.name,platform:d.platform,accounts:d.accounts,permissions:d.permissions,createdAt:d.createdAt,lastSeen:d.lastSeen,ownerName:d.ownerName||"",location:d.location||"",deviceType:d.deviceType||""};}
const adminSession=require('./admin-session');
function auth(req){return equal((req.headers.authorization||'').replace(/^Bearer /i,''),adminKey);}
function session(req){const token=(req.headers.authorization||'').replace(/^Bearer /i,'');return db.devices.find(d=>equal(d.tokenHash, crypto.createHash('sha256').update(token).digest('hex')));}
function cleanHost(input){const url=new URL(input);if(!['http:','https:'].includes(url.protocol)||url.username||url.password||url.search||url.hash)throw Error('Enter a plain http(s) server URL without credentials or query');return url.origin+url.pathname.replace(/\/$/,'');}
function isLocal(req){return ['127.0.0.1','::1','::ffff:127.0.0.1'].includes(req.socket.remoteAddress);}
function decryptSecret(secret) {
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    encKey,
    Buffer.from(secret.iv, 'base64')
  );
  decipher.setAuthTag(Buffer.from(secret.tag, 'base64'));
  return Buffer.concat([
    decipher.update(Buffer.from(secret.data, 'base64')),
    decipher.final()
  ]).toString('utf8');
}

async function xtreamCategories(account, action) {
  const endpoint = new URL(
    account.host.replace(/\/+$/, '') + '/player_api.php'
  );
  endpoint.searchParams.set('username', account.username);
  endpoint.searchParams.set('password', decryptSecret(account.secret));
  endpoint.searchParams.set('action', action);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await secureFetch(endpoint, {
      method: 'GET',
      redirect: 'error',
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) throw Error('Provider request failed');

    const chunks = [];
    let size = 0;
    const maxBytes = 2 * 1024 * 1024;
    for await (const chunk of response.body) {
      size += chunk.length;
      if (size > maxBytes) throw Error('Provider response too large');
      chunks.push(chunk);
    }

    const result = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if (!Array.isArray(result)) throw Error('Unexpected provider response');

    return result.slice(0, 3000).map(item => ({
      category_id: String(item.category_id || ''),
      category_name: String(item.category_name || '')
    }));
  } finally {
    clearTimeout(timer);
  }
}

async function api(req,res,url){
  const limits=require('./rate-limit');

  if(req.method==='POST' && url.pathname==='/api/pair/start') {
    const attempt=limits.check(req,'pair-start',6,10*60*1000);
    if(!attempt.allowed)return limits.rejected(res,attempt);
  }
  if(req.method==='POST' && url.pathname==='/api/pair/check') {
    const attempt=limits.check(req,'pair-check',120,60*1000);
    if(!attempt.allowed)return limits.rejected(res,attempt);
  }

  if(req.method==='GET' && url.pathname==='/api/device/series/info')
    return require('./series-api').handle(req,res,url,{session,db,decryptSecret});
  if(url.pathname.startsWith('/api/play/'))
    return require('./playback').handle(req,res,url,{session,db,decryptSecret});

  // ── Invitation-based device registration ──
  if(req.method==='POST'&&url.pathname==='/api/pair/start'){
    const attempt=limits.check(req,'invite-redeem',8,10*60*1000);
    if(!attempt.allowed)return limits.rejected(res,attempt);

    const b=await body(req);
    const code=String(b.inviteCode||'').trim().toUpperCase();
    if(!/^[A-F0-9]{12}$/.test(code))
      return send(res,400,{error:'Valid invitation code required'});

    const codeHash=crypto.createHash('sha256').update(code).digest('hex');
    const now=Date.now();
    const invite=(db.invites||[]).find(x=>x.codeHash===codeHash&&x.expires>now);

    if(!invite) return send(res,403,{error:'Invitation invalid or expired'});

    const ticket=random(32);
    const token=random(32);
    const ticketHash=crypto.createHash('sha256').update(ticket).digest('hex');

    const device={
      id:random(12),
      name:invite.deviceName,
      platform:String(b.platform||'browser').slice(0,30),
      ownerName:invite.ownerName,
      location:invite.location,
      deviceType:invite.deviceType,
      accounts:invite.accounts,
      permissions:invite.permissions,
      createdAt:new Date().toISOString(),
      lastSeen:null,
      tokenHash:crypto.createHash('sha256').update(token).digest('hex'),
      ticketHash,
      deliveryToken:token
    };

    db.devices.push(device);
    db.invites=db.invites.filter(x=>x!==invite);

    try{
      save();
    }catch(e){
      db.devices=db.devices.filter(x=>x!==device);
      db.invites.push(invite);
      return send(res,500,{error:'Registration failed'});
    }

    return send(res,200,{ticket,expiresInSeconds:600,status:'pending'});
  }

  // ── Ticket poll (used after invitation redemption) ──
  if(req.method==='POST'&&url.pathname==='/api/pair/check'){
    const b=await body(req);
    const hash=crypto.createHash('sha256').update(String(b.ticket||'')).digest('hex');
    const pending=db.pending.find(p=>equal(p.ticketHash,hash));
    if(pending)return send(res,200,{status:Date.now()<pending.expires?'pending':'expired'});
    const device=db.devices.find(d=>equal(d.ticketHash,hash));
    if(device){
      const token=device.deliveryToken;
      delete device.deliveryToken;
      delete device.ticketHash;
      save();
      return send(res,200,{status:'approved',deviceId:device.id,token});
    }
    return send(res,404,{status:'expired'});
  }

  // ── Device endpoints ──
  if(req.method==='GET'&&url.pathname==='/api/device/me'){
    const d=session(req);
    if(!d)return send(res,401,{error:'Device not authorized'});
    d.lastSeen=new Date().toISOString();
    save();
    return send(res,200,{
      device:safeDevice(d),
      accounts:d.accounts.map(id=>db.accounts.find(a=>a.id===id)).filter(Boolean).map(safeAccount)
    });
  }

  if(req.method==='GET'&&url.pathname==='/api/device/items'){
    const device=session(req);
    if(!device)return send(res,401,{error:'Device not authorized'});
    const section=url.searchParams.get('section');
    const accountId=url.searchParams.get('accountId');
    const categoryId=url.searchParams.get('categoryId');
    const actions={live:'get_live_streams',movies:'get_vod_streams',series:'get_series'};
    if(!Object.prototype.hasOwnProperty.call(actions,section))return send(res,400,{error:'Invalid section'});
    if(!/^[0-9]{1,16}$/.test(categoryId||''))return send(res,400,{error:'Invalid category'});
    if(device.permissions[section]!==true||!device.accounts.includes(accountId))return send(res,403,{error:'Access denied'});
    const account=db.accounts.find(a=>a.id===accountId);
    if(!account)return send(res,404,{error:'Account not found'});
    try{
      const endpoint=new URL(account.host.replace(/\/+$/,'')+'/player_api.php');
      endpoint.searchParams.set('username',account.username);
      endpoint.searchParams.set('password',decryptSecret(account.secret));
      endpoint.searchParams.set('action',actions[section]);
      endpoint.searchParams.set('category_id',categoryId);
      const controller=new AbortController();
      const timeout=setTimeout(()=>controller.abort(),20000);
      let raw;
      try{
        const response=await secureFetch(endpoint,{redirect:'error',signal:controller.signal,headers:{Accept:'application/json'}});
        if(!response.ok)throw Error('Provider status '+response.status);
        const chunks=[];let bytes=0;
        for await(const chunk of response.body){bytes+=chunk.length;if(bytes>20*1024*1024)throw Error('Provider response too large');chunks.push(chunk);}
        raw=JSON.parse(Buffer.concat(chunks).toString('utf8'));
      }finally{clearTimeout(timeout);}
      if(!Array.isArray(raw))throw Error('Unexpected provider response');
      const filtered=raw.filter(item=>String(item.category_id||'')===categoryId);
      const items=filtered.slice(0,1200).map(item=>({
        id:String(section==='series'?item.series_id||'':item.stream_id||''),
        name:String(item.name||item.title||'Untitled').slice(0,160),
        category_id:categoryId,
        image:String(item.stream_icon||item.cover||'').slice(0,1500),
        container_extension:section==='movies'?String(item.container_extension||'').toLowerCase():'',
        type:section
      })).filter(item=>/^[0-9]{1,16}$/.test(item.id));
      return send(res,200,{section,accountId,categoryId,items,total:filtered.length,limited:filtered.length>items.length});
    }catch(error){console.error('Content listing failed:',error.name);return send(res,502,{error:'Provider content request failed'});}
  }

  if(req.method==='GET'&&url.pathname==='/api/device/catalog'){
    const d=session(req);
    if(!d)return send(res,401,{error:'Device not authorized'});
    const accountId=url.searchParams.get('accountId');
    const section=url.searchParams.get('section');
    const actions={live:'get_live_categories',movies:'get_vod_categories',series:'get_series_categories'};
    if(!Object.prototype.hasOwnProperty.call(actions,section))return send(res,400,{error:'Invalid content section'});
    if(d.permissions[section]!==true)return send(res,403,{error:'Content access disabled'});
    if(!d.accounts.includes(accountId))return send(res,403,{error:'Account not assigned'});
    const account=db.accounts.find(a=>a.id===accountId);
    if(!account)return send(res,404,{error:'Account unavailable'});
    try{
      const categories=await xtreamCategories(account,actions[section]);
      return send(res,200,{section,accountId,categories});
    }catch(error){
      console.error('Xtream categories request failed:',error.name);
      return send(res,502,{error:'Could not retrieve categories from provider'});
    }
  }

  // ── IPTV Account Details / Status for Connected Device ──
  if(req.method==='GET'&&url.pathname==='/api/device/account/info'){
    const d=session(req);
    if(!d)return send(res,401,{error:'Device not authorized'});
    const accountId=url.searchParams.get('accountId')||(d.accounts&&d.accounts[0]);
    if(!accountId||!d.accounts.includes(accountId)){
      return send(res,403,{error:'Account not accessible'});
    }
    const account=db.accounts.find(a=>a.id===accountId);
    if(!account)return send(res,404,{error:'Account not found'});

    try{
      const endpoint=new URL(account.host.replace(/\/+$/,'')+'/player_api.php');
      endpoint.searchParams.set('username',account.username);
      endpoint.searchParams.set('password',decryptSecret(account.secret));
      const controller=new AbortController();
      const timeout=setTimeout(()=>controller.abort(),12000);
      let raw;
      try{
        const response=await secureFetch(endpoint,{redirect:'error',signal:controller.signal,headers:{Accept:'application/json'}});
        if(!response.ok)throw Error('Provider status '+response.status);
        const chunks=[];let bytes=0;
        for await(const chunk of response.body){bytes+=chunk.length;if(bytes>1024*1024)break;chunks.push(chunk);}
        raw=JSON.parse(Buffer.concat(chunks).toString('utf8'));
      }finally{clearTimeout(timeout);}

      const userInfo=raw && raw.user_info ? raw.user_info : {};
      const serverInfo=raw && raw.server_info ? raw.server_info : {};

      return send(res,200,{
        account:safeAccount(account),
        device:safeDevice(d),
        user_info:userInfo,
        server_info:serverInfo
      });
    }catch(err){
      console.error('Account info lookup failed:',err.name||err.message);
      // Fallback with basic account info from DB even if provider endpoint is slow/unreachable
      return send(res,200,{
        account:safeAccount(account),
        device:safeDevice(d),
        user_info:{
          username:account.username,
          status:'Active',
          message:'Status from local system (upstream unreachable)'
        },
        server_info:{
          url:account.host
        }
      });
    }
  }

  // ── Synced Device Favorites (Shared across all household devices) ──
  if(req.method==='GET'&&url.pathname==='/api/device/favorites'){
    const d=session(req);
    if(!d)return send(res,401,{error:'Device not authorized'});
    const favs=(db.favorites||[]).filter(f=>d.accounts.includes(f.accountId));
    return send(res,200,{favorites:favs});
  }

  if(req.method==='POST'&&url.pathname==='/api/device/favorites/toggle'){
    const d=session(req);
    if(!d)return send(res,401,{error:'Device not authorized'});
    const b=await body(req);
    const section=String(b.section||'');
    const itemId=String(b.itemId||'');
    const accountId=String(b.accountId||'');
    if(!['live','movies','series'].includes(section)||!itemId||!accountId){
      return send(res,400,{error:'Invalid favorite item parameters'});
    }
    if(!d.accounts.includes(accountId)){
      return send(res,403,{error:'Account not accessible'});
    }
    if(!db.favorites)db.favorites=[];
    const existingIdx=db.favorites.findIndex(f=>f.accountId===accountId&&f.section===section&&f.itemId===itemId);
    let isFavorite=false;
    if(existingIdx!==-1){
      db.favorites.splice(existingIdx,1);
      isFavorite=false;
    }else{
      if(db.favorites.length>=2000)db.favorites.shift();
      db.favorites.push({
        id:random(12),
        accountId,
        section,
        itemId,
        name:String(b.name||'Untitled').slice(0,160),
        image:String(b.image||b.poster||'').slice(0,1500),
        seriesId:b.seriesId?String(b.seriesId):undefined,
        addedAt:new Date().toISOString(),
        addedByDevice:d.name
      });
      isFavorite=true;
    }
    try{save();}catch(_){return send(res,500,{error:'Failed to save favorite'});}
    const favs=db.favorites.filter(f=>d.accounts.includes(f.accountId));
    return send(res,200,{isFavorite,favorites:favs});
  }

  // ── Admin routes ──
  if(!url.pathname.startsWith('/api/admin/'))return send(res,404,{error:'Not found'});

  // Admin session endpoints (no key/session required)
  if(url.pathname==='/api/admin/session/login'){
    if(req.method!=='POST')return send(res,405,{error:'Method not allowed'});
    if(!adminSession.originValid(req))return send(res,403,{error:'Invalid origin'});
    if(!auth(req)){
      const attempt=limits.check(req,'admin-failed',12,15*60*1000);
      if(!attempt.allowed)return limits.rejected(res,attempt);
      return send(res,401,{error:'Invalid Admin key'});
    }
    limits.clear(req,'admin-failed');
    const sess=adminSession.create(res);
    return send(res,200,{csrf:sess.csrf||sess.csrfToken,csrfToken:sess.csrf||sess.csrfToken,...sess});
  }

  if(url.pathname==='/api/admin/session'){
    if(req.method==='DELETE'){
      if(adminSession&&adminSession.revoke)try{adminSession.revoke(req,res);}catch(_){}
      return send(res,200,{ok:true});
    }
    if(req.method!=='GET')return send(res,405,{error:'Method not allowed'});
    const s=adminSession.current(req);
    if(!s)return send(res,401,{error:'Session expired'});
    return send(res,200,{csrf:s.csrf,csrfToken:s.csrf,expires:s.expires});
  }

  if(url.pathname==='/api/admin/session/logout'){
    if(adminSession&&adminSession.revoke)try{adminSession.revoke(req,res);}catch(_){}
    return send(res,200,{ok:true});
  }

  // All other admin routes require auth (key or session)
  if(!auth(req)&&!adminSession.authorized(req)){
    const attempt=limits.check(req,'admin-failed',12,15*60*1000);
    if(!attempt.allowed)return limits.rejected(res,attempt);
    return send(res,401,{error:'Admin authorization required'});
  }
  limits.clear(req,'admin-failed');

  if(req.method==='POST'&&url.pathname==='/api/admin/invitations'){
    const b=await body(req);
    const ownerName=String(b.ownerName||'').trim();
    const deviceName=String(b.deviceName||'').trim();
    const location=String(b.location||'').trim();
    const deviceType=String(b.deviceType||'').trim();

    if(!ownerName||!deviceName||!location||!deviceType||
       ownerName.length>100||deviceName.length>80||location.length>120||
       !['TV','Mobile','Laptop','Desktop','Tablet','Other'].includes(deviceType))
      return send(res,400,{error:'Complete valid device details'});

    const accounts=Array.isArray(b.accounts)?
      [...new Set(b.accounts.filter(id=>db.accounts.some(a=>a.id===id)))]:[];
    if(accounts.length===0)return send(res,400,{error:'Assign a subscription'});

    const permissions={live:b.live===true,movies:b.movies===true,series:b.series===true};
    if(!Object.values(permissions).some(Boolean))return send(res,400,{error:'Select at least one permission'});

    const code=crypto.randomBytes(6).toString('hex').toUpperCase();
    const codeHash=crypto.createHash('sha256').update(code).digest('hex');
    const expires=Date.now()+10*60*1000;

    db.invites=(db.invites||[]).filter(x=>x.expires>Date.now());
    if(db.invites.length>=50)return send(res,429,{error:'Too many pending invitations'});

    const invite={codeHash,expires,ownerName,deviceName,location,deviceType,accounts,permissions};
    db.invites.push(invite);

    try{save();}catch(e){
      db.invites=db.invites.filter(x=>x!==invite);
      return send(res,500,{error:'Could not create invitation'});
    }
    return send(res,201,{code,expires});
  }

  if(req.method==='GET'&&url.pathname==='/api/admin/state')
    return send(res,200,{
      accounts:db.accounts.map(safeAccount),
      devices:db.devices.map(safeDevice),
      pending:db.pending.filter(p=>p.expires>Date.now()).map(p=>({code:p.code,name:p.name,platform:p.platform,expires:p.expires})),
      invites:(db.invites||[]).filter(i=>i.expires>Date.now()).map(i=>({ownerName:i.ownerName,deviceName:i.deviceName,location:i.location,deviceType:i.deviceType,expires:i.expires}))
    });

  if(req.method==='POST'&&url.pathname==='/api/admin/accounts'){
    const b=await body(req);
    const label=String(b.label||'').trim(),username=String(b.username||'').trim(),password=String(b.password||'');
    if(!label||!username||!password)return send(res,400,{error:'Label, username and password required'});
    const host=cleanHost(String(b.host||''));
    const a={id:random(12),label:label.slice(0,80),host,username:username.slice(0,150),secret:encrypt(password),createdAt:new Date().toISOString()};
    db.accounts.push(a);save();
    return send(res,201,{account:safeAccount(a)});
  }

  if(req.method==='POST'&&url.pathname==='/api/admin/accounts/update'){
    const b=await body(req);
    const account=db.accounts.find(a=>a.id===b.id);
    if(!account)return send(res,404,{error:'Account not found'});
    const username=String(b.username||'').trim();
    const password=String(b.password||'');
    if(!username||username.length>150||!password)return send(res,400,{error:'Username and new password required'});
    let host;
    try{host=cleanHost(String(b.host||''));}catch(_){return send(res,400,{error:'Invalid provider URL'});}
    const previous={host:account.host,username:account.username,secret:account.secret};
    account.host=host;account.username=username;account.secret=encrypt(password);
    try{save();}catch(_){Object.assign(account,previous);return send(res,500,{error:'Could not save account update'});}
    return send(res,200,{account:safeAccount(account)});
  }

  if(req.method==='POST'&&url.pathname==='/api/admin/pair/approve'){
    const b=await body(req);
    const code=String(b.code||'');
    const pending=db.pending.find(p=>p.code===code&&p.expires>Date.now());
    if(!pending)return send(res,404,{error:'Pairing code not found or expired'});
    const accountIds=Array.isArray(b.accounts)?b.accounts.filter(id=>db.accounts.some(a=>a.id===id)):[];
    const token=random(32);
    const d={
      id:random(12),name:String(b.deviceName||pending.name).trim().slice(0,80)||pending.name,
      platform:pending.platform,ownerName:String(b.ownerName||"").trim().slice(0,100),
      location:String(b.location||"").trim().slice(0,120),deviceType:String(b.deviceType||"").trim().slice(0,30),
      accounts:accountIds,permissions:{live:b.live!==false,movies:b.movies!==false,series:b.series!==false},
      createdAt:new Date().toISOString(),lastSeen:null,
      tokenHash:crypto.createHash('sha256').update(token).digest('hex'),
      ticketHash:pending.ticketHash,deliveryToken:token
    };
    db.devices.push(d);db.pending=db.pending.filter(p=>p!==pending);save();
    return send(res,201,{device:safeDevice(d)});
  }

  if(req.method==='POST'&&url.pathname==='/api/admin/devices/details'){
    const b=await body(req);
    const d=db.devices.find(x=>x.id===b.deviceId);
    if(!d)return send(res,404,{error:'Device not found'});
    const allowed=['ownerName','deviceName','location','deviceType'];
    if(allowed.some(k=>typeof b[k]!=='string'))return send(res,400,{error:'Invalid device details'});
    const ownerName=b.ownerName.trim(),deviceName=b.deviceName.trim(),location=b.location.trim(),deviceType=b.deviceType.trim();
    if(!deviceName||deviceName.length>80||ownerName.length>100||location.length>120||deviceType.length>30)return send(res,400,{error:'Invalid detail lengths'});
    if(deviceType&&!['TV','Mobile','Laptop','Desktop','Tablet','Other'].includes(deviceType))return send(res,400,{error:'Invalid device type'});
    const previous={name:d.name,ownerName:d.ownerName,location:d.location,deviceType:d.deviceType};
    d.name=deviceName;d.ownerName=ownerName;d.location=location;d.deviceType=deviceType;
    try{save();}catch(e){Object.assign(d,previous);return send(res,500,{error:'Could not save device details'});}
    return send(res,200,{device:safeDevice(d)});
  }

  if(req.method==='POST'&&url.pathname==='/api/admin/devices/assign'){
    const b=await body(req);
    const d=db.devices.find(x=>x.id===b.deviceId);
    if(!d)return send(res,404,{error:'Device not found'});
    d.accounts=Array.isArray(b.accounts)?b.accounts.filter(id=>db.accounts.some(a=>a.id===id)):[];
    d.permissions={live:b.live===true,movies:b.movies===true,series:b.series===true};
    save();
    return send(res,200,{device:safeDevice(d)});
  }

  if(req.method==='POST'&&url.pathname==='/api/admin/devices/revoke'){
    const b=await body(req);
    const count=db.devices.length;
    db.devices=db.devices.filter(d=>d.id!==b.deviceId);
    save();
    return send(res,200,{revoked:db.devices.length!==count});
  }

  return send(res,404,{error:'Not found'});
}

const server=http.createServer((req,res)=>{
  (async()=>{
    const url=new URL(req.url,'http://localhost');
    if(url.pathname.startsWith('/api/'))return api(req,res,url);

    // ── Static file routes ──
    const routes={
      // Viewer app
      '/':'web/index.html', '/index.html':'web/index.html',
      // New UI (Phase UI-Redesign)
      '/css/vlc-main.css':'web/css/vlc-main.css',
      '/js/vlc-ui.js':'web/js/vlc-ui.js',
      '/logo.png':'web/logo.png',
      '/favicon.png':'web/favicon.png',
      // Viewer scripts & styles
      '/js/hls.min.js':'web/js/hls.min.js',
      '/js/pairing.js':'web/js/pairing.js',
      '/js/catalog.js':'web/js/catalog.js',
      '/js/series.js':'web/js/series.js',
      '/js/compat-ui.js':'web/js/compat-ui.js',
      '/css/catalog.css':'web/css/catalog.css',
      '/css/series.css':'web/css/series.css',
      // Legacy (kept for any cached URLs)
      '/css/home9b.css':'web/css/home9b.css',
      '/js/home9b.js':'web/js/home9b.js',
      '/css/tv.css':'web/css/tv.css',
      '/js/tv.js':'web/js/tv.js',
      '/css/pairing.css':'web/css/pairing.css',
      '/css/phase9.css':'web/css/phase9.css',
      '/icon.png':'web/icon.png',
      // Admin
      '/admin':'web/admin/index.html', '/admin/':'web/admin/index.html',
    };

    let file=routes[url.pathname];
    if(!file)return send(res,404,{error:'Not found'});

    const ext=path.extname(file);
    const mime={
      '.html':'text/html; charset=utf-8',
      '.js':'application/javascript; charset=utf-8',
      '.css':'text/css; charset=utf-8',
      '.png':'image/png',
      '.ico':'image/x-icon'
    };

    let bytes;
    try{ bytes=fs.readFileSync(path.join(root,file)); }
    catch(_){ return send(res,404,{error:'Asset not found'}); }

    res.writeHead(200,{
      'Content-Type':mime[ext]||'application/octet-stream',
      'Cache-Control':'no-store',
      'X-Content-Type-Options':'nosniff'
    });
    res.end(bytes);

  })().catch(e=>{if(!res.headersSent)send(res,400,{error:e.message});});
});

server.listen(port,host,()=>console.log(`VLC IPTV: http://${host}:${port}/`));
