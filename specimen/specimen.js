/* Jewel specimen site — page shell and helpers. Not part of the system.

   Every specimen page loads this with `defer`, alongside jewel.js. It runs
   before Jewel mounts components (at DOMContentLoaded), so whatever it adds
   gets wired up like hand-written markup.

   It does five things:
   1. Builds the side nav, and the phone drawer that holds the same nav,
      from the NAV list below. Add a page here and it shows up everywhere.
   2. Adds "Previous" and "Next" links at the foot of each page.
   3. Copies the markup of every .spec-example into a code snippet with a
      Copy button underneath it, before any script changes it. Add
      data-code="none" to skip one.
   4. Fills [data-token="--name"] with that token's current value.
   5. Screenshot mode: ?static shows charts finished, with no load animation.
   It also flips aria-pressed on toggle buttons in examples, and runs two
   demo buttons: [data-spec-play] (Motion) and
   [data-spec-bg] (pause the background).

   The page says where it is with <body data-page="components/button">. */

(() => {
  const NAV = [
    { heading: 'Get started', items: [
      ['index', 'Overview'],
    ] },
    { heading: 'Foundations', items: [
      ['foundations/index', 'All foundations'],
      ['foundations/typography', 'Typography'],
      ['foundations/colour', 'Colour'],
      ['foundations/spacing', 'Spacing and sizing'],
      ['foundations/layout', 'Layout and grid'],
      ['foundations/surfaces', 'Panels and surfaces'],
      ['foundations/motion', 'Motion'],
    ] },
    { heading: 'Components', items: [
      ['components/index', 'All components'],
      { group: 'Actions', items: [
        ['components/button', 'Button'],
        ['components/fab', 'Floating action button'],
        ['components/tag', 'Tag'],
        ['components/badge', 'Badge'],
      ] },
      { group: 'Navigation', items: [
        ['components/header', 'Header'],
        ['components/side-nav', 'Side nav'],
        ['components/breadcrumbs', 'Breadcrumbs'],
        ['components/tabs', 'Tabs'],
        ['components/footer', 'Footer'],
      ] },
      { group: 'Disclosure and overlays', items: [
        ['components/accordion', 'Accordion'],
        ['components/dropdown', 'Dropdown'],
        ['components/sheet', 'Sheet'],
        ['components/lightbox', 'Lightbox'],
      ] },
      { group: 'Inputs', items: [
        ['components/text-field', 'Text field'],
        ['components/choice', 'Checkbox, radio and switch'],
        ['components/tag-input', 'Tag input'],
        ['components/dropzone', 'Drop zone'],
        ['components/date-picker', 'Date picker'],
        ['components/search', 'Search'],
        ['components/filter', 'Filter'],
      ] },
      { group: 'Feedback', items: [
        ['components/notice', 'Notice'],
        ['components/progress', 'Progress'],
        ['components/empty-state', 'Empty state'],
      ] },
      { group: 'Content', items: [
        ['components/figure', 'Figure'],
        ['components/video', 'Video'],
        ['components/index-list', 'Index list'],
        ['components/meta-list', 'Meta list'],
        ['components/quote', 'Quote'],
        ['components/code', 'Code snippet'],
      ] },
      { group: 'Data and AI', items: [
        ['components/stat', 'Stat'],
        ['components/table', 'Data table'],
        ['components/chart', 'Chart'],
        ['components/chat', 'Chat'],
      ] },
    ] },
    { heading: 'Patterns', items: [
      ['patterns/index', 'All patterns'],
      ['patterns/forms', 'Forms'],
      ['patterns/posting-a-photo', 'Posting a photo'],
      ['patterns/tags-and-photos', 'Tags and photos'],
      ['patterns/data', 'Data'],
      ['patterns/media', 'Media'],
    ] },
  ];

  const script = document.currentScript;
  const root = new URL('..', script.src);           // the folder that holds index.html
  const page = document.body.dataset.page || 'index';
  const href = (slug) => new URL(`${slug}.html`, root).href;
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---- 1. Side nav and drawer ------------------------------------------ */
  const flat = [];
  const link = ([slug, title]) => {
    flat.push([slug, title]);
    const current = slug === page ? ' aria-current="page"' : '';
    return `<li><a class="side-nav__link" href="${href(slug)}"${current}>${esc(title)}</a></li>`;
  };
  const list = (items) => items.map((item) => {
    if (Array.isArray(item)) return link(item);
    const open = item.items.some(([slug]) => slug === page) ? ' open' : '';
    return `<li><details class="side-nav__group"${open}><summary class="side-nav__link">${esc(item.group)}</summary>`
      + `<ul class="side-nav__list">${list(item.items)}</ul></details></li>`;
  }).join('');
  const navHTML = NAV.map((s) => `<p class="side-nav__heading">${esc(s.heading)}</p><ul class="side-nav__list">${list(s.items)}</ul>`).join('');

  const aside = document.querySelector('.with-side-nav__aside');
  if (aside) aside.innerHTML = `<nav class="side-nav" aria-label="Specimen">${navHTML}</nav>`;

  document.body.insertAdjacentHTML('beforeend', `
    <dialog class="sheet sheet--start" id="site-nav" data-component="sheet" aria-label="Menu">
      <div class="sheet__panel panel">
        <header class="sheet__head">
          <p class="sheet__title label">Jewel</p>
          <button class="btn btn--ghost btn--icon" type="button" data-sheet-close aria-label="Close menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>
          </button>
        </header>
        <div class="sheet__body"><nav class="side-nav" aria-label="Specimen" data-component="side-nav">${navHTML}</nav></div>
      </div>
    </dialog>`);

  /* ---- 2. Previous and next -------------------------------------------- */
  const at = flat.findIndex(([slug]) => slug === page);
  const footer = document.querySelector('.spec-pager');
  if (footer && at > -1) {
    const prev = flat[at - 1];
    const next = flat[at + 1];
    footer.innerHTML =
      (prev ? `<a class="spec-pager__link" href="${href(prev[0])}" rel="prev"><span class="label">Previous</span><span>${esc(prev[1])}</span></a>` : '<span></span>')
      + (next ? `<a class="spec-pager__link spec-pager__link--next" href="${href(next[0])}" rel="next"><span class="label">Next</span><span>${esc(next[1])}</span></a>` : '');
  }

  /* ---- 3. Code under each example -------------------------------------- */
  const dedent = (text) => {
    const lines = text.replace(/^\s*\n/, '').replace(/\s+$/, '').split('\n');
    const indent = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length));
    return lines.map((l) => l.slice(indent)).join('\n');
  };
  document.querySelectorAll('.spec-example').forEach((example) => {
    if (example.dataset.code === 'none') return;
    // A backdrop demo shows only the panels, not the specimen's backdrop.
    const source = example.querySelector(':scope > .spec-source, :scope > .spec-backdrop > .spec-cols') || example;
    const code = dedent(source.innerHTML)
      .replace(/=""/g, '');                       // boolean attributes: hidden="" → hidden
    example.insertAdjacentHTML('afterend', `
      <details class="spec-code">
        <summary>Code</summary>
        <figure class="code code--tall" data-component="code">
          <figcaption class="code__head"><span class="code__lang">HTML</span><button class="code__copy" type="button">Copy</button></figcaption>
          <pre class="code__body" tabindex="0"><code>${esc(code)}</code></pre>
        </figure>
      </details>`);
  });

  /* ---- 4. Live token values -------------------------------------------- */
  const styles = getComputedStyle(document.documentElement);
  document.querySelectorAll('[data-token]').forEach((el) => {
    el.textContent = styles.getPropertyValue(el.dataset.token).trim() || '—';
  });

  /* ---- 5. Screenshot mode ---------------------------------------------- */
  if (new URLSearchParams(location.search).has('static')) {
    document.documentElement.classList.add('jewel-static');
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.chart, .sparkline').forEach((el) => el.classList.add('is-in'));
    });
  }

  /* Motion demos: [data-spec-play] toggles .is-playing on its target. */
  document.addEventListener('click', (e) => {
    const button = e.target.closest('[data-spec-play]');
    if (!button) return;
    const target = document.getElementById(button.dataset.specPlay);
    target.classList.toggle('is-playing');
    button.setAttribute('aria-pressed', String(target.classList.contains('is-playing')));
  });

  /* Toggle demos: a button with aria-pressed in an example flips it, unless
     a component (filter, dropdown…) already looks after it. */
  document.addEventListener('click', (e) => {
    const button = e.target.closest('.spec-example button[aria-pressed]:not([data-filter]):not([data-spec-bg]):not([data-spec-play])');
    if (!button || button.disabled) return;
    button.setAttribute('aria-pressed', String(button.getAttribute('aria-pressed') !== 'true'));
  });

  /* Background demo: [data-spec-bg] pauses and restarts the gradient. */
  document.addEventListener('click', (e) => {
    const button = e.target.closest('[data-spec-bg]');
    if (!button) return;
    const html = document.documentElement;
    const paused = html.dataset.bg === 'paused';
    if (paused) delete html.dataset.bg; else html.dataset.bg = 'paused';
    button.setAttribute('aria-pressed', String(!paused));
  });
})();
