# Tokens

A *token* is a named setting, written as a CSS custom property such as `--space-4` or `--bg-speed`. Every Jewel component reads its colours, sizes and timings from tokens, so changing a token changes everything that uses it. All of them live in [`css/tokens.css`](../css/tokens.css).

- [How to change a token](#how-to-change-a-token)
- [The three tiers](#the-three-tiers)
- [Colour](#colour)
- [Type](#type)
- [Space and layout](#space-and-layout)
- [Panel shape and knockout lines](#panel-shape-and-knockout-lines)
- [Radius, borders, shadow, motion, glass](#radius-borders-shadow-motion-glass)
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
| `--hairline` | 1px |
| `--shadow-none` / `--shadow-float` | none / a very soft lift, used only by pop-up cards |
| `--ease-standard` / `--ease-out` | Easing curves |
| `--duration-fast` / `-base` / `-slow` | 120 / 200 / 400ms |
| `--glass-blur` / `--glass-saturate` | 24px / 140% |

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
