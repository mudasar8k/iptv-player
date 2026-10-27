(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════
     VLC IPTV — Device pairing / invitation
     pairing.js

     Supports BOTH flows:
       1. Invitation code  (POST /api/pair/start with invitationCode)
       2. Legacy 6-digit polling (backwards-compat if invitation fails)
  ═══════════════════════════════════════════════════════ */

  var KEY    = 'vlc_device_token_v1';
  var cover  = document.getElementById('pair-cover');
  var msgEl  = document.getElementById('pair-message');
  var retryBtn = document.getElementById('pair-retry');

  // New invitation elements
  var codeInput    = document.getElementById('pair-code-input');
  var connectBtn   = document.getElementById('pair-connect-btn');
  var inputWrap    = document.getElementById('pair-input-wrap');

  // Legacy hidden element (kept for API compat — pairing.js API contract)
  var legacyCode   = document.getElementById('pair-code');

  // Status bar in header
  var statusEl     = document.getElementById('device-status');

  function show(visible) {
    if (!cover) return;
    if (visible) {
      cover.removeAttribute('hidden');
      if (codeInput) setTimeout(function () { codeInput.focus(); }, 100);
    } else {
      cover.setAttribute('hidden', '');
    }
  }

  function say(msg, type) {
    if (!msgEl) return;
    msgEl.textContent = msg || '';
    msgEl.className = 'pair-message' + (type ? ' is-' + type : '');
  }

  function setStatus(msg, paired) {
    if (!statusEl) return;
    statusEl.textContent = msg || '';
    statusEl.className = 'hdr-status' + (paired ? ' is-paired' : '');
  }

  function setLoading(loading) {
    if (!connectBtn) return;
    connectBtn.disabled = loading;
    connectBtn.innerHTML = loading
      ? '<span class="pair-spinner"></span> Connecting…'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18"><polyline points="9 18 15 12 9 6"/></svg> Connect Device';
  }

  function api(path, method, data, bearer) {
    var headers = { 'Content-Type': 'application/json' };
    if (bearer) headers['Authorization'] = 'Bearer ' + bearer;
    return fetch(path, {
      method: method || 'GET',
      headers: headers,
      body: data ? JSON.stringify(data) : undefined,
      cache: 'no-store'
    }).then(function (r) {
      return r.json().then(function (body) {
        if (!r.ok) throw new Error(body.error || body.status || 'HTTP ' + r.status);
        return body;
      });
    });
  }

  function deviceName() {
    var ua = navigator.userAgent || '';
    if (/Web0S|webOS|LG Browser/i.test(ua)) return 'LG TV Browser';
    if (/Mobile|Android/i.test(ua)) return 'Mobile Browser';
    return 'Web Browser';
  }

  /* ── On successful authorisation ── */
  function onAuthorized(meData) {
    var dev = meData.device || {};
    var perms = dev.permissions || {};
    var accounts = meData.accounts || [];
    var names = accounts.map(function (a) { return a.label; });

    var allowedSections = ['live', 'movies', 'series'].filter(function (k) {
      return perms[k] === true;
    });

    setStatus(
      (dev.name || 'Device') +
      (names.length ? ' · ' + names.join(', ') : '') +
      (allowedSections.length ? ' · ' + allowedSections.join('/') : ''),
      true
    );

    // Disable nav tiles the device doesn't have access to
    ['live', 'movies', 'series'].forEach(function (sec) {
      var btn = document.querySelector('.nav-btn[data-section="' + sec + '"]');
      if (btn) {
        btn.disabled = perms[sec] !== true || !accounts.length;
        if (btn.disabled) btn.title = 'Not assigned by administrator';
      }
    });

    show(false);

    // Load home dashboard rows
    if (window.VLCDashboardLoaded) window.VLCDashboardLoaded(meData);
  }

  /* ── Check saved token ── */
  function checkToken(token) {
    return api('/api/device/me', 'GET', null, token)
      .then(function (data) { onAuthorized(data); return true; });
  }

  /* ── Redeem invitation code ── */
  async function redeemInvitation(code) {
    if (!code || !code.trim()) { say('Please enter your invitation code.', 'error'); return; }

    say('Connecting…');
    setLoading(true);

    try {
      // Send invitation code to /api/pair/start
      // VPS server.js reads b.inviteCode and calls .toUpperCase() on it
      var result = await api('/api/pair/start', 'POST', {
        name: deviceName(),
        platform: 'browser',
        inviteCode: code.trim().toUpperCase()
      });

      // If the server returns a device token directly (invitation flow)
      if (result.token) {
        localStorage.setItem(KEY, result.token);
        say('Device connected!', 'success');
        var me = await api('/api/device/me', 'GET', null, result.token);
        onAuthorized(me);
        return;
      }

      // VPS returns ticket + status:'pending'; device must poll /api/pair/check
      if (result.ticket) {
        say('Activating your device… please wait.');
        var ticket = result.ticket;
        pollApproval(ticket);
        return;
      }

      say('Unexpected server response. Please try again.', 'error');
    } catch (e) {
      say(e.message || 'Connection failed. Check your code and try again.', 'error');
    } finally {
      setLoading(false);
    }
  }

  /* ── Legacy polling (if server uses ticket flow) ── */
  var pollTimer = null;
  var pollBusy = false;

  function stopPolling() {
    if (pollTimer) clearInterval(pollTimer);
    pollTimer = null;
    pollBusy = false;
  }

  function pollApproval(ticket) {
    stopPolling();
    function checkOnce() {
      if (pollBusy) return;
      pollBusy = true;
      api('/api/pair/check', 'POST', { ticket: ticket })
        .then(function (answer) {
          pollBusy = false;
          if (answer.status === 'approved' && answer.token) {
            stopPolling();
            localStorage.setItem(KEY, answer.token);
            say('Device connected!', 'success');
            return checkToken(answer.token);
          }
          if (answer.status === 'expired') {
            stopPolling();
            say('Code expired. Please try again.', 'error');
          }
        })
        .catch(function (e) {
          pollBusy = false;
          say('Connection check failed: ' + e.message, 'error');
        });
    }
    checkOnce();
    pollTimer = setInterval(checkOnce, 2500);
  }

  /* ── Wire up buttons ── */
  if (connectBtn) {
    connectBtn.addEventListener('click', function () {
      var code = codeInput ? codeInput.value : '';
      redeemInvitation(code);
    });
  }

  if (codeInput) {
    codeInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        redeemInvitation(codeInput.value);
      }
    });
  }

  if (retryBtn) {
    retryBtn.addEventListener('click', function () {
      stopPolling();
      say('');
      if (codeInput) { codeInput.value = ''; codeInput.focus(); }
      setLoading(false);
    });
  }

  /* ── On page load: check for existing token ── */
  show(true); // Show dialog by default
  setStatus('Connecting…');

  var savedToken = localStorage.getItem(KEY);
  if (savedToken) {
    say('Checking saved device…');
    checkToken(savedToken).catch(function () {
      localStorage.removeItem(KEY);
      say('Session expired. Enter your invitation code to reconnect.', 'error');
      setLoading(false);
    });
  } else {
    say('Enter the invitation code from your administrator.');
    if (codeInput) codeInput.focus();
  }

}());
