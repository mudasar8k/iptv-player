'use strict';
const assert=require('node:assert/strict');
const {validPublicIp,parseDestination,validateDestination}=require('./destination-policy');
const blocked=['127.0.0.1','10.1.2.3','192.168.1.1','172.16.0.1','169.254.169.254','100.64.0.1','0.1.2.3','198.18.1.1','224.0.0.1','255.255.255.255','::1','::ffff:127.0.0.1'];
const allowed=['1.1.1.1','8.8.8.8','45.88.0.17','103.169.98.234'];
for(const address of blocked) assert.equal(validPublicIp(address),false,address);
for(const address of allowed) assert.equal(validPublicIp(address),true,address);
for(const value of ['http://127.0.0.1','http://2130706433/','http://0x7f000001/','http://169.254.169.254/latest','http://[::1]/','http://localhost/','file:///etc/passwd','http://user:pass@1.1.1.1/']){
  let denied=false;try{const item=parseDestination(value);if(!validPublicIp(item.hostname))denied=true;}catch(_){denied=true;}assert.equal(denied,true,value);
}
(async()=>{
  await assert.rejects(()=>validateDestination('http://127.0.0.1'));
  const ok=await validateDestination('https://1.1.1.1');
  assert.equal(ok.addresses[0],'1.1.1.1');
  console.log('PASS: blocked networks, numeric URL aliases, credentials, schemes and public IPv4');
  console.log('NOTE: This is a validator test, not transport-level SSRF protection.');
})().catch(e=>{console.error(e.message);process.exitCode=1});
