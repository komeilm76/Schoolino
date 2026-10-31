<script setup lang="ts">
import { computed, ref } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import BrandLogo from '@/components/ui/BrandLogo.vue'
import ThemeToggle from './ThemeToggle.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { mainNav } from '@/data/navigation'
import { useScrollSpy } from '@/composables/useScrollSpy'
import { useDemoNotice } from '@/composables/useDemoNotice'
import { scrollToSection } from '@/utils/scroll'

/**
 * Sticky header.
 *
 * - Sits transparent over the hero, then turns into a solid, slightly
 *   condensed bar once the page is scrolled (single cheap scroll listener via
 *   VueUse, throttled by rAF).
 * - Highlights the section currently in view (IntersectionObserver scroll-spy).
 * - Mobile: a slide-in navigation drawer with large touch targets.
 */
const { y } = useWindowScroll()

const isScrolled = computed(() => y.value > 12)
const isCompact = computed(() => y.value > 140)

const sectionIds = mainNav.map((item) => item.id)
const { activeId } = useScrollSpy(sectionIds)

const drawerOpen = ref(false)
const { openNotice } = useDemoNotice()

function goTo(id: string): void {
  const wasOpen = drawerOpen.value
  drawerOpen.value = false
  // Let the drawer close (and release its scroll lock) before scrolling.
  window.setTimeout(() => scrollToSection(id, { focus: true }), wasOpen ? 280 : 0)
}

function openDemo(action: 'login' | 'start'): void {
  drawerOpen.value = false
  openNotice(
    action === 'login'
      ? {
          title: 'ورود دانش‌آموز',
          message:
            'داشبورد دانش‌آموز در این دموی فرانت‌اند پیاده‌سازی نشده است. مسیر ورود و احراز هویت در نقشه راه محصول پیش‌بینی شده است.',
        }
      : undefined,
  )
}
</script>

<template>
  <header class="site-header" :class="{ 'is-scrolled': isScrolled, 'is-compact': isCompact }">
    <div class="container-page">
      <div class="site-header__inner">
        <a
          href="#hero"
          class="focus-ring rounded-xl"
          aria-label="اسکولینو — صفحه اصلی"
          @click.prevent="goTo('hero')"
        >
          <BrandLogo />
        </a>

        <nav class="site-nav" aria-label="ناوبری اصلی">
          <ul class="flex items-center gap-1">
            <li v-for="item in mainNav" :key="item.id">
              <a
                :href="`#${item.id}`"
                class="nav-link"
                :class="{ 'nav-link--active': activeId === item.id }"
                :aria-current="activeId === item.id ? 'true' : undefined"
                @click.prevent="goTo(item.id)"
              >
                {{ item.label }}
              </a>
            </li>
          </ul>
        </nav>

        <div class="flex items-center gap-1.5">
          <!-- Wrapper (not the component root) controls responsive visibility:
               scoped component styles are unlayered and would beat utilities. -->
          <span class="hidden sm:inline-flex">
            <ThemeToggle />
          </span>

          <button
            type="button"
            class="btn btn--ghost btn--sm hidden lg:inline-flex"
            @click="openDemo('login')"
          >
            ورود
          </button>

          <button
            type="button"
            class="btn btn--primary btn--sm hidden sm:inline-flex"
            @click="openDemo('start')"
          >
            شروع یادگیری
            <AppIcon name="arrow-left" :size="16" />
          </button>

          <span class="lg:hidden">
            <button
              type="button"
              class="menu-button"
              aria-label="باز کردن منوی ناوبری"
              aria-haspopup="dialog"
              :aria-expanded="drawerOpen"
              @click="drawerOpen = true"
            >
              <AppIcon name="menu" :size="22" />
            </button>
          </span>
        </div>
      </div>
    </div>

    <!-- Mobile drawer: Vuetify handles focus trap, ESC and scroll lock. -->
    <v-navigation-drawer
      v-model="drawerOpen"
      temporary
      location="end"
      width="320"
      :scrim="true"
      class="mobile-drawer"
      aria-label="منوی ناوبری موبایل"
    >
      <div class="flex h-full flex-col gap-6 p-5">
        <div class="flex items-center justify-between">
          <BrandLogo />
          <button
            type="button"
            class="menu-button"
            aria-label="بستن منو"
            @click="drawerOpen = false"
          >
            <AppIcon name="x" :size="20" />
          </button>
        </div>

        <nav aria-label="ناوبری موبایل">
          <ul class="flex flex-col gap-1.5">
            <li v-for="item in mainNav" :key="item.id">
              <a
                :href="`#${item.id}`"
                class="drawer-link"
                :class="{ 'drawer-link--active': activeId === item.id }"
                @click.prevent="goTo(item.id)"
              >
                <span class="flex flex-col gap-0.5">
                  <span class="text-[0.95rem] font-semibold text-ink">{{ item.label }}</span>
                  <span v-if="item.description" class="text-[0.74rem] text-ink-faint">
                    {{ item.description }}
                  </span>
                </span>
                <AppIcon name="chevron-left" :size="16" class="text-ink-faint" />
              </a>
            </li>
          </ul>
        </nav>

        <div class="mt-auto flex flex-col gap-2.5">
          <button type="button" class="btn btn--primary btn--block" @click="openDemo('start')">
            شروع یادگیری
          </button>
          <button type="button" class="btn btn--outline btn--block" @click="openDemo('login')">
            ورود به حساب کاربری
          </button>
          <div class="flex items-center justify-between rounded-xl bg-surface-soft px-3 py-2">
            <span class="text-[0.8rem] text-ink-soft">حالت نمایش</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </v-navigation-drawer>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  inset-block-start: 0;
  z-index: 90;
  transition:
    background-color var(--dur-base) var(--ease-out-soft),
    box-shadow var(--dur-base) var(--ease-out-soft),
    border-color var(--dur-base) var(--ease-out-soft);
  border-block-end: 1px solid transparent;
  padding-block: 0.85rem;
}

