(function () {
  'use strict';
  var current = 'home';
  var previous = 'home';
  var lastHomeFocus = null;
  var names = {live:'Live TV', movies:'Movies', series:'Series', favorites:'Favourites'};
  var sections = {home:document.getElementById('home'), section:document.getElementById('section'), player:document.getElementById('player')};
  var video = document.getElementById('video');
  var backSection = document.getElementById('back-section');
  var backPlayer = document.getElementById('back-player');
  function focusFirst() {
    var area = sections[current];
    var first = area.querySelector('button:not([disabled])');
    if (first) { first.focus(); }
  }
  function screen(name) {
    var key;
    for (key in sections) {
      if (Object.prototype.hasOwnProperty.call(sections,key)) {
        sections[key].className = 'screen' + (key === name ? '' : ' hidden');
      }
    }
    current = name;
    if (name === 'home' && lastHomeFocus) { lastHomeFocus.focus(); }
    else { focusFirst(); }
  }
  function openSection(name) {
    if (!names[name]) return;
    lastHomeFocus = document.activeElement;
    document.getElementById('section-title').textContent = names[name];
    screen('section');
  }
  function goBack() {
    if (current === 'player') { video.pause(); video.removeAttribute('src'); video.load(); screen(previous); return; }
    if (current === 'section') { screen('home'); return; }
    // On Home, leave system Back behavior to webOS (no forced application exit).
  }
  function openPlayer(url) {
    if (!url || !/^https?:\/\//i.test(url)) return;
    previous = current;
    screen('player');
    video.src = url;
    var result = video.play();
    if (result && result.catch) result.catch(function () { document.getElementById('player-error').textContent = 'Playback blocked or unsupported on this device.'; });
  }
  function focusDirection(key) {
    var area = sections[current];
    var elements = area.querySelectorAll('button:not([disabled])');
    var active = document.activeElement;
    var src = active && active.getBoundingClientRect ? active.getBoundingClientRect() : null;
    var best = null, score = Infinity, i, r, dx, dy, distance;
    if (!src || !elements.length) { focusFirst(); return; }
    var sx = src.left + src.width/2, sy = src.top + src.height/2;
    for (i = 0; i < elements.length; i++) {
      if (elements[i] === active) continue;
      r = elements[i].getBoundingClientRect();
      dx = r.left + r.width/2 - sx; dy = r.top + r.height/2 - sy;
      if ((key===37 && dx>=-4) || (key===39 && dx<=4) || (key===38 && dy>=-4) || (key===40 && dy<=4)) continue;
      distance = (key===37 || key===39) ? Math.abs(dx)+Math.abs(dy)*2 : Math.abs(dy)+Math.abs(dx)*2;
      if (distance<score) {score=distance;best=elements[i];}
    }
    if (best) { best.focus(); best.scrollIntoView({block:'nearest',inline:'nearest'}); }
  }
  document.addEventListener('keydown', function (e) {
    var k=e.keyCode || e.which;
    if (k===461 || k===27 || k===8) {
      if (current!=='home') {e.preventDefault();goBack();}
    } else if (k>=37 && k<=40) {
      if (current!=='player') {e.preventDefault();focusDirection(k);}
    } else if (k===13) {
      if (document.activeElement && document.activeElement.click) {e.preventDefault();document.activeElement.click();}
    }
  }, false);
  var tiles = document.querySelectorAll('[data-section]');
  for (var i=0;i<tiles.length;i++) {
    tiles[i].addEventListener('click', function () {openSection(this.getAttribute('data-section'));});
    tiles[i].addEventListener('mouseenter', function () {this.focus();});
  }
  backSection.addEventListener('click',goBack);
  backPlayer.addEventListener('click',goBack);
  video.addEventListener('error', function () {document.getElementById('player-error').textContent='This stream/container/codec is not supported or could not be reached.';});
  window.VLCTV = { openPlayer:openPlayer, openSection:openSection, goBack:goBack };
  focusFirst();
}());
