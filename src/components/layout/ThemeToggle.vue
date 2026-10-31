<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme'
import AppIcon from '@/components/ui/AppIcon.vue'

/**
 * Light / dark switch.
 *
 * The accessible name stays stable ("حالت تیره") and the state is exposed with
 * `aria-pressed`, which is the correct pattern for a toggle button. The icon
 * shows the action that will happen next.
 */
const { isDark, toggleTheme } = useTheme()

const label = computed(() => (isDark.value ? 'حالت تیره — روشن کردن' : 'حالت تیره'))
</script>

<template>
  <button
    type="button"
    class="theme-toggle"
    :aria-label="label"
    :aria-pressed="isDark"
    title="تغییر حالت روشن و تیره"
    @click="toggleTheme"
  >
    <span class="theme-toggle__track" aria-hidden="true">
      <span class="theme-toggle__thumb" :class="{ 'theme-toggle__thumb--dark': isDark }">
        <AppIcon :name="isDark ? 'moon' : 'sun'" :size="13" :stroke-width="2" />
      </span>
    </span>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.9rem;
  height: 2.9rem;
  border-radius: var(--r-pill);
  color: var(--c-ink-soft);
  transition: background-color var(--dur-fast) var(--ease-out-soft);
}

.theme-toggle:hover {
  background: var(--c-surface-soft);
}

.theme-toggle__track {
  display: inline-flex;
  align-items: center;
  width: 2.15rem;
  height: 1.35rem;
  padding: 0.15rem;
  border-radius: var(--r-pill);
  background: var(--c-brand-soft);
  border: 1px solid var(--c-border);
  transition: background-color var(--dur-base) var(--ease-out-soft);
}

.theme-toggle__thumb {
  display: grid;
  place-items: center;
  width: 1.05rem;
  height: 1.05rem;
  border-radius: 50%;
  background: var(--c-surface);
  color: var(--c-accent-strong);
  box-shadow: var(--shadow-xs);
  transform: translateX(0);
  transition: transform var(--dur-base) var(--ease-spring);
}

.theme-toggle__thumb--dark {
  transform: translateX(-0.8rem);
  color: var(--c-brand);
}
</style>
