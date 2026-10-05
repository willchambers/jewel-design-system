# Tokens

A *token* is a named setting, written as a CSS custom property such as `--space-4` or `--bg-speed`. Every Jewel component reads its colours, sizes and timings from tokens, so changing a token changes everything that uses it. All of them live in [`css/tokens.css`](../css/tokens.css).

- [How to change a token](#how-to-change-a-token)
- [The three tiers](#the-three-tiers)
- [Colour](#colour)
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
| 2. Theme | `[data-theme="dark"]` | The theme's colours (`--color-*`, `--glass-*`) |
| 3. Resolved | `:root, [data-theme]` | What components actually read (`--panel-*`, `--text-*`, `--field-*`, `--chart-*`) |

Components only use tier 3 (plus scale tokens like `--space-*`). That's what lets a theme or a solid panel change their colours without touching the components.

## Colour

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
| `--field-placeholder` | Placeholder text (the muted colour). |
| `--chart-1` … `--chart-5` | Chart series, in a fixed order. See [charts.md](charts.md#colours). |
| `--chart-accent`, `--chart-context` | The sparkline's end dot and line; the grey for a 6th series or more. |
| `--chart-grid`, `--chart-ring` | Chart gridlines; the gap colour between marks. |

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
| `--z-below` | -1 | The animated background |
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
| `--state-hover-fill` | 6% of the text colour | Rows, menu items and icon buttons under the pointer |
| `--state-pressed-fill` | 12% of the text colour | The same while pressed (`:active`) |
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

```css
:root {
  --bg-speed: 32s;      /* one full cycle */
  --bg-intensity: 1;    /* 0–1, gradient strength over --bg-base */
  --bg-blur: 0px;       /* extra softening, optional */
}
[data-theme="dark"] { --bg-dim: 0; }  /* 0–1 dark scrim over the gradient, per theme */
```

- `--bg-base` (`#7A2E9E`) is the colour under the gradient. It sits inside the Jewel colours' lightness range, so lowering `--bg-intensity` never makes a backdrop worse for contrast than the cases already tested.
- `--bg-dim` exists for themes whose panels need a darker backdrop to stand out. The parked light theme uses 0.4.
- With `prefers-reduced-motion: reduce`, the animation stops and the background holds a still composition.
- `data-bg="paused"` on `<html>` stops it on purpose.

## Performance notes

- The background is a single fixed layer (`contain: strict`, its own compositing layer). Only registered custom properties animate, and no layout runs. The gradient is repainted each frame, but only inside that isolated layer. This is the cost of interpolating gradient colours.
- In glass mode, `backdrop-filter` has to re-sample the moving background on every frame. That is the most expensive part of the system. If a low-end device struggles, use `data-bg="paused"`, or keep large surfaces `solid` and use glass on small ones such as the header.
