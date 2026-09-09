/* ============================================================
   EXPERIENCE TIMELINE
   ------------------------------------------------------------
   Renders the vertical timeline from the EXPERIENCE array in
   experience-data.js. Every optional section (images, outcomes,
   tech chips) is skipped entirely when its array is empty or
   missing, so an entry without them reads as intentional.
   ============================================================ */
(function () {
  const mount = document.getElementById('experienceTimeline');
  if (!mount || typeof EXPERIENCE === 'undefined') return;

  /* --- helpers --------------------------------------------------------- */
  const el = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  };

  const filled = value => Array.isArray(value) && value.length > 0;

  const chevron =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<polyline points="6 9 12 15 18 9"/></svg>';

  /* --- pieces ---------------------------------------------------------- */
  function logoTile(entry) {
    const tile = el('span', 'vt-logo');
    if (entry.logo) {
      const img = el('img');
      img.src = entry.logo;
      img.alt = entry.company + ' logo';
      /* A missing logo file falls back to the monogram rather than a broken icon */
      img.addEventListener('error', () => {
        img.remove();
        tile.textContent = entry.monogram || entry.company.charAt(0);
      });
      tile.appendChild(img);
    } else {
      tile.textContent = entry.monogram || entry.company.charAt(0);
    }
    return tile;
  }

  function header(entry, index) {
    const btn = el('button', 'vt-header');
    btn.type = 'button';
    btn.id = 'vt-header-' + index;
    btn.setAttribute('aria-controls', 'vt-panel-' + index);

    const headings = el('span', 'vt-headings');
    const company = el('span', 'vt-company', entry.company);
    if (entry.current) company.appendChild(el('span', 'vt-current', 'Current'));
    headings.appendChild(company);

    const meta = el('span', 'vt-meta');
    meta.appendChild(el('span', 'vt-meta-main', [entry.role, entry.dates].filter(Boolean).join(' · ')));
    /* Location trails the line on wider screens; CSS drops it on narrow ones */
    if (entry.location) meta.appendChild(el('span', 'vt-loc', ' · ' + entry.location));
    headings.appendChild(meta);

    const chev = el('span', 'vt-chevron');
    chev.innerHTML = chevron;

    btn.append(logoTile(entry), headings, chev);
    return btn;
  }

  /* At most two images, each in a browser-chrome frame */
  function shots(entry) {
    if (!filled(entry.images)) return null;
    const list = entry.images.slice(0, 2);

    const wrap = el('div', 'vt-shots' + (list.length === 2 ? ' vt-shots-pair' : ''));

    list.forEach(src => {
      const figure = el('figure', 'vt-shot');

      const bar = el('div', 'vt-shot-bar');
      bar.append(el('span'), el('span'), el('span'));

      const frame = el('div', 'vt-shot-img');
      const img = el('img');
      img.src = src;
      img.alt = entry.company + ' — ' + entry.role;
      img.loading = 'lazy';
      /* A missing file removes its frame, and the section with it if it empties */
      img.addEventListener('error', () => {
        figure.remove();
        if (!wrap.querySelector('.vt-shot')) wrap.remove();
      });

      frame.appendChild(img);
      figure.append(bar, frame);
      wrap.appendChild(figure);
    });

    return wrap;
  }

  function pills(entry) {
    if (!filled(entry.outcomes)) return null;
    const list = el('ul', 'vt-outcomes');
    entry.outcomes.forEach(text => list.appendChild(el('li', 'vt-outcome', text)));
    return list;
  }

  function chips(entry) {
    if (!filled(entry.tech)) return null;
    const list = el('ul', 'vt-tags');
    entry.tech.forEach(text => list.appendChild(el('li', 'vt-tag', text)));
    return list;
  }

  function panel(entry, index) {
    const region = el('div', 'vt-panel');
    region.id = 'vt-panel-' + index;
    region.setAttribute('role', 'region');
    region.setAttribute('aria-labelledby', 'vt-header-' + index);

    const inner = el('div', 'vt-panel-inner');
    inner.append(el('p', 'vt-about', entry.about), el('p', 'vt-did', entry.did));

    [shots(entry), pills(entry), chips(entry)].forEach(section => {
      if (section) inner.appendChild(section);
    });

    if (entry.note) inner.appendChild(el('p', 'vt-note', entry.note));

    region.appendChild(inner);
    return region;
  }

  /* --- open / close ---------------------------------------------------- */
  function setOpen(entry, btn, region, open) {
    entry.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
    region.querySelector('.vt-panel-inner').inert = !open;
  }

  /* --- build ----------------------------------------------------------- */
  EXPERIENCE.forEach((data, index) => {
    const item = el('article', 'vt-entry');
    item.style.setProperty('--vt-accent', data.accent || 'var(--color-accent)');

    const marker = el('div', 'vt-marker');
    marker.appendChild(el('span', 'vt-dot'));

    const body = el('div', 'vt-body');
    const heading = el('h2', 'vt-heading');
    const btn = header(data, index);
    const region = panel(data, index);

    heading.appendChild(btn);
    body.append(heading, region);
    item.append(marker, body);
    mount.appendChild(item);

    /* The most recent placement starts open */
    setOpen(item, btn, region, index === 0);

    btn.addEventListener('click', () => {
      setOpen(item, btn, region, !item.classList.contains('is-open'));
    });
  });
})();
