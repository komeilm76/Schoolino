<script setup lang="ts">
import { computed, toRef } from 'vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import StarRating from '@/components/ui/StarRating.vue'
import type { Tone } from '@/types/content'
import { testimonials } from '@/data/testimonials'
import { useCarousel } from '@/composables/useCarousel'

/**
 * Testimonials carousel.
 *
 * Accessibility contract:
 * - autoplay is off for reduced-motion users, hidden tabs and while the user is
 *   interacting (pointer or focus inside the carousel);
 * - previous/next buttons and keyboard arrows expose every slide;
 * - the live region announces the current position;
 * - tabs (avatar buttons) let you jump directly to a person.
 */
const { index, total, isAutoplaying, goTo, next, previous, pauseOnInteract, resumeOnInteract } =
  useCarousel(toRef(testimonials, 'length'), { interval: 8000 })

const current = computed(() => testimonials[index.value] ?? testimonials[0]!)

const toneBg: Record<Tone, string> = {
  brand: 'bg-brand-soft text-brand-ink',
  accent: 'bg-accent-soft text-accent-ink',
  mint: 'bg-mint-soft text-mint',
  coral: 'bg-coral-soft text-coral',
}

function onKeydown(event: KeyboardEvent): void {
  // RTL: ArrowLeft moves forward through the list visually.
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    next()
  } else if (event.key === 'ArrowRight') {
    event.preventDefault()
    previous()
  }
}
</script>

<template>
  <section
    id="testimonials"
    class="section band relative overflow-hidden"
    aria-labelledby="testimonials-title"
  >
    <div class="testimonial-glow" aria-hidden="true"></div>

    <div class="container-page relative">
      <div class="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <SectionHeading
          eyebrow="تجربه دانش‌آموزان"
          title="روایت‌هایی از مسیر یادگیری"
          description="این روایت‌ها نمونه و برای نمایش طراحی شده‌اند؛ نه نظر واقعی کاربران."
          inverted
          class="max-w-lg"
        />

        <div class="flex items-center gap-2">
          <button type="button" class="carousel-btn" aria-label="روایت قبلی" @click="previous">
            <AppIcon name="chevron-right" :size="18" />
          </button>
          <button type="button" class="carousel-btn" aria-label="روایت بعدی" @click="next">
            <AppIcon name="chevron-left" :size="18" />
          </button>
        </div>
      </div>

      <div
        v-reveal
        class="mt-10 grid gap-6 lg:grid-cols-[1.55fr_1fr]"
        @mouseenter="pauseOnInteract"
        @mouseleave="resumeOnInteract"
        @focusin="pauseOnInteract"
        @focusout="resumeOnInteract"
        @keydown="onKeydown"
      >
        <!-- Active quote -->
        <figure class="quote-card" tabindex="0" :aria-label="`روایت ${current.name}`">
          <div class="flex items-center justify-between gap-3">
            <StarRating :value="current.rating" :size="15" />
            <span class="quote-card__mark u-latin" aria-hidden="true">”</span>
          </div>

          <blockquote class="mt-4 text-[1.02rem] leading-9 text-on-band sm:text-[1.12rem]">
            {{ current.quote }}
          </blockquote>

          <figcaption class="mt-auto flex items-center gap-3 pt-6">
            <span class="quote-avatar" :class="toneBg[current.tone]" aria-hidden="true">
              {{ current.initials }}
            </span>
            <span>
              <span class="block text-[0.9rem] font-bold text-on-band">{{ current.name }}</span>
              <span class="block text-[0.76rem] text-on-band-soft">{{ current.role }}</span>
            </span>
          </figcaption>
        </figure>

        <!-- Person selector -->
        <div>
          <ul class="grid gap-2" aria-label="انتخاب روایت">
            <li v-for="(item, itemIndex) in testimonials" :key="item.id">
              <button
                type="button"
                class="person-btn"
                :class="{ 'person-btn--active': itemIndex === index }"
                :aria-pressed="itemIndex === index"
                @click="goTo(itemIndex)"
              >
                <span class="person-btn__avatar" :class="toneBg[item.tone]" aria-hidden="true">
                  {{ item.initials }}
                </span>
                <span class="min-w-0 flex-1 text-start">
                  <span class="block truncate text-[0.84rem] font-semibold text-on-band">
                    {{ item.name }}
                  </span>
                  <span class="block truncate text-[0.7rem] text-on-band-soft">{{
                    item.role
                  }}</span>
                </span>
                <AppIcon v-if="itemIndex === index" name="play" :size="13" class="text-accent" />
              </button>
            </li>
          </ul>

          <div class="mt-3 flex items-center justify-between px-1">
            <p class="text-[0.7rem] text-on-band-soft">
              {{ index + 1 }} از {{ total }}
              <span v-if="isAutoplaying"> · پخش خودکار</span>
            </p>
            <span class="text-[0.7rem] text-on-band-soft/70">
              با کلیدهای جهت‌دار جابه‌جا شوید
            </span>
          </div>

          <p class="sr-only" aria-live="polite">
            روایت {{ index + 1 }} از {{ total }}: {{ current.name }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonial-glow {
  position: absolute;
  inset-block-end: -10rem;
  inset-inline-start: 10%;
  width: 30rem;
  height: 26rem;
  border-radius: 50%;
  background: radial-gradient(circle, rgb(244 166 42 / 0.18), transparent 68%);
  filter: blur(24px);
}

.quote-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 19rem;
  padding: clamp(1.4rem, 1rem + 1.4vw, 2.2rem);
  border-radius: var(--r-2xl);
  border: 1px solid rgb(255 255 255 / 0.1);
  background: linear-gradient(160deg, rgb(255 255 255 / 0.07), rgb(255 255 255 / 0.02));
  backdrop-filter: blur(8px);
}

.quote-card:focus-visible {
  outline: 3px solid var(--c-accent);
  outline-offset: 4px;
}

.quote-card__mark {
  font-size: 2.6rem;
  line-height: 0.6;
  color: var(--c-accent);
  opacity: 0.55;
}

.quote-avatar {
  display: grid;
  place-items: center;
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 50%;
  font-size: 0.72rem;
  font-weight: 700;
}

.carousel-btn {
  display: grid;
  place-items: center;
  width: 2.7rem;
  height: 2.7rem;
  border-radius: 50%;
  border: 1px solid rgb(255 255 255 / 0.16);
  color: var(--c-on-band);
  transition:
    background-color var(--dur-fast) var(--ease-out-soft),
    transform var(--dur-fast) var(--ease-out-soft);
}

.carousel-btn:hover {
  background: rgb(255 255 255 / 0.1);
  transform: translateY(-2px);
}

.person-btn {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  width: 100%;
  min-height: 3rem;
  padding: 0.5rem 0.7rem;
  border-radius: var(--r-md);
  border: 1px solid transparent;
  transition:
    background-color var(--dur-fast) var(--ease-out-soft),
    border-color var(--dur-fast) var(--ease-out-soft);
}

.person-btn:hover {
  background: rgb(255 255 255 / 0.06);
}

.person-btn--active {
  background: rgb(255 255 255 / 0.09);
  border-color: rgb(255 255 255 / 0.16);
}

.person-btn__avatar {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  font-size: 0.62rem;
  font-weight: 700;
  flex-shrink: 0;
}
</style>
