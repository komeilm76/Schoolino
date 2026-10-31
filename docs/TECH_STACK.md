# Tech Stack — Selection & Justification

Every dependency below is pinned; the full resolved graph is in `bun.lock`.

## 1. Required stack (from the brief)

| Tool               | Version                            | Why it is here                                                                                                                                                                                                         |
| ------------------ | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Vue 3**          | 3.5.x                              | Composition API + `<script setup lang="ts">` gives the smallest, most readable units; SFC scoped styles suit a bespoke design system.                                                                                  |
| **TypeScript**     | 5.9.x                              | Strict mode (`strict`, `noUncheckedIndexedAccess`, `noUnusedLocals`, `verbatimModuleSyntax`).                                                                                                                          |
| **Bun**            | 1.4.x                              | Package manager + script runner. `bun install` is fast and `bun run <script>` works for all npm scripts; Vite itself runs on Node 22 in this environment.                                                              |
| **Vite**           | 7.3.x                              | Dev server + bundler with native ES modules, fast HMR, library-agnostic plugin ecosystem.                                                                                                                              |
| **Vuetify**        | 3.13.x                             | Accessible interaction primitives (drawer, expansion panels, overlay/theme). Chosen over hand-rolling a focus-trapped drawer. CSS-layer support keeps it isolated from Tailwind.                                       |
| **Tailwind CSS**   | 4.1.x                              | Utility layer for layout/spacing plus `@theme` tokens; v4 needs no `tailwind.config.js` and reads design tokens directly from CSS.                                                                                     |
| **Vitest**         | 3.2.x                              | Same transform pipeline as Vite, jsdom environment, fast feedback.                                                                                                                                                     |
| **Vue DevTools**   | 8.2.x (`vite-plugin-vue-devtools`) | Component/state inspection during development only.                                                                                                                                                                    |
| **VueUse**         | 13.9.x                             | `useWindowScroll`, `usePreferredDark`, `useStorage`, `useIntersectionObserver`, `useIntervalFn`, `useDocumentVisibility`, `usePreferredReducedMotion` — all correctly cleaned up, removing hand-written listener code. |
| **@vueuse/motion** | 3.0.x                              | Declarative `v-motion` entrance animations for the hero.                                                                                                                                                               |
| **JSDoc**          | —                                  | All public utilities, composables and non-obvious component behaviour are documented inline.                                                                                                                           |

## 2. Additional libraries — evaluated and selected

| Library                                                                      | Decision               | Reason                                                                                                                                                                                                                                                                                                                               |
| ---------------------------------------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Iconify (`@iconify/vue` + `@iconify-json/lucide` as a build-time source)** | ✅ Selected            | One consistent stroke icon set, tree-shaken to a generated 16 KB subset. `@iconify-json/lucide` is **not** shipped to the browser; only the subset JSON is.                                                                                                                                                                          |
| **Zod**                                                                      | ✅ Selected            | Runtime contract for content; powers data-integrity tests and future API validation. v3 (stable, 13 KB gzip, tree-shakes to what is used).                                                                                                                                                                                           |
| **Fontsource (variable fonts)**                                              | ✅ Selected            | Self-hosted Persian/Latin typefaces (`estedad`, `vazirmatn`, `plus-jakarta-sans`) without a third-party font CDN.                                                                                                                                                                                                                    |
| **GSAP**                                                                     | ❌ Rejected            | The entire motion language (reveals, stagger, counters, carousel, drawer) is achievable with CSS transitions + IntersectionObserver at a fraction of the weight. Adding ~50 KB gzip for no unique capability would violate the brief's performance rules. Re-evaluate only if a future module needs ScrollTrigger timelines or FLIP. |
| **Lenis**                                                                    | ❌ Rejected            | Smooth-scroll hijacking conflicts with native scrolling, `scroll-padding` anchor behaviour and reduced-motion expectations. Not worth the accessibility risk for a landing page.                                                                                                                                                     |
| **Vue Router**                                                               | ❌ Deferred            | One page, no routes. Section components are already isolated so adding the router later is mechanical.                                                                                                                                                                                                                               |
| **Pinia**                                                                    | ❌ Deferred            | No cross-feature shared state today; module-scope composables cover theme and notices. Needed when dashboards/cart arrive.                                                                                                                                                                                                           |
| **ESLint + Prettier**                                                        | ✅ Selected            | `eslint` 9 flat config, `eslint-plugin-vue` 10 (flat/recommended), `typescript-eslint` 8, `eslint-config-prettier`, Prettier 3.                                                                                                                                                                                                      |
| **Sass**                                                                     | ✅ Selected (dev only) | Required by `vite-plugin-vuetify` for the `$layers: true` SASS settings file. No Sass is authored in `src/` beyond that settings file.                                                                                                                                                                                               |
| **Coverage (`@vitest/coverage-v8`)**                                         | ✅ Selected            | Used for `bun run test:coverage` on utilities/composables/data.                                                                                                                                                                                                                                                                      |

## 3. Version pinning strategy

- Every dependency is pinned to an exact version (no `^`) so the demo is reproducible.
- The chosen majors are the current stable, mutually-compatible set: Vite 7 / `@vitejs/plugin-vue` 6 /
  Vitest 3 / Vuetify 3.13 (Vue 3) / Tailwind 4.1 / TypeScript 5.9 / ESLint 9.
- Newer majors published on the registry at build time (Vite 8, Vuetify 4, TypeScript 7, Vitest 5,
  Tailwind 4.3) were deliberately **not** adopted: they change plugin APIs (Vuetify 4 removes the
  SASS-layer integration that this project depends on) and the brief asks for _currently compatible_
  official integrations rather than bleeding edge.

## 4. Scripts

```bash
bun install          # install dependencies
bun run dev          # Vite dev server (0.0.0.0:5173)
bun run build        # vue-tsc type-check + production build
bun run preview      # preview the production build (0.0.0.0:4173)
bun run typecheck    # vue-tsc only
bun run test         # Vitest (run once)
bun run test:watch   # Vitest watch mode
bun run test:coverage
bun run lint         # ESLint (cached)
bun run format       # Prettier write
bun run format:check # Prettier check
node scripts/build-icon-subset.mjs   # regenerate the Lucide subset
```

## 5. Runtime support

- Node ≥ 20.19 for tooling (Vite 7 requirement); developed on Node 22.
- Browsers: evergreen Chrome/Edge/Firefox/Safari (ES2022 output, CSS nesting-free, `color-mix` and
  `:has()` used with graceful degradation where cosmetic).
- No polyfills are shipped; the app degrades to static readable content without JavaScript
  (`<noscript>` removes reveal hiding).
