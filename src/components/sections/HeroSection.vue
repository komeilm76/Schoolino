<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import AvatarStack from '@/components/ui/AvatarStack.vue'
import StarRating from '@/components/ui/StarRating.vue'
import { testimonials } from '@/data/testimonials'
import { useDemoNotice } from '@/composables/useDemoNotice'
import { useEntranceMotion } from '@/composables/useEntrance'
import { scrollToSection } from '@/utils/scroll'
import HeroLessonCard from './hero/HeroLessonCard.vue'

/**
 * Hero: the page's first impression.
 *
 * Composition is deliberately asymmetric: a text column on the reading edge
 * and a "live lesson" product mock on the other side. The mock is built from
 * real DOM (not a screenshot) so it stays sharp at every DPI, adapts to the
 * theme and costs almost nothing to download.
 */
const { openNotice } = useDemoNotice()

// Entrance variants (all collapse to their final state under reduced motion).
const badgeMotion = useEntranceMotion({ delay: 60, offset: 18, duration: 520 })
const titleMotion = useEntranceMotion({ delay: 140, offset: 26, duration: 620 })
const leadMotion = useEntranceMotion({ delay: 240, offset: 22, duration: 620 })
const ctaMotion = useEntranceMotion({ delay: 320, offset: 22, duration: 620 })
const proofMotion = useEntranceMotion({ delay: 420, offset: 18, duration: 560 })
const visualMotion = useEntranceMotion({
  delay: 260,
  offset: 34,
  duration: 760,
  from: { scale: 0.97 },
  to: { scale: 1 },
})

const avatars = computed(() => testimonials.slice(0, 4))

/** Subject chips floating around the product mock. */
const floatingChips = [
  { id: 'free', label: '۳ ویدیوی رایگان از هر درس', icon: 'play', position: 'top' },
  { id: 'report', label: 'کارنامه تحلیلی آماده است', icon: 'badge-check', position: 'bottom' },
] as const
</script>

