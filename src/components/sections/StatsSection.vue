<script setup lang="ts">
import StatCounter from '@/components/ui/StatCounter.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { stats } from '@/data/stats'

/**
 * Trust band with viewport-triggered counters.
 *
 * The figures are demo content and are labelled as such, so the page never
 * implies real business claims.
 */
</script>

<template>
  <section
    id="impact"
    class="section--tight band relative overflow-hidden"
    aria-labelledby="impact-title"
  >
    <div class="stats-glow" aria-hidden="true"></div>
    <div class="stats-rings" aria-hidden="true"></div>

    <div class="container-page relative">
      <div class="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
        <div class="max-w-sm">
          <p class="eyebrow">اسکولینو در یک نگاه</p>
          <h2
            id="impact-title"
            class="mt-3 text-[1.55rem] font-bold leading-[1.5] text-on-band sm:text-[1.8rem]"
          >
            یک مسیر کامل برای یادگیری، بدون پراکندگی
          </h2>
          <p class="mt-2 text-[0.86rem] leading-7 text-on-band-soft">
            آمار زیر نمونه‌ای برای نمایش این دمو است، نه ادعای رسمی کسب‌وکار.
          </p>
        </div>

        <div class="stats-grid flex-1">
          <StatCounter
            v-for="stat in stats"
            :key="stat.id"
            :label="stat.label"
            :value="stat.value"
            :suffix="stat.suffix"
            :icon="stat.icon"
          />
        </div>
      </div>

      <div class="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6">
        <p class="flex items-center gap-2 text-[0.8rem] text-on-band-soft">
          <AppIcon name="shield-check" :size="16" class="text-accent" />
          محتوای آموزشی بازبینی‌شده
        </p>
        <p class="flex items-center gap-2 text-[0.8rem] text-on-band-soft">
          <AppIcon name="refresh-cw" :size="16" class="text-accent" />
          لغو یا تغییر پلن در هر زمان
        </p>
        <p class="flex items-center gap-2 text-[0.8rem] text-on-band-soft">
          <AppIcon name="message-circle" :size="16" class="text-accent" />
          پشتیبانی تحصیلی در روزهای کاری
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats-glow {
  position: absolute;
  inset-block-start: -6rem;
  inset-inline-start: 20%;
  width: 32rem;
  height: 22rem;
  border-radius: 50%;
  background: radial-gradient(circle, rgb(87 65 214 / 0.6), transparent 68%);
  filter: blur(30px);
}

.stats-rings {
  position: absolute;
  inset-inline-end: -4rem;
  inset-block-end: -6rem;
  width: 22rem;
  height: 22rem;
  border-radius: 50%;
  border: 1px solid rgb(255 255 255 / 0.08);
  box-shadow:
    inset 0 0 0 3.5rem rgb(255 255 255 / 0.02),
    inset 0 0 0 7rem rgb(255 255 255 / 0.02);
  pointer-events: none;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.75rem 1rem;
}

@media (min-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
