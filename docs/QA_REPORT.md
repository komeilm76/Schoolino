# QA Report — Schoolino Landing Page

Verified on 2026-10-31 · Chromium (headless, 2× DPI for detail shots) · Node 22 / Bun 1.4 / Vite 7.3.

---

## 1. Automated gates

| Gate                   | Command                                  | Result                                                   |
| ---------------------- | ---------------------------------------- | -------------------------------------------------------- |
| Type check (strict)    | `bun run typecheck` (`vue-tsc`)          | ✅ Pass, 0 errors                                        |
| Lint                   | `bun run lint` (ESLint 9 flat, Vue + TS) | ✅ Pass, 0 errors / 0 warnings                           |
| Formatting             | `bun run format:check` (Prettier 3)      | ✅ Pass                                                  |
| Tests                  | `bun run test` (Vitest 3, jsdom)         | ✅ **72 tests / 14 files**, all green                    |
| Coverage (logic layer) | `bun run test:coverage`                  | ✅ 97.5% statements on `utils/`, `composables/`, `data/` |
| Production build       | `bun run build`                          | ✅ Built in ~4.5s, 0 errors                              |

### Bundle output (production)

| Asset                       | Raw            | Gzip        |
| --------------------------- | -------------- | ----------- |
| `index-*.js` (app)          | 205.3 KB       | **68.4 KB** |
| `vue-*.js` (vendor)         | 80.9 KB        | 31.9 KB     |
| `vuetify-*.js` (vendor)     | 50.3 KB        | 19.1 KB     |
| `index-*.css`               | 90.5 KB        | 19.3 KB     |
| Fonts (7 files, subset)     | 7.6–57 KB each | —           |
| Teacher portraits (6, lazy) | 31–64 KB each  | —           |
| Icon subset (JSON, inline)  | 16.5 KB        | —           |

Initial JS ≈ **119 KB gzip** — inside the 120 KB budget; hero carries **zero** image bytes.

---

## 2. Visual QA (screenshots reviewed section by section)

| Area                           | 390px | 768px | 1024px | 1440px | 1920px | Light | Dark |
| ------------------------------ | ----- | ----- | ------ | ------ | ------ | ----- | ---- |
| Header / sticky state          | ✅    | ✅    | ✅     | ✅     | ✅     | ✅    | ✅   |
| Mobile drawer                  | ✅    | ✅    | n/a    | n/a    | n/a    | ✅    | ✅   |
| Hero (copy + lesson mock)      | ✅    | ✅    | ✅     | ✅     | ✅     | ✅    | ✅   |
| Stats band (`#impact`)         | ✅    | ✅    | ✅     | ✅     | ✅     | ✅    | ✅   |
| Grades (`#grades`)             | ✅    | ✅    | ✅     | ✅     | ✅     | ✅    | ✅   |
| Why / bento (`#why`)           | ✅    | ✅    | ✅     | ✅     | ✅     | ✅    | ✅   |
| Learning path (`#path`)        | ✅    | ✅    | ✅     | ✅     | ✅     | ✅    | ✅   |
| Teachers (`#teachers`)         | ✅    | ✅    | ✅     | ✅     | ✅     | ✅    | ✅   |
| Plans (`#plans`)               | ✅    | ✅    | ✅     | ✅     | ✅     | ✅    | ✅   |
| Testimonials (`#testimonials`) | ✅    | ✅    | ✅     | ✅     | ✅     | ✅    | ✅   |
| FAQ (`#faq`)                   | ✅    | ✅    | ✅     | ✅     | ✅     | ✅    | ✅   |
| Final CTA                      | ✅    | ✅    | ✅     | ✅     | ✅     | ✅    | ✅   |
| Footer                         | ✅    | ✅    | ✅     | ✅     | ✅     | ✅    | ✅   |

Reference screenshots: `docs/screenshots/desktop-light.jpg`, `desktop-dark.jpg`, `mobile-hero.jpg`,
`mobile-drawer.jpg`.

### Issues found during visual QA — and fixed