.site-header::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: color-mix(in srgb, var(--c-bg) 82%, transparent);
  backdrop-filter: blur(14px) saturate(1.15);
  opacity: 0;
  transition: opacity var(--dur-base) var(--ease-out-soft);
}

.site-header.is-scrolled::after {
  opacity: 1;
}

.site-header.is-scrolled {
  border-block-end-color: var(--c-border);
  padding-block: 0.55rem;
  box-shadow: 0 12px 30px -28px rgb(20 20 43 / 0.6);
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.site-nav {
  display: none;
}

@media (min-width: 1024px) {
  .site-nav {
    display: block;
  }
}

.nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 0.8rem;
  border-radius: var(--r-pill);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--c-ink-soft);
  transition:
    color var(--dur-fast) var(--ease-out-soft),
    background-color var(--dur-fast) var(--ease-out-soft);
}

.nav-link:hover {
  color: var(--c-ink);
  background: color-mix(in srgb, var(--c-surface) 70%, transparent);
}

.nav-link--active {
  color: var(--c-brand);
  font-weight: 600;
}

.nav-link--active::after {
  content: '';
  position: absolute;
  inset-inline: 0.85rem;
  inset-block-end: 0.18rem;
  height: 2px;
  border-radius: 2px;
  background: var(--c-accent);
  animation: nav-underline var(--dur-base) var(--ease-out-soft) both;
}

@keyframes nav-underline {
  from {
    transform: scaleX(0.2);
    opacity: 0;
  }
  to {
    transform: scaleX(1);
    opacity: 1;
  }
}

.menu-button {
  display: inline-grid;
  place-items: center;
  width: 2.9rem;
  height: 2.9rem;
  border-radius: var(--r-md);
  border: 1px solid var(--c-border);
  background: var(--c-surface);
  color: var(--c-ink);
  box-shadow: var(--shadow-xs);
}

.menu-button:hover {
  background: var(--c-surface-soft);
}

.drawer-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  min-height: 3.25rem;
  padding: 0.7rem 0.85rem;
  border-radius: var(--r-md);
  border: 1px solid transparent;
  transition:
    background-color var(--dur-fast) var(--ease-out-soft),
    border-color var(--dur-fast) var(--ease-out-soft);
}

.drawer-link:hover {
  background: var(--c-surface-soft);
}

.drawer-link--active {
  background: var(--c-brand-soft);
  border-color: color-mix(in srgb, var(--c-brand) 22%, transparent);
}

.mobile-drawer :deep(.v-navigation-drawer__content) {
  background: var(--c-bg);
}
</style>
