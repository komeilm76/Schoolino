<script setup lang="ts">
import { computed } from 'vue'
import type { BillingCycle } from '@/composables/useBilling'

const props = defineProps<{
  modelValue: BillingCycle
  /** Saving percentage shown on the yearly option. */
  saving?: number
}>()

const emit = defineEmits<{ 'update:modelValue': [value: BillingCycle] }>()

const options = computed(() => [
  { value: 'monthly' as const, label: 'ماهانه' },
  { value: 'yearly' as const, label: 'سالانه' },
])

function select(value: BillingCycle): void {
  if (value !== props.modelValue) emit('update:modelValue', value)
}
</script>

<template>
  <div class="billing-toggle" role="group" aria-label="انتخاب دوره پرداخت">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      class="billing-toggle__option"
      :class="{ 'billing-toggle__option--active': modelValue === option.value }"
      :aria-pressed="modelValue === option.value"
      @click="select(option.value)"
    >
      {{ option.label }}
      <span v-if="option.value === 'yearly' && saving" class="billing-toggle__badge">
        {{ saving }}٪ تخفیف
      </span>
    </button>
  </div>
</template>

<style scoped>
.billing-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.3rem;
  border-radius: var(--r-pill);
  border: 1px solid var(--c-border);
  background: var(--c-surface);
  box-shadow: var(--shadow-xs);
}

.billing-toggle__option {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  min-height: 2.4rem;
  padding: 0.35rem 1rem;
  border-radius: var(--r-pill);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--c-ink-soft);
  transition:
    background-color var(--dur-base) var(--ease-out-soft),
    color var(--dur-base) var(--ease-out-soft);
}

.billing-toggle__option:hover {
  color: var(--c-ink);
}

.billing-toggle__option--active {
  background: var(--c-ink);
  color: var(--c-bg);
}

.billing-toggle__badge {
  padding: 0.05rem 0.4rem;
  border-radius: var(--r-pill);
  background: var(--c-accent);
  color: #21170a;
  font-size: 0.66rem;
  font-weight: 700;
}
</style>
