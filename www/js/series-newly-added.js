/* V7.2 Series: rename native Top Added heading, no additional carousel. */
(function () {
  'use strict';
  function renameSeries() {
    if (typeof pageType === 'undefined' || pageType !== 'series') return;
    var root = document.querySelector('#moviesList');
    if (!root) return;
    var headings = root.querySelectorAll('.top-added-section h1, .slider-heading h1');
    for (var i = 0; i < headings.length; i++) {
      var node = headings[i];
      if (node.children.length === 0 &&
          (node.textContent || '').replace(/^\s+|\s+$/g, '').toLowerCase() === 'top added') {
        node.textContent = 'Newly Added';
      }
    }
  }
  setInterval(renameSeries, 900);
})();
