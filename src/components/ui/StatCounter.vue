<script setup lang="ts">
import { ref, toRef } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import AppIcon from '@/components/ui/AppIcon.vue'
import { useCountUp } from '@/composables/useCountUp'
import { formatNumber } from '@/utils/format'

const props = defineProps<{
  label: string
  value: number
  suffix: string
  icon: string
}>()

const root = ref<HTMLElement | null>(null)
const { value: displayed, start } = useCountUp(toRef(props, 'value'), { duration: 1700 })

// Start once, when the counter first enters the viewport.
const { stop } = useIntersectionObserver(
  root,
  ([entry]) => {
    if (!entry?.isIntersecting) return
    start()
    stop()
  },
  { threshold: 0.35 },
)
</script>

<template>
  <div ref="root" class="stat">
    <span class="stat__icon" aria-hidden="true">
      <AppIcon :name="icon" :size="18" />
    </span>

    <p class="stat__value" dir="ltr">
      <span aria-hidden="true">{{ formatNumber(displayed) }}{{ suffix }}</span>
      <span class="sr-only">{{ formatNumber(value) }}{{ suffix }}</span>
    </p>

    <p class="stat__label">{{ label }}</p>
  </div>
</template>

<style scoped>
.stat {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding-inline: 0.25rem;
}

.stat__icon {
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.75rem;
  background: color-mix(in srgb, var(--c-on-band) 10%, transparent);
  color: var(--c-accent);
  margin-block-end: 0.35rem;
}

.stat__value {
  font-family: 'Plus Jakarta Sans Variable', sans-serif;
  font-size: clamp(1.6rem, 1.2rem + 1.4vw, 2.35rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--c-on-band);
}

.stat__label {
  font-size: 0.85rem;
  color: var(--c-on-band-soft);
}
</style>
