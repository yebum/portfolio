import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_PATH || 'playwright');
const server = createServer(async (req, res) => {
  try {
    const path = resolve('.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname).replace(/\/$/, '/index.html'));
    res.setHeader('Content-Type', ({'.js':'text/javascript','.css':'text/css','.html':'text/html','.webp':'image/webp','.png':'image/png'})[extname(path)] || 'application/octet-stream');
    res.end(await readFile(path));
  } catch { res.writeHead(404).end(); }
});
await new Promise(done => server.listen(0, '127.0.0.1', done));
const browser = await chromium.launch({ channel:'msedge', headless:true });
try {
  const page = await browser.newPage({viewport:{width:1440,height:1000}});
  await page.addInitScript(() => {
    window.asciiFrames = 0;
    const raf = window.requestAnimationFrame;
    window.requestAnimationFrame = callback => {
      const ascii = new Error().stack.includes('ascii-background.js');
      return raf.call(window, now => { if (ascii) window.asciiFrames++; callback(now); });
    };
  });
  const base = `http://127.0.0.1:${server.address().port}`;
  await page.goto(base);
  await page.locator('.ascii-background').waitFor();
  await page.waitForTimeout(500);
  const start = await page.evaluate(() => window.asciiFrames);
  await page.waitForTimeout(1200);
  const fps = Math.round((await page.evaluate(() => window.asciiFrames) - start) / 1.2);
  const initialReelImages = await page.locator('.showreel-slide img[src]').count();
  await page.locator('#index').evaluate(el => el.scrollIntoView({behavior:'instant'}));
  await page.waitForTimeout(500);
  await page.evaluate(() => {
    window.arrivalWrites = 0;
    new MutationObserver(records => { window.arrivalWrites += records.length; }).observe(document.querySelector('.arrival-copy'), {attributes:true,attributeFilter:['style']});
  });
  for (let i = 0; i < 5; i++) { await page.evaluate(() => scrollBy(0, 100)); await page.waitForTimeout(80); }
  const offscreenArrivalWrites = await page.evaluate(() => window.arrivalWrites);
  const requests = [];
  page.on('request', req => { if (req.resourceType() === 'image') requests.push(req.url()); });
  await page.goto(base + '/work/AllAllowed/');
  await page.waitForTimeout(800);
  const hiddenReelImages = requests.filter(url => /\/(Neuroscape|FEELD)(-sm)?\.webp/.test(url));
  console.log(JSON.stringify({asciiCallbacksPerSecond:fps, initialReelImages, offscreenArrivalWrites, hiddenReelImages}, null, 2));
  if (process.env.CHECK_PERFORMANCE) {
    assert.ok(fps <= 20, 'background should not wake on every display frame');
    assert.equal(initialReelImages, 1, 'only the first reel image is warmed before scrolling');
    assert.equal(offscreenArrivalWrites, 0, 'scrolling after the entrance does not rewrite its styles');
    assert.equal(hiddenReelImages.length, 0, 'detail pages do not download hidden reel images');
    await page.emulateMedia({reducedMotion:'reduce'});
    const still = await page.locator('.ascii-background').evaluate(el => el.toDataURL());
    await page.waitForTimeout(250);
    assert.equal(await page.locator('.ascii-background').evaluate(el => el.toDataURL()), still);
    await page.getByRole('link', { name:'Yebum Ko — home', exact:true }).click();
    await page.waitForFunction(() => document.querySelector('.showreel-slide.is-active img').naturalWidth > 0);
    const mobile = await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844},deviceScaleFactor:1});
    const staticPage = await mobile.newPage();
    await staticPage.goto(base + '/work/Neuroscape/');
    const hero = staticPage.locator('.static-project .pd-hero img');
    assert.match(await hero.evaluate(el => el.currentSrc), /Neuroscape-sm.webp$/, 'mobile static hero selects small source before JS');
    assert.ok(Number(await hero.getAttribute('width')) > 0, 'static hero reserves image dimensions');
    await mobile.close();
  }
} finally { await browser.close(); server.close(); }
