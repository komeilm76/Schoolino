<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Small overline label, e.g. «پایه‌های تحصیلی». */
    eyebrow: string
    title: string
    /** Optional supporting paragraph. */
    description?: string
    /** Heading level for a correct document outline. */
    as?: 'h2' | 'h3'
    /** Centres the block (used on full-width sections). */
    align?: 'start' | 'center'
    /** Light-on-dark variant. */
    inverted?: boolean
  }>(),
  { description: undefined, as: 'h2', align: 'start', inverted: false },
)
</script>

<template>
  <header
    class="section-heading flex max-w-2xl flex-col gap-3"
    :class="[align === 'center' ? 'mx-auto items-center text-center' : 'items-start']"
  >
    <p class="eyebrow" :class="{ 'eyebrow--plain': inverted }">{{ eyebrow }}</p>

    <component :is="as" class="text-h2" :class="inverted ? 'text-on-band' : ''">
      <slot name="title">{{ title }}</slot>
    </component>

    <p v-if="description" class="text-lead" :class="inverted ? 'text-on-band-soft' : ''">
      {{ description }}
    </p>

    <slot />
  </header>
</template>

<style scoped>
.eyebrow--plain {
  color: var(--c-accent);
}
</style>
