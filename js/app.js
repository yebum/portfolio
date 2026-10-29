import { createWorkIndex } from './components/work-index.js?v=scroll-20261027';
import { createScrollReveal } from './components/scroll-reveal.js';
import { createArrival } from './components/arrival.js?v=perf-20261028';
import { createAsciiBackground } from './components/ascii-background.js?v=perf-20261028';
import { createAbout } from './components/about.js';
import { createRecognition } from './components/recognition.js?v=materials-20261029';
import { createProjectDetail } from './components/project-detail.js?v=delivery-20261030';

/* ════════════════════════════════════════════════════════════
   Yebum Ko — Portfolio 2026 · app.js
   Hash router (#/, #/<section>, #/work/<id>) and prerendered /work/<id>/ pages.
   All content lives in js/data.js.
   ════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const D = window.PORTFOLIO;
  const t = window.PORTFOLIO_T || ((ko) => ko);
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad2 = n => String(n).padStart(2, '0');
  const src = (name, sm) => `assets/img/${encodeURIComponent(name)}${sm ? '-sm' : ''}.webp`;
  const imageSizes = window.PORTFOLIO_IMAGE_SIZES || {};
  const imageDimensions = name => Object.hasOwn(imageSizes, name)
    ? ` width="${imageSizes[name][0]}" height="${imageSizes[name][1]}"`
    : '';
  const responsive = (name, sizes) => Object.hasOwn(imageSizes, name) && Object.hasOwn(imageSizes, `${name}-sm`)
    ? ` srcset="${src(name, true)} ${imageSizes[`${name}-sm`][0]}w, ${src(name)} ${imageSizes[name][0]}w" sizes="${sizes}"`
    : '';
  const externalUrl = value => {
    try {
      const url = new URL(value);
      return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : null;
    } catch (_) { return null; }
  };
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // run after layout; rAF alone never fires in background tabs, so race it with a timeout
  const afterLayout = fn => {
    let frame, timer;
    const cancel = () => { cancelAnimationFrame(frame); clearTimeout(timer); };
    const run = () => { cancel(); fn(); };
    frame = requestAnimationFrame(run);
    timer = setTimeout(run, 60);
    return cancel;
  };

  const byId = Object.fromEntries(D.projects.map((p, i) => [p.id, { ...p, n: i + 1 }]));
  const disc = Object.fromEntries(D.disciplines.map(d => [d.key, d]));
  const projectDiscs = p => p.disciplines.map(key => disc[key]);
  const TOTAL = D.projects.length;

  const home = $('#home');
  const detail = $('#detail');

  /* ── reveal on scroll ─────────────────────────────── */
  const reveals = createScrollReveal();
  const clearDetail = () => {
    reveals.release(detail);
    detail.querySelectorAll('video').forEach(video => {
      video.pause();
      video.removeAttribute('src');
      video.load();
    });
    detail.replaceChildren();
  };
  const observeReveals = reveals.observe;
  const settleReveals = reveals.settle;

  const toast = (() => {
    const el = $('#toast'); let t;
    return msg => { el.textContent = msg; el.classList.add('is-on'); clearTimeout(t); t = setTimeout(() => el.classList.remove('is-on'), 1800); };
  })();

  /* Dynamic page components share content and small view helpers. */
  const view = { D, t, $, $$, esc, pad2, src, imageDimensions, responsive, externalUrl, reduced, byId, projectDiscs, TOTAL, clearDetail, observeReveals, settleReveals, toast };
  const renderIndex = createWorkIndex(view);
  const renderAbout = createAbout(view);
  const renderRecognition = createRecognition(view);
  const { renderDetail, galleryViewer } = createProjectDetail(view);

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

  let cancelRouteLayout = () => {};
  function route() {
    cancelRouteLayout();
    if (galleryViewer.open) galleryViewer.close();
    const h = location.hash.replace(/^#\/?/, '');
    const parts = h.split('/').filter(Boolean);
    if (!parts.length && !location.hash) {
      const match = location.pathname.match(/^\/work\/([^/]+)\/?$/);
      if (match) parts.push('work', match[1]);
    }
    $('#nav').classList.remove('is-open');
    $('#nav-menu').setAttribute('aria-expanded', 'false');

    if (parts[0] === 'work' && parts[1]) {
      if (current === 'home') { homeScroll = scrollY; cameFromHome = true; }
      else if (current !== 'detail') cameFromHome = false;
      let id;
      try { id = decodeURIComponent(parts[1]); } catch (_) { location.replace(`/${location.search}#/index`); return; }
      if (!Object.hasOwn(byId, id)) { location.replace(`/${location.search}#/index`); return; }
      renderDetail(id);
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
      detail.hidden = true; clearDetail();
      home.hidden = false;
      home.classList.remove('view'); void home.offsetWidth; home.classList.add('view');
    }
    current = 'home';
    const explicit = sectionClick;
    sectionClick = false;
    if (wasDetail && cameFromHome && !explicit) {
      // browser back / "← Index": land on the row you left from
      cancelRouteLayout = afterLayout(() => scrollTo({ top: homeScroll, behavior: 'auto' }));
    } else if (parts.length || wasDetail) {
      cancelRouteLayout = afterLayout(() => scrollToSection(section, !wasDetail));
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
    if (target === location.hash || (target === '#/' && !location.hash && current === 'home')) { e.preventDefault(); route(); if (target === '#/') scrollToSection('top', true); }
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
    if (!/^[\w-]{11}$/.test(ytId)) return;
    $('#modal-title').textContent = title;
    const video = document.createElement('iframe');
    video.src = `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`;
    video.title = title;
    video.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
    video.allowFullscreen = true;
    video.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.replaceChildren(video);
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
    if (current !== 'detail' || modal.open || galleryViewer.open || (t instanceof Element && t.closest('input, textarea, select, button, iframe, [contenteditable]')) || e.metaKey || e.ctrlKey || e.altKey) return;
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
  const clockFormat = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Seoul', hour: '2-digit', minute: '2-digit', hour12: false });
  const tick = () => {
    if (document.hidden) return;
    const t = clockFormat.format(new Date());
    clock.textContent = `Seoul ${t} KST`;
  };
  tick(); setInterval(tick, 60000);
  document.addEventListener('visibilitychange', tick);

  /* ── boot ─────────────────────────────────────────── */


  renderIndex();
  createAsciiBackground().then(() => dispatchEvent(new Event('portfolio:ascii-ready')));
  renderAbout();
  renderRecognition();
  observeReveals(document);
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  route();
  createArrival();
})();
