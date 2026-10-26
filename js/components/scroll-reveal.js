// One-time entrances. Filtering owns the outer card; reveals own its content.
export function createScrollReveal() {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const pending = new Set();
  const reveal = (el, immediate = false, delay = 0) => {
    if (immediate) el.classList.add('reveal-settled');
    el.style.setProperty('--reveal-delay', `${delay}ms`);
    el.classList.add('in');
    pending.delete(el);
    observer?.unobserve(el);
  };
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    const entering = entries.filter(e => e.isIntersecting).sort((a, b) =>
      Math.round(a.boundingClientRect.top / 40) - Math.round(b.boundingClientRect.top / 40) || a.boundingClientRect.left - b.boundingClientRect.left);
    entering.forEach((entry, i) => reveal(entry.target, motion.matches, Math.min(i, 3) * 65));
  }, { rootMargin: '0px 0px 6% 0px', threshold: 0 }) : null;

  const observe = root => root.querySelectorAll('[data-reveal]:not(.in)').forEach(el => {
    if (motion.matches || !observer) { reveal(el, true); return; }
    if (pending.has(el)) return;
    el.classList.add('reveal-ready');
    pending.add(el);
    observer.observe(el);
  });
  const release = root => root.querySelectorAll('[data-reveal]').forEach(el => {
    pending.delete(el);
    observer?.unobserve(el);
  });
  const settle = root => root.querySelectorAll('[data-reveal]').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.width && rect.height && rect.bottom > 0 && rect.top < innerHeight) reveal(el, true);
  });
  motion.addEventListener('change', () => {
    if (motion.matches) [...pending].forEach(el => reveal(el, true));
  });
  document.addEventListener('focusin', event => {
    const el = event.target.closest('[data-reveal]');
    if (el) reveal(el, true);
  });
  return { observe, release, settle };
}
