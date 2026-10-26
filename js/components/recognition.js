// createRecognition owns its markup and DOM interactions.
export function createRecognition({ D, t, $, $$, esc, pad2, externalUrl, TOTAL }) {
  function renderRecognition() {
    $('#awards').innerHTML = D.awards.map(a => {
      return `<div class="award-row" role="row">
        <span class="mono dim">${esc(a.year)}</span>
        <span class="award-title">${esc(a.title)}</span>
        <span class="award-project">${esc(a.project)}</span>
        <span class="award-prize chip chip--award">${esc(a.prize)}</span>
        <span class="award-actions">
          ${a.id ? `<a class="chip chip--light" href="#/work/${esc(a.id)}" aria-label="${esc(a.project)} ${t('프로젝트 보기', 'project')}">${t('프로젝트', 'Project')} ↗</a>` : ''}
          ${externalUrl(a.source) ? `<a class="chip" href="${esc(externalUrl(a.source))}" target="_blank" rel="noopener noreferrer" aria-label="${esc(a.title)} ${t('관련 보도 자료', 'source')}: ${esc(a.sourceLabel)}">${t('보도 자료', 'Source')} ↗</a>` : `<span class="award-unverified">${t('관련 공개 자료 확인 중', 'Public source being verified')}</span>`}
        </span>
      </div>`;
    }).join('');

    const SHOW = 8, exp = $('#experience'), more = $('#exp-more');
    exp.innerHTML = D.experience.map(([y, name, sub], i) =>
      `<li${i >= SHOW ? ' hidden' : ''}><span class="mono dim">${esc(y)}</span><span class="cv-name">${esc(name)}</span>${sub ? `<span class="cv-sub">${esc(sub)}</span>` : ''}</li>`).join('');
    $('#exp-count').textContent = pad2(D.experience.length);
    more.textContent = `Show all ${D.experience.length}`;
    more.addEventListener('click', () => {
      const open = more.getAttribute('aria-expanded') !== 'true';
      $$('li', exp).forEach((li, i) => { if (i >= SHOW) li.hidden = !open; });
      more.setAttribute('aria-expanded', open);
      more.textContent = open ? 'Show less' : `Show all ${D.experience.length}`;
    });
    $('#education').innerHTML = D.education.map(([y, name, sub]) =>
      `<li><span class="mono dim">${esc(y)}</span><span class="cv-name">${esc(name)}</span>${sub ? `<span class="cv-sub">${esc(sub)}</span>` : ''}</li>`).join('');

    $('#stat-projects').textContent = TOTAL;
    $('#stat-awards').textContent = D.awards.length;
  }

  return renderRecognition;
}
