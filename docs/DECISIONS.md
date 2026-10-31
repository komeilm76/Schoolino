# Decisions

- Preserve Avin, not redesign Schoolino: the user's approved UI takes precedence over the prompt's example educational sections.
- Vue migration means modular SPA architecture: the starting framework was already Vue 3; do not imply it was another framework.
- Nested route dialogs preserve the original interaction model and background composition while supplying direct URLs, refresh and browser history.
- One router-owned history mechanism: disable Vuetify close-on-back to avoid duplicate popstate handling. Verified with real Back/Forward tests.
- No store: independent local menu/form state and route-derived panel state do not justify Pinia.
- One lockfile: Bun replaces npm resolution; package-lock.json is removed.
- DevTools opt-in: normal previews keep the approved pixels; inspect mode adds development inspection only.
- Motion only in new feedback state: no entrance animation changes the hero/callout alignment.
- Patched transitive glob/minimatch overrides: needed to address tooling advisories; verify upstream compatibility with lint, tests and build.
- No new research-driven UI: original external websites were not re-audited for this scope.
