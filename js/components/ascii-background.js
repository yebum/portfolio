// A slowly turning, folded ribbon drawn with type. Decorative and independent of layout.
export function createAsciiBackground() {
  const canvas = document.createElement('canvas');
  canvas.className = 'ascii-background';
  canvas.setAttribute('aria-hidden', 'true');
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;
  document.body.prepend(canvas);
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const button = document.createElement('button');
  button.className = 'ascii-toggle mono';
  document.querySelector('.footer').append(button);
  let paused = false, frame = 0, last = 0, time = 0, width, height, cols, rows, depth, cells;
  const chars = ' .:-=+*#%@';
  const points = [];
  for (let a = 0; a < Math.PI * 2; a += .035) {
    for (let b = -.48; b <= .48; b += .055) {
      const radius = 1.05 + b * Math.cos(a * 1.5);
      points.push([radius * Math.cos(a), radius * Math.sin(a), b * Math.sin(a * 1.5), a, b]);
    }
  }
  const label = () => {
    const en = document.documentElement.lang === 'en';
    button.textContent = en ? `ASCII · ${paused || motion.matches ? 'Still' : 'Pause'}` : `ASCII · ${paused || motion.matches ? '정지됨' : '일시정지'}`;
    button.setAttribute('aria-label', en ? (paused ? 'Play background animation' : 'Pause background animation') : (paused ? '배경 애니메이션 재생' : '배경 애니메이션 일시정지'));
    button.setAttribute('aria-pressed', String(paused || motion.matches));
    button.disabled = motion.matches;
  };
  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    depth.fill(-Infinity); cells.fill(0);
    const angle = time * .12 + (motion.matches ? 0 : scrollY * .00012);
    const ca = Math.cos(angle), sa = Math.sin(angle), tilt = .65 + Math.sin(time * .08) * .2;
    const ct = Math.cos(tilt), st = Math.sin(tilt);
    const scale = Math.min(width * .40, height * .66);
    for (const [x, y, z, a, b] of points) {
      const rx = x * ca + z * sa, rz = z * ca - x * sa;
      const ry = y * ct - rz * st, zz = y * st + rz * ct;
      const perspective = 3.8 / (3.8 - zz);
      const col = Math.floor((width * .54 + rx * scale * perspective) / 9);
      const row = Math.floor((height * .53 + ry * scale * perspective) / 14);
      if (col < 0 || col >= cols || row < 0 || row >= rows) continue;
      const index = row * cols + col;
      if (zz <= depth[index]) continue;
      depth[index] = zz;
      cells[index] = 1 + Math.floor((.5 + .5 * Math.sin(a * 2 + b * 3 + angle)) * 8);
    }
    for (let row = 0; row < rows; row++) {
      let line = '';
      for (let col = 0; col < cols; col++) line += chars[cells[row * cols + col]];
      ctx.fillText(line, 0, row * 14);
    }
  };
  const resize = () => {
    width = innerWidth; height = innerHeight;
    // One CSS pixel per bitmap pixel is enough for this deliberately soft background.
    canvas.width = width; canvas.height = height;
    cols = Math.ceil(width / 9); rows = Math.ceil(height / 14);
    depth = new Float32Array(cols * rows); cells = new Uint8Array(cols * rows);
    ctx.font = '14px monospace'; ctx.textBaseline = 'top'; ctx.fillStyle = '#727780';
    // Align the character advance with the sampling grid across operating systems.
    ctx.font = `${14 * 9 / ctx.measureText('M').width}px monospace`;
    draw();
  };
  const tick = now => {
    frame = requestAnimationFrame(tick);
    if (now - last < 65) return;
    time += Math.min(now - last, 100) / 1000; last = now;
    draw();
  };
  const sync = () => {
    cancelAnimationFrame(frame); frame = 0; last = performance.now(); label();
    if (!paused && !motion.matches && !document.hidden) frame = requestAnimationFrame(tick);
  };
  button.addEventListener('click', () => { paused = !paused; sync(); });
  motion.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  addEventListener('resize', resize, { passive: true });
  resize(); sync();
}
