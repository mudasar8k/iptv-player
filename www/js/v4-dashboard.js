/* IPTV V4 visual overlay. Retains original IDs, keyboard navigation and click routes. */
(function(){
  'use strict';
  var root=null, lastHome=null, clockTimer=null;
  var primary=[['homeLiveTile','Live TV','Watch live channels','▣'],['moviesTile','Movies','Explore films','▷'],['seriesTile','Series','Watch episodes','▤']];
  var extra=[['listUser','Catch Up'],['accountTile','Multiscreen / Account'],['settingTile','Settings']];
  function get(id){return document.getElementById(id);}
  function make(tag,cls,text){var e=document.createElement(tag);e.className=cls||'';if(text!==undefined)e.textContent=text;return e;}

  var V42_ICONS={"tv":"<rect x=\"4\" y=\"6\" width=\"16\" height=\"13\" rx=\"3\"/><path d=\"M8 22h8M12 19v3\"/><path d=\"m8 2 4 4 4-4\"/>","movie":"<rect x=\"4\" y=\"5\" width=\"16\" height=\"15\" rx=\"3\"/><path d=\"M4 10h16M9 5l3 5M15 5l3 5\"/><path d=\"m10 12 5 3-5 3z\"/>","series":"<rect x=\"3\" y=\"4\" width=\"18\" height=\"16\" rx=\"2\"/><path d=\"M3 9h18M8 4l3 5M15 4l3 5M9 13h6M9 16h4\"/>","search":"<circle cx=\"10.5\" cy=\"10.5\" r=\"6.5\"/><path d=\"m16 16 5 5\"/>","settings":"<circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1\"/>","user":"<circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M4 21c0-4.3 3.4-7 8-7s8 2.7 8 7\"/>"};
  function svgIcon(key){var wrap=make('span','v4-svg');wrap.setAttribute('aria-hidden','true');wrap.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">'+(V42_ICONS[key]||'')+'</svg>';return wrap;}
  function activate(id){var el=get(id);if(!el)return;try{var f=document.querySelectorAll('.imageFocus');for(var i=0;i<f.length;i++)f[i].classList.remove('imageFocus');el.classList.add('imageFocus');sync();if(window.Keyhandler&&Keyhandler.homeKeyEnter&&window.jQuery){Keyhandler.homeKeyEnter(jQuery(el));}else{el.click();}}catch(err){console.error('V4 action error',err);}}
  function card(def,i){var e=make('button','v4-card');e.type='button';e.setAttribute('data-target',def[0]);if(i===1){e.appendChild(make('span','v4-chip','NEW'));}var ico=make('span','v4-icon');ico.appendChild(svgIcon(['tv','movie','series'][i]));e.appendChild(ico);e.appendChild(make('span','v4-label',def[1]));e.appendChild(make('span','v4-sub',def[2]));e.addEventListener('click',function(){activate(def[0]);});return e;}
  function sync(){if(!root)return;var buttons=root.querySelectorAll('[data-target]');for(var i=0;i<buttons.length;i++){var original=get(buttons[i].getAttribute('data-target'));if(original&&original.classList.contains('imageFocus'))buttons[i].classList.add('is-focused');else buttons[i].classList.remove('is-focused');}}
  function updateTime(){if(!root)return;var d=new Date();var h=d.getHours(),m=('0'+d.getMinutes()).slice(-2);root.querySelector('.v4-time').textContent=('0'+h).slice(-2)+':'+m;root.querySelector('.v4-date').textContent=d.toLocaleDateString(undefined,{weekday:'long',month:'short',day:'numeric'});}
  function build(home){root=make('div','');root.id='iptv-v4';var head=make('div','v4-top');var brand=make('div','v4-brand');var brandImg=document.createElement('img');brandImg.src='images/home-logo.png';brandImg.alt='VLC IPTV';brandImg.className='vlc-home-logo';brand.appendChild(brandImg);head.appendChild(brand);head.appendChild(make('div','v4-sep'));var mic=make('button','v4-tool');mic.appendChild(svgIcon('search'));mic.setAttribute('aria-label','Browse Live TV');mic.title='Search is available inside content categories';mic.onclick=function(){activate('homeLiveTile');};head.appendChild(mic);head.appendChild(make('span','v4-search','Search'));var settings=make('button','v4-tool');settings.appendChild(svgIcon('settings'));settings.setAttribute('aria-label','Settings');settings.title='Settings';settings.onclick=function(){activate('settingTile');};var right=make('div','v4-actions');right.appendChild(settings);var profile=make('button','v4-tool v4-profile');profile.appendChild(svgIcon('user'));profile.setAttribute('aria-label','Switch user');profile.title='Switch user';profile.onclick=function(){activate('switchUserIcon');};right.appendChild(profile);head.appendChild(right);root.appendChild(head);
   var cards=make('div','v4-cards');for(var i=0;i<primary.length;i++)cards.appendChild(card(primary[i],i));root.appendChild(cards);
   var foot=make('div','v4-foot');for(var j=0;j<extra.length;j++){if(!get(extra[j][0]))continue;var b=make('button','v4-extra',extra[j][1]);b.setAttribute('data-target',extra[j][0]);(function(id){b.onclick=function(){activate(id);};})(extra[j][0]);foot.appendChild(b);}root.appendChild(foot);
   var clock=make('div','v4-clock');clock.appendChild(make('div','v4-time','--:--'));clock.appendChild(make('div','v4-date',''));root.appendChild(clock);
   var account=make('div','v4-account','Your IPTV home');root.appendChild(account);
   document.body.appendChild(root);home.style.opacity='0';home.setAttribute('data-v4-hidden','1');lastHome=home;updateTime();clockTimer=setInterval(updateTime,30000);sync();
  }
  function clean(){if(lastHome&&lastHome.getAttribute('data-v4-hidden')==='1'){lastHome.style.opacity='';lastHome.removeAttribute('data-v4-hidden');}if(root&&root.parentNode)root.parentNode.removeChild(root);root=null;lastHome=null;if(clockTimer)clearInterval(clockTimer);clockTimer=null;}
  function tick(){var mc=get('mainContent');var first=get('homeLiveTile');var isHome=!!(mc&&mc.offsetWidth&&mc.offsetHeight&&first&&mc.contains(first)&&get('moviesTile')&&get('seriesTile'));if(!isHome){if(root)clean();return;}var home=mc.firstElementChild;if(!root||lastHome!==home){if(root)clean();build(home);}else sync();}
  var vlcNavigationObserver = new MutationObserver(function () {
    tick();
});

vlcNavigationObserver.observe(document.documentElement, {
    childList: true,
    subtree: true
});

// Observe visibility changes within the original home container.
var vlcHomeElement = get('mainContent');
if (vlcHomeElement) {
    var vlcVisibilityObserver = new MutationObserver(function () {
        tick();
    });
    vlcVisibilityObserver.observe(vlcHomeElement, {
        attributes: true,
        attributeFilter: ['style', 'class'],
        childList: true,
        subtree: true
    });
}

// Retain the original periodic check as a fallback.
setInterval(tick,250);
tick();
})();
