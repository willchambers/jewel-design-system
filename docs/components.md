# Components

Every Jewel component: its markup, options, events and scripting. For a quick introduction, start with the [README](../README.md). To see them all working, open the [live specimen](https://willchambers.github.io/jewel-design-system/): one page per foundation, component and pattern, each with live examples and copy-paste code.

- [What's in the folders](#whats-in-the-folders)
- [Page structure and panel shapes](#page-structure-and-panel-shapes)
- [Layout and type helpers](#layout-and-type-helpers)
- [Components A–Z](#components-az)
- [Forms](#forms)
- [Photos and filtering](#photos-and-filtering)
- [Attributes](#attributes)
- [Adding a component](#adding-a-component)
- [Themes](#themes)
- [iPhone home-screen apps](#iphone-home-screen-apps)

## What's in the folders

```
css/
  jewel.css             entry point — the only stylesheet you link
  tokens.css            primitives → theme colours → resolved tokens
  base.css              reset, type scale, links, rules, 12-col grid
  background.css        animated Jewel gradient
  utilities.css         data-text variants, [hidden], .visually-hidden
  parked/
    light-theme.css     light theme, set aside (not imported)
  components/
    _template.css       starting point for a new component
    badge.css  button.css  chart.css  figure.css  footer.css  header.css
    index-list.css  knockout.css  meta-list.css  notice.css  panel.css
    quote.css  section-head.css  stat.css  tag.css  video.css
    side-nav.css  breadcrumbs.css  tabs.css                             navigation
    accordion.css  dropdown.css                                         disclosure
    search.css  datepicker.css                                          inputs
    progress.css  empty-state.css                                       feedback
    table.css  code.css  chat.css                                       data, code, chat
    field.css  input.css  choice.css  tag-input.css  dropzone.css      forms
    fab.css  sheet.css                                                 posting flow
    lightbox.css  filter.css                                           photos and filtering
js/
  jewel.js              core: Jewel.theme + component registry
  components/
    _template.js        starting point for component behaviour
    theme-toggle.js     (unused while the system is dark-only)
    video.js  chart.js  lightbox.js  filter.js
    form.js             validation, counters, busy state, Jewel.field helpers (load first)
    tag-input.js  dropzone.js  sheet.js  post-form.js
    side-nav.js  tabs.js  accordion.js  dropdown.js  search.js
    datepicker.js  code.js  chat.js  table.js
index.html              the specimen's home page
foundations/ components/ patterns/   one specimen page each
specimen/               specimen-only CSS and JS (nav, code under examples); not part of the system
media/                  small SVG artworks for the specimen's lightbox
docs/                   this reference, and the README's images
```

## Page structure and panel shapes

The page is a floating glass header over a column of content panels, with the gradient showing between them.

| Piece | Class | Shape |
|---|---|---|
| Header | `.site-header` > `.panel.site-header__inner` | Square corners. Sticky; `.jewel-cap` hides content in the gap above it. |
| Panel column | `.panel-stack` | A grid of panels with a `--panel-stack-gap` (16px) gap. |
| Content panel | any `.panel` directly inside `.panel-stack`, or `.panel--content` anywhere | Square top left, 2px top right with the knockout lines, 10px bottom left and right. |
| Section head | `.section-head` as the first child of a content panel | The numbered label (`01 — Typography`) with a 1px rule under it that runs the full width of the panel, edge to edge. Content below sits in `span-9 start-4`. |
| Other panels | `.panel` | Square on all sides (cards, nested panels). |

**Knockout lines.** Two parallel 45° hairlines are cut through the top-right corner of every content panel, and the background shows through them. They are real holes, made with a CSS mask, so they cut the fill, the border and the blur. Add them to any other element with `.knockout`. Remove them from a content panel with `.no-knockout`.

Because the mask is the panel's outline, anything that hangs past a panel's edge is clipped. Keep pop-ups inside their panel; the chart and sparkline hover cards already do.

To change the shape for one panel only, set a token inline, for example `style="--knockout-offset: 16px"`. The shape tokens are listed in [tokens.md](tokens.md#panel-shape-and-knockout-lines).

## Layout and type helpers

These live in `css/base.css`.

| Class | What it does |
|---|---|
| `.page` | Centres the page at up to 80rem, with side margins that clear an iPhone notch in landscape. |
| `.grid` | A 12-column grid. Children are full width on phones. |
| `.span-1` … `.span-12` | How many columns a grid child spans (from 48rem up). |
| `.start-1` … `.start-12` | Which column a grid child starts in. Combine with a span: `span-9 start-4`. |
| `.stack` | Vertical spacing between children (`--stack-gap`, default 16px). Don't set margins on the children. |
| `.cluster` | A row that wraps, with a gap (`--cluster-gap`). |
| `.section` | Large vertical padding for a section. |
| `.display`, `h1`–`h4` (or `.h1`–`.h4`) | The type scale: display is the biggest, tightly tracked. |
| `.lede` | A larger, quieter intro paragraph. |
| `.label` | Small uppercase tracked text for metadata. |
| `.caption`, `small` | Small, muted text. |
| `.link-quiet` | A link with no underline until hover. |
| `hr`, `.rule` | A hairline divider. |
| `.visually-hidden` | Hidden on screen, still read by screen readers (in `utilities.css`). |

## Components A–Z

### Accordion

Stacked sections that open in place, built on native `<details>`, so it works without a script and find-in-page opens the right section.

```html
<div class="accordion" data-component="accordion">
  <details class="accordion__item" name="faq" open>
    <summary class="accordion__head">What sizes can I upload? <span class="accordion__meta">Uploads</span></summary>
    <div class="accordion__body"><p>…</p></div>
  </details>
</div>
```

- Give every item the same `name` to allow only one open at a time.
- `aria-disabled="true"` on a summary keeps that item shut (needs `accordion.js`, which also adds `el.jewelAccordion.openAll()` / `.closeAll()`).
- `.accordion--flush` drops the outer rules.

### Badge

A small uppercase label on its own glass pill, for a status ("Private", "Publishing…", "Failed") or a count ("1 / 3"). Most often it sits over a photo.

```html
<span class="badge">Private</span>
<span class="badge badge--accent badge--busy"><span class="badge__dot"></span>Publishing…</span>
<span class="badge badge--error">Failed</span>
<span class="badge badge--solid">New</span>

<div class="figure__media">
  <img src="…" alt="…">
  <span class="badge" data-place="top-left">Private</span>
  <span class="badge" data-place="top-right" aria-hidden="true">1 / 3</span>
</div>
```

- Place it over media with `data-place="top-left|top-right|bottom-left|bottom-right"`. Put `data-place` on a `.badges` group when one corner needs several.
- The parent must be positioned (`.figure__media` is). Badges ignore taps, so the photo or link underneath still works.
- Hide a count with `aria-hidden="true"` if it repeats a label. Wrap a status that changes while the page is open in `role="status"`.

### Breadcrumbs

Where this page sits. The last crumb is the current page, not a link.

```html
<nav class="breadcrumbs" aria-label="Breadcrumb">
  <ol class="breadcrumbs__list">
    <li><a href="/">Home</a></li>
    <li><a href="/components/">Components</a></li>
    <li><span aria-current="page">Tabs</span></li>
  </ol>
</nav>
```

On phones only the parent shows, as a "‹ Components" back link. `.breadcrumbs--full` keeps the whole trail (it wraps).

### Button

```html
<a class="btn" href="…">Primary</a>
<button class="btn btn--ghost" type="button">Ghost</button>
<button class="btn btn--text" type="button">Text link</button>
<button class="btn btn--ghost btn--icon" type="button" aria-label="Close"><svg …></svg></button>
```

- Each variant only sets `--btn-bg`, `--btn-fg` and `--btn-border`, so a new variant is three lines.
- `aria-busy="true"` shows a hairline spinner (the form sets this while submitting).
- Buttons grow to 44px tall on touch screens.

### Chart

Line, area, bar, pie, donut and sparkline charts, drawn from an HTML table. See [charts.md](charts.md).

### Chat

The shell for a chatbot or assistant: a header, a scrolling conversation (`role="log"`), suggested prompts, a composer and a note. There's no backend; your code answers an event. The full markup is at the top of `css/components/chat.css`.

```js
chat.addEventListener('jewel:chatsend', (e) => {
  e.detail.respond(fetch('/ask', { method: 'POST', body: e.detail.text }).then((r) => r.text()));
});
```

- `respond()` takes a string, `{ html }`, or a promise of either. A rejected promise shows the error with a Retry button.
- Enter sends, Shift+Enter is a new line (on touch screens Enter is always a new line). `[data-chat-prompt]` buttons send their own text and hide once the chat starts.
- `data-chat-demo` answers with a canned reply, for showing the shell on its own.
- `.chat--floating` fixes it in the bottom-right corner (full screen on phones). It also fits in a `.sheet`.
- API: `el.jewelChat.add('user' | 'bot', text)`, `.typing(true)`, `.clear()`.

### Code snippet

A block of code with its language and a copy button.

```html
<figure class="code" data-component="code">
  <figcaption class="code__head">
    <span class="code__lang">HTML</span>
    <button class="code__copy" type="button">Copy</button>
  </figcaption>
  <pre class="code__body" tabindex="0"><code>&lt;link rel="stylesheet" href="css/jewel.css"&gt;</code></pre>
</figure>
```

- `code.js` copies the text, shows "Copied" for two seconds and announces it. It falls back to a selection copy on plain-http pages. Event: `jewel:copy`.
- `.code--wrap` wraps long lines; `.code--tall` scrolls past `--region-h`.
- No syntax colours by default. If you add a highlighter, map its classes to `--text-default`, `--text-muted` and `--text-accent` only.
- Inline `<code>` and `<kbd>` are styled in `base.css`.

### Date picker

A text field you can type a date into, with a calendar button. The full markup is at the top of `css/components/datepicker.css`.

```html
<div class="datepicker" data-component="datepicker" data-min="2020-01-01" data-max="today">
  <input class="input datepicker__input" id="taken" type="text" inputmode="numeric" autocomplete="off">
  <button class="datepicker__toggle" type="button" aria-label="Choose date">…calendar icon…</button>
  <input type="hidden" name="taken">
</div>
```

- Typing follows the page's language (`<html lang="en-GB">` → DD/MM/YYYY) and accepts ISO dates. An unreadable or out-of-range date sets a validity message that `form.js` shows like any other field error.
- The calendar: arrows move a day or a week, Home/End the week's ends, PageUp/PageDown a month (Shift: a year), Enter picks, Esc closes. Today has an accent rule; dates outside `data-min` / `data-max` are struck through.
- The hidden input carries `YYYY-MM-DD` for the form. Options: `data-week-start` (1 = Monday, the default), `data-value`.
- Event: `jewel:datechange`, detail `{ date, value }`. API: `el.jewelDatepicker.value`, `.open()`, `.close()`.

### Dropdown

A button that opens a short menu of actions or choices. For picking a value inside a form, use the native `.select` instead.

```html
<div class="dropdown" data-component="dropdown" data-label-from-choice>
  <button class="btn btn--ghost dropdown__trigger" type="button">Sort</button>
  <div class="dropdown__menu" role="menu" aria-label="Sort by" hidden>
    <button class="dropdown__item" role="menuitemradio" aria-checked="true" type="button" data-value="new">Newest</button>
    <button class="dropdown__item" role="menuitemradio" aria-checked="false" type="button" data-value="old">Oldest</button>
    <hr class="dropdown__divider">
    <button class="dropdown__item dropdown__item--danger" role="menuitem" type="button">Delete</button>
  </div>
</div>
```

- Items: `menuitem`, `menuitemradio` (one checked) or `menuitemcheckbox` (toggles). `aria-disabled="true"` disables one. `.dropdown__label` and `.dropdown__divider` group them; `<kbd class="dropdown__hint">` shows a shortcut.
- `data-align="end"` lines it up with the trigger's right edge. It flips above the trigger when there's no room below.
- Keyboard: Enter, Space or ↓ opens; ↑ ↓ Home End move; letters jump; Esc closes and returns focus.
- Event: `jewel:select`, detail `{ item, value }`. `data-label-from-choice` shows the choice in the button ("Sort: Newest").

### Empty state

What to show when there's nothing here yet, with one way forward.

```html
<div class="empty-state">
  <svg class="empty-state__icon" viewBox="0 0 24 24" aria-hidden="true">…</svg>
  <h3 class="empty-state__title">No photos yet</h3>
  <p class="empty-state__text">Post your first photo and it shows up here.</p>
  <div class="empty-state__actions"><button class="btn" type="button">New post</button></div>
</div>
```

`.empty-state--boxed` (add `.knockout` for the corner) frames an empty region; `.empty-state--compact` is small and left-aligned for inside a table or list. For "no results", say what was searched and offer to clear it.

### Figure

Magazine-style media with a hairline caption.

```html
<figure class="figure figure--wide">
  <div class="figure__media"><img src="…" alt="…"></div>
  <figcaption class="figure__caption">
    <span><strong>Title</strong> — description.</span>
    <span class="label">Fig. 1</span>
  </figcaption>
</figure>
```

Ratios: `--wide` 21/9, `--tall` 4/5, `--square` 1, default 3/2, or any value with `style="--ratio: 16 / 10"`. Inside a padded panel, `.bleed` runs the media out to the panel's edges.

### Filter

See [Photos and filtering](#photos-and-filtering).

### Footer

```html
<footer class="panel panel--pad site-footer">…</footer>
```

A row of small print. In a `.panel-stack` it gets the content-panel shape.

### Header

```html
<header class="site-header">
  <div class="panel site-header__inner">
    <a class="wordmark link-quiet" href="/">Name</a>
    <nav class="nav" aria-label="Primary">
      <span class="nav__links"><a href="#a" aria-current="page">A</a> <a href="#b">B</a></span>
    </nav>
  </div>
</header>
```

A sticky glass bar. Below `--bp-md` (48rem) the links hide and a menu button (`.nav__menu`, with `data-sheet-open`) opens the [side nav](#side-nav) as a drawer. Without a menu button, add `.nav--keep` so the links wrap instead. Pair it with `<div class="jewel-cap">` right after `<div class="jewel-bg">`.

Layouts: links (the default); links and an action (a `.btn` after `.nav__links`); search (`.search.nav__search` inside `.nav`, hidden below 48rem); menu only (`.nav--drawer`, the menu button at every width). See the specimen's [Header](https://willchambers.github.io/jewel-design-system/components/header.html) page.

### Index list

Numbered rows; the title nudges right on hover.

```html
<ol class="index">
  <li><a class="index__row" href="…">
    <span class="label">01</span>
    <span class="index__title">Title</span>
    <span class="label">Type · Year</span>
  </a></li>
</ol>
```

### Meta list

Label/value rows separated by hairlines.

```html
<dl class="meta">
  <dt class="label">Role</dt><dd>Art direction</dd>
</dl>
```

### Notice

A short message in the page's flow: info, updates or success, and errors.

```html
<div class="notice" role="status">
  <p class="notice__text">You're offline. Showing what's saved on this phone.</p>
</div>

<div class="notice notice--error" role="alert">
  <div class="notice__body">
    <p class="notice__title">Couldn't load your photos</p>
    <p class="notice__text">Check your connection and try again.</p>
  </div>
  <div class="notice__actions"><button class="btn btn--ghost" type="button">Retry</button></div>
</div>
```

- A hairline box whose 2px left edge carries the tone: default (info), `.notice--accent` (updates, success), `.notice--error`.
- Actions sit to the right and wrap below on narrow screens. Group several in `.notices`, which takes no space when empty.
- Use `role="alert"` for an error caused by something the person did, and `role="status"` for background news. A notice that's there when the page loads needs no role.
- To dismiss one, set `[hidden]` and move focus somewhere sensible.
- The form's `.form__error` and `.form__status` get the same look automatically.

### Panel

```html
<section class="panel panel--pad">…</section>
<section class="panel panel--pad" data-panel="solid">…</section>   <!-- opaque -->
<section class="panel panel--pad" data-theme="dark">…</section>    <!-- scoped theme -->
```

Glass by default. `.panel--pad` adds the standard padding. Content panels get the signature shape (see [above](#page-structure-and-panel-shapes)).

### Progress

How far along a task is, on a native `<progress>`.

```html
<div class="progress">
  <div class="progress__meta">
    <label class="progress__label" for="up">Uploading 3 photos</label>
    <span class="progress__value">64%</span>
  </div>
  <progress class="progress__bar" id="up" max="100" value="64">64%</progress>
  <p class="progress__hint">About a minute left</p>
</div>
```

Leave out `value` for an unknown length (a segment sweeps across; it holds still with reduced motion). Tones: `.progress--accent`, `.progress--error`. `.progress--thick` is a 6px bar.

### Quote

```html
<blockquote class="quote">
  <p>…</p>
  <footer class="label">Source</footer>
</blockquote>
```

### Search

A search box with a clear button, an optional "/" shortcut and optional suggestions. The full markup is at the top of `css/components/search.css`.

```html
<form class="search" role="search" data-component="search" data-suggestions='["Dayton","Night"]'>
  <label class="visually-hidden" for="q">Search photos</label>
  <svg class="search__icon" …></svg>
  <input class="search__input" id="q" name="q" type="search" placeholder="Search photos" autocomplete="off">
  <button class="search__clear" type="button" aria-label="Clear search" hidden>×</button>
  <kbd class="search__key" aria-hidden="true">/</kbd>
</form>
```

- Esc clears the box. With a `.search__key`, "/" anywhere on the page focuses it.
- With suggestions it becomes a combobox: ↑ ↓ move, Enter picks. Set them later with `form.jewelSearch.setSuggestions([...])`.
- Events: `jewel:searchinput` as the person types, `jewel:search` on Enter or a pick (detail `{ query }`). Without an `action`, the form doesn't navigate.
- Variant: `.search--quiet`.

### Section head

```html
<section class="panel panel--pad grid">
  <header class="section-head"><p class="label">01 — Typography</p></header>
  <div class="span-9 start-4">…</div>
</section>
```

The rule under the label runs the full width of the panel, edge to edge.

### Side nav

A vertical list of links in labelled groups, with collapsible groups. The same markup works as a sticky column on wide screens and as a drawer on phones. The full markup is at the top of `css/components/side-nav.css`.

```html
<nav class="side-nav" aria-label="Sections" data-component="side-nav">
  <p class="side-nav__heading">Foundations</p>
  <ul class="side-nav__list">
    <li><a class="side-nav__link" href="/colour/" aria-current="page">Colour</a></li>
    <li>
      <details class="side-nav__group" open>
        <summary class="side-nav__link">Components</summary>
        <ul class="side-nav__list"><li><a class="side-nav__link" href="/tabs/">Tabs</a></li></ul>
      </details>
    </li>
  </ul>
</nav>
```

- **Wide screens:** wrap the page in `.with-side-nav`, with the nav in `<aside class="with-side-nav__aside panel">` and the content beside it. The column shows from `--bp-lg` (64rem) and sticks under the header.
- **Phones:** put the same nav in `<dialog class="sheet sheet--start" id="site-nav" data-component="sheet">` and add the header's menu button ([Header](#header)). `side-nav.js` closes the drawer when a link is followed or the screen widens, and keeps the button's `aria-expanded` in step.
- The current page gets `aria-current="page"`: an accent edge and the selected fill. A group holding it reads as current too.

### Stat

A property/value pair for key numbers: the property in small uppercase text, the value large and semibold.

```html
<dl class="stats">
  <div class="stat">
    <dt class="stat__label">Stations</dt>
    <dd class="stat__value">148</dd>
  </div>
  <div class="stat stat--inline">
    <dt class="stat__label">Bikes available at peak hours</dt>
    <dd class="stat__value">96<span class="stat__unit">%</span></dd>
  </div>
</dl>
```

- Layouts: stacked (default, label above), `.stat--inline` (value first, label beside it, bottom-aligned), `.stat--hero` (one headline figure per page, at least 48px).
- `.stat__unit` sets a smaller, quieter suffix or prefix: +, %, M. `.stat__note` adds a line of context.
- The `.stats` row wraps: four across on desktop and two on phones by default (`--stats-min`, 8rem), with a hairline above each stat. Values in the same row line up even when a label wraps (subgrid).
- Write values as they should be read ("40+", "3.2M"); nothing is counted by script. Big numbers keep proportional figures.
- A stat can hold a [sparkline](charts.md#sparkline).

### Table

A data table: hairline rows, small uppercase headers, numbers right-aligned in tabular figures. A plain `.table` needs no script; `table.js` adds sorting, selection and phone labels. (Charts keep their own table, styled by `chart.css`.)

```html
<div class="table-wrap" data-component="table" data-select>
  <table class="table table--stack">
    <caption class="table__caption">Recent uploads</caption>
    <thead><tr><th scope="col" data-sort>Title</th><th scope="col" class="is-num" data-sort="number">Views</th></tr></thead>
    <tbody><tr><th scope="row">Night bus</th><td class="is-num">1,204</td></tr></tbody>
  </table>
</div>
```

- Wide tables scroll sideways inside `.table-wrap`. `.table-wrap--tall` adds a fixed height with a sticky header. `.table--compact` makes 32px rows.
- **Sorting:** `th[data-sort]` (`number`, `date`, or text). A cell's `data-value` (or a `<time datetime>`) overrides its text. Event: `jewel:sort`.
- **Selection:** `data-select` adds checkboxes and a select-all with a mixed state. Selected rows get `aria-selected="true"`. Event: `jewel:selectionchange`; API `wrap.jewelTable.selected()`.
- **Phones:** `.table--stack` turns each row into label/value pairs below `--bp-sm`.
- `.table__link` on a row's main link makes the whole row clickable. No rows? Put an `.empty-state--compact` in one full-width cell.

### Tabs

Switch between views of the same thing, in place.

```html
<div class="tabs" data-component="tabs">
  <div class="tabs__list" role="tablist" aria-label="Photo details">
    <button class="tabs__tab" role="tab" type="button" aria-selected="true">Info</button>
    <button class="tabs__tab" role="tab" type="button">Comments <span class="tabs__count">12</span></button>
  </div>
  <div class="tabs__panel" role="tabpanel">…</div>
  <div class="tabs__panel" role="tabpanel" hidden>…</div>
</div>
```

- `tabs.js` pairs tabs and panels in order and wires the ids. Arrow keys move and select, Home/End jump, disabled tabs are skipped.
- `data-tabs-hash` keeps the open tab in the URL. Event: `jewel:tabchange`. API: `el.jewelTabs.select(i)`.
- Tabs sit side by side in one hairline box; the open tab is filled with a 2px accent rule along its bottom. Too many tabs for the width scroll sideways.

### Tag

```html
<span class="tag">Editorial</span>
<span class="tag tag--solid">Featured</span>
<button class="tag tag--button" type="button" aria-pressed="false">Travel</button>
<a class="tag" href="/tags/travel/">Travel</a>
```

| Variant | Notes |
|---|---|
| `span.tag` | A 24px label. |
| `button.tag.tag--button[aria-pressed]` | A pressable tag; pressed fills like `.tag--solid`. |
| `a.tag` | No underline; the pill is the affordance. Hover brightens the text and edge. `aria-current="page"` fills it, for the tag page you're on. A `#tag=<slug>` link also drives a [filter](#photos-and-filtering) on the same page. |
| Touch size | `a.tag` and `button.tag` grow to a 32px pill on touch screens, with an invisible 44px tap area and at least 44px wide. `.tag--touch` forces it on any screen. Wrapped rows need a 12px row gap (`--cluster-gap: var(--space-3) var(--space-2)`) so the tap areas don't overlap; the filter does this itself. Tune one instance with `--tag-height`, `--tag-pad` or `--tag-hit`. |

### Video

A figure whose media is a muted, looping clip with a play/pause control. Script: `js/components/video.js`.

```html
<figure class="figure video" data-component="video">
  <div class="figure__media">
    <video loop muted playsinline preload="metadata"><source src="…" type="video/mp4"></video>
    <button class="btn btn--icon video__control" type="button" data-video-toggle aria-label="Play video">
      <svg class="icon-play" …></svg><svg class="icon-pause" …></svg>
    </button>
  </div>
  <figcaption class="figure__caption">…</figcaption>
</figure>
```

It plays while on screen, pauses when scrolled away, and never autoplays with reduced motion.

## Forms

Style: **hairline box**. Each field is a 1px box with square corners in `--field-border` and a faint `--field-fill`. On focus the box turns accent and doubles to 2px; errors do the same in `--field-error`. Labels are small uppercase text above the field. Load `js/components/form.js` before the other form scripts.

| Component | Markup | Notes |
|---|---|---|
| Form | `form.form[data-component="form"][novalidate]` | Layout: `.form__group` (fieldset with a hairline above), `.form__legend`, `.form__row--2` (two columns from 48rem), `.form__actions`. Messages: `.form__error` (role alert) and `.form__status` (role status). |
| Field | `.field` > `.field__label` + control + `.field__meta` (`.field__hint`, `.field__counter`) + `.field__error` | `.field__req` marks required. `.field__optional` for "(optional)". `.field__badge` shows "Suggested". |
| Input | `input.input`, `textarea.input`, `.select > select.input` | The textarea grows with its content. The select is native, restyled with a hairline chevron. A counter needs `data-counter` and `maxlength`. |
| Choice | `label.choice > input[type=checkbox\|radio]` | Add `role="switch"` to a checkbox for a switch. The whole row is the label, at least 44px tall. |
| Tag input | `.tag-input[data-component="tag-input"]` | Enter or comma adds; Backspace removes; duplicates are rejected. `data-max`, `data-required`, `data-suggestions` (JSON). Submits a JSON array in its hidden input. Script: `tag-input.js`. |
| Drop zone | `.dropzone.knockout[data-component="dropzone"]` | One image. Drag-and-drop or the native picker (no `capture`, so phones offer the library and the camera). Preview with name, size and dimensions; Replace and Remove. `data-max-size` in MB. Script: `dropzone.js`. |
| Floating button | `button.fab[data-sheet-open="<id>"]` | Fixed bottom-right, clear of iPhone safe areas (needs `viewport-fit=cover`). `.fab--extended` + `.fab__label` for text. Put `.has-fab` on `<body>` so it never covers the last content. |
| Sheet | `dialog.sheet.sheet--bottom` or `.sheet--center`, `[data-component="sheet"]` | Bottom tearsheet (full height on phones) or centred modal, same insides. Focus stays inside; Esc and backdrop clicks close; an unsaved draft asks first; focus returns to the opener; the page can't scroll behind it; it shrinks above the on-screen keyboard. Script: `sheet.js`. |
| Post form | `form[data-component="form post-form"]` | Photo, title, description, location, alt, tags, publish. Dispatches `jewel:post`. Script: `post-form.js`. |

`data-component` can list several names; they run in order. Buttons grow to 44px tall on touch screens. A complete working form, sheet and post flow is in the specimen's [Forms](https://willchambers.github.io/jewel-design-system/patterns/forms.html) and [Posting a photo](https://willchambers.github.io/jewel-design-system/patterns/posting-a-photo.html) patterns.

### Events

| Event | On | Detail |
|---|---|---|
| `jewel:submit` | form | `{ form, formData, waitUntil(promise) }`. Fires on a valid submit. |
| `jewel:post` | post form | `{ file, title, description, location, alt, tags: string[], publish, formData, form, waitUntil(promise) }` |
| `jewel:tagschange` | tag input | `{ tags }` |
| `jewel:filechange` | drop zone | `{ file, source: 'user' \| 'api' \| 'clear' }` |
| `jewel:sheetopen` / `jewel:sheetclose` | dialog | none |

Call `waitUntil(promise)` to keep the form busy while you work. The submit button shows `data-busy-label` with a spinner. If the promise resolves, the form shows its `data-success` message and resets. If it rejects, the error's message is shown and the draft stays. When the form stops being busy, the button gets its old label back only if it still shows the busy text. If you changed the text while busy (to "Retry", say), your text stays. Set `data-idle-label` while busy to choose the label that comes back.

### Scripting forms

```js
form.jewelForm.setBusy(true)                  // also .setError(name, msg), .setFormError(msg),
                                              // .setStatus(msg), .clearErrors(), .isDirty(), .reset(), .validate()
Jewel.field.suggest(textarea, 'A mural…')     // fills only if the person hasn't typed; marked "Suggested" until edited
dropzone.jewelDropzone.setFile(blob, 'photo.webp')  // show and submit a processed file; also .getFile(), .clear()
tagInput.jewelTags.setSuggestions(['Pond', 'Dayton'])  // also .get(), .set([...]), .add(t), .remove(t)
dialog.jewelSheet.open(opener)                // also .close({ force }), .requestClose()
```

## Photos and filtering

| Component | Markup | Notes |
|---|---|---|
| Lightbox | `[data-component="lightbox"]` around `a[data-lightbox-item]` links | A full-screen viewer on a native `<dialog>`. Each link points at the full image, so it still works without JS. `data-caption` is the first line; `data-description` adds a quieter second line. Arrow keys and swipes move between photos, Esc closes, and focus goes back to the photo that opened it. Photos that are hidden, or inside a hidden parent (e.g. filtered out), are skipped. Script: `lightbox.js`. |
| Filter | `.filter.cluster[data-component="filter"]` with `button.tag.tag--button[data-filter]` | `data-filter-target` is a selector for the container; items inside it carry `data-tags="slug other-slug"`. `data-filter="*"` shows everything. A live region (`.filter__status`) announces the count, worded with `data-filter-noun`. Opening the page at `#tag=<slug>`, or following a `#tag=<slug>` link later, applies that tag. Buttons are looked up on every change, so a filter rendered by script works too. Script: `filter.js`. |
| Scrolling filter | `.filter.filter--scroll` | One row that scrolls sideways instead of wrapping, for long tag lists (e.g. a phone feed). It runs out to the panel's edges and fades there; set `--filter-bleed: 0` outside a padded panel. Its width never widens its parents (`contain: inline-size`), so grid parents don't need `minmax(0, 1fr)`. Touch-size tap areas aren't clipped. The scrollbar is hidden on touch screens and thin with a mouse. When a `#tag=` link picks a tag that's scrolled out of view, the row scrolls to it (the page doesn't move). |

```html
<div class="filter cluster" data-component="filter" data-filter-target="#wall"
     data-filter-noun="photos" role="group" aria-label="Filter by tag">
  <button class="tag tag--button" type="button" data-filter="*" aria-pressed="true">All</button>
  <button class="tag tag--button" type="button" data-filter="travel" aria-pressed="false">Travel</button>
  <span class="filter__status visually-hidden" aria-live="polite"></span>
</div>
<div id="wall">
  <a href="full.jpg" data-tags="travel night" data-lightbox-item>…</a>
</div>
```

## Attributes

| Attribute | Values | Where |
|---|---|---|
| `data-theme` | `dark` | `<html>`. Dark is the only active theme and is also the default, so this is optional. The attribute stays so that future themes can be scoped to a page or element. |
| `data-panel` | `solid` | Any element. Panels are glass by default. This gives an opaque surface instead, for example over photography. |
| `data-text` | `default`, `muted`, `accent`, `inverse` | Any element. |
| `data-component` | a registered name | Wires up JS behaviour (see below). |
| `data-bg` | `paused` | `<html>`. Stops the background animation. |
| `hidden` | | Any element. Always hides it, even on components that set their own `display` (`utilities.css` sits in the last layer). Unlayered page CSS that sets `display` on a hidden element still wins, so avoid that. `hidden="until-found"` is left to the browser. |

## Adding a component

1. **Style.** Copy `css/components/_template.css` to `css/components/<name>.css`. Add one line to `css/jewel.css`:
   ```css
   @import url("components/<name>.css") layer(components);
   ```
2. **Behaviour (only if CSS can't do it).** Copy `js/components/_template.js` to `js/components/<name>.js`. Put `data-component="<name>"` on the root element, and add `<script src="js/components/<name>.js" defer></script>` after `jewel.js`.
3. **Show it.** Copy a page in `components/`, and add it to the `NAV` list in `specimen/specimen.js`, so the specimen stays the reference.

Rules that keep every component working with every theme and panel style:

- **Colour:** use only the resolved tokens: `--panel-bg`, `--panel-border`, `--panel-backdrop`, `--media-bg`, `--surface-solid`, `--text-default|muted|accent|inverse`, `--field-*` and `--chart-*`. Don't use hex values or `--color-*` primitives. Those don't switch between glass and solid, so they would skip the contrast adjustments. See [tokens.md](tokens.md).
- **Size and motion:** use `--space-*`, `--text-*`, `--radius-*`, `--hairline`, `--duration-*` and `--ease-*`.
- **Naming:** block `.name`, part `.name__part`, variant `.name--variant`.
- **Variants:** give each variant local custom properties rather than new rules. `button.css` works this way: a variant only sets `--btn-bg`, `--btn-fg` and so on.
- **Spacing:** don't reset margins on elements that might sit in a `.stack`; component styles outrank the stack's spacing.
- **States:** give every interactive part a hover, a pressed (`:active`) and a disabled look from the `--state-*` tokens ([tokens.md](tokens.md#interaction-states)). Disabled controls also go dashed and show `cursor: not-allowed`.
- **Sizes:** use `--control-h*` for heights, `--hit-min` for tap areas, `--icon-*` for icons, the `--z-*` scale for stacking, and the breakpoint values named in [tokens.md](tokens.md#breakpoints).
- **Pop-ups:** open menus, calendars and lists with `Jewel.float(layer, anchor, { align, width })`. It puts them in the top layer next to their anchor, so a panel's knockout mask can't clip them, and returns a function that closes them.

**Cascade layers.** `jewel.css` declares `tokens → base → background → components → utilities`, and a later layer always wins. Your own page CSS sits outside the layers, so it overrides the system without `!important` or specificity fights.

**JS API.**

```js
Jewel.register('name', (el) => { … });  // runs for each [data-component="name"]
Jewel.mount(container);                  // wire up markup inserted later
const close = Jewel.float(menu, button, { align: 'end', width: 'min' });  // pop-up in the top layer
Jewel.theme.get() / .set('dark') / .toggle();
document.documentElement.addEventListener('jewel:themechange', e => e.detail);
Jewel.reducedMotion.matches;
```

## Themes

The system is **dark-only** for now. The knockout lines and rounded content-panel corners belong to the dark theme's look.

The light theme is parked in `css/parked/light-theme.css`, which is not imported. It keeps its AA-verified colours. The plan is for it to become a separate direction that has no knockout lines and no rounded corners. The file's header lists the steps to bring it back: import it, switch the dark shape off for light panels, and re-add the toggle.

To add a theme, create a block of `--color-*`, `--glass-*` and `--bg-dim` values under `[data-theme="<name>"]`. Copy the dark block in `tokens.css` as a starting point. Before using it, run its colours through the checks in [accessibility.md](accessibility.md#contrast).

## iPhone home-screen apps

Jewel works as a full-screen home-screen app that draws under the status bar:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
```

- `--sticky-offset` adds `env(safe-area-inset-top)`, so the header sits below the status bar and `.jewel-cap` fills the status bar with the gradient.
- `.page` keeps clear of the notch in landscape, and the lightbox pads all four sides for the status bar, notch and home indicator.
- `.fab` and `.sheet` already respect the safe areas, and the sheet shrinks above the on-screen keyboard.

Without `viewport-fit=cover`, the insets are 0 and nothing changes.
