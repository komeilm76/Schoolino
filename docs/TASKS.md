# Migration tasks

| ID     | Task                        | Priority | Depends on     | Output / acceptance                                                                | Status |
| ------ | --------------------------- | -------- | -------------- | ---------------------------------------------------------------------------------- | ------ |
| SPA-01 | Inspect app and prompt      | P0       | none           | Approved UI constraints and architecture plan                                      | Done   |
| SPA-02 | Capture baseline            | P0       | SPA-01         | Desktop/mobile screenshots for comparison                                          | Done   |
| SPA-03 | Bun and mandatory tools     | P0       | SPA-01         | Frozen install, single lockfile, DevTools/Motion installed and exercised           | Done   |
| SPA-04 | Extract components/content  | P0       | SPA-02         | No added wrapper boxes or changed CSS coordinates                                  | Done   |
| SPA-05 | Nested routes               | P0       | SPA-04         | All existing views deep-link; native history/refresh/404 pass                      | Done   |
| SPA-06 | Form/navigation composables | P1       | SPA-04         | Typed isolated state, no fake backend; component tests                             | Done   |
| SPA-07 | Reduced-motion confirmation | P1       | SPA-03, SPA-06 | Opacity-only transition; fixed hero untouched                                      | Done   |
| SPA-08 | Quality/CI                  | P1       | SPA-03         | Typecheck, ESLint, Prettier, 16 tests, build and audit pass                        | Done   |
| SPA-09 | Browser/visual regression   | P0       | SPA-05, SPA-07 | 11 widths, callout bounds, no collisions, route/history/focus, baseline comparison | Done   |
| SPA-10 | Documentation/deployment    | P1       | SPA-08, SPA-09 | Setup, route table, fallback requirements and honest limitations                   | Done   |
