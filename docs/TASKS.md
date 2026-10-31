# Tasks & Acceptance Criteria

Legend: ✅ done · 🔄 in progress · ⬜ planned. Every task lists the evidence that closed it.

## Phase 0 — Research, architecture & planning

| ID    | Task                                                                                                                      | Priority | Depends on   | Acceptance criteria                                                     | Status |
| ----- | ------------------------------------------------------------------------------------------------------------------------- | -------- | ------------ | ----------------------------------------------------------------------- | ------ |
| T-001 | Inspect repository, toolchain and network constraints                                                                     | P0       | —            | Repo audit recorded; empty repo confirmed; Bun/Node capability verified | ✅     |
| T-002 | Research `ino.school` (IA, hero, grades, teachers, pricing, FAQ, footer, responsive, motion)                              | P0       | —            | Findings written in `RESEARCH.md` with per-finding influence            | ✅     |
| T-003 | Research `uupm.cc` + its design database (styles, palettes, typography, landing patterns, motion, UX rules, Vue guidance) | P0       | —            | Extracted rows documented with adopted/rejected rationale               | ✅     |
| T-004 | Product definition: vision, personas, problems, value proposition, conversions, personality                               | P0       | T-002, T-003 | `PROJECT_OVERVIEW.md`                                                   | ✅     |
| T-005 | Design system: colour, typography, radii, shadows, spacing, components, iconography                                       | P0       | T-003        | `DESIGN_SYSTEM.md` + implemented tokens                                 | ✅     |
| T-006 | Animation strategy and tokens                                                                                             | P0       | T-003        | `ANIMATION_GUIDELINES.md` + implemented durations/easings               | ✅     |
| T-007 | Technical architecture and content model                                                                                  | P0       | T-001        | `ARCHITECTURE.md`, `src/types/content.ts`                               | ✅     |
| T-008 | Dependency selection & justification                                                                                      | P0       | T-001        | `TECH_STACK.md` (GSAP/Lenis/Router/Pinia rejected with reasons)         | ✅     |
| T-009 | Requirements with acceptance criteria                                                                                     | P0       | T-004        | `PRODUCT_REQUIREMENTS.md`                                               | ✅     |
| T-010 | Roadmap, task breakdown, decision log, quality standards                                                                  | P0       | T-005…T-009  | `ROADMAP.md`, `TASKS.md`, `DECISIONS.md`, `QUALITY_STANDARDS.md`        | ✅     |

## Milestone 1 — Foundation

| ID    | Task                                                                                   | Acceptance criteria                                              | Status |
| ----- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------ |
| T-101 | `package.json` with pinned, mutually compatible stack + Bun scripts                    | `bun install` succeeds; all scripts runnable                     | ✅     |
| T-102 | `vite.config.ts` (Vue, Vuetify plugin, Tailwind plugin, DevTools, alias, host 0.0.0.0) | Dev server serves the app; DevTools endpoint available           | ✅     |
| T-103 | `tsconfig.json` strict + `env.d.ts`                                                    | `vue-tsc` passes with strict flags                               | ✅     |
| T-104 | `vitest.config.ts` + `tests/setup.ts` (jsdom stubs)                                    | `bun run test` runs                                              | ✅     |
| T-105 | ESLint flat config + Prettier                                                          | `bun run lint` and `format:check` pass                           | ✅     |
| T-106 | Icon subset build script and generated subset                                          | 59 Lucide icons in `src/assets/icons/lucide-subset.json`; no CDN | ✅     |
| T-107 | `index.html` (RTL, Persian meta, theme pre-paint, noscript reveal fallback)            | No theme flash; content visible without JS                       | ✅     |

## Milestone 2 — Design system

| ID    | Task                                                                        | Acceptance criteria                                            | Status |
| ----- | --------------------------------------------------------------------------- | -------------------------------------------------------------- | ------ |
| T-201 | Token layer (colour/type/space/radius/shadow/motion) exposed to Tailwind    | Utilities resolve to live CSS variables                        | ✅     |
| T-202 | Light + dark palettes with contrast audit                                   | Both themes render correctly; body text ≥ 4.5:1                | ✅     |
| T-203 | Typography system (Estedad/Vazirmatn/Plus Jakarta, fluid scale)             | Persian headings/body render with correct shaping and numerals | ✅     |
| T-204 | Primitive component classes (buttons, chips, cards, eyebrow, reveal, bands) | Used consistently across sections                              | ✅     |
| T-205 | Vuetify theme names mirroring tokens                                        | Drawer/panels inherit palette in both themes                   | ✅     |
| T-206 | Brand logo (original mark) + favicon                                        | SVG mark, inverted variant, no external asset                  | ✅     |

## Milestone 3 — Shared components

| ID    | Task                                 | Acceptance criteria                                          | Status |
| ----- | ------------------------------------ | ------------------------------------------------------------ | ------ |
| T-301 | `AppIcon` (Iconify + offline subset) | Icons render; decorative ones are `aria-hidden`              | ✅     |
| T-302 | `SectionHeading`                     | Eyebrow/title/lead, alignment + inverted variants            | ✅     |
| T-303 | `StarRating`                         | Filled/empty inline SVG, accessible label                    | ✅     |
| T-304 | `AvatarStack`                        | Overlap + `+n` overflow with accessible names                | ✅     |
| T-305 | `StatCounter`                        | Counts on viewport entry; final value under reduced motion   | ✅     |
| T-306 | `LevelGlyph`                         | Three original SVG glyphs, tone-aware                        | ✅     |
| T-307 | `BillingToggle`                      | Group semantics, `aria-pressed`, saving badge                | ✅     |
| T-308 | `ThemeToggle`                        | Persisted, system fallback, `aria-pressed`, stable name      | ✅     |
| T-309 | `DemoNoticeHost`                     | Single notice, `role="status"`, Escape + close, auto-dismiss | ✅     |
| T-310 | `BackToTop`                          | Appears after hero, respects reduced motion                  | ✅     |

