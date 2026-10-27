/* Full-screen portfolio reel with direct scene navigation. */
(() => {
  'use strict';
  const reel = document.querySelector('.showreel');
  if (!reel) return;

  const slides = [...reel.querySelectorAll('.showreel-slide')];
  const timeline = reel.querySelector('.showreel-timeline');
  const marks = [...timeline.querySelectorAll('button[data-slide]')];
  const count = reel.querySelector('#showreel-count');
  const nowTitle = reel.querySelector('#showreel-now-title');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const images = slides.map(slide => slide.querySelector('img'));
  const titles = slides.map(slide => slide.querySelector('.showreel-caption strong').textContent);
  const duration = 6000;
  let index = 0;
  let requestedIndex = 0;
  let timer = 0;
  let visible = !reel.closest('[hidden]');
  let focused = false;
  let request = 0;
  const loads = new WeakMap();
  const load = i => {
    const img = images[i];
    if (!loads.has(img)) {
      img.loading = 'eager';
      if (img.dataset.srcset) { img.srcset = img.dataset.srcset; delete img.dataset.srcset; }
      if (img.dataset.src) { img.src = img.dataset.src; delete img.dataset.src; }
      loads.set(img, img.decode().catch(() => {}));
    }
    return loads.get(img);
  };

  const schedule = () => {
    clearTimeout(timer);
    const playing = !motion.matches && visible && !document.hidden && !focused;
    timeline.classList.toggle('is-paused', !playing);
    if (!playing) return;
    timer = setTimeout(() => {
      show((index + 1) % slides.length);
    }, duration);
  };

  const show = async next => {
    clearTimeout(timer);
    const ticket = ++request;
    const target = (next + slides.length) % slides.length;
    requestedIndex = target;
    await load(target);
    if (ticket !== request) return;
    index = target;
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      slide.tabIndex = active ? 0 : -1;
    });
    marks.forEach((mark, i) => {
      mark.classList.remove('is-active');
      mark.classList.toggle('is-past', i < index);
      mark.setAttribute('aria-pressed', String(i === index));
    });
    // Restart the progress line even when the current scene is chosen again.
    void timeline.offsetWidth;
    marks[index].classList.add('is-active');
    count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    nowTitle.textContent = titles[index];
    if (!motion.matches && visible && !document.hidden) load((index + 1) % slides.length);
    schedule();
  };

  marks.forEach((mark, i) => {
    mark.dataset.title = titles[i];
    mark.addEventListener('click', () => {
      if (requestedIndex !== i) show(i);
    });
    mark.addEventListener('keydown', event => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      const next = (i + (event.key === 'ArrowRight' ? 1 : -1) + marks.length) % marks.length;
      marks[next].focus();
      show(next);
    });
  });
  reel.addEventListener('focusin', () => { focused = true; schedule(); });
  reel.addEventListener('focusout', event => {
    if (!reel.contains(event.relatedTarget)) { focused = false; schedule(); }
  });
  let touchStart = null, suppressClick = false;
  const stage = reel.querySelector('.showreel-stage');
  stage.addEventListener('touchstart', event => {
    suppressClick = false;
    const touch = event.touches[0];
    touchStart = event.touches.length === 1 ? { x: touch.clientX, y: touch.clientY } : null;
  }, { passive: true });
  stage.addEventListener('touchend', event => {
    if (!touchStart) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStart.x, dy = touch.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    suppressClick = true;
    show(requestedIndex + (dx < 0 ? 1 : -1));
  }, { passive: true });
  stage.addEventListener('touchcancel', () => { touchStart = null; }, { passive: true });
  stage.addEventListener('click', event => {
    if (suppressClick) { event.preventDefault(); event.stopPropagation(); suppressClick = false; }
  }, true);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && images[index].dataset.src) { show(index); return; }
      schedule();
    }, { threshold: 0.2 }).observe(reel);
  }
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', schedule);
  if (visible) show(0);
})();
