/* ════════════════════════════════════════════════════════════
   Yebum Ko — Portfolio 2026 · app.js
   Hash router (#/, #/<section>, #/work/<id>) + renderers.
   All content lives in js/data.js.
   ════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const D = window.PORTFOLIO;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad2 = n => String(n).padStart(2, '0');
  const src = (name, sm) => `assets/img/${name}${sm ? '-sm' : ''}.webp`;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // run after layout; rAF alone never fires in background tabs, so race it with a timeout
  const afterLayout = fn => { let done = false; const run = () => { if (!done) { done = true; fn(); } }; requestAnimationFrame(run); setTimeout(run, 60); };

  const byId = Object.fromEntries(D.projects.map((p, i) => [p.id, { ...p, n: i + 1 }]));
  const disc = Object.fromEntries(D.disciplines.map(d => [d.key, d]));
  const TOTAL = D.projects.length;

  const home = $('#home');
  const detail = $('#detail');

  /* ── reveal on scroll ─────────────────────────────── */
  const revealIO = new IntersectionObserver(entries => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 });
  const observeReveals = root => $$('[data-reveal]:not(.in)', root).forEach(el => revealIO.observe(el));

  const toast = (() => {
    const el = $('#toast'); let t;
    return msg => { el.textContent = msg; el.classList.add('is-on'); clearTimeout(t); t = setTimeout(() => el.classList.remove('is-on'), 1800); };
  })();

  /* ════════════════════════ HOME ════════════════════════ */

  function renderIndex() {
    const list = $('#index-list'), filters = $('#filters'), section = $('#index');
    const counts = D.projects.reduce((m, p) => (m[p.discipline] = (m[p.discipline] || 0) + 1, m), {});
    const tabs = [{ key: 'all', label: 'All', n: TOTAL }, ...D.disciplines.map(d => ({ key: d.key, label: d.label, n: counts[d.key] || 0 }))];
    filters.innerHTML = tabs.map((t, i) =>
      `<button type="button" class="filter" role="tab" data-filter="${t.key}" aria-selected="${i === 0}">${esc(t.label)}<sup>${pad2(t.n)}</sup></button>`).join('');

    const ordered = [...D.projects].sort((a, b) => Number(b.year) - Number(a.year));
    list.innerHTML = ordered.map((p, i) => `
      <li data-disc="${p.discipline}" data-search="${esc([p.fullTitle, p.context, p.year, disc[p.discipline].label, disc[p.discipline].ko].join(' ').toLowerCase())}">
        <a class="row-link" href="#/work/${p.id}" data-thumb="${src(p.cover, true)}">
          <span class="row-thumb card"><img src="${src(p.cover)}" alt="" loading="lazy" decoding="async"></span>
          <span class="row-no mono">${pad2(i + 1)}</span>
          <span class="row-title"><span class="t">${esc(p.fullTitle)}</span>${p.awards.length ? `<span class="row-award" title="${esc(p.awards.join(' · '))}" aria-label="Award"></span>` : ''}</span>
          <span class="row-disc">${esc(disc[p.discipline].label)}</span>
          <span class="row-ctx">${esc(p.context)}</span>
          <span class="row-year mono">${esc(p.year)}</span>
          <span class="row-go chip">View</span>
        </a>
      </li>`).join('');

    let activeFilter = 'all';
    const search = $('#work-search');
    const applyFilter = () => {
      const query = search.value.trim().toLowerCase();
      let visible = 0;
      $$('.filter', filters).forEach(b => b.setAttribute('aria-selected', b.dataset.filter === activeFilter));
      $$('li', list).forEach(li => {
        li.hidden = (activeFilter !== 'all' && li.dataset.disc !== activeFilter) || !li.dataset.search.includes(query);
        if (!li.hidden) visible++;
      });
      $('#work-count').textContent = visible + ' / ' + TOTAL + ' projects · 최신 연도순';
      $('#work-empty').hidden = visible !== 0;
    };
    filters.addEventListener('click', e => { const b = e.target.closest('.filter'); if (b) { activeFilter = b.dataset.filter; applyFilter(); } });
    search.addEventListener('input', applyFilter);
    applyFilter();

    const setView = v => {
      section.classList.toggle('is-grid', v === 'grid');
      $$('[data-view]', section).forEach(b => { const on = b.dataset.view === v; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', on); });
      try { localStorage.setItem('indexView', v); } catch (e) { /* storage unavailable */ }
    };
    $$('[data-view]', section).forEach(b => b.addEventListener('click', () => setView(b.dataset.view)));
    setView('grid');
  }

  function renderAbout() {
    $('#caps').innerHTML = D.capabilities.map(c => `
      <article class="cap" data-reveal>
        <div class="card mono-img"${c.pos ? ` style="--pos:${c.pos}"` : ''}><img src="${src(c.cover, true)}" alt="" loading="lazy" decoding="async">
          <div class="card-top"><span class="mono">${c.n}</span></div>
        </div>
        <div class="cap-text">
          <h3>${esc(c.title)}</h3>
          <p>${esc(c.body)}</p>
          <span class="mono">${esc(c.tools)}</span>
        </div>
      </article>`).join('');
    $$('.cap').forEach(el => el.classList.add('mono-hover'));
  }

  function renderRecognition() {
    $('#awards').innerHTML = D.awards.map(a => {
      const inner = `
        <span class="mono dim">${esc(a.year)}</span>
        <span class="award-title">${esc(a.title)}</span>
        <span class="award-project">${esc(a.project)}</span>
        <span class="award-prize chip chip--award">${esc(a.prize)}</span>
        ${a.id ? '<span class="chip chip--light">View</span>' : '<span class="award-empty"></span>'}`;
      return a.id
        ? `<a class="award-row" role="row" href="#/work/${a.id}">${inner}</a>`
        : `<div class="award-row" role="row">${inner}</div>`;
    }).join('');

    const SHOW = 8, exp = $('#experience'), more = $('#exp-more');
    exp.innerHTML = D.experience.map(([y, name, sub], i) =>
      `<li${i >= SHOW ? ' hidden' : ''}><span class="mono dim">${esc(y)}</span><span class="cv-name">${esc(name)}</span>${sub ? `<span class="cv-sub">${esc(sub)}</span>` : ''}</li>`).join('');
    $('#exp-count').textContent = pad2(D.experience.length);
    more.textContent = `Show all ${D.experience.length}`;
    more.addEventListener('click', () => {
      const open = more.getAttribute('aria-expanded') !== 'true';
      $$('li', exp).forEach((li, i) => { if (i >= SHOW) li.hidden = !open; });
      more.setAttribute('aria-expanded', open);
      more.textContent = open ? 'Show less' : `Show all ${D.experience.length}`;
    });
    $('#education').innerHTML = D.education.map(([y, name, sub]) =>
      `<li><span class="mono dim">${esc(y)}</span><span class="cv-name">${esc(name)}</span>${sub ? `<span class="cv-sub">${esc(sub)}</span>` : ''}</li>`).join('');

    $('#stat-projects').textContent = TOTAL;
    $('#stat-awards').textContent = D.awards.length;
  }

  /* ════════════════════════ DETAIL ════════════════════════ */

  const driveView = id => `https://drive.google.com/file/d/${id}/view`;
  const ytWatch = id => `https://youtu.be/${id}`;
  const driveDownload = id => `https://drive.google.com/uc?export=download&id=${id}`;
  const deckView = d => d.src || driveView(d.id);
  const deckDownload = d => d.src || driveDownload(d.id);
  const deckEmbed = d => d.src || `https://drive.google.com/file/d/${d.id}/preview`;
  const deckHost = d => d.src ? 'Portfolio PDF' : 'Google Drive';
  const CASE = [['problem', 'Problem'], ['solution', 'Solution'], ['result', 'Result']];

  // Problem / Solution / Result — with the PDF deck attached beside the text
  function caseStudyHTML(p) {
    const cs = p.caseStudy, decks = p.media.decks;
    if (!cs) return '';
    const deckName = (d, i) => d.label || (decks.length > 1 ? `PDF 자료 ${pad2(i + 1)}` : '발표 자료');
    const strip = CASE.map(([key, name], i) => `
      <a class="card cs-card" href="#cs-${key}" data-jump="cs-${key}" data-reveal>
        <div class="ticks ticks--top" aria-hidden="true"></div>
        <div class="cs-card-top"><span class="mono">${pad2(i + 1)} ${name}</span><span class="mono dim arrow" aria-hidden="true">↓</span></div>
        <p>${esc(cs[key].summary)}</p>
      </a>`).join('');
    const rows = CASE.map(([key, name], i) => {
      const s = cs[key];
      const points = s.points && s.points.length ? `<ol class="cs-points">${s.points.map(pt => `<li><b>${esc(pt.label)}</b><span>${esc(pt.body)}</span></li>`).join('')}</ol>` : '';
      return `
        <div class="cs-row" id="cs-${key}" data-reveal>
          <div class="cs-head"><span class="mono dim">${pad2(i + 1)}</span><h3>${name}</h3><p class="cs-sum">${esc(s.summary)}</p></div>
          <div class="cs-text">${s.body.map(t => `<p>${esc(t)}</p>`).join('')}${points}</div>
        </div>`;
    }).join('');
    const pdf = decks.length ? `
      <aside class="cs-pdf" id="cs-pdf" aria-label="Attached PDF">
        <div class="sec-label"><span class="mono">Attached PDF</span><span class="mono dim">${pad2(decks.length)}</span></div>
        ${decks.length > 1 ? `<div class="pdf-tabs" role="tablist">${decks.map((d, i) => `<button type="button" class="mono" role="tab" aria-selected="${i === 0}" data-pdf-tab="${i}">PDF ${pad2(i + 1)}</button>`).join('')}</div>` : ''}
        <div class="card pdf-view" id="pdf-view">${pdfPoster(p, decks[0], deckName(decks[0], 0))}</div>
        <ul class="pdf-files">${decks.map((d, i) => `
          <li class="pdf-file">
            <span class="pdf-ico" aria-hidden="true">PDF</span>
            <span class="pdf-name"><b>${esc(deckName(d, i))}</b><span>${esc(p.fullTitle)} · ${deckHost(d)}</span></span>
            <span class="chips">
              <a class="chip chip--light" href="${esc(deckView(d))}" target="_blank" rel="noopener noreferrer" aria-label="${esc(deckName(d, i))} 새 창에서 보기">Open ↗</a>
              <a class="chip" href="${esc(deckDownload(d))}" ${d.src ? 'download' : 'target="_blank" rel="noopener noreferrer"'} aria-label="${esc(deckName(d, i))} 다운로드">Download ↓</a>
            </span>
          </li>`).join('')}
        </ul>
      </aside>` : '';
    return `
      <section class="cs" aria-label="Case study">
        <div class="sec-label"><span class="mono">Overview</span><span class="mono dim">Problem · Solution · Result</span></div>
        <div class="cs-strip">${strip}</div>
        <div class="cs-body${decks.length ? '' : ' cs-body--solo'}">
          <div class="cs-rows">${rows}</div>
          ${pdf}
        </div>
      </section>`;
  }

  // Results in numbers — only for projects whose decks carry verified figures
  function metricsHTML(p) {
    const M = p.metrics;
    if (!M) return "";
    const fmt = v => String(v).replace(/\.0$/, "");
    const group = (g, gi) => {
      let body = "";
      if (g.kind === "bars") {
        body = "<ul class=\"m-bars\">" + g.items.map(it =>
          "<li><div class=\"m-bar-label\"><b>" + esc(it.label) + "</b>" + (it.sub ? "<span>" + esc(it.sub) + "</span>" : "") + "</div>" +
          "<div class=\"m-track\" role=\"img\" aria-label=\"" + esc(it.label) + " " + fmt(it.value) + "%\"><i style=\"--w:" + it.value + "%\"></i></div>" +
          "<span class=\"m-val tabular\">" + fmt(it.value) + "<small>%</small></span></li>").join("") + "</ul>";
      } else if (g.kind === "stack") {
        body = "<div class=\"m-stack\" role=\"img\" aria-label=\"" + esc(g.items.map(it => it.label + " " + it.value + "%").join(", ")) + "\">" +
          g.items.map((it, i) => "<i class=\"s" + i + "\" style=\"--w:" + it.value + "%\"></i>").join("") + "</div>" +
          "<ul class=\"m-legend\">" + g.items.map((it, i) =>
            "<li><span class=\"m-dot s" + i + "\" aria-hidden=\"true\"></span><b>" + esc(it.label) + "</b><span class=\"m-val tabular\">" + fmt(it.value) + "<small>%</small></span>" +
            "<span class=\"mono dim\">" + (it.n != null ? it.n + "명" : "") + "</span>" + (it.sub ? "<p>" + esc(it.sub) + "</p>" : "") + "</li>").join("") + "</ul>";
      } else {
        body = "<ul class=\"m-stats m-stats--" + Math.min(g.items.length, 3) + "\">" + g.items.map(it =>
          "<li><span class=\"m-num tabular\">" + esc(it.value) + (it.unit ? "<small>" + esc(it.unit) + "</small>" : "") + "</span><span class=\"m-cap\">" + esc(it.label) + "</span></li>").join("") + "</ul>";
      }
      return "<div class=\"m-group\" data-reveal><div class=\"m-head\"><span class=\"mono dim\">" + pad2(gi + 1) + "</span><h3>" + esc(g.label) + "</h3>" +
        (g.sample ? "<p>" + esc(g.sample) + "</p>" : "") + "</div><div class=\"m-body\">" + body + "</div></div>";
    };
    return "<section class=\"metrics\" id=\"metrics\" aria-label=\"Results in numbers\">" +
      "<div class=\"sec-label\"><span class=\"mono\">Results in numbers</span><span class=\"ctx dim\">" + esc(M.title) + " · 출처: " + esc(M.source) + "</span></div>" +
      M.groups.map(group).join("") + "</section>";
  }

  function pdfPoster(p, d, name) {
    return `
      <button class="poster" type="button" data-embed="${d.src ? 'pdf' : 'drive'}" data-id="${esc(d.src || d.id)}" aria-label="${esc(name)} 미리보기">
        <div class="ticks ticks--top" aria-hidden="true"></div>
        <div class="card-top"><span class="mono">PDF</span><span class="mono dim">${deckHost(d)}</span></div>
        <span class="poster-title" aria-hidden="true">${esc(name)}</span>
        <span class="poster-center"><span class="play" aria-hidden="true"></span><span class="mono">Preview PDF</span></span>
      </button>`;
  }

  function embedHTML(kind, item, p, i, count, poster) {
    const isDeck = kind === 'deck';
    const num = count > 1 ? ` ${pad2(i + 1)}` : '';
    const label = item.label || (isDeck ? 'Presentation deck' : 'Film') + num;
    const out = isDeck ? deckView(item) : item.kind === 'youtube' ? ytWatch(item.id) : driveView(item.id);
    const host = isDeck ? deckHost(item) : item.kind === 'youtube' ? 'YouTube' : 'Google Drive';
    return `
      <figure class="embed${isDeck ? ' embed--deck' : ''}" data-reveal>
        <div class="card">
          <button class="poster" type="button" data-embed="${isDeck ? (item.src ? 'pdf' : 'drive') : item.kind}" data-id="${esc(item.src || item.id)}" aria-label="${isDeck ? 'Open' : 'Play'} ${esc(label)}">
            ${poster ? `<img src="${src(poster)}" alt="" loading="lazy" decoding="async">` : `<span class="poster-title" aria-hidden="true">${esc(count > 1 ? (item.label || (isDeck ? 'Deck' : 'Film') + num) : p.fullTitle)}</span>`}
            <div class="ticks ticks--top${isDeck ? '' : ' ticks--light'}" aria-hidden="true"></div>
            <div class="card-top"><span class="mono">${isDeck ? 'Deck' : 'Film'}${num}</span><span class="mono dim">${host}</span></div>
            <span class="poster-center"><span class="play" aria-hidden="true"></span><span class="mono">${isDeck ? 'Open deck' : 'Play film'}</span></span>
          </button>
        </div>
        <figcaption class="embed-cap"><span class="mono">${esc(label)}</span><a class="mono" href="${esc(out)}" target="_blank" rel="noopener noreferrer">Open ${isDeck && item.src ? 'PDF' : `in ${host}`} ↗</a></figcaption>
      </figure>`;
  }

  function renderDetail(id) {
    const p = byId[id];
    if (!p) { location.hash = '#/index'; return; }
    const prevP = byId[D.projects[(p.n - 2 + TOTAL) % TOTAL].id], nextP = byId[D.projects[p.n % TOTAL].id];
    const m = p.media;
    const gallery = m.images.filter(im => im.src !== p.cover);

    const facts = [
      ['Year', esc(p.year)],
      ['Discipline', esc(disc[p.discipline].ko)],
      ...p.details.map(d => [esc(d.k), esc(d.v)]),
      ...(p.media.decks.length ? [['Attachment', `<a class="fact-link" href="#cs-pdf" data-jump="cs-pdf">PDF ${pad2(p.media.decks.length)} — 발표 자료 보기</a>`]] : []),
      ...(p.awards.length ? [['Awards', `<div class="chips">${p.awards.map(a => `<span class="chip chip--award">${esc(a)}</span>`).join('')}</div>`]] : []),
    ];

    const films = m.films.length ? `
      <section class="pd-block" aria-label="Film">
        <div class="sec-label"><span class="mono">Film</span><span class="mono dim">${pad2(m.films.length)}</span></div>
        <div class="embeds${m.films.length > 1 ? ' embeds--2' : ''}">${m.films.map((f, i) => embedHTML('film', f, p, i, m.films.length, null)).join('')}</div>
      </section>` : '';

    const decks = m.decks.length ? `
      <section class="pd-block" aria-label="Deck">
        <div class="sec-label"><span class="mono">Deck</span><span class="mono dim">${pad2(m.decks.length)}</span></div>
        <div class="embeds${m.decks.length > 1 ? ' embeds--2' : ''}">${m.decks.map((d, i) => embedHTML('deck', d, p, i, m.decks.length, null)).join('')}</div>
      </section>` : '';

    const imgs = gallery.length ? `
      <section class="pd-block" aria-label="Images">
        <div class="sec-label"><span class="mono">Images</span><span class="mono dim">${pad2(gallery.length)}</span></div>
        <div class="pd-gallery">${gallery.map(im => `
          <figure data-reveal><div class="card"><img src="${src(im.src)}" alt="${esc(im.label || p.fullTitle)}" loading="lazy" decoding="async"></div>
          ${im.label ? `<figcaption class="mono dim">${esc(im.label)}</figcaption>` : ''}</figure>`).join('')}
        </div>
      </section>` : '';

    const links = m.links.length ? `
      <section class="pd-block" aria-label="Links">
        <div class="sec-label"><span class="mono">Links</span><span class="mono dim">${pad2(m.links.length)}</span></div>
        <div class="links">${m.links.map(l => `
          <a href="${esc(l.href)}" target="_blank" rel="noopener noreferrer"><span>${esc(l.label)}</span><span class="mono">${esc(new URL(l.href).hostname.replace('www.', ''))} ↗</span></a>`).join('')}
        </div>
      </section>` : '';

    const nav = (q, dir) => `
      <a class="next-card mono-hover" href="#/work/${q.id}" data-reveal>
        <div class="card mono-img"><img src="${src(q.cover, true)}" alt="" loading="lazy" decoding="async">
          <div class="hero-scrim" aria-hidden="true"></div>
          <div class="ticks ticks--light" aria-hidden="true"></div>
          <div class="card-top"><span class="mono">${dir}</span><span class="mono">${pad2(q.n)} / ${TOTAL}</span></div>
          <div class="hero-copy"><span class="ctx">${esc(q.context)}</span><h2 class="h2">${esc(q.fullTitle)}</h2></div>
        </div>
      </a>`;

    detail.innerHTML = `
      <article class="pd" aria-labelledby="pd-title">
        <div class="pd-bar">
          <a class="back mono" href="#/index" data-back><span aria-hidden="true">←</span> Index</a>
          <div class="pd-step mono">
            <a href="#/work/${prevP.id}" aria-label="Previous project">Prev</a>
            <span class="tabular">${pad2(p.n)} / ${TOTAL}</span>
            <a href="#/work/${nextP.id}" aria-label="Next project">Next</a>
          </div>
        </div>

        <section class="pd-hero site-pad">
          <div class="card">
            <img src="${src(p.cover)}" alt="${esc(p.fullTitle)}" fetchpriority="high" decoding="async">
            <div class="hero-scrim" aria-hidden="true"></div>
            <div class="ticks ticks--light" aria-hidden="true"></div>
            <div class="card-top"><span class="mono">${esc(disc[p.discipline].label)}</span><span class="mono">${esc(p.year)}</span></div>
            <div class="hero-copy">
              <h1 class="display" id="pd-title">${esc(p.fullTitle)}</h1>
              <p class="pd-ctx">${esc(p.context)}</p>
              ${p.awards.length ? `<div class="chips">${p.awards.map(a => `<span class="chip chip--award">${esc(a)}</span>`).join('')}</div>` : ''}
            </div>
          </div>
        </section>

        <section class="pd-intro">
          <div>
            <p class="pd-lead" data-reveal>${esc(p.lead)}</p>
            ${p.lead2 && !p.caseStudy ? `<p class="pd-lead2" data-reveal>${esc(p.lead2)}</p>` : ''}
          </div>
          <dl class="pd-facts" data-reveal>
            ${facts.map(([k, v]) => `<div><dt class="fact-k">${k}</dt><dd>${v}</dd></div>`).join('')}
          </dl>
        </section>

        ${metricsHTML(p)}
        ${films}

        ${p.caseStudy ? caseStudyHTML(p) : `<section class="pd-sections" aria-label="Story">
          ${p.sections.map((s, i) => `
            <div class="pd-sec" data-reveal>
              <h3><span class="mono dim">${pad2(i + 1)}</span>${esc(s.label)}</h3>
              <p>${esc(s.body)}</p>
            </div>`).join('')}
        </section>${decks}`}
        ${imgs}
        ${links}

        <nav class="pd-next" aria-label="More projects">
          ${nav(prevP, 'Previous')}
          ${nav(nextP, 'Next project')}
        </nav>
      </article>`;
    document.title = `${p.fullTitle} — Yebum Ko`;
    observeReveals(detail);
  }

  // click-to-load embeds (keeps first paint light)
  detail.addEventListener('click', e => {
    const jump = e.target.closest('[data-jump]');
    if (jump) {
      e.preventDefault();
      const el = document.getElementById(jump.dataset.jump);
      if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      return;
    }
    const tab = e.target.closest('[data-pdf-tab]');
    if (tab) {
      const p = byId[location.hash.split('/').pop()], i = +tab.dataset.pdfTab, d = p.media.decks[i];
      $$('[data-pdf-tab]', detail).forEach(b => b.setAttribute('aria-selected', b === tab));
      const view = $('#pdf-view'), frame = $('iframe', view);
      if (frame) frame.src = deckEmbed(d);
      else view.innerHTML = pdfPoster(p, d, d.label || `PDF 자료 ${pad2(i + 1)}`);
      return;
    }
    const btn = e.target.closest('[data-embed]');
    if (!btn) return;
    const { embed, id } = btn.dataset;
    const url = embed === 'youtube'
      ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`
      : embed === 'pdf' ? id : `https://drive.google.com/file/d/${id}/preview`;
    const f = document.createElement('iframe');
    f.src = url;
    f.title = btn.getAttribute('aria-label') || 'Embedded media';
    f.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
    f.allowFullscreen = true;
    btn.replaceWith(f);
  });

  /* ════════════════════════ ROUTER ════════════════════════ */
  const SECTIONS = ['top', 'index', 'about', 'recognition', 'guestbook', 'contact'];
  let current = null;          // 'home' | 'detail'
  let homeScroll = 0;          // scroll offset to restore when coming back
  let cameFromHome = false;
  let sectionClick = false;    // true when a nav/section link (not history) triggered the route

  function scrollToSection(name, smooth) {
    const el = document.getElementById(name);
    if (!el) return;
    const y = name === 'top' ? 0 : el.getBoundingClientRect().top + scrollY - (parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0);
    scrollTo({ top: y, behavior: smooth && !reduced ? 'smooth' : 'auto' });
  }

  function route() {
    const h = location.hash.replace(/^#\/?/, '');
    const parts = h.split('/').filter(Boolean);
    $('#nav').classList.remove('is-open');
    $('#nav-menu').setAttribute('aria-expanded', 'false');

    if (parts[0] === 'work' && parts[1]) {
      if (current === 'home') { homeScroll = scrollY; cameFromHome = true; }
      else if (current !== 'detail') cameFromHome = false;
      renderDetail(decodeURIComponent(parts[1]));
      home.hidden = true; detail.hidden = false;
      detail.classList.remove('view'); void detail.offsetWidth; detail.classList.add('view');
      scrollTo({ top: 0, behavior: 'auto' });
      current = 'detail';
      setActiveNav('index');
      return;
    }

    const section = parts[0] === 'selected' ? 'index' : SECTIONS.includes(parts[0]) ? parts[0] : 'top';
    const wasDetail = current === 'detail';
    document.title = 'Yebum Ko — Art × Technology';
    if (wasDetail) {
      detail.hidden = true; detail.innerHTML = '';
      home.hidden = false;
      home.classList.remove('view'); void home.offsetWidth; home.classList.add('view');
    }
    current = 'home';
    const explicit = sectionClick;
    sectionClick = false;
    if (wasDetail && cameFromHome && !explicit) {
      // browser back / "← Index": land on the row you left from
      afterLayout(() => scrollTo({ top: homeScroll, behavior: 'auto' }));
    } else if (parts.length || wasDetail) {
      afterLayout(() => scrollToSection(section, !wasDetail));
    }
  }

  // "← Index" returns to the exact row you left from when possible
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#/"]');
    if (!a) return;
    const target = a.getAttribute('href');
    if (a.hasAttribute('data-back') && cameFromHome) {
      e.preventDefault();
      history.replaceState(null, '', '#/index');
      route();
      return;
    }
    // Contact lives in the shared footer — never leave the current view for it
    if (target === '#/contact') { e.preventDefault(); scrollToSection('contact', true); closeMenu(); return; }
    if (!target.startsWith('#/work/')) sectionClick = true;
    // same-hash clicks don't fire hashchange: scroll manually
    if (target === location.hash || (target === '#/' && !location.hash)) { e.preventDefault(); route(); if (target === '#/') scrollToSection('top', true); }
  });
  addEventListener('hashchange', route);

  /* ── nav ──────────────────────────────────────────── */
  const navEl = $('#nav'), menuBtn = $('#nav-menu');
  const closeMenu = () => { navEl.classList.remove('is-open'); menuBtn.setAttribute('aria-expanded', 'false'); };
  menuBtn.addEventListener('click', () => {
    const open = !navEl.classList.contains('is-open');
    navEl.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', open);
  });
  addEventListener('scroll', () => navEl.classList.toggle('is-scrolled', scrollY > 8), { passive: true });

  function setActiveNav(key) { $$('[data-nav]').forEach(a => a.classList.toggle('is-active', a.dataset.nav === key)); }
  const navIO = new IntersectionObserver(entries => {
    if (current !== 'home') return;
    for (const e of entries) if (e.isIntersecting) {
      const id = e.target.id;
      setActiveNav(id === 'selected' ? 'index' : id);
    }
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['index', 'about', 'recognition', 'guestbook', 'contact'].forEach(id => navIO.observe(document.getElementById(id)));
  new IntersectionObserver(([e]) => { if (e.isIntersecting && current === 'home') setActiveNav(''); }, { rootMargin: '-45% 0px -50% 0px' }).observe($('#top'));

  /* ── modal (reel) ─────────────────────────────────── */
  const modal = $('#modal'), frame = $('#modal-frame');
  function openVideo(title, ytId) {
    $('#modal-title').textContent = title;
    frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1" title="${esc(title)}" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
    modal.showModal();
  }
  modal.addEventListener('close', () => { frame.innerHTML = ''; });
  modal.addEventListener('click', e => { if (e.target === modal || e.target.closest('[data-close]')) modal.close(); });
  $$('[data-reel]').forEach(b => b.addEventListener('click', () => {
    const p = byId.TimeOfExtinction, f = p.media.films.find(x => x.kind === 'youtube');
    openVideo(`Reel — ${p.fullTitle}`, f.id);
  }));

  /* ── keyboard: ← → between projects, Esc back to index ── */
  addEventListener('keydown', e => {
    const t = e.target;
    if (current !== 'detail' || modal.open || (t instanceof Element && t.closest('input, textarea, iframe')) || e.metaKey || e.ctrlKey || e.altKey) return;
    const a = $('.pd-step a' + (e.key === 'ArrowLeft' ? ':first-child' : e.key === 'ArrowRight' ? ':last-child' : '.none'));
    if (a) { location.hash = a.getAttribute('href'); return; }
    if (e.key === 'Escape') $('[data-back]').click();
  });

  /* ── contact ──────────────────────────────────────── */
  $('#copy-email').addEventListener('click', async () => {
    const mail = 'koyebum1@naver.com';
    try { await navigator.clipboard.writeText(mail); toast('Email copied'); }
    catch (e) { toast(mail); }
  });
  const clock = $('#clock');
  const tick = () => {
    const t = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Seoul', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date());
    clock.textContent = `Seoul ${t} KST`;
  };
  tick(); setInterval(tick, 15000);

  /* ── boot ─────────────────────────────────────────── */


  renderIndex();
  renderAbout();
  renderRecognition();
  observeReveals(document);
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  route();
})();
