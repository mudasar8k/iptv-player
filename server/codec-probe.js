function classifyProbeError(message) {
  const text = String(message || '').toLowerCase();

  if (/401|unauthorized/.test(text)) return 'unauthorized';
  if (/403|forbidden/.test(text)) return 'access_denied';
  if (/404|not found/.test(text)) return 'media_not_found';
  if (/502|bad gateway/.test(text)) return 'upstream_failure';
  if (/timed out|timeout/.test(text)) return 'timeout';
  if (/invalid data|invalid argument/.test(text)) return 'invalid_media_data';
  if (/unsupported|decoder|codec/.test(text)) return 'codec_or_format_issue';
  if (/connection refused|connection reset/.test(text)) return 'network_failure';

  return 'unknown_probe_failure';
}
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const {spawn} = require('node:child_process');

let running = false;

function reply(res,status,data) {
  if (res.headersSent) return;
  res.writeHead(status,{
    'Content-Type':'application/json; charset=utf-8',
    'Cache-Control':'no-store'
  });
  res.end(JSON.stringify(data));
}

function findProbe(dir) {
  if (!fs.existsSync(dir)) return null;
  for (const entry of fs.readdirSync(dir,{withFileTypes:true})) {
    const full = path.join(dir,entry.name);
    if (entry.isDirectory()) {
      const found = findProbe(full);
      if (found) return found;
    } else if (entry.name.toLowerCase()==='ffprobe.exe') {
      return full;
    }
  }
  return null;
}

async function handle(req,res,url,sessions,ctx) {
  const local = ['127.0.0.1','::1','::ffff:127.0.0.1'];
  if (!local.includes(req.socket.remoteAddress)) {
    return reply(res,403,{error:'Local diagnostics only'});
  }

  const m = /^\/api\/play\/probe\/([a-f0-9]{48})\/([a-f0-9]{24})$/.exec(url.pathname);
  if (!m) return reply(res,404,{error:'Invalid probe reference'});

  const session = sessions.get(m[1]);
  if (!session || session.expires <= Date.now()) {
    return reply(res,401,{error:'Playback session expired'});
  }

  const device = ctx.db.devices.find(d=>d.id===session.deviceId);
  if (!device ||
      device.permissions[session.section]!==true ||
      !device.accounts.includes(session.accountId)) {
    return reply(res,403,{error:'Playback access denied'});
  }

  if (session.section!=='live' || !session.resources.has(m[2])) {
    return reply(res,400,{error:'Live TV resource required'});
  }

  if (running) {
    return reply(res,429,{error:'Another diagnostic is running'});
  }

  const exe = findProbe(path.join(__dirname,'..','tools','ffmpeg'));
  if (!exe) return reply(res,503,{error:'FFprobe unavailable'});

  running = true;
  const mediaPath = '/api/play/media/'+m[1]+'/'+m[2];
  const localUrl = 'http://127.0.0.1:'+req.socket.localPort+mediaPath;

  const args = [
    '-v','error',
    '-analyzeduration','5000000',
    '-probesize','2000000',
    '-rw_timeout','10000000',
    '-show_entries',
    'stream=codec_type,codec_name,profile,level,pix_fmt,width,height,avg_frame_rate,field_order,has_b_frames',
    '-of','json',
    '-i',localUrl
  ];

  let output = '';
  let diagnosticError = '';
  let finished = false;
  let child;

  function finish(status,data) {
    if (finished) return;
    finished = true;
    running = false;
    clearTimeout(timer);
    reply(res,status,data);
  }

  try {
    child = spawn(exe,args,{
      windowsHide:true,
      stdio:['ignore','pipe','pipe']
    });
  } catch (_) {
    running = false;
    return reply(res,500,{error:'Diagnostic could not start'});
  }

  const timer = setTimeout(()=>{
    child.kill();
    finish(504,{error:'Codec probe timed out'});
  },15000);

  child.stdout.on('data',chunk=>{
    output += chunk.toString('utf8');
    if (output.length>96000) {
      child.kill();
      finish(502,{error:'Diagnostic output too large'});
    }
  });

  child.stderr.on('data',chunk=>{
    if (diagnosticError.length < 8192) {
      diagnosticError += chunk.toString('utf8').slice(0,8192);
    }
  });

  child.on('error',()=>{
    finish(502,{error:'FFprobe process failed'});
  });

  child.on('close',code=>{
    if (finished) return;
    if (code!==0) {
      return finish(502,{
        error:'Stream could not be inspected',
        reason:classifyProbeError(diagnosticError)
      });
    }
    try {
      const parsed = JSON.parse(output);
      const streams = (parsed.streams||[]).slice(0,12).map(s=>({
        type:s.codec_type||'unknown',
        codec:s.codec_name||'unknown',
        profile:s.profile||null,
        width:Number.isInteger(s.width)?s.width:null,
        height:Number.isInteger(s.height)?s.height:null,
        frameRate:s.avg_frame_rate||null,
        level:Number.isInteger(s.level)?s.level:null,
        pixelFormat:s.pix_fmt||null,
        fieldOrder:s.field_order||null,
        bFrames:Number.isInteger(s.has_b_frames)?s.has_b_frames:null
      }));
      finish(200,{streams});
    } catch (_) {
      finish(502,{error:'Unable to parse codec information'});
    }
  });
}

module.exports={handle};