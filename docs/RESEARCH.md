# Research — Reference Analysis

Two references were studied in depth before any UI was written:

1. **https://ino.school/** — product and content reference (Persian online school).
2. **https://uupm.cc/** (UI UX Pro Max) — design-intelligence reference, including its open-source
   design database (`nextlevelbuilder/ui-ux-pro-max-skill`: styles, colour palettes, typography
   pairings, landing patterns, motion rules, UX guidelines and Vue-specific guidance).

> Neither reference was copied. No logo, layout, illustration, brand colour, copy line or asset from
> either site is used. The findings below explain _why_ Schoolino looks the way it does.

---

## 1. Ino School — what was observed

### 1.1 Information architecture (landing page)

Order observed on `ino.school`:

1. Sticky header with logo, grade links, subscriptions, login.
2. Rotating hero banners (3), headline “آی‌نو، یادگیری بدون محدودیت”, two CTAs (start / buy plan).
3. **Grade selection** — three levels (ابتدایی / متوسطه اول / متوسطه دوم) with per-grade chips 1–12,
   each level linking to a grade page.
4. **Teachers** — avatar orbit with “+۱۵۰ استاد” and a link to the teacher directory.
5. **Statistics band** — 4 counters (hours, videos, users, teachers) with a trust sentence.
6. Free-consultation form (phone number).
7. **Testimonials** carousel — avatar, name, role, five stars, quote.
8. Blog cards (“روزنامه دیواری”), corporate clients strip.
9. **FAQ** accordion (what is it, sign-up, pricing, subscription purchase).
10. Support CTA with phone number, then footer.

### 1.2 Subscription presentation (`/subscriptions`)

- Plans are grouped by **audience** (دبستان، متوسطه اول، متوسطه دوم، تیزهوشان، کنکور) rather than by
  feature tier.
- A **monthly / yearly toggle** with an explicit discount badge (40–50%) and the _monthly equivalent_
  under the yearly price (“معادل ۱۶۵٬۰۰۰ تومان در ماه”).
- Crossed-out list price next to the discounted price.
- Feature lists are short, benefit-worded bullets; every plan states that videos, exam builder and
  final-exam content are included.
- No “most popular” badge — the choice is made by audience, not by pressure.

### 1.3 Content and tone

- Second-person, colloquial Persian (“پایه‌ات رو انتخاب کن”, “بزن بریم”) — warm, teenage-friendly.
- Numbers are Persian digits with thousands separators (۲٬۰۰۰٬۰۰۰).
- Trust is built with client logos, teacher count and star ratings.

### 1.4 Responsive behaviour

- Desktop: horizontal grade cards with large imagery, a two-column teacher block.
- Mobile: single column, grade chips wrap, the header collapses into a menu, testimonials become a
  swipeable stack, FAQ becomes a full-width accordion.

### 1.5 Animations observed

- Hero banner rotation, floating decorative illustrations (robot, clouds, orbits), soft parallax on
  grade imagery, counter animation on the stats band, hover lift on cards, accordion height
  transitions, marquee-like client-logo strip.

### 1.6 What Schoolino keeps vs. changes

| Finding                                                                     | Decision for Schoolino                                                                                                                         |
| --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Grade-first navigation (grade → level → content)                            | **Keep** the pattern; express it as an interactive selector with a detail panel (better than 12 separate links in a demo).                     |
| Plans grouped by audience with a monthly/yearly toggle + monthly equivalent | **Keep**, but as three tiers (شروع / کامل / کنکور) so pricing is comparable at a glance, with one recommended plan.                            |
| Colloquial tone                                                             | **Partly keep** — friendly but slightly more composed, because parents are co-readers. No slang in headings.                                   |
| Robot mascot + cloud illustrations                                          | **Replace** with an original geometric illustration language (orbits, glyphs, dials) and real product UI mock-ups, which read as more premium. |
| Client-logo strip                                                           | **Replace** with explicit trust cues (curated teachers, expert review, cancellation) — inventing corporate clients would be dishonest.         |
| Testimonial carousel with autoplay                                          | **Keep** the carousel, add pause-on-interaction, reduced-motion stop, keyboard arrows, direct person selection and a live region.              |
| Long FAQ answers copied from a support page                                 | **Rewrite** shorter, scannable answers (60–90 words) with the same topics.                                                                     |
| 3-banner hero rotation                                                      | **Drop** — one static, high-craft hero is stronger and avoids motion/CLS cost.                                                                 |

### 1.7 Content model extracted from Ino

Levels (۳) → grades (۱۲) → per-grade lesson library, exam prep (تیزهوشان / نهایی / کنکور), teacher
directory, subscription plans, FAQ, blog. Schoolino models exactly this hierarchy in typed data
(`src/types/content.ts`), minus the blog (out of scope for Phase 1).

---

## 2. UI UX Pro Max — what was extracted

The reference site exposes a searchable database. The relevant rows were read directly from the
open-source dataset instead of guessing, and each one is applied in the design system.

### 2.1 Colour system (Education / LMS palettes)

