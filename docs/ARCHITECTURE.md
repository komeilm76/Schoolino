# Architecture — Schoolino

## 1. Shape of the application

A single-page Vue 3 application with no router: the landing page is one scroll document whose
sections are anchored. This keeps the demo lean while leaving room for `vue-router` later (each
section is already an isolated component, and the content layer is route-agnostic).

```
main.ts
 ├─ plugins/vuetify.ts      → accessible behaviour + theme names
 ├─ plugins/icons.ts        → offline Lucide subset (no CDN)
 ├─ plugins/reveal.ts       → v-reveal IntersectionObserver directive
 ├─ App.vue                 → layout shell + section order
 └─ styles/main.css         → tokens, cascade layers, component primitives
```

## 2. Folder structure

```
Schoolino/
├─ docs/                         Phase 0 documentation (this folder)
├─ public/favicon.svg
├─ scripts/build-icon-subset.mjs  Extracts used Lucide icons into src/assets/icons
├─ src/
│  ├─ assets/
│  │  ├─ icons/lucide-subset.json Generated (do not edit by hand)
│  │  ├─ images/teachers/*.webp   Original illustrations
│  │  └─ teacherImages.ts         image registry + safe resolver
│  ├─ components/
│  │  ├─ layout/                  SiteHeader, SiteFooter, ThemeToggle, BackToTop, DemoNoticeHost
│  │  ├─ sections/                One component per page section (+ hero/HeroLessonCard.vue)
│  │  └─ ui/                      AppIcon, BrandLogo, SectionHeading, StarRating, AvatarStack,
│  │                              StatCounter, LevelGlyph, BillingToggle
│  ├─ composables/                useTheme, useScrollSpy, useCountUp, useCarousel,
│  │                              useBilling, useDemoNotice
│  ├─ data/                       Typed content (levels, features, teachers, stats, plans,
│  │                              testimonials, faqs, steps, navigation, site) + zod schemas + index
│  ├─ plugins/                    vuetify, icons, reveal
│  ├─ styles/                     main.css (design system), vuetify-settings.scss
│  ├─ types/content.ts            Content model
│  ├─ utils/                      format.ts (Persian numbers/prices), scroll.ts
│  ├─ App.vue
│  ├─ main.ts
│  └─ env.d.ts
├─ tests/
│  ├─ setup.ts                    jsdom stubs (matchMedia, observers, scrollIntoView)
│  ├─ utils/mount.ts              mountWithApp() with Vuetify + directives
│  └─ unit/*.spec.ts              utilities, composables, data, components
├─ index.html                     RTL/Persian document, theme pre-paint script, noscript fallback
├─ vite.config.ts / vitest.config.ts / tsconfig.json / eslint.config.js / .prettierrc.json
└─ package.json                   Bun scripts
```

Naming: **PascalCase** components, `useCamelCase` composables, `kebab-case` data files, `camelCase`
exports, `.spec.ts` tests.

## 3. Layering rules

```
types/     → pure types, no imports
data/      → imports types (+zod for schemas); no components
utils/     → pure functions; no Vue; no DOM except scroll.ts helpers
composables→ reactive state/logic; may import utils/data; no components
components → presentation; may import composables/data/utils/ui
plugins/   → framework wiring
```

- Components never import each other across `sections` (only `sections → ui` and `hero/*`).
- No component holds educational copy: titles, descriptions, features and figures come from `data/`.
- Shared mutable state (`useTheme`, `useDemoNotice`) lives at module scope inside its composable and
  is exposed **readonly**; mutations go through the returned functions.

## 4. Content pipeline (API-ready)

`src/data/index.ts` exports a single `PageContent` bundle plus the individual slices. A future API
integration becomes:

```ts
// today
import { pageContent } from '@/data'

// later
const pageContent = await fetchPageContent() // same PageContent type
```

Zod schemas in `src/data/schemas.ts` are the runtime contract for that payload and are already used by
the data-integrity tests, so a malformed entry fails CI rather than the page.

Facts intentionally kept out of components: prices, plan features, teacher bios, FAQ copy, grade
ranges, statistics, navigation labels, contact placeholders.

## 5. Styling architecture

Two styling systems with a **hard boundary**:

| Concern                                                                              | Owner                        |
| ------------------------------------------------------------------------------------ | ---------------------------- |
| Colour, type, spacing, layout, cards, buttons, chips, decorative effects             | Tailwind + custom properties |
| Accessible interactive behaviour (drawer, expansion panels, dialog/snackbar if used) | Vuetify                      |

