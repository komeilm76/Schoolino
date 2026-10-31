# Design System — Schoolino

The design system is implemented as **CSS custom properties** exposed to Tailwind through
`@theme inline` (so utilities reference live variables and theme switching is instant), and as a
small set of reusable classes in the `components` cascade layer.

Source of truth: `src/styles/main.css`. Vuetify tokens: `src/plugins/vuetify.ts`.

---

## 1. Design principles

1. **Warm canvas, cool brand.** Paper-cream backgrounds make indigo feel editorial rather than
   “startup SaaS”.
2. **One accent per section.** A section is either brand-washed, accent-washed or neutral — never all
   three competing.
3. **Structure as decoration.** Orbits, grids, dashes and dials come from the product's own language
   (progress, chapters, paths) instead of generic blobs.
4. **Typography carries the hierarchy.** Weight and size do the work; colour is reserved for meaning.
5. **Motion is a hint, not an event.** If an effect does not explain something, it is removed.
6. **Persian first.** Layout, spacing, numerals and line-height are tuned for Persian, then Latin is
   fitted (brand text, counters).

---

## 2. Colour system

### 2.1 Brand & neutrals (light)

| Token                   | Value                             | Usage                                               |
| ----------------------- | --------------------------------- | --------------------------------------------------- |
| `--c-brand`             | `#5741D6`                         | Primary actions, active nav, key icons              |
| `--c-brand-hover`       | `#4834BE`                         | Hover state of primary actions                      |
| `--c-brand-soft`        | `#EDE9FF`                         | Tinted chips/rows, selected states                  |
| `--c-brand-ink`         | `#241C63`                         | Text on brand-soft                                  |
| `--c-brand-100/200/300` | `#E4DFFF` / `#CBC2FF` / `#ADA0FA` | Decorative gradients, hover borders                 |
| `--c-accent`            | `#F4A62A`                         | Saffron accent: highlights, recommended plan, stars |
| `--c-accent-strong`     | `#D98A0B`                         | Accent hover / accent text on light                 |
| `--c-accent-soft`       | `#FFF0D2`                         | Accent badges                                       |
| `--c-mint`              | `#1C9C7E`                         | Success, progress, completion                       |
| `--c-coral`             | `#E2573F`                         | Destructive/attention (used sparingly)              |
| `--c-bg`                | `#FAF7F1`                         | Page canvas (cream)                                 |
| `--c-bg-deep`           | `#F3EEE4`                         | Alternating section canvas                          |
| `--c-surface`           | `#FFFFFF`                         | Cards, panels                                       |
| `--c-surface-soft`      | `#F7F3EA`                         | Inset panels, hover fills                           |
| `--c-band`              | `#171631`                         | Dark bands (stats, testimonials, CTA)               |
| `--c-ink`               | `#14142B`                         | Primary text                                        |
| `--c-ink-soft`          | `#565670`                         | Body text                                           |
| `--c-ink-faint`         | `#83839C`                         | Captions, meta                                      |
| `--c-border`            | `#E7E0D3`                         | Default borders                                     |
| `--c-border-strong`     | `#D3C9B6`                         | Emphasised borders, empty stars                     |

Action colours are separated from brand colours so a dark theme can invert button polarity without
touching brand identity: `--c-action-bg`, `--c-action-hover`, `--c-action-ink`.

### 2.2 Dark theme

Dark mode is not an inversion; it is a re-tuned palette (`:root[data-theme='dark']`):

- Canvas `#0B0B14`, surfaces `#141422`/`#1A1A2C`, borders `#29283F`.
- Brand becomes a _light_ indigo `#B0A2FF` with **dark ink** buttons (`--c-action-ink: #191334`) so
  primary actions keep ≥ 4.5:1 label contrast.
- Accent becomes `#FFC46B`, mint `#56D3B2`, coral `#FF8B74` (lighter tones for dark backgrounds).
- Shadows are replaced by deeper, tighter shadows plus borders (dark UI relies on borders, not
  shadow) — every surface keeps a visible 1px outline.

### 2.3 Contrast audit (sampled)

