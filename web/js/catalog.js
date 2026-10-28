(function () {
  'use strict';

  var state = {
    categories: [],
    activeCategory: null,
    items: [],
    activeItem: null,
    section: '',
    accountId: '',
    searchQuery: '',
    sortMode: 'default', // 'default', 'newest', 'year', 'rating', 'title'
    categorySearch: ''
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
  function parseItemMeta(rawName, explicitRating) {
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

    var ratingVal = '';
    if (explicitRating && !isNaN(Number(explicitRating)) && Number(explicitRating) > 0) {
      var num = Number(explicitRating);
      ratingVal = '★ ' + (num > 5 ? num.toFixed(1) : (num * 2).toFixed(1));
    } else {
      ratingVal = '★ ' + (4.0 + (Math.abs(name.split('').reduce(function(a,c){return a+c.charCodeAt(0);},0)) % 10) / 10).toFixed(1);
    }

    return {
      title: cleanTitle || name,
      rawName: name,
      year: year || '2024',
      numericYear: year ? Number(year) : 0,
      quality: is4k ? '4K Ultra HD' : (isFhd ? '1080p FHD' : 'HD'),
      rating: ratingVal
    };
  }

  /* Parse uploaded timestamp / date into human label */
  function formatAddedBadge(addedVal) {
    if (!addedVal) return '';
    var ts = 0;
    if (/^\d{10,13}$/.test(String(addedVal))) {
      ts = Number(addedVal);
      if (ts < 1e11) ts = ts * 1000;
    } else {
      var d = Date.parse(addedVal);
      if (!isNaN(d)) ts = d;
    }
    if (!ts) return '';
    var diffMs = Date.now() - ts;
    var days = Math.floor(diffMs / (86400000));
    if (days <= 7) return '🔥 NEW';
    if (days <= 30) return 'NEW';
    return '';
  }

  function getAddedTimestamp(addedVal) {
    if (!addedVal) return 0;
    if (/^\d{10,13}$/.test(String(addedVal))) {
      var ts = Number(addedVal);
      return ts < 1e11 ? ts * 1000 : ts;
    }
    var d = Date.parse(addedVal);
    return isNaN(d) ? 0 : d;
  }

  /* ── Showcase Detail Header (Top of main area) ── */
  var showcaseEl = null;

  function updateShowcase(item) {
    if (!showcaseEl || !item) return;
    var meta = parseItemMeta(item.name, item.rating);

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
            var restoreCategory = state.activeCategory;
            window.VLCSeriesOpen(state.accountId, item, container, function () {
              renderLayout(state.categories, restoreCategory);
            });
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

  /* ── Filter & Sort Items ── */
  function getFilteredAndSortedItems(items) {
    if (!Array.isArray(items)) return [];
    var list = items.slice();

    // 1. Text filter
    var query = (state.searchQuery || '').trim().toLowerCase();
    if (query) {
      list = list.filter(function (it) {
        return (it.name || '').toLowerCase().indexOf(query) !== -1;
      });
    }

    // 2. Sort mode
    if (state.sortMode === 'newest') {
      list.sort(function (a, b) {
        var tA = getAddedTimestamp(a.added);
        var tB = getAddedTimestamp(b.added);
        if (tA !== tB) return tB - tA;
        return (b.id || 0) - (a.id || 0);
      });
    } else if (state.sortMode === 'year') {
      list.sort(function (a, b) {
        var yA = parseItemMeta(a.name).numericYear;
        var yB = parseItemMeta(b.name).numericYear;
        if (yA !== yB) return yB - yA;
        return (a.name || '').localeCompare(b.name || '');
      });
    } else if (state.sortMode === 'rating') {
      list.sort(function (a, b) {
        var rA = parseFloat(a.rating) || 0;
        var rB = parseFloat(b.rating) || 0;
        if (rA !== rB) return rB - rA;
        return (a.name || '').localeCompare(b.name || '');
      });
    } else if (state.sortMode === 'title') {
      list.sort(function (a, b) {
        return (a.name || '').localeCompare(b.name || '');
      });
    }

    return list;
  }

  /* ── Render Toolbar (Search + Sort Pills) ── */
  function createToolbarDom(onFilterChange) {
    var toolbar = el('div', undefined, 'catalog-filter-bar');

    // Search input box
    var searchBox = el('div', undefined, 'cat-search-box');
    searchBox.innerHTML =
      '<svg class="cat-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="16" height="16"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
      '<input type="text" class="cat-search-input" placeholder="Search in this category…" value="' + (state.searchQuery || '') + '">' +
      '<button type="button" class="cat-search-clear' + (state.searchQuery ? ' is-visible' : '') + '" title="Clear search" aria-label="Clear search">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" width="14" height="14"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
      '</button>';

    var input = searchBox.querySelector('.cat-search-input');
    var clearBtn = searchBox.querySelector('.cat-search-clear');

    input.addEventListener('input', function (e) {
      state.searchQuery = e.target.value;
      if (clearBtn) {
        clearBtn.classList.toggle('is-visible', Boolean(state.searchQuery));
      }
      onFilterChange();
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        state.searchQuery = '';
        input.value = '';
        clearBtn.classList.remove('is-visible');
        input.focus();
        onFilterChange();
      });
    }

    toolbar.appendChild(searchBox);

    // Sort Pills
    var pillsWrap = el('div', undefined, 'cat-sort-pills');
    var sorts = [
      { id: 'default', label: 'Default' },
      { id: 'newest',  label: '🔥 Newly Added' },
      { id: 'year',    label: '📅 Release Year' },
      { id: 'rating',  label: '★ Top Rated' },
      { id: 'title',   label: '🔤 A–Z' }
    ];

    sorts.forEach(function (s) {
      var pill = el('button', s.label, 'cat-sort-pill' + (state.sortMode === s.id ? ' cat-sort-pill--active' : ''));
      pill.type = 'button';
      pill.setAttribute('data-sort', s.id);
      pill.addEventListener('click', function () {
        state.sortMode = s.id;
        pillsWrap.querySelectorAll('.cat-sort-pill').forEach(function (b) {
          b.classList.toggle('cat-sort-pill--active', b.getAttribute('data-sort') === s.id);
        });
        onFilterChange();
      });
      pillsWrap.appendChild(pill);
    });

    toolbar.appendChild(pillsWrap);
    return toolbar;
  }

  /* ── Render Cards Grid ── */
  function renderCards(grid, items, category) {
    clearNode(grid);

    if (!items.length) {
      grid.innerHTML = '<p class="catalog-message">No titles match your filter.</p>';
      return;
    }

    items.forEach(function (item) {
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

      // New upload badge
      var newBadgeText = formatAddedBadge(item.added);
      if (newBadgeText) {
        var newBadge = el('span', newBadgeText, 'cat-poster-badge-new');
        thumb.appendChild(newBadge);
      }

      var playOverlay = el('div', undefined, 'cat-poster-play');
      playOverlay.innerHTML = '<svg viewBox="0 0 24 24" fill="white" width="32" height="32"><polygon points="6 3 20 12 6 21 6 3"/></svg>';
      thumb.appendChild(playOverlay);

      var nameSpan = el('span', item.name || 'Untitled', 'cat-poster-name');

      card.appendChild(thumb);
      card.appendChild(nameSpan);

      function onCardFocus() {
        updateShowcase(item);
      }
      card.addEventListener('focus', onCardFocus);
      card.addEventListener('mouseenter', onCardFocus);

      card.addEventListener('click', function () {
        if (state.section === 'series') {
          if (window.VLCSeriesOpen) {
            var restoreCategory = category || state.activeCategory;
            window.VLCSeriesOpen(state.accountId, item, container, function () {
              renderLayout(state.categories, restoreCategory);
            });
            return;
          }
        }
        if (window.VLCPlayItem) {
          window.VLCPlayItem(state.section, state.accountId, item.id, item.name, undefined, item.image);
        }
      });

      grid.appendChild(card);
    });
  }

  /* ── Load Items for a Category ── */
  async function loadCategoryItems(category) {
    state.activeCategory = category;
    state.searchQuery = ''; // Reset search on category switch

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

      // 1. Add Filter & Sort Toolbar
      var toolbar = createToolbarDom(function () {
        var filtered = getFilteredAndSortedItems(state.items);
        renderCards(grid, filtered, category);
        if (filtered.length) updateShowcase(filtered[0]);
      });
      itemsWrap.appendChild(toolbar);

      // 2. Add Cards Grid
      var grid = el('div', undefined, 'catalog-cards-grid');
      itemsWrap.appendChild(grid);

      // 3. Render filtered cards & update showcase
      var filtered = getFilteredAndSortedItems(state.items);
      renderCards(grid, filtered, category);
      if (filtered.length) updateShowcase(filtered[0]);

    } catch (err) {
      itemsWrap.innerHTML = '<p class="catalog-message">Error loading category: ' + err.message + '</p>';
    }
  }

  /* ── Render Split-Screen Layout ── */
  function renderLayout(categories, targetCategory) {
    clearNode(container);
    state.categories = categories || [];
    state.categorySearch = '';
    if (targetCategory) {
      state.activeCategory = targetCategory;
    }

    // Left Category Sidebar
    var catCol = el('aside', undefined, 'catalog-categories-col');
    var catHeader = el('div', undefined, 'cat-col-header');
    catHeader.innerHTML = '<h2 class="cat-col-title">Categories</h2>';
    catCol.appendChild(catHeader);

    // Category search input
    var catSearchBox = el('div', undefined, 'cat-col-search');
    catSearchBox.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="14" height="14"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
      '<input type="text" class="cat-col-search-input" placeholder="Filter categories…">' +
      '<button type="button" class="cat-search-clear" title="Clear filter" aria-label="Clear filter">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" width="12" height="12"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
      '</button>';
    var catInput = catSearchBox.querySelector('.cat-col-search-input');
    var catClear = catSearchBox.querySelector('.cat-search-clear');

    catInput.addEventListener('input', function (e) {
      state.categorySearch = (e.target.value || '').toLowerCase();
      if (catClear) catClear.classList.toggle('is-visible', Boolean(state.categorySearch));
      renderCategoryPills(catList);
    });

    if (catClear) {
      catClear.addEventListener('click', function () {
        state.categorySearch = '';
        catInput.value = '';
        catClear.classList.remove('is-visible');
        catInput.focus();
        renderCategoryPills(catList);
      });
    }

    catCol.appendChild(catSearchBox);

    var catList = el('div', undefined, 'cat-pill-list');
    catCol.appendChild(catList);

    function renderCategoryPills(targetList) {
      clearNode(targetList);

      // If favorites exist, add a ⭐ Favorites category pill at the top
      if (window.VLCFavoritesList && window.VLCFavoritesList.length) {
        var favCount = window.VLCFavoritesList.filter(function(f){ return f.section === state.section; }).length;
        if (favCount > 0 && (!state.categorySearch || 'my favorites'.indexOf(state.categorySearch) !== -1)) {
          var favPill = el('button', undefined, 'cat-pill cat-pill--fav');
          favPill.type = 'button';
          favPill.innerHTML = '<span class="cat-pill-name">⭐ My Favorites</span><span class="cat-pill-badge">' + favCount + '</span>';
          favPill.addEventListener('click', function () {
            var favs = window.VLCFavoritesList.filter(function(f){ return f.section === state.section; });
            renderFavoritesGrid(favs);
          });
          targetList.appendChild(favPill);
        }
      }

      var filteredCats = state.categories.filter(function (c) {
        if (!state.categorySearch) return true;
        return (c.category_name || '').toLowerCase().indexOf(state.categorySearch) !== -1;
      });

      filteredCats.forEach(function (cat) {
        var pill = el('button', undefined, 'cat-pill');
        pill.type = 'button';
        pill.setAttribute('data-cat-id', String(cat.category_id));
        if (state.activeCategory && String(state.activeCategory.category_id) === String(cat.category_id)) {
          pill.classList.add('cat-pill--active');
        }
        pill.innerHTML = '<span class="cat-pill-name">' + (cat.category_name || 'Category') + '</span>';

        pill.addEventListener('click', function () {
          loadCategoryItems(cat);
        });

        targetList.appendChild(pill);
      });
    }

    renderCategoryPills(catList);

    // Right Main Area: Top Showcase + Bottom Grid
    var mainArea = el('div', undefined, 'catalog-main-area');
    showcaseEl = createShowcaseDom();
    mainArea.appendChild(showcaseEl);

    var itemsScroll = el('div', undefined, 'catalog-items-scroll');
    mainArea.appendChild(itemsScroll);

    container.appendChild(catCol);
    container.appendChild(mainArea);

    // Automatically load the specified or first category
    if (targetCategory) {
      loadCategoryItems(targetCategory);
    } else if (state.categories.length) {
      loadCategoryItems(state.categories[0]);
    }
  }

  function renderFavoritesGrid(favs) {
    if (!container.querySelector('.catalog-items-scroll')) {
      renderLayout(state.categories);
    }
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
            window.VLCSeriesOpen(fav.accountId, { id: fav.itemId, name: fav.name, image: fav.image }, container, function () {
              renderFavoritesGrid(favs);
            });
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
    // If series panel is currently open inside catalog container, press its back button
    var seriesBackBtn = container.querySelector('.vlc-series-panel .back-btn');
    if (seriesBackBtn) {
      seriesBackBtn.click();
      return true; // Handled back navigation to catalog
    }
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