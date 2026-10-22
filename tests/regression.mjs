import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const root = resolve('.');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png' };
const server = createServer(async (req, res) => {
  try {
    const path = resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname).replace(/\/$/, '/index.html'));
    if (!path.startsWith(root + sep)) { res.writeHead(403).end(); return; }
    res.setHeader('Content-Type', types[extname(path)] || 'application/octet-stream');
    res.end(await readFile(path));
  } catch { res.writeHead(404).end(); }
});
await new Promise(done => server.listen(0, '127.0.0.1', done));
let browser;
try {
  browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.addInitScript(() => {
    const NativeObserver = window.IntersectionObserver;
    window.testObserved = new Set();
    window.IntersectionObserver = class extends NativeObserver {
      observe(el) { window.testObserved.add(el); return super.observe(el); }
      unobserve(el) { window.testObserved.delete(el); return super.unobserve(el); }
    };
  });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const base = `http://127.0.0.1:${server.address().port}`;
  for (const language of ['', '?lang=en']) {
    await page.goto(base + '/' + language);
    await page.waitForFunction(() => document.querySelector('#index-list').children.length > 0 && document.querySelector('.showreel-slide.is-active img').complete);
    await page.waitForTimeout(300);
    assert.equal(await page.locator('.showreel-slide img[src]').count(), 2, 'only current and next reel images loaded');
    await page.locator('[data-slide="8"]').click();
    await page.waitForFunction(() => document.querySelector('#showreel-count').textContent.startsWith('09'));
    assert.equal(await page.locator('.showreel-slide.is-active img').evaluate(img => img.naturalWidth > 0), true);
    await page.locator('#index-list > li').nth(7).scrollIntoViewIfNeeded();
    await page.waitForFunction(() => [...document.querySelectorAll('#index-list > li img')].slice(0, 8).every(img => img.complete && img.naturalWidth));
    await page.waitForTimeout(100);
    const cards = await page.locator('.index.is-grid .index-list > li').evaluateAll(items => items.slice(0, 8).map(el => {
      const img = el.querySelector('img');
      const box = img.getBoundingClientRect(), card = el.getBoundingClientRect();
      return { width: Math.round(box.width), height: Math.round(box.height), naturalRatio: img.naturalWidth / img.naturalHeight, left: Math.round(card.left), top: Math.round(card.top), bottom: Math.round(card.bottom) };
    }));
    assert.equal(new Set(cards.slice(0, 4).map(card => card.width)).size, 1, 'columns have equal widths');
    assert.ok(new Set(cards.map(card => card.height)).size > 1, 'images retain varied heights');
    assert.ok(cards.every(card => Math.abs(card.width / card.height - card.naturalRatio) < .02), 'images keep their natural proportions');
    assert.equal(new Set(cards.slice(0, 4).map(card => card.top)).size, 1, 'newest four projects lead each column');
    if (process.env.GALLERY_SCREENSHOT_DIR && !language) {
      await page.locator('#index-list > li').first().evaluate(el => el.scrollIntoView({ block: 'start', behavior: 'instant' }));
      await page.screenshot({ path: resolve(process.env.GALLERY_SCREENSHOT_DIR, 'gallery-desktop.png') });
    }
    const total = await page.locator('#index-list > li').count();
    for (const filter of await page.locator('[data-filter]').all()) {
      const key = await filter.getAttribute('data-filter');
      await filter.click();
      const expected = await page.evaluate(key => window.PORTFOLIO.projects.filter(p => key === 'all' || p.disciplines.includes(key)).length, key);
      assert.equal(await page.locator('#index-list > li:not([hidden])').count(), expected);
    }
    await page.locator('[data-filter="all"]').click();
    await page.locator('#work-search').fill('Neuroscape');
    assert.equal(await page.locator('#index-list > li:not([hidden])').count(), 1);
    await page.locator('#index-list > li:not([hidden]) a').click();
    await page.waitForFunction(() => !document.querySelector('#detail').hidden);
    assert.ok(await page.locator('.pd-hero img').getAttribute('srcset'));
    await page.locator('.pd-step a').last().click();
    await page.waitForTimeout(100);
    assert.equal(await page.evaluate(() => [...window.testObserved].filter(el => !el.isConnected).length), 0, 'no detached reveal observers');
    await page.goto(base + '/' + language + '#/work/%ZZ');
    await page.waitForFunction(() => location.hash === '#/index' && !document.querySelector('#home').hidden);
    await page.goto(base + '/' + language + '#/work/__proto__');
    await page.waitForFunction(() => location.hash === '#/index');
    await page.locator('#work-search').fill('');
    assert.equal(await page.locator('#index-list > li:not([hidden])').count(), total);
    assert.equal(await page.locator('html').getAttribute('lang'), language ? 'en' : 'ko');
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base + '/');
  await page.waitForFunction(() => document.querySelector('#index-list').children.length > 0);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'no mobile overflow');
  await page.locator('#index-list > li').nth(2).scrollIntoViewIfNeeded();
  await page.waitForFunction(() => [...document.querySelectorAll('#index-list > li img')].slice(0, 3).every(img => img.complete && img.naturalWidth));
  assert.ok(await page.locator('.index.is-grid .row-thumb img').evaluateAll(items => items.slice(0, 3).every(img => Math.abs(img.getBoundingClientRect().width / img.getBoundingClientRect().height - img.naturalWidth / img.naturalHeight) < .02)), 'mobile images keep natural proportions');
  await page.route('**/Neuroscape*.webp', async route => {
    await new Promise(done => setTimeout(done, 300));
    await route.continue();
  });
  await page.locator('[data-slide="8"]').dispatchEvent('click');
  await page.locator('[data-slide="0"]').dispatchEvent('click');
  await page.waitForTimeout(600);
  assert.match(await page.locator('#showreel-count').textContent(), /^01/);
  if (process.env.GALLERY_SCREENSHOT_DIR) {
    await page.locator('#index-list > li').nth(2).scrollIntoViewIfNeeded();
    await page.waitForFunction(() => [...document.querySelectorAll('#index-list > li img')].slice(0, 3).every(img => img.complete && img.naturalWidth));
    await page.locator('#index-list > li').first().evaluate(el => el.scrollIntoView({ block: 'start', behavior: 'instant' }));
    await page.screenshot({ path: resolve(process.env.GALLERY_SCREENSHOT_DIR, 'gallery-mobile.png') });
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForTimeout(100);
  assert.equal(await page.locator('.showreel-timeline').evaluate(el => el.classList.contains('is-paused')), true);
  assert.deepEqual(errors, []);
  console.log('PASS: KO/EN, deferred reel images, direct scene selection, all overlapping filters, search, detail images, malformed routes, mobile width, reduced motion; no runtime errors.');
} finally { await browser?.close(); server.close(); }
