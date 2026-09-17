// Full-page screenshots through Chrome DevTools Protocol with real device emulation.
// usage: node cdp-shot.mjs <name> <width> <url> [mobile=0|1] [evalBeforeShot]
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const [name, width, url, mobile = '0', pre = ''] = process.argv.slice(2);
const here = dirname(fileURLToPath(import.meta.url));
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const port = 9300 + Math.floor(Math.random() * 400);
const profile = join(here, 'cdp-profile-' + port);
const proc = spawn(EDGE, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--window-size=1920,1080', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));

let ws, id = 0;
const pending = new Map();
const send = (method, params = {}, sessionId) => new Promise((res, rej) => {
  const msg = { id: ++id, method, params }; if (sessionId) msg.sessionId = sessionId;
  pending.set(msg.id, { res, rej }); ws.send(JSON.stringify(msg));
});

try {
  let ver;
  for (let i = 0; i < 50 && !ver; i++) { try { ver = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json(); } catch { await sleep(200); } }
  ws = new WebSocket(ver.webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener('open', r));
  ws.addEventListener('message', ev => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(m.error.message)) : p.res(m.result); }
  });
  const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
  const W = +width, H = mobile === '1' ? 844 : 900;
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: mobile === '1' }, sessionId);
  if (mobile === '1') {
    await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 }, sessionId);
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'hover', value: 'none' }, { name: 'pointer', value: 'coarse' }] }, sessionId);
  }
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }, ...(mobile === '1' ? [{ name: 'hover', value: 'none' }, { name: 'pointer', value: 'coarse' }] : [])] }, sessionId);
  await send('Page.enable', {}, sessionId);
  await send('Runtime.enable', {}, sessionId);
  await send('Page.navigate', { url }, sessionId);
  await sleep(2500);
  // scroll through the page so lazy images and reveals fire
  const ev = async expr => (await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }, sessionId)).result.value;
  await ev(`(async()=>{const s=ms=>new Promise(r=>setTimeout(r,ms));for(let y=0;y<document.documentElement.scrollHeight;y+=600){scrollTo(0,y);await s(60)}scrollTo(0,0);await s(300);document.querySelectorAll('[data-reveal]').forEach(e=>e.classList.add('in'));return 1})()`);
  if (pre) await ev(pre);
  await sleep(1200);
  const info = await ev(`({dbg:[getComputedStyle(document.querySelector(".nav-links")).fontSize,getComputedStyle(document.querySelector(".nav-links")).position,matchMedia("(max-width: 820px)").matches,innerWidth,outerWidth],h:document.documentElement.scrollHeight,sw:document.documentElement.scrollWidth,iw:innerWidth,wide:[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.right>${width}+1&&!e.closest('.filters,.hero-slide,.index-preview')&&!(e.parentElement&&e.parentElement.getBoundingClientRect().right>${width}+1)}).slice(0,8).map(e=>e.tagName+'.'+e.className.toString().slice(0,30)+' w'+Math.round(e.getBoundingClientRect().width)+' r'+Math.round(e.getBoundingClientRect().right)),broken:[...document.images].filter(i=>i.complete&&i.naturalWidth===0&&i.getAttribute('src')).map(i=>i.src)})`);
  const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: W, height: info.h, scale: 1 } }, sessionId);
  mkdirSync(join(here, 'shots'), { recursive: true });
  const out = join(here, 'shots', `${name}-full.png`);
  writeFileSync(out, Buffer.from(shot.data, 'base64'));
  console.log(JSON.stringify({ out, ...info }));
} finally {
  try { ws && ws.close(); } catch {}
  proc.kill();
  await sleep(500);
  try { rmSync(profile, { recursive: true, force: true }); } catch {}
}
