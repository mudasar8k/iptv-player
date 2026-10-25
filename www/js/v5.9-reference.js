/* V5.9.1: repair layout without replacing native selection or player. */
(function(){
 'use strict';
 var currentPanel=null;
 function clear(){
   if(currentPanel){currentPanel.classList.remove('v591-panel');currentPanel=null;}
 }
 function label(name, cls, text){var e=document.createElement(name);e.className=cls;e.textContent=text;return e;}
 function update(){
   var list=document.getElementById('allCategoriesSectionDiv');
   var bg=list&&list.closest('.blueBackgroundCenter');
   var panel=bg&&bg.querySelector('#v57-info');
   if(!list||!bg||!panel||!list.querySelector('.v57-row')){clear();return;}
   if(currentPanel!==panel){clear();currentPanel=panel;panel.classList.add('v591-panel');
     // Keep the existing v57-title element: the original v5.7 script updates it.
     var title=panel.querySelector('.v57-title');
     var hint=panel.querySelector('.v57-hint');
     var eyebrow=panel.querySelector('.v57-eyebrow');
     if(eyebrow)eyebrow.textContent='LIVE TV / CATEGORY';
     if(hint)hint.textContent='Select a category on the left to open its live channels.';
     var hero=document.createElement('div');hero.className='v591-art';hero.setAttribute('aria-hidden','true');
     hero.innerHTML='<span class="v591-monitor"><span class="v591-play"></span></span>';
     if(title)panel.insertBefore(hero,title);
     var footer=label('div','v591-footer','Press Enter or click a category to browse channels.');
     panel.appendChild(footer);
   }
 }
 setInterval(update,800);
})();
