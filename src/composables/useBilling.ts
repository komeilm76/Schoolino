import { computed, readonly, ref } from 'vue'
import type { Plan } from '@/types/content'
import { monthlyEquivalent, yearlySavingPercent } from '@/utils/format'

/** Billing period toggle values. */
export type BillingCycle = 'monthly' | 'yearly'

/** Presentation-ready price information for one plan. */
export interface PlanPrice {
  /** Amount charged for the selected period (Toman). */
  amount: number
  /** Equivalent monthly cost (Toman). */
  perMonth: number
  /** «ماهانه» or «سالانه» */
  periodLabel: string
  /** Secondary line, e.g. «معادل ۲۴۸٬۰۰۰ تومان در ماه». */
  note: string
}

/**
 * Billing-cycle state for the pricing section.
 *
 * Kept outside the component so the pricing maths is unit-testable and a future
 * checkout flow can reuse it.
 *
 * @param initial - Starting cycle (yearly by default, matching the showcased
 * discount).
 */
export function useBilling(initial: BillingCycle = 'yearly') {
  const cycle = ref<BillingCycle>(initial)
  const isYearly = computed(() => cycle.value === 'yearly')

  function setCycle(next: BillingCycle): void {
    cycle.value = next
  }

  function toggleCycle(): void {
    cycle.value = isYearly.value ? 'monthly' : 'yearly'
  }

  /** Prices and labels for the currently selected billing cycle. */
  function priceFor(plan: Plan): PlanPrice {
    if (isYearly.value) {
      const perMonth = monthlyEquivalent(plan.yearlyPrice)
      return {
        amount: plan.yearlyPrice,
        perMonth,
        periodLabel: 'سالانه',
        note: `معادل ${perMonth.toLocaleString('fa-IR')} تومان در ماه`,
      }
    }

    return {
      amount: plan.monthlyPrice,
      perMonth: plan.monthlyPrice,
      periodLabel: 'ماهانه',
      note: 'بدون تعهد بلندمدت',
    }
  }

  /** Yearly saving percentage for a plan (0 when monthly is selected). */
  function savingFor(plan: Plan): number {
    return yearlySavingPercent(plan.monthlyPrice, plan.yearlyPrice)
  }

  return {
    cycle: readonly(cycle),
    isYearly,
    setCycle,
    toggleCycle,
    priceFor,
    savingFor,
  }
}
