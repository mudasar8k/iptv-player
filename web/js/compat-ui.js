(function(){
  'use strict';
  var player=document.getElementById('player');
  var video=document.getElementById('video');
  if(!player||!video)return;
  var btn=document.createElement('button');
  btn.type='button';btn.textContent='Compatibility Mode (Live TV)';btn.id='vlc-compat-button';
  btn.style.cssText='padding:12px 20px;margin:12px;background:#4b206b;color:white;border:2px solid #be87f7;border-radius:12px;font-size:18px;cursor:pointer;';
  player.insertBefore(btn,video);
  btn.style.display='none';
  var message=document.createElement('p');message.id='vlc-compat-status';player.insertBefore(message,video);
  var original=window.VLCPlayItem;
  if(typeof original!=='function')return;
  window.VLCPlayItem=async function(section,accountId,itemId,name){
    window.VLCCompatMediaPath=null;
    btn.style.display=section==='live'?'inline-block':'none';
    message.textContent='';
    await original(section,accountId,itemId,name);
    if(section==='live' && /^\/api\/play\/media\/[a-f0-9]{48}\/[a-f0-9]{24}$/.test(new URL(video.currentSrc,location.href).pathname)) {
      window.VLCCompatMediaPath=new URL(video.currentSrc,location.href).pathname;
    }
  };
  function auth(){return {'Authorization':'Bearer '+localStorage.getItem('vlc_device_token_v1'),'Content-Type':'application/json'};}
  async function stop(){
    try{await fetch('/api/play/compat/stop',{method:'POST',headers:auth()});}catch(_){}
  }
  document.getElementById('back-player').addEventListener('click',stop);
  document.addEventListener('keydown',function(e){if([461,27,8].includes(e.keyCode))stop();});
  btn.addEventListener('click',async function(){
    var media=window.VLCCompatMediaPath;
    if(!media){message.textContent='Choose a Live TV channel again before using Compatibility Mode.';return;}
    btn.disabled=true;message.textContent='Starting compatibility conversion...';
    try {
      var r=await fetch('/api/play/compat/start',{method:'POST',headers:auth(),body:JSON.stringify({mediaPath:media})});
      var data=await r.json();
      if(!r.ok)throw Error(data.error||'Unable to start transcoder');
      var ready=false;
      for(var i=0;i<30;i++){
        await new Promise(function(resolve){setTimeout(resolve,1000);});
        var probe=await fetch(data.playlist,{cache:'no-store'});
        if(probe.ok){ready=true;break;}
        if(probe.status===403||probe.status===404)break;
      }
      if(!ready)throw Error('Compatibility stream did not become ready');
      video.pause();video.src=data.playlist;video.load();
      var play=video.play();if(play&&play.catch)await play;
      message.textContent='Compatibility Mode active';
    }catch(e){message.textContent='Compatibility Mode: '+e.message;}
    finally{btn.disabled=false;}
  });
}());
