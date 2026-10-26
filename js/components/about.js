// createAbout owns its markup and DOM interactions.
export function createAbout({ D, t, $, esc, src, imageDimensions }) {
  function renderAbout() {
    $('#caps').innerHTML = D.capabilities.map(c => `
      <article class="cap" data-reveal>
        <a class="card cap-link" href="#/index" data-cap-filter="${esc(c.filter)}" aria-label="${esc(c.title)} ${t('분야의 프로젝트 보기', 'projects')}"${c.pos ? ` style="--pos:${c.pos}"` : ''}><img src="${src(c.cover, true)}"${imageDimensions(`${c.cover}-sm`)} alt="" loading="lazy" decoding="async">
          <div class="card-top"><span class="mono">${c.n}</span></div>
          <span class="cap-link-label">${t('이 분야 프로젝트 보기', 'Explore projects')} <span aria-hidden="true">↗</span></span>
        </a>
        <div class="cap-text">
          <h3><span class="cap-type mono">${t('작업 분야', 'Discipline')}</span>${esc(c.title)}</h3>
          <p>${esc(c.body)}</p>
          <span class="mono">${esc(c.tools)}</span>
        </div>
      </article>`).join('');
  }

  return renderAbout;
}
