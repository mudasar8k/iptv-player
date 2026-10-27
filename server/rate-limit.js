'use strict';
// Phase 10C: bounded, per-peer, in-memory rate limits (one Node process).
// This is a local hardening layer, not a substitute for reverse-proxy limits.
const buckets = new Map();
const MAX_BUCKETS = 10000;
const TTL = 30 * 60 * 1000;
function peer(req) {
  // Never trust X-Forwarded-For here; the TCP peer is authoritative.
  return String(req.socket && req.socket.remoteAddress || 'unknown');
}
function check(req, kind, max, windowMs) {
  const now = Date.now();
  if (buckets.size >= MAX_BUCKETS) {
    for (const [key, value] of buckets) {
      if (value.until + TTL < now) buckets.delete(key);
    }
  }
  if (buckets.size >= MAX_BUCKETS) return {allowed:false,retryAfter:60};
  const key = kind + '|' + peer(req);
  let entry = buckets.get(key);
  if (!entry || entry.until <= now) {
    entry = {count:0,until:now+windowMs};
    buckets.set(key,entry);
  }
  if (entry.count >= max) return {allowed:false,retryAfter:Math.max(1,Math.ceil((entry.until-now)/1000))};
  entry.count++;
  return {allowed:true,retryAfter:0};
}
function clear(req,kind){buckets.delete(kind+'|'+peer(req));}
function rejected(res,result){
  res.writeHead(429,{
    'Content-Type':'application/json; charset=utf-8',
    'Cache-Control':'no-store','Retry-After':String(result.retryAfter),
    'X-Content-Type-Options':'nosniff'
  });
  res.end(JSON.stringify({error:'Too many requests. Please retry later.'}));
}
module.exports={check,clear,rejected};
