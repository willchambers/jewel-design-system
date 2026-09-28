# Jewel Design System

A personal design system for portfolio sites. Vanilla HTML, CSS and a little JS. No framework and no build step. `README.md` is the full reference, and `index.html` is the live specimen page. Keep all three in sync when anything changes.

## The look (don't drift from it)

- **Dark-only.** The light theme is parked in `css/parked/light-theme.css` and is not imported. A future light theme is planned as a *different* direction, with no knockout lines and no rounded corners. Don't re-enable light unless asked.
- **Background:** a full-viewport animated gradient of the five Jewel colours (`.jewel-bg`). It is the only expressive element. `.jewel-cap` sits right after it and hides content in the gap above the sticky header.
- **Panels:** glass by default (86% fill, 24px blur). Square corners.
- **Content panels** (any `.panel` directly in `.panel-stack`, or `.panel--content`) have the signature shape: square top-left, 2px top-right with two knockout hairlines (1px, 3px apart, 10px from the corner), and 10px bottom corners. `.no-knockout` opts one out.
- **Header:** a sticky glass bar with square corners and no knockout. There is no theme toggle.
- **Type:** Inter only. Hierarchy comes from size, weight and spacing: tight display headings, 1.6 body, small tracked uppercase `.label`s.
- **Restraint:** hairline rules, almost no shadow, understated hovers (the underline shifts, the colour moves to accent).

## Rules for changes

- Link only `css/jewel.css`. It imports everything in cascade layers: `tokens → base → background → components → utilities`.
- **Colour:** components use only the resolved tokens: `--panel-bg`, `--panel-border`, `--panel-backdrop`, `--media-bg`, `--text-default|muted|accent|inverse`. Never use hex values or `--color-*` primitives in components.
- **Size and motion:** use `--space-*`, `--text-*`, `--radius-*`, `--hairline`, `--duration-*` and `--ease-*`.
- **New component:** copy `css/components/_template.css`, then add one `@import … layer(components)` line to `jewel.css`. If it needs JS, copy `js/components/_template.js`, register it with `Jewel.register('name', el => …)`, and put `data-component="name"` on the element. Add an example to `index.html`.
- **Contrast:** every text token must meet WCAG AA (4.5:1) on solid and on glass. Glass is tested alpha-blended over each Jewel colour and over near-white and near-black backdrops. If you change a colour or the glass alpha, recheck it and update the README "Contrast" tables.
- Respect `prefers-reduced-motion`. The background freezes, and video doesn't autoplay.

## Previewing

Serve the folder over http. `file://` is fine for a quick look. The `@import`s need no build.
