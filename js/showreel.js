/* Full-screen portfolio reel with direct scene navigation. */
(() => {
  'use strict';
  const reel = document.querySelector('.showreel');
  if (!reel) return;

  const slides = [...reel.querySelectorAll('.showreel-slide')];
  const timeline = reel.querySelector('.showreel-timeline');
  const marks = [...timeline.querySelectorAll('button[data-slide]')];
  const count = reel.querySelector('#showreel-count');
  const toggle = reel.querySelector('.showreel-toggle');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const duration = 6000;
  let index = 0;
  let timer = 0;
  let visible = true;
  let paused = reduced;

  const schedule = () => {
    clearTimeout(timer);
    const playing = !paused && visible && !document.hidden;
    timeline.classList.toggle('is-paused', !playing);
    if (!playing) return;
    timer = setTimeout(() => {
      show((index + 1) % slides.length);
      schedule();
    }, duration);
  };

  const show = next => {
    index = (next + slides.length) % slides.length;
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
  };

  const setPaused = value => {
    paused = value;
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', paused ? '자동 재생 시작' : '자동 재생 일시정지');
    toggle.textContent = paused ? '▶' : 'Ⅱ';
    schedule();
  };

  marks.forEach((mark, i) => {
    mark.addEventListener('click', () => {
      show(i);
      schedule();
    });
    mark.addEventListener('keydown', event => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      const next = (i + (event.key === 'ArrowRight' ? 1 : -1) + marks.length) % marks.length;
      marks[next].focus();
      show(next);
      schedule();
    });
  });
  toggle.addEventListener('click', () => setPaused(!paused));
  if (reduced) toggle.hidden = true;

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      schedule();
    }, { threshold: 0.2 }).observe(reel);
  }
  document.addEventListener('visibilitychange', schedule);
  show(0);
  setPaused(reduced);
})();
