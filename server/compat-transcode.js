'use strict';
// Local-only experimental transcoding for session-authorized Live TV.
const fs = require('node:fs');
const path = require('node:path');
const {spawn} = require('node:child_process');
const crypto = require('node:crypto');
const ROOT = path.resolve(__dirname, 'data', 'compat');
let active = null;
function json(res,status,body){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(body));}
function findExe(dir){
  if(!fs.existsSync(dir)) return null;
  for(const e of fs.readdirSync(dir,{withFileTypes:true})){
    const p=path.join(dir,e.name);
    if(e.isDirectory()){const found=findExe(p);if(found)return found;}
    else if(e.name.toLowerCase()==='ffmpeg.exe')return p;
  }
  return null;
}
function permitted(s,ctx){
  const device=ctx.db.devices.find(d=>d.id===s.deviceId);
  return Boolean(device && s.expires>Date.now() && s.section==='live' && device.permissions.live===true && device.accounts.includes(s.accountId));
}
function stop(job){
  if(!job || job.stopped)return;
  job.stopped=true;
  clearTimeout(job.timer);
  if(job.child && !job.child.killed)try{job.child.kill();}catch(_){}
  if(active===job)active=null;
  try{fs.rmSync(job.dir,{recursive:true,force:true});}catch(_){}
}
process.once('exit',()=>{if(active)stop(active);});
function validMediaPath(p,s){return p===('/api/play/media/'+s.id+'/'+s.compatSourceKey);}
async function handle(req,res,url,sessions,ctx){
  if(!['127.0.0.1','::1','::ffff:127.0.0.1'].includes(req.socket.remoteAddress))return json(res,403,{error:'Local test only'});
  const pathname=url.pathname;
  if(req.method==='POST' && pathname==='/api/play/compat/start'){
    const d=ctx.session(req);if(!d)return json(res,401,{error:'Device not authorized'});
    let raw='';for await(const chunk of req){raw+=chunk;if(raw.length>1024)return json(res,413,{error:'Too large'});}
    let body;try{body=JSON.parse(raw);}catch(_){return json(res,400,{error:'Invalid JSON'});}
    const media=String(body.mediaPath||'');
    const m=/^\/api\/play\/media\/([a-f0-9]{48})\/([a-f0-9]{24})$/.exec(media);
    if(!m)return json(res,400,{error:'Invalid playback reference'});
    const s=sessions.get(m[1]);
    if(!s || !permitted(s,ctx) || s.deviceId!==d.id || !s.resources.has(m[2]))return json(res,403,{error:'Playback not authorized'});
    const resource=s.resources.get(m[2]);
    if(!resource || !resource.pathname.endsWith('.m3u8'))return json(res,400,{error:'Live HLS source required'});
    if(active)stop(active); // local development: one transcoder globally
    const exe=findExe(path.join(__dirname,'..','tools','ffmpeg'));
    if(!exe)return json(res,503,{error:'FFmpeg unavailable'});
    fs.mkdirSync(ROOT,{recursive:true});
    const key=crypto.randomBytes(24).toString('hex');
    const dir=path.join(ROOT,key);
    fs.mkdirSync(dir,{recursive:true});
    const localUrl='http://127.0.0.1:'+req.socket.localPort+media;
    const args=['-hide_banner','-loglevel','error','-nostdin','-y',
      '-analyzeduration','5000000','-probesize','2000000','-i',localUrl,
      '-map','0:v:0','-map','0:a:0?',
      '-vf','bwdif=mode=send_frame:parity=auto:deint=all,format=yuv420p',
      '-c:v','libx264','-preset','veryfast','-tune','zerolatency','-crf','25',
      '-g','50','-keyint_min','50','-sc_threshold','0',
      '-c:a','aac','-b:a','128k','-ar','48000',
      '-f','hls','-hls_time','3','-hls_list_size','5',
      '-hls_flags','delete_segments+omit_endlist+independent_segments',
      '-hls_segment_filename',path.join(dir,'seg%06d.ts'),path.join(dir,'index.m3u8')];
    let child;
    try{child=spawn(exe,args,{windowsHide:true,stdio:['ignore','ignore','ignore']});}
    catch(_){fs.rmSync(dir,{recursive:true,force:true});return json(res,500,{error:'Failed to launch FFmpeg'});}
    const job={child,key,dir,s,stopped:false,timer:null};
    active=job;
    job.timer=setTimeout(()=>stop(job),Math.min(10*60*1000,Math.max(1000,s.expires-Date.now())));
    child.on('error',()=>stop(job));
    child.on('exit',()=>stop(job));
    return json(res,202,{playlist:'/api/play/compat/'+key+'/index.m3u8',status:'starting'});
  }
  if(req.method==='POST' && pathname==='/api/play/compat/stop'){
    const d=ctx.session(req);if(!d)return json(res,401,{error:'Unauthorized'});
    if(active && active.s.deviceId===d.id)stop(active);
    return json(res,200,{stopped:true});
  }
  const m=/^\/api\/play\/compat\/([a-f0-9]{48})\/(index\.m3u8|seg[0-9]{6}\.ts)$/.exec(pathname);
  if(req.method!=='GET'||!m)return json(res,404,{error:'Not found'});
  const job=active;
  if(!job || job.key!==m[1])return json(res,404,{error:'Compatibility session ended'});
  if(!permitted(job.s,ctx)){stop(job);return json(res,403,{error:'Access revoked'});}
  const file=path.join(job.dir,m[2]);
  if(!fs.existsSync(file))return json(res,503,{error:'Transcoder initializing'});
  let size;
  try{size=fs.statSync(file).size;}catch(_){return json(res,503,{error:'Segment not ready'});}
  if(!size)return json(res,503,{error:'Segment not ready'});
  res.writeHead(200,{'Content-Type':m[2].endsWith('.m3u8')?'application/vnd.apple.mpegurl':'video/mp2t',
    'Content-Length':size,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
  fs.createReadStream(file).on('error',()=>res.destroy()).pipe(res);
}
module.exports={handle};
