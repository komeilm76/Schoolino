<script setup lang="ts">
import { computed } from 'vue'
import type { Tone } from '@/types/content'

const props = withDefaults(
  defineProps<{
    /** People to show; `initials` are rendered inside the circle. */
    people: Array<{ id: string; name: string; initials: string; tone: Tone }>
    /** How many circles to show before the "+n" bubble. */
    max?: number
    size?: 'sm' | 'md'
  }>(),
  { max: 4, size: 'sm' },
)

const visible = computed(() => props.people.slice(0, props.max))
const rest = computed(() => Math.max(props.people.length - props.max, 0))

const toneClass: Record<Tone, string> = {
  brand: 'bg-brand-soft text-brand-ink',
  accent: 'bg-accent-soft text-accent-ink',
  mint: 'bg-mint-soft text-mint',
  coral: 'bg-coral-soft text-coral',
}
</script>

<template>
  <div class="flex items-center" role="group" aria-label="نمونه‌ای از دانش‌آموزان">
    <span
      v-for="person in visible"
      :key="person.id"
      class="avatar-circle"
      :class="[toneClass[person.tone], size === 'md' ? 'avatar-circle--md' : '']"
      :title="person.name"
    >
      <span aria-hidden="true">{{ person.initials }}</span>
      <span class="sr-only">{{ person.name }}</span>
    </span>

    <span
      v-if="rest > 0"
      class="avatar-circle bg-surface-soft text-ink-soft"
      :class="size === 'md' ? 'avatar-circle--md' : ''"
      :aria-label="`${rest} نفر دیگر`"
    >
      <span aria-hidden="true">+{{ rest }}</span>
    </span>
  </div>
</template>

<style scoped>
.avatar-circle {
  display: inline-grid;
  place-items: center;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  border: 2px solid var(--c-bg);
  font-size: 0.66rem;
  font-weight: 700;
  margin-inline-start: -0.55rem;
}

.avatar-circle:first-child {
  margin-inline-start: 0;
}

.avatar-circle--md {
  width: 2.75rem;
  height: 2.75rem;
  font-size: 0.75rem;
}
</style>
