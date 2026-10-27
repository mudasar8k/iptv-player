(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════
     VLC IPTV — Main UI controller (vlc-ui.js)
     Replaces tv.js + home9b.js combined.
     Preserves all existing window.VLCPlayItem / window.VLCLoadCategories
     / window.VLCCatalogBack / window.VLCSeriesOpen contracts.
  ═══════════════════════════════════════════════════════ */

  /* ── Clock ── */
  var clockEl = document.getElementById('vlc-clock');
  function updateClock() {
    if (!clockEl) return;
    var now = new Date();
    var h = now.getHours(), m = now.getMinutes();
    clockEl.textContent =
      (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
  }
  updateClock();
  setInterval(updateClock, 15000);

  /* ── Screen management ── */
  var current = 'home';
  var previous = 'home';
  var screens = {
    home:    document.getElementById('home'),
    section: document.getElementById('section'),
    player:  document.getElementById('player')
  };
  var video = document.getElementById('video');

  function showScreen(name) {
    Object.keys(screens).forEach(function (k) {
      var el = screens[k];
      if (!el) return;
      if (k === name) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });
    // Sync nav active state
    document.querySelectorAll('.nav-btn').forEach(function (btn) {
      var sec = btn.getAttribute('data-section');
      btn.classList.toggle('nav-btn--active', sec === name || (name === 'home' && sec === 'home'));
    });
    current = name;
  }

  /* ── Nav buttons ── */
  document.querySelectorAll('.nav-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var sec = btn.getAttribute('data-section');
      if (!sec) return;
      if (sec === 'home') {
        showScreen('home');
      } else {
        openSection(sec);
      }
    });
  });

  /* ── Hero action buttons ── */
  document.querySelectorAll('.hero-btn[data-section]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openSection(btn.getAttribute('data-section'));
    });
  });

  /* ── Row "Browse all" buttons ── */
  document.querySelectorAll('.row-viewall[data-section]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openSection(btn.getAttribute('data-section'));
    });
  });

  /* ── Section names ── */
  var sectionNames = {
    live:      'Live TV',
    movies:    'Movies',
    series:    'Series',
    favorites: 'Favourites'
  };

  function openSection(name) {
    if (name === 'home') { showScreen('home'); return; }
    var titleEl = document.getElementById('section-title');
    if (titleEl) titleEl.textContent = sectionNames[name] || name;
    previous = current;
    showScreen('section');
    if (window.VLCLoadCategories) window.VLCLoadCategories(name);
  }

  /* ── Back buttons ── */
  var backSection = document.getElementById('back-section');
  var backPlayer  = document.getElementById('back-player');

  function goBack() {
    if (current === 'player') {
      if (currentPlayback && video && video.currentTime > 10) {
        recordProgress(currentPlayback, video.currentTime, video.duration);
      }
      hideResumePrompt();
      if (window._currentHls) {
        window._currentHls.destroy();
        window._currentHls = null;
      }
      video.pause();
      video.removeAttribute('src');
      video.load();
      var titleEl = document.getElementById('player-title');
      if (titleEl) titleEl.textContent = '';
      var errEl = document.getElementById('player-error');
      if (errEl) errEl.textContent = '';
      var audioBtn = document.getElementById('player-audio-btn');
      if (audioBtn) audioBtn.style.display = 'none';
      currentPlayback = null;
      showScreen(previous);
      loadContinueWatchingRow();
      return;
    }
    if (current === 'section') {
      if (window.VLCCatalogBack && window.VLCCatalogBack()) return;
      showScreen('home');
      loadContinueWatchingRow();
      return;
    }
  }

  if (backSection) backSection.addEventListener('click', goBack);
  if (backPlayer)  backPlayer.addEventListener('click', goBack);

  /* ── Keyboard / remote ── */
  document.addEventListener('keydown', function (e) {
    var k = e.keyCode || e.which;
    // Back / Escape / webOS Back key
    if (k === 461 || k === 27 || k === 8) {
      if (current !== 'home') { e.preventDefault(); goBack(); }
    // Arrow navigation
    } else if (k >= 37 && k <= 40) {
      if (current !== 'player') { e.preventDefault(); focusNearest(k); }
    // OK / Enter
    } else if (k === 13) {
      if (document.activeElement && document.activeElement.click) {
        e.preventDefault();
        document.activeElement.click();
      }
    }
  }, false);

  function focusNearest(key) {
    var area = screens[current];
    if (!area) return;

    var sidebar = document.getElementById('vlc-sidebar');
    var isInsideSidebar = sidebar && sidebar.contains(document.activeElement);

    // If on sidebar and pressing Right, focus first item in content area
    if (isInsideSidebar && key === 39) {
      var contentBtn = area.querySelector('button:not([disabled]), input:not([disabled])');
      if (contentBtn) { contentBtn.focus(); contentBtn.scrollIntoView({ block: 'nearest' }); return; }
    }

    // Collect candidates
    var els = Array.from(area.querySelectorAll('button:not([disabled]), input:not([disabled])'));
    if (sidebar) {
      var sideBtns = Array.from(sidebar.querySelectorAll('button:not([disabled])'));
      els = els.concat(sideBtns);
    }

    var active = document.activeElement;
    if (!active || !active.getBoundingClientRect) {
      if (els[0]) els[0].focus();
      return;
    }

    var src = active.getBoundingClientRect();
    var sx = src.left + src.width / 2, sy = src.top + src.height / 2;
    var best = null, score = Infinity;

    for (var i = 0; i < els.length; i++) {
      if (els[i] === active) continue;
      var r = els[i].getBoundingClientRect();
      var dx = r.left + r.width / 2 - sx;
      var dy = r.top + r.height / 2 - sy;

      if ((key === 37 && dx >= -4) || (key === 39 && dx <= 4) ||
          (key === 38 && dy >= -4) || (key === 40 && dy <= 4)) continue;

      var d = (key === 37 || key === 39)
        ? Math.abs(dx) + Math.abs(dy) * 1.8
        : Math.abs(dy) + Math.abs(dx) * 1.8;

      if (d < score) { score = d; best = els[i]; }
    }

    if (best) {
      best.focus();
      best.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  }

  /* ═══════════════════════════════════════════════════════
     PLAYBACK PROGRESS & RESUME SYSTEM
  ═══════════════════════════════════════════════════════ */
  var PROGRESS_KEY = 'vlc_watch_progress_v1';

  function formatTime(sec) {
    var s = Math.floor(sec || 0);
    var h = Math.floor(s / 3600);
    var m = Math.floor((s % 3600) / 60);
    var remS = s % 60;
    if (h > 0) {
      return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m + ':' + (remS < 10 ? '0' : '') + remS;
    }
    return (m < 10 ? '0' : '') + m + ':' + (remS < 10 ? '0' : '') + remS;
  }

  function loadAllProgress() {
    try {
      return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
    } catch (_) {
      return {};
    }
  }

  function saveAllProgress(all) {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
    } catch (_) {}
  }

  function getProgress(section, itemId, accountId) {
    if (section === 'live') return null;
    var all = loadAllProgress();
    var key = String(accountId) + '_' + section + '_' + String(itemId);
    return all[key] || null;
  }

  function recordProgress(playback, currentTime, duration) {
    if (!playback || playback.section === 'live' || !currentTime || currentTime < 10) return;
    var all = loadAllProgress();
    var key = String(playback.accountId) + '_' + playback.section + '_' + String(playback.itemId);

    // If watched >= 92% of duration, consider finished and remove from continue watching
    if (duration && duration > 30 && (currentTime / duration) >= 0.92) {
      delete all[key];
      saveAllProgress(all);
      return;
    }

    var percent = (duration && duration > 0) ? Math.min(100, Math.round((currentTime / duration) * 100)) : 0;
    all[key] = {
      key: key,
      accountId: playback.accountId,
      section: playback.section,
      itemId: playback.itemId,
      name: playback.name || 'Untitled',
      seriesId: playback.seriesId,
      image: playback.image || '',
      position: Math.floor(currentTime),
      duration: Math.floor(duration || 0),
      percent: percent,
      updatedAt: Date.now()
    };

    // Keep up to 40 recent items
    var keys = Object.keys(all);
    if (keys.length > 40) {
      keys.sort(function (a, b) { return (all[a].updatedAt || 0) - (all[b].updatedAt || 0); });
      delete all[keys[0]];
    }

    saveAllProgress(all);
  }

  function removeProgress(section, itemId, accountId) {
    var all = loadAllProgress();
    var key = String(accountId) + '_' + section + '_' + String(itemId);
    if (all[key]) {
      delete all[key];
      saveAllProgress(all);
    }
  }

  var resumePrompt = document.getElementById('player-resume-prompt');
  var resumeTimeText = document.getElementById('resume-time-text');
  var resumeBtnYes = document.getElementById('resume-btn-yes');
  var resumeBtnNo = document.getElementById('resume-btn-no');
  var resumePromptTimer = null;

  function hideResumePrompt() {
    if (resumePromptTimer) {
      clearTimeout(resumePromptTimer);
      resumePromptTimer = null;
    }
    if (resumePrompt) resumePrompt.style.display = 'none';
  }

  var currentPlayback = null;
  var audioBtn = document.getElementById('player-audio-btn');
  var audioLabel = document.getElementById('player-audio-label');
  var favBtn = document.getElementById('player-fav-btn');
  var favLabel = document.getElementById('player-fav-label');

  window.VLCFavoritesList = [];

  function updatePlayerFavUI(isFav) {
    if (!favBtn) return;
    if (isFav) {
      favBtn.classList.add('player-fav-btn--active');
      if (favLabel) favLabel.textContent = 'Favorited';
      favBtn.title = 'Remove from Favorites';
    } else {
      favBtn.classList.remove('player-fav-btn--active');
      if (favLabel) favLabel.textContent = 'Favorite';
      favBtn.title = 'Add to Favorites';
    }
  }

  function isItemFavorited(section, itemId, accountId) {
    if (!window.VLCFavoritesList || !Array.isArray(window.VLCFavoritesList)) return false;
    return window.VLCFavoritesList.some(function (f) {
      return f.section === section && String(f.itemId) === String(itemId) && String(f.accountId) === String(accountId);
    });
  }

  if (favBtn) {
    favBtn.addEventListener('click', async function () {
      if (!currentPlayback) return;
      var token = localStorage.getItem('vlc_device_token_v1');
      if (!token) return;

      try {
        favBtn.disabled = true;
        var res = await fetch('/api/device/favorites/toggle', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
          body: JSON.stringify({
            accountId: currentPlayback.accountId,
            section: currentPlayback.section,
            itemId: currentPlayback.itemId,
            name: currentPlayback.name,
            image: currentPlayback.image || '',
            seriesId: currentPlayback.seriesId
          })
        });
        var data = await res.json();
        if (res.ok) {
          window.VLCFavoritesList = data.favorites || [];
          updatePlayerFavUI(data.isFavorite);
          loadFavoritesRow();
        }
      } catch (_) {
      } finally {
        favBtn.disabled = false;
      }
    });
  }

  if (audioBtn) {
    audioBtn.addEventListener('click', function () {
      if (!currentPlayback || !currentPlayback.audioUrl) return;
      var curTime = video.currentTime || 0;
      var errEl = document.getElementById('player-error');
      if (errEl) errEl.textContent = '';

      if (!currentPlayback.isCompat) {
        currentPlayback.isCompat = true;
        audioBtn.classList.add('audio-fix-btn--active');
        if (audioLabel) audioLabel.textContent = '✓ Audio: AAC (Active)';
        video.src = currentPlayback.audioUrl + (curTime > 0 ? '?t=' + Math.floor(curTime) : '');
        video.play().catch(function () {});
      } else {
        currentPlayback.isCompat = false;
        audioBtn.classList.remove('audio-fix-btn--active');
        if (audioLabel) audioLabel.textContent = 'Fix Audio (AAC)';
        video.src = currentPlayback.directUrl;
        video.currentTime = curTime;
        video.play().catch(function () {});
      }
    });
  }

  /* ═══════════════════════════════════════════════════════
     SMART TV PLAYER HUD & SCRUB CONTROLS
  ═══════════════════════════════════════════════════════ */
  var playerScreen = document.getElementById('player');
  var curTimeText = document.getElementById('player-cur-time');
  var totalTimeText = document.getElementById('player-total-time');
  var scrubTrack = document.getElementById('player-scrub-track');
  var scrubFill = document.getElementById('player-scrub-fill');
  var scrubThumb = document.getElementById('player-scrub-thumb');
  var ctrlPlayPause = document.getElementById('ctrl-playpause');
  var ctrlPlayIcon = document.getElementById('ctrl-play-icon');
  var ctrlPauseIcon = document.getElementById('ctrl-pause-icon');
  var ctrlRewind = document.getElementById('ctrl-rewind');
  var ctrlForward = document.getElementById('ctrl-forward');
  var centerGlyph = document.getElementById('player-center-glyph');
  var hudHideTimer = null;

  function showHud() {
    if (!playerScreen) return;
    playerScreen.classList.remove('hud-hidden');
    resetHudTimer();
  }

  function resetHudTimer() {
    if (hudHideTimer) clearTimeout(hudHideTimer);
    if (!video || video.paused) return; // Keep visible while paused
    hudHideTimer = setTimeout(function () {
      if (playerScreen && current === 'player' && video && !video.paused) {
        playerScreen.classList.add('hud-hidden');
      }
    }, 4000);
  }

  if (playerScreen) {
    playerScreen.addEventListener('mousemove', showHud);
    playerScreen.addEventListener('click', showHud);
    playerScreen.addEventListener('touchstart', showHud, { passive: true });
  }

  function flashCenterGlyph(isPlay) {
    if (!centerGlyph) return;
    centerGlyph.innerHTML = isPlay
      ? '<svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48"><polygon points="6 3 20 12 6 21 6 3"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
    centerGlyph.style.display = 'flex';
    setTimeout(function () { if (centerGlyph) centerGlyph.style.display = 'none'; }, 600);
  }

  function togglePlayPause() {
    if (!video) return;
    if (video.paused) {
      video.play().catch(function () {});
      if (ctrlPlayIcon) ctrlPlayIcon.style.display = 'none';
      if (ctrlPauseIcon) ctrlPauseIcon.style.display = 'block';
      flashCenterGlyph(true);
      resetHudTimer();
    } else {
      video.pause();
      if (ctrlPlayIcon) ctrlPlayIcon.style.display = 'block';
      if (ctrlPauseIcon) ctrlPauseIcon.style.display = 'none';
      flashCenterGlyph(false);
      showHud();
    }
  }

  if (ctrlPlayPause) {
    ctrlPlayPause.addEventListener('click', togglePlayPause);
  }

  if (ctrlRewind) {
    ctrlRewind.addEventListener('click', function () {
      if (video) {
        video.currentTime = Math.max(0, video.currentTime - 10);
        showHud();
      }
    });
  }

  if (ctrlForward) {
    ctrlForward.addEventListener('click', function () {
      if (video) {
        video.currentTime = Math.min(video.duration || Infinity, video.currentTime + 10);
        showHud();
      }
    });
  }

  if (scrubTrack) {
    scrubTrack.addEventListener('click', function (e) {
      if (!video || !video.duration) return;
      var rect = scrubTrack.getBoundingClientRect();
      var pos = (e.clientX - rect.left) / rect.width;
      video.currentTime = Math.max(0, Math.min(video.duration, pos * video.duration));
      showHud();
    });
  }

  var scrubBuffer = document.getElementById('player-scrub-buffer');
  var ctrlVolume = document.getElementById('ctrl-volume');
  var volSlider = document.getElementById('vol-slider');
  var volIconHigh = document.getElementById('vol-icon-high');
  var volIconMute = document.getElementById('vol-icon-mute');
  var ctrlFullscreen = document.getElementById('ctrl-fullscreen');
  var fsIconEnter = document.getElementById('fs-icon-enter');
  var fsIconExit = document.getElementById('fs-icon-exit');
  var ctrlMore = document.getElementById('ctrl-more');
  var moreMenu = document.getElementById('player-more-menu');
  var optDownload = document.getElementById('opt-download');
  var optSpeed = document.getElementById('opt-speed');
  var speedLabel = document.getElementById('speed-label');
  var optPip = document.getElementById('opt-pip');
  var optAspect = document.getElementById('opt-aspect');
  var aspectLabel = document.getElementById('aspect-label');

  // Direct Stream Download
  if (optDownload) {
    optDownload.addEventListener('click', function () {
      if (!currentPlayback || !currentPlayback.directUrl) return;
      var a = document.createElement('a');
      a.href = currentPlayback.directUrl;
      a.download = (currentPlayback.name || 'stream') + '.mp4';
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      if (moreMenu) moreMenu.style.display = 'none';
      showHud();
    });
  }

  /* ── Volume & Mute Controls ── */
  var lastVolume = 1;
  function updateVolIcons(muted, val) {
    var isMute = muted || val === 0;
    if (volIconHigh) volIconHigh.style.display = isMute ? 'none' : 'block';
    if (volIconMute) volIconMute.style.display = isMute ? 'block' : 'none';
  }

  if (volSlider) {
    volSlider.addEventListener('input', function () {
      if (!video) return;
      var val = Number(this.value);
      video.volume = val;
      video.muted = (val === 0);
      if (val > 0) lastVolume = val;
      updateVolIcons(video.muted, val);
      showHud();
    });
  }

  if (ctrlVolume) {
    ctrlVolume.addEventListener('click', function () {
      if (!video) return;
      video.muted = !video.muted;
      if (video.muted) {
        if (volSlider) volSlider.value = 0;
      } else {
        if (video.volume === 0) video.volume = lastVolume || 1;
        if (volSlider) volSlider.value = video.volume;
      }
      updateVolIcons(video.muted, video.volume);
      showHud();
    });
  }

  /* ── Fullscreen Toggle ── */
  function isFs() {
    return Boolean(document.fullscreenElement || document.webkitFullscreenElement);
  }

  function updateFsIcon() {
    var fs = isFs();
    if (fsIconEnter) fsIconEnter.style.display = fs ? 'none' : 'block';
    if (fsIconExit) fsIconExit.style.display = fs ? 'block' : 'none';
  }

  function toggleFullscreen() {
    var target = playerScreen || document.documentElement;
    if (!isFs()) {
      if (target.requestFullscreen) { target.requestFullscreen().catch(function () {}); }
      else if (target.webkitRequestFullscreen) { target.webkitRequestFullscreen(); }
      else if (video && video.webkitEnterFullscreen) { video.webkitEnterFullscreen(); }
    } else {
      if (document.exitFullscreen) { document.exitFullscreen().catch(function () {}); }
      else if (document.webkitExitFullscreen) { document.webkitExitFullscreen(); }
    }
    showHud();
  }

  if (ctrlFullscreen) {
    ctrlFullscreen.addEventListener('click', toggleFullscreen);
  }
  document.addEventListener('fullscreenchange', updateFsIcon);
  document.addEventListener('webkitfullscreenchange', updateFsIcon);

  /* ── More Options Dropup (Speed, PiP, Aspect) ── */
  if (ctrlMore && moreMenu) {
    ctrlMore.addEventListener('click', function (e) {
      e.stopPropagation();
      var isHidden = moreMenu.style.display === 'none';
      moreMenu.style.display = isHidden ? 'flex' : 'none';
      showHud();
    });

    document.addEventListener('click', function (e) {
      if (moreMenu && !moreMenu.contains(e.target) && e.target !== ctrlMore) {
        moreMenu.style.display = 'none';
      }
    });
  }

  // Playback Speed
  var speeds = [1.0, 1.25, 1.5, 2.0, 0.75];
  var currentSpeedIdx = 0;
  if (optSpeed) {
    optSpeed.addEventListener('click', function () {
      if (!video) return;
      currentSpeedIdx = (currentSpeedIdx + 1) % speeds.length;
      var newRate = speeds[currentSpeedIdx];
      video.playbackRate = newRate;
      if (speedLabel) speedLabel.textContent = newRate === 1.0 ? 'Normal' : (newRate + 'x');
      showHud();
    });
  }

  // Picture in Picture
  if (optPip) {
    optPip.addEventListener('click', async function () {
      if (!video) return;
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        } else if (video.requestPictureInPicture) {
          await video.requestPictureInPicture();
        }
      } catch (_) {}
      showHud();
    });
  }

  // Aspect Ratio Fit (Contain / Cover / Fill)
  var aspects = [
    { label: 'Fit', mode: 'contain' },
    { label: 'Cover', mode: 'cover' },
    { label: 'Stretch', mode: 'fill' }
  ];
  var aspectIdx = 0;
  if (optAspect) {
    optAspect.addEventListener('click', function () {
      if (!video) return;
      aspectIdx = (aspectIdx + 1) % aspects.length;
      video.style.objectFit = aspects[aspectIdx].mode;
      if (aspectLabel) aspectLabel.textContent = aspects[aspectIdx].label;
      showHud();
    });
  }

  if (video) {
    video.addEventListener('timeupdate', function () {
      if (!video || !video.duration) return;
      var cur = video.currentTime || 0;
      var dur = video.duration || 0;
      if (curTimeText) curTimeText.textContent = formatTime(cur);
      if (totalTimeText) totalTimeText.textContent = formatTime(dur);
      var pct = dur > 0 ? (cur / dur) * 100 : 0;
      if (scrubFill) scrubFill.style.width = pct + '%';
      if (scrubThumb) scrubThumb.style.left = pct + '%';
    });

    video.addEventListener('progress', function () {
      if (!video || !video.duration || !video.buffered.length || !scrubBuffer) return;
      var end = video.buffered.end(video.buffered.length - 1);
      scrubBuffer.style.width = (end / video.duration) * 100 + '%';
    });

    video.addEventListener('play', function () {
      if (ctrlPlayIcon) ctrlPlayIcon.style.display = 'none';
      if (ctrlPauseIcon) ctrlPauseIcon.style.display = 'block';
      resetHudTimer();
    });

    video.addEventListener('pause', function () {
      if (ctrlPlayIcon) ctrlPlayIcon.style.display = 'block';
      if (ctrlPauseIcon) ctrlPauseIcon.style.display = 'none';
      showHud();
    });
  }

  /* ═══════════════════════════════════════════════════════
     PLAY ITEM — called by catalog.js & series.js
  ═══════════════════════════════════════════════════════ */
  window.VLCPlayItem = async function (section, accountId, itemId, name, seriesId, image) {
    var errEl = document.getElementById('player-error');
    var titleEl = document.getElementById('player-title');
    var msgEl = document.getElementById('vlc-item-message');

    if (errEl) errEl.textContent = '';
    if (titleEl) titleEl.textContent = 'Loading…';

    try {
      var token = localStorage.getItem('vlc_device_token_v1');
      if (!token) throw new Error('Device not paired');

      var response = await fetch('/api/play/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify({ section: section, accountId: accountId, itemId: itemId, seriesId: seriesId })
      });
      var data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Playback not available');

      // Navigate to player
      previous = current;
      if (titleEl) titleEl.textContent = name || '';
      showScreen('player');

      currentPlayback = {
        directUrl: data.url,
        audioUrl: data.audioUrl,
        isCompat: false,
        section: section,
        accountId: accountId,
        itemId: itemId,
        name: name,
        seriesId: seriesId,
        image: image || ''
      };

      hideResumePrompt();

      if (favBtn) {
        favBtn.style.display = 'inline-flex';
        updatePlayerFavUI(isItemFavorited(section, itemId, accountId));
      }

      if (audioBtn) {
        if (data.audioUrl) {
          audioBtn.style.display = 'inline-flex';
          audioBtn.classList.remove('audio-fix-btn--active');
          if (audioLabel) audioLabel.textContent = 'Fix Audio (AAC)';
        } else {
          audioBtn.style.display = 'none';
        }
      }

      // Check saved progress for Movies and Series (ignore Live TV)
      var savedProgress = getProgress(section, itemId, accountId);

      if (window._currentHls) {
        window._currentHls.destroy();
        window._currentHls = null;
      }

      var isHls = data.url.indexOf('.m3u8') !== -1 || section === 'live';

      function checkAndOfferResume() {
        if (section !== 'live' && savedProgress && savedProgress.position > 15) {
          if (resumePrompt && resumeTimeText && resumeBtnYes && resumeBtnNo) {
            resumeTimeText.textContent = 'Continue from ' + formatTime(savedProgress.position);
            resumePrompt.style.display = 'flex';
            resumeBtnYes.focus();

            resumeBtnYes.onclick = function () {
              video.currentTime = savedProgress.position;
              hideResumePrompt();
              video.play().catch(function () {});
            };

            resumeBtnNo.onclick = function () {
              video.currentTime = 0;
              removeProgress(section, itemId, accountId);
              hideResumePrompt();
              video.play().catch(function () {});
            };

            resumePromptTimer = setTimeout(hideResumePrompt, 10000);
          }
        }
      }

      if (isHls && !video.canPlayType('application/vnd.apple.mpegurl') && window.Hls && window.Hls.isSupported()) {
        var hls = new window.Hls({ enableWorker: true, lowLatencyMode: true });
        window._currentHls = hls;
        hls.loadSource(data.url);
        hls.attachMedia(video);
        hls.on(window.Hls.Events.MANIFEST_PARSED, function () {
          video.play().then(function () {
            checkAndOfferResume();
          }).catch(function () {
            if (errEl) errEl.textContent = 'Click video to start playback.';
          });
        });
        hls.on(window.Hls.Events.ERROR, function (_event, errData) {
          if (errData && errData.fatal) {
            if (errEl) errEl.textContent = 'Stream error: ' + (errData.details || 'Unable to play stream');
          }
        });
      } else {
        video.src = data.url;
        var result = video.play();
        if (result && result.then) {
          result.then(function () {
            checkAndOfferResume();
          }).catch(function () {
            if (errEl) errEl.textContent = 'Click video to start playback.';
          });
        }
      }
    } catch (e) {
      if (msgEl) {
        msgEl.textContent = 'Playback unavailable: ' + e.message;
        msgEl.classList.add('is-error');
      } else if (errEl) {
        errEl.textContent = 'Playback unavailable: ' + e.message;
      }
    }
  };

  /* ── Video progress & error tracking ── */
  if (video) {
    var lastProgressTick = 0;
    video.addEventListener('timeupdate', function () {
      var now = Date.now();
      if (now - lastProgressTick > 5000) { // Throttle: every 5 seconds
        lastProgressTick = now;
        if (currentPlayback && video.currentTime > 10) {
          recordProgress(currentPlayback, video.currentTime, video.duration);
        }
      }
    });

    video.addEventListener('pause', function () {
      if (currentPlayback && video.currentTime > 10) {
        recordProgress(currentPlayback, video.currentTime, video.duration);
      }
    });

    video.addEventListener('error', function () {
      if (window._currentHls) return; // Managed by HLS.js
      var errEl = document.getElementById('player-error');
      if (errEl) errEl.textContent = 'This stream format is not supported by your browser.';
    });
  }

  /* ═══════════════════════════════════════════════════════
     HOME DASHBOARD — poster rows
     Loaded after device is paired
  ═══════════════════════════════════════════════════════ */
  window.VLCTV = {
    openSection: openSection,
    goBack: goBack
  };

  function makePosterCard(item, sectionName, accountId) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'poster-card';
    btn.title = item.name || 'Untitled';

    var thumb = document.createElement('div');
    thumb.className = 'poster-thumb';

    if (item.image && /^https?:\/\//i.test(item.image)) {
      var img = document.createElement('img');
      img.src = item.image;
      img.alt = '';
      img.loading = 'lazy';
      img.referrerPolicy = 'no-referrer';
      img.onerror = function () { img.remove(); };
      thumb.appendChild(img);
    } else {
      thumb.textContent = '▶';
    }

    // Play overlay
    var overlay = document.createElement('div');
    overlay.className = 'poster-play';
    overlay.innerHTML = '<svg viewBox="0 0 24 24" fill="white" width="36" height="36"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
    thumb.appendChild(overlay);

    // Watch Progress Bar (Netflix / Plex style indicator)
    if (item.percent && item.percent > 0) {
      var track = document.createElement('div');
      track.className = 'poster-progress-track';
      var fill = document.createElement('div');
      fill.className = 'poster-progress-fill';
      fill.style.width = Math.min(100, Math.max(5, item.percent)) + '%';
      track.appendChild(fill);
      thumb.appendChild(track);
    }

    var name = document.createElement('span');
    name.className = 'poster-name';
    name.textContent = item.name || 'Untitled';

    btn.appendChild(thumb);
    btn.appendChild(name);

    btn.addEventListener('click', function () {
      if (item.itemId) {
        window.VLCPlayItem(sectionName, accountId, item.itemId, item.name, item.seriesId, item.image);
      } else if (sectionName === 'series') {
        openSection('series');
      } else {
        openSection(sectionName);
      }
    });

    return btn;
  }

  function makeChannelCard(item, accountId) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'channel-card';
    btn.title = item.name || 'Channel';

    var iconWrap = document.createElement('div');
    iconWrap.className = 'channel-icon';
    if (item.image && /^https?:\/\//i.test(item.image)) {
      var img = document.createElement('img');
      img.src = item.image;
      img.alt = '';
      img.loading = 'lazy';
      img.referrerPolicy = 'no-referrer';
      img.onerror = function () { img.remove(); iconWrap.textContent = '📺'; };
      iconWrap.appendChild(img);
    } else {
      iconWrap.textContent = '📺';
    }

    var dot = document.createElement('span');
    dot.className = 'channel-live-dot';

    var cname = document.createElement('span');
    cname.className = 'channel-name';
    cname.textContent = item.name || 'Channel';

    btn.appendChild(iconWrap);
    btn.appendChild(dot);
    btn.appendChild(cname);

    btn.addEventListener('click', function () { openSection('live'); });
    return btn;
  }

  async function loadHomeRow(stripId, section, accountId, isChannel) {
    var strip = document.getElementById(stripId);
    if (!strip) return;

    var token = localStorage.getItem('vlc_device_token_v1');
    if (!token) { strip.innerHTML = '<p class="strip-placeholder">Sign in to view content</p>'; return; }

    try {
      // Get first category
      var catRes = await fetch('/api/device/catalog?' + new URLSearchParams({ section: section, accountId: accountId }), {
        headers: { Authorization: 'Bearer ' + token }
      });
      var catData = await catRes.json();
      if (!catRes.ok || !catData.categories || !catData.categories.length) {
        strip.innerHTML = '<p class="strip-placeholder">No content available</p>';
        return;
      }
      var catId = catData.categories[0].category_id;

      // Get items from first category
      var itemRes = await fetch('/api/device/items?' + new URLSearchParams({ section: section, accountId: accountId, categoryId: catId }), {
        headers: { Authorization: 'Bearer ' + token }
      });
      var itemData = await itemRes.json();
      if (!itemRes.ok || !itemData.items || !itemData.items.length) {
        strip.innerHTML = '<p class="strip-placeholder">No items found</p>';
        return;
      }

      strip.replaceChildren();
      itemData.items.slice(0, 18).forEach(function (item) {
        var card = isChannel
          ? makeChannelCard(item, accountId)
          : makePosterCard(item, section, accountId);
        strip.appendChild(card);
      });
    } catch (e) {
      strip.innerHTML = '<p class="strip-placeholder">Could not load content</p>';
    }
  }

  function loadContinueWatchingRow() {
    var row = document.getElementById('row-continue');
    var strip = document.getElementById('strip-continue');
    if (!row || !strip) return;

    var all = loadAllProgress();
    var list = Object.values(all)
      .sort(function (a, b) { return (b.updatedAt || 0) - (a.updatedAt || 0); })
      .filter(function (item) { return item.position > 15; });

    if (!list.length) {
      row.style.display = 'none';
      return;
    }

    row.style.display = 'block';
    strip.replaceChildren();

    list.slice(0, 20).forEach(function (item) {
      var card = makePosterCard(item, item.section, item.accountId);
      strip.appendChild(card);
    });

    // Dynamically update Hero Spotlight with most recently watched title
    var latest = list[0];
    if (latest) {
      var heroTitle = document.getElementById('hero-title');
      var heroDesc = document.getElementById('hero-desc');
      var heroBadge = document.getElementById('hero-badge');
      var heroPlayLabel = document.getElementById('hero-play-label');
      var heroPlay = document.getElementById('hero-play');

      if (heroTitle) heroTitle.textContent = latest.name || 'Your Entertainment Hub';
      if (heroDesc) heroDesc.textContent = 'Continue watching from ' + formatTime(latest.position) + ' where you left off.';
      if (heroBadge) heroBadge.textContent = 'CONTINUE WATCHING';
      if (heroPlayLabel) heroPlayLabel.textContent = 'Resume Playing';
      if (heroPlay) {
        heroPlay.onclick = function (e) {
          e.stopPropagation();
          window.VLCPlayItem(latest.section, latest.accountId, latest.itemId, latest.name, latest.seriesId, latest.image);
        };
      }

      if (latest.image) {
        var heroBg = document.getElementById('hero-bg');
        if (heroBg) {
          heroBg.style.backgroundImage = 'radial-gradient(ellipse at 70% 40%, rgba(120,50,200,.6) 0%, transparent 60%), linear-gradient(90deg, rgba(7,6,15,0.95) 0%, rgba(7,6,15,0.65) 50%, transparent 100%), url("' + latest.image + '")';
          heroBg.style.backgroundSize = 'cover';
          heroBg.style.backgroundPosition = 'center 20%';
        }
      }
    }
  }

  async function loadFavoritesRow() {
    var row = document.getElementById('row-favorites');
    var strip = document.getElementById('strip-favorites');
    if (!row || !strip) return;

    var token = localStorage.getItem('vlc_device_token_v1');
    if (!token) { row.style.display = 'none'; return; }

    try {
      var res = await fetch('/api/device/favorites', {
        headers: { Authorization: 'Bearer ' + token }
      });
      var data = await res.json();
      if (!res.ok || !data.favorites || !data.favorites.length) {
        row.style.display = 'none';
        window.VLCFavoritesList = [];
        return;
      }

      window.VLCFavoritesList = data.favorites;
      row.style.display = 'block';
      strip.replaceChildren();

      data.favorites.forEach(function (fav) {
        var card = makePosterCard(fav, fav.section, fav.accountId);
        strip.appendChild(card);
      });
    } catch (_) {
      row.style.display = 'none';
    }
  }

  /* ── Called once device is paired ── */
  function loadHomeDashboard(me) {
    if (!me || !me.accounts || !me.accounts.length) return;
    var accountId = me.accounts[0].id;
    var perms = (me.device && me.device.permissions) || {};

    // Load Continue Watching row
    loadContinueWatchingRow();

    // Load Synced Favorites across all household devices
    loadFavoritesRow();

    if (perms.movies) {
      loadHomeRow('strip-movies', 'movies', accountId, false);
    } else {
      var rm = document.getElementById('row-movies');
      if (rm) rm.style.display = 'none';
    }

    if (perms.series) {
      loadHomeRow('strip-series', 'series', accountId, false);
    } else {
      var rs = document.getElementById('row-series');
      if (rs) rs.style.display = 'none';
    }

    if (perms.live) {
      loadHomeRow('strip-live', 'live', accountId, true);
    } else {
      var rl = document.getElementById('row-live');
      if (rl) rl.style.display = 'none';
    }

    // Update hero buttons visibility
    var heroPlay = document.getElementById('hero-play');
    var heroLive = document.getElementById('hero-live');
    if (heroPlay) heroPlay.setAttribute('data-section', perms.movies ? 'movies' : (perms.series ? 'series' : 'live'));
    if (heroLive && !perms.live) heroLive.style.display = 'none';
  }

  window.VLCDashboardLoaded = loadHomeDashboard;

  // Focus first interactive element on startup
  var firstBtn = document.querySelector('#home button:not([disabled])');
  if (firstBtn) firstBtn.focus();

}());
