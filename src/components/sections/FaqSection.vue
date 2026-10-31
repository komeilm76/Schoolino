<script setup lang="ts">
import { ref } from 'vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { faqs } from '@/data/faqs'
import { useDemoNotice } from '@/composables/useDemoNotice'

/**
 * FAQ accordion built on Vuetify's `v-expansion-panels`, which already provides
 * the keyboard model (Enter/Space, roving focus) and the correct
 * `aria-expanded` / `aria-controls` wiring. Styling is overridden with our own
 * tokens so it matches the rest of the page.
 */
const openPanels = ref<number[]>([0])
const { openNotice } = useDemoNotice()
</script>

<template>
  <section id="faq" class="section" aria-labelledby="faq-title">
    <div class="container-page">
      <div class="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div class="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="سؤالات متداول"
            title="هر چیزی که قبل از شروع لازم است بدانی"
            description="اگر پاسخ سوالت اینجا نبود، بپرس؛ در نسخه واقعی تیم پشتیبانی پاسخ می‌دهد."
          />

          <div class="mt-6 flex flex-col gap-3">
            <button
              type="button"
              class="btn btn--soft self-start"
              @click="
                openNotice({
                  title: 'پشتیبانی',
                  message:
                    'این دمو فرم تماس واقعی ندارد. در نسخه نهایی، تیکت پشتیبانی و گفت‌وگوی زنده در دسترس خواهد بود.',
                })
              "
            >
              <AppIcon name="message-circle-question-mark" :size="17" />
              سوالت را بپرس
            </button>

            <div class="rounded-2xl border border-line bg-surface-soft p-4">
              <p class="text-[0.8rem] font-semibold text-ink">هنوز مطمئن نیستی؟</p>
              <p class="mt-1 text-[0.8rem] leading-7 text-ink-soft">
                از پایه‌های تحصیلی شروع کن و ببین کدام مسیر به شرایط تو نزدیک‌تر است.
              </p>
              <a
                href="#grades"
                class="link-underline mt-2 inline-flex min-h-6 items-center py-1 text-[0.8rem]"
              >
                مشاهده پایه‌ها
                <AppIcon name="arrow-left" :size="14" />
              </a>
            </div>
          </div>
        </div>

        <div v-reveal>
          <v-expansion-panels
            v-model="openPanels"
            multiple
            variant="accordion"
            flat
            class="faq-panels"
          >
            <v-expansion-panel
              v-for="item in faqs"
              :key="item.id"
              :value="faqs.indexOf(item)"
              class="faq-panel"
            >
              <v-expansion-panel-title class="faq-title">
                <span class="text-[0.94rem] font-semibold text-ink">{{ item.question }}</span>
              </v-expansion-panel-title>

              <v-expansion-panel-text>
                <p class="pb-1 text-[0.87rem] leading-8 text-ink-soft">{{ item.answer }}</p>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-panels {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  background: transparent;
}

.faq-panel {
  border: 1px solid var(--c-border);
  border-radius: var(--r-lg) !important;
  background: var(--c-surface);
  overflow: hidden;
  transition:
    border-color var(--dur-base) var(--ease-out-soft),
    box-shadow var(--dur-base) var(--ease-out-soft);
}

.faq-panel:hover {
  border-color: var(--c-border-strong);
}

.faq-panel:has(.v-expansion-panel-title--active) {
  border-color: color-mix(in srgb, var(--c-brand) 32%, transparent);
  box-shadow: var(--shadow-sm);
}

.faq-title {
  min-height: 3.7rem;
  padding-inline: 1.1rem;
  font-size: 0.94rem;
  font-weight: 600;
}

.faq-panel :deep(.v-expansion-panel-title__icon) {
  color: var(--c-ink-faint);
}

.faq-panel :deep(.v-expansion-panel-text__wrapper) {
  padding: 0 1.1rem 1rem;
}
</style>
