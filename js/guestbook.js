/* Simple guestbook, retaining every existing note in the same collection. */
(function () {
  'use strict';
  const SDK = 'https://www.gstatic.com/firebasejs/12.15.0/';
  const config = {
    apiKey: 'AIzaSyA8onEy9P7irpJ1V1sufKl1JOabNZn7J1E',
    authDomain: 'portfolio2026-987e6.firebaseapp.com',
    projectId: 'portfolio2026-987e6',
    storageBucket: 'portfolio2026-987e6.firebasestorage.app',
    messagingSenderId: '606722676468',
    appId: '1:606722676468:web:afeb52c1b05ea2a444b0a1',
  };
  const $ = s => document.querySelector(s);
  const form = $('#gb-form'), message = $('#gb-message'), name = $('#gb-name');
  const wall = $('#gb-wall'), more = $('#gb-more'), submit = $('#gb-submit');
  const status = (text, kind = '') => { $('#gb-status').textContent = text; $('#gb-status').dataset.kind = kind; };
  let notes = [], shown = 9, user, api, ref;
  const count = () => { $('#gb-count').textContent = `${message.value.length} / 200`; };
  message.addEventListener('input', count);
  try { name.value = localStorage.getItem('gbNickname') || ''; } catch (_) {}
  function render() {
    $('#gb-total').textContent = `Guestbook · ${notes.length}`;
    wall.replaceChildren(...notes.slice(0, shown).map(d => {
      const li = document.createElement('li'); li.className = 'gb-card';
      const head = document.createElement('div'); head.className = 'gb-card-top';
      const author = document.createElement('strong'); author.textContent = d.nickname || 'Anonymous';
      const time = document.createElement('time'); time.className = 'mono dim';
      const date = d.createdAt?.toDate?.();
      if (date) { time.dateTime = date.toISOString(); time.textContent = new Intl.DateTimeFormat('ko-KR', {year:'numeric',month:'2-digit',day:'2-digit'}).format(date); }
      else time.textContent = '방금 전';
      const text = document.createElement('p'); text.className = 'gb-text'; text.textContent = d.message;
      head.append(author, time); li.append(head, text); return li;
    }));
    if (!notes.length) { const li = document.createElement('li'); li.className = 'gb-empty'; li.textContent = '첫 번째 인사를 남겨주세요.'; wall.append(li); }
    more.hidden = notes.length <= shown;
  }
  more.addEventListener('click', () => { shown += 9; render(); });
  Promise.all([import(SDK+'firebase-app.js'), import(SDK+'firebase-auth.js'), import(SDK+'firebase-firestore.js')])
    .then(async ([appModule, auth, fs]) => {
      api = fs;
      const app = appModule.initializeApp(config);
      ref = fs.collection(fs.getFirestore(app), 'guestbook');
      fs.onSnapshot(fs.query(ref, fs.orderBy('createdAt','desc')), snapshot => {
        notes = snapshot.docs.map(doc => doc.data()).filter(d => typeof d.message === 'string');
        render();
      }, () => { status('방명록을 불러오지 못했어요. 잠시 후 다시 열어주세요.', 'error'); });
      try { user = (await auth.signInAnonymously(auth.getAuth(app))).user; submit.disabled = false; status('남긴 글은 공개됩니다. 연락처 등 개인정보는 적지 말아주세요.'); }
      catch (_) { status('지금은 글을 남길 수 없어요. 잠시 후 다시 열어주세요.', 'error'); }
    }).catch(() => { status('연결하지 못했어요. 네트워크를 확인해 주세요.', 'error'); });
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (form.elements.website.value || !user || !api) return;
    const nickname = name.value.trim(), text = message.value.trim();
    if (!nickname || nickname.length > 20) { name.focus(); status('이름을 1–20자로 적어주세요.', 'error'); return; }
    if (!text || text.length > 200) { message.focus(); status('메시지를 1–200자로 적어주세요.', 'error'); return; }
    let last = 0;
    try { last = Number(localStorage.getItem('gbLastSentAt') || 0); } catch (_) {}
    const wait = Math.ceil((60000 - (Date.now() - last)) / 1000);
    if (wait > 0) return status(`${wait}초 뒤에 다시 남길 수 있어요.`, 'error');
    submit.disabled = true; status('남기는 중…');
    try {
      await api.addDoc(ref, {nickname, message:text, authorId:user.uid, createdAt:api.serverTimestamp()});
      try { localStorage.setItem('gbLastSentAt', String(Date.now())); localStorage.setItem('gbNickname', nickname); } catch (_) {}
      message.value = ''; count(); render(); status('남겨주셔서 고맙습니다.', 'ok');
    } catch (_) { status('저장하지 못했어요. 내용을 그대로 두었으니 다시 시도해 주세요.', 'error'); }
    finally { submit.disabled = false; }
  });
})();
