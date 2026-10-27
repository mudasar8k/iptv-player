(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════
     VLC IPTV — Series detail panel
     series.js
  ═══════════════════════════════════════════════════════ */

  var generation = 0;

  function el(tag, text, cls) {
    var e = document.createElement(tag);
    if (text !== undefined) e.textContent = text;
    if (cls) e.className = cls;
    return e;
  }

  function safeImg(src) {
    return typeof src === 'string' && /^https?:\/\//i.test(src);
  }

  window.VLCSeriesOpen = async function (accountId, item, container, back) {
    var id = ++generation;
    container.replaceChildren();

    var panel = el('div', undefined, 'vlc-series-panel');
    container.appendChild(panel);

    // Back button
    var backButton = el('button', undefined, 'back-btn');
    backButton.type = 'button';
    backButton.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18"><polyline points="15 18 9 12 15 6"/></svg> Back to series';
    backButton.onclick = function () { ++generation; back(); };
    panel.appendChild(backButton);

    // Status
    var status = el('p', 'Loading episodes…', 'catalog-message');
    panel.appendChild(status);
    backButton.focus();

    try {
      var token = localStorage.getItem('vlc_device_token_v1');
      if (!token) throw new Error('Device not paired');

      var qs = new URLSearchParams({ accountId: accountId, seriesId: String(item.id) });
      var response = await fetch('/api/device/series/info?' + qs, {
        headers: { Authorization: 'Bearer ' + token }
      });
      var data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Series unavailable');
      if (id !== generation) return;

      status.remove();

      /* ── Hero layout ── */
      var hero = el('div', undefined, 'vlc-series-hero');

      if (data.cover && safeImg(data.cover)) {
        var cover = el('img', undefined, 'vlc-series-cover');
        cover.src = data.cover;
        cover.alt = '';
        cover.referrerPolicy = 'no-referrer';
        cover.onerror = function () { cover.remove(); };
        hero.appendChild(cover);
      }

      var info = el('div', undefined, 'vlc-series-info');

      if (data.genre) {
        var genre = el('p', data.genre.toUpperCase(), 'vlc-series-meta');
        info.appendChild(genre);
      }

      var title = el('h2', data.title || item.name || 'Series', 'vlc-series-title');
      info.appendChild(title);

      if (data.rating && data.rating !== '0') {
        var ratingWrap = el('div', undefined, 'vlc-series-rating');
        ratingWrap.innerHTML = '★ ' + data.rating;
        info.appendChild(ratingWrap);
      }

      if (data.plot) {
        var plot = el('p', data.plot, 'vlc-series-description');
        info.appendChild(plot);
      }

      hero.appendChild(info);
      panel.appendChild(hero);

      /* ── Season tabs ── */
      var episodes = Array.isArray(data.episodes) ? data.episodes : [];
      if (!episodes.length) {
        panel.appendChild(el('p', 'No episodes reported by your provider.', 'catalog-message'));
        return;
      }

      var seasons = [...new Set(episodes.map(function (e) { return e.season; }))]
        .sort(function (a, b) { return Number(a) - Number(b); });

      var activeSeason = seasons[0];

      var seasonsWrap = el('div', undefined, 'vlc-series-seasons');

      seasons.forEach(function (s) {
        var btn = el('button', 'Season ' + s, 'vlc-season-btn');
        btn.type = 'button';
        if (s === activeSeason) btn.classList.add('vlc-season-btn--active');
        btn.addEventListener('click', function () {
          seasonsWrap.querySelectorAll('.vlc-season-btn').forEach(function (b) {
            b.classList.remove('vlc-season-btn--active');
          });
          btn.classList.add('vlc-season-btn--active');
          activeSeason = s;
          renderEpisodes(s);
        });
        seasonsWrap.appendChild(btn);
      });

      panel.appendChild(seasonsWrap);

      var episodesGrid = el('div', undefined, 'vlc-series-episodes');
      panel.appendChild(episodesGrid);

      function renderEpisodes(season) {
        episodesGrid.replaceChildren();
        var filtered = episodes
          .filter(function (e) { return e.season === season; })
          .sort(function (a, b) { return a.episode - b.episode; });

        filtered.forEach(function (e) {
          var card = el('div', undefined, 'vlc-series-episode');

          var epNum = el('span', 'EP ' + (e.episode || ''), 'ep-number');
          var epTitle = el('span', e.title || ('Episode ' + e.episode), 'ep-title');

          card.appendChild(epNum);
          card.appendChild(epTitle);

          if (e.duration) {
            card.appendChild(el('span', e.duration, 'ep-duration'));
          }

          // Make it a button for keyboard access
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'vlc-series-episode';
          btn.style.cssText = 'all: unset; display: flex; flex-direction: column; gap: 6px; width: 100%; background: var(--surface); color: var(--text); border: 1px solid var(--border); padding: 16px 18px; min-height: 72px; border-radius: var(--radius); cursor: pointer; text-align: left; transition: border-color .15s, background .15s, transform .15s;';
          btn.appendChild(epNum);
          btn.appendChild(epTitle);
          if (e.duration) btn.appendChild(el('span', e.duration, 'ep-duration'));
          btn.addEventListener('mouseover', function () { btn.style.borderColor = 'var(--border-hi)'; btn.style.background = 'var(--surface-2)'; });
          btn.addEventListener('mouseout', function () { btn.style.borderColor = 'var(--border)'; btn.style.background = 'var(--surface)'; });
          btn.onclick = function () {
            if (window.VLCPlayItem) {
              var epLabel = (item.name ? item.name + ' - ' : '') + (e.title || ('Episode ' + e.episode));
              window.VLCPlayItem('series', accountId, e.id, epLabel, String(item.id), item.image);
            }
          };

          episodesGrid.appendChild(btn);
        });

        if (!filtered.length) {
          episodesGrid.appendChild(el('p', 'No episodes in this season.', 'catalog-message'));
        }
      }

      renderEpisodes(activeSeason);
      backButton.focus();

    } catch (e) {
      if (id === generation) status.textContent = 'Unable to load episodes: ' + e.message;
    }
  };

}());
