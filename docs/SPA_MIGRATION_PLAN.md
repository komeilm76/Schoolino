# SPA migration: Phase 0 gate

## User constraint

Preserve approved styles, artwork, geometry, label positions, content and responsive breakpoints. Apply the technical stack and architecture guidance in `initial_prompt.md`, not its alternative educational redesign. No backend or new business claims.

## Inspection

Current code is already a Vue 3 Composition API / strict TypeScript / Vite application, but almost all UI and interaction state lives in App.vue. Vuetify provides dialogs/forms; Tailwind's official Vite integration and VueUse document title are present. Missing mandatory tools: Bun lockfile/workflow, Vue DevTools, VueUse Motion, component tests. Existing regression tests cover 11 widths and orb-label geometry. Existing WebP/SVG assets stay unchanged.

## Architecture decision

App becomes a minimal RouterView. A persistent landing-page layout owns the header, hero and services, extracted without DOM-wrapper or CSS changes. Nested named routes render lazy-loaded dialogs over the approved page: /about, /solutions, /services, /services/:known-id, /contact and /cooperate. Browser Back/Forward and refresh work. An explicit not-found route handles unknown URLs. Route state replaces a local panel ref. Component-local menu/form state does not justify Pinia.

## Packages and responsibility

- Vue Router: URL/navigation/history; no extra rendering framework.
- Bun: package manager, scripts and committed bun.lock.
- Vue DevTools: development-only inspection plugin.
- @vueuse/motion: subtle contact-confirmation transition only, respecting reduced motion; no repositioning/entrance effects on the approved hero.
- VueUse: document title and reduced-motion preference.
- Vitest + Vue Test Utils + happy-dom: isolated composable and component tests.
- ESLint + typescript-eslint + eslint-plugin-vue + Prettier: lint/format gates.
- Existing Vuetify, Tailwind, Vite, TypeScript and local fonts remain.
- No GSAP, Lenis, Pinia, Zod or Iconify: no present requirement outweighs their additional complexity; custom approved icons remain.

## Milestones / acceptance

M1: lockfile/tool configuration. M2: component extraction and typed content. M3: nested routing and form composable. M4: component tests and complete docs. M5: typecheck, lint, format, unit/component tests, production build, route reload/history tests, 11-width browser regression, baseline screenshot comparison. All new state is client-side; contact remains explicitly demo-only.

## Risks

History-mode hosts need an index.html fallback (document deployment rules). Vue DevTools must not render a floating toolbar in the approved page. Route-backed dialog dismissal must restore focus. Motion must never alter the ecosystem coordinate stage. No external reference-site redesign is planned or researched in this migration because the user has approved the existing UI.

Phase 0 complete: scope, dependencies, architecture, design constraints, tasks and validation gates established before code migration.
