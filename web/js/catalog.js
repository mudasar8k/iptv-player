(function () {
  'use strict';

  var state = {
    categories: [],
    activeCategory: null,
    items: [],
    activeItem: null,
    section: '',
    accountId: ''
  };

  var container = document.createElement('div');
  container.id = 'vlc-catalog';
  container.className = 'catalog-split-view';
  document.getElementById('section').appendChild(container);

  function clearNode(node) {
    if (!node) return;
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

  function el(tag, text, className) {
    var elem = document.createElement(tag);
    if (text !== undefined && text !== null) elem.textContent = text;
    if (className) elem.className = className;
    return elem;
  }

  /* Parse name into Title, Year, and Quality tags */
  function parseItemMeta(rawName) {
    var name = (rawName || 'Untitled').trim();
    var yearMatch = name.match(/[\(\[\s](19\d\d|20\d\d)[\)\]\s]?/);
    var year = yearMatch ? yearMatch[1] : '';
    var cleanTitle = name
      .replace(/[\(\[\s](19\d\d|20\d\d)[\)\]\s]?/g, '')
      .replace(/4K|UHD|FHD|1080p|720p|HDR|H\.?265|HEVC|Dual Audio|BluRay|WEBRip/gi, '')
      .replace(/[-_.]/g, ' ')
      .trim();

    var is4k = /4K|UHD/i.test(name);
    var isFhd = /FHD|1080/i.test(name);

    return {
      title: cleanTitle || name,
      rawName: name,
      year: year || '2024',
      quality: is4k ? '4K Ultra HD' : (isFhd ? '1080p FHD' : 'HD'),
      rating: '★ ' + (4.0 + (Math.abs(name.split('').reduce(function(a,c){return a+c.charCodeAt(0);},0)) % 10) / 10).toFixed(1)
    };
  }

  /* ── Showcase Detail Header (Top of main area) ── */
  var showcaseEl = null;

  function updateShowcase(item) {
    if (!showcaseEl || !item) return;
    var meta = parseItemMeta(item.name);

    var titleEl = showcaseEl.querySelector('.showcase-title');
    var yearEl = showcaseEl.querySelector('.showcase-year');
    var ratingEl = showcaseEl.querySelector('.showcase-rating');
    var qualityEl = showcaseEl.querySelector('.showcase-quality');
    var descEl = showcaseEl.querySelector('.showcase-desc');
    var bgEl = showcaseEl.querySelector('.showcase-bg');
    var watchBtn = showcaseEl.querySelector('.showcase-btn--play');
    var favBtn = showcaseEl.querySelector('.showcase-btn--fav');

    if (titleEl) titleEl.textContent = meta.title;
    if (yearEl) yearEl.textContent = meta.year;
    if (ratingEl) ratingEl.textContent = meta.rating;
    if (qualityEl) qualityEl.textContent = meta.quality;

    if (descEl) {
      descEl.textContent = item.plot || item.description ||
        ('Stream ' + meta.title + ' in pristine quality on your TV. Full crystal-clear digital audio and video stream.');
    }

    if (bgEl && item.image && /^https?:\/\//i.test(item.image)) {
      bgEl.style.backgroundImage = 'radial-gradient(ellipse at 75% 35%, rgba(120,50,200,.45) 0%, transparent 65%), linear-gradient(90deg, rgba(8,6,18,0.98) 0%, rgba(8,6,18,0.7) 50%, rgba(8,6,18,0.85) 100%), url("' + item.image + '")';
      bgEl.style.backgroundSize = 'cover';
      bgEl.style.backgroundPosition = 'center 20%';
    }

    if (watchBtn) {
      watchBtn.onclick = function () {
        if (state.section === 'series') {
          if (window.VLCSeriesOpen) {
            window.VLCSeriesOpen(state.accountId, item, container, function () { loadCategoryItems(state.activeCategory); });
            return;
          }
        }
        if (window.VLCPlayItem) {
          window.VLCPlayItem(state.section, state.accountId, item.id, item.name, undefined, item.image);
        }
      };
    }

    if (favBtn) {
      var isFav = window.VLCFavoritesList && window.VLCFavoritesList.some(function(f) {
        return String(f.itemId) === String(item.id) && f.section === state.section;
      });
      favBtn.classList.toggle('showcase-btn--active', Boolean(isFav));
      favBtn.innerHTML = (isFav ? '★ Favorited' : '☆ + My List');
      favBtn.onclick = async function () {
        var token = localStorage.getItem('vlc_device_token_v1');
        if (!token) return;
        try {
          var res = await fetch('/api/device/favorites/toggle', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
            body: JSON.stringify({
              accountId: state.accountId,
              section: state.section,
              itemId: String(item.id),
              name: item.name,
              image: item.image || ''
            })
          });
          var data = await res.json();
          if (res.ok) {
            window.VLCFavoritesList = data.favorites || [];
            updateShowcase(item);
          }
        } catch (_) {}
      };
    }
  }

  function createShowcaseDom() {
    var wrap = el('div', undefined, 'catalog-showcase');
    wrap.innerHTML =
      '<div class="showcase-bg"></div>' +
      '<div class="showcase-content">' +
        '<div class="showcase-meta-row">' +
          '<span class="showcase-rating">★ 4.8</span>' +
          '<span class="showcase-year">2024</span>' +
          '<span class="showcase-badge showcase-quality">4K Ultra HD</span>' +
          '<span class="showcase-badge">HDR10</span>' +
          '<span class="showcase-badge">Dolby 5.1</span>' +
        '</div>' +
        '<h1 class="showcase-title">Select a title</h1>' +
        '<p class="showcase-desc">Navigate through posters to preview title details and synopsis.</p>' +
        '<div class="showcase-actions">' +
          '<button type="button" class="showcase-btn showcase-btn--play">' +
            '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><polygon points="5 3 19 12 5 21 5 3"/></svg>' +
            'Watch Now' +
          '</button>' +
          '<button type="button" class="showcase-btn showcase-btn--fav">' +
            '☆ + My List' +
          '</button>' +
        '</div>' +
      '</div>';
    return wrap;
  }

  /* ── Load Items for a Category ── */
  async function loadCategoryItems(category) {
    state.activeCategory = category;

    // Update active category pill
    var catButtons = container.querySelectorAll('.cat-pill');
    catButtons.forEach(function (btn) {
      btn.classList.toggle('cat-pill--active', btn.getAttribute('data-cat-id') === String(category.category_id));
    });

    var itemsWrap = container.querySelector('.catalog-items-scroll');
    if (!itemsWrap) return;
    itemsWrap.innerHTML = '<p class="catalog-message">Loading ' + (category.category_name || '') + '…</p>';

    try {
      var token = localStorage.getItem('vlc_device_token_v1');
      if (!token) throw Error('Device not paired');
      var qs = new URLSearchParams({
        section: state.section,
        accountId: state.accountId,
        categoryId: String(category.category_id)
      });
      var res = await fetch('/api/device/items?' + qs.toString(), { headers: { Authorization: 'Bearer ' + token } });
      var data = await res.json();
      if (!res.ok) throw Error(data.error || 'Could not load category');

      state.items = data.items || [];
      clearNode(itemsWrap);

      if (!state.items.length) {
        itemsWrap.innerHTML = '<p class="catalog-message">No content found in this category.</p>';
        return;
      }

      var grid = el('div', undefined, 'catalog-cards-grid');
      itemsWrap.appendChild(grid);

      // Default showcase to first item
      updateShowcase(state.items[0]);

      state.items.forEach(function (item) {
        var card = el('button', undefined, 'cat-poster-card');
        card.type = 'button';
        card.title = item.name || '';

        var thumb = el('div', undefined, 'cat-poster-thumb');
        if (item.image && /^https?:\/\//i.test(item.image)) {
          var img = document.createElement('img');
          img.src = item.image;
          img.alt = '';
          img.loading = 'lazy';
          img.referrerPolicy = 'no-referrer';
          img.onerror = function () {
            img.remove();
            if (!thumb.querySelector('.cat-poster-thumb-empty')) {
              var fallback = el('div', '▶', 'cat-poster-thumb-empty');
              thumb.appendChild(fallback);
            }
          };
          thumb.appendChild(img);
        } else {
          thumb.appendChild(el('div', '▶', 'cat-poster-thumb-empty'));
        }

        var playOverlay = el('div', undefined, 'cat-poster-play');
        playOverlay.innerHTML = '<svg viewBox="0 0 24 24" fill="white" width="32" height="32"><polygon points="6 3 20 12 6 21 6 3"/></svg>';
        thumb.appendChild(playOverlay);

        var nameSpan = el('span', item.name || 'Untitled', 'cat-poster-name');

        card.appendChild(thumb);
        card.appendChild(nameSpan);

        // Hover or Focus updates the top dynamic detail banner
        function onCardFocus() {
          updateShowcase(item);
        }
        card.addEventListener('focus', onCardFocus);
        card.addEventListener('mouseenter', onCardFocus);

        card.addEventListener('click', function () {
          if (state.section === 'series') {
            if (window.VLCSeriesOpen) {
              window.VLCSeriesOpen(state.accountId, item, container, function () { loadCategoryItems(category); });
              return;
            }
          }
          if (window.VLCPlayItem) {
            window.VLCPlayItem(state.section, state.accountId, item.id, item.name, undefined, item.image);
          }
        });

        grid.appendChild(card);
      });

    } catch (err) {
      itemsWrap.innerHTML = '<p class="catalog-message">Error loading category: ' + err.message + '</p>';
    }
  }

  /* ── Render Split-Screen Layout ── */
  function renderLayout(categories) {
    clearNode(container);
    state.categories = categories || [];

    // Left Category Sidebar
    var catCol = el('aside', undefined, 'catalog-categories-col');
    var catHeader = el('div', undefined, 'cat-col-header');
    catHeader.innerHTML = '<h2 class="cat-col-title">Categories</h2>';
    catCol.appendChild(catHeader);

    var catList = el('div', undefined, 'cat-pill-list');
    catCol.appendChild(catList);

    // If favorites exist, add a ⭐ Favorites category pill at the top
    if (window.VLCFavoritesList && window.VLCFavoritesList.length) {
      var favCount = window.VLCFavoritesList.filter(function(f){ return f.section === state.section; }).length;
      if (favCount > 0) {
        var favPill = el('button', undefined, 'cat-pill cat-pill--fav');
        favPill.type = 'button';
        favPill.innerHTML = '<span class="cat-pill-name">⭐ My Favorites</span><span class="cat-pill-badge">' + favCount + '</span>';
        favPill.addEventListener('click', function () {
          var favs = window.VLCFavoritesList.filter(function(f){ return f.section === state.section; });
          renderFavoritesGrid(favs);
        });
        catList.appendChild(favPill);
      }
    }

    state.categories.forEach(function (cat) {
      var pill = el('button', undefined, 'cat-pill');
      pill.type = 'button';
      pill.setAttribute('data-cat-id', String(cat.category_id));
      pill.innerHTML = '<span class="cat-pill-name">' + (cat.category_name || 'Category') + '</span>';

      pill.addEventListener('click', function () {
        loadCategoryItems(cat);
      });

      catList.appendChild(pill);
    });

    // Right Main Area: Top Showcase + Bottom Grid
    var mainArea = el('div', undefined, 'catalog-main-area');
    showcaseEl = createShowcaseDom();
    mainArea.appendChild(showcaseEl);

    var itemsScroll = el('div', undefined, 'catalog-items-scroll');
    mainArea.appendChild(itemsScroll);

    container.appendChild(catCol);
    container.appendChild(mainArea);

    // Automatically load the first category
    if (state.categories.length) {
      loadCategoryItems(state.categories[0]);
    }
  }

  function renderFavoritesGrid(favs) {
    var itemsWrap = container.querySelector('.catalog-items-scroll');
    if (!itemsWrap) return;
    clearNode(itemsWrap);

    var catButtons = container.querySelectorAll('.cat-pill');
    catButtons.forEach(function (btn) { btn.classList.remove('cat-pill--active'); });

    var favPill = container.querySelector('.cat-pill--fav');
    if (favPill) favPill.classList.add('cat-pill--active');

    if (!favs || !favs.length) {
      itemsWrap.innerHTML = '<p class="catalog-message">No favorites found for ' + state.section + '.</p>';
      return;
    }

    updateShowcase({
      name: favs[0].name,
      id: favs[0].itemId,
      image: favs[0].image
    });

    var grid = el('div', undefined, 'catalog-cards-grid');
    itemsWrap.appendChild(grid);

    favs.forEach(function (fav) {
      var card = el('button', undefined, 'cat-poster-card');
      card.type = 'button';
      card.title = fav.name || '';

      var thumb = el('div', undefined, 'cat-poster-thumb');
      if (fav.image && /^https?:\/\//i.test(fav.image)) {
        var img = document.createElement('img');
        img.src = fav.image;
        img.alt = '';
        img.loading = 'lazy';
        img.referrerPolicy = 'no-referrer';
        img.onerror = function () {
          img.remove();
          if (!thumb.querySelector('.cat-poster-thumb-empty')) {
            var fallback = el('div', '▶', 'cat-poster-thumb-empty');
            thumb.appendChild(fallback);
          }
        };
        thumb.appendChild(img);
      } else {
        thumb.appendChild(el('div', '▶', 'cat-poster-thumb-empty'));
      }

      card.appendChild(thumb);
      card.appendChild(el('span', fav.name, 'cat-poster-name'));

      card.addEventListener('focus', function () {
        updateShowcase({ name: fav.name, id: fav.itemId, image: fav.image });
      });

      card.addEventListener('click', function () {
        if (fav.section === 'series') {
          if (window.VLCSeriesOpen) {
            window.VLCSeriesOpen(fav.accountId, { id: fav.itemId, name: fav.name, image: fav.image }, container, function () { renderFavoritesGrid(favs); });
            return;
          }
        }
        if (window.VLCPlayItem) {
          window.VLCPlayItem(fav.section, fav.accountId, fav.itemId, fav.name, fav.seriesId, fav.image);
        }
      });

      grid.appendChild(card);
    });
  }

  window.VLCCatalogBack = function () {
    return false; // Handled directly by Home screen switch
  };

  window.VLCLoadCategories = async function (section) {
    if (section === 'favorites') {
      state.section = 'movies';
      var favs = window.VLCFavoritesList || [];
      renderFavoritesGrid(favs);
      return;
    }

    if (!['live', 'movies', 'series'].includes(section)) return;

    state.section = section;

    try {
      var token = localStorage.getItem('vlc_device_token_v1');
      if (!token) throw Error('Device not paired');

      var headers = { Authorization: 'Bearer ' + token };
      var meRes = await fetch('/api/device/me', { headers: headers });
      if (!meRes.ok) throw Error('Authorization check failed');
      var me = await meRes.json();
      if (!me.accounts || !me.accounts.length) throw Error('No subscription active');

      var account = me.accounts[0];
      state.accountId = account.id;

      var catRes = await fetch('/api/device/catalog?' + new URLSearchParams({ section: section, accountId: account.id }), { headers: headers });
      var catData = await catRes.json();
      if (!catRes.ok) throw Error(catData.error || 'Failed to load categories');

      renderLayout(catData.categories || []);

    } catch (e) {
      container.innerHTML = '<div style="padding:48px 32px;display:flex;flex-direction:column;align-items:flex-start;gap:16px;">' +
        '<p class="catalog-message" style="margin:0;color:#ff6b81;">Could not load categories: ' + e.message + '</p>' +
        '<button type="button" class="back-btn" onclick="window.VLCLoadCategories && window.VLCLoadCategories(\'' + section + '\')">↻ Retry Loading</button>' +
        '</div>';
    }
  };
}());