| Pair                              | Ratio   | Verdict                    |
| --------------------------------- | ------- | -------------------------- |
| `#14142B` on `#FAF7F1`            | ~15.8:1 | AAA                        |
| `#565670` on `#FAF7F1`            | ~6.9:1  | AA+                        |
| `#83839C` on `#FFFFFF`            | ~4.7:1  | AA (captions only, ≥ 14px) |
| `#FFFFFF` on `#5741D6`            | ~5.9:1  | AA                         |
| `#21170A` on `#F4A62A`            | ~9.4:1  | AAA                        |
| `#F7F4EC` on `#171631`            | ~14.9:1 | AAA                        |
| `#BAB7D4` on `#171631`            | ~7.6:1  | AA+                        |
| `#191334` on `#C3B6FF` (dark CTA) | ~10.9:1 | AAA                        |

---

## 3. Typography

### 3.1 Families

| Role                                 | Family                         | Notes                                                                    |
| ------------------------------------ | ------------------------------ | ------------------------------------------------------------------------ |
| Display (h1–h5, numbers in headings) | **Estedad Variable**           | Geometric Persian face; excellent Persian numerals, confident at 700–800 |
| Body                                 | **Vazirmatn Variable**         | High legibility at 16px, wide weight range 100–900                       |
| Latin / brand                        | **Plus Jakarta Sans Variable** | Only for “SCHOOLINO”, counters, and Latin meta                           |

All three are installed from Fontsource and bundled locally (no Google Fonts request at runtime).

### 3.2 Scale

Fluid, using `clamp()` so Persian line breaks stay stable between breakpoints:

| Token / class               | Size                                       | Line-height | Weight |
| --------------------------- | ------------------------------------------ | ----------- | ------ |
| `.text-display` (hero h1)   | `clamp(2.3rem, 1.35rem + 3.7vw, 4.15rem)`  | 1.22        | 800    |
| `.text-h2` (section titles) | `clamp(1.85rem, 1.4rem + 1.9vw, 2.9rem)`   | 1.3         | 700    |
| `.text-h3` (card titles)    | `clamp(1.15rem, 1.05rem + 0.45vw, 1.4rem)` | 1.5         | 700    |
| `.text-lead`                | `clamp(1.02rem, 0.98rem + 0.3vw, 1.18rem)` | 2.0         | 400    |
| `.text-body`                | 0.98rem                                    | 1.95        | 400    |
| `.text-caption`             | 0.83rem                                    | 1.8         | 400    |
| `.eyebrow`                  | 0.8rem                                     | —           | 600    |

Rules: headings use `text-wrap: balance`; paragraphs use `text-wrap: pretty`; body copy never drops
below 16px on mobile; numerals are Persian (`Intl.NumberFormat('fa-IR')`) except inside elements
explicitly marked `dir="ltr"` / `.u-latin`.

---

## 4. Spacing, grid & layout

- **Spacing rhythm:** 4px base, steps `0.25 / 0.5 / 0.75 / 1 / 1.25 / 1.5 / 2 / 2.5 / 3 / 4rem`.
- **Container:** `.container-page` → `max-width: 78rem`, padding `clamp(1.15rem, 4vw, 2.75rem)`.
- **Section rhythm:** `.section` → `padding-block: clamp(4rem, 2.6rem + 6vw, 7.75rem)`; `.section--tight` for bands.
- **Grids:** 12-column base (Tailwind), bento grid in “why” (7/5, 4/4/4), 3-up teacher/plan grids,
  2-up quotes/specs.
- **Breakpoints:** 640 / 768 / 1024 / 1280 (Tailwind defaults) — verified at 390, 768, 1024, 1440, 1920.

---

## 5. Shape, elevation & borders

| Token      | Value | Usage                            |
| ---------- | ----- | -------------------------------- |
| `--r-sm`   | 12px  | Small chips-in-panel, inputs     |
| `--r-md`   | 16px  | Buttons, medium cards            |
| `--r-lg`   | 22px  | Panels, FAQ rows                 |
| `--r-xl`   | 28px  | Cards, section panels            |
| `--r-2xl`  | 36px  | Hero card, plan cards, CTA panel |
| `--r-pill` | 999px | Chips, toggles, avatars          |

Elevation ladder: `--shadow-xs` (chips) → `sm` (cards at rest) → `md` (hover) → `lg` (floating
elements, drawer) → `xl` (hero mock, recommended plan, CTA panel). Shadows are always indigo-tinted
(`rgb(28 23 71 / …)`), never pure black, which keeps the cream canvas warm.

