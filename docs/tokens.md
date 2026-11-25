# Tokens

A *token* is a named setting, written as a CSS custom property such as `--space-4` or `--bg-speed`. Every Jewel component reads its colors, sizes and timings from tokens, so changing a token changes everything that uses it. All of them live in [`css/tokens.css`](../css/tokens.css).

- [How to change a token](#how-to-change-a-token)
- [The three tiers](#the-three-tiers)
- [Color](#color)
- [Type](#type)
- [Space and layout](#space-and-layout)
- [Panel shape and knockout lines](#panel-shape-and-knockout-lines)
- [Radius, borders, shadow, motion, glass](#radius-borders-shadow-motion-glass)
- [Breakpoints](#breakpoints)
- [Control and icon sizes](#control-and-icon-sizes)
- [Z-index](#z-index)
- [Interaction states](#interaction-states)
- [Layer and region sizes](#layer-and-region-sizes)
- [Background](#background)
- [Performance notes](#performance-notes)

## How to change a token

Don't edit `tokens.css`. Set the token in your own stylesheet, loaded after `jewel.css`:

```css
:root {
  --bg-speed: 60s;
}
```

To change it for one element only, set it on that element: `style="--knockout-offset: 16px"`.

## The three tiers

| Tier | Where | What it holds |
|---|---|---|
| 1. Primitives | `:root` | Raw values: the Jewel palette, the type scale, spacing, radii, motion |
| 2. Theme | `[data-theme="dark"]` | The theme's colors (`--color-*`, `--glass-*`) |
| 3. Resolved | `:root, [data-theme]` | What components actually read (`--panel-*`, `--text-*`, `--field-*`, `--chart-*`) |

Components only use tier 3 (plus scale tokens like `--space-*`). That's what lets a theme or a solid panel change their colors without touching the components.

## Color

Use these resolved tokens in components and page CSS.

| Token | What it's for |
|---|---|
| `--panel-bg` | A panel's surface. Glass by default; opaque under `data-panel="solid"`. |
| `--panel-border` | Hairline edges and dividers (10% white on glass). |
| `--panel-backdrop` | The glass blur. `none` on solid panels. |
| `--media-bg` | The backdrop behind images while they load. |
| `--surface-solid` | An opaque backing, e.g. for native dropdown menus. |
| `--scrim` | The dimmed page behind a modal sheet. |
| `--text-default` | Body text and headings. |
| `--text-muted` | Labels, captions, secondary text. |
| `--text-accent` | Links on hover, focus rings, emphasis. |
| `--text-inverse` | Text on a light fill (`.btn`, `.tag--solid`). |
| `--field-border`, `--field-border-hover` | Form field edges (40% and 60% white, so they meet 3:1). |
| `--field-fill` | A faint fill inside fields. |
| `--field-focus` | Field focus rings (the accent). |
| `--field-error` | Error text and edges. |
| `--field-placeholder` | Placeholder text (the muted color). |
| `--status-success`, `--status-warning`, `--status-error`, `--status-info`, `--status-neutral` | Status text, notice titles and edges: the traffic light. |
| `--status-*-mark` | The stronger tone of each status, for dots, bars and fills. |
| `--chart-1` … `--chart-5` | Chart series, in a fixed order. See [charts.md](charts.md#colors). |
| `--chart-accent`, `--chart-context` | The sparkline's end dot and line; the gray for a 6th series or more. |
| `--chart-grid`, `--chart-ring` | Chart gridlines; the gap color between marks. |

The values behind them, in the dark theme:

| Token | Value |
|---|---|
| `--color-surface` | `#111114` |
| `--color-surface-muted` | `#1C1C21` |
| `--color-border` | `#2A2A31` |
| `--color-text` | `#F4F4F5` |
| `--color-text-muted` (solid) / `--glass-text-muted` (glass) | `#A1A1AA` / `#B4B4BD` |
| `--color-text-accent` / `--glass-text-accent` | `#C4B5FD` |
| `--color-text-inverse` | `#18181B` |
| `--glass-fill` | `rgb(17 17 20 / 0.86)` |
| `--glass-border` | `rgb(244 244 245 / 0.10)` |
| `--color-field-border` / `-hover` | `rgb(244 244 245 / 0.40)` / `0.60` |
| `--color-error` | `#FCA5A5` |
| `--color-success` / `-mark` | `#86EFAC` / `#22C55E` |
| `--color-warning` / `-mark` | `#FCD34D` / `#FBBF24` |
| `--color-info` / `-mark` | `#93C5FD` / `#60A5FA` |
| `--color-error-mark` | `#EF4444` |

**Status colors always mean something** (running, pending, failed); chart colors never do. Don't use one for the other: a pod's state gets `.status`, not `--chart-1`. Each status has a text tone (at least 4.5:1, also used for notice titles and edges) and a mark tone for dots and bars (at least 3:1). `--status-neutral` is the muted text color with the chart's context gray as its mark, for unknown states.

Why glass text is a little lighter than solid text, and every contrast measurement, is in [accessibility.md](accessibility.md#contrast).

The background's own palette: `--jewel-purple` `#6D28D9`, `--jewel-magenta` `#C026D3`, `--jewel-teal` `#0F9488`, `--jewel-red` `#DC2626`, `--jewel-orange` `#EA580C`.

## Type

New in this version: `--font-mono` (code), `--text-2xs` (10px, micro badges only), `--text-code` (0.9em), `--leading-display` / `-heading` / `-label` / `-compact` (0.95 / 1.08 / 1.4 / 1.5) beside `--leading-tight` / `-snug` / `-body`, and `--tracking-subheading` (-0.01em, h4) and `--tracking-tag` (0.04em, tags and chips).

| Token | Value | Use |
|---|---|---|
| `--font-sans` | Inter, then Helvetica Neue, Helvetica, Roboto, Arial | Everything |
| `--weight-regular` / `-medium` / `-semibold` / `-bold` | 400 / 500 / 600 / 700 | |
| `--text-xs` | 12px | Labels |
| `--text-sm` | 14px | Captions |
| `--text-base` | 16px | Body |
| `--text-lg` | 18–20px | Lede |
| `--text-xl` | 22–28px | `h3` |
| `--text-2xl` | 28–44px | `h2` |
| `--text-3xl` | 40–80px | `h1` |
| `--text-display` | 48–128px | Hero |
| `--leading-tight` / `-snug` / `-body` | 1.02 / 1.2 / 1.6 | Line heights |
| `--tracking-display` / `-heading` / `-body` / `-label` | −0.045em / −0.025em / −0.006em / 0.12em | Letter spacing |
| `--measure` | 64ch | Longest comfortable line |

The larger sizes are fluid: they scale between the two values as the screen goes from 360px to 1280px wide.

## Space and layout

| Token | Value |
|---|---|
| `--space-1` … `--space-10` | 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px |
| `--grid-columns` | 12 |
| `--grid-gutter` | 16–32px, fluid |
| `--page-max` | 80rem (1280px) |
| `--page-margin` | 16–56px, fluid |
| `--panel-padding` | 24–48px, fluid |
| `--sticky-offset` | 16px plus the iPhone status bar, when there is one: the gap above the sticky header |
| `--header-h` | 4.125rem (66px): the sticky header bar's height |

## Panel shape and knockout lines

| Token | Default | What it does |
|---|---|---|
| `--panel-radius` | `0` | Every panel's corners |
| `--panel-radius-top-right` | `2px` | Content panels: the knockout corner, just softened |
| `--panel-radius-bottom` | `10px` | Content panels: bottom-left and bottom-right |
| `--knockout-offset` | `6px` | Corner to the first line |
| `--knockout-width` | `1px` | Line thickness |
| `--knockout-gap` | `2px` | Space between the two lines |

## Radius, borders, shadow, motion, glass

| Token | Value |
|---|---|
| `--radius-0` / `-1` / `-2` / `-3` / `-pill` | 0 / 2px / 4px / 8px / 999px |
| `--radius-round` | 50% (dots, radios, round icon buttons) |
| `--hairline` | 1px |
| `--rule-strong` | 2px: the selected tab's rule, the current nav item's edge, tone edges, focus rings |
| `--shadow-none` / `--shadow-float` | none / a very soft lift, used only by pop-up cards |
| `--ease-standard` / `--ease-out` | Easing curves |
| `--duration-fast` / `-base` / `-slow` | 120 / 200 / 400ms |
| `--duration-spin` / `--duration-pulse` | 800ms (one turn of a busy spinner) / 1.4s (a busy dot, the chat's typing dots) |
| `--glass-blur` / `--glass-saturate` | 24px / 140% |

## Density

`data-density="compact"` on `<html>`, a region or one panel tightens the layout for dashboards and dense tools. It only changes tokens, so every component follows.

| Token | Default | Compact |
|---|---|---|
| `--panel-padding` | 24–48px (fluid) | 16px |
| `--panel-stack-gap` | 16px | 12px |
| `--density-gap` | 24px (between fields in a form) | 12px |
| `--control-h` | 40px | 32px |
| `--control-h-touch` | 44px | 36px with a mouse; 44px on touch screens |

Tables inside a compact region get 32px rows, like `.table--compact`.

## Breakpoints

| Token | Value | What changes there |
|---|---|---|
| `--bp-sm` | 40rem (640px) | Below it, phone-only tweaks: stacked tables, breadcrumbs as a back link, full-height sheets, the index list's two columns |
| `--bp-md` | 48rem (768px) | The 12-column grid and two-column forms open up; the header shows its links instead of the menu button |
| `--bp-lg` | 64rem (1024px) | The persistent side nav column appears (`.with-side-nav`) |
| `--bp-xl` | 80rem (1280px) | Same as `--page-max`: the page stops growing |

CSS can't read custom properties inside `@media`, so components write the value and name the token in a comment: `@media (min-width: 48rem) { /* --bp-md */ … }`. Design mobile first: style the phone, then add `min-width` rules. Scripts can read the tokens: `getComputedStyle(document.documentElement).getPropertyValue('--bp-md')` (the side nav does this).

## Control and icon sizes

| Token | Value | Used by |
|---|---|---|
| `--control-h-xs` | 1.5rem (24px) | Tags and chips you can't press |
| `--control-h-sm` | 2rem (32px) | Touch-size tags, compact table rows |
| `--control-h` | 2.5rem (40px) | Buttons, tabs, menu items and side nav links with a mouse |
| `--control-h-touch` | 2.75rem (44px) | Fields, and every control on a touch screen |
| `--control-h-lg` | 3.5rem (56px) | The floating action button, the chat header |
| `--hit-min` | 2.75rem (44px) | The smallest tap area. Small controls reach it with an invisible `::before` or `::after` |
| `--icon-xs` / `-sm` / `-md` / `-lg` | 14 / 16 / 22 / 28px | Spinners and chevrons / icons in buttons and fields / the fab and header actions / empty states and the drop zone |
| `--icon-stroke` | 1.25 | Hairline icon stroke width (SVG units) |

## Z-index

One scale, so layers never fight. Menus, the date picker and search suggestions also open in the browser's top layer (see `Jewel.float` in [components.md](components.md#adding-a-component)), so no panel can clip them; the numbers matter only where that isn't supported.

| Token | Value | What sits there |
|---|---|---|
| `--z-below` | -1 | The lava lamp animation |
| `--z-base` | 0 | Page content |
| `--z-raised` | 1 | Badges over photos, a sticky table header |
| `--z-overlay` | 3 | Hover cards inside a component (chart tooltips) |
| `--z-cap` | 9 | `.jewel-cap`, just under the header |
| `--z-sticky` | 10 | The sticky header |
| `--z-fab` | 20 | The floating action button |
| `--z-dropdown` | 30 | Menus, the date picker, search suggestions |
| `--z-drawer` | 40 | The side nav drawer, the floating chat window |
| `--z-toast` | 50 | Reserved for toasts |

## Interaction states

Every component takes its hover, pressed, selected and disabled looks from these, so they feel the same everywhere.

| Token | Value | Used for |
|---|---|---|
| `--state-hover-fill` | 6% of the text color | Rows, menu items and icon buttons under the pointer |
| `--state-pressed-fill` | 12% of the text color | The same while pressed (`:active`) |
| `--state-selected-fill` | 14% of the accent | Selected rows, the current side nav item, the open tab |
| `--state-pressed-solid` | the accent, 22% toward the inverse | Filled buttons and filled tags while pressed |
| `--state-disabled-opacity` | 0.55 | Disabled controls (they also go dashed and show `not-allowed`) |
| `--state-pressed-scale` | 0.98 | Icon buttons and the fab dip slightly when pressed |

## Layer and region sizes

| Token | Value | Used by |
|---|---|---|
| `--layer-w-sm` / `-md` / `-lg` | 12 / 20 / 26rem | Menus' minimum width / menus' maximum width and the side nav drawer / the floating chat window |
| `--layer-h` | 24rem | Menus and suggestion lists scroll past this |
| `--region-h` | 28rem | `.code--tall` and `.table-wrap--tall` scroll past this |
| `--side-nav-w` | 15rem | The persistent side nav column |
| `--chat-h` | 40rem | The chat shell's height in a page (capped at 80% of the screen) |

## Background

The animated background is called the *lava lamp animation*. These tokens tune it.

```css
:root {
  --bg-speed: 32s;      /* one full cycle */
  --bg-intensity: 1;    /* 0–1, gradient strength over --bg-base */
  --bg-blur: 0px;       /* extra softening, optional */
}
[data-theme="dark"] { --bg-dim: 0; }  /* 0–1 dark scrim over the gradient, per theme */
```

- `--bg-base` (`#7A2E9E`) is the color under the gradient. It sits inside the Jewel colors' lightness range, so lowering `--bg-intensity` never makes a backdrop worse for contrast than the cases already tested.
- `--bg-dim` exists for themes whose panels need a darker backdrop to stand out. The parked light theme uses 0.4.
- With `prefers-reduced-motion: reduce`, the lava lamp animation stops and the background holds a still composition.
- `data-bg="paused"` on `<html>` stops it on purpose.

### Palettes

The animation cycles through five colors, `--bg-1` to `--bg-5`, over `--bg-base`. They default to the Jewel palette. `data-palette` on `<html>` swaps in another set:

| `data-palette` | Colors | Feel |
|---|---|---|
| (none) | Purple, magenta, teal, red, orange over `#7A2E9E` | Jewel: warm and cool together |
| `ember` | `#DC2626` `#EA580C` `#D97706` `#BE185D` `#C026D3` over `#9A3412` | Warm |
| `lagoon` | `#0F9488` `#0369A1` `#4338CA` `#0E7490` `#2563EB` over `#155E75` | Cool |
| `dusk` | `#6D28D9` `#BE185D` `#1D4ED8` `#7E22CE` `#DB2777` over `#4C1D95` | Violet and rose |
| `glacier` | `#0EA5E9` `#22D3EE` `#4F46E5` `#0F766E` `#38BDF8` over `#1E3A5F` | Cool: crisp and bright |
| `aurora` | `#10B981` `#8B5CF6` `#06B6D4` `#6366F1` `#14B8A6` over `#123A4A` | Cool: emerald and violet |
| `deepsea` | `#0369A1` `#0E7490` `#1D4ED8` `#0F766E` `#155E75` over `#0B2A4A` | Cool: the calmest. Also sets `--bg-speed: 48s` |
| `polar` | `#4338CA` `#6D28D9` `#0284C7` `#334155` `#64748B` over `#1E1B4B` | Cool: indigo and steel |
| `jewel` | The default colors | Names the default, for an element inside a page that uses another palette |

For your own palette, set `--bg-1` … `--bg-5` and `--bg-base` in your stylesheet. Text contrast is safe as long as no color is lighter than `#F4F4F5`, the near-white backdrop glass is tested over. Write it as a `[data-palette="your-name"]` rule and the [background picker](components.md#background-picker) can offer it, swatch included.

### Wax blobs

A second, optional motion on top of the lava lamp animation: five blobs of wax in the palette's colors that rise, sink and squash on long, out-of-step loops. Add the layer after `.jewel-bg`, and a copy inside `.jewel-cap` so the strip above the header matches:

```html
<div class="jewel-bg" aria-hidden="true"></div>
<div class="jewel-wax" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
<div class="jewel-cap" aria-hidden="true">
  <div class="jewel-wax"><i></i><i></i><i></i><i></i><i></i></div>
</div>
```

It shows only with `data-bg-motion="wax"` on `<html>`, so the markup can stay in the page and a setting can turn it on. `--bg-wax-speed` (default `1`) scales its timing: above 1 is slower. Each blob is one gradient moved with `translate` and `scale` only, so nothing repaints. It stops with reduced motion and with `data-bg="paused"`.

### Your own image or video

A photo, a render or a looping clip can sit in place of the gradient:

```html
<div class="jewel-bg" aria-hidden="true"></div>
<div class="jewel-media" aria-hidden="true">
  <img class="jewel-media__still" src="night-sky.webp" alt="">
</div>
```

```html
<div class="jewel-media" aria-hidden="true">
  <video src="night-sky.mp4" poster="night-sky.jpg" autoplay muted loop playsinline></video>
</div>
```

- `.jewel-bg` stays underneath and shows while the media loads, so set a palette close to the media's colors.
- `.jewel-media__still` drifts very slowly (a 6% zoom over 70s), so the glass has something to refract. Leave the class off for a fixed picture.
- A fine static grain over the media hides the banding that dark gradients get in 8-bit video and webp.
- `.jewel-cap` is hidden while `.jewel-media` is on the page: the cap can only paint the gradient.
- With reduced motion the still stops drifting. Don't autoplay the video then: leave `autoplay` off and show the poster (`Jewel.reducedMotion.matches` tells a script which).
- Pick dark, low-contrast media. Text on glass stays readable over anything (it is tested over near-white and near-black), but a busy picture competes with the content.

## Performance notes

- The background is a single fixed layer (`contain: strict`, its own compositing layer). Only registered custom properties animate, and no layout runs. The gradient is repainted each frame, but only inside that isolated layer. This is the cost of interpolating gradient colors.
- In glass mode, `backdrop-filter` has to re-sample the moving background on every frame. That is the most expensive part of the system. If a low-end device struggles, use `data-bg="paused"`, or keep large surfaces `solid` and use glass on small ones such as the header.
