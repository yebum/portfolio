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
  page.on('console', message => { if (message.text().includes('Content Security Policy')) errors.push(message.text()); });
  const base = `http://127.0.0.1:${server.address().port}`;
  for (const language of ['', '?lang=en']) {
    await page.goto(base + '/' + language);
    await page.waitForFunction(() => document.querySelector('#index-list').children.length > 0 && document.querySelector('.showreel-slide.is-active img').complete);
    assert.equal(await page.locator('#index-list a[href="#/work/FEELD"]').count(), 1, 'FEELD appears in the project index');
    assert.equal(await page.locator('#index-list a[href="#/work/AllAllowed"]').count(), 1, 'All Allowed appears in the project index');
    assert.deepEqual(await page.evaluate(() => window.PORTFOLIO.projects.flatMap(project => [project.cover, ...project.media.images.map(image => image.src)]).filter(name => !window.PORTFOLIO_IMAGE_SIZES[name])), [], 'all project images have intrinsic dimensions');
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
    assert.equal(new Set(cards.slice(0, 3).map(card => card.width)).size, 1, 'columns have equal widths');
    assert.ok(new Set(cards.map(card => card.height)).size > 1, 'images retain varied heights');
    assert.ok(cards.every(card => Math.abs(card.width / card.height - card.naturalRatio) < .02), 'images keep their natural proportions');
    assert.equal(new Set(cards.slice(0, 3).map(card => card.top)).size, 1, 'newest three projects lead each column');
    if (process.env.GALLERY_SCREENSHOT_DIR && !language) {
      await page.locator('#index-list > li').first().evaluate(el => el.scrollIntoView({ block: 'start', behavior: 'instant' }));
      await page.screenshot({ path: resolve(process.env.GALLERY_SCREENSHOT_DIR, 'gallery-desktop.png') });
    }
    const total = await page.locator('#index-list > li').count();
    assert.equal(await page.locator('#work-search').count(), 0, 'project search is removed');
    let checkedFilterMotion = false;
    for (const filter of await page.locator('[data-filter]').all()) {
      const key = await filter.getAttribute('data-filter');
      await filter.click();
      const expected = await page.evaluate(key => window.PORTFOLIO.projects.filter(p => key === 'all' || p.disciplines.includes(key)).length, key);
      await page.waitForFunction(({ key, expected }) => document.querySelector(`[data-filter="${key}"]`)?.getAttribute('aria-selected') === 'true' && document.querySelectorAll('#index-list > li:not([hidden])').length === expected, { key, expected });
      assert.equal(await page.locator('#index-list > li:not([hidden])').count(), expected);
      if (!language && key !== 'all' && !checkedFilterMotion) {
        assert.equal(await page.locator('#index-list').evaluate(list => list.getAnimations({ subtree: true }).length > 0), true, 'filter change animates cards');
        checkedFilterMotion = true;
      }
    }
    await page.evaluate(() => {
      const filters = [...document.querySelectorAll('[data-filter]')];
      filters[1].click(); filters[2].click(); filters[3].click();
    });
    await page.waitForFunction(() => document.querySelectorAll('#index-list > li:not([hidden])').length === 8 && !document.querySelector('#filters').hasAttribute('aria-busy'));
    assert.equal(await page.locator('#index > .row-link').count(), 0, 'filtering does not duplicate cards');
    assert.equal(await page.locator('#index-list > li:not([hidden])').evaluateAll(items => items.every(item => getComputedStyle(item).opacity === '1')), true, 'cards finish fully visible');
    await page.locator('[data-filter="all"]').click();
    await page.waitForFunction(() => document.querySelectorAll('#index-list > li:not([hidden])').length === 30 && !document.querySelector('#filters').hasAttribute('aria-busy'));
    await page.locator('[data-view="list"]').click();
    await page.locator('[data-filter]').nth(1).click();
    await page.waitForFunction(() => document.querySelectorAll('#index-list > li:not([hidden])').length === 12 && !document.querySelector('#filters').hasAttribute('aria-busy'));
    await page.locator('[data-filter="all"]').click();
    await page.waitForFunction(() => document.querySelectorAll('#index-list > li:not([hidden])').length === 30 && !document.querySelector('#filters').hasAttribute('aria-busy'));
    await page.locator('[data-view="grid"]').click();
    await page.locator('#index-list a[href="#/work/Neuroscape"]').click();
    await page.waitForFunction(() => !document.querySelector('#detail').hidden);
    assert.ok(await page.locator('.pd-hero img').getAttribute('srcset'));
    await page.locator('.pd-step a').last().click();
    await page.waitForTimeout(100);
    assert.equal(await page.evaluate(() => [...window.testObserved].filter(el => !el.isConnected).length), 0, 'no detached reveal observers');
    await page.goto(base + '/' + language + '#/work/%ZZ');
    await page.waitForFunction(() => location.hash === '#/index' && !document.querySelector('#home').hidden);
    await page.goto(base + '/' + language + '#/work/__proto__');
    await page.waitForFunction(() => location.hash === '#/index');
    assert.equal(await page.locator('#index-list > li:not([hidden])').count(), total);
    assert.equal(await page.locator('html').getAttribute('lang'), language ? 'en' : 'ko');
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://yebumko.com/');
    assert.equal(await page.locator('meta[property="og:image"]').getAttribute('content'), 'https://yebumko.com/assets/img/AllAllowed.webp');
    for (const projectId of ['FEELD', 'AllAllowed']) {
      await page.goto(base + '/' + language + '#/work/' + projectId);
      await page.waitForFunction(() => !document.querySelector('#detail').hidden);
      assert.ok(await page.locator('.pd-hero img').evaluate(img => img.complete && img.naturalWidth > 0), projectId + ' detail cover loads');
      if (projectId === 'FEELD') {
        await page.locator('.pd-gallery-open').first().click();
        await page.waitForFunction(() => document.querySelector('#gallery-viewer').open && document.querySelector('#gallery-viewer-image').naturalWidth > 0);
        assert.equal(await page.locator('#gallery-viewer-count').textContent(), '01 / 03');
        if (process.env.GALLERY_SCREENSHOT_DIR && !language) {
          await page.screenshot({ path: resolve(process.env.GALLERY_SCREENSHOT_DIR, 'project-gallery-viewer.png') });
        }
        await page.locator('[data-gallery-next]').click();
        assert.equal(await page.locator('#gallery-viewer-count').textContent(), '02 / 03');
        await page.keyboard.press('ArrowLeft');
        assert.equal(await page.locator('#gallery-viewer-count').textContent(), '01 / 03');
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('#gallery-viewer').evaluate(el => el.open), false);
      }
    }
  }
  const staticPage = await readFile(resolve(root, 'work', 'FEELD', 'index.html'), 'utf8');
  assert.match(staticPage, /<link rel="canonical" href="https:\/\/yebumko\.com\/work\/FEELD\/">/);
  assert.match(staticPage, /<main id="detail" class="view"><article/);
  assert.match(await readFile(resolve(root, 'sitemap.xml'), 'utf8'), /https:\/\/yebumko\.com\/work\/AllAllowed\//);
  await page.goto(base + '/work/FEELD/');
  await page.waitForFunction(() => !document.querySelector('#detail').hidden && document.querySelector('#pd-title')?.textContent === 'FEELD');
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://yebumko.com/work/FEELD/');
  assert.ok(await page.locator('.pd-hero img').evaluate(img => img.complete && img.naturalWidth > 0), 'clean project route loads the cover');
  if (process.env.GALLERY_SCREENSHOT_DIR) {
    await page.waitForTimeout(800);
    await page.screenshot({ path: resolve(process.env.GALLERY_SCREENSHOT_DIR, 'project-direct.png') });
  }
  await page.locator('#open-inquiry').click();
  assert.equal(await page.locator('#inquiry-note').count(), 0, 'instruction paragraph is removed');
  await page.locator('[name="title"]').fill('새 전시 비주얼');
  await page.locator('[name="introduction"]').fill('테스트 팀');
  await page.locator('[name="email"]').fill('hello@example.com');
  await page.locator('[name="content"]').fill('공연 비주얼 협업 문의입니다.');
  assert.equal(await page.locator('#inquiry-form').getAttribute('action'), 'https://formsubmit.co/koyebum1@naver.com');
  assert.equal(await page.locator('#inquiry-form').getAttribute('enctype'), 'multipart/form-data');
  assert.equal(await page.locator('#inquiry-subject').inputValue(), '[Portfolio] 새 전시 비주얼');
  assert.equal(await page.locator('#inquiry-replyto').inputValue(), 'hello@example.com');
  assert.equal(await page.locator('#inquiry-dialog').evaluate(dialog => dialog.open), true);
  if (process.env.GALLERY_SCREENSHOT_DIR) await page.screenshot({ path: resolve(process.env.GALLERY_SCREENSHOT_DIR, 'project-inquiry.png') });
  await page.locator('#inquiry-file').setInputFiles({ name: 'wrong.txt', mimeType: 'text/plain', buffer: Buffer.from('test') });
  await page.locator('#inquiry-submit').click();
  assert.match(await page.locator('#inquiry-status').textContent(), /PNG, JPG 또는 PDF/);
  assert.equal(await page.locator('#inquiry-dialog').evaluate(dialog => dialog.open), true, 'invalid attachment does not submit');
  await page.locator('#inquiry-file').setInputFiles({ name: 'oversize.png', mimeType: 'image/png', buffer: Buffer.alloc(10 * 1024 * 1024 + 1) });
  await page.locator('#inquiry-submit').click();
  assert.match(await page.locator('#inquiry-status').textContent(), /10MB/);
  await page.locator('#inquiry-file').setInputFiles({ name: 'reference.png', mimeType: 'image/png', buffer: Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]) });
  let submission;
  await page.route('https://formsubmit.co/koyebum1@naver.com', async route => {
    submission = { method: route.request().method(), contentType: route.request().headers()['content-type'], body: route.request().postDataBuffer().toString('utf8') };
    await route.fulfill({ status: 200, contentType: 'text/html', body: '<title>Mock FormSubmit</title>' });
  });
  await page.locator('#inquiry-submit').click();
  await page.waitForURL('https://formsubmit.co/koyebum1@naver.com');
  assert.equal(submission.method, 'POST');
  assert.match(submission.contentType, /^multipart\/form-data; boundary=/);
  assert.match(submission.body, /hello@example\.com/);
  assert.match(submission.body, /\[Portfolio\] 새 전시 비주얼/);
  assert.match(submission.body, /filename="reference\.png"/);
  await page.unroute('https://formsubmit.co/koyebum1@naver.com');
  await page.goto(base + '/work/AllAllowed/?lang=en');
  await page.waitForFunction(() => !document.querySelector('#detail').hidden);
  assert.equal(await page.locator('html').getAttribute('lang'), 'en');
  assert.equal(await page.locator('#inquiry-title').textContent(), 'Project inquiry');
  assert.equal(await page.locator('#inquiry-note').count(), 0);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base + '/');
  await page.waitForFunction(() => document.querySelector('#index-list').children.length > 0);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'no mobile overflow');
  await page.locator('#open-inquiry').click();
  assert.equal(await page.locator('#inquiry-dialog').evaluate(dialog => dialog.getBoundingClientRect().width <= innerWidth), true, 'inquiry fits mobile viewport');
  if (process.env.GALLERY_SCREENSHOT_DIR) await page.screenshot({ path: resolve(process.env.GALLERY_SCREENSHOT_DIR, 'project-inquiry-mobile.png') });
  await page.locator('.inquiry-close').click();
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
  await page.locator('[data-filter]').nth(1).evaluate(button => button.click());
  assert.equal(await page.locator('#index-list').evaluate(list => list.getAnimations({ subtree: true }).length), 0, 'reduced motion disables filter animation');
  await page.goto(base + '/#/work/FEELD');
  await page.locator('.pd-gallery-open').first().click();
  await page.waitForFunction(() => document.querySelector('#gallery-viewer-image').naturalWidth > 0);
  await page.locator('#gallery-viewer-image').evaluate(img => img.decode());
  if (process.env.GALLERY_SCREENSHOT_DIR) {
    await page.screenshot({ path: resolve(process.env.GALLERY_SCREENSHOT_DIR, 'project-gallery-viewer-mobile.png') });
  }
  await page.evaluate(() => {
    const stage = document.querySelector('.gallery-viewer-stage');
    const point = x => new Touch({ identifier: 1, target: stage, clientX: x, clientY: 300 });
    stage.dispatchEvent(new TouchEvent('touchstart', { bubbles: true, touches: [point(300)] }));
    stage.dispatchEvent(new TouchEvent('touchend', { bubbles: true, changedTouches: [point(180)] }));
  });
  assert.equal(await page.locator('#gallery-viewer-count').textContent(), '02 / 03', 'mobile swipe moves to the next image');
  await page.keyboard.press('Escape');
  assert.deepEqual(errors, []);
  console.log('PASS: KO/EN, project pages and metadata, intercepted FormSubmit POST, file validation, filters, image gallery, mobile layout, reduced motion; no runtime or CSP errors.');
} finally { await browser?.close(); server.close(); }
