const fs = require('fs');
const path = require('path');
const P = require('./projects.json');
const ROOT = path.join(__dirname, '..');
const METRICS = require('./metrics.json');

const DISC = {
  TimeOfExtinction: 'media', BeyondTheCenter: 'media', XrStudio: 'media', Neuroscape: 'media', dmd: 'media',
  SilgamSujevi: 'xr', JalTayo: 'xr', Invader: 'xr', PiratesStorm: 'xr',
  BioAx: 'ux', TeamPL: 'ux', dndn: 'ux', CITY: 'ux', Jeonger: 'ux', sds: 'ux', learncation: 'ux',
  GetTheOceanSummerReady: 'motion', toss: 'motion', climate: 'motion', naver: 'motion', supporters: 'motion', hana: 'motion',
};
const AWARD = {
  Neuroscape: ['MAD STARS Gold Prize', 'BCM Academy 창의상'],
  BioAx: ['제주 바이오 AX 해커톤 우수상'],
  TeamPL: ['COSS 스타트업 경진대회 우수상'],
  CITY: ['NextGen Startup Challenge 3rd Prize'],
  Jeonger: ['Think City Hackathon 2nd Prize'],
  learncation: ['런케이션 해커톤 장려상'],
  PiratesStorm: ['학과 우수작 연합PT'],
  Invader: ['학과 우수작 연합PT'],
  toss: ['학과 우수작 연합PT'],
  naver: ['학과 우수작 연합PT'],
};
const FULL = {
  TimeOfExtinction: '잠비나이 — 소멸의시간', sds: '스대살: 스위스에서 대학생으로 살아남기',
  CITY: 'CITY: Civic Innovation Through You', GetTheOceanSummerReady: 'Get The Ocean Summer Ready',
  PiratesStorm: 'Pirates Storm', hana: 'Fill The [ ], Feel My [ ]',
};
const COVER = { CITY: 'CITY01', GetTheOceanSummerReady: 'GetTheOceanSummerReady' };

