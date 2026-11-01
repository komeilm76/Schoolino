# Avin — design & quality notes

## Architecture

```
assets/css/foundation.css   font, tokens, reset, header, nav, buttons, footer, a11y
assets/css/home.css         homepage only: hero, orbit links, ecosystem cards
assets/css/service-pages.css inner pages: breadcrumb, service hero, points, related, contact shell
assets/css/contact-form.css the contact form and all of its states
assets/js/site-navigation.js mobile menu + whole-card clicking
assets/js/contact-form.js    validation, counter, copy-to-clipboard
```

Every page loads `foundation.css` first, then exactly one page stylesheet
(plus `contact-form.css` on the contact page). No selector is defined twice.

## Typography

Vazirmatn is self-hosted as a single variable WOFF2 (`assets/fonts/`, 111 KB,
weights 100–900) under the SIL Open Font License — see `assets/fonts/OFL.txt`.
There are **zero third-party requests**: no Google Fonts, no CDN.
The font is preloaded, so text renders in the correct face on first paint.

## Images

Every raster illustration ships as WebP with a PNG fallback via `<picture>`;
CSS backgrounds use `image-set()`. All `<img>` elements carry `width`, `height`,
`alt` and `decoding`; below-the-fold art is `loading="lazy"`, the hero and logo
are `fetchpriority="high"`.

| | PNG | WebP |
|---|---|---|
| Total | 4.03 MB | 0.68 MB (−83%) |

`neon-data-wave-transparent.png` stays PNG-only — WebP encoded 10% larger.
The career/media illustrations were de-spilled after chroma keying; both now
have zero green-fringe pixels.

Icons are generated from the logo mark: favicon 16/32/48 + `.ico`, an opaque
180px apple-touch-icon, and 192/512 in both `any` and `maskable` flavours.

## Contact form

The site has **no backend**, so the form never claims to send anything. It
validates inline, then produces a clean copyable message. The notice above the
submit button and the success status both say so explicitly.

States covered: rest, hover, focus, filled, invalid, busy, ready, copied,
copy-failed. Validation runs on blur, then live after the first submit attempt;
focus moves to the first invalid field and the error count is announced through
a `role="status"` live region.

To connect a real endpoint, replace the `setTimeout` in the submit handler of
`assets/js/contact-form.js` with a `fetch()` and keep the honest error branch.

## Accessibility

Audited with axe-core (WCAG 2.0/2.1 A + AA + best-practice) on all 10 pages at
375, 768 and 1440 px: **0 violations**.

Touch targets are measured by hit-testing, not just box size: the slogan pill
and the hero orbit labels extend an invisible `::after` to 44px so the drawn
design stays pixel-identical. Breadcrumb links get a 44px box with negative
inline margin so the visual rhythm is unchanged.

Also: skip link, `inert` mobile menu with Escape + focus return, visible focus
rings everywhere, `prefers-reduced-motion`, `prefers-contrast: more`, and
`font-size: 16px` on mobile inputs to prevent iOS zoom-on-focus.

## Metadata

Canonical, Open Graph, Twitter card, favicon set and web manifest on every page,
plus `robots.txt` and `sitemap.xml`. Share card: `assets/brand/og-cover.jpg`
(1200×630).

> Before deploying to a different domain, update the absolute URLs in
> `sitemap.xml`, `robots.txt` and the canonical/OG tags.

## Verification

| Suite | Result |
|---|---|
| axe-core, 10 pages × 3 widths | 0 violations |
| Effective touch targets, same matrix | 0 below 44px |
| Form behaviour, mobile menu, hero geometry (23 widths) | 505 passed |
| Internal links, metadata, card clicks, static assets | 210 passed |
| Console / network errors across 30 page loads | 0 |
| Third-party requests | 0 |
