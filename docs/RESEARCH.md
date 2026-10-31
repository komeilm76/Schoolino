# Research and migration findings

## Authoritative inputs

- Local initial_prompt.md: Vue 3, TypeScript, Bun, Vite, Vuetify, Tailwind, Vitest, Vue DevTools, VueUse, VueUse Motion and JSDoc are mandatory.
- User-approved running page: controls actual visual direction, content and layout. Earlier revisions refined illustration callouts and procedural background; all are preserved.

## Scope boundary

The external education/design reference sites were not revisited in this migration. Their education-page requirements would conflict with the user's explicit instruction to preserve the current UI; no claims are made about having audited them. No student, teacher or pricing content was invented to satisfy an unrelated redesign brief.

## Local technical findings

The starting implementation already used Vue, Vite, TypeScript, Vuetify and Tailwind, but had one large App.vue and local dialog state rather than routes. Component extraction introduced no wrapper boxes. Nested lazy dialog routes retain the approved page while adding sharable links. The Vuetify close-on-back default conflicted with router-owned history; disable it and allow Vue Router to handle popstate. Explicit CSS container-unit anchors remain untouched.
