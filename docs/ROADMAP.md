# Roadmap

## Milestone status

| #   | Milestone                   | Scope                                                                                                                                       | Status  |
| --- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| M0  | **Foundation**              | Repo audit, toolchain, Vite/Vuetify/Tailwind wiring, tokens, folder structure, docs skeleton                                                | ✅ Done |
| M1  | **Design system**           | Colour/type/spacing/shadow tokens, light + dark themes, primitive component classes, logo, icon subset                                      | ✅ Done |
| M2  | **Shared components**       | AppIcon, BrandLogo, SectionHeading, StarRating, AvatarStack, StatCounter, LevelGlyph, BillingToggle, ThemeToggle, DemoNoticeHost, BackToTop | ✅ Done |
| M3  | **Page sections**           | Header, hero, stats, grades, why, steps, teachers, plans, testimonials, FAQ, final CTA, footer                                              | ✅ Done |
| M4  | **Motion & interaction**    | Hero entrance, reveal directive, stagger, counters, carousel, accordion, drawer, theme switch                                               | ✅ Done |
| M5  | **Responsive optimisation** | 390 / 768 / 1024 / 1440 / 1920 verified; mobile drawer; tap targets                                                                         | ✅ Done |
| M6  | **Testing & QA**            | Vitest suite, lint, type-check, build, visual QA in both themes, accessibility pass                                                         | ✅ Done |
| M7  | **Delivery**                | Documentation set, README, QA report, final build                                                                                           | ✅ Done |

## Phase 1 — delivered (this repository)

Landing page only, frontend-only, static content, honest demo interactions. See `TASKS.md` for the
item-level record and `QA_REPORT.md` for verification evidence.

## Phase 2 — Product shell (next)

1. **Routing & app shell** — `vue-router` with `/`, `/grades/:grade`, `/teachers`, `/plans`, `/login`,
   `/dashboard`; persistent shell reusing `ui/` and the token layer.
2. **Authentication (mock boundary first)** — login/signup flows with real forms and validation
   (zod), then swap the mock adapter for a real API; parent/student account types.
3. **State management** — introduce Pinia for session, cart and learning progress once cross-route
   state exists.
4. **Course domain** — grade → subject → chapter → lesson hierarchy, lesson player, progress events.

## Phase 3 — Learning experience

- Video delivery (HLS/DASH) with resume points and captions.
- Exercise engine (multiple choice + step-by-step solutions) and the smart exam builder.
- Analytics dashboard (per subject/chapter mastery) with charts.
- Parent weekly report (email + in-app).
- Notifications (in-app + email/SMS provider).

## Phase 4 — Commerce & operations

- Subscription management (monthly/yearly, upgrades, cancellation windows) using `useBilling`'s model.
- Payment gateway integration (Iranian PSP), invoices, refund policy.
- Admin/content CMS (lesson authoring, review workflow, publishing).
- Observability: analytics events per section (DOM ids are already stable), error reporting, Core Web
  Vitals monitoring.

## Phase 5 — Growth & platform

- Blog/“روزنامه دیواری” content module (present in the reference product).
- Teacher public profiles and application funnel.
- Institutional/B2B offering.
- Internationalisation (fa/en) — copy is already centralised in data modules.
- PWA/offline study mode.

## Explicitly out of scope for now

Dashboards, payments, auth, and any backend are **not** implemented in this delivery; they are
architected for (typed content, composable state, honest CTA boundary) but intentionally absent.
