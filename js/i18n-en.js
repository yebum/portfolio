/* English copy for the portfolio. The Korean source remains in data.js. */
(() => {
  'use strict';
  const english = new URLSearchParams(location.search).get('lang') === 'en';
  const toggle = document.getElementById('lang-toggle');
  const nextUrl = () => location.pathname + (english ? '' : '?lang=en') + (location.hash || '#/');
  toggle.href = nextUrl();
  toggle.setAttribute('aria-label', english ? '한국어로 전환' : 'Switch to English');
  addEventListener('hashchange', () => { toggle.href = nextUrl(); });
  toggle.addEventListener('click', event => {
    event.preventDefault();
    location.assign(nextUrl());
  });
  window.PORTFOLIO_LANG = english ? 'en' : 'ko';
  window.PORTFOLIO_T = (ko, en) => english ? en : ko;
  if (!english) return;

  document.documentElement.lang = 'en';
  const D = window.PORTFOLIO;
  const P = (title, context, lead, problem, solution, result, role) => ({
    title, context, lead, role,
    caseStudy: {
      problem: { summary: problem[0], body: [problem[1]] },
      solution: { summary: solution[0], body: [solution[1]] },
      result: { summary: result[0], body: [result[1]] },
    },
  });
  const artist = (name, track) => P(
    `XMF 2026 — ${name}`, 'XMF FESTIVAL · stage visual previews',
    `A collection of song-specific visual images and audio-reactive videos created for ${name}'s XMF 2026 stage.`,
    ['A distinct visual language for each song', `The stage needed visuals that followed the mood and rhythm of ${name}'s set.`],
    ['Images and audio-reactive motion', `I developed song-specific imagery and reactive video studies, including visuals for “${track}.”`],
    ['Stage previews and finished visual studies', 'The project brings the imagery and reactive clips together as a record of the proposed stage experience.'],
    'Stage visual design and audio-reactive video production'
  );
  const projects = {
    AllAllowed: P(
      'Allow All', 'Real-time audiovisual work · TouchDesigner',
      'An audiovisual work about people who hand over judgement, choices and finally every permission until they begin to resemble the machines they rely on. Repeated gestures and smooth surfaces give way to the warmth still left in the body.',
      ['What remains after we give away control?', 'The figures look human at first, but their joints, surfaces and repeated movements reveal people who have surrendered their decisions.'],
      ['A sequence of control and resistance', 'Walking bodies, falling figures, hands pressing against an unseen wall and bodies held by radiating lines become a purple audiovisual sequence. TouchDesigner scenes respond to musical beats through cuts, camera moves and light.'],
      ['A three-minute audiovisual film', 'From nearby, a crowd moves like a machine. From a distance, it resolves into one warm human silhouette. The work asks what we have allowed before that warmth disappears.'],
      'Visual concept and TouchDesigner production'
    ),
    'XMF2026-YOUNHA': artist('Younha', 'Password 486'),
    'XMF2026-LUCY': artist('LUCY', 'Flowering'),
    'XMF2026-hrtzwav': artist('HRTZWAV', 'mind'),
    'XMF2026-THEFIX': artist('THE FIX', 'Moonrise'),
    XMF2026: P(
      'XMF 2026 — HI-FI UN!CORN', 'XMF FESTIVAL · stage visual previews',
      'Stage visual previews for HI-FI UN!CORN at XMF 2026. Each song has its own atmosphere, shown both in a full-stage simulation and in close views of individual screens.',
      ['Many moods, one stage sequence', 'Each song called for a different palette and visual rhythm, while remaining legible across a wide performance stage.'],
      ['Song-by-song stage simulation', 'I designed distinct scenes and checked them in full-stage views and screen close-ups, refining colour, composition and transitions.'],
      ['A complete visual preview', 'The final collection shows how the song-specific visuals would appear on stage. These are simulations rather than footage from a live performance.'],
      'Lead visual direction for Korean artists and sound-interactive visual production'
    ),
    MATMI: P(
      'MATMI', '2026 Global Start-up Design Thinking Hackathon · Team 13 Hexagon',
      'MATMI helps travellers understand unfamiliar food before ordering. A menu scan leads to a 3D food preview, taste and texture details, ingredient warnings and a personal Taste Match score.',
      ['A translated name does not explain a meal', 'Travellers still need to search for photos, ingredients and reviews after translating a menu item.'],
      ['Scan, explore and compare', 'The team built a responsive web MVP with menu OCR, five 3D food models, preference matching and a community view. A separate Unity XR prototype explored a wearable interface.'],
      ['Working MVP and Grand Award', 'The end-to-end flow was deployed during the four-day hackathon and received the Grand Award.'],
      'Service planning, UX/UI design, web MVP development and Unity XR prototyping'
    ),
    TimeOfExtinction: P(
      'Jambinai — Time of Extinction', 'KALEIDOSCOPE · live audiovisual performance',
      'An audiovisual work made for Jambinai’s performance Time of Extinction. Visual motion extends the density and emotional arc of the music across the stage.',
      ['Make sound visible at stage scale', 'The piece needed to carry the music’s intensity and changing emotion on a large LED screen.'],
      ['Real-time visuals in TouchDesigner', 'An ink-storm visual system responds to the performance and ties image, rhythm and stage atmosphere together.'],
      ['Presented during the live performance', 'The visuals were shown on the LED screen as part of Jambinai’s stage production.'],
      'Audiovisual concept, production and live visuals'
    ),
    SilgamSujevi: P(
      'Silgam Sujebi', '2026 SUMMER WEEK AI+XR Competition',
      'A Unity 6 experience that recreates the memory of skipping stones on a Jeju beach. MediaPipe tracks an arm gesture so visitors can throw a virtual stone with their bodies.',
      ['Turn a remembered scene into an embodied experience', 'A conventional screen could show the beach but could not reproduce the physical feeling of throwing a stone.'],
      ['Gesture-controlled play', 'The prototype combines webcam motion tracking, a real-time 3D environment and an intuitive throwing gesture.'],
      ['Interactive game prototype', 'A working camera-based prototype connects the player’s movement to the virtual stone and water.'],
      'Concept, character assets and Unity game development'
    ),
    GetTheOceanSummerReady: P(
      'Get The Ocean Summer Ready', 'MAD STARS Young Stars Competition',
      'A campaign that asks whether the ocean is ready for summer too. It turns exercise and walking into repeatable everyday actions for marine protection.',
      ['Summer preparation overlooks the sea', 'People prepare themselves for summer, while the environmental cost to the coast can feel distant and overwhelming.'],
      ['WALKOUT: move for the ocean', 'The campaign reframes familiar movement as an accessible invitation to act for the marine environment.'],
      ['Campaign concept and presentation', 'The idea was developed into a visual board and film for the Young Stars competition.'],
      'Campaign strategy, concept and visual boards'
    ),
    BioAx: P(
      'Yeongyeol', 'Jeju Bio AX Hackathon',
      'A travel service that connects scattered Jeju bio-related places and activities into a personal route. It uses location, time and interests to suggest experiences around citrus, camellia, lava seawater and local food.',
      ['Valuable places remain disconnected', 'Bio-related places already exist across Jeju, but visitors rarely discover them as one coherent travel experience.'],
      ['Personalised routes through local resources', 'The mobile service links places and activities into itineraries tailored to a visitor’s context and interests.'],
      ['Mobile MVP and Excellence Award', 'The team completed a mobile service MVP and won an Excellence Award at the hackathon.'],
      'Project planning and front-end design'
    ),
    Neuroscape: P(
      'Neuroscape', '2026 BCM Academy AI X Media Startup Project',
      'An EEG-driven VR meditation experience designed around teachers’ short breaks. Live brainwave changes shape the motion and form of a personal immersive environment.',
      ['A break is not always restorative', 'Teachers may have short gaps in the day without a quiet space or an effective way to recover.'],
      ['A ten-minute responsive VR experience', 'VR reduces outside stimuli while EEG input drives generative media art for a different experience each time.'],
      ['Validated MVP and Gold Prize', 'The team built an EEG and VR recovery-content MVP; Neuroscape also received a MAD STARS Gold Prize.'],
      'Concept and interactive content development'
    ),
    BeyondTheCenter: P(
      'Beyond the Center', '2nd Immersive Exhibition',
      'An immersive media-art work about people and AI forming a shared ecosystem. A single point grows into synapses, urban networks and cosmic structures across a three-sided projection space.',
      ['Visualising a changing relationship with AI', 'The work asks how to show AI as something woven into daily life rather than a tool outside it.'],
      ['From a point to a universe', 'A four-part visual sequence expands small traces of behaviour into connected systems and then returns to its point of origin.'],
      ['Three-sided immersive installation', 'The sequence was completed as projection content for an exhibition environment.'],
      'Projection mapping and media-art production'
    ),
    XrStudio: P(
      'Orbit of Ruin', 'XR Studio Showcase',
      'A media-art interpretation of lust, violence and betrayal from Dante’s Divine Comedy. The three circles become stages in the collapse of a relationship.',
      ['Connect three circles into one story', 'The challenge was to make separate scenes feel like a continuous emotional progression.'],
      ['A three-act real-time visual system', 'Rising tension, recurring red eyes and changing graphic forms link desire to violence and betrayal.'],
      ['A completed real-time artwork', 'The final piece presents a cycle of emotional collapse through live media-art visuals.'],
      'Media-art concept and production'
    ),
    Invader: P(
      'Invader', 'Unity Programming',
      'A 3D arcade shooter that puts a monkey with bananas against drones. It explores Unity components, collisions, prefab spawning and game-state management in a complete play loop.',
      ['Make learned Unity systems work together', 'The project needed to become a coherent game rather than a collection of isolated programming exercises.'],
      ['A compact 90-second shooter', 'C# components structure movement, attacks, enemies and progression across three stages.'],
      ['Complete game loop', 'The finished game was selected as an outstanding department project for a joint presentation.'],
      'Game concept and Unity development'
    ),
    JalTayo: P(
      'JalTayo VR', 'Metaverse Service Developer Competition',
      'An educational VR experience that lets children practise using a bus safely. They wait, board, tap a transit card, press the stop bell and get off inside a virtual environment.',
      ['Safety lessons need practice', 'Watching instructions alone does not help inexperienced children remember the order of a bus journey.'],
      ['Learn by doing in VR', 'The experience follows the real sequence of a bus trip and lets children repeat each action.'],
      ['A full bus-ride learning experience', 'The prototype covers the journey from waiting at the stop to leaving the bus safely.'],
      'Concept and VR development'
    ),
    PiratesStorm: P(
      'Pirates Storm', 'Unity Programming',
      'A vertical 2D shooter in which a pirate ship breaks through a fleet, collects coins, defeats a boss and reaches a treasure chest.',
      ['Give the shooting loop a destination', 'The game was designed to go beyond score chasing with a clear adventure objective.'],
      ['Modular C# combat and progression', 'Separate components manage movement, enemies, combat, rewards and scene transitions.'],
      ['Playable start-to-finish journey', 'The completed game connects its intro, battles, boss and success scene.'],
      'Game concept and Unity development'
    ),
    TeamPL: P(
      'TeamPL!', '3rd COSS Startup Competition',
      'An AI-based collaboration platform for university group work. It helps absent members recover the context behind a meeting, not just its minutes.',
      ['Minutes miss the reasons behind decisions', 'Schedules and part-time jobs prevent every member from attending every group meeting.'],
      ['Restore the flow of a discussion', 'Four core functions and six MVP screens were designed around meeting context, decisions and task coordination.'],
      ['Defined MVP and Excellence Award', 'The concept was developed into a presentation-ready MVP and won an Excellence Award.'],
      'Service planning and presentation design'
    ),
    dndn: P(
      'Dundeun AI', 'Y-Startup',
      'An AI-assisted service designed to make short-form content creation and publishing easier for people with little production experience, while exploring new ways to earn from their work.',
      ['A high barrier to making short videos', 'Many middle-aged users are interested in content creation but find existing production tools difficult.'],
      ['A simpler AI-assisted workflow', 'The service guides users through making and uploading short videos in a small number of steps.'],
      ['Six-week proof of concept', 'The team surveyed 50 people and tested a channel that passed 10,000 views within five days.'],
      'UI/UX planning and design'
    ),
    CITY: P(
      'CITY: Civic Innovation Through You', 'NextGen Startup Challenge',
      'A civic participation platform for proposing, discussing and following up on urban issues. It aims to create a more useful dialogue between residents and public administration.',
      ['Civic feedback is often one-way', 'Conventional complaint channels rarely show how ideas develop or why a decision is made.'],
      ['Proposals, discussion and feedback', 'The concept brings resident ideas, community deliberation and administrative responses into one transparent flow.'],
      ['Resident response and third prize', 'In concept interviews, 61% of 18 residents responded positively; the project received third prize at NextGen.'],
      'Service planning and UX/UI design'
    ),
    Jeonger: P(
      'Jeonger', 'Think City 2026 Hackathon',
      'A community matching concept that connects older residents who need everyday help with neighbours who can provide it. It is rooted in jeong, the Korean idea of enduring human connection.',
      ['A gap in local elder support', 'An ageing population and more older people living alone create needs that formal services do not always meet.'],
      ['Neighbour-to-neighbour matching', 'The service model pairs practical help with opportunities for intergenerational contact.'],
      ['Community Impact Award', 'The hackathon project received the Community Impact Award.'],
      'Service concept and presentation design'
    ),
    toss: P(
      'Toss Securities Ad', '3D Motion Graphics',
      'A 3D motion-graphics advertisement that expresses Toss Securities’ message of “investing for everyone” through an approachable mobile interface and financial imagery.',
      ['Translate accessibility into motion', 'The brand message needed to feel understandable and welcoming rather than technical.'],
      ['Interface and 3D graphics in one flow', 'Phone screens, graphs and objects move through a continuous visual sequence.'],
      ['Selected department work', 'The finished ad was chosen as an outstanding project for a joint presentation.'],
      'Concept, production and presentation'
    ),
    sds: P(
      'Student Life in Switzerland', 'Content Design',
      'A web-service concept for students living in Switzerland to find practical local information and share experiences with one another.',
      ['Scattered information and isolation', 'International students can struggle to find trustworthy everyday guidance and community support.'],
      ['One place for daily student life', 'The interface combines living information, language exchange, community and a marketplace.'],
      ['Integrated web UI', 'Four functions were brought together in one coherent user flow.'],
      'Service concept, web design and presentation'
    ),
    supporters: P(
      'Superplay Supporters, Season 2', 'Superplay',
      'Card-news posts and videos introducing esports and gaming-culture spaces. The work conveys the atmosphere, experiences and brand identity of places fans can visit.',
      ['Convey a place from a distance', 'Online audiences need more than a location listing to imagine the feel of a gaming venue.'],
      ['Stories tailored to each format', 'Two card-news posts and three videos use different rhythms to introduce the spaces.'],
      ['Five pieces of place-focused content', 'The series introduced gaming-culture venues through visual stories shared online.'],
      'Visit, concept and content production'
    ),
    learncation: P(
      'Value Jeju, Together Jeju', 'Jeju Value & Learncation Hackathon',
      'A participatory travel concept combining Jeju’s environmental challenges with local culture. Visitors experience conservation and community life as part of the same journey.',
      ['Tourism can damage what it celebrates', 'Growing visitor numbers put pressure on local environments and communities.'],
      ['Participatory, sustainable travel', 'The programme combines environmental action with cultural activities rather than treating them separately.'],
      ['ESG travel model and Encouragement Award', 'The concept was proposed at the hackathon and received an Encouragement Award.'],
      'Programme planning and presentation design'
    ),
    hana: P(
      'Fill The [ ], Feel My [ ]', '3rd Hana Card Plate Design Competition',
      'A Young Premium Card concept that lets people express their tastes and feelings through the design of the card itself.',
      ['A card as a medium for self-expression', 'The challenge was to move beyond a purely functional view of a payment card.'],
      ['Fill and Feel', 'The concept invites users to fill a blank with their preferences and show how they feel.'],
      ['Competition entry', 'The Young Premium Card concept was submitted to the Hana Card Plate Design Competition.'],
      'Concept and card design'
    ),
    climate: P(
      'Climate Card Ad', '3D Motion Graphics',
      'A motion-graphics advertisement for Seoul’s Climate Card, a public-transport pass intended to encourage greener travel.',
      ['Show the value beyond the physical card', 'The policy needed a memorable story that connected the card to everyday movement.'],
      ['A character-led transformation', 'The Haechi character leads a playful sequence in which the card transforms and moves.'],
      ['Completed motion advertisement', 'The finished film brings Haechi and the Climate Card together in one visual story.'],
      'Concept and motion production'
    ),
    naver: P(
      'Naver Map Ad', 'Video Production',
      'An advertisement combining live-action footage and 2D graphics to communicate Naver Map’s features through the experience of finding a destination.',
      ['Show more than navigation', 'The film needed to express the everyday value of a map service, not merely demonstrate route finding.'],
      ['Live action with graphic overlays', 'The concept “Moments for a Destination” places map graphics over filmed scenes.'],
      ['Selected department work', 'The ad was chosen as an outstanding project for a joint presentation.'],
      'Concept, filming and editing'
    ),
    dmd: P(
      'DMD, Like the Universe', 'Design Planning',
      'A motion film about the character of Digital Media Design students. Survey responses were interpreted through MBTI patterns and developed into a cosmic visual metaphor for a large LED display.',
      ['Express a department’s identity at scale', 'The project sought a visual form for the personalities and interests found in a student survey.'],
      ['From survey to space imagery', 'A doodle-wall survey informed an INTP-like profile that became the basis for the film’s universe motif.'],
      ['Completed LED-wall film', 'The final signage piece turns the department’s character into an animated cosmic story.'],
      'Concept and motion production'
    ),
  };
  const awardNames = {
    '제주 바이오 AX 해커톤 우수상': 'Jeju Bio AX Hackathon · Excellence Award',
    'BCM Academy 창의상': 'BCM Academy · Creativity Award',
    '학과 우수작 연합PT': 'Outstanding Department Project',
    'COSS 스타트업 경진대회 우수상': 'COSS Startup Competition · Excellence Award',
    '런케이션 해커톤 장려상': 'Learncation Hackathon · Encouragement Award',
  };
  const hasKorean = value => /[가-힣]/.test(value || '');
  for (const p of D.projects) {
    const copy = projects[p.id];
    if (!copy) throw new Error(`Missing English project copy: ${p.id}`);
    p.title = copy.title;
    p.fullTitle = copy.title;
    p.context = copy.context;
    p.lead = copy.lead;
    p.caseStudy = copy.caseStudy;
    p.details = [
      { k: 'Project type', v: copy.context },
      { k: 'Role', v: copy.role },
    ];
    p.awards = p.awards.map(a => awardNames[a] || a);
    p.media.films.forEach((item, i) => {
      if (hasKorean(item.label)) item.label = `${copy.title} · Film ${String(i + 1).padStart(2, '0')}`;
    });
    p.media.decks.forEach((item, i) => {
      if (hasKorean(item.label)) item.label = `${copy.title} · Presentation ${String(i + 1).padStart(2, '0')} (Korean PDF)`;
    });
    p.media.images.forEach((item, i) => {
      if (hasKorean(item.label)) item.label = `${copy.title} · Image ${String(i + 1).padStart(2, '0')}`;
    });
    p.media.links.forEach((item, i) => {
      if (hasKorean(item.label)) item.label = `Project link ${i + 1}`;
    });
  }

  const set = (selector, copy) => {
    const el = document.querySelector(selector);
    if (el) el.textContent = copy;
  };
  const attr = (selector, name, copy) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(name, copy);
  };
  const staticCopy = {
    '#intro-title': 'Yebum Ko portfolio',
    '.intro-after-copy a': 'Explore all projects ↗',
    '.index .sec-head .sec-sub': 'Explore the work through images and key information. Browse by discipline or search for a project.',
    '.work-search .visually-hidden': 'Search projects',
    '#work-empty': 'No projects found. Try a different search term or discipline.',
    '.index-head span:nth-child(3)': 'Discipline',
    '.about-labels .dim': 'Yebum Ko',
    '#about-h': 'Every project has a language of its own.',
    '.about-body .sec-sub': 'I began in telecommunications engineering and moved into digital media design. I use an understanding of signals and systems to create images and interactions, balancing careful detail with a clear conceptual direction.',
    '.about-body .facts > div:nth-child(2) dd': 'Digital Media Design, Kaywon University of Art & Design',
    '.about-docs .chips a:first-child': 'Resume PDF (Korean) ↓',
    '.about-docs .chips a:last-child': 'Cover letter PDF (Korean) ↓',
    '.recognition .sec-head .sec-sub': 'Awards from advertising, hackathons, startup competitions and digital-art projects, with links to the related work and public sources.',
    '#gb-h': 'Leave a note.',
    '.gb-head .sec-sub': 'Share a thought after browsing the portfolio.',
    '.gb-name-field span': 'Name / nickname',
    '.gb-field:nth-child(2) span': 'Message',
    '#gb-status': 'Loading guestbook…',
    '#gb-submit': 'Post ↗',
    '.gb-bar .ctx': 'Newest first',
    '#gb-more': 'More posts',
    '.contact-body .sec-sub': 'I welcome opportunities in live and exhibition visuals, XR content, service design and full-time roles.',
    '.footer-line': 'Made by hand, between art and technology.',
    '.to-top': 'Back to top ↑',
    '[data-close]': 'Close',
  };
  Object.entries(staticCopy).forEach(([selector, copy]) => set(selector, copy));
  attr('meta[name="description"]', 'content', 'Yebum Ko portfolio — media art, XR, UX and motion at the intersection of art and technology.');
  attr('.showreel', 'aria-label', 'Featured project reel');
  attr('.showreel-timeline', 'aria-label', 'Choose a reel scene');
  attr('#filters', 'aria-label', 'Filter by discipline');
  attr('#work-search', 'placeholder', 'Search projects, disciplines or keywords');
  attr('#gb-name', 'placeholder', 'Up to 20 characters');
  attr('#gb-message', 'placeholder', 'Say hello or share a thought.');
  attr('.nav-menu', 'aria-label', 'Open navigation menu');
  document.querySelectorAll('.showreel-slide').forEach(slide => {
    const id = slide.getAttribute('href').split('/').pop();
    const copy = projects[id];
    if (!copy) return;
    set(`#${slide.id} .showreel-caption strong`, copy.title);
    set(`#${slide.id} .showreel-caption > span:last-child`, 'View project ↗');
    slide.setAttribute('aria-label', `View ${copy.title}`);
  });
  document.querySelectorAll('.showreel-timeline button').forEach((button, i) => {
    const slide = document.getElementById(`reel-slide-${i + 1}`);
    const title = slide.querySelector('.showreel-caption strong').textContent;
    button.setAttribute('aria-label', `Show ${title} scene`);
    button.querySelector('strong').textContent = title;
  });
  set('#showreel-now-title', document.querySelector('.showreel-slide.is-active .showreel-caption strong').textContent);

  D.disciplines.forEach(d => { d.ko = d.label; });
  const capabilityBodies = {
    media: 'Real-time audiovisuals in TouchDesigner, projection mapping and LED-wall content. I make images that work at the scale of live stages and exhibition spaces.',
    xr: 'VR learning, gesture-controlled games and EEG-responsive content built with Unity. Movement and live signals become part of the interface.',
    ux: 'From problem definition to service structure, interface design and presentation. I shape ideas into experiences that can be tested and used.',
    motion: '3D motion ads, brand campaigns, editorial cards and short-form video. I translate messages into movement.',
  };
  D.capabilities.forEach(c => { c.body = capabilityBodies[c.filter]; });
  D.education = [
    ['2023 — Present', 'Kaywon University of Art & Design', 'Digital Media Design'],
    ['2022', 'Jeju National University', 'Telecommunications Engineering'],
    ['2019 — 2021', 'Daegi High School', ''],
  ];
  D.experience = [
    ['2026', 'Realistic Media Competition · finalist', 'Convergence & Open Sharing System for Immersive Media'],
    ['2026', 'Lead Korean-artist visuals and sound-interactive production for XMF Festival', 'XMF FESTIVAL'],
    ['2026', 'Audiovisual production for Jambinai — Time of Extinction', 'KALEIDOSCOPE'],
    ['2026', 'YOUNG STARS Competition · finalist', 'MAD STARS'],
    ['2026', 'PRISM 2026 Convergence Startup Camp', 'Convergence & Open Sharing System for Immersive Media'],
    ['2026', 'MAP Public-Space Media Art Project', 'Hwaseong City Cultural Foundation'],
    ['2026', 'Ai.zip⑤ TouchDesigner', 'Iyo House'],
    ['2026', 'Immersive Media Social Living Lab PBL', 'Convergence & Open Sharing System for Immersive Media'],
    ['2026', '2nd Immersive Exhibition', 'Kaywon University of Art & Design'],
    ['2026', 'XR Studio Showcase', 'Chung-Ang University'],
    ['2026', 'Joint presentation of outstanding department work', 'Unity Programming'],
    ['2026', 'AI Product Planning Specialist, Level 1', 'MainContents Co., Ltd'],
    ['2026', 'Immersive Media COSS Supporters, Season 5', 'Convergence & Open Sharing System for Immersive Media'],
    ['2026', 'UI/UX team, Dundeun AI · Y-Startup Season 3', 'Y-Ventures'],
    ['2026', 'Keimyung University Winter Global Programme', 'Convergence & Open Sharing System for Immersive Media'],
    ['2026', 'Kyung Hee University Unity & Blender Programme', 'Convergence & Open Sharing System for Immersive Media'],
    ['2025', 'Superplay Supporters, Season 2', 'Superplay'],
    ['2025', 'Joint presentation of outstanding department work', 'Immersive Media Basics · Video Basics · 3D Motion Graphics'],
    ['2025', 'GTQ Photoshop & Illustrator, Level 1', 'Korea Productivity Center'],
  ];
  const awardCopy = {
    MATMI: ['2026 Global Start-up Design Thinking Hackathon', 'MATMI', 'Grand Award', 'Chosun Edu article'],
    Neuroscape: null,
    BioAx: ['Jeju Bio AX Hackathon', 'Yeongyeol', 'Excellence Award', 'Event announcement'],
    TeamPL: ['“Let’s Go!” COSS Startup Competition', 'TeamPL!', 'Excellence Award', 'Money Today article'],
    CITY: ['NextGen Startup Challenge', 'CITY', 'Third Prize', 'Project listing'],
    Jeonger: ['Think City Hackathon 2026', 'Jeonger', 'Community Impact Award', 'Devpost project'],
    learncation: ['Jeju Value & Learncation Hackathon', 'Value Jeju, Together Jeju', 'Encouragement Award', 'Jeju press release'],
  };
  D.awards.forEach(a => {
    let copy = awardCopy[a.id];
    if (a.id === 'Neuroscape') copy = a.title.includes('MAD STARS')
      ? ['MAD STARS', 'Neuroscape', 'Gold Prize', 'MAD STARS website']
      : ['2026 BCM Academy AI X Media Startup Project', 'Neuroscape', 'Creativity Award', 'BCM Academy post'];
    if (copy) [a.title, a.project, a.prize, a.sourceLabel] = copy;
    else if (!a.id) [a.title, a.project, a.prize, a.sourceLabel] =
      ['Korea Game Society × Nexon Games National Student Digital Art Competition', 'Texture of White', 'Special Selection', 'Award winners PDF'];
  });

  const metricCopy = {
    BioAx: {
      title: 'Data analysis and model performance',
      source: 'Presentation pp. 3, 10 · public tourism and certified-company data',
      groups: [
        ['Public-data analysis', 'Evidence for the problem', [
          ['Popular attractions with a bio-related point of interest within 3 km'],
          ['Lower median views of bio-related points of interest than top attractions', '52.5×'],
          ['Average share of new Visit Jeju content related to bio resources, 2016–2025'],
        ]],
        ['AI route recommendation model', 'CatBoost Regressor · random search · 10-fold cross-validation', [
          ['Recall@10 for the top ten recommended points of interest'],
        ]],
      ],
    },
    Neuroscape: {
      title: 'Validation results',
      source: 'Presentation p. 9 · interviews with teachers and education staff',
      groups: [
        ['Participants and problem intensity', 'Problem–customer fit validation', [
          ['Teachers', '20+'], ['Education staff', '5+'], ['Pain score — work stress and need for recovery'],
        ]],
        ['Response rates', 'As reported in the presentation', [
          ['Problem resonance', null, 'Lack of a restorative space at work'],
          ['Willingness to pay', null, 'Budget or adoption potential'],
          ['Early adopters', null, 'Interest in an early trial'],
        ]],
      ],
    },
    dndn: {
      title: 'Six-week field test',
      source: 'Presentation pp. 8–10 · team validation',
      groups: [
        ['Middle-aged user survey', 'Google Forms survey, 50 respondents', [
          ['Need an integrated AI tool'], ['Willing to pay'], ['Have considered a side business'], ['Find AI hard to use'],
        ]],
        ['YouTube channel proof of concept', 'Channel launched and videos made with Dundeun AI over five days', [
          ['Views within five days', '10,000+'], ['Time to make one video', 'Under 10 min'],
        ]],
        ['In-person workshop', 'Participants from partner Middle-aged YouTube School', [
          ['Time until all seats were filled', '24 hours'], ['Time to publish a participant video', '1 hour'],
        ]],
      ],
    },
    CITY: {
      title: 'Resident validation',
      source: 'Presentation pp. 3, 31',
      groups: [
        ['Evidence for the problem', 'Citizen survey cited in the presentation', [
          ['Citizens who felt public agencies did not value their opinions'],
        ]],
        ['Response to the concept', '18 residents · short interviews after a concept explanation', [
          ['Positive', null, 'Transparent progress and incentives to participate'],
          ['Neutral', null, 'Questions about staffing, continuity and incentives'],
          ['Negative', null, 'Concerns about vote manipulation, privacy and fatigue'],
        ]],
      ],
    },
  };
  for (const p of D.projects) {
    const copy = metricCopy[p.id];
    if (!copy || !p.metrics) continue;
    p.metrics.title = copy.title;
    p.metrics.source = copy.source;
    p.metrics.groups.forEach((g, gi) => {
      const [label, sample, items] = copy.groups[gi];
      g.label = label; g.sample = sample;
      g.items.forEach((item, ii) => {
        const [itemLabel, value, sub] = items[ii];
        item.label = itemLabel;
        if (value) item.value = value;
        if (sub) item.sub = sub;
      });
    });
  }
})();
