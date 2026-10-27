(function () {
  'use strict';
  var home = document.getElementById('home');
  var oldNav = home && home.querySelector('nav.tiles');
  if (!home || !oldNav || document.getElementById('p9b-dashboard')) return;
  var tileButtons = Array.prototype.slice.call(oldNav.querySelectorAll('button[data-section]'));
  if (tileButtons.length !== 4) return;
  var panel = document.createElement('div');
  panel.id = 'p9b-dashboard';
  var intro = document.createElement('section');
  intro.className = 'p9b-welcome';
  var eyebrow = document.createElement('p'); eyebrow.className = 'p9b-overline'; eyebrow.textContent = 'YOUR ENTERTAINMENT, YOUR WAY';
  var headline = document.createElement('h1'); headline.textContent = 'Everything worth watching.';
  var sub = document.createElement('p'); sub.textContent = 'Your subscribed channels, movies and series — in one place.';
  intro.appendChild(eyebrow); intro.appendChild(headline); intro.appendChild(sub);
  var nav = document.createElement('nav'); nav.className = 'p9b-navigation'; nav.setAttribute('aria-label', 'Browse entertainment');
  tileButtons.forEach(function (btn) { nav.appendChild(btn); });
  var featured = document.createElement('section'); featured.className = 'p9b-feature';
  var copy = document.createElement('div'); copy.className = 'p9b-feature-copy';
  var flabel = document.createElement('p'); flabel.className = 'p9b-overline'; flabel.textContent = 'WELCOME TO VLC IPTV';
  var ftitle = document.createElement('h2'); ftitle.textContent = 'Your next favourite starts here.';
  var fdesc = document.createElement('p'); fdesc.textContent = 'Discover the latest from your assigned catalog. Switch between Movies, Series and Live TV with your remote.';
  var browse = document.createElement('button'); browse.type = 'button'; browse.className = 'p9b-primary'; browse.textContent = 'Explore movies';
  browse.addEventListener('click', function () { tileButtons[1].click(); });
  copy.appendChild(flabel); copy.appendChild(ftitle); copy.appendChild(fdesc); copy.appendChild(browse);
  var visual = document.createElement('div'); visual.className = 'p9b-feature-art'; visual.setAttribute('aria-hidden','true');
  visual.innerHTML = '<span class="p9b-glow p9b-glow-a"></span><span class="p9b-glow p9b-glow-b"></span><span class="p9b-orb">▶</span>';
  featured.appendChild(copy); featured.appendChild(visual);
  var library = document.createElement('div'); library.className = 'p9b-library';
  function makeRow(section, title, btn) {
    var wrapper = document.createElement('section'); wrapper.className = 'p9b-row';
    var heading = document.createElement('div'); heading.className = 'p9b-row-heading';
    var label = document.createElement('h2'); label.textContent = title;
    var viewAll = document.createElement('button'); viewAll.type='button'; viewAll.className='p9b-viewall'; viewAll.textContent='Browse all  →';
    viewAll.addEventListener('click', function () { btn.click(); });
    heading.appendChild(label); heading.appendChild(viewAll);
    var list = document.createElement('div'); list.className='p9b-poster-row'; list.id='p9b-'+section+'-row';
    var pending = document.createElement('p'); pending.className='p9b-status'; pending.textContent='Loading your '+title.toLowerCase()+'…';
    list.appendChild(pending); wrapper.appendChild(heading); wrapper.appendChild(list); library.appendChild(wrapper);
    return list;
  }
  var moviesRow=makeRow('movies','Featured movies',tileButtons[1]);
  var seriesRow=makeRow('series','Discover series',tileButtons[2]);
  panel.appendChild(nav); panel.appendChild(featured); panel.appendChild(library);
  var oldHero=home.querySelector('.hero'); if(oldHero)oldHero.hidden=true;
  oldNav.replaceWith(panel);
  var hint=home.querySelector('.hint'); if(hint)hint.textContent='Navigate with arrow keys and OK, or point and click with your LG Magic Remote.';
  function validImage(value) { return typeof value==='string' && /^https:\/\//i.test(value); }
  function showItems(target, items, button) {
    target.textContent='';
    if (!items || !items.length) { var blank=document.createElement('p');blank.className='p9b-status';blank.textContent='No titles available in this category.';target.appendChild(blank);return; }
    items.slice(0,12).forEach(function (item) {
      var card=document.createElement('button'); card.type='button';card.className='p9b-poster';card.title='Browse '+(item.name||'this title');
      var imageBox=document.createElement('span');imageBox.className='p9b-poster-image';
      if(validImage(item.image)){var img=document.createElement('img');img.loading='lazy';img.referrerPolicy='no-referrer';img.alt='';img.src=item.image;img.onerror=function(){img.remove();};imageBox.appendChild(img);}
      var caption=document.createElement('span'); caption.className='p9b-poster-title';caption.textContent=item.name||'Untitled';
      card.appendChild(imageBox);card.appendChild(caption);
      card.addEventListener('click',function(){button.click();});target.appendChild(card);
    });
  }
  function fail(target, reason) { target.textContent='';var p=document.createElement('p');p.className='p9b-status';p.textContent=reason;target.appendChild(p); }
  async function readJSON(url,token) {
    var response=await fetch(url,{headers:{Authorization:'Bearer '+token},cache:'no-store'});
    if(!response.ok)throw Error('Catalog unavailable');return response.json();
  }
  async function loadSection(section, accountId, token, target, button) {
    try {
      var query=new URLSearchParams({section:section,accountId:accountId});
      var categories=await readJSON('/api/device/catalog?'+query.toString(),token);
      var arr=categories.categories||[];
      if(!arr.length){fail(target,'No available categories.');return;}
      var first=arr.find(function(c){return c && c.category_id!==undefined;});
      if(!first){fail(target,'No available categories.');return;}
      query.set('categoryId',String(first.category_id));
      var results=await readJSON('/api/device/items?'+query.toString(),token);
      showItems(target,results.items||[],button);
    } catch(e) { fail(target,'Preview unavailable. Browse the full '+section+' library instead.'); }
  }
  async function populate(){
    try {
      var token=localStorage.getItem('vlc_device_token_v1');
      if(!token){fail(moviesRow,'Pair your device to browse movies.');fail(seriesRow,'Pair your device to browse series.');return;}
      var me=await readJSON('/api/device/me',token);
      var account=me.accounts&&me.accounts[0];
      if(!account){fail(moviesRow,'No account assigned.');fail(seriesRow,'No account assigned.');return;}
      var perms=me.device&&me.device.permissions||{};
      if(perms.movies===true)loadSection('movies',account.id,token,moviesRow,tileButtons[1]);
      else fail(moviesRow,'Movies are not enabled on this device.');
      if(perms.series===true)loadSection('series',account.id,token,seriesRow,tileButtons[2]);
      else fail(seriesRow,'Series are not enabled on this device.');
    } catch(e){fail(moviesRow,'Pair your device to load content.');fail(seriesRow,'Pair your device to load content.');}
  }
  // Pairing may complete after page load; refresh previews on return to the home screen.
  var lastToken=null;
  function maybePopulate(){var token=localStorage.getItem('vlc_device_token_v1');if(token!==lastToken){lastToken=token;populate();}}
  maybePopulate();
  document.addEventListener('visibilitychange',function(){if(!document.hidden)maybePopulate();});
  window.addEventListener('focus',maybePopulate);
}());

/* Phase 9C: optional UI enhancement; does not replace playback methods. */
(function () {
  'use strict';
  if (window.__vlcPhase9C) return;
  window.__vlcPhase9C = true;
  var home = document.getElementById('home');
  var feature = document.querySelector('#p9b-dashboard .p9b-feature');
  var posterRow = document.getElementById('p9b-movies-row');
  if (home && feature && posterRow) {
    var heading = feature.querySelector('.p9b-feature-copy h2');
    var label = feature.querySelector('.p9b-feature-copy .p9b-overline');
    var description = feature.querySelector('.p9b-feature-copy > p:not(.p9b-overline)');
    var artwork = feature.querySelector('.p9b-feature-art');
    var promoted = false;
    var observer = new MutationObserver(function () {
      if (promoted) return;
      var card = posterRow.querySelector('.p9b-poster');
      var image = card && card.querySelector('img');
      var title = card && card.querySelector('.p9b-poster-title');
      if (!image || !title || !title.textContent.trim()) return;
      if (!/^https:\/\//i.test(image.src)) return;
      promoted = true;
      if (label) label.textContent = 'FROM YOUR MOVIE LIBRARY';
      if (heading) heading.textContent = title.textContent.trim();
      if (description) description.textContent = 'Explore this title and more from your assigned movie catalog.';
      if (artwork) {
        artwork.classList.add('p9c-feature-image');
        var art = document.createElement('img');
        art.alt = '';
        art.loading = 'eager';
        art.referrerPolicy = 'no-referrer';
        art.src = image.src;
        art.onerror = function () { artwork.classList.remove('p9c-feature-image'); art.remove(); };
        artwork.appendChild(art);
      }
      observer.disconnect();
    });
    observer.observe(posterRow, {childList:true,subtree:true});
    // The poster row may have been populated before this enhancement initializes.
    if (typeof MutationObserver !== 'undefined') {
      var evt = document.createElement('span'); evt.hidden = true;
      posterRow.appendChild(evt); evt.remove();
    }
  }
  var titleNode = document.querySelector('#player h1');
  if (titleNode && /HTML5 playback test/i.test(titleNode.textContent)) {
    titleNode.textContent = 'Now Playing';
  }
}());

/* VLC IPTV Phase 9D: display-only, no playback interception. */
(function () {
  'use strict';
  if (window.__vlcPhase9D) return;
  window.__vlcPhase9D = true;
  var dashboard = document.getElementById('p9b-dashboard');
  var featured = dashboard && dashboard.querySelector('.p9b-feature');
  var artBox = featured && featured.querySelector('.p9b-feature-art');
  var heading = featured && featured.querySelector('.p9b-feature-copy h2');
  var label = featured && featured.querySelector('.p9b-feature-copy .p9b-overline');
  var description = featured && featured.querySelector('.p9b-feature-copy > p:not(.p9b-overline)');
  var browse = featured && featured.querySelector('.p9b-primary');
  var movies = document.getElementById('p9b-movies-row');
  var series = document.getElementById('p9b-series-row');
  var heroSelected = false;
  function goodImage(img) {
    return img && img.complete && img.naturalWidth > 0 && /^https:\/\//i.test(img.currentSrc || img.src);
  }
  function selectHero(card, section) {
    if (!card || !artBox || !heading || !goodImage(card.querySelector('img'))) return false;
    var img = card.querySelector('img');
    var title = card.querySelector('.p9b-poster-title');
    if (!title || !title.textContent.trim()) return false;
    var prior = artBox.querySelector('.p9d-art-image');
    if (prior) prior.remove();
    var artwork = document.createElement('img');
    artwork.className = 'p9d-art-image';
    artwork.alt = '';
    artwork.referrerPolicy = 'no-referrer';
    artwork.src = img.currentSrc || img.src;
    artBox.appendChild(artwork);
    artBox.classList.add('p9d-has-artwork');
    heading.textContent = title.textContent.trim();
    if (label) label.textContent = section === 'series' ? 'FROM YOUR SERIES LIBRARY' : 'FROM YOUR MOVIE LIBRARY';
    if (description) description.textContent = 'Available in your paired entertainment catalog.';
    // Existing hero button still browses Movies; do not relabel or rewire it.
    heroSelected = true;
    return true;
  }
  function addFallbacks(row) {
    if (!row) return;
    Array.prototype.forEach.call(row.querySelectorAll('.p9b-poster'), function (card) {
      var box = card.querySelector('.p9b-poster-image');
      if (!box) return;
      var img = box.querySelector('img');
      if (img && !goodImage(img) && !img.complete) return;
      if (img && goodImage(img)) { box.classList.remove('p9d-no-art'); return; }
      box.classList.add('p9d-no-art');
      if (!box.querySelector('.p9d-placeholder')) {
        var marker = document.createElement('span');
        marker.className = 'p9d-placeholder';
        marker.textContent = 'Artwork unavailable';
        box.appendChild(marker);
      }
    });
  }
  function scan() {
    addFallbacks(movies); addFallbacks(series);
    if (heroSelected) return;
    // Prefer the series row, where this provider has useful artwork. Only pick a loaded image.
    [series, movies].some(function (row) {
      if (!row) return false;
      return Array.prototype.some.call(row.querySelectorAll('.p9b-poster'), function (card) {
        return selectHero(card, row === series ? 'series' : 'movies');
      });
    });
  }
  if (movies || series) {
    var scanQueued = false;
    function queueScan() {
      if (scanQueued) return;
      scanQueued = true;
      requestAnimationFrame(function () { scanQueued = false; scan(); });
    }
    [movies,series].forEach(function(row) {
      if (!row) return;
      row.addEventListener('load', queueScan, true);
      row.addEventListener('error', queueScan, true);
      new MutationObserver(queueScan).observe(row, {childList:true,subtree:true});
    });
    queueScan();
  }
  // Derive presentation title from the existing clicked catalog item, not from a
  // wrapper around VLCPlayItem (the earlier wrapper broke seriesId forwarding).
  var lastContentTitle = '';
  var sectionPanel = document.getElementById('section');
  if (sectionPanel) sectionPanel.addEventListener('click', function (event) {
    var node = event.target && event.target.closest ? event.target.closest('button') : null;
    if (!node) return;
    var card = node.closest('.vlc-item,.catalog-item,.series-episode,.episode-item');
    var raw = (card || node).textContent || '';
    var title = raw.replace(/\s+/g,' ').trim();
    if (title && title.length <= 160) lastContentTitle = title;
  }, true);
  var player = document.getElementById('player');
  var video = document.getElementById('video');
  var playerHeading = player && player.querySelector('h1');
  function updatePlayerTitle() {
    if (!playerHeading || !player || /\bhidden\b/.test(player.className)) return;
    if (lastContentTitle) playerHeading.textContent = lastContentTitle;
    else playerHeading.textContent = 'Now Playing';
  }
  if (player && playerHeading) {
    new MutationObserver(updatePlayerTitle).observe(player,{attributes:true,attributeFilter:['class']});
    if (video) video.addEventListener('play',updatePlayerTitle);
  }
}());

/* Phase 9E: consistent desktop/webOS UI and context-correct featured action. */
(function () {
  'use strict';
  if (window.__vlcPhase9E) return;
  window.__vlcPhase9E = true;
  var dashboard = document.getElementById('p9b-dashboard');
  if (!dashboard) return;
  var hero = dashboard.querySelector('.p9b-feature');
  var button = hero && hero.querySelector('.p9b-primary');
  var label = hero && hero.querySelector('.p9b-feature-copy .p9b-overline');
  var nav = dashboard.querySelector('.p9b-navigation');
  if (!button || !label || !nav) return;
  var movieButton = nav.querySelector('[data-section="movies"]');
  var seriesButton = nav.querySelector('[data-section="series"]');
  function featuredSection() {
    return label.textContent.trim() === 'FROM YOUR SERIES LIBRARY' ? 'series' : 'movies';
  }
  function updateButton() {
    var section = featuredSection();
    button.textContent = section === 'series' ? 'Explore series' : 'Explore movies';
    button.setAttribute('aria-label', section === 'series' ? 'Browse series' : 'Browse movies');
  }
  // Capture precedes the 9B button listener; prevent its hardcoded Movies action.
  button.addEventListener('click', function (event) {
    var section = featuredSection();
    var target = section === 'series' ? seriesButton : movieButton;
    if (!target) return; // Preserve original action if expected navigation is absent.
    event.stopImmediatePropagation();
    target.click();
  }, true);
  if (typeof MutationObserver === 'function') {
    new MutationObserver(updateButton).observe(label, {childList:true,characterData:true,subtree:true});
  }
  updateButton();
}());
