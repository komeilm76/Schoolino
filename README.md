# Avin — Vue SPA

A Persian-first Vue 3 / TypeScript single-page application. The approved reference-inspired UI, responsive positions and WebP artwork are preserved. The reference screenshot is not shipped or loaded.

## Requirements

Bun 1.4.4 (pinned by `packageManager`) and Node.js 22.14+ for upstream tooling. Dependencies are resolved by **bun.lock only**; do not create a second npm lockfile.

```sh
bun install --frozen-lockfile
bun --bun run dev        # Vite under Bun, on 0.0.0.0:5173
bun run dev:inspect      # opt-in Vue DevTools; do not run on the same port as dev
bun run typecheck
bun run lint
bun run format:check
bun run test             # Vitest + Vue Test Utils, 16 tests
bun run build
bun run preview          # production build preview on port 4173
bun run check            # typecheck, lint, format, tests, build
bun audit
```

`bun run format` formats the project. DevTools is enabled only with `--mode inspect`; open `/__devtools__/` on that server or press Alt+Shift+D. The normal preview and production build do not include the inspection overlay.

## Browser regression

With the development server running:

```sh
bun run test:browser
# Or test the production preview:
PREVIEW_URL=http://localhost:4173 bun run test:browser
```

The script uses npm-packaged Chromium, extracts its NSS libraries into a temporary directory and checks 11 screen widths (320–1920px), all five orb labels, service selection, contact validation, mobile menu, direct URLs, refresh, history, Escape dismissal, focus restoration, 404s and client-side navigation. Screenshots are saved to ignored `test-results/`.

## Routes

| URL                      | Behavior                      |
| ------------------------ | ----------------------------- |
| `/`                      | Approved landing page         |
| `/#services`             | Services anchor               |
| `/about`                 | About dialog                  |
| `/solutions`             | Solutions dialog              |
| `/services`              | Service chooser dialog        |
| `/services/it`           | IT detail dialog              |
| `/services/ai`           | AI detail dialog              |
| `/services/education`    | Education detail dialog       |
| `/contact`, `/cooperate` | Demo contact form             |
| Unknown paths            | Accessible 404 with home link |

Dialogs are lazy-loaded child routes over a persistent landing page. Back/Forward and direct entry work without server-rendered pages. On a production host, configure an **index.html fallback** for non-asset URLs; see `docs/DEPLOYMENT.md`.

## Architecture

```text
src/
  App.vue                  # router outlet + reactive document title
  main.ts                  # Vue, Router, Vuetify, VueUse Motion
  router/                  # typed nested routes
  views/                   # LandingPage, PanelPage, NotFoundPage
  components/
    layout/                # header + responsive menu
    home/                  # hero, backdrop, service grid/card
    forms/                 # contact form
    ui/                    # original approved SVG brand/icons
  composables/             # navigation and isolated demo form state
  data/                    # typed service and orbit-label content
  plugins/                 # RTL Vuetify palette
  utils/                   # deterministic wave geometry
  types/                   # typed route metadata
  style.css                # approved responsive styles
public/assets/             # four individual optimized WebP illustrations
```

Vuetify owns dialogs/forms. Tailwind provides small layout utilities, with the official Vite integration. Custom CSS retains the approved landing layout. VueUse Motion adds a reduced-motion-aware, opacity-only contact confirmation transition; the hero and orbit anchors do not animate or move.

## Status / boundaries

The migration preserves the desktop/mobile baseline (zero changed pixels in the recorded local comparison). See `docs/QA_REPORT.md` for exact checks; this is not a guarantee across every browser or OS.

The generated illustration and SVG logo are approximations of the reference, not original design layers. Contact data is never sent or stored; a production endpoint is future work. No authentication, payments, dashboards, invented business claims or unrelated Schoolino education sections have been added.