<template>
  <section id="hero" class="hero" aria-labelledby="hero-title">
    <!-- Decorative background layers -->
    <div class="hero__glow" aria-hidden="true"></div>
    <div class="hero__grid bg-grid" aria-hidden="true"></div>
    <div class="hero__blob hero__blob--one" aria-hidden="true"></div>
    <div class="hero__blob hero__blob--two" aria-hidden="true"></div>

    <div class="container-page relative">
      <div class="hero__layout">
        <!-- Copy column -->
        <div class="hero__copy">
          <p v-motion="badgeMotion" class="hero__badge">
            <span class="hero__badge-dot" aria-hidden="true"></span>
            <span class="text-[0.8rem] font-semibold text-ink-soft">
              از پایه اول تا دوازدهم، در یک مسیر روشن
            </span>
          </p>

          <h1 id="hero-title" v-motion="titleMotion" class="text-display mt-6 !leading-[1.25]">
            هر درس،
            <span class="hero__highlight">
              یک قدم روشن‌تر
              <svg
                class="hero__underline"
                viewBox="0 0 320 18"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M3 13C60 5 132 3 317 8" />
              </svg>
            </span>
            به مقصد نزدیک‌تر.
          </h1>

          <p v-motion="leadMotion" class="text-lead mt-6 max-w-xl">
            ویدیوهای درس‌به‌درس، حل تمرین گام‌به‌گام و آزمون‌ساز هوشمند، کنار هم چیده شده‌اند تا درس
            را <span class="font-semibold text-ink">واقعاً بفهمی</span> — نه فقط حفظ کنی.
          </p>

          <div v-motion="ctaMotion" class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button type="button" class="btn btn--primary btn--lg" @click="openNotice()">
              شروع یادگیری
              <AppIcon name="arrow-left" :size="18" />
            </button>

            <button
              type="button"
              class="btn btn--outline btn--lg"
              @click="scrollToSection('grades', { focus: true })"
            >
              <AppIcon name="layers" :size="18" />
              پایه‌ات را انتخاب کن
            </button>
          </div>

          <div v-motion="proofMotion" class="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div class="flex items-center gap-2.5">
              <AvatarStack :people="avatars" />
              <div class="leading-tight">
                <p class="text-[0.82rem] font-semibold text-ink">+۱۲٬۴۰۰ دانش‌آموز</p>
                <p class="text-[0.72rem] text-ink-faint">در حال یادگیری با اسکولینو</p>
              </div>
            </div>

            <span class="hidden h-8 w-px bg-line sm:block" aria-hidden="true"></span>

            <div class="flex items-center gap-2">
              <StarRating :value="4.8" />
              <span class="text-[0.76rem] text-ink-faint">رضایت نمونه دانش‌آموزان</span>
            </div>
          </div>
        </div>

        <!-- Product mock column -->
        <div v-motion="visualMotion" class="hero__visual">
          <HeroLessonCard />

          <div
            v-for="chip in floatingChips"
            :key="chip.id"
            class="floating-chip"
            :class="`floating-chip--${chip.position}`"
          >
            <span class="floating-chip__icon" aria-hidden="true">
              <AppIcon :name="chip.icon" :size="15" />
            </span>
            <span class="text-[0.74rem] font-semibold text-ink">{{ chip.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding-block-start: clamp(2.5rem, 1rem + 5vw, 5.5rem);
  padding-block-end: clamp(3.5rem, 2rem + 5vw, 7rem);
}

.hero__glow {
  position: absolute;
  inset-block-start: -18rem;
  inset-inline-start: 50%;
  transform: translateX(50%);
  width: min(70rem, 120vw);
  height: 46rem;
  border-radius: 50%;
  background:
    radial-gradient(
      circle at 30% 40%,
      color-mix(in srgb, var(--c-brand) 22%, transparent),
      transparent 62%
    ),
    radial-gradient(
      circle at 70% 55%,
      color-mix(in srgb, var(--c-accent) 20%, transparent),
      transparent 60%
    );
  filter: blur(20px);
  opacity: 0.75;
  z-index: -2;
}

.hero__grid {
  position: absolute;
  inset: 0;
  z-index: -2;
  opacity: 0.55;
  mask-image: radial-gradient(ellipse 65% 55% at 50% 32%, #000 30%, transparent 78%);
  -webkit-mask-image: radial-gradient(ellipse 65% 55% at 50% 32%, #000 30%, transparent 78%);
}

.hero__blob {
  position: absolute;
  border-radius: 46% 54% 62% 38% / 55% 42% 58% 45%;
  z-index: -1;
  filter: blur(2px);
  opacity: 0.8;
  animation: blob-float 18s var(--ease-in-out-soft) infinite alternate;
}

.hero__blob--one {
  width: 15rem;
  height: 15rem;
  inset-inline-end: -5rem;
  inset-block-start: 6rem;
  background: linear-gradient(160deg, var(--c-brand-100), transparent 70%);
}

.hero__blob--two {
  width: 11rem;
  height: 11rem;
  inset-inline-start: -4rem;
  inset-block-end: 2rem;
  background: linear-gradient(160deg, var(--c-accent-soft), transparent 72%);
  animation-delay: -6s;
}

@keyframes blob-float {
  from {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
  to {
    transform: translate3d(0, -26px, 0) rotate(9deg);
  }
}

.hero__layout {
  display: grid;
  gap: clamp(2.5rem, 1rem + 5vw, 4.5rem);
  align-items: center;
}

@media (min-width: 1024px) {
  .hero__layout {
    grid-template-columns: minmax(0, 1.02fr) minmax(0, 0.98fr);
  }
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.4rem 0.85rem 0.4rem 0.55rem;
  border-radius: var(--r-pill);
  border: 1px solid var(--c-border);
  background: color-mix(in srgb, var(--c-surface) 78%, transparent);
  box-shadow: var(--shadow-xs);
  backdrop-filter: blur(8px);
}

.hero__badge-dot {
  position: relative;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--c-mint);
}

.hero__badge-dot::after {
  content: '';
  position: absolute;
  inset: -0.28rem;
  border-radius: 50%;
  border: 1px solid var(--c-mint);
  opacity: 0.45;
  animation: badge-pulse 2.6s var(--ease-out-soft) infinite;
}

@keyframes badge-pulse {
  0% {
    transform: scale(0.7);
    opacity: 0.5;
  }
  70% {
    transform: scale(1.5);
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

.hero__highlight {
  position: relative;
  display: inline-block;
  color: var(--c-brand);
  white-space: nowrap;
}

.hero__underline {
  position: absolute;
  inset-inline: -0.15em;
  inset-block-end: -0.18em;
  width: calc(100% + 0.3em);
  height: 0.42em;
  fill: none;
  stroke: var(--c-accent);
  stroke-width: 5;
  stroke-linecap: round;
  opacity: 0.9;
  stroke-dasharray: 340;
  stroke-dashoffset: 340;
  animation: draw-underline 1s var(--ease-out-soft) 0.75s forwards;
}

@keyframes draw-underline {
  to {
    stroke-dashoffset: 0;
  }
}

.hero__visual {
  position: relative;
}

.floating-chip {
  position: absolute;
  display: none;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.8rem;
  border-radius: var(--r-md);
  border: 1px solid var(--c-border);
  background: color-mix(in srgb, var(--c-surface) 92%, transparent);
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(10px);
  animation: chip-float 7s var(--ease-in-out-soft) infinite alternate;
}

.floating-chip__icon {
  display: grid;
  place-items: center;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 0.5rem;
  background: var(--c-brand-soft);
  color: var(--c-brand);
}

.floating-chip--top {
  inset-inline-end: 1rem;
  inset-block-start: -1.4rem;
}

.floating-chip--bottom {
  inset-inline-start: 1.25rem;
  inset-block-end: -3.4rem;
  animation-delay: -3.2s;
}

.floating-chip--bottom .floating-chip__icon {
  background: var(--c-mint-soft);
  color: var(--c-mint);
}

@keyframes chip-float {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(0, -12px, 0);
  }
}

@media (min-width: 1280px) {
  .floating-chip {
    display: inline-flex;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__blob,
  .floating-chip,
  .hero__badge-dot::after {
    animation: none;
  }

  .hero__underline {
    animation: none;
    stroke-dashoffset: 0;
  }
}
</style>
