# Stack decisions

| Tool                                           | Actual use                                                               |
| ---------------------------------------------- | ------------------------------------------------------------------------ |
| Vue 3                                          | Composition API, script setup, reusable components                       |
| TypeScript                                     | strict compiler, typed props/emits/content/route metadata                |
| Bun 1.4.4                                      | package manager, bun.lock, script orchestration; Vite can run with --bun |
| Vite 7                                         | development/HMR and production chunks                                    |
| Vuetify 3                                      | RTL dark dialogs, cards, fields and buttons                              |
| Tailwind 4                                     | official @tailwindcss/vite integration and utility classes               |
| Vitest 5                                       | isolated DOM/component, pure utility and router tests                    |
| Vue Test Utils / happy-dom                     | real card and Vuetify form behavior tests                                |
| Vue DevTools                                   | vite-plugin-vue-devtools, opt-in inspect mode                            |
| VueUse                                         | title and reduced-motion preference                                      |
| @vueuse/motion 3                               | reduced-motion-aware contact confirmation                                |
| Vue Router 5                                   | nested lazy routes, history, hash scrolling, 404                         |
| ESLint / typescript-eslint / eslint-plugin-vue | code quality gate                                                        |
| Prettier                                       | formatting gate                                                          |
| Playwright / packaged Chromium                 | real browser regression, not production dependencies                     |

Exact versions are resolved in bun.lock. No GSAP, Lenis, Pinia, Iconify or Zod: current motion, state, approved icons and validation do not justify them. JSDoc documents public composables and geometry helpers.

Development-only dependency advisories in glob/minimatch were fixed with explicit package overrides to patched major versions; the full lint/test/build suite was rerun. Review these overrides on future upstream upgrades. Bun audit reports no known advisories at validation time.
