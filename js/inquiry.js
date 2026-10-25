(() => {
  'use strict';
  const dialog = document.getElementById('inquiry-dialog');
  const form = document.getElementById('inquiry-form');
  const mailLink = document.getElementById('inquiry-mail-link');
  const english = window.PORTFOLIO_LANG === 'en';
  const labels = english
    ? { title: 'Project title', content: 'Project details', introduction: 'Name / team', email: 'Reply email', phone: 'Phone', type: 'Project type', schedule: 'Schedule', budget: 'Budget' }
    : { title: '프로젝트 제목', content: '프로젝트 상세 내용', introduction: '이름 / 팀', email: '회신받을 이메일', phone: '연락처', type: '프로젝트 유형', schedule: '희망 일정', budget: '예산' };
  const fields = ['title', 'content', 'introduction', 'email', 'phone', 'type', 'schedule', 'budget'];
  const draft = () => {
    const values = Object.fromEntries(new FormData(form));
    const subject = `[Portfolio] ${values.title || (english ? 'Project inquiry' : '프로젝트 문의')}`;
    const body = fields.map(field => `${labels[field]}: ${values[field] || '—'}`).join('\n\n');
    return { subject, body, url: `mailto:koyebum1@naver.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` };
  };
  const update = () => { mailLink.href = draft().url; };
  document.getElementById('open-inquiry').addEventListener('click', () => { update(); dialog.showModal(); form.elements.title.focus(); });
  dialog.querySelector('.inquiry-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  form.addEventListener('input', update);
  mailLink.addEventListener('click', event => { if (!form.reportValidity()) event.preventDefault(); });
  document.getElementById('copy-inquiry').addEventListener('click', async () => {
    if (!form.reportValidity()) return;
    const { subject, body } = draft();
    try {
      await navigator.clipboard.writeText(`${subject}\n\n${body}`);
      const status = document.getElementById('toast');
      status.textContent = english ? 'Inquiry copied. Attach files in your mail app.' : '문의 내용을 복사했습니다. 파일은 메일 앱에서 첨부해 주세요.';
      status.classList.add('is-on');
      setTimeout(() => status.classList.remove('is-on'), 3500);
    } catch (_) {
      mailLink.focus();
    }
  });
  update();
})();
