# Product Requirements — Schoolino Landing Page

Status legend: **MUST** = required by the brief · **SHOULD** = strongly expected · **COULD** = nice to have.
Every requirement has an ID used by `TASKS.md`.

## 1. Functional requirements

### 1.1 Navigation & header (`FR-NAV`)

| ID       | Requirement                                                                                       | Priority |
| -------- | ------------------------------------------------------------------------------------------------- | -------- |
| FR-NAV-1 | Logo (mark + wordmark) that scrolls to the top of the page.                                       | MUST     |
| FR-NAV-2 | Anchor links to grades, why, teachers, plans, FAQ.                                                | MUST     |
| FR-NAV-3 | Sticky header that becomes solid/condensed after scrolling.                                       | MUST     |
| FR-NAV-4 | Active-section indication driven by an IntersectionObserver scroll-spy.                           | MUST     |
| FR-NAV-5 | Mobile drawer with the same links, plus CTAs and theme switch; closes on selection and on Escape. | MUST     |
| FR-NAV-6 | Login CTA that clearly states it is a visual demo.                                                | MUST     |
| FR-NAV-7 | Light/dark theme switch persisted in `localStorage`, defaulting to system preference.             | SHOULD   |

### 1.2 Hero (`FR-HERO`)

| ID        | Requirement                                                          | Priority |
| --------- | -------------------------------------------------------------------- | -------- |
| FR-HERO-1 | Headline, supporting paragraph, primary and secondary CTA.           | MUST     |
| FR-HERO-2 | Original visual: interactive lesson/player mock-up (no stock photo). | MUST     |
| FR-HERO-3 | Supporting decorative elements with restrained motion.               | SHOULD   |
| FR-HERO-4 | Social-proof cue (avatars + rating) that is clearly illustrative.    | SHOULD   |

### 1.3 Grades (`FR-GRADE`)

| ID         | Requirement                                                                         | Priority |
| ---------- | ----------------------------------------------------------------------------------- | -------- |
| FR-GRADE-1 | Three levels: ابتدایی (۱–۶), متوسطه اول (۷–۹), متوسطه دوم (۱۰–۱۲).                  | MUST     |
| FR-GRADE-2 | Each grade is an interactive control with selected state (`aria-pressed`).          | MUST     |
| FR-GRADE-3 | Selecting a grade updates a detail panel (highlights + figures) announced politely. | MUST     |
| FR-GRADE-4 | Each level has a distinct visual identity (glyph, tone, tagline).                   | SHOULD   |

### 1.4 Why Schoolino (`FR-WHY`)

| ID       | Requirement                                                                                       | Priority |
| -------- | ------------------------------------------------------------------------------------------------- | -------- |
| FR-WHY-1 | Explain structured learning, teachers, video lessons, practice, exam prep, progress, flexibility. | MUST     |
| FR-WHY-2 | Non-repetitive layout (asymmetric bento grid, not six identical cards).                           | SHOULD   |

### 1.5 Teachers (`FR-TEACH`)

| ID         | Requirement                                                                                         | Priority |
| ---------- | --------------------------------------------------------------------------------------------------- | -------- |
| FR-TEACH-1 | Card with portrait, name, subject, level, short bio, specialty chips, illustrative figures, rating. | MUST     |
| FR-TEACH-2 | Consistent, locally hosted imagery; no broken/placeholder URLs.                                     | MUST     |
| FR-TEACH-3 | Hover and focus states; profile CTA explains it is a demo.                                          | MUST     |
| FR-TEACH-4 | Label that profiles are sample content.                                                             | MUST     |

### 1.6 Statistics (`FR-STATS`)

| ID         | Requirement                                                      | Priority |
| ---------- | ---------------------------------------------------------------- | -------- |
| FR-STATS-1 | Animated counters triggered on viewport entry.                   | MUST     |
| FR-STATS-2 | Counters jump to the final value under `prefers-reduced-motion`. | MUST     |
| FR-STATS-3 | All figures labelled as demo content.                            | MUST     |

### 1.7 Plans (`FR-PLAN`)

| ID        | Requirement                                                              | Priority |
| --------- | ------------------------------------------------------------------------ | -------- |
| FR-PLAN-1 | Three plans with name, price, period, features, CTA, visual distinction. | MUST     |
| FR-PLAN-2 | Monthly/yearly toggle with saving badge and monthly equivalent.          | MUST     |
| FR-PLAN-3 | One recommended plan, highlighted without hiding information.            | SHOULD   |
| FR-PLAN-4 | Pricing is static/demo; no gateway; explicit “no real payment” note.     | MUST     |

### 1.8 Testimonials (`FR-TEST`)

| ID        | Requirement                                                          | Priority |
| --------- | -------------------------------------------------------------------- | -------- |
| FR-TEST-1 | Quote, name, role, rating, direct person selection.                  | MUST     |
| FR-TEST-2 | Previous/next controls, keyboard arrows, live position announcement. | MUST     |
| FR-TEST-3 | Autoplay stops on hover/focus/hidden tab/reduced motion.             | MUST     |
| FR-TEST-4 | Content labelled as illustrative.                                    | MUST     |

### 1.9 FAQ (`FR-FAQ`)

| ID       | Requirement                                                                                               | Priority |
| -------- | --------------------------------------------------------------------------------------------------------- | -------- |
| FR-FAQ-1 | Covers: what is Schoolino, how learning works, grades, teachers, plan contents, getting started, support. | MUST     |
| FR-FAQ-2 | Accessible accordion (buttons, `aria-expanded`, keyboard operation), smooth expansion.                    | MUST     |
| FR-FAQ-3 | Multiple panels may be open; first panel open by default.                                                 | SHOULD   |

