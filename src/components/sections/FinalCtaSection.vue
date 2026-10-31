<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'
import { useDemoNotice } from '@/composables/useDemoNotice'
import { scrollToSection } from '@/utils/scroll'

/**
 * Closing conversion block.
 *
 * Deliberately unlike the rest of the page: a dark, full-bleed panel with a
 * large single statement, an asymmetric decorative graphic and two clear
 * actions. No form is shown because there is no backend to receive it.
 */
const { openNotice } = useDemoNotice()

const perks = [
  '۳ ویدیوی رایگان از هر درس',
  'دسترسی در هر ساعت از شبانه‌روز',
  'بدون نیاز به نصب اپلیکیشن',
]
</script>

<template>
  <section class="section" aria-labelledby="final-cta-title">
    <div class="container-page">
      <div v-reveal class="cta-panel">
        <div class="cta-panel__rings" aria-hidden="true"></div>
        <div class="cta-panel__glow" aria-hidden="true"></div>

        <div class="relative grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-center">
          <div>
            <p class="eyebrow">شروع مسیر</p>

            <h2
              id="final-cta-title"
              class="mt-4 text-[clamp(1.8rem,1.3rem+2.2vw,2.9rem)] font-extrabold leading-[1.32] text-on-band"
            >
              امروز یک درس را بفهم،
              <span class="text-accent">فردا یک قدم جلوتر باش.</span>
            </h2>

            <p class="mt-4 max-w-lg text-[0.95rem] leading-8 text-on-band-soft">
              لازم نیست همه‌چیز را از اول شروع کنی. پایه‌ات را انتخاب کن و از همان جایی ادامه بده که
              حالا هستی.
            </p>

            <div class="mt-7 flex flex-col gap-3 sm:flex-row">
              <button type="button" class="btn btn--accent btn--lg" @click="openNotice()">
                شروع یادگیری
                <AppIcon name="arrow-left" :size="18" />
              </button>
              <button
                type="button"
                class="btn btn--lg btn--ghost text-on-band hover:bg-white/10 hover:!text-on-band"
                @click="scrollToSection('plans', { focus: true })"
              >
                مشاهده پلن‌ها
              </button>
            </div>

            <ul class="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              <li
                v-for="perk in perks"
                :key="perk"
                class="flex items-center gap-1.5 text-[0.78rem] text-on-band-soft"
              >
                <AppIcon name="check" :size="14" class="text-accent" />
                {{ perk }}
              </li>
            </ul>
          </div>

          <!-- Decorative "progress" dial, echoing the product language -->
          <div class="cta-panel__visual" aria-hidden="true">
            <div class="dial">
              <svg viewBox="0 0 120 120" class="dial__ring">
                <circle cx="60" cy="60" r="52" class="dial__track" />
                <circle cx="60" cy="60" r="52" class="dial__value" />
              </svg>
              <div class="dial__center">
                <span class="u-latin text-[1.6rem] font-bold text-on-band">۶۵٪</span>
                <span class="text-[0.7rem] text-on-band-soft">پیشرفت مسیر</span>
              </div>
            </div>

            <div class="dial__note">
              <AppIcon name="zap" :size="14" class="text-accent" />
              <span>هر هفته یک قدم کوچک</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-panel {
  position: relative;
  overflow: hidden;
  padding: clamp(1.6rem, 1.1rem + 2.6vw, 3.4rem);
  border-radius: clamp(var(--r-xl), 2vw, var(--r-2xl));
  background: linear-gradient(140deg, #221f4d 0%, #171632 48%, #141226 100%);
  box-shadow: var(--shadow-xl);
  isolation: isolate;
}

.cta-panel__rings {
  position: absolute;
  inset-block-start: -8rem;
  inset-inline-end: -6rem;
  width: 26rem;
  height: 26rem;
  border-radius: 50%;
  border: 1px solid rgb(255 255 255 / 0.08);
  box-shadow:
    inset 0 0 0 4rem rgb(255 255 255 / 0.02),
    inset 0 0 0 8rem rgb(255 255 255 / 0.02);
}

.cta-panel__glow {
  position: absolute;
  inset-block-end: -10rem;
  inset-inline-start: 8%;
  width: 28rem;
  height: 22rem;
  border-radius: 50%;
  background: radial-gradient(circle, rgb(244 166 42 / 0.25), transparent 68%);
  filter: blur(20px);
}

.cta-panel__visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.dial {
  position: relative;
  width: 13rem;
  height: 13rem;
}

.dial__ring {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.dial__track {
  fill: none;
  stroke: rgb(255 255 255 / 0.1);
  stroke-width: 8;
}

.dial__value {
  fill: none;
  stroke: var(--c-accent);
  stroke-width: 8;
  stroke-linecap: round;
  stroke-dasharray: 327;
  stroke-dashoffset: 114;
}

.dial__center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.15rem;
}

.dial__note {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.85rem;
  border-radius: var(--r-pill);
  border: 1px solid rgb(255 255 255 / 0.14);
  font-size: 0.76rem;
  color: var(--c-on-band-soft);
}
</style>
