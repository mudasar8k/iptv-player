'use strict';
// VLC IPTV central management prototype. Node.js 22+, zero external packages.
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
function safeDevice(d){return {id:d.id,name:d.name,platform:d.platform,accounts:d.accounts,permissions:d.permissions,createdAt:d.createdAt,lastSeen:d.lastSeen};}
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

  decipher.setAuthTag(
    Buffer.from(secret.tag, 'base64')
  );

  return Buffer.concat([
    decipher.update(
      Buffer.from(secret.data, 'base64')
    ),
    decipher.final()
  ]).toString('utf8');
}

async function xtreamCategories(account, action) {
  const endpoint = new URL(
    account.host.replace(/\/+$/, '') + '/player_api.php'
  );

  endpoint.searchParams.set(
    'username',
    account.username
  );

  endpoint.searchParams.set(
    'password',
    decryptSecret(account.secret)
  );

  endpoint.searchParams.set('action', action);

  const controller = new AbortController();

  const timer = setTimeout(
    () => controller.abort(),
    12000
  );

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      redirect: 'error',
      signal: controller.signal,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw Error('Provider request failed');
    }

    const chunks = [];
    let size = 0;
    const maxBytes = 2 * 1024 * 1024;

    for await (const chunk of response.body) {
      size += chunk.length;

      if (size > maxBytes) {
        throw Error('Provider response too large');
      }

      chunks.push(chunk);
    }

    const result = JSON.parse(
      Buffer.concat(chunks).toString('utf8')
    );

    if (!Array.isArray(result)) {
      throw Error('Unexpected provider response');
    }

    return result.slice(0, 3000).map(item => ({
      category_id: String(item.category_id || ''),
      category_name: String(item.category_name || '')
    }));

  } finally {
    clearTimeout(timer);
  }
}
async function api(req,res,url){
 if(req.method==='POST'&&url.pathname==='/api/pair/start'){
  const b=await body(req); const name=String(b.name||'New device').slice(0,70), platform=String(b.platform||'browser').slice(0,30);
  const code=String(crypto.randomInt(100000,999999));const ticket=random();const now=Date.now();
  db.pending=db.pending.filter(p=>p.expires>now);db.pending.push({code,ticketHash:crypto.createHash('sha256').update(ticket).digest('hex'),name,platform,expires:now+5*60*1000});save();return send(res,200,{code,ticket,expiresInSeconds:300});
 }
 if(req.method==='POST'&&url.pathname==='/api/pair/check'){
  const b=await body(req);const hash=crypto.createHash('sha256').update(String(b.ticket||'')).digest('hex');
  const pending=db.pending.find(p=>equal(p.ticketHash,hash));if(pending)return send(res,200,{status:Date.now()<pending.expires?'pending':'expired'});
  const device=db.devices.find(d=>equal(d.ticketHash,hash));if(device){const token=device.deliveryToken;delete device.deliveryToken;delete device.ticketHash;save();return send(res,200,{status:'approved',deviceId:device.id,token});}
  return send(res,404,{status:'expired'});
 }
 if(req.method==='GET'&&url.pathname==='/api/device/me'){
  const d=session(req);if(!d)return send(res,401,{error:'Device not authorized'});d.lastSeen=new Date().toISOString();save();return send(res,200,{device:safeDevice(d),accounts:d.accounts.map(id=>db.accounts.find(a=>a.id===id)).filter(Boolean).map(safeAccount)});
 }
   if(req.method==='GET'&&url.pathname==='/api/device/catalog'){

    const d=session(req);

    if(!d){
      return send(res,401,{
        error:'Device not authorized'
      });
    }

    const accountId=url.searchParams.get('accountId');
    const section=url.searchParams.get('section');

    const actions={
      live:'get_live_categories',
      movies:'get_vod_categories',
      series:'get_series_categories'
    };

    if(!Object.prototype.hasOwnProperty.call(actions,section)){
      return send(res,400,{
        error:'Invalid content section'
      });
    }

    if(d.permissions[section]!==true){
      return send(res,403,{
        error:'Content access disabled'
      });
    }

    if(!d.accounts.includes(accountId)){
      return send(res,403,{
        error:'Account not assigned'
      });
    }

    const account=db.accounts.find(
      a=>a.id===accountId
    );

    if(!account){
      return send(res,404,{
        error:'Account unavailable'
      });
    }

    try {
      const categories=await xtreamCategories(
        account,
        actions[section]
      );

      return send(res,200,{
        section,
        accountId,
        categories
      });

    } catch(error) {
      console.error(
        'Xtream categories request failed:',
        error.name
      );

      return send(res,502,{
        error:'Could not retrieve categories from provider'
      });
    }
  }
if(!url.pathname.startsWith('/api/admin/'))return send(res,404,{error:'Not found'});
 if(!auth(req))return send(res,401,{error:'Admin authorization required'});
 if(req.method==='GET'&&url.pathname==='/api/admin/state')return send(res,200,{accounts:db.accounts.map(safeAccount),devices:db.devices.map(safeDevice),pending:db.pending.filter(p=>p.expires>Date.now()).map(p=>({code:p.code,name:p.name,platform:p.platform,expires:p.expires}))});
 if(req.method==='POST'&&url.pathname==='/api/admin/accounts'){
  const b=await body(req);const label=String(b.label||'').trim(),username=String(b.username||'').trim(),password=String(b.password||'');if(!label||!username||!password)return send(res,400,{error:'Label, username and password required'});
  const host=cleanHost(String(b.host||''));const a={id:random(12),label:label.slice(0,80),host,username:username.slice(0,150),secret:encrypt(password),createdAt:new Date().toISOString()};db.accounts.push(a);save();return send(res,201,{account:safeAccount(a)});
 }
 if(req.method==='POST'&&url.pathname==='/api/admin/pair/approve'){
  const b=await body(req);const code=String(b.code||'');const pending=db.pending.find(p=>p.code===code&&p.expires>Date.now());if(!pending)return send(res,404,{error:'Pairing code not found or expired'});
  const accountIds=Array.isArray(b.accounts)?b.accounts.filter(id=>db.accounts.some(a=>a.id===id)):[];const token=random(32);
  const d={id:random(12),name:pending.name,platform:pending.platform,accounts:accountIds,permissions:{live:b.live!==false,movies:b.movies!==false,series:b.series!==false},createdAt:new Date().toISOString(),lastSeen:null,tokenHash:crypto.createHash('sha256').update(token).digest('hex'),ticketHash:pending.ticketHash,deliveryToken:token};
  db.devices.push(d);db.pending=db.pending.filter(p=>p!==pending);save();return send(res,201,{device:safeDevice(d)});
 }
 if(req.method==='POST'&&url.pathname==='/api/admin/devices/assign'){
  const b=await body(req);const d=db.devices.find(x=>x.id===b.deviceId);if(!d)return send(res,404,{error:'Device not found'});
  d.accounts=Array.isArray(b.accounts)?b.accounts.filter(id=>db.accounts.some(a=>a.id===id)):[];d.permissions={live:b.live===true,movies:b.movies===true,series:b.series===true};save();return send(res,200,{device:safeDevice(d)});
 }
 if(req.method==='POST'&&url.pathname==='/api/admin/devices/revoke'){
  const b=await body(req);const count=db.devices.length;db.devices=db.devices.filter(d=>d.id!==b.deviceId);save();return send(res,200,{revoked:db.devices.length!==count});
 }
 return send(res,404,{error:'Not found'});
}
const server=http.createServer((req,res)=>{
 (async()=>{
  const url=new URL(req.url,'http://localhost');
  if(url.pathname.startsWith('/api/'))return api(req,res,url);
  const routes={'/admin':'web/admin/index.html','/admin/':'web/admin/index.html','/':'web/index.html','/index.html':'web/index.html','/css/tv.css':'web/css/tv.css','/js/tv.js':'web/js/tv.js','/js/pairing.js':'web/js/pairing.js','/css/pairing.css':'web/css/pairing.css','/icon.png':'web/icon.png'};
  let file=routes[url.pathname];if(!file)return send(res,404,{error:'Not found'});
  // Prototype is localhost-only; reject use through a reverse proxy until hardened.
  if(!isLocal(req))return send(res,403,{error:'Local-only prototype'});
  const ext=path.extname(file);const mime={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png'};
  const bytes=fs.readFileSync(path.join(root,file));res.writeHead(200,{'Content-Type':mime[ext]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(bytes);
 })().catch(e=>{if(!res.headersSent)send(res,400,{error:e.message});});
});
server.listen(port,host,()=>console.log(`VLC IPTV management prototype: http://${host}:${port}/admin/`));
