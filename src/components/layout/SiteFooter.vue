<script setup lang="ts">
import BrandLogo from '@/components/ui/BrandLogo.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { footerNav, socials } from '@/data/navigation'
import { educationLevels } from '@/data/levels'
import { site } from '@/data/site'
import { useDemoNotice } from '@/composables/useDemoNotice'
import { scrollToSection } from '@/utils/scroll'

/**
 * Footer.
 *
 * Contact details are explicit placeholders (per the brief, no invented company
 * data). Social links open the honest demo notice instead of a dead `#` link.
 */
const { openNotice } = useDemoNotice()

function openSocial(label: string): void {
  openNotice({
    title: `صفحه ${label}`,
    message: 'شبکه‌های اجتماعی در این دمو فعال نیستند و لینک واقعی وجود ندارد.',
  })
}
</script>

<template>
  <footer class="site-footer" aria-labelledby="footer-heading">
    <h2 id="footer-heading" class="sr-only">اطلاعات پایین صفحه</h2>

    <div class="container-page">
      <div class="grid gap-10 py-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr] lg:gap-8">
        <div>
          <BrandLogo />
          <p class="mt-4 max-w-xs text-[0.84rem] leading-8 text-ink-soft">
            {{ site.description }}
          </p>

          <div class="mt-4 flex gap-2">
            <button
              v-for="social in socials"
              :key="social.id"
              type="button"
              class="social-btn"
              :aria-label="social.label"
              :title="social.label"
              @click="openSocial(social.label)"
            >
              <AppIcon :name="social.icon" :size="17" />
            </button>
          </div>
        </div>

        <nav aria-label="لینک‌های سریع">
          <h3 class="footer-title">دسترسی سریع</h3>
          <ul class="mt-3 flex flex-col gap-2">
            <li v-for="item in footerNav" :key="item.id">
              <a
                :href="`#${item.id}`"
                class="footer-link"
                @click.prevent="scrollToSection(item.id, { focus: true })"
              >
                {{ item.label }}
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label="دوره‌های تحصیلی">
          <h3 class="footer-title">دوره‌های تحصیلی</h3>
          <ul class="mt-3 flex flex-col gap-2">
            <li v-for="level in educationLevels" :key="level.id">
              <a
                href="#grades"
                class="footer-link"
                @click.prevent="scrollToSection('grades', { focus: true })"
              >
                {{ level.title }}
                <span class="text-[0.7rem] text-ink-faint">{{ level.range }}</span>
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h3 class="footer-title">ارتباط با ما</h3>
          <ul class="mt-3 flex flex-col gap-2.5 text-[0.82rem]">
            <li class="flex items-center gap-2 text-ink-soft">
              <AppIcon name="mail" :size="15" class="text-ink-faint" />
              <span dir="ltr" class="u-latin text-[0.78rem]">{{ site.demoEmail }}</span>
            </li>
            <li class="flex items-center gap-2 text-ink-soft">
              <AppIcon name="phone" :size="15" class="text-ink-faint" />
              <span>{{ site.demoPhone }}</span>
            </li>
            <li class="flex items-start gap-2 text-ink-faint">
              <AppIcon name="clock" :size="15" class="mt-1" />
              <span class="text-[0.78rem] leading-7">پاسخ‌گویی روزهای کاری، ساعت ۹ تا ۱۷</span>
            </li>
          </ul>

          <p class="mt-4 rounded-xl bg-surface-soft p-3 text-[0.72rem] leading-6 text-ink-faint">
            {{ site.demoNote }}
          </p>
        </div>
      </div>

      <div class="hairline"></div>

      <div class="flex flex-col items-start justify-between gap-3 py-5 sm:flex-row sm:items-center">
        <p class="text-[0.76rem] text-ink-faint">
          © {{ site.copyrightYear }} {{ site.name }} — تمام حقوق برای این پروژه نمایشی محفوظ است.
        </p>

        <div class="flex items-center gap-4 text-[0.74rem] text-ink-faint">
          <button
            type="button"
            class="inline-flex min-h-6 items-center px-1 py-1 transition-colors hover:text-ink"
            @click="
              openNotice({
                title: 'قوانین استفاده',
                message:
                  'صفحه قوانین در این دمو وجود ندارد؛ این بخش فقط برای نمایش ساختار فوتر است.',
              })
            "
          >
            قوانین و مقررات
          </button>
          <button
            type="button"
            class="inline-flex min-h-6 items-center px-1 py-1 transition-colors hover:text-ink"
            @click="
              openNotice({
                title: 'حریم خصوصی',
                message:
                  'صفحه حریم خصوصی در این دمو وجود ندارد؛ این بخش فقط برای نمایش ساختار فوتر است.',
              })
            "
          >
            حریم خصوصی
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  position: relative;
  border-block-start: 1px solid var(--c-border);
  background:
    radial-gradient(
      ellipse 40% 60% at 80% 0%,
      color-mix(in srgb, var(--c-brand) 7%, transparent),
      transparent 70%
    ),
    var(--c-surface-soft);
}

.footer-title {
  font-size: 0.86rem;
  font-weight: 700;
  color: var(--c-ink);
}

.footer-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  color: var(--c-ink-soft);
  transition: color var(--dur-fast) var(--ease-out-soft);
}

.footer-link:hover {
  color: var(--c-brand);
}

.social-btn {
  display: grid;
  place-items: center;
  width: 2.3rem;
  height: 2.3rem;
  border-radius: var(--r-md);
  border: 1px solid var(--c-border);
  background: var(--c-surface);
  color: var(--c-ink-soft);
  transition:
    color var(--dur-fast) var(--ease-out-soft),
    background-color var(--dur-fast) var(--ease-out-soft),
    transform var(--dur-fast) var(--ease-out-soft);
}

.social-btn:hover {
  color: var(--c-brand);
  background: var(--c-brand-soft);
  transform: translateY(-2px);
}
</style>
