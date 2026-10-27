'use strict';
// Movie/Series E-AC-3/AC-3/DTS -> AAC on-the-fly audio compatibility converter (fragmented MP4).
// Video is copied (-c:v copy, 0% CPU loss, pristine 4K video), while audio is converted to AAC.
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');

const active = new Set();
const MAX_ACTIVE = 8;

function failure(res, status, message) {
  if (res.headersSent) return;
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify({ error: message }));
}

function locateFfmpeg() {
  if (process.env.FFMPEG_PATH && fs.existsSync(process.env.FFMPEG_PATH)) {
    return process.env.FFMPEG_PATH;
  }
  // Linux standard locations
  const linuxCandidates = [
    '/usr/bin/ffmpeg',
    '/usr/local/bin/ffmpeg',
    '/snap/bin/ffmpeg',
    '/bin/ffmpeg'
  ];
  for (const c of linuxCandidates) {
    if (fs.existsSync(c)) return c;
  }
  // Windows local tools
  const winCandidates = [
    path.resolve(__dirname, '..', 'tools', 'ffmpeg', 'ffmpeg.exe'),
    path.resolve(__dirname, '..', 'tools', 'ffmpeg', 'bin', 'ffmpeg.exe'),
    path.resolve(__dirname, '..', 'ffmpeg.exe')
  ];
  for (const c of winCandidates) {
    if (fs.existsSync(c)) return c;
  }
  return 'ffmpeg';
}

function authorized(s, ctx) {
  if (!s || s.expires <= Date.now() || !['movies', 'series'].includes(s.section)) return false;
  const device = ctx.db.devices.find(d => d.id === s.deviceId);
  return !!(device && device.permissions[s.section] === true && device.accounts.includes(s.accountId));
}

async function handle(req, res, url, sessions, ctx) {
  const match = /^\/api\/play\/audio\/([a-f0-9]{48})\/([a-f0-9]{24})$/.exec(url.pathname);
  if (!match || req.method !== 'GET') return failure(res, 404, 'Not found');

  const sess = sessions.get(match[1]);
  if (!authorized(sess, ctx)) return failure(res, 403, 'Playback expired or not authorized');
  if (!sess.resources.has(match[2])) return failure(res, 404, 'Unknown media resource');
  // Refresh session expiry sliding window so audio transcoder never drops during long pauses
  sess.expires = Date.now() + (24 * 60 * 60 * 1000);

  if (active.size >= MAX_ACTIVE) return failure(res, 429, 'Maximum concurrent audio transcode sessions reached');

  const exe = locateFfmpeg();
  const port = Number(process.env.VLC_PORT || 4471);
  const local = `http://127.0.0.1:${port}/api/play/media/${match[1]}/${match[2]}`;

  const startTime = parseFloat(url.searchParams.get('t') || '0');

  const args = [
    '-hide_banner', '-loglevel', 'error', '-nostdin',
    '-protocol_whitelist', 'file,http,https,tcp,tls',
  ];

  if (startTime > 0 && Number.isFinite(startTime)) {
    args.push('-ss', String(startTime));
  }

  args.push(
    '-i', local,
    '-map', '0:v:0', '-map', '0:a:0?',
    '-c:v', 'copy',
    '-c:a', 'aac', '-b:a', '256k', '-ac', '2', '-ar', '48000',
    '-sn', '-dn',
    '-movflags', 'frag_keyframe+empty_moov+default_base_moof',
    '-f', 'mp4',
    'pipe:1'
  );

  let child;
  try {
    child = spawn(exe, args, { windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
  } catch (_) {
    return failure(res, 500, 'Could not start audio converter (ffmpeg missing or not executable)');
  }

  active.add(child);
  let ended = false;

  const finish = () => {
    if (ended) return;
    ended = true;
    clearTimeout(timer);
    clearInterval(permissionWatch);
    active.delete(child);
    if (child.exitCode === null && !child.killed) {
      try { child.kill('SIGTERM'); } catch (_) {}
    }
  };

  const timer = setTimeout(() => {
    if (!res.writableEnded) res.destroy();
    finish();
  }, Math.min(4 * 60 * 60 * 1000, Math.max(1000, sess.expires - Date.now())));

  const permissionWatch = setInterval(() => {
    if (!authorized(sess, ctx)) {
      if (!res.destroyed) res.destroy();
      finish();
    }
  }, 2000);
  permissionWatch.unref();

  req.once('close', () => { if (res.destroyed) finish(); });
  res.once('close', finish);

  child.once('error', (err) => {
    if (!res.headersSent) failure(res, 502, 'Converter process failed: ' + err.message);
    else res.destroy();
    finish();
  });

  child.once('exit', (code) => {
    if (code !== 0 && !res.destroyed) {
      if (!res.headersSent) failure(res, 502, 'Converter exited with error code ' + code);
      else res.destroy();
    } else if (!res.writableEnded) {
      res.end();
    }
    finish();
  });

  child.stderr.on('data', () => {});

  res.writeHead(200, {
    'Content-Type': 'video/mp4',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'Accept-Ranges': 'none'
  });

  child.stdout.on('error', () => finish());
  child.stdout.pipe(res);
}

module.exports = { handle };
