/* Full-size image viewer.
   Any <a data-lightbox href="full.webp"> opens its target in the page's
   <dialog class="lightbox"> instead of navigating. Without JavaScript, or in a
   browser without <dialog>, the link still opens the full-size file.
   The image starts fitted to the screen; "Actual size" (or selecting the image)
   switches to 1:1 pixels and scrolls to the point that was selected. */
(function () {
  'use strict';

  var dialog = document.querySelector('dialog.lightbox');
  if (!dialog || typeof dialog.showModal !== 'function') return;

  var stage = dialog.querySelector('.lightbox__stage');
  var img = stage.appendChild(document.createElement('img'));
  var title = dialog.querySelector('.lightbox__title');
  var zoomBtn = dialog.querySelector('[data-lightbox-zoom]');
  var closeBtn = dialog.querySelector('[data-lightbox-close]');
  var opener = null;

  function setZoom(on, fx, fy) {
    stage.classList.toggle('is-zoomed', on);
    zoomBtn.textContent = on ? 'Fit to screen' : 'Actual size';
    if (on) {
      // Keep the selected point (fractions of the image) under the pointer
      var x = (fx === undefined ? 0 : fx) * img.scrollWidth - stage.clientWidth / 2;
      var y = (fy === undefined ? 0 : fy) * img.scrollHeight - stage.clientHeight / 2;
      stage.scrollTo(Math.max(0, x), Math.max(0, y));
    }
  }

  function open(link) {
    var thumb = link.querySelector('img');
    var fig = link.closest('figure');
    var heading = fig && fig.querySelector('.mf-fig__title, figcaption h2, figcaption h3');
    opener = link;
    img.alt = thumb ? thumb.alt : '';
    img.src = link.getAttribute('href');
    title.textContent = heading ? heading.textContent.trim() : 'Full-size image';
    setZoom(false);
    document.documentElement.classList.add('lightbox-open');
    dialog.showModal();
    closeBtn.focus();
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[data-lightbox]');
    if (!link || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    open(link);
  });

  zoomBtn.addEventListener('click', function () {
    setZoom(!stage.classList.contains('is-zoomed'), 0.5, 0.5);
  });

  img.addEventListener('click', function (e) {
    var r = img.getBoundingClientRect();
    if (stage.classList.contains('is-zoomed')) { setZoom(false); return; }
    setZoom(true, (e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
  });

  closeBtn.addEventListener('click', function () { dialog.close(); });

  // A click on the dark area around the image closes the viewer
  dialog.addEventListener('click', function (e) {
    if (e.target === dialog || e.target === stage) dialog.close();
  });

  dialog.addEventListener('close', function () {
    document.documentElement.classList.remove('lightbox-open');
    img.removeAttribute('src');
    if (opener) opener.focus();
  });
})();
