(function () {
  'use strict';
  var KEY = 'vlc_device_token_v1';
  var TICKET = 'vlc_pair_ticket_v1';
  var STATUS = 'vlc_pair_code_v1';
  var cover = document.getElementById('pair-cover');
  var code = document.getElementById('pair-code');
  var message = document.getElementById('pair-message');
  var retry = document.getElementById('pair-retry');
  var deviceStatus = document.getElementById('device-status');
  var timer = null, pendingTicket = null, busy = false;
  function show(v) { cover.hidden = !v; if (v) retry.focus(); }
  function say(s) { message.textContent = s; }
  function stop() { if (timer) clearInterval(timer); timer = null; }
  function request(route, method, value, bearer) {
    var headers = {'Content-Type':'application/json'};
    if (bearer) headers.Authorization = 'Bearer ' + bearer;
    return fetch(route, { method:method, headers:headers, body:value ? JSON.stringify(value) : undefined, cache:'no-store' }).then(function (r) {
      return r.json().then(function (b) { if (!r.ok) throw new Error(b.error || b.status || ('HTTP ' + r.status)); return b; });
    });
  }
  function deviceName() {
    var agent = navigator.userAgent || '';
    return /Web0S|webOS|LG Browser/i.test(agent) ? 'LG TV Browser' : 'Web Browser';
  }
  function authorized(data) {
    stop(); sessionStorage.removeItem(TICKET);sessionStorage.removeItem(STATUS);
    var d=data.device || {}, permissions=d.permissions || {};
    var names=(data.accounts || []).map(function (a) { return a.label; });
    deviceStatus.textContent = 'Paired: ' + (d.name || 'Device') + ' | ' + (names.join(', ') || 'No subscriptions assigned') + ' | ' + ['live','movies','series'].filter(function (x) { return permissions[x] === true; }).join('/');
    show(false);
    var keys={live:'live',movies:'movies',series:'series'};
    Object.keys(keys).forEach(function (key) {
      var tile=document.querySelector('[data-section="' + key + '"]');
      if(tile){tile.disabled = permissions[key] !== true || names.length === 0; tile.title=tile.disabled?'Not assigned by administrator':'';}
    });
  }
  function checkDevice(token) {
    return request('/api/device/me','GET',null,token).then(function (data) { authorized(data);return true; });
  }
  function poll() {
    if(!pendingTicket || busy) return;
    busy=true;
    request('/api/pair/check','POST',{ticket:pendingTicket}).then(function (answer) {
      if(answer.status==='approved' && answer.token){
        localStorage.setItem(KEY,answer.token);pendingTicket=null;
        return checkDevice(answer.token);
      }
      if(answer.status==='expired') {stop();pendingTicket=null;sessionStorage.removeItem(TICKET);sessionStorage.removeItem(STATUS);code.textContent='Expired';say('Code expired. Select Generate new code.');}
    }).catch(function (e) {say('Pairing check: ' + e.message);}).then(function () {busy=false;});
  }
  function start() {
    stop();busy=false;pendingTicket=null; code.textContent='------';say('Requesting a pairing code...');show(true);
    request('/api/pair/start','POST',{name:deviceName(),platform:'browser'}).then(function (data) {
      pendingTicket=data.ticket;code.textContent=data.code;
      sessionStorage.setItem(TICKET,data.ticket);sessionStorage.setItem(STATUS,data.code);
      say('On this PC, open /admin/ in another tab, connect, refresh the devices list, and approve this code with an account. Code expires in 5 minutes.');
      timer=setInterval(poll,3000);
    }).catch(function (e) {say('Pairing unavailable: ' + e.message);});
  }
  retry.addEventListener('click', start);
  show(true);
  var token=localStorage.getItem(KEY);
  if(token){
    say('Checking this device...');
    checkDevice(token).catch(function () {localStorage.removeItem(KEY);start();});
  } else {
    var ticket=sessionStorage.getItem(TICKET), oldCode=sessionStorage.getItem(STATUS);
    if(ticket && oldCode) {pendingTicket=ticket;code.textContent=oldCode;say('Waiting for administrator approval.');timer=setInterval(poll,3000);poll();}
    else start();
  }
})();
