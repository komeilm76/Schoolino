<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

/**
 * Thin wrapper around Iconify so every icon in the app shares the same
 * defaults (size, stroke weight, accessibility).
 *
 * Icons are registered offline from a generated Lucide subset, so no request
 * leaves the browser.
 */
const props = withDefaults(
  defineProps<{
    /** Lucide icon name, e.g. `graduation-cap`. */
    name: string
    /** Pixel size of the square icon. */
    size?: number | string
    /** Accessible label. When omitted the icon is decorative and hidden. */
    label?: string
    /** Stroke width (Lucide icons are stroke based). */
    strokeWidth?: number
  }>(),
  { size: 20, label: undefined, strokeWidth: 1.8 },
)

const iconName = computed(() => (props.name.includes(':') ? props.name : `lucide:${props.name}`))
</script>

<template>
  <Icon
    :icon="iconName"
    :width="size"
    :height="size"
    :stroke-width="strokeWidth"
    :aria-hidden="label ? undefined : 'true'"
    :aria-label="label"
    :role="label ? 'img' : undefined"
    class="app-icon"
    inline
  />
</template>

<style scoped>
.app-icon {
  flex-shrink: 0;
}
</style>
