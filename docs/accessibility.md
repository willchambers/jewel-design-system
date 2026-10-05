# Accessibility

What Jewel does for you, what's left to you, and every contrast measurement behind the colours.

- [Built in](#built-in)
- [Your part](#your-part)
- [Keyboard and screen readers](#keyboard-and-screen-readers)
- [Contrast](#contrast)

## Built in

- **Contrast.** Every text colour meets WCAG AA (4.5:1) on glass and solid panels, measured over every part of the moving gradient. Form field edges meet 3:1.
- **Focus.** Everything interactive shows a visible 2px focus ring when reached by keyboard.
- **Reduced motion.** With "reduce motion" turned on in the system settings, the background stops, charts appear finished, sheets appear without sliding, and videos don't autoplay.
- **Touch targets.** Buttons, tags, checkboxes, switches and the charts' "Show data" links are at least 44px tall on touch screens.
- **Real elements.** Forms use real `<label>`s and inputs, sheets use `<dialog>`, stats use `<dl>`, and charts keep their `<table>`.
- **Hiding.** `hidden` always hides, so hidden things are hidden from screen readers too.

## Your part

- **Images:** write `alt` text for every image that carries meaning, and `alt=""` for decoration.
- **Forms:** give every field a `<label>` with a matching `for`.
- **Headings:** keep them in order (`h1`, then `h2`…), one `h1` per page.
- **Links:** write link text that makes sense on its own ("Read the report", not "Click here").
- **Language:** set `lang` on `<html>`.
- **Charts:** give each chart a title. Write table headers that name the categories and series.
- **Sparklines:** give each one an `aria-label` that says the trend ("Up from 9,100 to 12,400").
- **Badges:** hide a count with `aria-hidden="true"` if it repeats a label; wrap a status that changes in `role="status"`.
- **Notices:** use `role="alert"` for an error caused by something the person did and `role="status"` for background news. After dismissing one, move focus somewhere sensible.
- **Colours:** if you change a colour token, recheck it as described [below](#contrast).

## Keyboard and screen readers

| Component | Keyboard | Screen reader |
|---|---|---|
| Chart | Tab to the chart; arrow keys step through points or slices; Home/End jump; Esc hides the card. | A live region reads each point ("Feb: Classic 118,200, Electric 63,900"). The table is behind "Show data". |
| Sheet | Focus moves into the sheet and stays there. Esc closes it (asking first if there's an unsaved draft). | It's a modal `<dialog>`; focus returns to the button that opened it. |
| Tag input | Enter or comma adds a tag; Backspace in an empty box removes the last one. | Each change is announced ("Added Dayton, 3 of 10"). Each tag has a "Remove" button. |
| Drop zone | The file input is focusable; Enter opens the picker. | Errors are attached to the input and read with it. |
| Lightbox | Arrow keys move between photos; Esc closes. | Focus returns to the photo that opened it. |
| Filter | Tag buttons are ordinary buttons with `aria-pressed`. | A live region announces "Showing 2 of 3 projects". |
| Form | Validation runs when you leave a field and on submit; focus moves to the first problem. | Errors are linked to their fields with `aria-describedby` and `aria-invalid`. |

## Contrast

**How it was measured.** Each pairing was computed with the WCAG relative-luminance formula. Glass was tested as its fill blended over the worst-case backdrop. That covers each of the five Jewel colours, a near-white page (`#F4F4F5`) and a near-black page (`#0B0B0E`). The near-white and near-black backdrops matter because a panel's theme can differ from the page's, which puts a dark glass card over a light page or the reverse.

The tables cover both themes. The light rows apply to the parked light theme.

**Solid surfaces:** everything passes with the specified values.

| | on panel | on muted surface |
|---|---|---|
| Light default / muted / accent | 16.97 / 7.41 / 6.81 | 16.12 / 7.03 / 6.46 |
| Dark default / muted / accent | 17.15 / 7.35 / 10.21 | 15.44 / 6.62 / 9.19 |
| Inverse on default fill / accent fill | light 16.97 / 6.81 · dark 16.12 / 9.60 | |

**Glass surfaces** with the originally specified values failed:

| Worst case (spec values) | Ratio |
|---|---|
| Light muted #52525B, glass 0.72 over near-black | 3.86 ✗ |
| Light accent #6D28D9, glass 0.72 over Jewel purple | 4.23 ✗ |
| Dark muted #A1A1AA, glass 0.68 over near-white | 2.70 ✗ |
| Dark accent #C4B5FD, glass 0.68 over near-white | 3.75 ✗ |

**Changes** (glass only; the solid tokens keep the specified values):

| Token | Spec | Now | Worst case after |
|---|---|---|---|
| Light glass fill alpha | 0.72 | **0.86** | — |
| Dark glass fill alpha | 0.68 | **0.86** | — |
| Light muted text in glass | #52525B | **#4B4B53** | 6.10 |
| Light accent text in glass | #6D28D9 | **#5B21B6** | 6.34 |
| Dark muted text in glass | #A1A1AA | **#B4B4BD** | 6.32 |
| Dark accent text in glass | #C4B5FD | unchanged | 7.05 |
| Default text in glass | unchanged | | light 12.50 · dark 11.84 |

0.78 was the minimum that passes AA. It was raised to 0.86 so that small and light text (labels, captions) keeps a comfortable margin above 4.5:1.

These values are exposed as `--glass-fill`, `--glass-text-muted` and `--glass-text-accent`. They are the defaults. Under `data-panel="solid"`, the specified solid values apply instead.

**Form fields.** Checked the same way, on dark glass over every Jewel colour, near-white and near-black, and on solid panels:

| Token | Value | Worst case | Needs |
|---|---|---|---|
| `--field-border` | white 40% | 3.25:1 | 3:1 (input edge) |
| `--field-border-hover` | white 60% | 5.35:1 | 3:1 |
| `--field-focus` | = `--text-accent` | 7.05:1 | 3:1 edge, 4.5:1 text |
| `--field-error` | `#FCA5A5` | 6.86:1 | 4.5:1 (it is also text) |
| `--field-placeholder` | = `--text-muted` | 6.32:1 | 4.5:1 |

The 10% panel hairline (`--panel-border`) measures only 1.27:1. That is fine for decorative rules, but too faint to show where a field is, so fields never use it for their edges. Disabled fields keep muted text (6.32:1) with a dashed edge, so they stay readable.

**Badges over photos.** A badge sits on its own 86% `--panel-bg`, not on the panel, so it was checked over a pure-white photo, the worst case: default text 11.58:1, accent 6.89:1, error 6.70:1, and `.badge--solid` 16.12:1. Over darker photos the numbers only go up. Badges aren't interactive, so their pill edge needs no minimum contrast.

**Notices.** A notice adds a 3% white fill on top of the panel. Worst case, on glass over near-white: text 10.86:1, accent title 6.46:1, error title 6.29:1.

**Charts.** Series colours were checked for colour-blind and normal-vision separation as well as contrast. See [charts.md](charts.md#colours).

**The background.** `--bg-base` (`#7A2E9E`) sits inside the Jewel luminance range. Lowering `--bg-intensity` therefore never produces a backdrop worse than the cases tested above.

**Rechecking a colour you change.** Blend the glass fill (`rgb(17 17 20)` at 86%) over each of the backdrops listed at the top of this section. Then measure your text colour against each result with any WCAG contrast checker. The lowest ratio must be at least 4.5:1 for text and 3:1 for field edges.
