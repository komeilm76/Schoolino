# Animation Guidelines — Schoolino

Motion exists to explain hierarchy and state. It never carries meaning that disappears when motion is
reduced.

## 1. Motion tokens

| Token                | Value                         | Used for                                       |
| -------------------- | ----------------------------- | ---------------------------------------------- |
| `--dur-fast`         | 140ms                         | Hover/press feedback, colour changes           |
| `--dur-base`         | 240ms                         | Toggles, chips, border/shadow transitions      |
| `--dur-slow`         | 420ms                         | Card transforms, progress bars, filter changes |
| `--dur-reveal`       | 620ms                         | Scroll reveals, larger section transitions     |
| `--ease-out-soft`    | `cubic-bezier(.22,.61,.36,1)` | Default entrance/exit — decelerating, calm     |
| `--ease-in-out-soft` | `cubic-bezier(.4,0,.2,1)`     | Looping decorative motion                      |
| `--ease-spring`      | `cubic-bezier(.34,1.4,.64,1)` | Small state flips (theme thumb, notice in)     |

Rule of thumb: **feedback ≤ 260ms, transitions 300–450ms, entrances 500–650ms**. Nothing exceeds
650ms except a one-off underline draw (1s) that is decorative only.

## 2. Motion hierarchy

1. **Level 0 — page load:** hero copy (badge → headline → paragraph → CTAs → social proof) staggered
   60–420ms, plus the hero underline drawing in at 750ms. Only the hero animates on load.
2. **Level 1 — scroll reveal:** sections fade/rise 22px with a stagger of ≤ 240ms. One reveal per
   element, never replayed.
3. **Level 2 — interactive feedback:** hover lift ≤ 6px, colour transitions, icon nudges, chip state.
4. **Level 3 — ambient decoration:** slow (18s) blob drift, floating chips (7s), pulsing live dot.
   Ambient motion is always subtle, never in the reading path, and disabled under reduced motion.

## 3. Implementations

| Effect               | Where                                     | Technique                                                                             |
| -------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------- |
| Hero entrance        | `HeroSection.vue`                         | `@vueuse/motion` `v-motion` with explicit durations/delays                            |
| Underline draw       | `HeroSection.vue`                         | SVG `stroke-dashoffset` keyframes                                                     |
| Scroll reveals       | `plugins/reveal.ts` (`v-reveal`)          | IntersectionObserver toggles one class; CSS transition does the work                  |
| Staggered grids      | sections                                  | `v-reveal="{ delay: index * 70 }"`, capped at 240ms                                   |
| Animated counters    | `StatCounter.vue` + `useCountUp`          | rAF with cubic ease-out, started by IntersectionObserver, final frame snaps to target |
| Billing price change | `PlansSection.vue`                        | Reactive re-render + colour/opacity transitions (no layout animation)                 |
| Accordion            | `FaqSection.vue`                          | Vuetify expansion transition (height), content readable without animation             |
| Carousel             | `TestimonialsSection.vue` + `useCarousel` | Content swap with stable min-height; autoplay paused on focus/hover/hidden/motion     |
| Drawer               | `SiteHeader.vue`                          | Vuetify drawer transition + scrim                                                     |
| Theme switch         | `ThemeToggle.vue`, tokens                 | Colour transitions on `var()` values                                                  |
| Back to top          | `BackToTop.vue`                           | Vue `<Transition>` fade+rise                                                          |
| Notice               | `DemoNoticeHost.vue`                      | Spring keyframe entrance                                                              |

## 4. Rules

1. Animate **transform, opacity and filter only** (compositor-friendly). No width/height/top/left.
2. Never animate more than 1–2 focal elements per view; decorative loops must be ignorable.
3. Stagger lists with a maximum of 8 animated children and ≤ 240ms total extra delay.
4. Reserve space for content that appears later (the quote card has a `min-height`) to prevent CLS.
5. No scroll-jacking, no pinning, no horizontal scroll hijack; native scrolling is never replaced.
6. Interaction must never wait for animation: state changes are applied immediately, transitions are
   decoration.
7. `will-change` is applied only to elements that actually animate (`reveal`), never globally.

## 5. Reduced motion

`prefers-reduced-motion: reduce` triggers three layers of protection:

1. **CSS:** a global media query collapses animation/transition durations to 0.01ms and forces reveal
   elements to their final state.
2. **Directive:** `v-reveal` shows content immediately and never observes.
3. **Composables:** `useCountUp` jumps to the target; `useCarousel` never autoplays; `scrollToSection`
   and back-to-top use `behavior: 'auto'`.

The page remains fully understandable and complete in this mode — nothing is hidden behind motion.

## 6. Performance notes

- All reveals share one IntersectionObserver per element with `rootMargin` tuned for early triggering.
- Observers are disconnected on unmount (`plugins/reveal.ts`, `useScrollSpy`), timers are cleared on
  scope disposal (`useCountUp`, `useCarousel`, `useDemoNotice`).
- No animation library beyond `@vueuse/motion` (≈3 KB gzip) is shipped; GSAP and Lenis were evaluated
  and deliberately excluded (see `DECISIONS.md` D-04).

## 7. Testing motion

Manual checklist: scroll the page slowly (reveals fire once), fast-scroll to the bottom (no missing
content), toggle reduced motion in devtools and repeat, hover cards on touch emulation (no stuck
states), open the FAQ repeatedly (no jump), switch pricing periods (no layout shift), leave the
testimonials visible for 20s (autoplay pauses while hovering and resumes on leave).
