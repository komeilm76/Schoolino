# Animation guidelines

- Preserve approved hero/artwork/callout positions at first paint and at rest.
- @vueuse/motion is registered globally and used only for the form confirmation's opacity entrance: 160ms, no positional transform.
- VueUse usePreferredReducedMotion supplies an immediate opacity=1 variant when reduced motion is requested.
- Existing CSS hover changes remain subtle (roughly 200ms); the reduced-motion stylesheet disables them.
- Router anchor scrolling is native smooth scrolling, or instant under reduced motion. Dialog route changes preserve background scroll.
- Procedural mesh/star geometry is computed once; no requestAnimationFrame or persistent scroll loop.
- GSAP and Lenis are intentionally absent: neither is justified by this approved static composition.

Future animation changes require screenshot and label-geometry regression checks. Do not apply v-motion transforms to ecosystem-stage: its CSS transform is part of coordinate alignment.
