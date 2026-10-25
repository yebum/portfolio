(() => {
  'use strict';
  const dialog = document.getElementById('inquiry-dialog');
  const form = document.getElementById('inquiry-form');
  const fileInput = document.getElementById('inquiry-file');
  const status = document.getElementById('inquiry-status');
  const submit = document.getElementById('inquiry-submit');
  const english = window.PORTFOLIO_LANG === 'en';
  const labels = english
    ? { title: 'Project title', content: 'Project details', introduction: 'Name / team', email: 'Reply email', phone: 'Phone', type: 'Project type', schedule: 'Schedule', budget: 'Budget' }
    : { title: '프로젝트 제목', content: '프로젝트 상세 내용', introduction: '이름 / 팀', email: '회신받을 이메일', phone: '연락처', type: '프로젝트 유형', schedule: '희망 일정', budget: '예산' };
  const fields = ['title', 'content', 'introduction', 'email', 'phone', 'type', 'schedule', 'budget'];
  const setStatus = (message, error = false) => {
    status.textContent = message;
    status.classList.toggle('is-error', error);
  };
  const values = () => Object.fromEntries(new FormData(form));
  const subject = () => `[Portfolio] ${form.elements.namedItem('title').value.trim() || (english ? 'Project inquiry' : '프로젝트 문의')}`;
  const updateHeaders = () => {
    document.getElementById('inquiry-subject').value = subject();
    document.getElementById('inquiry-replyto').value = form.elements.namedItem('email').value.trim();
  };
  const validFile = () => {
    const file = fileInput.files[0];
    if (!file) return true;
    if (!['image/png', 'image/jpeg', 'application/pdf'].includes(file.type)) {
      setStatus(english ? 'Please choose a PNG, JPG or PDF file.' : 'PNG, JPG 또는 PDF 파일을 선택해 주세요.', true);
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      setStatus(english ? 'The attachment must be 10 MB or smaller.' : '첨부파일은 10MB 이하여야 합니다.', true);
      return false;
    }
    return true;
  };
  document.getElementById('open-inquiry').addEventListener('click', () => { setStatus(''); updateHeaders(); dialog.showModal(); form.elements.namedItem('title').focus(); });
  dialog.querySelector('.inquiry-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  form.addEventListener('input', () => { updateHeaders(); setStatus(''); });
  fileInput.addEventListener('change', () => { setStatus(''); validFile(); });
  form.addEventListener('submit', event => {
    if (!validFile()) { event.preventDefault(); fileInput.focus(); return; }
    updateHeaders();
    submit.disabled = true;
    setStatus(english ? 'Opening secure submission…' : '보안 전송 페이지로 이동 중…');
  });
  addEventListener('pageshow', () => { submit.disabled = false; });
  document.getElementById('copy-inquiry').addEventListener('click', async () => {
    if (!form.reportValidity()) return;
    const data = values();
    const body = fields.map(field => `${labels[field]}: ${data[field] || '—'}`).join('\n\n');
    try {
      await navigator.clipboard.writeText(`${subject()}\n\n${body}`);
      setStatus(english ? 'Inquiry details copied.' : '문의 내용을 복사했습니다.');
    } catch (_) {
      setStatus(english ? 'Copy failed. Please select the text manually.' : '복사하지 못했습니다. 입력 내용을 직접 선택해 주세요.', true);
    }
  });
  updateHeaders();
})();
