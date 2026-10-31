<script setup lang="ts">
import { computed } from 'vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import BillingToggle from '@/components/ui/BillingToggle.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import type { BillingCycle } from '@/composables/useBilling'
import { useBilling } from '@/composables/useBilling'
import { useDemoNotice } from '@/composables/useDemoNotice'
import { plans } from '@/data/plans'
import { formatNumber } from '@/utils/format'

/**
 * Pricing.
 *
 * Prices are static demo values in Toman. Switching the billing cycle updates
 * every card from one reactive source; the maths lives in `useBilling` so it is
 * covered by unit tests.
 */
const { cycle, setCycle, priceFor, savingFor } = useBilling('yearly')
const { openNotice } = useDemoNotice()

const billingCycle = computed({
  get: () => cycle.value,
  set: (value: BillingCycle) => setCycle(value),
})

const maxSaving = Math.max(...plans.map((plan) => savingFor(plan)))

function choosePlan(planName: string): void {
  openNotice({
    title: `پلن ${planName}`,
    message: `دوره ${cycle.value === 'yearly' ? 'سالانه' : 'ماهانه'} انتخاب شد. در این دمو پرداخت انجام نمی‌شود و به درگاه بانکی متصل نیستیم.`,
  })
}
</script>

<template>
  <section id="plans" class="section relative overflow-hidden" aria-labelledby="plans-title">
    <div class="plans-wash" aria-hidden="true"></div>

    <div class="container-page relative">
      <div class="flex flex-col items-center gap-6 text-center">
        <SectionHeading
          eyebrow="پلن‌ها و شهریه"
          title="یک اشتراک، یک مسیر کامل"
          description="همه پلن‌ها شامل ویدیوهای درس‌به‌درس و آزمون تثبیت هستند؛ تفاوت در میزان دسترسی و ابزارهای تحلیل یادگیری است."
          align="center"
          class="max-w-2xl"
        />

        <div v-reveal class="flex flex-col items-center gap-2">
          <BillingToggle v-model="billingCycle" :saving="maxSaving" />
          <p class="text-caption">قیمت‌ها نمونه‌اند و در نسخه نهایی جایگزین می‌شوند.</p>
        </div>
      </div>

      <div class="mt-11 grid items-stretch gap-4 lg:grid-cols-3">
        <article
          v-for="(plan, index) in plans"
          :key="plan.id"
          v-reveal="{ delay: index * 90 }"
          class="plan-card"
          :class="plan.recommended ? 'plan-card--featured' : ''"
        >
          <div v-if="plan.recommended" class="plan-card__ribbon">
            <AppIcon name="sparkles" :size="13" />
            پیشنهاد اسکولینو
          </div>

          <div class="flex items-start justify-between gap-2">
            <div>
              <h3
                class="text-[1.15rem] font-bold"
                :class="plan.recommended ? 'text-on-band' : 'text-ink'"
              >
                پلن {{ plan.name }}
              </h3>
              <p
                class="mt-1 text-[0.8rem]"
                :class="plan.recommended ? 'text-on-band-soft' : 'text-ink-faint'"
              >
                {{ plan.tagline }}
              </p>
            </div>

            <span
              v-if="cycle === 'yearly' && savingFor(plan)"
              class="chip"
              :class="plan.recommended ? 'chip--accent' : 'chip--mint'"
            >
              {{ savingFor(plan) }}٪ تخفیف
            </span>
          </div>

          <p
            class="mt-5 flex items-baseline gap-1.5 text-[0.78rem]"
            :class="plan.recommended ? 'text-on-band-soft' : 'text-ink-faint'"
          >
            <span>{{ priceFor(plan).periodLabel }}</span>
            <span class="text-[0.68rem] opacity-80">(پرداخت یکجا)</span>
          </p>

          <p class="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span
              class="text-[1.65rem] font-bold leading-tight tracking-tight"
              :class="plan.recommended ? 'text-on-band' : 'text-ink'"
            >
              {{ formatNumber(priceFor(plan).amount) }}
              <span class="text-[0.78rem] font-medium">تومان</span>
            </span>

            <span
              v-if="cycle === 'yearly'"
              class="whitespace-nowrap text-[0.7rem] line-through"
              :class="plan.recommended ? 'text-on-band-soft/70' : 'text-ink-faint'"
            >
              {{ formatNumber(plan.monthlyPrice * 12) }}
            </span>
          </p>

          <p
            class="text-[0.76rem]"
            :class="plan.recommended ? 'text-on-band-soft' : 'text-ink-faint'"
          >
            {{ priceFor(plan).note }}
          </p>

          <hr class="my-5" :class="plan.recommended ? 'border-white/12' : 'border-line'" />

          <p
            class="text-[0.78rem]"
            :class="plan.recommended ? 'text-on-band-soft' : 'text-ink-faint'"
          >
            {{ plan.audience }}
          </p>

          <ul class="mt-3 flex flex-1 flex-col gap-2.5">
            <li
              v-for="feature in plan.features"
              :key="feature"
              class="flex items-start gap-2 text-[0.85rem] leading-7"
              :class="plan.recommended ? 'text-on-band/90' : 'text-ink-soft'"
            >
              <span
                class="plan-check"
                :class="plan.recommended ? 'plan-check--dark' : ''"
                aria-hidden="true"
              >
                <AppIcon name="check" :size="11" :stroke-width="2.8" />
              </span>
              {{ feature }}
            </li>
          </ul>

          <button
            type="button"
            class="btn btn--block mt-6"
            :class="plan.recommended ? 'btn--accent' : 'btn--outline'"
            @click="choosePlan(plan.name)"
          >
            {{ plan.ctaLabel }}
          </button>
        </article>
      </div>

      <div
        v-reveal
        class="mt-6 flex flex-col items-start justify-between gap-3 rounded-2xl border border-line bg-surface px-4 py-3.5 sm:flex-row sm:items-center"
      >
        <p class="flex items-center gap-2 text-[0.82rem] text-ink-soft">
          <AppIcon name="lock-keyhole" :size="16" class="text-mint" />
          این دمو هیچ پرداخت واقعی انجام نمی‌دهد و اطلاعات کارت بانکی نمی‌گیرد.
        </p>
        <button
          type="button"
          class="link-underline text-[0.82rem]"
          @click="
            openNotice({
              title: 'مقایسه پلن‌ها',
              message:
                'جدول مقایسه کامل پلن‌ها در نسخه نهایی اضافه می‌شود. فهرست ویژگی‌های هر پلن در همین کارت‌ها آمده است.',
            })
          "
        >
          تفاوت پلن‌ها را ببین
          <AppIcon name="arrow-left" :size="14" />
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.plans-wash {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(
      ellipse 50% 45% at 50% 0%,
      color-mix(in srgb, var(--c-brand) 10%, transparent),
      transparent 72%
    ),
    linear-gradient(180deg, var(--c-bg-deep), var(--c-bg));
}

