// Extrude the actual ye logo silhouette, preserving its original strokes and proportions.
export async function createAsciiBackground() {
  const logo = new Image();
  logo.src = new URL('../../assets/img/ye-logo.png', import.meta.url).href;
  try { await logo.decode(); } catch { return; }
  const mask = document.createElement('canvas');
  mask.width = 240;
  mask.height = Math.round(240 * logo.naturalHeight / logo.naturalWidth);
  const maskCtx = mask.getContext('2d', { willReadFrequently: true });
  if (!maskCtx) return;
  maskCtx.drawImage(logo, 0, 0, mask.width, mask.height);
  const pixels = maskCtx.getImageData(0, 0, mask.width, mask.height).data;
  const filled = (x, y) => x >= 0 && y >= 0 && x < mask.width && y < mask.height && pixels[(y * mask.width + x) * 4 + 3] > 128;
  let left = mask.width, right = 0, top = mask.height, bottom = 0;
  for (let y = 0; y < mask.height; y++) for (let x = 0; x < mask.width; x++) {
    if (!filled(x, y)) continue;
    left = Math.min(left, x); right = Math.max(right, x);
    top = Math.min(top, y); bottom = Math.max(bottom, y);
  }
  if (right <= left) return;
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
  const unit = 2 / (right - left);
  for (let y = top; y <= bottom; y++) for (let x = left; x <= right; x++) {
    if (!filled(x, y)) continue;
    const px = (x - (left + right) / 2) * unit;
    const py = (y - (top + bottom) / 2) * unit;
    points.push([px, py, .12, 0, 0, 1], [px, py, -.12, 0, 0, -1]);
    const nx = Number(filled(x - 1, y)) - Number(filled(x + 1, y));
    const ny = Number(filled(x, y - 1)) - Number(filled(x, y + 1));
    if (nx || ny) for (let z = -.10; z < .12; z += .025) points.push([px, py, z, nx, ny, 0]);
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
    const angle = .25 + Math.sin(time * .22 + (motion.matches ? 0 : scrollY * .00015)) * .48;
    const ca = Math.cos(angle), sa = Math.sin(angle), tilt = -.12 + Math.sin(time * .16) * .12;
    const ct = Math.cos(tilt), st = Math.sin(tilt);
    const scale = Math.min(width * .43, height * .52);
    for (const [x, y, z, nx, ny, nz] of points) {
      const rx = x * ca + z * sa, rz = z * ca - x * sa;
      const ry = y * ct - rz * st, zz = y * st + rz * ct;
      const perspective = 3.8 / (3.8 - zz);
      const col = Math.floor((width * .54 + rx * scale * perspective) / 9);
      const row = Math.floor((height * .53 + ry * scale * perspective) / 14);
      if (col < 0 || col >= cols || row < 0 || row >= rows) continue;
      const index = row * cols + col;
      if (zz <= depth[index]) continue;
      depth[index] = zz;
      const normalX = nx * ca + nz * sa;
      const normalZ = (nz * ca - nx * sa) * ct + ny * st;
      const light = Math.max(0, Math.min(1, .5 + normalX * -.3 + ny * -.2 + normalZ * .4));
      cells[index] = 2 + Math.floor(light * 7);
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
