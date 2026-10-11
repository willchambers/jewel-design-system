# Jewel Design System

A dark, editorial design system for websites and web apps. Vanilla HTML, CSS and a little JS. No framework and no build step. `README.md` is the beginner's guide (quick start, examples, troubleshooting); `docs/` is the full reference (`components.md`, `tokens.md`, `accessibility.md`, `charts.md`); the specimen site (`index.html` plus one page per foundation, component and pattern in `foundations/`, `components/` and `patterns/`) is published at https://willchambers.github.io/jewel-design-system/ by GitHub Pages from `main`. Keep all of them in sync when anything changes, and keep README snippets copy-paste correct.

## The look (don't drift from it)

- **Dark-only.** The light theme is parked in `css/parked/light-theme.css` and is not imported. A future light theme is planned as a *different* direction, with no knockout lines and no rounded corners. Don't re-enable light unless asked.
- **Background:** the *lava lamp animation*, a full-viewport animated gradient of the five Jewel colors (`.jewel-bg`). It is the only expressive element. `data-palette="ember|lagoon|dusk"` on `<html>` swaps its five colors (`--bg-1…5`, `--bg-base`) for a warm or cool set; Jewel's own mix is the default. `.jewel-cap` sits right after it and hides content in the gap above the sticky header.
- **Panels:** glass by default (86% fill, 24px blur). Square corners.
- **Content panels** (any `.panel` directly in `.panel-stack`, or `.panel--content`) have the signature shape: square top-left, 2px top-right with two knockout hairlines (1px, 2px apart, 6px from the corner), and 10px bottom corners. `.no-knockout` opts one out.
- **Section heads:** a numbered `.label` in `.section-head` opens each content panel, with a full-width (edge-to-edge) 1px rule under it. The content follows in `span-9 start-4`.
- **Forms:** the hairline-box style. Fields are 1px square boxes in `--field-border` (40% white), which turn to a 2px accent box on focus and red (`--field-error`) on error, with uppercase `.field__label`s above. Field edges never use the 10% `--panel-border`, which is only 1.27:1; input edges need 3:1. Touch targets are at least 44px. The post flow is `.fab` → `dialog.sheet` → `post-form`, which fires `jewel:post` with no backend.
- **Badges:** status and counts over photos use `.badge` with `data-place`, never a one-off pill. Its own `--panel-bg` surface keeps it readable on any image.
- **Notices:** messages in the flow (offline, updated, errors, form messages) use `.notice`: a hairline box with a 2px tone edge on the left. No colored backgrounds, no icons.
- **Status:** the traffic light (`--status-success|warning|error|info|neutral`, each with a `-mark` tone for dots and bars). The state of a thing uses `.status` (a dot and a word), and the same tones on `.badge`, `.notice` and `.progress`. Status colors always mean something and chart colors never do: never swap one for the other, and never show a status by color alone.
- **Buttons:** `.btn--danger` (filled red) is the one filled color button, for the single action in a view that deletes or can't be undone.
- **Icons:** Lucide icons in `media/icons.svg`, drawn by `.icon` at the 1.25 hairline stroke with square ends. Add new ones as `<symbol>`s without stroke attributes.
- **Density:** `data-density="compact"` tightens panel padding, form gaps, buttons and table rows through tokens only; touch screens keep 44px targets.
- **Data:** highlighted numbers use `.stat` in a `dl.stats`: a small uppercase label and a large semibold value in the same Inter, with no color on the number. There is at most one `.stat--hero` per page.
- **Charts:** `figure.chart` drawn from its own HTML table by `chart.js`, with no chart library. Use the one validated palette, `--chart-1` to `--chart-5` (Jewel hues in a fixed order, never cycled; a 6th series or more goes gray). Marks are thin (2px lines, bars of 24px or less), gridlines are solid hairlines, text never takes a series color, and every chart keeps its table view.
- **Header:** a sticky glass bar with square corners and no knockout. There is no theme toggle.
- **Type:** Inter only. Hierarchy comes from size, weight and spacing: tight display headings, 1.6 body, small tracked uppercase `.label`s.
- **Restraint:** hairline rules, almost no shadow, understated hovers (the underline shifts, the color moves to accent).

## Rules for changes

- Link only `css/jewel.css`. It imports everything in cascade layers: `tokens → base → background → components → utilities`.
- **Color:** components use only the resolved tokens: `--panel-bg`, `--panel-border`, `--panel-backdrop`, `--media-bg`, `--surface-solid`, `--text-default|muted|accent|inverse`, `--field-border|border-hover|fill|focus|error|placeholder`, `--status-*` and `--status-*-mark`, `--chart-1…5|accent|context|grid|ring`. Never use hex values or `--color-*` primitives in components.
- **Size and motion:** use `--space-*`, `--text-*`, `--radius-*`, `--hairline`, `--duration-*` and `--ease-*`.
- **New component:** copy `css/components/_template.css`, then add one `@import … layer(components)` line to `jewel.css`. If it needs JS, copy `js/components/_template.js`, register it with `Jewel.register('name', el => …)`, and put `data-component="name"` on the element. Show it on the specimen: copy a page in `components/`, add one line to the `NAV` list in `specimen/specimen.js` (it builds the side nav, the phone drawer and the previous/next links), and put examples in `.spec-example` blocks so the Copy-able code appears under them automatically. `specimen/specimen.css` is for the specimen only and never ships in `jewel.css`.
- **Frameworks:** CSS reads only classes and attributes, so a React app can skip a component's script. Each interactive component page has a "Without Jewel's JS" section; keep it in step when a script changes. Charts take data through `Jewel.chart.render()` / `update()`, which still write the table.
- **Releases:** semantic versions, tagged `vX.Y.Z` on GitHub (jsDelivr serves the tags). Bump `package.json`, add a `CHANGELOG.md` entry, and update the version in README's CDN links.
- **Contrast:** every text token must meet WCAG AA (4.5:1) on solid and on glass. Glass is tested alpha-blended over each Jewel color and over near-white and near-black backdrops. If you change a color or the glass alpha, recheck it and update docs/accessibility.md "Contrast" tables.
- Respect `prefers-reduced-motion`. The background freezes, and video doesn't autoplay.

## Previewing

Serve the folder over http. `file://` is fine for a quick look. The `@import`s need no build.
