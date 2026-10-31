<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Renders the light-on-dark lockup used inside dark sections. */
    inverted?: boolean
    /** Hides the wordmark and keeps only the mark. */
    markOnly?: boolean
  }>(),
  { inverted: false, markOnly: false },
)
</script>

<template>
  <span class="inline-flex items-center gap-2.5">
    <!-- Original Schoolino mark: an open book turned into a graduation cap. -->
    <span class="logo-mark" :class="inverted ? 'logo-mark--inverted' : ''" aria-hidden="true">
      <svg viewBox="0 0 40 40" fill="none" role="presentation">
        <path d="M20 9.5 33 16.2 20 22.9 7 16.2 20 9.5Z" class="logo-cap" />
        <path
          d="M12 20.5v6.2c0 2.6 3.6 4.8 8 4.8s8-2.2 8-4.8v-6.2"
          class="logo-book"
          stroke-linecap="round"
        />
        <path d="M30.4 17.4v7.8" class="logo-string" stroke-linecap="round" />
      </svg>
    </span>

    <span v-if="!markOnly" class="leading-none">
      <span
        class="logo-word block font-display text-[1.22rem] font-extrabold tracking-tight"
        :class="inverted ? 'text-on-band' : 'text-ink'"
      >
        اسکولینو
      </span>
      <span
        class="u-latin mt-1 block text-[0.6rem] font-semibold tracking-[0.22em]"
        :class="inverted ? 'text-on-band-soft' : 'text-ink-faint'"
      >
        SCHOOLINO
      </span>
    </span>
  </span>
</template>

<style scoped>
.logo-mark {
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.85rem;
  background: var(--c-brand);
  box-shadow: 0 10px 20px -12px rgb(87 65 214 / 0.8);
}

.logo-mark svg {
  width: 1.65rem;
  height: 1.65rem;
}

.logo-cap {
  fill: var(--c-accent);
}

.logo-book {
  stroke: #fff;
  stroke-width: 2.1;
}

.logo-string {
  stroke: #fff;
  stroke-width: 1.8;
}

.logo-mark--inverted {
  background: color-mix(in srgb, white 12%, transparent);
  box-shadow: none;
  outline: 1px solid color-mix(in srgb, white 18%, transparent);
}

.logo-word {
  letter-spacing: -0.01em;
}
</style>