| Source row      | Values                                                                             | How Schoolino uses it                                                                                                                                                                      |
| --------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Educational App | primary `#4F46E5`, accent `#EA580C`, background `#EEF2FF`                          | Indigo family validated for education; **not** copied — Schoolino uses a warmer indigo `#5741D6` and a saffron accent `#F4A62A` on a cream canvas `#FAF7F1` to avoid the “cool SaaS” look. |
| LMS             | primary `#0D9488`, accent `#D97706`, “education teal + course amber + grade green” | Adopted as the **semantic** layer: mint `#1C9C7E` for progress/success, saffron for emphasis, coral `#E2573F` for destructive/attention.                                                   |

Rules carried over: one primary, one accent, semantic success/error colours, text ≥ 4.5:1 on
backgrounds, borders as a separate, quieter token.

### 2.2 Typography

| Source row                                                                     | Finding                                      | Decision                                                                                                                      |
| ------------------------------------------------------------------------------ | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Playful Creative (Fredoka + Nunito)                                            | Rounded, playful — “children’s apps, gaming” | Rejected: too childish for a platform that must satisfy parents and konkur candidates.                                        |
| Academic/Research (Crimson Pro + Atkinson)                                     | Scholarly/accessible                         | Rejected: serif display is wrong for Persian script pairing here.                                                             |
| Claymorphism / kids pairings                                                   | Rounded display faces                        | Rejected for headings; kept only as an inspiration for generous radii.                                                        |
| Typographic scale examples (hero 48/52, section 32/38, card 22/28, body 16/24) | Concrete sizes                               | Adopted as a **ratio** (≈1.5 between hero and section, ≈1.35 section→card) and converted to `clamp()` for fluid Persian type. |

Persian-specific decision: Persian needs taller line-height and less letter-spacing than Latin.
Schoolino uses **Estedad** (display, geometric, excellent Persian numerals) + **Vazirmatn** (body,
highly legible at 16px) + **Plus Jakarta Sans** (Latin brand text and counters only). All three are
bundled locally via Fontsource — no external font request, no FOUT from a third-party domain.

### 2.3 Landing pattern

Selected pattern: **Feature-Rich Showcase** combined with **Trust & Authority + Conversion**:
`Hero (value prop) → proof/stats → feature grid → credibility (teachers) → pricing → social proof →
FAQ → final CTA → footer`, with CTAs repeated in the header, hero, pricing and the closing panel.
The dataset’s guidance “one key message per card, strong CTA repetition” is applied literally.

### 2.4 Motion guidance applied

| Rule from the dataset                                                             | Implementation                                                                  |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Hover micro-interactions: 150–300ms, `power2.out`, transform/opacity only         | `--dur-fast/base`, hover lift ≤ 6px, no layout animation                        |
| Scroll reveal: 400–600ms, small 8–16px offset, don’t animate everything           | `v-reveal` directive, 22px offset capped at 240ms stagger, one class toggle     |
| Stagger ≤ 8 children, 0.02–0.1s per item                                          | Grade/teacher/testimonial lists stagger at 70–110ms, max 6 items                |
| Parallax: small deltas, never on body copy                                        | Only decorative blobs animate; no scroll-linked text movement                   |
| Carousel: provide prev/next + pause, stop on focus/hover/offscreen/reduced motion | Implemented in `useCarousel` (reduced motion, document visibility, focus/hover) |
| Don’t animate layout properties                                                   | All motion uses `transform`/`opacity`/`filter`                                  |
| No scroll-jacking, no pinning                                                     | No Lenis, no GSAP pin                                                           |

### 2.5 UX guidelines applied (high/critical severity rows)

- Visible focus ring on **every** control, including overlay/drawer controls.
- Target size ≥ 24×24 CSS px (WCAG 2.2); primary controls are 44–56px tall on touch.
- Body text ≥ 16px; no text clipped in fixed-height boxes; `text-wrap: balance` on headings.
- Semantic HTML, landmark regions, `aria-current` for the active nav item, `aria-pressed` for
  toggles, `aria-live` for the carousel position and the demo notice.
- No colour-only meaning: savings/badges always pair colour with text.
- Reduced motion honoured globally **and** per-composable.
- Sticky header offset handled with `scroll-padding-block-start` so anchors are never hidden behind it.
- No autoplaying media, no scroll locking except the intentional drawer.

### 2.6 Vue-specific guidance applied

Composition API with `<script setup lang="ts">`, `key` on every `v-for`, no `v-if` + `v-for` on the
same node, props never mutated (events/composable state instead), observers and timers cleaned up in
`onScopeDispose`, `storeToRefs`-style readonly exposure of shared state, semantic elements instead of
clickable `div`s.

---

## 3. Competitive gaps Schoolino fills

1. **Design quality** — most Persian e-learning landing pages are dense, gradient-heavy and
   testimonial-spammy. Schoolino uses a warm, editorial canvas with a single accent per section.
2. **Honest demo content** — reference sites mix real claims with marketing superlatives; Schoolino
   labels sample data explicitly, which also makes the demo legally safe.
3. **Accessibility** — carousels that autoplay without controls, hover-only affordances and 12px body
   text are common; none of those patterns are used here.
4. **Performance** — the reference hero ships multi-megabyte banners; Schoolino’s hero is DOM + CSS
   (≈0 KB of imagery) and teacher portraits total ~260 KB WebP, lazy-loaded.
5. **Maintainability** — content is typed and separated from presentation, so a CMS/API can replace
   `src/data` without touching the sections.
