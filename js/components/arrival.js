// Scroll-linked entrance with a short damped follow, without intercepting wheel/touch input.
export function createArrival() {
  const home = document.getElementById('home');
  const arrival = document.querySelector('.arrival');
  const reel = document.querySelector('.intro .showreel');
  const copy = arrival.querySelector('.arrival-copy');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0, value = 0, target = 0, last = 0;
  let height = arrival.offsetHeight, painted = '', canvas;
  const paint = () => {
    const active = !home.hidden;
    const entering = active && scrollY < height * .55;
    const progress = active ? value : 1;
    const key = `${progress}:${entering}:${active}:${motion.matches}`;
    if (painted === key) return;
    painted = key;
    document.body.classList.toggle('arrival-active', entering);
    copy.style.opacity = String(1 - Math.min(1, progress * 1.6));
    copy.style.transform = motion.matches ? 'none' : `translateY(${progress * -55}px)`;
    reel.style.transform = motion.matches || !active ? 'none' : `translateY(${(1-progress) * 64}px) scale(${.94 + progress * .06})`;
    canvas ||= document.querySelector('.ascii-background');
    canvas?.style.setProperty('--ascii-arrival-opacity', String(active ? .19 + (1-progress) * .16 : .19));
  };
  const tick = now => {
    const elapsed = Math.min(64, now - (last || now - 16)); last = now;
    value += (target - value) * (1 - Math.exp(-elapsed / 90));
    if (Math.abs(target - value) < .001) value = target;
    paint();
    frame = value === target ? 0 : requestAnimationFrame(tick);
  };
  const update = () => {
    target = home.hidden ? 1 : Math.min(1, Math.max(0, scrollY / Math.max(1, height * .9)));
    if (target === value && !frame) { paint(); return; }
    if (motion.matches || home.hidden || Math.abs(target - value) > .8) {
      cancelAnimationFrame(frame); frame = 0; value = target; paint();
    } else if (!frame) { last = 0; frame = requestAnimationFrame(tick); }
  };
  arrival.querySelector('a').addEventListener('click', event => {
    event.preventDefault();
    document.getElementById('reel').scrollIntoView({behavior:motion.matches ? 'instant' : 'smooth',block:'start'});
  });
  addEventListener('scroll', update, {passive:true});
  const measure = () => { if (!home.hidden) height = arrival.offsetHeight; update(); };
  new ResizeObserver(measure).observe(arrival);
  addEventListener('portfolio:ascii-ready', () => { painted = ''; paint(); });
  motion.addEventListener('change', update);
  new MutationObserver(measure).observe(home, {attributes:true,attributeFilter:['hidden']});
  value = home.hidden ? 1 : Math.min(1, scrollY / Math.max(1, height * .9));
  update(); paint();
}
