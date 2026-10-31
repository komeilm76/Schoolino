# Decision Log

Format: **ID — decision** · context · alternatives · outcome. Newest decisions are appended at the end
of the relevant section.

## Architecture

### D-01 — Single-page scroll document, no router

**Context:** Phase 1 is one landing page; the brief asks for future readiness without unnecessary
infrastructure.
**Alternatives:** `vue-router` with placeholder routes; multi-page setup.
**Decision:** No router. Anchor navigation + section components. Adding the router later only requires
wrapping sections in `views/`.

### D-02 — Vuetify for behaviour, Tailwind for visuals, separated by CSS layers

**Context:** Both libraries must coexist without `!important` wars or unpredictable overrides.
**Alternatives:** Vuetify-only (utility classes + theming), Tailwind-only with a hand-built drawer,
`!important` patchwork.
**Decision:** `main.css` declares `@layer theme, base, vuetify, components, utilities;` and
`vuetify-settings.scss` compiles Vuetify with `$layers: true`. Vuetify owns drawer/expansion-panel
behaviour; Tailwind owns layout and appearance.
**Consequence:** Scoped component CSS is unlayered and outranks Tailwind utilities, so responsive
display toggles are applied to wrapper elements (documented at each usage).

### D-03 — Content as typed modules + zod schemas, not inline in components

**Context:** The brief requires content separation and API readiness.
**Decision:** `src/types/content.ts` defines the model, `src/data/*` holds content, `src/data/schemas.ts`
validates it at test time, `src/data/index.ts` exports one `PageContent` bundle.

### D-04 — No GSAP, no Lenis; CSS + IntersectionObserver + VueUse

**Context:** Motion requirements are reveals, stagger, counters, carousel, drawer.
**Alternatives:** GSAP timelines, Lenis smooth scroll.
**Decision:** CSS transitions with class toggles, one observer per element, rAF counters.
**Why:** smaller bundle, no scroll hijacking, native reduced-motion, no accessibility regressions.
**Revisit when:** a dashboard or scroll-driven storytelling page needs timelines/FLIP.

### D-05 — Vuetify config via the official Vite plugin

`vite-plugin-vuetify` with `autoImport: true` and `styles.configFile` tree-shakes component styles and
injects them only for used components (342 modules instead of the whole framework).

### D-06 — No Pinia

Module-scope composables (`useTheme`, `useDemoNotice`) cover shared state; everything else is local or
derived. Pinia arrives with dashboards/cart.

### D-07 — Bun for package management/scripts, Node for tooling runtime

`bun install` produces the lockfile and `bun run <script>` executes every npm script; Vite/Vitest run on
Node 22 in this environment. Both are supported paths (`npm run …` also works).

## Design

### D-08 — Warm cream canvas + indigo + saffron, instead of the usual cool SaaS palette

**Context:** The reference design database recommends indigo/orange for education, but the reference
Persian site (and most competitors) lean cool and dense.
**Decision:** `#FAF7F1` canvas, `#5741D6` brand, `#F4A62A` accent, mint for progress. The warm ground
makes the page feel editorial and reduces the “template” impression.

### D-09 — Estedad (display) + Vazirmatn (body) + Plus Jakarta Sans (Latin)

**Alternatives:** Vazirmatn-only (safe but flat), rounded kids' fonts (rejected as too childish for
parents/konkur candidates), Latin fonts transliterated for Persian (rejected — poor rendering).
**Decision:** three variable families, self-hosted, Persian numerals via `Intl`.

### D-10 — Original illustration language instead of a mascot

The reference site uses a robot mascot and cloud illustrations. Schoolino uses geometric glyphs,
orbit/grid patterns, a progress dial and DOM-built product mock-ups — more premium, themeable, and
zero image weight in the hero.

### D-11 — Generated teacher portraits (flat vector style)

**Alternatives:** stock photography (licensing/privacy issues, inconsistent style), avatars/initials
(too weak for a “teachers” showcase), external placeholder services (broken links, violates brief).
**Decision:** six original illustrations in one palette, exported as 536×960 WebP, lazy-loaded.

### D-12 — Explicit demo labelling everywhere

Statistics, testimonials, teacher profiles, prices and contact details are labelled as sample content.
This satisfies the brief's honesty rule and keeps the demo safe to publish.

## Engineering

### D-13 — Icons: generated Lucide subset registered offline

`@iconify-json/lucide` (654 KB) is a **build-time** dependency; `scripts/build-icon-subset.mjs` writes
the 59 used icons to `src/assets/icons/lucide-subset.json` (16 KB) which `addCollection()` registers.
No icon CDN requests, no runtime downloads.

### D-14 — Honest CTA pattern (`useDemoNotice`)

**Problem:** a frontend-only demo must not fake sign-up, checkout or social links.
**Decision:** a single module-scope notice with an assertive live region, opened by every
backend-dependent action, dismissible with Escape/close button, auto-dismiss after 6s.
**Why not disabled buttons:** disabled controls teach users nothing; a short explanation does.

### D-15 — Fonts via Fontsource, not `@import` from Google Fonts

Removes a third-party render-blocking request and the privacy implication; keeps `font-display: swap`.

### D-16 — Theme handling: tokens + `data-theme`, pre-paint inline script

Tokens live in `:root` / `:root[data-theme='dark']`, exposed to Tailwind with `@theme inline` so
utilities follow the live values. A 12-line inline script in `index.html` applies the stored/system
theme before first paint (no flash), and `useTheme()` mirrors the choice into Vuetify's theme name.

### D-17 — `v-reveal` custom directive instead of per-component observers

One directive handles reveal state, stagger, threshold and reduced motion. Content is visible without
JS (`<noscript>` + reduced-motion CSS), so crawlers and no-JS users are unaffected.

### D-18 — Testing: behaviour over snapshots

Component tests assert user-visible behaviour and accessibility state (aria attributes, live regions,
keyboard navigation) rather than markup snapshots, so refactors do not create false failures.

### D-19 — Prices modelled as a composable, not template maths

`useBilling` owns cycle state and price derivation (yearly total, monthly equivalent, saving percent);
it is unit-tested and reusable by a future checkout flow.

### D-20 — Version pinning to a mutually compatible stable set

Vite 7 / plugin-vue 6 / Vitest 3 / Vuetify 3.13 / Tailwind 4.1 / TS 5.9 / ESLint 9 are pinned exactly.
Newer majors available on the registry were rejected because they break the integration points used
here (notably Vuetify 4's SASS layer configuration), and the brief requires _currently compatible_
official integrations.

### D-21 — scoped `:deep()` used sparingly for Vuetify internals

FAQ / drawer styling touches a few Vuetify internals (`.v-expansion-panel-title__icon`,
`.v-navigation-drawer__content`). All of them are shallow, documented, and isolated in the component
that owns that widget, so a Vuetify minor upgrade has a small, findable blast radius.