## Milestone 4 — Page sections

| ID    | Task                | Acceptance criteria                                                                                                  | Status |
| ----- | ------------------- | -------------------------------------------------------------------------------------------------------------------- | ------ |
| T-401 | Header & navigation | Sticky, scroll-condensed, scroll-spy active state, mobile drawer, both CTAs                                          | ✅     |
| T-402 | Hero                | Headline, lead, 2 CTAs, product mock with working lesson selection and player feedback, floating chips, social proof | ✅     |
| T-403 | Stats band          | 4 counters, demo disclaimer, trust cues                                                                              | ✅     |
| T-404 | Grades              | 3 levels, 12 grade controls, detail panel announced politely, per-level CTA                                          | ✅     |
| T-405 | Why Schoolino       | Bento grid with 6 distinct tiles and a product detail strip                                                          | ✅     |
| T-406 | Learning path       | 4 steps, dashed connector (desktop) / rail (mobile)                                                                  | ✅     |
| T-407 | Teachers            | 6 illustrated profiles with bio, specialties, figures, rating, profile CTA                                           | ✅     |
| T-408 | Plans               | 3 plans, monthly/yearly toggle, saving + monthly equivalent, recommended plan, no-payment note                       | ✅     |
| T-409 | Testimonials        | Carousel with prev/next, person selection, keyboard, live region, autoplay guard                                     | ✅     |
| T-410 | FAQ                 | 8 questions, multiple open, Vuetify accordion, keyboard operable                                                     | ✅     |
| T-411 | Final CTA           | Distinct dark panel, dial graphic, 2 CTAs, perks                                                                     | ✅     |
| T-412 | Footer              | Brand, description, quick links, categories, contact placeholders, socials, legal rows, demo note                    | ✅     |

## Milestone 5 — Motion & interaction

| ID    | Task                               | Acceptance criteria                                                    | Status |
| ----- | ---------------------------------- | ---------------------------------------------------------------------- | ------ |
| T-501 | `v-reveal` directive               | One-shot reveals, stagger cap, reduced-motion bypass, observer cleanup | ✅     |
| T-502 | Hero entrance via `@vueuse/motion` | Staggered copy/visual entrance, underline draw                         | ✅     |
| T-503 | Counters (`useCountUp`)            | rAF, ease-out, cleanup, reduced-motion jump                            | ✅     |
| T-504 | Carousel (`useCarousel`)           | Wrap, clamp, autoplay paused on hover/focus/hidden/reduced motion      | ✅     |
| T-505 | Global reduced-motion CSS          | No transitions/animations; reveals visible                             | ✅     |
| T-506 | Honest CTA wiring                  | Every backend-dependent action opens the notice                        | ✅     |

## Milestone 6 — Responsive & QA

| ID    | Task                                       | Acceptance criteria                                              | Status |
| ----- | ------------------------------------------ | ---------------------------------------------------------------- | ------ |
| T-601 | Mobile layout (390px)                      | No overflow, drawer works, tap targets ≥ 44px, hero mock scales  | ✅     |
| T-602 | Tablet/laptop/desktop (768/1024/1440/1920) | Grids adapt; bento and pricing reflow correctly                  | ✅     |
| T-603 | Dark theme QA of every section             | No unreadable text, borders visible, mock-ups coherent           | ✅     |
| T-604 | Visual QA fixes                            | Overlap/layer/crop issues found in screenshots fixed             | ✅     |
| T-605 | Accessibility pass                         | Keyboard path, focus rings, ARIA state, scroll padding, alt text | ✅     |
| T-606 | Console clean                              | No errors/warnings on load and during interactions               | ✅     |

## Milestone 7 — Testing & delivery

| ID    | Task                                                                     | Acceptance criteria                                                 | Status |
| ----- | ------------------------------------------------------------------------ | ------------------------------------------------------------------- | ------ |
| T-701 | Unit tests: `format`, `scroll`                                           | Persian formatting edge cases, focus/scroll behaviour               | ✅     |
| T-702 | Unit tests: composables (`billing`, `carousel`, `countUp`, `demoNotice`) | State transitions + cleanup covered                                 | ✅     |
| T-703 | Data-integrity tests                                                     | zod validation, ids, grades 1–12, anchors, images, price invariants | ✅     |
| T-704 | Component tests: grades, plans, FAQ, testimonials                        | Interaction + a11y state asserted                                   | ✅     |
| T-705 | Type-check / lint / format / build                                       | All pass; bundle within budgets                                     | ✅     |
| T-706 | Documentation set + README                                               | 11 docs accurate, commands verified                                 | ✅     |
| T-707 | Final QA report and delivery summary                                     | `QA_REPORT.md` + delivery notes                                     | ✅     |

## Open follow-ups (deliberately not in Phase 1)

| ID   | Item                                          | Rationale                                                |
| ---- | --------------------------------------------- | -------------------------------------------------------- |
| F-01 | Real routing/dashboards/auth                  | Out of Phase 1 scope (`ROADMAP.md` Phase 2)              |
| F-02 | Lint rule for scoped-style/utility precedence | Currently enforced by convention + wrapper pattern       |
| F-03 | Visual regression snapshots (Playwright)      | Requires CI browser runtime; manual QA performed instead |
| F-04 | i18n message catalogue                        | Single-locale demo; copy already centralised             |