### 1.10 Final CTA + footer (`FR-CTA`, `FR-FOOT`)

| ID        | Requirement                                                                                            | Priority |
| --------- | ------------------------------------------------------------------------------------------------------ | -------- |
| FR-CTA-1  | Distinctive closing conversion panel with headline, supporting copy, CTA.                              | MUST     |
| FR-FOOT-1 | Brand, short description, quick links, education categories, contact placeholders, socials, copyright. | MUST     |
| FR-FOOT-2 | No invented real company address/phone/accreditation.                                                  | MUST     |
| FR-FOOT-3 | Social links give honest feedback instead of dead links.                                               | SHOULD   |

### 1.11 Cross-cutting behaviour (`FR-GEN`)

| ID       | Requirement                                                                 | Priority |
| -------- | --------------------------------------------------------------------------- | -------- |
| FR-GEN-1 | Every CTA that would need a backend shows a clear, dismissible demo notice. | MUST     |
| FR-GEN-2 | Smooth anchor navigation that respects the sticky header.                   | MUST     |
| FR-GEN-3 | Back-to-top control after the hero.                                         | COULD    |
| FR-GEN-4 | Skip link to `#main`.                                                       | MUST     |

## 2. Non-functional requirements

### 2.1 Quality & engineering (`NFR-ENG`)

| ID        | Requirement                                                                              |
| --------- | ---------------------------------------------------------------------------------------- |
| NFR-ENG-1 | Vue 3 + TypeScript strict, `<script setup lang="ts">` everywhere.                        |
| NFR-ENG-2 | Bun as package manager/runtime; Vite as dev server and bundler.                          |
| NFR-ENG-3 | Vuetify and Tailwind coexist without specificity conflicts (CSS layers).                 |
| NFR-ENG-4 | Vue DevTools available in development.                                                   |
| NFR-ENG-5 | Vitest suite covering utilities, composables, data integrity and interactive components. |
| NFR-ENG-6 | `typecheck`, `lint`, `test`, `build` all pass before delivery.                           |
| NFR-ENG-7 | No `any`, no non-null assertions except where provably safe (documented).                |
| NFR-ENG-8 | Content lives in typed data modules, not inside large components.                        |
| NFR-ENG-9 | Public utilities/composables documented with JSDoc.                                      |

### 2.2 Performance (`NFR-PERF`)

| ID         | Requirement                                                                       |
| ---------- | --------------------------------------------------------------------------------- |
| NFR-PERF-1 | No heavy animation dependency (no GSAP/Lenis) unless justified; CSS-first motion. |
| NFR-PERF-2 | Images lazy-loaded below the fold, WebP, sized to their display box.              |
| NFR-PERF-3 | Fonts self-hosted, variable, `font-display: swap`.                                |
| NFR-PERF-4 | Icon subset is generated and bundled (no icon CDN, ~16 KB JSON).                  |
| NFR-PERF-5 | Animations use transform/opacity; no layout thrash; observers cleaned up.         |
| NFR-PERF-6 | Production bundle: initial JS < 400 KB raw / 120 KB gzip target.                  |

### 2.3 Accessibility (`NFR-A11Y`)

| ID         | Requirement                                                                             |
| ---------- | --------------------------------------------------------------------------------------- |
| NFR-A11Y-1 | WCAG 2.2 AA: contrast ≥ 4.5:1 for body text, 3:1 for large text and UI borders.         |
| NFR-A11Y-2 | Full keyboard operability with visible focus rings; no keyboard traps.                  |
| NFR-A11Y-3 | `prefers-reduced-motion` respected for CSS, JS animation and autoplay.                  |
| NFR-A11Y-4 | Semantic landmarks, one `h1`, ordered headings, meaningful alt text.                    |
| NFR-A11Y-5 | Live regions for asynchronous/status messages; `aria-current`/`aria-pressed` for state. |
| NFR-A11Y-6 | Anchored sections are not obscured by the sticky header (`scroll-padding`).             |
| NFR-A11Y-7 | Layout reflows correctly at 320px and with 200% zoom.                                   |

### 2.4 Responsive (`NFR-RESP`)

| ID         | Requirement                                                                     |
| ---------- | ------------------------------------------------------------------------------- |
| NFR-RESP-1 | Verified at 390, 768, 1024, 1440, 1920 px.                                      |
| NFR-RESP-2 | No horizontal overflow at any breakpoint.                                       |
| NFR-RESP-3 | Mobile layouts are redesigned (stacked, thumb-reachable), not shrunken desktop. |
| NFR-RESP-4 | Tap targets ≥ 44px on mobile.                                                   |

### 2.5 Documentation & maintainability (`NFR-DOC`)

| ID        | Requirement                                                      |
| --------- | ---------------------------------------------------------------- |
| NFR-DOC-1 | Phase 0 document set complete and accurate after implementation. |
| NFR-DOC-2 | Decisions logged in `DECISIONS.md`.                              |
| NFR-DOC-3 | `TASKS.md` reflects real completion state.                       |
| NFR-DOC-4 | README documents install/dev/test/build commands.                |

## 3. Acceptance criteria (summary)

A reviewer must be able to: scroll the whole page without console errors; use every section with a
keyboard only; toggle theme and language-appropriate numerals; open the mobile drawer; expand FAQ
items; switch pricing periods; move the testimonial carousel in three ways; and receive an honest
message from every CTA — on both a 390px phone and a 1440px desktop.