Borders are part of the visual language: 1px `--c-border` by default, `--c-border-strong` on hover or
emphasis, brand-tinted (40% brand) for selected states, plus a 3px gradient top-edge on the selected
grade card.

---

## 6. Components

| Component       | Class / file                                                                       | Notes                                                                              |
| --------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Button          | `.btn` + modifiers `--primary/--accent/--outline/--soft/--ghost/--lg/--sm/--block` | Min height 48px (56px large), 16px radius, hover = −2px lift, active resets lift   |
| Chip / badge    | `.chip`, `.chip--brand/--accent/--mint`                                            | Pill, 12–13px, never colour-only meaning                                           |
| Card            | `.card`, `.card--raised`, `.card--flat`                                            | Surface + border + radius + shadow ladder                                          |
| Section heading | `SectionHeading.vue`                                                               | Eyebrow + h2 + lead, start or centre aligned, inverted variant                     |
| Icon            | `AppIcon.vue`                                                                      | Iconify + generated Lucide subset; decorative by default, labelled when meaningful |
| Logo            | `BrandLogo.vue`                                                                    | Original mark (book → graduation cap), light and inverted variants                 |
| Level glyph     | `LevelGlyph.vue`                                                                   | Three original SVG glyphs (blocks + sun, compass, orbit)                           |
| Stars           | `StarRating.vue`                                                                   | Inline SVG, filled/empty states, accessible label “امتیاز X از ۵”                  |
| Avatars         | `AvatarStack.vue`                                                                  | Overlapping initials, `+n` overflow, names for screen readers                      |
| Billing toggle  | `BillingToggle.vue`                                                                | `role="group"` + `aria-pressed` buttons                                            |
| Demo notice     | `DemoNoticeHost.vue`                                                               | Single fixed notice, `role="status"`, Escape to dismiss                            |
| Theme toggle    | `ThemeToggle.vue`                                                                  | Track/thumb switch, `aria-pressed`, stable accessible name                         |

Vuetify provides behaviour for: navigation drawer (focus trap, Escape, scroll lock), expansion panels
(FAQ) and the theme provider. Everything visual is Schoolino's own CSS.

---

## 7. Iconography

- **Set:** Lucide (stroke, 24px grid, 1.8px default stroke) — chosen because it matches the geometric
  Persian type and has a consistent optical weight.
- **Delivery:** a build script (`scripts/build-icon-subset.mjs`) extracts the ~59 used icons into
  `src/assets/icons/lucide-subset.json` (~16 KB) and registers them offline with Iconify. No icon CDN
  request, no oversized icon library.
- **Rules:** icons never carry meaning alone; emoji are never used as iconography.

---

## 8. Imagery & illustration

- Teacher portraits: six original flat-vector illustrations generated for this project, all in one
  palette (indigo/saffron/sage on cream), delivered as 536×960 WebP (~31–64 KB each), lazy-loaded.
- Product mock-ups (hero player, weekly activity strip, dial) are **built from DOM/CSS**, so they are
  crisp at any DPI, themeable, and cost nothing to download.
- Decorative background: 64px grid, radial glows, noise texture (inline SVG data URI), floating blobs
  animated with a slow transform loop.

---

## 9. Themes

- Selected via `data-theme` on `<html>`; tokens redefined in `:root[data-theme='dark']`.
- Preference is stored in `localStorage` (`schoolino:theme`); `'system'` follows
  `prefers-color-scheme`.
- First paint is theme-correct thanks to a tiny inline script in `index.html` (no flash), and
  `useTheme()` keeps Vuetify's theme name in sync.
- Both themes are first-class: every section was visually reviewed in both.

---

## 10. Do / Don't

| Do                                          | Don't                                             |
| ------------------------------------------- | ------------------------------------------------- |
| Use one accent colour per section           | Mix brand + accent + mint decorations in one view |
| Keep body copy ≥ 16px                       | Shrink type to fit more text in a card            |
| Use transform/opacity for motion            | Animate width/height/margin                       |
| Give every interactive element a focus ring | Remove outlines                                   |
| Label demo data                             | Present sample numbers as real business claims    |
| Use borders to separate dark surfaces       | Rely on shadows in dark mode                      |
