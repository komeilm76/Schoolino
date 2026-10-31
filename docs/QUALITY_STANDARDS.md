# Quality Standards

## 1. Code

- **TypeScript strict.** `strict`, `noUncheckedIndexedAccess`, `noUnusedLocals/Parameters`,
  `noImplicitOverride`, `verbatimModuleSyntax`. No `any`; the single type assertion in the codebase is
  `lucideSubset as IconifyJSON` (JSON import cannot be typed structurally) and it is documented.
- **`<script setup lang="ts">` only.** Props via `defineProps<T>()` with `withDefaults`, emits via
  `defineEmits<{...}>()`.
- **Component size.** Sections stay under ~350 lines including styles; anything longer is split
  (`HeroLessonCard`). UI primitives are single-purpose.
- **No duplicated logic.** Formatting, scroll, billing maths, reveal behaviour and demo notices exist
  exactly once, in `utils/` or `composables/`.
- **JSDoc** on every exported utility, composable, directive option type and non-obvious component
  contract.
- **Readonly state.** Shared composable state is returned with `readonly()`; mutations only through the
  exposed functions.
- **Cleanup.** Every observer, timer and listener is released (`onScopeDispose`, `unmounted` hook,
  VueUse built-ins).
- **Naming.** `PascalCase.vue`, `useThing.ts`, `thing.util.ts`, `kebab-case` data files.
- **Formatting.** Prettier (no semicolons, single quotes, 100 cols); ESLint flat config with Vue and
  TypeScript recommended rules.

## 2. Accessibility (WCAG 2.2 AA)

| Requirement                | How it is met                                                                                          |
| -------------------------- | ------------------------------------------------------------------------------------------------------ |
| 1.1.1 Non-text content     | Meaningful `alt` on teacher portraits; decorative SVG/gradients are `aria-hidden`                      |
| 1.3.1 Info & relationships | Landmarks, heading order (single `h1`), `dl` for stats, `ol` for steps, `figure/blockquote` for quotes |
| 1.4.3 Contrast             | Token pairs audited in `DESIGN_SYSTEM.md` (body ≥ 4.5:1)                                               |
| 1.4.4 Resize text          | Fluid `clamp()` type; layout reflows at 200% zoom                                                      |
| 1.4.10 Reflow              | No fixed-width content; verified at 320–390px                                                          |
| 1.4.13 Content on hover    | Nothing essential appears only on hover                                                                |
| 2.1.1 Keyboard             | Every control is a native `button`/`a`; no `tabindex` traps                                            |
| 2.1.2 No keyboard trap     | Drawer traps focus intentionally but closes on Escape and returns focus                                |
| 2.4.1 Bypass blocks        | “پرش به محتوای اصلی” skip link                                                                         |
| 2.4.3 Focus order          | Visual order = DOM order everywhere                                                                    |
| 2.4.7 Focus visible        | 3px accent outline with offset on `:focus-visible` for all interactive elements                        |
| 2.4.11 Focus not obscured  | `scroll-padding-block-start` keeps anchored sections clear of the sticky header                        |
| 2.5.5/2.5.8 Target size    | Mobile controls ≥ 44px (menu button 46px, chips 36×44px)                                               |
| 3.3.1 Error identification | Form-less demo; invalid actions explain themselves via the notice                                      |
| 4.1.2 Name/role/value      | `aria-pressed` toggles, `aria-current` nav, `aria-expanded` accordion, labelled icon-only buttons      |
| 4.1.3 Status messages      | `role="status"` notice + `aria-live="polite"` carousel and grade-selection regions                     |
| Motion                     | `prefers-reduced-motion` honoured in CSS, directive and composables                                    |

Manual keyboard walkthrough is part of the QA checklist (`QA_REPORT.md`).

## 3. Performance

Budgets enforced by review (and visible in the build output):

| Budget            | Target                          | Actual (production build)                    |
| ----------------- | ------------------------------- | -------------------------------------------- |
| Initial JS (gzip) | ≤ 120 KB                        | ~119 KB (vue 31.9 + vuetify 19.2 + app 67.9) |
| CSS (gzip)        | ≤ 25 KB                         | 19.2 KB                                      |
| Hero imagery      | 0 KB (DOM/CSS mock-up)          | 0 KB                                         |
| Teacher portraits | ≤ 70 KB each                    | 31–64 KB (lazy)                              |
| Font files        | ≤ 60 KB each, subset per script | 7.6–57 KB                                    |
| Icons             | ≤ 20 KB JSON, no CDN            | 16.5 KB                                      |

Techniques: transform/opacity-only motion, `IntersectionObserver` instead of scroll math, passive
VueUse scroll position for the header, explicit image dimensions (no CLS), `loading="lazy"` +
`decoding="async"`, tree-shaken Vuetify, vendor chunk splitting, `content-visibility` avoided (it
breaks in-view observers).

## 4. Testing standards

- Utilities: exhaustive cases including Persian formatting and rounding edge cases.
- Composables: state transitions, wrapping/clamping, guard values, cleanup.
- Data: zod validation, unique ids, complete grade coverage, resolvable image keys, anchor targets
  exist, price invariants.
- Components: real interactions (click/keyboard) and accessibility state assertions.
- Every test must assert observable behaviour; snapshot-only tests are not accepted.
- Current suite: **62 tests across 11 files**, all green; `test:coverage` available for the logic layer.

## 5. Documentation standards

- Documentation describes the implementation that exists (no aspirational features presented as done).
- Every requirement in `PRODUCT_REQUIREMENTS.md` maps to a task in `TASKS.md`.
- Decisions with trade-offs are recorded in `DECISIONS.md` with context and alternatives.
- Commands in README are copy-pasteable and verified.

## 6. Review checklist (pre-merge)

- [ ] `bun run typecheck`, `bun run lint`, `bun run test`, `bun run build` all pass.
- [ ] No console errors/warnings in the browser on load, scroll, toggle, or interaction.
- [ ] Verified at 390 / 768 / 1024 / 1440 / 1920 px, light and dark.
- [ ] Keyboard-only pass: skip link → header → hero → sections → footer.
- [ ] Reduced-motion pass: no animation, no autoplay, all content present.
- [ ] Every CTA produces honest feedback.
- [ ] No horizontal scrollbars, no overlapping text, no clipped Persian descenders.
- [ ] Arabic/Persian text renders with correct shaping and Persian numerals.
