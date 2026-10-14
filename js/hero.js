/* The cursor acts as a signal source: it bends the grid and changes the type. */
(() => {
  'use strict';
  const hero = document.querySelector('.hero-intro');
  const canvas = document.querySelector('#hero-field');
  if (!hero || !canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const letters = [...hero.querySelectorAll('.hero-letter')];
  const coordinates = hero.querySelector('#hero-coordinates');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const signal = { x: .5, y: .48, tx: .5, ty: .48, active: false };
  const ripples = [];
  let width = 0, height = 0, pixelRatio = 1, visible = true, frame = 0, previous = 0;
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));

  function resize() {
    const rect = hero.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    pixelRatio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    if (reduced || !finePointer) draw(0);
  }

  function bend(x, y, cx, cy, radius) {
    const dx = x - cx, dy = y - cy;
    const distance = Math.hypot(dx, dy) || 1;
    const strength = Math.pow(Math.max(0, 1 - distance / radius), 2) * 25;
    return [x + dx / distance * strength, y + dy / distance * strength];
  }

  function draw(time) {
    frame = 0;
    if (!visible || !width || !height) return;
    if (!reduced && finePointer && time - previous < 30) {
      frame = requestAnimationFrame(draw);
      return;
    }
    previous = time;
    signal.x += (signal.tx - signal.x) * .08;
    signal.y += (signal.ty - signal.y) * .08;
    const cx = signal.x * width, cy = signal.y * height;
    const pulse = reduced || !finePointer ? 0 : Math.sin(time * .0007);
    ctx.fillStyle = '#0b0f16';
    ctx.fillRect(0, 0, width, height);

    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(220, width * .29));
    glow.addColorStop(0, signal.active ? 'rgba(37,111,179,.18)' : 'rgba(32,82,129,.10)');
    glow.addColorStop(1, 'rgba(11,15,22,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    const spacing = clamp(width / 13, 66, 115);
    const radius = clamp(width * .21, 160, 330);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(71,125,181,.14)';
    for (let x = spacing / 2; x < width + spacing; x += spacing) {
      ctx.beginPath();
      for (let y = 0; y <= height + 20; y += 20) {
        const [bx, by] = bend(x, y, cx, cy, radius);
        if (y === 0) ctx.moveTo(bx, by); else ctx.lineTo(bx, by);
      }
      ctx.stroke();
    }
    for (let y = spacing / 2; y < height + spacing; y += spacing) {
      ctx.beginPath();
      for (let x = 0; x <= width + 20; x += 20) {
        const [bx, by] = bend(x, y, cx, cy, radius);
        if (x === 0) ctx.moveTo(bx, by); else ctx.lineTo(bx, by);
      }
      ctx.stroke();
    }

    for (let x = spacing / 2; x < width; x += spacing) {
      for (let y = spacing / 2; y < height; y += spacing) {
        const [bx, by] = bend(x, y, cx, cy, radius);
        const near = Math.max(0, 1 - Math.hypot(x - cx, y - cy) / radius);
        ctx.beginPath();
        ctx.arc(bx, by, near > .4 ? 2 : 1.25, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(76,163,235,${.14 + near * .55})`;
        ctx.fill();
      }
    }

    const baseline = height * .51;
    for (let line = -2; line <= 2; line++) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(69,150,220,${line === 0 ? .18 : .075})`;
      for (let x = 0; x <= width + 8; x += 8) {
        const distance = Math.abs(x - cx);
        const envelope = Math.exp(-distance * distance / (width * width * .13));
        const wave = Math.sin(x * .013 + line * .82 + pulse) * (9 + 18 * envelope);
        const y = baseline + line * 27 + wave;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    const halo = 24 + (pulse + 1) * 2;
    ctx.beginPath(); ctx.arc(cx, cy, halo, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(83,171,244,.34)'; ctx.lineWidth = 1; ctx.stroke();
    ctx.beginPath(); ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#6abaff'; ctx.shadowColor = '#5cb4ff'; ctx.shadowBlur = 18; ctx.fill(); ctx.shadowBlur = 0;

    for (let i = ripples.length - 1; i >= 0; i--) {
      const ripple = ripples[i];
      ripple.radius += 3.5;
      ripple.alpha *= .955;
      ctx.beginPath(); ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(110,192,255,${ripple.alpha})`;
      ctx.stroke();
      if (ripple.alpha < .02) ripples.splice(i, 1);
    }
    if (!reduced && finePointer) frame = requestAnimationFrame(draw);
  }

  function setType(nx, ny) {
    letters.forEach((letter, i) => {
      const index = i - 2;
      letter.style.setProperty('--dx', `${(nx - .5) * (index * 13 + 10)}px`);
      letter.style.setProperty('--dy', `${(ny - .5) * (i % 2 ? -20 : 20)}px`);
      letter.style.setProperty('--dr', `${(nx - .5) * index * 6}deg`);
    });
  }
  if (finePointer && !reduced) {
    hero.addEventListener('pointermove', event => {
      const rect = hero.getBoundingClientRect();
      signal.tx = clamp((event.clientX - rect.left) / rect.width, 0, 1);
      signal.ty = clamp((event.clientY - rect.top) / rect.height, 0, 1);
      signal.active = true;
      setType(signal.tx, signal.ty);
      coordinates.textContent = `X ${String(Math.round(signal.tx * 100)).padStart(3, '0')} · Y ${String(Math.round(signal.ty * 100)).padStart(3, '0')}`;
    });
    hero.addEventListener('pointerleave', () => {
      signal.tx = .5; signal.ty = .48; signal.active = false;
      setType(.5, .5);
      coordinates.textContent = 'X 050 · Y 050';
    });
    hero.addEventListener('pointerdown', event => {
      const rect = hero.getBoundingClientRect();
      ripples.push({ x: event.clientX - rect.left, y: event.clientY - rect.top, radius: 18, alpha: .5 });
      if (ripples.length > 5) ripples.shift();
    });
  } else {
    coordinates.textContent = 'SIGNAL → EXPERIENCE';
  }
  new ResizeObserver(resize).observe(hero);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible && !frame && !reduced && finePointer) frame = requestAnimationFrame(draw);
  }).observe(hero);
  resize();
  if (!reduced && finePointer) frame = requestAnimationFrame(draw);
})();
