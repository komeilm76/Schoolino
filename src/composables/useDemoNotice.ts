import { computed, readonly, ref } from 'vue'

/**
 * Honest demo interactions.
 *
 * Schoolino ships without a backend, so actions that would normally hit an API
 * (sign-up, checkout, social links) surface a clear notice instead of silently
 * doing nothing or pretending to work.
 */
export interface DemoNotice {
  title: string
  message: string
}

const DEFAULT_NOTICE: DemoNotice = {
  title: 'نسخه نمایشی',
  message:
    'این بخش در دموی فرانت‌اند فعال نیست. در نسخه نهایی، ثبت‌نام و خرید اشتراک به حساب کاربری و درگاه پرداخت متصل می‌شود.',
}

// Module-level state: a single notice host lives in App.vue.
const notice = ref<DemoNotice>(DEFAULT_NOTICE)
const visible = ref(false)
const requestCount = ref(0)

/** Accessible announcement text; changes on every request so it is re-read. */
const announcement = computed(() =>
  visible.value ? `${notice.value.title}: ${notice.value.message}` : '',
)

let closeTimer: ReturnType<typeof setTimeout> | undefined

/**
 * Global "demo only" notice, shared by every CTA on the page.
 *
 * @returns The active notice, its visibility, and helpers to open/close it.
 */
export function useDemoNotice() {
  /**
   * Opens the notice, optionally overriding the title or message, and
   * auto-dismisses it after `duration` ms (0 keeps it open).
   */
  function openNotice(custom?: Partial<DemoNotice>, duration = 6000): void {
    notice.value = { ...DEFAULT_NOTICE, ...custom }
    visible.value = true
    requestCount.value += 1

    if (closeTimer) clearTimeout(closeTimer)
    if (duration > 0) closeTimer = setTimeout(() => (visible.value = false), duration)
  }

  function closeNotice(): void {
    visible.value = false
    if (closeTimer) clearTimeout(closeTimer)
  }

  return {
    notice: readonly(notice),
    visible: readonly(visible),
    requestCount: readonly(requestCount),
    announcement,
    openNotice,
    closeNotice,
  }
}
