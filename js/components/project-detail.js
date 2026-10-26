// createProjectDetail owns its markup and DOM interactions.
export function createProjectDetail({ D, t, $, $$, esc, pad2, src, imageDimensions, responsive, externalUrl, reduced, byId, projectDiscs, TOTAL, clearDetail, observeReveals, toast }) {
  const detail = $('#detail');
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
    const deckName = (d, i) => d.label || (decks.length > 1 ? `PDF ${pad2(i + 1)}` : t('발표 자료', 'Presentation'));
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
              <a class="chip chip--light" href="${esc(deckView(d))}" target="_blank" rel="noopener noreferrer" aria-label="${esc(deckName(d, i))} ${t('새 창에서 보기', 'open in a new tab')}">Open ↗</a>
              <a class="chip" href="${esc(deckDownload(d))}" ${d.src ? 'download' : 'target="_blank" rel="noopener noreferrer"'} aria-label="${esc(deckName(d, i))} ${t('다운로드', 'download')}">Download ↓</a>
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
            "<span class=\"mono dim\">" + (it.n != null ? it.n + t("명", " people") : "") + "</span>" + (it.sub ? "<p>" + esc(it.sub) + "</p>" : "") + "</li>").join("") + "</ul>";
      } else {
        body = "<ul class=\"m-stats m-stats--" + Math.min(g.items.length, 3) + "\">" + g.items.map(it =>
          "<li><span class=\"m-num tabular\">" + esc(it.value) + (it.unit ? "<small>" + esc(it.unit) + "</small>" : "") + "</span><span class=\"m-cap\">" + esc(it.label) + "</span></li>").join("") + "</ul>";
      }
      return "<div class=\"m-group\" data-reveal><div class=\"m-head\"><span class=\"mono dim\">" + pad2(gi + 1) + "</span><h3>" + esc(g.label) + "</h3>" +
        (g.sample ? "<p>" + esc(g.sample) + "</p>" : "") + "</div><div class=\"m-body\">" + body + "</div></div>";
    };
    return "<section class=\"metrics\" id=\"metrics\" aria-label=\"Results in numbers\">" +
      "<div class=\"sec-label\"><span class=\"mono\">Results in numbers</span><span class=\"ctx dim\">" + esc(M.title) + t(" · 출처: ", " · Source: ") + esc(M.source) + "</span></div>" +
      M.groups.map(group).join("") + "</section>";
  }

  function pdfPoster(p, d, name) {
    return `
      <button class="poster" type="button" data-embed="${d.src ? 'pdf' : 'drive'}" data-id="${esc(d.src || d.id)}" aria-label="${esc(name)} ${t('미리보기', 'preview')}">
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
    const out = isDeck ? deckView(item) : item.kind === 'local' ? item.src : item.kind === 'youtube' ? ytWatch(item.id) : driveView(item.id);
    const host = isDeck ? deckHost(item) : item.kind === 'local' ? 'Video' : item.kind === 'youtube' ? 'YouTube' : 'Google Drive';
    return `
      <figure class="embed${isDeck ? ' embed--deck' : item.kind === 'local' ? ' embed--local' : ''}" data-reveal>
        <div class="card">
          <button class="poster" type="button" data-embed="${isDeck ? (item.src ? 'pdf' : 'drive') : item.kind}" data-id="${esc(item.src || item.id)}" aria-label="${isDeck ? 'Open' : 'Play'} ${esc(label)}">
            ${poster ? `<img src="${src(poster)}" alt="" loading="lazy" decoding="async">` : `<span class="poster-title" aria-hidden="true">${esc(count > 1 ? (item.label || (isDeck ? 'Deck' : 'Film') + num) : p.fullTitle)}</span>`}
            <div class="ticks ticks--top${isDeck ? '' : ' ticks--light'}" aria-hidden="true"></div>
            <div class="card-top"><span class="mono">${isDeck ? 'Deck' : 'Film'}${num}</span><span class="mono dim">${host}</span></div>
            <span class="poster-center"><span class="play" aria-hidden="true"></span><span class="mono">${isDeck ? 'Open deck' : 'Play film'}</span></span>
          </button>
        </div>
        <figcaption class="embed-cap"><span class="mono">${esc(label)}</span><a class="mono" href="${esc(out)}" target="_blank" rel="noopener noreferrer">${item.kind === 'local' ? 'Open video' : `Open ${isDeck && item.src ? 'PDF' : `in ${host}`}`} ↗</a></figcaption>
      </figure>`;
  }

  const galleryViewer = $('#gallery-viewer');
  const galleryViewerImage = $('#gallery-viewer-image');
  let galleryItems = [], galleryIndex = 0, galleryProject = '';
  const showGalleryImage = () => {
    const item = galleryItems[galleryIndex];
    if (!item) return;
    const full = src(item.src);
    const preview = detail.querySelector(`[data-gallery-index="${galleryIndex}"] img`);
    galleryViewerImage.src = preview?.naturalWidth ? preview.currentSrc : full;
    galleryViewerImage.alt = item.label || galleryProject;
    $('#gallery-viewer-caption').textContent = item.label || galleryProject;
    $('#gallery-viewer-count').textContent = `${pad2(galleryIndex + 1)} / ${pad2(galleryItems.length)}`;
    $('[data-gallery-prev]').disabled = galleryIndex === 0;
    $('[data-gallery-next]').disabled = galleryIndex === galleryItems.length - 1;
    if (galleryViewerImage.src !== new URL(full, location.href).href) {
      const index = galleryIndex, project = galleryProject, highRes = new Image();
      highRes.src = full;
      highRes.decode().then(() => {
        if (galleryIndex === index && galleryProject === project) galleryViewerImage.src = full;
      }).catch(() => {});
    }
  };
  const stepGallery = direction => {
    const next = galleryIndex + direction;
    if (next < 0 || next >= galleryItems.length) return;
    galleryIndex = next;
    showGalleryImage();
  };
  galleryViewer.addEventListener('click', e => {
    if (e.target === galleryViewer || e.target.closest('[data-gallery-close]')) galleryViewer.close();
    else if (e.target.closest('[data-gallery-prev]')) stepGallery(-1);
    else if (e.target.closest('[data-gallery-next]')) stepGallery(1);
  });
  galleryViewer.addEventListener('close', () => { galleryViewerImage.removeAttribute('src'); });
  let touchStart = null;
  $('.gallery-viewer-stage').addEventListener('touchstart', e => {
    if (e.touches.length === 1) touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, { passive: true });
  $('.gallery-viewer-stage').addEventListener('touchend', e => {
    if (!touchStart || !e.changedTouches.length) return;
    const dx = e.changedTouches[0].clientX - touchStart.x;
    const dy = e.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) stepGallery(dx < 0 ? 1 : -1);
    touchStart = null;
  }, { passive: true });
  galleryViewer.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      stepGallery(e.key === 'ArrowRight' ? 1 : -1);
    }
  });

  function renderDetail(id) {
    const p = Object.hasOwn(byId, id) ? byId[id] : null;
    if (!p) { location.hash = '#/index'; return; }
    clearDetail();
    const prevP = byId[D.projects[(p.n - 2 + TOTAL) % TOTAL].id], nextP = byId[D.projects[p.n % TOTAL].id];
    const m = p.media;
    const gallery = m.images.filter(im => im.src !== p.cover);
    galleryItems = gallery;
    galleryProject = p.fullTitle;

    const facts = [
      ['Year', esc(p.year)],
      ['Discipline', esc(projectDiscs(p).map(d => d.ko).join(' / '))],
      ...p.details.map(d => [esc(d.k), esc(d.v)]),
      ...(p.media.decks.length ? [['Attachment', `<a class="fact-link" href="#cs-pdf" data-jump="cs-pdf">PDF ${pad2(p.media.decks.length)} — ${t('발표 자료 보기', 'View presentation')}</a>`]] : []),
      ...(p.awards.length ? [['Awards', `<div class="chips">${p.awards.map(a => `<a class="chip chip--award" href="#/recognition" aria-label="${esc(a)} ${t('수상 이력 보기', 'award details')}">${esc(a)}</a>`).join('')}</div>`]] : []),
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
        <div class="pd-gallery">${gallery.map((im, i) => `
          <figure data-reveal><button class="pd-gallery-open" type="button" data-gallery-index="${i}" aria-label="${esc(im.label || p.fullTitle)} ${t('크게 보기', 'view enlarged')}"><img src="${src(im.src)}"${imageDimensions(im.src)}${responsive(im.src, '(max-width: 760px) 100vw, 50vw')} alt="" loading="lazy" decoding="async"><span aria-hidden="true">↗</span></button>
          ${im.label ? `<figcaption class="mono dim">${esc(im.label)}</figcaption>` : ''}</figure>`).join('')}
        </div>
      </section>` : '';

    const links = m.links.length ? `
      <section class="pd-block" aria-label="Links">
        <div class="sec-label"><span class="mono">Links</span><span class="mono dim">${pad2(m.links.length)}</span></div>
        <div class="links">${m.links.map(l => {
          const href = externalUrl(l.href);
          return href ? `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer"><span>${esc(l.label)}</span><span class="mono">${esc(new URL(href).hostname.replace('www.', ''))} ↗</span></a>` : '';
        }).join('')}
        </div>
      </section>` : '';

    const nav = (q, dir) => `
      <a class="next-card mono-hover" href="#/work/${q.id}" data-reveal>
        <div class="card mono-img"><img src="${src(q.cover, true)}"${imageDimensions(`${q.cover}-sm`)} alt="" loading="lazy" decoding="async">
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
            <button type="button" class="pd-share" data-share-project aria-label="${t('프로젝트 주소 복사', 'Copy project link')}">${t('공유', 'Share')} ↗</button>
            <a href="#/work/${prevP.id}" aria-label="Previous project">Prev</a>
            <span class="tabular">${pad2(p.n)} / ${TOTAL}</span>
            <a href="#/work/${nextP.id}" aria-label="Next project">Next</a>
          </div>
        </div>

        <section class="pd-hero site-pad">
          <div class="card">
            <img src="${src(p.cover)}"${imageDimensions(p.cover)}${responsive(p.cover, '100vw')} alt="${esc(p.fullTitle)}" fetchpriority="high" decoding="async">
            <div class="hero-scrim" aria-hidden="true"></div>
            <div class="ticks ticks--light" aria-hidden="true"></div>
            <div class="card-top"><span class="mono">${esc(projectDiscs(p).map(d => d.label).join(' / '))}</span><span class="mono">${esc(p.year)}</span></div>
            <div class="hero-copy">
              <h1 class="display" id="pd-title">${esc(p.fullTitle)}</h1>
              <p class="pd-ctx">${esc(p.context)}</p>
              ${p.awards.length ? `<div class="chips">${p.awards.map(a => `<a class="chip chip--award" href="#/recognition" aria-label="${esc(a)} ${t('수상 이력 보기', 'award details')}">${esc(a)}</a>`).join('')}</div>` : ''}
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
    if (e.target.closest('[data-share-project]')) {
      const id = location.hash.startsWith('#/work/') ? location.hash.slice(7).split('/')[0] : location.pathname.split('/')[2];
      const url = `${location.origin}/work/${encodeURIComponent(id)}/`;
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText(url).then(() => toast(t('프로젝트 주소를 복사했습니다.', 'Project link copied.'))).catch(() => toast(url));
      else toast(url);
      return;
    }
    const imageButton = e.target.closest('[data-gallery-index]');
    if (imageButton) {
      galleryIndex = Number(imageButton.dataset.galleryIndex);
      showGalleryImage();
      galleryViewer.showModal();
      return;
    }
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
      else view.innerHTML = pdfPoster(p, d, d.label || `PDF ${pad2(i + 1)}`);
      return;
    }
    const btn = e.target.closest('[data-embed]');
    if (!btn) return;
    const { embed, id } = btn.dataset;
    if (embed === 'local' && /^assets\/video\/[\w.-]+\.mp4$/.test(id)) {
      const video = document.createElement('video');
      video.src = id;
      video.controls = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.setAttribute('aria-label', btn.getAttribute('aria-label') || 'Video');
      btn.replaceWith(video);
      video.play().catch(() => {});
      return;
    }
    const url = embed === 'youtube' && /^[\w-]{11}$/.test(id)
      ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`
      : embed === 'drive' && /^[\w-]{10,}$/.test(id)
        ? `https://drive.google.com/file/d/${id}/preview`
        : embed === 'pdf' && /^assets\/pdf\/[\w.-]+\.pdf$/.test(id) ? id : null;
    if (!url) { toast(t('미디어 주소를 확인해 주세요.', 'Please check the media URL.')); return; }
    const f = document.createElement('iframe');
    f.src = url;
    f.referrerPolicy = 'strict-origin-when-cross-origin';
    f.title = btn.getAttribute('aria-label') || 'Embedded media';
    f.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
    f.allowFullscreen = true;
    btn.replaceWith(f);
  });

  return { renderDetail, galleryViewer };
}
