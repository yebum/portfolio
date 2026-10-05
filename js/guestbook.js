/* ════════════════════════════════════════════════════════════
   Guestbook — a wall of notes backed by Firebase (Firestore + anonymous auth).
   Same project & collection as the original portfolio, so earlier notes keep showing.
   Classic script + dynamic import(): works from a server AND when index.html is
   opened straight from disk (module <script src> is blocked on file://).
   ════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const SDK = 'https://www.gstatic.com/firebasejs/12.15.0/';
  // Firebase web config is public by design; access is enforced by firestore.rules.
  const firebaseConfig = {
    apiKey: 'AIzaSyA8onEy9P7irpJ1V1sufKl1JOabNZn7J1E',
    authDomain: 'portfolio2026-987e6.firebaseapp.com',
    projectId: 'portfolio2026-987e6',
    storageBucket: 'portfolio2026-987e6.firebasestorage.app',
    messagingSenderId: '606722676468',
    appId: '1:606722676468:web:afeb52c1b05ea2a444b0a1',
  };

  const TYPES = { note: '한마디', feedback: '피드백', collab: '협업 제안' };
  const PROMPTS = {
    note: '포트폴리오를 보고 든 생각을 한마디 남겨주세요.',
    feedback: '좋았던 점, 아쉬운 점, 더 보고 싶은 내용을 알려주세요.',
    collab: '어떤 협업을 생각하고 계신지 적어주세요. 연락처는 공개되니 메일로 보내주세요.',
  };
  const MAX = 200, PAGE = 9, FETCH = 120, COOLDOWN = 60000, TIMEOUT = 10000;
  const $ = (s, r = document) => r.querySelector(s);

  const root = $('#guestbook');
  if (!root) return;

  const D = window.PORTFOLIO || { projects: [] };
  const titleOf = Object.fromEntries(D.projects.map(p => [p.id, p.fullTitle]));
  const el = {
    form: $('#gb-form'), msg: $('#gb-message'), name: $('#gb-name'), project: $('#gb-project'),
    count: $('#gb-count'), submit: $('#gb-submit'), status: $('#gb-status'),
    wall: $('#gb-wall'), more: $('#gb-more'), live: $('#gb-live'), filters: $('#gb-filters'),
  };

  /* ── composer ─────────────────────────────────────── */
  el.project.innerHTML = '<option value="">포트폴리오 전체</option>' +
    D.projects.map(p => `<option value="${p.id}">${esc(p.fullTitle)}</option>`).join('');

  let type = 'note';
  function setType(t) {
    type = t in TYPES ? t : 'note';
    el.form.querySelectorAll('[data-gb-type]').forEach(b => b.setAttribute('aria-checked', String(b.dataset.gbType === type)));
    el.msg.placeholder = PROMPTS[type];
  }
  el.form.addEventListener('click', e => { const b = e.target.closest('[data-gb-type]'); if (b) setType(b.dataset.gbType); });
  setType('note');

  function updateCount() {
    const n = el.msg.value.length;
    el.count.textContent = `${n} / ${MAX}`;
    el.count.classList.toggle('is-over', n > MAX);
  }
  el.msg.addEventListener('input', updateCount);
  updateCount();
  // the composer opens up once someone starts writing
  const open = () => el.form.classList.add('is-open');
  el.msg.addEventListener('focus', open);

  try { const saved = localStorage.getItem('gbNickname'); if (saved) el.name.value = saved; } catch (e) { /* storage unavailable */ }

  function setStatus(text, kind = '') { el.status.textContent = text; el.status.dataset.kind = kind; }

  // opened from a project page ("이 작업, 어떻게 보셨나요?")
  window.addEventListener('guestbook:open', e => {
    const { project, kind } = e.detail || {};
    if (project && titleOf[project]) el.project.value = project;
    setType(kind || 'feedback');
    open();
    setTimeout(() => el.msg.focus({ preventScroll: true }), 350);
  });

  /* ── wall ─────────────────────────────────────────── */
  let all = [], filter = 'all', shown = PAGE;
  el.filters.addEventListener('click', e => {
    const b = e.target.closest('[data-gb-filter]');
    if (!b) return;
    filter = b.dataset.gbFilter; shown = PAGE; render();
  });
  el.more.addEventListener('click', () => { shown += PAGE; render(); });

  function render() {
    const counts = { all: all.length, note: 0, feedback: 0, collab: 0 };
    all.forEach(d => counts[d.t]++);
    el.filters.querySelectorAll('[data-gb-filter]').forEach(b => {
      b.setAttribute('aria-selected', String(b.dataset.gbFilter === filter));
      b.querySelector('sup').textContent = String(counts[b.dataset.gbFilter]).padStart(2, '0');
    });
    const list = filter === 'all' ? all : all.filter(d => d.t === filter);
    if (!list.length) {
      el.wall.innerHTML = `<li class="gb-empty">${filter === 'all' ? '아직 남겨진 글이 없어요. 첫 번째 글을 남겨주세요.' : '이 종류의 글은 아직 없어요.'}</li>`;
      el.more.hidden = true;
      return;
    }
    el.wall.replaceChildren(...list.slice(0, shown).map(card));
    el.more.hidden = list.length <= shown;
  }

  function card(d) {
    const li = document.createElement('li');
    li.className = 'gb-card';
    li.dataset.type = d.t;
    const top = document.createElement('div');
    top.className = 'gb-card-top';
    const tag = document.createElement('span');
    tag.className = 'gb-tag';
    tag.textContent = TYPES[d.t];
    const time = document.createElement('time');
    time.className = 'mono dim';
    time.textContent = d.date;
    top.append(tag, time);
    const text = document.createElement('p');
    text.className = 'gb-text';
    text.textContent = d.message;
    const foot = document.createElement('div');
    foot.className = 'gb-card-foot';
    const name = document.createElement('strong');
    name.textContent = d.nickname;
    foot.append(name);
    if (d.project && titleOf[d.project]) {
      const a = document.createElement('a');
      a.href = `#/work/${d.project}`;
      a.textContent = `on ${titleOf[d.project]} →`;
      foot.append(a);
    }
    li.append(top, text, foot);
    return li;
  }

  function skeleton() {
    el.wall.innerHTML = Array.from({ length: 3 }, () => '<li class="gb-card gb-card--ghost" aria-hidden="true"><span></span><span></span><span></span></li>').join('');
  }
  skeleton();

  /* ── Firebase ─────────────────────────────────────── */
  let user = null, ref = null, api = null, readOK = false;
  const isFile = location.protocol === 'file:';

  const slow = setTimeout(() => {
    if (readOK) return;
    setLive('off');
    setStatus(isFile
      ? '파일로 직접 연 페이지라 방명록 연결이 막혔을 수 있어요. 배포 주소나 로컬 서버(http://)로 열어주세요.'
      : '방명록 연결이 지연되고 있어요. 네트워크를 확인하거나 잠시 후 새로고침해주세요.', 'error');
  }, TIMEOUT);

  function setLive(state) { el.live.dataset.state = state; el.live.lastChild.textContent = state === 'on' ? 'Live' : state === 'off' ? 'Offline' : 'Connecting'; }
  setLive('wait');

  Promise.all([
    import(SDK + 'firebase-app.js'),
    import(SDK + 'firebase-auth.js'),
    import(SDK + 'firebase-firestore.js'),
  ]).then(([appMod, authMod, fs]) => {
    api = fs;
    const app = appMod.initializeApp(firebaseConfig);
    ref = fs.collection(fs.getFirestore(app), 'guestbook');

    // reads are public — show the wall even before sign-in finishes
    fs.onSnapshot(fs.query(ref, fs.orderBy('createdAt', 'desc'), fs.limit(FETCH)), snap => {
      readOK = true; clearTimeout(slow); setLive('on');
      all = snap.docs.map(doc => doc.data()).filter(d => d && d.message).map(d => ({
        message: d.message, nickname: d.nickname || 'Anonymous', project: d.project || '',
        t: d.type in TYPES ? d.type : 'note', date: fmt(d.createdAt),
      }));
      render();
    }, err => {
      console.error('Guestbook read failed:', err);
      setLive('off');
      el.wall.innerHTML = '<li class="gb-empty">글을 불러오지 못했어요. 잠시 후 새로고침해주세요.</li>';
    });

    return authMod.signInAnonymously(authMod.getAuth(app)).then(c => {
      user = c.user;
      el.submit.disabled = false;
      if (!el.status.dataset.kind) setStatus('남긴 글은 모두에게 공개되고, 수정·삭제는 할 수 없어요.');
    }).catch(err => {
      console.error('Anonymous sign-in failed:', err);
      setStatus(isFile
        ? '파일로 직접 열면 글쓰기가 제한돼요. 배포 주소나 로컬 서버(http://)에서 남겨주세요.'
        : `지금은 글을 남길 수 없어요 (${err.code || 'auth'}). 메일로 의견을 보내주세요.`, 'error');
    });
  }).catch(err => {
    console.error('Firebase SDK load failed:', err);
    clearTimeout(slow);
    setLive('off');
    el.wall.innerHTML = '<li class="gb-empty">방명록을 불러오지 못했어요.</li>';
    setStatus('Firebase에 연결하지 못했어요. 네트워크나 광고 차단 확장 프로그램을 확인해주세요.', 'error');
  });

  el.form.addEventListener('submit', async e => {
    e.preventDefault();
    if (el.form.elements.website.value) return; // honeypot
    const nickname = el.name.value.trim();
    const message = el.msg.value.trim();
    if (!user || !api) return setStatus('아직 연결 중이에요. 잠시 후 다시 시도해주세요.', 'error');
    if (!message || message.length > MAX) { el.msg.focus(); return setStatus(`메시지를 1–${MAX}자로 적어주세요.`, 'error'); }
    if (!nickname || nickname.length > 20) { open(); el.name.focus(); return setStatus('닉네임을 1–20자로 적어주세요.', 'error'); }
    let last = 0;
    try { last = Number(localStorage.getItem('gbLastSentAt') || 0); } catch (err) { /* storage unavailable */ }
    const wait = Math.ceil((COOLDOWN - (Date.now() - last)) / 1000);
    if (wait > 0) return setStatus(`연속 등록을 막기 위해 ${wait}초 뒤에 다시 남길 수 있어요.`, 'error');

    el.submit.disabled = true;
    setStatus('등록하는 중…');
    const base = { nickname, message, authorId: user.uid, createdAt: api.serverTimestamp() };
    const project = el.project.value;
    try {
      await api.addDoc(ref, { ...base, type, ...(project ? { project } : {}) });
      done(nickname);
    } catch (err) {
      // rules not yet updated for type/project → save in the original shape instead
      if (err && err.code === 'permission-denied') {
        try { await api.addDoc(ref, base); console.warn('Guestbook: saved without type/project — publish firestore.rules.'); done(nickname); return; }
        catch (err2) { console.error('Guestbook write failed:', err2); }
      } else console.error('Guestbook write failed:', err);
      setStatus(`등록하지 못했어요 (${(err && err.code) || 'error'}). 잠시 후 다시 시도해주세요.`, 'error');
    } finally {
      el.submit.disabled = false;
    }
  });

  function done(nickname) {
    try { localStorage.setItem('gbLastSentAt', String(Date.now())); localStorage.setItem('gbNickname', nickname); } catch (err) { /* storage unavailable */ }
    el.msg.value = '';
    updateCount();
    filter = 'all'; shown = PAGE;
    setStatus('등록됐어요. 소중한 의견 고마워요!', 'ok');
  }

  function fmt(ts) {
    if (!ts || !ts.toDate) return 'just now';
    const d = ts.toDate(), p = n => String(n).padStart(2, '0');
    return `${String(d.getFullYear()).slice(2)}.${p(d.getMonth() + 1)}.${p(d.getDate())}`;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
})();
