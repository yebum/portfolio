import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { runInNewContext } from 'node:vm';

const root = resolve(import.meta.dirname, '..');
const origin = 'https://yebumko.com';
const source = await readFile(resolve(root, 'js/data.js'), 'utf8');
const context = { window: {} };
runInNewContext(source, context, { filename: 'js/data.js', timeout: 1000 });
runInNewContext(await readFile(resolve(root, 'js/image-sizes.js'), 'utf8'), context, { filename: 'js/image-sizes.js', timeout: 1000 });
const projects = context.window.PORTFOLIO.projects;
const imageSizes = context.window.PORTFOLIO_IMAGE_SIZES;
const template = await readFile(resolve(root, 'index.html'), 'utf8');
const escape = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const excerpt = value => String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, 180);
const setMeta = (html, attribute, name, value) => html.replace(
  new RegExp(`(<meta ${attribute}="${name}" content=")[^"]*(">)`),
  (_, start, end) => start + escape(value) + end,
);

const urls = [origin + '/'];
for (const project of projects) {
  if (!/^[A-Za-z0-9-]+$/.test(project.id)) throw new Error(`Unsafe project ID: ${project.id}`);
  const url = `${origin}/work/${project.id}/`;
  const title = `${project.fullTitle} — Yebum Ko`;
  const description = excerpt(project.lead || project.context);
  const image = `${origin}/assets/img/${encodeURIComponent(project.cover)}.webp`;
  const structured = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'CreativeWork',
    name: project.fullTitle, description, image, url,
    dateCreated: project.year,
    creator: { '@type': 'Person', name: '고예범', url: origin + '/' },
  }).replace(/</g, '\\u003c');
  const staticStory = project.caseStudy
    ? ['problem', 'solution', 'result'].map(key => project.caseStudy[key]).filter(Boolean)
      .map(item => `<section><h2>${escape(item.summary)}</h2>${(item.body || []).map(line => `<p>${escape(line)}</p>`).join('')}</section>`).join('')
    : (project.sections || []).map(item => `<section><h2>${escape(item.label)}</h2><p>${escape(item.body)}</p></section>`).join('');
  const dimensions = imageSizes[project.cover];
  const small = imageSizes[`${project.cover}-sm`];
  const heroAttributes = dimensions ? ` width="${dimensions[0]}" height="${dimensions[1]}"${small ? ` srcset="/assets/img/${encodeURIComponent(project.cover)}-sm.webp ${small[0]}w, /assets/img/${encodeURIComponent(project.cover)}.webp ${dimensions[0]}w" sizes="100vw"` : ''}` : '';
  const staticDetail = `<article class="pd static-project" aria-labelledby="pd-title"><div class="pd-bar"><a class="back mono" href="/#/index">← Index</a></div><section class="pd-hero site-pad"><div class="card"><img src="/assets/img/${encodeURIComponent(project.cover)}.webp" alt="${escape(project.fullTitle)}"${heroAttributes} fetchpriority="high" decoding="async"><div class="hero-scrim" aria-hidden="true"></div><div class="hero-copy"><h1 class="display" id="pd-title">${escape(project.fullTitle)}</h1><p class="pd-ctx">${escape(project.context)}</p></div></div></section><div class="static-project-copy"><p class="pd-lead">${escape(project.lead)}</p>${staticStory}</div></article>`;
  let html = template
    // The home reel is hidden on direct project URLs; do not fetch its hero image.
    .replace(/(<img )src="assets\/img\/Neuroscape.webp" srcset=/, '$1data-src="assets/img/Neuroscape.webp" data-srcset=')
    .replace('<meta charset="UTF-8">', '<meta charset="UTF-8">\n  <base href="/">')
    .replace('<main id="home" class="view">', '<main id="home" class="view" hidden>')
    .replace('<main id="detail" class="view" hidden></main>', `<main id="detail" class="view">${staticDetail}</main>`)
    .replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`)
    .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url}">`)
    .replace(/<script type="application\/ld\+json">.*?<\/script>/, `<script type="application/ld+json">${structured}</script>`);
  html = setMeta(html, 'name', 'description', description);
  html = setMeta(html, 'property', 'og:type', 'article');
  html = setMeta(html, 'property', 'og:url', url);
  html = setMeta(html, 'property', 'og:title', title);
  html = setMeta(html, 'property', 'og:description', description);
  html = setMeta(html, 'property', 'og:image', image);
  if (!imageSizes[project.cover]) throw new Error(`Missing cover dimensions: ${project.cover}`);
  html = setMeta(html, 'property', 'og:image:width', imageSizes[project.cover][0]);
  html = setMeta(html, 'property', 'og:image:height', imageSizes[project.cover][1]);
  html = setMeta(html, 'property', 'og:image:alt', project.fullTitle);
  const dir = resolve(root, 'work', project.id);
  await mkdir(dir, { recursive: true });
  await writeFile(resolve(dir, 'index.html'), html.trimEnd() + '\n');
  urls.push(url);
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url => `  <url><loc>${url}</loc></url>`).join('\n')}\n</urlset>\n`;
await writeFile(resolve(root, 'sitemap.xml'), sitemap);
console.log(`Built ${projects.length} project pages and sitemap.xml`);
