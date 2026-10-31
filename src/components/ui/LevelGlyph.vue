<script setup lang="ts">
import type { Tone } from '@/types/content'

/**
 * Abstract geometric glyph that gives each education level its own identity.
 * Pure SVG: no image requests, themes automatically through `currentColor`.
 */
defineProps<{ variant: 'elementary' | 'middle' | 'high'; tone: Tone }>()
</script>

<template>
  <svg
    viewBox="0 0 120 120"
    class="level-glyph"
    :class="`level-glyph--${tone}`"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="60" cy="60" r="46" class="glyph-orbit" />

    <!-- Elementary: stacked building blocks + rising sun -->
    <g v-if="variant === 'elementary'">
      <circle cx="78" cy="34" r="11" class="glyph-accent" />
      <rect x="26" y="62" width="26" height="26" rx="7" class="glyph-primary" />
      <rect x="56" y="62" width="26" height="26" rx="7" class="glyph-soft" />
      <rect x="41" y="34" width="26" height="24" rx="7" class="glyph-soft" />
      <path d="M26 96h68" class="glyph-line" />
    </g>

    <!-- Middle: compass rose -->
    <g v-else-if="variant === 'middle'">
      <circle cx="60" cy="60" r="28" class="glyph-soft" />
      <circle cx="60" cy="60" r="18" class="glyph-primary" />
      <path d="M60 32v10M60 78v10M32 60h10M78 60h10" class="glyph-line" />
      <path d="M60 50l7 10-7 10-7-10z" class="glyph-accent" />
    </g>

    <!-- High school: orbit and trajectory -->
    <g v-else>
      <ellipse cx="60" cy="60" rx="38" ry="17" transform="rotate(-28 60 60)" class="glyph-line" />
      <circle cx="60" cy="60" r="20" class="glyph-soft" />
      <path d="M60 40c11 6 15 16 12 26" class="glyph-line" />
      <circle cx="86" cy="40" r="6" class="glyph-accent" />
      <circle cx="60" cy="60" r="7" class="glyph-primary" />
      <path d="M34 84c8 4 16 4 24 0" class="glyph-line" />
    </g>
  </svg>
</template>

<style scoped>
.level-glyph {
  width: 100%;
  height: 100%;
}

.glyph-orbit {
  stroke: currentColor;
  stroke-opacity: 0.14;
  stroke-width: 1;
  stroke-dasharray: 4 6;
}

.glyph-primary {
  fill: var(--glyph-strong);
}

.glyph-soft {
  fill: var(--glyph-soft);
}

.glyph-accent {
  fill: var(--c-accent);
}

.glyph-line {
  stroke: var(--glyph-strong);
  stroke-width: 2.4;
  stroke-linecap: round;
  fill: none;
}

.level-glyph--brand {
  color: var(--c-brand);
  --glyph-strong: var(--c-brand);
  --glyph-soft: color-mix(in srgb, var(--c-brand) 20%, transparent);
}

.level-glyph--accent {
  color: var(--c-accent-strong);
  --glyph-strong: var(--c-accent-strong);
  --glyph-soft: color-mix(in srgb, var(--c-accent) 26%, transparent);
}

.level-glyph--mint {
  color: var(--c-mint);
  --glyph-strong: var(--c-mint);
  --glyph-soft: color-mix(in srgb, var(--c-mint) 20%, transparent);
}

.level-glyph--coral {
  color: var(--c-coral);
  --glyph-strong: var(--c-coral);
  --glyph-soft: color-mix(in srgb, var(--c-coral) 20%, transparent);
}
</style>
