# Changelog

Jewel uses [semantic versions](https://semver.org). Each release is a git tag (`v1.0.0`), so you can pin it by that exact tag name, for example from jsDelivr: `https://cdn.jsdelivr.net/gh/willchambers/jewel-design-system@v1.0.0/css/jewel.css`.

## 1.0.0 — 2026-10-13

The first tagged release. It fills the gaps found when [kubestoplight](https://github.com/cchamp-msft/kubestoplight/pull/1) moved from IBM Carbon to Jewel.

### Added

- **Status colors:** the traffic light, `--status-success`, `--status-warning`, `--status-error`, `--status-info` and `--status-neutral`, each with a stronger `-mark` tone for dots and bars. All checked for contrast on glass and solid panels.
- **Status component:** `.status`, a dot and a word for the state of a pod, job or deploy. Status tones on `.badge`, `.notice` and `.progress` too.
- **Destructive button:** `.btn--danger`, filled red.
- **Right-hand drawer:** `.sheet--end`, for the details of a record.
- **Sheet titles:** `.sheet__title` is now a heading, with an optional `.sheet__eyebrow` label above it in `.sheet__titles`.
- **Stacked meta list:** `.meta--stacked`, for long keys and values.
- **Tooltip:** `.tooltip` and `tooltip.js`.
- **Spinner:** `.spinner` in three sizes, and `.loading` for a spinner with text.
- **Skeleton loader:** `.skeleton`, `.skeleton__line` and `.skeleton__block`.
- **Password field:** `.password` and `password.js`, with an eye button to show and hide.
- **Icons:** `media/icons.svg`, 88 Lucide icons drawn by `.icon` at Jewel's stroke, and an Icons page.
- **Compact density:** `data-density="compact"`.
- **Charts from data:** `Jewel.chart.render()` and `update()`.
- **Background palettes:** `data-palette="ember"` (warm), `"lagoon"` (cool) and `"dusk"`.
- **Self-hosted Inter:** `css/fonts.css` and `fonts/`, as an option to Google Fonts.
- **Framework notes:** a "Without Jewel's JS" section on each interactive component page.
- **License:** MIT.

### Changed

- `.sheet__title` without `.label` is now heading-sized. Existing sheets that use `class="sheet__title label"` look the same.
- Meta lists stack the label above the value on phones (below 40rem).
- `Jewel.float()` takes `align: 'center'`.
- The lava lamp animation reads its colors from `--bg-1` to `--bg-5`, which default to the Jewel palette.