| #   | Issue                                                                                                                                            | Fix                                                                                                          |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| 1   | `v-app` layout context was missing → the mobile drawer threw `[Vuetify] Could not find injected layout` and the page rendered empty              | Wrapped the app in `<v-app>` and neutralised its background/wrapper min-height so content drives page height |
| 2   | Scoped component styles (unlayered) beat Tailwind's `hidden`/`lg:hidden` utilities → theme toggle and hamburger were visible at every breakpoint | Moved responsive display utilities onto wrapper elements and documented the rule in `ARCHITECTURE.md` §5     |
| 3   | Weekly-activity panel in the hero mock overflowed the card and covered the lesson list                                                           | Rebuilt it as an in-card footer strip                                                                        |
| 4   | Floating hero chips obscured the card header / footer                                                                                            | Repositioned them outside the card content and changed them to non-duplicating messages                      |
| 5   | Teacher portraits were cropped at the eyes (tall 9:16 art in a 16:11 box)                                                                        | Changed the frame to 5:4 with `object-position: 50% 16%`; faces are fully visible on all breakpoints         |
| 6   | Star ratings rendered as empty outlines (Iconify SVGs ignore inherited `fill`)                                                                   | Replaced with inline SVGs styled by class                                                                    |
| 7   | Plan prices wrapped onto two lines, stranding “تومان”                                                                                            | Tightened the price row: larger amount, smaller currency label, no stray strikethrough line                  |
| 8   | Quote card resized as the carousel advanced (CLS)                                                                                                | Gave it a stable `min-height` and pinned the author row to the bottom                                        |
| 9   | Vuetify deprecated warning `theme.global.name.value = …`                                                                                         | Migrated to `vuetify.theme.change(name)`                                                                     |
| 10  | Footer legal links / FAQ link were 22–24px tall (WCAG 2.2 target size)                                                                           | Added vertical padding → all interactive targets now ≥ 24px (mobile primary controls ≥ 44px)                 |

---

## 3. Responsive verification (measured, not estimated)

| Viewport  | Horizontal scroll | Overflow                              | Console errors/warnings | h1  | Broken images | Duplicate ids | Targets < 24px |
| --------- | ----------------- | ------------------------------------- | ----------------------- | --- | ------------- | ------------- | -------------- |
| 390×844   | None              | none (decorative glows only, clipped) | 0                       | 1   | 0             | 0             | 0              |
| 768×1024  | None              | none                                  | 0                       | 1   | 0             | 0             | 0              |
| 1024×768  | None              | none                                  | 0                       | 1   | 0             | 0             | 0              |
| 1440×900  | None              | none                                  | 0                       | 1   | 0             | 0             | 0              |
| 1920×1080 | None              | none                                  | 0                       | 1   | 0             | 0             | 0              |

Manual mobile checks: drawer opens/closes (Escape + backdrop + close button), drawer navigation
scrolls to the correct section and highlights it, pricing cards stack, FAQ accordion is full width,
hero mock scales without clipping, footer stacks into four readable blocks.

---

## 4. Accessibility verification

| Check                | Method                                | Result                                                                                                          |
| -------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Landmarks & headings | DOM audit                             | 1 × `h1`, ordered `h2`/`h3`, `header`/`nav`×2/`main`/`footer`                                                   |
| Skip link            | Keyboard                              | First Tab reveals “پرش به محتوای اصلی”, activates `#main`                                                       |
| Tab order            | Keyboard (10 tabs)                    | skip link → logo → 5 nav links → theme toggle → login → primary CTA (visual order)                              |
| Focus visibility     | Keyboard                              | 3px accent outline with offset on every control                                                                 |
| Keyboard traps       | Manual                                | None; drawer traps focus intentionally and closes on Escape                                                     |
| Toggle semantics     | DOM                                   | `aria-pressed` on theme/billing/grade/person controls                                                           |
| Current section      | DOM                                   | `aria-current="true"` on the active nav link                                                                    |
| Accordion            | DOM                                   | Native `<button>` headers with `aria-expanded`                                                                  |
| Live regions         | DOM                                   | Carousel position (`aria-live="polite"`), grade panel (`aria-live="polite"`), demo notice (`role="status"`)     |
| Image alternatives   | DOM audit                             | 0 images without `alt`; decorative SVG/gradients `aria-hidden`                                                  |
| Focus not obscured   | Implementation                        | `scroll-padding-block-start: 6.5rem` for the sticky header                                                      |
| Target size (2.5.8)  | Measured                              | 0 interactive elements below 24×24 CSS px                                                                       |
| Contrast             | Token audit (`DESIGN_SYSTEM.md` §2.3) | Body text ≥ 4.5:1 in both themes; CTA labels ≥ 5.9:1                                                            |
| Reduced motion (CSS) | `reducedMotion: 'reduce'` context     | 0 elements left hidden; no transitions                                                                          |
| Reduced motion (JS)  | Same context                          | Hero opacity = 1 immediately (no entrance), counters show final values, no carousel autoplay, instant scrolling |

