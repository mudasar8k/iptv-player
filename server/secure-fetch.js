'use strict';
// Local-only Phase 10D2 transport. No automatic redirects; callers retain their existing redirect policy.
const http = require('node:http');
const https = require('node:https');
const {Readable} = require('node:stream');
const {validateDestination} = require('./security/destination-policy');
const net = require('node:net');
const ALLOWED_PORTS = [80,443,8080]; // Explicit pilot policy; adjust only after reviewing provider configuration.
const MAX_HEADERS = 32768;
const MAX_TIMEOUT = 30000;
function headerObject(value) {
  const headers = new Headers(value || {});
  const output = {};
  headers.forEach((v,k) => {output[k] = v;});
  delete output.host;
  return output;
}
async function secureFetch(value, options={}) {
  const method = String(options.method || 'GET').toUpperCase();
  if(method !== 'GET' && method !== 'HEAD') throw Error('Outbound HTTP method prohibited');
  if(options.redirect && !['manual','error'].includes(options.redirect)) throw Error('Automatic redirects prohibited');
  if(options.body !== undefined && options.body !== null) throw Error('Outbound request body prohibited');
  if(options.signal && options.signal.aborted) throw Object.assign(Error('Request aborted'),{name:'AbortError'});
  const destination = await validateDestination(value,{allowedPorts: ALLOWED_PORTS});
  const url = new URL(value);
  if(url.hostname !== destination.hostname && url.hostname.replace(/\.$/,'').toLowerCase() !== destination.hostname) throw Error('Hostname normalization mismatch');
  const firstAddress = destination.addresses[0];
  const pinnedAddress = typeof firstAddress === 'string'
    ? firstAddress
    : firstAddress && firstAddress.address;
  if(net.isIP(pinnedAddress)!==4) throw Error('Unsupported pinned address');
  const client = url.protocol === 'https:' ? https : http;
  const headers = headerObject(options.headers);
  return new Promise((resolve,reject) => {
    let settled=false;
    let responseStream=null;
    let signalListener=null;
    let req;
    function cleanup() {if(options.signal && signalListener) options.signal.removeEventListener('abort',signalListener);}
    function fail(error) {if(settled) return;settled=true;cleanup();reject(error);}
    try {
      req=client.request(url,{
        method,headers,agent:false,timeout:MAX_TIMEOUT,maxHeaderSize:MAX_HEADERS,
        // Node's TCP/TLS connection uses this pinned IP; hostname remains URL host for Host/SNI/TLS verification.
        lookup:(_host,lookupOptions,callback)=>{
          const entry={address:pinnedAddress,family:4};
          if(lookupOptions && lookupOptions.all){
            callback(null,[entry]);
          }else{
            callback(null,entry.address,entry.family);
          }
        },
        rejectUnauthorized:true
      },(incoming)=>{
        responseStream=incoming;
        const status=incoming.statusCode || 502;
        if(options.redirect==='error' && status>=300 && status<400){incoming.resume();return fail(Error('Redirect prohibited'));}
        const h=new Headers();
        for(const [k,v] of Object.entries(incoming.headers)){
          if(v!==undefined) {
            try {h.set(k,Array.isArray(v)?v.join(', '):String(v));} catch(_){ /* ignore malformed upstream header */ }
          }
        }
        // Response accepts a null body for HEAD/204/205/304 only.
        const noBody=method==='HEAD'||[204,205,304].includes(status);
        let response;
        try {response=new Response(noBody?null:Readable.toWeb(incoming),{status,headers:h});}
        catch(e){incoming.destroy();return fail(e);}
        settled=true;
        // Keep abort attached while streaming; remove it on completion/close.
        incoming.once('close',cleanup);
        resolve(response);
      });
      req.on('error',fail);
      req.on('timeout',()=>req.destroy(Object.assign(Error('Upstream timed out'),{name:'TimeoutError'})));
      signalListener=()=>req.destroy(Object.assign(Error('Request aborted'),{name:'AbortError'}));
      if(options.signal) options.signal.addEventListener('abort',signalListener,{once:true});
      req.end();
    } catch(e) {if(req)req.destroy();fail(e);}
  });
}
module.exports={secureFetch};
