# SPA architecture

App.vue renders RouterView and reactive route titles. LandingPage owns the persistent main landmark, skip link, SiteHeader, HeroSection and ServicesSection. A nested RouterView lazy-loads PanelPage for all eight existing panel destinations. NotFoundPage is separately lazy-loaded.

Header/hero/card actions use useNavigation; Vue Router is the source of truth for the currently visible panel. No parallel global dialog store or Pinia is needed. ContactForm owns isolated useContactForm state; a route change remounts it, preventing accidental sharing between contact/cooperation. Validation is a pure function that can later be reused by an API adapter. There is no request or persistence today.

Content (services, typed panel names, titles and orbit labels) lives in data/content.ts. ServiceCard has typed props/emits. SVG logo/icons remain dedicated UI components. HeroBackdrop delegates deterministic geometry to utils/backdrop.ts. The theme factory lives in plugins/vuetify.ts and is reusable in component tests.

Browser history is used in production; tests inject memory history. Vuetify close-on-back is disabled because Vue Router owns history. Dialog dismissal restores focus when the opener still exists. Unknown paths have an explicit 404 rather than rendering a blank view.

Deployment needs an SPA fallback. Build chunks for panels/404 are lazy; existing local fonts/WebP images remain optimized. Vue DevTools is enabled only in inspect mode, not production or the normal visual preview.