Conflict prevention:

1. `main.css` declares `@layer theme, base, vuetify, components, utilities;`
2. `src/styles/vuetify-settings.scss` compiles Vuetify with `$layers: true`, so every Vuetify rule
   lands inside `@layer vuetify` — **below** Schoolino's `components` and Tailwind's `utilities`.
3. Vuetify is initialised with `theme` names whose colours mirror the design tokens, so its internal
   components never introduce foreign colours.
4. Vuetify utilities (`.d-flex`, `.bg-*`) are never used in templates; layout is Tailwind-only.

> Practical consequence: scoped component styles are _unlayered_ and therefore beat utilities. Where a
> responsive utility must win (e.g. hiding a button on mobile), the utility is applied to a wrapper
> element instead of the component root. This rule is documented next to those usages.

## 6. State management

No Pinia. State falls into three buckets:

1. **Local component state** — accordion selection, active lesson, hover/focus.
2. **Module-level composable state** — theme preference, demo notice (single host in `App.vue`).
3. **Derived state** — billing prices (`useBilling`), carousel index (`useCarousel`), counters.

Adding Pinia is only justified when a dashboard/cart exists (see `ROADMAP.md`).

## 7. Error handling & honesty

- No network calls exist, so there is no fetch error path; instead every unavailable action routes to
  `useDemoNotice`, which always names _what_ is missing and _why_.
- `resolveTeacherImage()` falls back to a known portrait so a bad key can never render a broken image.
- Unknown anchors: `scrollToSection` is a no-op (guarded), so a stale hash cannot throw.
- Content is validated at test time (zod) and typed at build time (strict TS).

## 8. Accessibility architecture

- Landmarks: `header`, `nav` (×2), `main`, `footer`; single `h1`; sections labelled by their headings.
- The sticky header offset is centralised in `scroll-padding-block-start` (no per-link magic numbers).
- Focus management: skip link → `#main`; anchor navigation moves focus to the target section; the demo
  notice receives focus when it opens and closes on Escape.
- State exposed with `aria-current`, `aria-pressed`, `aria-expanded`, `aria-live`, `role="status"`.
- Motion: CSS media query + `prefersReducedMotion()` + VueUse `usePreferredReducedMotion()`.

## 9. Performance architecture

- Icons: generated subset (16 KB JSON) instead of a 600 KB icon library or a runtime CDN.
- Fonts: self-hosted variable woff2, per-script subsets, `font-display: swap`.
- Images: WebP, explicit `width`/`height` (no CLS), `loading="lazy"` + `decoding="async"`.
- Motion: CSS transitions toggled by one class; a single observer per element; no scroll listeners
  except VueUse's passive, rAF-throttled scroll position for the header.
- Bundle splitting: `vue` and `vuetify` are separate vendor chunks; Vuetify tree-shakes to the three
  components actually used.

## 10. Testing architecture

| Layer                                                          | Approach                                                                                                                                                             |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pure utilities (`format`, `scroll`)                            | Direct unit tests incl. Persian formatting edge cases                                                                                                                |
| Composables (`billing`, `carousel`, `count-up`, `demo-notice`) | Unit tests with `effectScope`, fake timers, controllable rAF                                                                                                         |
| Content                                                        | zod schema validation + cross-collection invariants (unique ids, grades 1–12, anchors exist, image keys resolve, exactly one recommended plan, yearly < 12× monthly) |
| Components (grades, plans, FAQ, testimonials)                  | `mountWithApp` with real Vuetify: interaction, state exposure, a11y attributes                                                                                       |

`tests/utils/mount.ts` mounts with the real Vuetify plugin and `v-reveal` directive so tests exercise
the same wiring as production.

## 11. Extension points

| Future module                     | Where it plugs in                                                                           |
| --------------------------------- | ------------------------------------------------------------------------------------------- |
| Student/teacher/parent dashboards | New route tree; reuse `ui/` components and the token layer                                  |
| Auth                              | Header CTA → auth flow; `useDemoNotice` call sites become real handlers                     |
| Course/lesson data                | Replace `src/data` with API + zod validation; `PageContent` stays                           |
| Payments                          | `useBilling` already models price/period; plan CTA becomes checkout intent                  |
| Analytics                         | Section components already emit meaningful DOM ids (`#grades`, `#plans`, …) for event names |
| i18n                              | Copy is centralised in data modules; UI strings would move to a message catalogue           |
