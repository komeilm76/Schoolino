<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /** Rating from 0 to 5 (fractions allowed). */
    value: number
    /** Pixel size of each star. */
    size?: number
    /** Hides the visible numeric value (the accessible name stays). */
    hideValue?: boolean
  }>(),
  { size: 14, hideValue: false },
)

const label = computed(() => `امتیاز ${props.value} از ۵`)
</script>

<template>
  <span class="inline-flex items-center gap-1.5" role="img" :aria-label="label">
    <span class="flex items-center gap-0.5" aria-hidden="true">
      <!-- Inline SVG (not an icon-font/Iconify glyph) so the fill can be themed
           reliably and the mark stays crisp at any size. -->
      <svg
        v-for="star in 5"
        :key="star"
        :width="size"
        :height="size"
        viewBox="0 0 24 24"
        class="star"
        :class="star <= Math.round(value) ? 'star--filled' : 'star--empty'"
      >
        <path
          d="M12 3.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z"
          stroke-width="1.3"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <span v-if="!hideValue" class="u-latin text-[0.78rem] font-semibold text-ink-soft">
      {{ value.toFixed(1) }}
    </span>
  </span>
</template>

<style scoped>
.star--filled {
  fill: var(--c-accent);
  stroke: var(--c-accent-strong);
}

.star--empty {
  fill: transparent;
  stroke: var(--c-border-strong);
}
</style>
