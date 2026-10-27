'use strict';
// Phase 10D1: defensive destination screening only.
// This module does NOT replace connection-time IP pinning.
const dns = require('node:dns').promises;
const net = require('node:net');
const {domainToASCII} = require('node:url');
const blocked = new net.BlockList();
const blockedCidrs = [
  ['0.0.0.0',8],['10.0.0.0',8],['100.64.0.0',10],
  ['127.0.0.0',8],['169.254.0.0',16],['172.16.0.0',12],
  ['192.0.0.0',24],['192.0.2.0',24],['192.168.0.0',16],
  ['198.18.0.0',15],['198.51.100.0',24],['203.0.113.0',24],
  ['224.0.0.0',4],['240.0.0.0',4]
];
for(const [prefix,bits] of blockedCidrs) blocked.addSubnet(prefix,bits,'ipv4');
function validPublicIp(address){
  // Conservative IPv4-only policy pending vetted IPv6 and embedded-address handling.
  return net.isIP(address)===4 && !blocked.check(address,'ipv4');
}
function parseDestination(value,opts={}){
  const url = value instanceof URL ? value : new URL(value);
  if(!['http:','https:'].includes(url.protocol) || url.username || url.password || url.hash) throw Error('Destination URL prohibited');
  if(!url.hostname || url.hostname.length>253) throw Error('Destination hostname invalid');
  const normalizedHost = domainToASCII(url.hostname.replace(/\.$/,''));
  if(!normalizedHost || normalizedHost !== url.hostname.replace(/\.$/,'').toLowerCase()) throw Error('Destination hostname invalid');
  if(normalizedHost==='localhost' || normalizedHost.endsWith('.localhost') || normalizedHost.endsWith('.local') || normalizedHost.endsWith('.internal')) throw Error('Local destination prohibited');
  if(opts.allowedPorts && !opts.allowedPorts.includes(Number(url.port || (url.protocol==='https:'?443:80)))) throw Error('Destination port prohibited');
  return {url,hostname:normalizedHost};
}
async function validateDestination(value,opts={}){
  const {url,hostname}=parseDestination(value,opts);
  let addresses = net.isIP(hostname) ? [{address:hostname,family:net.isIP(hostname)}] : await dns.lookup(hostname,{all:true,verbatim:true});
  
  // Filter for valid public IPv4 addresses (ignoring IPv6 / loopback)
  const validIpv4s = addresses.filter(x => validPublicIp(x.address));
  if(!validIpv4s.length) {
    console.error('[validateDestination] No valid public IPv4 address for host:', hostname, 'resolved addresses:', addresses);
    throw Error('Destination DNS/IP prohibited');
  }
  
  return {
    protocol:url.protocol,
    hostname,
    port:Number(url.port||(url.protocol==='https:'?443:80)),
    addresses:validIpv4s.map(x=>x.address)
  };
}
module.exports={validPublicIp,parseDestination,validateDestination};