.plan-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: var(--r-2xl);
  border: 1px solid var(--c-border);
  background: var(--c-surface);
  box-shadow: var(--shadow-sm);
  transition:
    transform var(--dur-base) var(--ease-out-soft),
    box-shadow var(--dur-base) var(--ease-out-soft);
}

.plan-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.plan-card--featured {
  background:
    radial-gradient(circle at 82% 4%, rgb(244 166 42 / 0.22), transparent 45%),
    linear-gradient(165deg, var(--c-band-soft), var(--c-band));
  border-color: color-mix(in srgb, var(--c-accent) 35%, transparent);
  box-shadow: var(--shadow-xl);
}

@media (min-width: 1024px) {
  .plan-card--featured {
    transform: translateY(-10px);
  }

  .plan-card--featured:hover {
    transform: translateY(-14px);
  }
}

.plan-card__ribbon {
  position: absolute;
  inset-block-start: -0.85rem;
  inset-inline-start: 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.28rem 0.8rem;
  border-radius: var(--r-pill);
  background: var(--c-accent);
  color: #21170a;
  font-size: 0.72rem;
  font-weight: 700;
  box-shadow: 0 10px 20px -14px rgb(244 166 42 / 0.9);
}

.plan-check {
  display: grid;
  place-items: center;
  width: 1.15rem;
  height: 1.15rem;
  flex-shrink: 0;
  margin-block-start: 0.4rem;
  border-radius: 50%;
  background: var(--c-mint-soft);
  color: var(--c-mint);
}

.plan-check--dark {
  background: color-mix(in srgb, var(--c-accent) 22%, transparent);
  color: var(--c-accent);
}

@media (prefers-reduced-motion: reduce) {
  .plan-card:hover,
  .plan-card--featured:hover {
    transform: none;
  }
}
</style>
