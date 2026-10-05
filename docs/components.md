# Components

Every Jewel component: its markup, options, events and scripting. For a quick introduction, start with the [README](../README.md). To see them all working, open the [live specimen](https://willchambers.github.io/jewel-design-system/) (its source is [index.html](../index.html)).

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
index.html              the specimen page
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
| `.span-3` … `.span-9`, `.span-12` | How many columns a grid child spans (from 48rem up). |
| `.start-2`, `.start-4`, `.start-5`, `.start-7`, `.start-8` | Which column a grid child starts in. Combine with a span: `span-9 start-4`. |
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

A sticky glass bar. `.nav__links` hide on narrow screens. Pair it with `<div class="jewel-cap">` right after `<div class="jewel-bg">`.

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

### Quote

```html
<blockquote class="quote">
  <p>…</p>
  <footer class="label">Source</footer>
</blockquote>
```

### Section head

```html
<section class="panel panel--pad grid">
  <header class="section-head"><p class="label">01 — Typography</p></header>
  <div class="span-9 start-4">…</div>
</section>
```

The rule under the label runs the full width of the panel, edge to edge.

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

`data-component` can list several names; they run in order. Buttons grow to 44px tall on touch screens. A complete working form, sheet and post flow is in the specimen's [Forms section](https://willchambers.github.io/jewel-design-system/#forms).

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
3. **Show it.** Add an example to `index.html` so the specimen stays the reference.

Rules that keep every component working with every theme and panel style:

- **Colour:** use only the resolved tokens: `--panel-bg`, `--panel-border`, `--panel-backdrop`, `--media-bg`, `--surface-solid`, `--text-default|muted|accent|inverse`, `--field-*` and `--chart-*`. Don't use hex values or `--color-*` primitives. Those don't switch between glass and solid, so they would skip the contrast adjustments. See [tokens.md](tokens.md).
- **Size and motion:** use `--space-*`, `--text-*`, `--radius-*`, `--hairline`, `--duration-*` and `--ease-*`.
- **Naming:** block `.name`, part `.name__part`, variant `.name--variant`.
- **Variants:** give each variant local custom properties rather than new rules. `button.css` works this way: a variant only sets `--btn-bg`, `--btn-fg` and so on.
- **Spacing:** don't reset margins on elements that might sit in a `.stack`; component styles outrank the stack's spacing.

**Cascade layers.** `jewel.css` declares `tokens → base → background → components → utilities`, and a later layer always wins. Your own page CSS sits outside the layers, so it overrides the system without `!important` or specificity fights.

**JS API.**

```js
Jewel.register('name', (el) => { … });  // runs for each [data-component="name"]
Jewel.mount(container);                  // wire up markup inserted later
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
