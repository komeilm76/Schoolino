# SPA migration QA

## Executed checks

- Bun frozen-lockfile installation passed.
- Strict TypeScript check passed.
- ESLint passed.
- Prettier formatting applied; final format check is part of delivery gate.
- Vitest: 16 tests across six files passed (service/data integrity, mesh geometry, pure form validation/state, rendered cards, actual Vuetify form behavior and route resolution).
- Production Vite build passed; PanelPage and NotFoundPage produce separate lazy chunks.
- DevTools inspect server started under Bun; /**devtools**/ returned HTTP 200. Inspection server was stopped after validation.
- Bun audit reported zero known advisories after patched transitive overrides.
- Browser checks passed at eleven widths from 320 to 1920px: label anchoring, bounds, collision checks, overflow and interactions.
- Browser direct-route, reload, Back/Forward, Escape, focus return, 404 and client-side navigation checks passed without uncaught page errors.
- The complete browser suite also passed against the production build on port 4173, including the non-reduced-motion VueUse Motion confirmation path. Production screenshots also matched both baselines with zero changed pixels.

## Visual preservation

Compared screenshots of the pre-migration approved page with the migrated app using the same local Chromium, viewport, fonts and reduced-motion preference:

- Desktop: 1568 × 886 full-page output, zero changed pixels.
- Mobile: 390 × 1515 full-page output, zero changed pixels.

This measures migration preservation in the tested environment, not similarity to the original supplied PNG or a cross-browser guarantee. No image assets or illustration anchor coordinates were changed.

## Limitations

No Lighthouse or formal WCAG conformance audit is claimed. No real enquiry endpoint exists. External reference websites were not re-researched. Source logo/font identity is not established from the original PNG. Hosting needs history fallback. Baseline screenshots and generated test output are ignored rather than shipped as product assets.
