<script setup lang="ts">
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import type { Feature, Tone } from '@/types/content'
import { features } from '@/data/features'

/**
 * "Why Schoolino" bento grid.
 *
 * Each tile has its own footprint (hero / wide / standard / tall) so the block
 * reads as one composition instead of a row of identical cards — the exact
 * pattern the brief asks to avoid.
 */
const layout: Record<string, string> = {
  'video-lessons': 'md:col-span-7 md:row-span-2',
  'step-by-step': 'md:col-span-5',
  'smart-exams': 'md:col-span-5',
  progress: 'md:col-span-4',
  teachers: 'md:col-span-4',
  support: 'md:col-span-4',
}

const toneMap: Record<Tone, { icon: string; wash: string }> = {
  brand: { icon: 'bg-brand-soft text-brand', wash: 'from-brand/10' },
  accent: { icon: 'bg-accent-soft text-accent-strong', wash: 'from-accent/15' },
  mint: { icon: 'bg-mint-soft text-mint', wash: 'from-mint/12' },
  coral: { icon: 'bg-coral-soft text-coral', wash: 'from-coral/12' },
}

const heroFeature = features.find((feature) => feature.span === 'hero') as Feature
const otherFeatures = features.filter((feature) => feature.span !== 'hero')
</script>

<template>
  <section id="why" class="section relative overflow-hidden" aria-labelledby="why-title">
    <div class="why-wash" aria-hidden="true"></div>

    <div class="container-page relative">
      <SectionHeading
        eyebrow="چرا اسکولینو؟"
        title="یادگیری وقتی جواب می‌دهد که اجزایش کنار هم باشند"
        description="ویدیو تنها کافی نیست؛ تمرین، آزمون، بازخورد و مسیر مشخص است که یادگیری را کامل می‌کند. اسکولینو همین اجزا را در یک تجربه جمع کرده است."
        align="center"
        class="max-w-3xl"
      />

      <div class="mt-12 grid gap-4 md:grid-cols-12">
        <!-- Hero tile: the product promise with a small visual -->
        <article
          v-reveal
          class="feature-tile feature-tile--hero md:col-span-7 md:row-span-2"
          :class="layout[heroFeature.id]"
        >
          <div class="feature-tile__wash" aria-hidden="true"></div>

          <div class="relative flex h-full flex-col gap-5">
            <div class="flex items-center gap-3">
              <span class="feature-icon" :class="toneMap[heroFeature.tone].icon">
                <AppIcon :name="heroFeature.icon" :size="22" />
              </span>
              <p class="chip chip--brand">هسته اصلی یادگیری</p>
            </div>

            <div>
              <h3 class="text-h3 text-ink">{{ heroFeature.title }}</h3>
              <p class="text-body mt-2 max-w-md">{{ heroFeature.description }}</p>
            </div>

            <!-- Mini lesson strip: reinforces the idea with product detail -->
            <div class="lesson-strip mt-auto">
              <div class="lesson-strip__media">
                <span class="lesson-strip__play" aria-hidden="true">
                  <AppIcon name="play" :size="14" :stroke-width="2.4" />
                </span>
                <span class="text-[0.72rem] font-semibold text-white/90">جلسه ۲ · ۱۲:۱۵</span>
              </div>

              <div class="flex flex-1 flex-col gap-2">
                <div class="flex items-center justify-between text-[0.7rem] text-ink-soft">
                  <span>پیشرفت فصل ۳</span>
                  <span class="u-latin font-semibold text-ink">۶۵٪</span>
                </div>
                <div class="h-1.5 overflow-hidden rounded-full bg-surface-soft">
                  <span class="block h-full w-[65%] rounded-full bg-brand"></span>
                </div>
                <div class="flex flex-wrap gap-1.5">
                  <span class="chip">۹ جلسه</span>
                  <span class="chip">۴۶ تمرین</span>
                  <span class="chip">۲ آزمون</span>
                </div>
              </div>
            </div>
          </div>
        </article>

        <!-- Remaining tiles -->
        <article
          v-for="(feature, index) in otherFeatures"
          :key="feature.id"
          v-reveal="{ delay: 80 + index * 70 }"
          class="feature-tile"
          :class="layout[feature.id]"
        >
          <div class="feature-tile__wash" aria-hidden="true"></div>

          <div class="relative flex h-full flex-col gap-3">
            <span class="feature-icon" :class="toneMap[feature.tone].icon">
              <AppIcon :name="feature.icon" :size="19" />
            </span>

            <h3 class="text-[1.02rem] font-bold text-ink">{{ feature.title }}</h3>
            <p class="text-body text-[0.85rem]">{{ feature.description }}</p>

            <!-- Extra detail for the "progress" tile so the column feels intentional -->
            <div
              v-if="feature.id === 'progress'"
              class="mt-auto flex items-end gap-1.5 pt-3"
              aria-hidden="true"
            >
              <span
                v-for="(bar, i) in [34, 52, 41, 68, 79, 92]"
                :key="i"
                class="flex-1 rounded-md bg-brand/25"
                :style="{ height: `${bar * 0.5}px` }"
              ></span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.why-wash {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(
      ellipse 60% 50% at 50% 0%,
      color-mix(in srgb, var(--c-brand) 8%, transparent),
      transparent 70%
    ),
    linear-gradient(180deg, var(--c-bg-deep), color-mix(in srgb, var(--c-bg-deep) 60%, var(--c-bg)));
}

.feature-tile {
  position: relative;
  overflow: hidden;
  padding: 1.35rem;
  border-radius: var(--r-xl);
  border: 1px solid var(--c-border);
  background: var(--c-surface);
  transition:
    transform var(--dur-base) var(--ease-out-soft),
    box-shadow var(--dur-base) var(--ease-out-soft),
    border-color var(--dur-base) var(--ease-out-soft);
}

.feature-tile:hover {
  transform: translateY(-4px);
  border-color: var(--c-border-strong);
  box-shadow: var(--shadow-md);
}

.feature-tile--hero {
  padding: clamp(1.35rem, 1rem + 1vw, 1.9rem);
  background: linear-gradient(
    165deg,
    color-mix(in srgb, var(--c-brand) 6%, var(--c-surface)),
    var(--c-surface) 55%
  );
}

.feature-tile__wash {
  position: absolute;
  inset-block-start: -3rem;
  inset-inline-end: -3rem;
  width: 9rem;
  height: 9rem;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    color-mix(in srgb, var(--c-accent) 16%, transparent),
    transparent 70%
  );
  pointer-events: none;
}

.feature-icon {
  display: inline-grid;
  place-items: center;
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 0.85rem;
  flex-shrink: 0;
}

.lesson-strip {
  display: flex;
  gap: 0.9rem;
  padding: 0.75rem;
  border-radius: var(--r-lg);
  border: 1px solid var(--c-border);
  background: color-mix(in srgb, var(--c-surface) 70%, transparent);
}

.lesson-strip__media {
  position: relative;
  display: flex;
  align-items: flex-end;
  width: 6.5rem;
  min-height: 5.25rem;
  flex-shrink: 0;
  padding: 0.5rem;
  border-radius: var(--r-md);
  background: radial-gradient(circle at 70% 20%, rgb(87 65 214 / 0.7), transparent 60%), #17163a;
}

.lesson-strip__play {
  position: absolute;
  inset-block-start: 50%;
  inset-inline-start: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: rgb(255 255 255 / 0.92);
  color: #17163a;
}

@media (max-width: 767px) {
  .feature-tile {
    padding: 1.15rem;
  }
}
</style>
