/* A quiet, automatic reel of real portfolio projects. */
(() => {
  'use strict';
  const reel = document.querySelector('.showreel');
  if (!reel) return;
  const slides = [...reel.querySelectorAll('.showreel-slide')];
  const marks = [...reel.querySelectorAll('.showreel-timeline span')];
  const count = reel.querySelector('#showreel-count');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let index = 0, timer = 0, visible = true;
  const show = next => {
    index = next;
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      slide.tabIndex = active ? 0 : -1;
    });
    marks.forEach((mark, i) => {
      mark.classList.toggle('is-active', i === index);
      mark.classList.toggle('is-past', i < index);
    });
    count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  };
  const schedule = () => {
    clearTimeout(timer);
    if (reduced || !visible || document.hidden) return;
    timer = setTimeout(() => { show((index + 1) % slides.length); schedule(); }, 5200);
  };
  if (reduced) reel.querySelector('.showreel-note').textContent = '대표 프로젝트 이미지 · 누르면 상세 페이지로 이동합니다';
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule(); }).observe(reel);
  document.addEventListener('visibilitychange', schedule);
  show(0);
  schedule();
})();
