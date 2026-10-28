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
  function clearNode(node) {
    if (!node) return;
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

  /* ── Screen management ── */
  var current = 'home';
  var previous = 'home';
  var screens = {
    home:     document.getElementById('home'),
    section:  document.getElementById('section'),
    settings: document.getElementById('settings'),
    player:   document.getElementById('player')
  };
  var video = document.getElementById('video');

  function isPipActive() {
    return Boolean(document.pictureInPictureElement);
  }

  function showScreen(name) {
    Object.keys(screens).forEach(function (k) {
      var el = screens[k];
      if (!el) return;
      if (k === name) {
        el.classList.remove('hidden');
      } else {
        // If switching away from player but Picture-in-Picture is active, do not display:none the player
        if (k === 'player' && isPipActive()) {
          el.classList.add('pip-background');
          el.classList.remove('hidden');
        } else {
          el.classList.add('hidden');
          el.classList.remove('pip-background');
        }
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

  /* ── Settings / IPTV Account Screen ── */
  var backSettings = document.getElementById('back-settings');
  var settingsContent = document.getElementById('settings-content');

  function formatDate(unixOrIso) {
    if (!unixOrIso) return 'Unlimited / None';
    var d;
    if (typeof unixOrIso === 'number' || /^\d+$/.test(String(unixOrIso))) {
      var ts = Number(unixOrIso);
      d = new Date(ts > 1e11 ? ts : ts * 1000);
    } else {
      d = new Date(unixOrIso);
    }
    if (isNaN(d.getTime())) return String(unixOrIso);
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  async function loadSettingsScreen() {
    if (!settingsContent) return;
    settingsContent.innerHTML = '<div class="settings-loading"><div class="spinner"></div><p>Loading IPTV account info…</p></div>';

    try {
      var token = localStorage.getItem('vlc_device_token_v1');
      var res = await fetch('/api/device/account/info', {
        headers: token ? { Authorization: 'Bearer ' + token } : {}
      });
      if (!res.ok) throw Error('Could not fetch account information');
      var data = await res.json();

      var acc = data.account || {};
      var u = data.user_info || {};
      var s = data.server_info || {};
      var dev = data.device || {};

      var statusStr = String(u.status || 'Active').toLowerCase();
      var isTrial = Boolean(parseInt(u.is_trial) || u.is_trial === '1' || u.is_trial === true);
      var badgeClass = 'settings-badge--active';
      var badgeText = 'Active';

      if (isTrial) {
        badgeClass = 'settings-badge--trial';
        badgeText = 'Trial Account';
      } else if (statusStr.includes('expir') || statusStr.includes('bann') || statusStr.includes('disable')) {
        badgeClass = 'settings-badge--expired';
        badgeText = u.status || 'Expired';
      }

      var expDateStr = (u.exp_date && u.exp_date !== 'null') ? formatDate(u.exp_date) : 'Unlimited';
      var createdAtStr = (u.created_at && u.created_at !== 'null') ? formatDate(u.created_at) : (acc.createdAt ? formatDate(acc.createdAt) : 'N/A');
      var serverUrlStr = s.url || acc.host || 'N/A';
      var serverPortStr = s.port || s.server_port || (s.https_port ? s.https_port + ' (SSL)' : 'Default');
      var timezoneStr = s.timezone || 'UTC';

      var html = '<div class="settings-grid">';

      // Card 1: Subscription & IPTV Account
      html += '<div class="settings-card">';
      html += '  <div class="settings-card-head">';
      html += '    <div class="settings-card-title-row">';
      html += '      <div class="settings-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>';
      html += '      <div>';
      html += '        <h3 class="settings-card-title">' + (acc.label || 'IPTV Account') + '</h3>';
      html += '      </div>';
      html += '    </div>';
      html += '    <span class="settings-badge ' + badgeClass + '">' + badgeText + '</span>';
      html += '  </div>';

      html += '  <div class="settings-table">';
      html += '    <div class="settings-row"><span class="settings-label">Username</span><span class="settings-val settings-val-highlight">' + (u.username || acc.username || 'N/A') + '</span></div>';
      html += '    <div class="settings-row"><span class="settings-label">Account Status</span><span class="settings-val">' + (u.status || 'Active') + '</span></div>';
      html += '    <div class="settings-row"><span class="settings-label">Expiration Date</span><span class="settings-val settings-val-highlight">' + expDateStr + '</span></div>';
      html += '    <div class="settings-row"><span class="settings-label">Active Connections</span><span class="settings-val">' + (u.active_cons !== undefined ? u.active_cons : '1') + ' / ' + (u.max_connections || '1') + '</span></div>';
      html += '    <div class="settings-row"><span class="settings-label">Account Type</span><span class="settings-val">' + (isTrial ? 'Trial Subscription' : 'Full Subscription') + '</span></div>';
      html += '    <div class="settings-row"><span class="settings-label">Created At</span><span class="settings-val">' + createdAtStr + '</span></div>';
      html += '  </div>';

      html += '</div>'; // end card 1

      // Card 2: Server & Connection Parameters
      html += '<div class="settings-card">';
      html += '  <div class="settings-card-head">';
      html += '    <div class="settings-card-title-row">';
      html += '      <div class="settings-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg></div>';
      html += '      <div>';
      html += '        <h3 class="settings-card-title">Server Connection</h3>';
      html += '      </div>';
      html += '    </div>';
      html += '    <span class="settings-badge settings-badge--active">Connected</span>';
      html += '  </div>';

      html += '  <div class="settings-table">';
      html += '    <div class="settings-row"><span class="settings-label">Host URL</span><span class="settings-val">' + serverUrlStr + '</span></div>';
      html += '    <div class="settings-row"><span class="settings-label">Server Port</span><span class="settings-val">' + serverPortStr + '</span></div>';
      html += '    <div class="settings-row"><span class="settings-label">Server Timezone</span><span class="settings-val">' + timezoneStr + '</span></div>';
      html += '    <div class="settings-row"><span class="settings-label">Device Name</span><span class="settings-val">' + (dev.name || 'Smart TV') + '</span></div>';
      html += '    <div class="settings-row"><span class="settings-label">Pairing Platform</span><span class="settings-val">' + (dev.platform || 'webOS / Web') + '</span></div>';
      html += '    <div class="settings-row"><span class="settings-label">Permissions</span><span class="settings-val">' + Object.keys(dev.permissions || {}).filter(function(k){return dev.permissions[k];}).join(', ').toUpperCase() + '</span></div>';
      html += '  </div>';

      html += '  <div class="settings-actions">';
      html += '    <button type="button" class="settings-btn" id="btn-refresh-account"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg> Refresh Info</button>';
      html += '    <button type="button" class="settings-btn settings-btn--danger" id="btn-disconnect-device"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg> Disconnect Device</button>';
      html += '  </div>';

      html += '</div>'; // end card 2
      html += '</div>'; // end grid

      settingsContent.innerHTML = html;

      // Event handlers inside settings
      var refBtn = document.getElementById('btn-refresh-account');
      if (refBtn) {
        refBtn.addEventListener('click', function () {
          loadSettingsScreen();
        });
      }

      var discBtn = document.getElementById('btn-disconnect-device');
      if (discBtn) {
        discBtn.addEventListener('click', function () {
          if (confirm('Are you sure you want to disconnect this device from your IPTV account? You will need an invitation code to re-link.')) {
            localStorage.removeItem('vlc_device_token_v1');
            window.location.reload();
          }
        });
      }

    } catch (err) {
      settingsContent.innerHTML = '<div class="settings-loading"><p style="color:#ff4757">Failed to load account info: ' + (err.message || 'Server error') + '</p><button type="button" class="settings-btn" onclick="window.VLCLoadSettings && window.VLCLoadSettings()">Try Again</button></div>';
    }
  }

  window.VLCLoadSettings = loadSettingsScreen;

  function openSection(name) {
    if (name === 'home') { showScreen('home'); return; }
    if (name === 'settings') {
      previous = current;
      showScreen('settings');
      loadSettingsScreen();
      return;
    }
    var titleEl = document.getElementById('section-title');
    if (titleEl) titleEl.textContent = sectionNames[name] || name;
    previous = current;
    showScreen('section');
    if (window.VLCLoadCategories) window.VLCLoadCategories(name);
  }

  /* ── Back buttons ── */
  var backSection = document.getElementById('back-section');
  var backPlayer  = document.getElementById('back-player');

  function stopCurrentPlayback() {
    if (currentPlayback && video && video.currentTime > 10) {
      recordProgress(currentPlayback, video.currentTime, video.duration);
    }
    hideResumePrompt();
    if (window._currentHls) {
      window._currentHls.destroy();
      window._currentHls = null;
    }
    if (video) {
      video.pause();
      video.removeAttribute('src');
      video.load();
    }
    var titleEl = document.getElementById('player-title');
    if (titleEl) titleEl.textContent = '';
    var errEl = document.getElementById('player-error');
    if (errEl) errEl.textContent = '';
    var audioBtn = document.getElementById('player-audio-btn');
    if (audioBtn) audioBtn.style.display = 'none';
    currentPlayback = null;
    showScreen(previous || 'home');
    loadContinueWatchingRow();
  }

  function goBack() {
    if (current === 'player') {
      // If PiP is already active, simply navigate to the previous screen while keeping PiP running!
      if (isPipActive()) {
        showScreen(previous || 'home');
        return;
      }

      // If video is currently actively playing and browser supports Picture-in-Picture,
      // seamlessly convert video into floating PiP mode and navigate back to previous screen!
      if (video && !video.paused && !video.ended && video.requestPictureInPicture) {
        if (currentPlayback && video.currentTime > 10) {
          recordProgress(currentPlayback, video.currentTime, video.duration);
        }
        hideResumePrompt();
        // Request PiP immediately while within user gesture
        video.requestPictureInPicture().catch(function (err) {
          console.warn('[PiP] auto-pip failed, proceeding to stop playback:', err);
          stopCurrentPlayback();
        });
        showScreen(previous || 'home');
        loadContinueWatchingRow();
        return;
      }

      // Otherwise (video was paused by user, ended, or PiP not supported), stop playback cleanly
      stopCurrentPlayback();
      return;
    }
    if (current === 'section') {
      if (window.VLCCatalogBack && window.VLCCatalogBack()) return;
      showScreen('home');
      loadContinueWatchingRow();
      return;
    }
    if (current === 'settings') {
      showScreen('home');
      loadContinueWatchingRow();
      return;
    }
  }

  if (backSection)  backSection.addEventListener('click', goBack);
  if (backPlayer)   backPlayer.addEventListener('click', goBack);
  if (backSettings) backSettings.addEventListener('click', goBack);

  /* ── Keyboard / remote ── */
  document.addEventListener('keydown', function (e) {
    var k = e.keyCode || e.which;
    var target = e.target || document.activeElement;
    var isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);

    // Back / Escape / webOS Back key
    if (k === 461 || k === 27 || k === 8) {
      // If typing in an input field, allow normal Backspace text editing without navigating back
      if (k === 8 && isInput) {
        return;
      }
      if (current !== 'home') { e.preventDefault(); goBack(); }
    // Arrow navigation
    } else if (k >= 37 && k <= 40) {
      if (current === 'player') {
        if (k === 37) { // Left arrow
          e.preventDefault();
          if (ctrlRewind) ctrlRewind.click();
        } else if (k === 39) { // Right arrow
          e.preventDefault();
          if (ctrlForward) ctrlForward.click();
        }
      } else {
        e.preventDefault();
        focusNearest(k);
      }
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
      var curTime = (currentPlayback.isCompat)
        ? (currentPlayback.compatOffset || 0) + (video.currentTime || 0)
        : (video.currentTime || 0);

      // Preserve known total duration
      if (video.duration && isFinite(video.duration) && video.duration > 0) {
        currentPlayback.duration = video.duration;
      }

      var errEl = document.getElementById('player-error');
      if (errEl) errEl.textContent = '';

      if (!currentPlayback.isCompat) {
        currentPlayback.isCompat = true;
        currentPlayback.compatOffset = Math.floor(curTime);
        audioBtn.classList.add('audio-fix-btn--active');
        if (audioLabel) audioLabel.textContent = '✓ Audio: AAC (Active)';
        video.src = currentPlayback.audioUrl + (curTime > 0 ? '?t=' + Math.floor(curTime) : '');
        video.play().catch(function () {});
      } else {
        currentPlayback.isCompat = false;
        currentPlayback.compatOffset = 0;
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
    var errEl = document.getElementById('player-error');
    if (video.paused) {
      if (errEl) errEl.textContent = '';
      var playPromise = video.play();
      if (playPromise && playPromise.catch) {
        playPromise.catch(function (err) {
          console.warn('[Player] play() rejected:', err);
          // If socket stalled during long pause, reloading the current position resumes seamlessly
          if (video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE || (err && err.name === 'NotSupportedError')) {
            var curTime = video.currentTime || 0;
            video.load();
            video.currentTime = curTime;
            video.play().catch(function () {});
          }
        });
      }
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

  function seekToTime(targetTime) {
    if (!video || !currentPlayback) return;
    var total = currentPlayback.duration || (isFinite(video.duration) ? video.duration : 0);
    var target = Math.max(0, total > 0 ? Math.min(total, targetTime) : targetTime);

    if (currentPlayback.isCompat) {
      // In AAC compatibility mode, server transcodes live stream via ffmpeg pipe
      currentPlayback.compatOffset = target;
      if (curTimeText) curTimeText.textContent = formatTime(target);
      if (total > 0 && totalTimeText) totalTimeText.textContent = formatTime(total);
      if (total > 0 && scrubFill) scrubFill.style.width = ((target / total) * 100) + '%';
      if (total > 0 && scrubThumb) scrubThumb.style.left = ((target / total) * 100) + '%';

      video.src = currentPlayback.audioUrl + '?t=' + Math.floor(target);
      video.play().catch(function () {});
    } else {
      if (video.duration && isFinite(video.duration)) {
        video.currentTime = target;
      }
    }
    showHud();
  }

  if (ctrlRewind) {
    ctrlRewind.addEventListener('click', function () {
      if (!video) return;
      var cur = (currentPlayback && currentPlayback.isCompat)
        ? (currentPlayback.compatOffset || 0) + (video.currentTime || 0)
        : (video.currentTime || 0);
      seekToTime(cur - 10);
    });
  }

  if (ctrlForward) {
    ctrlForward.addEventListener('click', function () {
      if (!video) return;
      var cur = (currentPlayback && currentPlayback.isCompat)
        ? (currentPlayback.compatOffset || 0) + (video.currentTime || 0)
        : (video.currentTime || 0);
      seekToTime(cur + 10);
    });
  }

  if (scrubTrack) {
    scrubTrack.addEventListener('click', function (e) {
      if (!video || !currentPlayback) return;
      var total = currentPlayback.duration || (isFinite(video.duration) ? video.duration : 0);
      if (total <= 0) return;
      var rect = scrubTrack.getBoundingClientRect();
      var pos = (e.clientX - rect.left) / rect.width;
      seekToTime(pos * total);
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

  /* ═══════════════════════════════════════════════════════
     PICTURE IN PICTURE & MEDIA SESSION (TIMELINE IN PIP)
  ═══════════════════════════════════════════════════════ */
  function updateMediaSessionPosition() {
    if (!('mediaSession' in navigator) || !video) return;
    try {
      var cur = (currentPlayback && currentPlayback.isCompat)
        ? (currentPlayback.compatOffset || 0) + (video.currentTime || 0)
        : (video.currentTime || 0);

      var dur = (currentPlayback && currentPlayback.duration)
        ? currentPlayback.duration
        : (video.duration && isFinite(video.duration) ? video.duration : 0);

      if (dur > 0 && cur >= 0 && cur <= dur) {
        navigator.mediaSession.setPositionState({
          duration: dur,
          playbackRate: video.playbackRate || 1.0,
          position: Math.min(cur, dur)
        });
      }
    } catch (_) {}
  }

  function setupMediaSession() {
    if (!('mediaSession' in navigator)) return;
    try {
      navigator.mediaSession.setActionHandler('play', function () {
        if (video) video.play().catch(function () {});
      });
      navigator.mediaSession.setActionHandler('pause', function () {
        if (video) video.pause();
      });
      navigator.mediaSession.setActionHandler('seekto', function (details) {
        if (details && typeof details.seekTime === 'number') {
          seekToTime(details.seekTime);
          updateMediaSessionPosition();
        }
      });
      navigator.mediaSession.setActionHandler('seekbackward', function (details) {
        var skip = (details && details.seekOffset) || 10;
        var cur = (currentPlayback && currentPlayback.isCompat)
          ? (currentPlayback.compatOffset || 0) + (video.currentTime || 0)
          : (video.currentTime || 0);
        seekToTime(cur - skip);
        updateMediaSessionPosition();
      });
      navigator.mediaSession.setActionHandler('seekforward', function (details) {
        var skip = (details && details.seekOffset) || 10;
        var cur = (currentPlayback && currentPlayback.isCompat)
          ? (currentPlayback.compatOffset || 0) + (video.currentTime || 0)
          : (video.currentTime || 0);
        seekToTime(cur + skip);
        updateMediaSessionPosition();
      });
      navigator.mediaSession.setActionHandler('previoustrack', function () {
        if (ctrlPrevEp && ctrlPrevEp.style.display !== 'none' && !ctrlPrevEp.disabled) {
          ctrlPrevEp.click();
        }
      });
      navigator.mediaSession.setActionHandler('nexttrack', function () {
        if (ctrlNextEp && ctrlNextEp.style.display !== 'none' && !ctrlNextEp.disabled) {
          ctrlNextEp.click();
        }
      });
    } catch (_) {}
  }
  setupMediaSession();

  if (video) {
    video.addEventListener('enterpictureinpicture', function () {
      if (playerScreen && current !== 'player') {
        playerScreen.classList.add('pip-background');
        playerScreen.classList.remove('hidden');
      }
      updateMediaSessionPosition();
    });

    video.addEventListener('leavepictureinpicture', function () {
      if (playerScreen) {
        playerScreen.classList.remove('pip-background');
      }
      // When user clicks the browser's "Back to tab" button on the PiP overlay,
      // bring them directly back into the full Player screen without stopping video!
      if (currentPlayback && !video.paused) {
        showScreen('player');
        showHud();
      } else if (playerScreen && current !== 'player') {
        playerScreen.classList.add('hidden');
      }
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

  /* ═══════════════════════════════════════════════════════
     EPISODE NAVIGATION & QUICK EPISODES DRAWER
  ═══════════════════════════════════════════════════════ */
  var ctrlPrevEp = document.getElementById('ctrl-prev-ep');
  var ctrlNextEp = document.getElementById('ctrl-next-ep');
  var ctrlEpisodes = document.getElementById('ctrl-episodes');
  var episodesDrawer = document.getElementById('player-episodes-drawer');
  var drawerCloseBtn = document.getElementById('drawer-close-btn');
  var drawerSeriesName = document.getElementById('drawer-series-name');
  var drawerSeasonsWrap = document.getElementById('drawer-seasons-wrap');
  var drawerEpisodesList = document.getElementById('drawer-episodes-list');

  function getEpisodeList() {
    if (!window.VLCSeriesContext || !window.VLCSeriesContext.seasonEpisodes) return [];
    return window.VLCSeriesContext.seasonEpisodes;
  }

  function getCurrentEpisodeIndex() {
    if (!currentPlayback || currentPlayback.section !== 'series') return -1;
    var list = getEpisodeList();
    for (var i = 0; i < list.length; i++) {
      if (String(list[i].id) === String(currentPlayback.itemId)) return i;
    }
    return -1;
  }

  function playAdjacentEpisode(delta) {
    var list = getEpisodeList();
    if (!list.length || !currentPlayback) return;
    var idx = getCurrentEpisodeIndex();
    var nextIdx = idx + delta;
    if (nextIdx >= 0 && nextIdx < list.length) {
      var nextEp = list[nextIdx];
      var seriesCtx = window.VLCSeriesContext;
      var label = (seriesCtx.seriesName ? seriesCtx.seriesName + ' - ' : '') + (nextEp.title || ('Episode ' + nextEp.episode));
      window.VLCPlayItem('series', seriesCtx.accountId, nextEp.id, label, seriesCtx.seriesId, seriesCtx.cover, nextEp);
    }
  }

  if (ctrlPrevEp) {
    ctrlPrevEp.addEventListener('click', function () {
      playAdjacentEpisode(-1);
    });
  }

  if (ctrlNextEp) {
    ctrlNextEp.addEventListener('click', function () {
      playAdjacentEpisode(1);
    });
  }

  function closeEpisodesDrawer() {
    if (episodesDrawer) episodesDrawer.style.display = 'none';
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeEpisodesDrawer);
  }

  function renderDrawerEpisodes(seasonNum) {
    if (!window.VLCSeriesContext || !drawerEpisodesList) return;
    clearNode(drawerEpisodesList);

    var allEps = window.VLCSeriesContext.allEpisodes || [];
    var list = allEps
      .filter(function (e) { return e.season === seasonNum; })
      .sort(function (a, b) { return a.episode - b.episode; });

    list.forEach(function (ep) {
      var btn = document.createElement('button');
      btn.type = 'button';
      var isCurrent = currentPlayback && String(currentPlayback.itemId) === String(ep.id);
      btn.className = 'drawer-ep-item' + (isCurrent ? ' drawer-ep-item--playing' : '');

      var left = document.createElement('div');
      left.className = 'drawer-ep-left';

      var badge = document.createElement('span');
      badge.className = 'drawer-ep-badge';
      badge.textContent = 'EP ' + ep.episode;
      left.appendChild(badge);

      var title = document.createElement('span');
      title.className = 'drawer-ep-name';
      title.textContent = ep.title || ('Episode ' + ep.episode);
      left.appendChild(title);

      btn.appendChild(left);

      if (isCurrent) {
        var playingIcon = document.createElement('span');
        playingIcon.className = 'drawer-ep-playing-icon';
        playingIcon.textContent = '▶ Playing';
        btn.appendChild(playingIcon);
      } else if (ep.duration) {
        var dur = document.createElement('span');
        dur.className = 'ep-duration';
        dur.textContent = ep.duration;
        btn.appendChild(dur);
      }

      btn.addEventListener('click', function () {
        var seriesCtx = window.VLCSeriesContext;
        var label = (seriesCtx.seriesName ? seriesCtx.seriesName + ' - ' : '') + (ep.title || ('Episode ' + ep.episode));
        closeEpisodesDrawer();
        window.VLCPlayItem('series', seriesCtx.accountId, ep.id, label, seriesCtx.seriesId, seriesCtx.cover, ep);
      });

      drawerEpisodesList.appendChild(btn);
    });
  }

  function openEpisodesDrawer() {
    if (!window.VLCSeriesContext || !episodesDrawer) return;
    var ctx = window.VLCSeriesContext;
    if (drawerSeriesName) drawerSeriesName.textContent = ctx.seriesName || 'Series Episodes';

    // Render seasons pills
    if (drawerSeasonsWrap) {
      clearNode(drawerSeasonsWrap);
      var seasons = ctx.seasons || [1];
      var activeSeason = ctx.currentSeason || seasons[0];

      seasons.forEach(function (s) {
        var pill = document.createElement('button');
        pill.type = 'button';
        pill.className = 'drawer-season-pill' + (s === activeSeason ? ' drawer-season-pill--active' : '');
        pill.textContent = 'Season ' + s;
        pill.addEventListener('click', function () {
          drawerSeasonsWrap.querySelectorAll('.drawer-season-pill').forEach(function (p) {
            p.classList.remove('drawer-season-pill--active');
          });
          pill.classList.add('drawer-season-pill--active');
          ctx.currentSeason = s;
          renderDrawerEpisodes(s);
        });
        drawerSeasonsWrap.appendChild(pill);
      });
    }

    renderDrawerEpisodes(ctx.currentSeason || 1);
    episodesDrawer.style.display = 'flex';
    showHud();
  }

  if (ctrlEpisodes) {
    ctrlEpisodes.addEventListener('click', function (e) {
      e.stopPropagation();
      var isHidden = episodesDrawer.style.display === 'none';
      if (isHidden) {
        openEpisodesDrawer();
      } else {
        closeEpisodesDrawer();
      }
    });
  }

  function updateEpisodesUi() {
    var isSeries = currentPlayback && currentPlayback.section === 'series' && window.VLCSeriesContext;
    if (!isSeries) {
      if (ctrlPrevEp) ctrlPrevEp.style.display = 'none';
      if (ctrlNextEp) ctrlNextEp.style.display = 'none';
      if (ctrlEpisodes) ctrlEpisodes.style.display = 'none';
      closeEpisodesDrawer();
      return;
    }

    if (ctrlEpisodes) ctrlEpisodes.style.display = 'inline-flex';
    var list = getEpisodeList();
    var idx = getCurrentEpisodeIndex();

    if (ctrlPrevEp) {
      ctrlPrevEp.style.display = 'inline-flex';
      ctrlPrevEp.disabled = (idx <= 0);
      ctrlPrevEp.style.opacity = (idx <= 0) ? '0.4' : '1';
    }

    if (ctrlNextEp) {
      ctrlNextEp.style.display = 'inline-flex';
      ctrlNextEp.disabled = (idx < 0 || idx >= list.length - 1);
      ctrlNextEp.style.opacity = (idx < 0 || idx >= list.length - 1) ? '0.4' : '1';
    }
  }

  if (video) {
    video.addEventListener('loadedmetadata', function () {
      if (video.duration && isFinite(video.duration) && video.duration > 0) {
        if (!currentPlayback.isCompat || !currentPlayback.duration) {
          currentPlayback.duration = video.duration;
        }
      }
      var dur = currentPlayback.duration || (isFinite(video.duration) ? video.duration : 0);
      if (dur > 0 && totalTimeText) totalTimeText.textContent = formatTime(dur);
    });

    video.addEventListener('timeupdate', function () {
      if (!video) return;
      var cur = (currentPlayback && currentPlayback.isCompat)
        ? (currentPlayback.compatOffset || 0) + (video.currentTime || 0)
        : (video.currentTime || 0);

      var dur = (currentPlayback && currentPlayback.duration)
        ? currentPlayback.duration
        : (video.duration && isFinite(video.duration) ? video.duration : 0);

      if (curTimeText) curTimeText.textContent = formatTime(cur);
      if (dur > 0 && totalTimeText) totalTimeText.textContent = formatTime(dur);

      var pct = dur > 0 ? (cur / dur) * 100 : 0;
      if (scrubFill) scrubFill.style.width = Math.min(100, Math.max(0, pct)) + '%';
      if (scrubThumb) scrubThumb.style.left = Math.min(100, Math.max(0, pct)) + '%';

      if (isPipActive()) {
        updateMediaSessionPosition();
      }
    });

    video.addEventListener('progress', function () {
      if (!video || !video.buffered.length || !scrubBuffer) return;
      var dur = (currentPlayback && currentPlayback.duration)
        ? currentPlayback.duration
        : (video.duration && isFinite(video.duration) ? video.duration : 0);
      if (dur <= 0) return;

      var end = video.buffered.end(video.buffered.length - 1);
      var offset = (currentPlayback && currentPlayback.isCompat) ? (currentPlayback.compatOffset || 0) : 0;
      scrubBuffer.style.width = Math.min(100, ((offset + end) / dur) * 100) + '%';
    });

    video.addEventListener('play', function () {
      if (ctrlPlayIcon) ctrlPlayIcon.style.display = 'none';
      if (ctrlPauseIcon) ctrlPauseIcon.style.display = 'block';
      resetHudTimer();
      updateMediaSessionPosition();
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
  window.VLCPlayItem = async function (section, accountId, itemId, name, seriesId, image, episodeMeta) {
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
        image: image || '',
        episodeMeta: episodeMeta || null
      };

      if ('mediaSession' in navigator && window.MediaMetadata) {
        try {
          var artworkList = [];
          if (image && /^https?:\/\//i.test(image)) {
            artworkList.push({ src: image, sizes: '512x512', type: 'image/jpeg' });
          }
          navigator.mediaSession.metadata = new window.MediaMetadata({
            title: name || 'Video',
            artist: (section === 'series' && window.VLCSeriesContext ? window.VLCSeriesContext.seriesName : 'VLC IPTV'),
            album: (section === 'series' ? 'Series' : 'Movies'),
            artwork: artworkList
          });
        } catch (_) {}
      }

      hideResumePrompt();
      if (typeof updateEpisodesUi === 'function') {
        updateEpisodesUi();
      }

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

    video.addEventListener('playing', function () {
      var errEl = document.getElementById('player-error');
      if (errEl) errEl.textContent = '';
      if (ctrlPlayIcon) ctrlPlayIcon.style.display = 'none';
      if (ctrlPauseIcon) ctrlPauseIcon.style.display = 'block';
    });

    video.addEventListener('error', function () {
      if (window._currentHls) return; // Managed by HLS.js
      var errEl = document.getElementById('player-error');
      if (!errEl) return;
      var mediaErr = video.error;
      var code = mediaErr ? mediaErr.code : 0;
      var msg = 'Playback error (' + code + '). ';
      if (code === 3) {
        msg = 'Video decode error. The TV decoder encountered an unsupported video track.';
      } else if (code === 4) {
        msg = 'Media format or audio codec not natively supported by TV browser.';
        if (currentPlayback && currentPlayback.audioUrl && audioBtn) {
          msg += ' Click "Fix Audio (AAC)" above to convert stream.';
        }
      } else {
        msg = 'This stream format is not supported by your TV browser.';
      }
      errEl.textContent = msg;
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

      clearNode(strip);
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
    clearNode(strip);

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
      clearNode(strip);

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
