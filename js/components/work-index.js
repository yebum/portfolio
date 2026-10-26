// createWorkIndex owns its markup and DOM interactions.
export function createWorkIndex({ D, t, $, $$, esc, pad2, src, imageDimensions, responsive, projectDiscs, TOTAL }) {
  function renderIndex() {
    const list = $('#index-list'), filters = $('#filters'), section = $('#index');
    const counts = D.projects.reduce((m, p) => {
      p.disciplines.forEach(key => { m[key] = (m[key] || 0) + 1; });
      return m;
    }, {});
    const tabs = [{ key: 'all', label: 'All', n: TOTAL }, ...D.disciplines.map(d => ({ key: d.key, label: d.label, n: counts[d.key] || 0 }))];
    filters.innerHTML = tabs.map((t, i) =>
      `<button type="button" class="filter" role="tab" data-filter="${t.key}" aria-selected="${i === 0}">${esc(t.label)}<sup>${pad2(t.n)}</sup></button>`).join('');

    const ordered = [...D.projects].sort((a, b) => Number(b.year) - Number(a.year));
    list.innerHTML = ordered.map((p, i) => `
      <li data-disc="${esc(p.disciplines.join(' '))}" data-cover="${esc(p.cover)}">
        <a class="row-link" href="#/work/${p.id}" data-thumb="${src(p.cover, true)}">
          <span class="row-thumb card"><img src="${src(p.cover)}"${imageDimensions(p.cover)}${responsive(p.cover, '(max-width: 580px) 100vw, (max-width: 900px) 50vw, (max-width: 1600px) 33vw, 25vw')} alt="" loading="lazy" decoding="async"></span>
          <span class="row-no mono">${pad2(i + 1)}</span>
          <span class="row-title"><span class="t">${esc(p.fullTitle)}</span>${p.awards.length ? `<span class="row-award" title="${esc(p.awards.join(' · '))}" aria-label="Award"></span>` : ''}</span>
          <span class="row-disc">${esc(projectDiscs(p).map(d => d.label).join(' / '))}</span>
          <span class="row-ctx">${esc(p.context)}</span>
          <span class="row-year mono">${esc(p.year)}</span>
          <span class="row-go chip">View</span>
        </a>
      </li>`).join('');

    const filterButtons = $$('.filter', filters);
    const rows = $$('li', list).map(el => ({ el, disciplines: new Set(el.dataset.disc.split(' ')) }));
    let masonryFrame = 0;
    const layoutMasonry = () => {
      masonryFrame = 0;
      if (!section.classList.contains('is-grid')) return;
      const gap = parseFloat(getComputedStyle(list).getPropertyValue('--masonry-gap')) || 40;
      const sizes = rows.filter(({ el }) => !el.hidden).map(({ el }) => [el, Math.ceil(el.querySelector('.row-link').getBoundingClientRect().height + gap)]);
      sizes.forEach(([el, height]) => el.style.setProperty('--row-span', height));
    };
    const scheduleMasonry = () => {
      if (!masonryFrame) masonryFrame = requestAnimationFrame(layoutMasonry);
    };
    list.classList.add('is-masonry');
    if ('ResizeObserver' in window) {
      const observer = new ResizeObserver(scheduleMasonry);
      rows.forEach(({ el }) => observer.observe(el.querySelector('.row-link')));
    } else {
      $$('img', list).forEach(img => img.addEventListener('load', scheduleMasonry));
    }
    window.addEventListener('resize', scheduleMasonry, { passive: true });
    const workCount = $('#work-count'), workEmpty = $('#work-empty');
    let activeFilter = 'all';
    let animations = [], ghosts = [];
    const stopAnimations = () => {
      animations.forEach(animation => animation.cancel());
      ghosts.forEach(ghost => ghost.remove());
      animations = []; ghosts = [];
    };
    const inViewport = rect => rect.bottom > 0 && rect.top < innerHeight;
    const applyFilter = (nextFilter, animate = true) => {
      if (animate && nextFilter === activeFilter) return;
      stopAnimations();
      const moving = animate && !matchMedia('(prefers-reduced-motion: reduce)').matches && section.classList.contains('is-grid') && typeof Element.prototype.animate === 'function';
      const before = moving ? new Map(rows.filter(({ el }) => !el.hidden).map(({ el }) => [el, el.getBoundingClientRect()])) : new Map();
      activeFilter = nextFilter;
      let visible = 0;
      filterButtons.forEach(b => b.setAttribute('aria-selected', b.dataset.filter === activeFilter));
      rows.forEach(({ el, disciplines }) => {
        const show = activeFilter === 'all' || disciplines.has(activeFilter);
        const oldRect = before.get(el);
        if (moving && !show && oldRect && inViewport(oldRect)) {
          const ghost = el.querySelector('.row-link').cloneNode(true);
          ghost.setAttribute('aria-hidden', 'true');
          ghost.tabIndex = -1;
          ghost.style.cssText = `position:fixed;left:${oldRect.left}px;top:${oldRect.top}px;width:${oldRect.width}px;height:${oldRect.height}px;z-index:20;pointer-events:none;margin:0;`;
          section.append(ghost);
          ghosts.push(ghost);
          const exit = ghost.animate([{ opacity: 1, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(.97)' }], { duration: 180, easing: 'ease-out', fill: 'forwards' });
          animations.push(exit);
          exit.finished.then(() => ghost.remove()).catch(() => {});
        }
        el.hidden = !show;
        if (!el.hidden) visible++;
      });
      workCount.textContent = visible + ' / ' + TOTAL + t(' projects · 최신 연도순', ' projects · newest first');
      workEmpty.hidden = visible !== 0;
      layoutMasonry();
      if (moving) rows.filter(({ el }) => !el.hidden).forEach(({ el }) => {
        const after = el.getBoundingClientRect();
        const old = before.get(el);
        const dx = old ? old.left - after.left : 0;
        const dy = old ? old.top - after.top : 18;
        if (!old || Math.abs(dx) > 1 || Math.abs(dy) > 1) {
          animations.push(el.animate([
            { transform: `translate3d(${dx}px, ${dy}px, 0)`, opacity: old ? 1 : 0 },
            { transform: 'translate3d(0, 0, 0)', opacity: 1 },
          ], { duration: 440, easing: 'cubic-bezier(.22, 1, .36, 1)' }));
        }
      });
    };
    filters.addEventListener('click', e => { const b = e.target.closest('.filter'); if (b) applyFilter(b.dataset.filter); });
    $('#caps').addEventListener('click', e => {
      const link = e.target.closest('[data-cap-filter]');
      if (!link) return;
      applyFilter(link.dataset.capFilter);
    });
    applyFilter('all', false);

    const setView = v => {
      section.classList.toggle('is-grid', v === 'grid');
      if (v === 'grid') scheduleMasonry();
      $$('[data-view]', section).forEach(b => { const on = b.dataset.view === v; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', on); });
      try { localStorage.setItem('indexView', v); } catch (e) { /* storage unavailable */ }
    };
    $$('[data-view]', section).forEach(b => b.addEventListener('click', () => setView(b.dataset.view)));
    setView('grid');
  }

  return renderIndex;
}
