> Historical implementation notes from the visual build. For the current modular SPA structure, tooling and validation, see ARCHITECTURE.md, TECH_STACK.md and QA_REPORT.md.

# Implementation notes — rebuilt component version

## Visual direction

The supplied PNG remains a design reference only. The earlier image-backed implementation has been replaced. There are no source screenshot assets, CSS crops, image-map hotspots or hidden copies of the reference in this implementation.

## Components

- RTL semantic header and real navigation links/buttons.
- SVG brand reconstruction and six SVG interface icons.
- Real hero h1, supporting paragraph and CTA buttons.
- Standalone generated ecosystem illustration with independently positioned interactive HTML labels.
- Procedural DOM stars and SVG wave paths.
- Three data-driven semantic service articles with independent generated illustrations.
- Vuetify dialogs with editable content and validated form controls.

## Assets

Four assets were individually generated: ecosystem, education, artificial intelligence, and IT. They were optimized to WebP. The reference image was supplied to the ecosystem generator for composition guidance only; it is not used as a runtime asset. Other assets were generated from descriptions. Generated art is approximate rather than the original source artwork.

## Responsive rules

At wide widths: 74px navigation, two-column hero, three-column service grid. At intermediate widths: reduced type and spacing. At 800px and below: expandable navigation, stacked hero and full-width service articles. No duplicate desktop/mobile content trees. Artwork scales independently from text; labels are positioned relative to the hero illustration.

## Design system

Navy #001329, surface #061e3e, cyan #00dce5, borders #173d85, white/lavender text. Local Vazirmatn 400/700. Rounded outlined cards and pill buttons. Hover states use subtle translation/glow. Reduced-motion disables transitions and smooth scrolling.

## Verification

Production typecheck/build, 2 unit tests, browser interaction checks, responsive overflow checks at four widths, and zero-vulnerability dependency audit. Browser checks confirm the original screenshot is never requested and there are no uncaught page errors.

## Future scope

Production contact endpoint, original brand vector assets if provided, and optional localized content management. No backend or original font identity is implied.

## Label alignment refinement

All five orbit callouts now share an intrinsic 1200 × 896 artwork stage. CSS container units size this stage proportionally inside the hero area, so labels no longer drift with the outer layout or object-fit letterboxing. Explicit image-relative anchors attach each label to its orb. Career copy has a controlled two-line break. Narrow-desktop and small-phone sizing keeps callouts on screen without collision. Superseded label-position overrides were removed and the stylesheet was expanded for maintenance.

Browser regression checks now cover 320, 360, 390, 768, 800, 801, 1024, 1100, 1440, 1568 and 1920px. They verify normalized vertical anchoring, callout viewport bounds, pairwise label collisions, and page overflow, alongside existing service, form and mobile-navigation checks. All checks pass.

## Ecosystem background refinement

Replaced the sparse wave strokes with an independent full-width SVG environment inspired by the second supplied reference: 35 connected wave rows, 100 transverse mesh curves, 44 deterministic particles and a subdued two-layer mountain horizon. Geometry is computed once at setup; no animation frame loop, large new raster asset or network request is introduced. The illustration now feathers on all four edges instead of exposing a rectangular background. The backdrop does not share the illustration mask, so the full-width waves remain visible around the ecosystem at every layout size. Existing orb anchors are unchanged.

Verified production build, four unit tests (including stable backdrop geometry), browser interactions and responsive label checks across eleven widths. Desktop and mobile screenshots reviewed.
