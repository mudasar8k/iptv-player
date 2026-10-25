/* V7.1: rename the native newest-first Movies heading only. */
(function () {
  'use strict';
  function rename() {
    if (typeof pageType === 'undefined' || pageType !== 'movies') return;
    var source = document.querySelector('#moviesList section.top-added-section');
    if (!source) return;
    var headings = source.querySelectorAll('h1, h2, h3, .slider-heading');
    for (var i = 0; i < headings.length; i++) {
      if (headings[i].children.length === 0 &&
          (headings[i].textContent || '').replace(/^\s+|\s+$/g, '').toLowerCase() === 'top added') {
        headings[i].textContent = 'Newly Added';
        return;
      }
    }
  }
  setInterval(rename, 900);
})();