const driveId = u => (u.match(/\/d\/([^/]+)/) || [])[1];
const ytId = u => (u.match(/youtu\.be\/([^?]+)/) || u.match(/v=([^&]+)/) || [])[1];
const imgName = s => s.replace(/^img\//, '').replace(/\.(png|jpe?g)$/i, '');
const generic = l => /^(img|pdf\d*|video\d*|CITY\d+)$/i.test(l || '');

const projects = Object.entries(P).map(([id, p]) => {
  const media = { films: [], decks: [], images: [], links: [] };
  for (const m of p.media || []) {
    const label = generic(m.label) ? '' : m.label;
    if (m.type === 'img') media.images.push({ src: imgName(m.src), label });
    else if (m.type === 'youtube') media.films.push({ kind: 'youtube', id: ytId(m.src), label });
    else if (m.type === 'video') media.films.push({ kind: 'drive', id: driveId(m.src), label });
    else if (m.type === 'pdf') media.decks.push({ id: driveId(m.src), label });
    else if (m.type === 'web') media.links.push({ href: m.src, label: m.label === 'web' ? 'Live website' : m.label });
  }
  if (fs.existsSync(path.join(ROOT, 'assets/img', id + '-success.webp')) && !media.images.some(i => i.src === id + '-success'))
    media.images.push({ src: id + '-success', label: 'Success' });
  const cover = COVER[id] ||(media.images[0] && media.images[0].src) || id;
  // Problem / Solution / Result rewrite lives in _work/psr/<id>.json (falls back to the original sections)
  const psrFile = path.join(__dirname, 'psr', id + '.json');
  const caseStudy = fs.existsSync(psrFile) ? (({ problem, solution, result }) => ({ problem, solution, result }))(JSON.parse(fs.readFileSync(psrFile, 'utf8'))) : null;
  // verified numbers from the decks (only projects that have them)
  const metrics = METRICS[id] || null;
  const details = p.details.map(d => ({ ...d, v: d.v.replace('Cladue', 'Claude') }));
  return {
    id, title: p.title, fullTitle: FULL[id] || p.title, context: p.cat, year: p.year,
    discipline: DISC[id], awards: AWARD[id] || [], cover,
    lead: p.desc1, ...(metrics ? { metrics } : {}), ...(caseStudy ? { caseStudy } : { lead2: p.desc2 || '', sections: p.sections }), details, media,
  };
});

const data = {
  projects,
  featured: ['TimeOfExtinction', 'Neuroscape', 'BeyondTheCenter', 'SilgamSujevi'],
  disciplines: [
    { key: 'media', label: 'Media Art', ko: '미디어아트 · 오디오비주얼' },
    { key: 'xr', label: 'XR · Game', ko: 'XR · 인터랙티브 게임' },
    { key: 'ux', label: 'UX · Service', ko: '서비스 기획 · UX/UI' },
    { key: 'motion', label: 'Motion · Campaign', ko: '모션그래픽 · 캠페인' },
  ],
  awards: [
    { year: '2026', title: '부산국제마케팅광고제 MAD STARS', prize: 'Gold Prize', project: 'Neuroscape', id: 'Neuroscape' },
    { year: '2026', title: '제주 바이오 AX 해커톤', prize: '우수상', project: '연결', id: 'BioAx' },
    { year: '2026', title: '2026 BCM Academy AI X Media Startup Project', prize: '창의상', project: 'Neuroscape', id: 'Neuroscape' },
    { year: '2026', title: '"Let\'s Go!" COSS 스타트업 경진대회', prize: '우수상', project: '팀플!', id: 'TeamPL' },
    { year: '2026', title: '한국게임학회 × 넥슨게임즈 전국 대학생 디지털 아트 공모전', prize: '특선', project: '백색의 결', id: null },
    { year: '2026', title: 'NextGen Startup Challenge', prize: '3rd Prize', project: 'CITY', id: 'CITY' },
    { year: '2026', title: 'Think City Hackathon 2026', prize: 'Community Impact · 2nd', project: 'Jeonger', id: 'Jeonger' },
    { year: '2025', title: '제주가치 공감 런케이션 해커톤', prize: '장려상', project: '가치 제주, 고치 제주', id: 'learncation' },
  ],
  experience: [
    ['2026', '잠비나이 — 소멸의시간 오디오비주얼 제작', 'KALEIDOSCOPE : 만화경'],
    ['2026', '실감미디어 경진대회 본선 진출', '실감미디어 혁신융합대학사업단'],
    ['2026', 'YOUNG STARS 경진대회 본선 진출', '부산국제마케팅광고제'],
    ['2026', '융합창업캠프 PRISM 2026', '실감미디어 혁신융합대학사업단'],
    ['2026', '2026 공공공간 미디어아트 프로젝트 MAP', '화성시문화관광재단'],
    ['2026', 'Ai.zip⑤ TouchDesigner', '이요하우스'],
    ['2026', '소셜리빙랩 실감미디어 PBL', '실감미디어 혁신융합대학사업단'],
    ['2026', '제2회 이머시브 전시회', '계원예술대학교'],
    ['2026', 'XR스튜디오 쇼케이스', '중앙대학교'],
    ['2026', '학과 우수작 연합PT', '유니티 프로그래밍'],
    ['2026', 'AI프로덕트 기획전문가 1급', 'MainContents Co., Ltd'],
    ['2026', '실감미디어 COSS 서포터즈 5기', '실감미디어 혁신융합대학사업단'],
    ['2026', "Y-Startup 3기 '든든AI' UI/UX 팀", 'Y-Ventures'],
    ['2026', '계명대 동계 글로벌 프로그램 수료', '실감미디어 혁신융합대학사업단'],
    ['2026', '경희대 Unity · Blender 비교과 프로그램 수료', '실감미디어 혁신융합대학사업단'],
    ['2025', '슈퍼플레이 서포터즈 2기', '슈퍼플레이'],
    ['2025', '학과 우수작 연합PT', '실감미디어기초 · 영상기초 · 3D모션그래픽스'],
    ['2025', 'GTQ 포토샵 · 일러스트 1급', '한국생산성본부'],
  ],
  education: [
    ['2023 — Present', '계원예술대학교', '디지털미디어디자인과'],
    ['2022', '제주대학교', '통신공학과'],
    ['2019 — 2021', '대기고등학교', ''],
  ],
  capabilities: [
    { n: '01', title: 'Media Art', body: 'TouchDesigner 기반 실시간 오디오비주얼, 프로젝션 매핑, LED 월 콘텐츠. 공연장과 전시 공간의 스케일에서 작동하는 이미지를 만듭니다.', tools: 'TouchDesigner · MadMapper · Suno', cover: 'TimeOfExtinction-TouchDesigner', pos: '30% 50%' },
    { n: '02', title: 'XR & Interaction', body: 'Unity로 만드는 VR 교육, 모션 인식 게임, EEG 반응형 콘텐츠. 몸의 움직임과 신호가 곧 인터페이스가 되는 경험.', tools: 'Unity · C# · MediaPipe · Blender', cover: 'SilgamSujevi' },
    { n: '03', title: 'UX & Service', body: '문제 정의부터 서비스 구조, 화면 설계, 발표까지. 해커톤과 창업 경진대회에서 아이디어가 실제로 작동하는 방식을 설계합니다.', tools: 'Figma · HTML/CSS/JS · Python', cover: 'BioAx' },
    { n: '04', title: 'Motion & Campaign', body: '3D 모션그래픽 광고, 브랜드 캠페인, 카드뉴스와 숏폼 영상. 메시지를 움직임으로 번역합니다.', tools: 'Blender · After Effects · Premiere Pro', cover: 'hana', pos: '72% 50%' },
  ],
};

fs.writeFileSync(path.join(ROOT, 'js/data.js'),
  '/* Generated from github.com/yebum/portfolio2026 (main.js PROJECTS) — edit freely. */\nwindow.PORTFOLIO = ' + JSON.stringify(data, null, 2) + ';\n');
console.log('projects', projects.length, 'missing disc', projects.filter(p => !p.discipline).map(p => p.id));
for (const p of projects) if (!fs.existsSync(path.join(ROOT, 'assets/img', p.cover + '.webp'))) console.log('NO COVER', p.id);
console.log('case studies', projects.filter(p => p.caseStudy).length, '/', projects.length);
console.log(projects.map(p => `${p.id}: F${p.media.films.length} D${p.media.decks.length} I${p.media.images.length} L${p.media.links.length} [${p.media.films.map(f => f.label).join('|')}]`).join('\n'));
