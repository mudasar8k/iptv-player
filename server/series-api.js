'use strict';
// Authorized Xtream series metadata, bounded response and no provider URLs in client output.
function validId(v){return /^[0-9]{1,16}$/.test(String(v||''));}
async function seriesInfo(account,seriesId,decrypt){
  if(!validId(seriesId))throw Error('Invalid series ID');
  const endpoint=new URL(account.host.replace(/\/+$/,'')+'/player_api.php');
  endpoint.searchParams.set('username',account.username);
  endpoint.searchParams.set('password',decrypt(account.secret));
  endpoint.searchParams.set('action','get_series_info');
  endpoint.searchParams.set('series_id',String(seriesId));
  const ctl=new AbortController();const timer=setTimeout(()=>ctl.abort(),15000);
  try{
    const response=await fetch(endpoint,{redirect:'error',signal:ctl.signal,headers:{Accept:'application/json'}});
    if(!response.ok)throw Error('Provider series info unavailable');
    let chunks=[],size=0;
    for await(const chunk of response.body){size+=chunk.length;if(size>5*1024*1024)throw Error('Series info too large');chunks.push(chunk);}
    const info=JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if(!info || typeof info!=='object'||!info.episodes||typeof info.episodes!=='object')throw Error('Missing episode metadata');
    return info;
  }finally{clearTimeout(timer);}
}
function episodesFrom(data){
  const out=[];
  for(const season of Object.keys(data.episodes).slice(0,100)){
    const episodes=data.episodes[season];if(!Array.isArray(episodes))continue;
    for(const e of episodes.slice(0,500)){
      const id=String(e.id||'');if(!validId(id))continue;
      const ext=String(e.container_extension||'mp4').toLowerCase().replace(/^\./,'');
      out.push({id,season:String(season).slice(0,15),episode:Number(e.episode_num)||0,title:String(e.title||('Episode '+(e.episode_num||''))).slice(0,180),extension:['mp4','mkv','avi','ts','mov','webm'].includes(ext)?ext:'mp4',duration:String(e.info&&e.info.duration||'').slice(0,32)});
      if(out.length>=2000)return out;
    }
  }
  return out;
}
async function handle(req,res,url,ctx){
  const device=ctx.session(req);
  if(!device)return json(res,401,{error:'Device authorization required'});
  const accountId=url.searchParams.get('accountId');const seriesId=url.searchParams.get('seriesId');
  if(!validId(seriesId))return json(res,400,{error:'Invalid series ID'});
  if(device.permissions.series!==true||!device.accounts.includes(accountId))return json(res,403,{error:'Access denied'});
  const account=ctx.db.accounts.find(a=>a.id===accountId);
  if(!account)return json(res,404,{error:'Account unavailable'});
  try{
    const raw=await seriesInfo(account,seriesId,ctx.decryptSecret);
    const info=raw.info||{};
    const title=String(info.name||'Series').slice(0,180);
    return json(res,200,{seriesId,title,plot:String(info.plot||'').slice(0,2500),genre:String(info.genre||'').slice(0,160),rating:String(info.rating||'').slice(0,20),cover:/^https?:\/\//i.test(info.cover||'')?String(info.cover).slice(0,1500):'',episodes:episodesFrom(raw)});
  }catch(e){console.error('[series] metadata failed:',e.name);return json(res,502,{error:'Series details unavailable'});}
}
function json(res,status,body){res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(body));}
module.exports={handle,seriesInfo,episodesFrom};
