<script setup lang="ts">
import { watch } from 'vue'
import { useDemoNotice } from '@/composables/useDemoNotice'
import AppIcon from '@/components/ui/AppIcon.vue'

/**
 * Hosts the single "demo only" notice used across the page.
 *
 * It is rendered as an assertive live region so keyboard and screen-reader
 * users get the same honest feedback as sighted users. Appearance is handled in
 * plain CSS (no Vuetify overlay) to keep the visual language consistent.
 */
const { notice, visible, closeNotice } = useDemoNotice()

watch(visible, (isVisible) => {
  if (!isVisible) return
  // Move focus to the notice so it can be dismissed without a pointer.
  requestAnimationFrame(() => {
    document.getElementById('demo-notice')?.focus({ preventScroll: true })
  })
})

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') closeNotice()
}
</script>

<template>
  <Teleport to="body">
    <div
      id="demo-notice"
      v-show="visible"
      class="demo-notice"
      role="status"
      aria-live="polite"
      tabindex="-1"
      @keydown="onKeydown"
    >
      <span class="demo-notice__icon" aria-hidden="true">
        <AppIcon name="sparkles" :size="18" />
      </span>

      <div class="min-w-0 flex-1">
        <p class="text-sm font-bold text-ink">{{ notice.title }}</p>
        <p class="mt-0.5 text-[0.82rem] leading-7 text-ink-soft">{{ notice.message }}</p>
      </div>

      <button type="button" class="demo-notice__close" aria-label="بستن پیام" @click="closeNotice">
        <AppIcon name="x" :size="16" />
      </button>
    </div>
  </Teleport>
</template>

<style scoped>
.demo-notice {
  position: fixed;
  inset-block-end: clamp(1rem, 3vw, 2rem);
  inset-inline: 0;
  margin-inline: auto;
  z-index: 120;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  width: min(30rem, calc(100vw - 2rem));
  padding: 0.95rem 1rem;
  border-radius: var(--r-lg);
  border: 1px solid var(--c-border);
  background: var(--c-surface);
  box-shadow: var(--shadow-lg);
  animation: notice-in 320ms var(--ease-spring) both;
}

.demo-notice__icon {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  border-radius: 0.6rem;
  background: var(--c-accent-soft);
  color: var(--c-accent-ink);
}

.demo-notice__close {
  display: grid;
  place-items: center;
  width: 1.9rem;
  height: 1.9rem;
  flex-shrink: 0;
  border-radius: var(--r-pill);
  color: var(--c-ink-faint);
  transition: background-color var(--dur-fast) var(--ease-out-soft);
}

.demo-notice__close:hover {
  background: var(--c-surface-soft);
  color: var(--c-ink);
}

.demo-notice:focus-visible {
  outline: 2px solid var(--c-accent);
  outline-offset: 3px;
}

@keyframes notice-in {
  from {
    opacity: 0;
    transform: translateY(14px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .demo-notice {
    animation: none;
  }
}
</style>
