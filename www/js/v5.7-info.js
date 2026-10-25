/* V6.2. Native category row visual enhancement; no event handlers overridden. */
(function(){
  'use strict';
  var icons={all:'\u25a6',favourite:'\u2605',favorite:'\u2605',news:'\u25a4',cricket:'\u25c9',sport:'\u25c9',football:'\u26bd',islamic:'\u263e',movie:'\u25b6',entertainment:'\u25b6',music:'\u266b',kids:'\u263a'};
  function symbol(name){
    var key=String(name||'').toLowerCase();
    for(var k in icons){if(Object.prototype.hasOwnProperty.call(icons,k) && key.indexOf(k)!==-1)return icons[k];}
    return '\u25a3';
  }
  function safeCount(item){
    if(!item || typeof item!=='object')return null;
    var keys=['channel_count','channels_count','total_channels','totalChannels','channelCount','stream_count','streamCount'];
    for(var i=0;i<keys.length;i++){
      var v=item[keys[i]];
      if(typeof v==='number' && isFinite(v) && v>=0 && Math.floor(v)===v)return v;
      if(typeof v==='string' && /^\d+$/.test(v))return parseInt(v,10);
    }
    if(Object.prototype.toString.call(item.channels)==='[object Array]')return item.channels.length;
    if(Object.prototype.toString.call(item.streams)==='[object Array]')return item.streams.length;
    return null;
  }
  function metadata(){
    var lookup={};
    try {
      if(typeof sectionData!=='undefined' && sectionData && sectionData.length){
        for(var i=0;i<sectionData.length;i++){
          var row=sectionData[i];
          var entries=Object.prototype.toString.call(row)==='[object Array]'?row:[row];
          for(var j=0;j<entries.length;j++){
            var item=entries[j];
            if(item && item.index_number!==undefined)lookup[String(item.index_number)]=item;
          }
        }
      }
    } catch(e){}
    return lookup;
  }
  function enhance(){
    var rows=document.querySelectorAll('#allCategoriesSectionDiv .v61-simple-cell .section');
    var map=metadata();
    for(var i=0;i<rows.length;i++){
      var card=rows[i],title=card.querySelector('.floatLeft p span');
      if(!title)continue;
      var name=card.getAttribute('data-v57-name')||title.textContent||'';
      var id=String(card.getAttribute('rowindex')||'');
      var item=map[id];
      var icon=card.querySelector('.v62-icon');
      if(!icon){icon=document.createElement('span');icon.className='v62-icon';icon.setAttribute('aria-hidden','true');card.insertBefore(icon,card.firstChild);}
      icon.textContent=symbol(name);
      var count=safeCount(item);
      var badge=card.querySelector('.v62-count');
      if(count!==null){
        if(!badge){badge=document.createElement('span');badge.className='v62-count';card.appendChild(badge);}
        badge.textContent=String(count);
        badge.title=String(count)+' channels';
      } else if(badge && badge.parentNode){badge.parentNode.removeChild(badge);}
    }
  }
  function tick(){
    var roots=document.querySelectorAll('.blueBackgroundCenter');
    for(var i=0;i<roots.length;i++){
      var root=roots[i];
      var active=!!root.querySelector('#allCategoriesSectionDiv .v61-simple-row');
      if(active){root.classList.add('v61-simple-active');root.classList.remove('v57-active');}
      else root.classList.remove('v61-simple-active');
      var old=root.querySelector('#v57-info');
      if(old && old.parentNode)old.parentNode.removeChild(old);
    }
    enhance();
  }
  setInterval(tick,550);
})();
