<script setup lang="ts">
import { computed } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import AppIcon from '@/components/ui/AppIcon.vue'
import { prefersReducedMotion } from '@/utils/scroll'

/** Floating "back to top" control that appears after the hero. */
const { y } = useWindowScroll()
const visible = computed(() => y.value > 900)

function toTop(): void {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  document.getElementById('main')?.focus({ preventScroll: true })
}
</script>

<template>
  <Transition name="fade-up">
    <button
      v-if="visible"
      type="button"
      class="back-to-top"
      aria-label="بازگشت به بالای صفحه"
      @click="toTop"
    >
      <AppIcon name="arrow-down" :size="18" class="rotate-180" />
    </button>
  </Transition>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  inset-block-end: 1.4rem;
  inset-inline-end: 1.4rem;
  z-index: 80;
  display: grid;
  place-items: center;
  width: 2.9rem;
  height: 2.9rem;
  border-radius: 50%;
  border: 1px solid var(--c-border);
  background: var(--c-surface);
  color: var(--c-ink);
  box-shadow: var(--shadow-md);
  transition:
    transform var(--dur-fast) var(--ease-out-soft),
    background-color var(--dur-fast) var(--ease-out-soft);
}

.back-to-top:hover {
  transform: translateY(-3px);
  background: var(--c-brand);
  color: var(--c-action-ink);
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition:
    opacity var(--dur-base) var(--ease-out-soft),
    transform var(--dur-base) var(--ease-out-soft);
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