---

## 5. Interaction verification (browser-driven)

| Interaction                    | Expected                                                               | Result                                                           |
| ------------------------------ | ---------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Header CTA “شروع یادگیری”      | Honest demo notice appears                                             | ✅ Notice rendered bottom-centre (480×110 px), focus moves to it |
| Notice dismissal               | Escape / close button                                                  | ✅ Closes; auto-dismisses after 6s                               |
| Theme toggle (header + drawer) | `data-theme` flips, persisted to `localStorage`, Vuetify theme follows | ✅ `light → dark`, `localStorage['schoolino:theme'] = 'dark'`    |
| Mobile drawer navigation       | Drawer closes, page scrolls, nav highlights target                     | ✅ After tapping “اساتید”, active nav = اساتید                   |
| Grade selection                | Panel updates, chip gets `aria-pressed`                                | ✅ Verified in browser and unit test                             |
| Billing toggle                 | All three cards re-price, saving badge stays                           | ✅ Yearly → monthly prices, monthly equivalent removed           |
| Plan CTA                       | Notice names the chosen plan and period                                | ✅ “پلن کامل …”                                                  |
| FAQ expansion                  | Panel opens, `aria-expanded` flips, multiple panels allowed            | ✅ First open by default                                         |
| Testimonials                   | Next/prev, person buttons, arrow keys, live text                       | ✅ All four paths verified                                       |
| Hero lesson mock               | Selecting a lesson updates the player; play shows honest notice        | ✅                                                               |
| Back-to-top                    | Appears after the hero, returns to top                                 | ✅                                                               |
| Footer social buttons          | Honest notice (no dead links)                                          | ✅                                                               |

---

## 6. Performance observations

- First meaningful paint is text-only: no hero image, no icon font, no third-party requests.
- All below-the-fold portraits are `loading="lazy"` with explicit dimensions → no CLS.
- Animation runs on `transform`/`opacity` only; a single IntersectionObserver reveals elements once.
- Only one scroll listener (VueUse `useWindowScroll`, passive/rAF) drives the header state.
- Observers, timers and intervals are disposed with their scope; no leaks observed over a 60s session.

---

## 7. Known limitations

1. **No backend by design.** Authentication, checkout, video playback, support forms and social links
   are represented by an explanatory notice. Nothing is persisted.
2. **Demo content.** Statistics, testimonials, teacher profiles, prices and contact details are
   illustrative and labelled as such.
3. **Single locale.** Persian only; the content layer is centralised so i18n is a mechanical change.
4. **No router.** One scroll page; deep links to sections exist as hashes only.
5. **Automated a11y tooling not run.** Axe/Lighthouse were not available in this sandbox (no external
   CDN/registries for the browser tooling); verification was DOM- and keyboard-based plus a measured
   contrast audit. Recommend adding `@axe-core/playwright` in CI.
6. **Visual regression not automated.** Section screenshots were reviewed manually at five widths in
   both themes; see `docs/screenshots`.
7. **Test coverage** targets the logic layer (97.5%); Vue components are covered behaviourally
   (grades, plans, FAQ, testimonials) rather than exhaustively.

---

## 8. Recommendations for the next iteration

1. Add `vue-router` + dashboards, then introduce Pinia for session/progress state.
2. Swap `src/data` for API calls validated with the existing zod schemas.
3. Integrate a real player (HLS) with captions, resume position and chapter markers.
4. Add CI: `typecheck`, `lint`, `test`, `build`, plus Playwright visual + axe checks on the five
   viewports already verified manually.
5. Consider `content-visibility` / image `srcset` once real photography replaces the illustrations.
