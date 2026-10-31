<script setup lang="ts">
import { computed, ref } from 'vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import LevelGlyph from '@/components/ui/LevelGlyph.vue'
import type { EducationLevel } from '@/types/content'
import { educationLevels } from '@/data/levels'
import { useDemoNotice } from '@/composables/useDemoNotice'
import { formatNumber } from '@/utils/format'

/**
 * Grade selection.
 *
 * Three levels, each exposing its grades as real buttons. Choosing a grade
 * updates one detail panel (announced politely so screen-reader users hear the
 * change) instead of navigating away — this is a single-page demo.
 */
const { openNotice } = useDemoNotice()

const defaultLevel = educationLevels[1] ?? educationLevels[0]
const selectedLevelId = ref(defaultLevel?.id ?? 'middle')
const selectedGrade = ref<number>(defaultLevel?.grades.at(-1)?.value ?? 9)

const selectedLevel = computed<EducationLevel>(
  () => educationLevels.find((level) => level.id === selectedLevelId.value) ?? educationLevels[0]!,
)

const selectedGradeLabel = computed(
  () => selectedLevel.value.grades.find((g) => g.value === selectedGrade.value)?.label ?? '',
)

function selectLevel(level: EducationLevel): void {
  selectedLevelId.value = level.id
  if (!level.grades.some((grade) => grade.value === selectedGrade.value)) {
    selectedGrade.value = level.grades[0]?.value ?? 1
  }
}

function selectGrade(level: EducationLevel, value: number): void {
  selectedLevelId.value = level.id
  selectedGrade.value = value
}

function startGrade(): void {
  openNotice({
    title: `پایه ${selectedGradeLabel.value} · ${selectedLevel.value.title}`,
    message:
      'ثبت‌نام پایه در این دمو انجام نمی‌شود. این انتخاب نشان می‌دهد مسیر پایه‌محور محصول چطور کار می‌کند.',
  })
}

const toneStyles: Record<EducationLevel['tone'], { ring: string; soft: string; text: string }> = {
  brand: {
    ring: 'hover:border-brand/45',
    soft: 'bg-brand-soft',
    text: 'text-brand',
  },
  accent: {
    ring: 'hover:border-accent/60',
    soft: 'bg-accent-soft',
    text: 'text-accent-strong',
  },
  mint: {
    ring: 'hover:border-mint/50',
    soft: 'bg-mint-soft',
    text: 'text-mint',
  },
  coral: {
    ring: 'hover:border-coral/50',
    soft: 'bg-coral-soft',
    text: 'text-coral',
  },
}
</script>

<template>
  <section id="grades" class="section relative" aria-labelledby="grades-title">
    <div class="container-page">
      <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="پایه‌های تحصیلی"
          title="پایه‌ات را انتخاب کن"
          description="از اول دبستان تا دوازدهم، هر پایه مسیر درسی خودش را دارد؛ با همان سطح دشواری و همان هدفی که پیش رو داری."
        />

        <p
          v-reveal
          class="flex max-w-xs items-start gap-2.5 rounded-2xl border border-line bg-surface/70 p-3.5 text-[0.8rem] leading-7 text-ink-soft"
        >
          <AppIcon name="lightbulb" :size="18" class="mt-1 text-accent-strong" />
          روی هر پایه بزن تا تعداد درس‌ها، ساعت آموزش و ویژگی‌های همان مسیر را ببینی.
        </p>
      </div>

      <div class="mt-10 grid gap-4 md:grid-cols-3">
        <article
          v-for="(level, index) in educationLevels"
          :key="level.id"
          v-reveal="{ delay: index * 90 }"
          class="level-card card group"
          :class="[
            toneStyles[level.tone].ring,
            selectedLevelId === level.id ? 'level-card--selected' : '',
          ]"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <p class="text-[0.74rem] font-semibold text-ink-faint">{{ level.range }}</p>
              <h3 class="mt-1 text-[1.28rem] font-bold text-ink">{{ level.title }}</h3>
            </div>

            <div class="h-16 w-16 shrink-0 transition-transform duration-500 group-hover:scale-110">
              <LevelGlyph :variant="level.variant" :tone="level.tone" />
            </div>
          </div>

          <p class="mt-3 text-[0.84rem] font-medium" :class="toneStyles[level.tone].text">
            {{ level.tagline }}
          </p>
          <p class="text-body mt-1.5 text-[0.83rem]">{{ level.description }}</p>

          <div
            class="mt-4 flex flex-wrap gap-1.5"
            role="group"
            :aria-label="`انتخاب پایه در دوره ${level.title}`"
          >
            <button
              v-for="grade in level.grades"
              :key="grade.value"
              type="button"
              class="grade-chip"
              :class="
                selectedLevelId === level.id && selectedGrade === grade.value
                  ? 'grade-chip--active'
                  : ''
              "
              :aria-pressed="selectedLevelId === level.id && selectedGrade === grade.value"
              @click="selectGrade(level, grade.value)"
            >
              {{ grade.label }}
            </button>
          </div>

          <button
            type="button"
            class="mt-4 inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-ink-soft transition-colors hover:text-ink"
            @click="selectLevel(level)"
          >
            <AppIcon name="arrow-left" :size="15" />
            انتخاب دوره {{ level.title }}
          </button>
        </article>
      </div>

      <!-- Detail panel for the current selection -->
      <div
        v-reveal
        class="selection-panel card card--raised mt-5 overflow-hidden"
        aria-live="polite"
      >
        <div class="selection-panel__head">
          <div class="flex items-center gap-3">
            <span class="chip chip--brand">
              {{ `${selectedLevel.title} · پایه ${selectedGradeLabel}` }}
            </span>
            <p class="text-[0.8rem] text-ink-faint">{{ selectedLevel.range }}</p>
          </div>

          <button type="button" class="btn btn--primary btn--sm" @click="startGrade">
            شروع پایه {{ selectedGradeLabel }}
            <AppIcon name="arrow-left" :size="15" />
          </button>
        </div>

        <div class="grid gap-5 p-4 pt-0 sm:p-6 sm:pt-0 lg:grid-cols-[1.4fr_1fr]">
          <ul class="grid gap-2.5">
            <li
              v-for="highlight in selectedLevel.highlights"
              :key="highlight"
              class="flex items-start gap-2.5 text-[0.86rem] leading-7 text-ink-soft"
            >
              <span class="check-dot" aria-hidden="true">
                <AppIcon name="check" :size="12" :stroke-width="2.6" />
              </span>
              {{ highlight }}
            </li>
          </ul>

          <dl class="grid grid-cols-3 gap-2 rounded-2xl bg-surface-soft p-3">
            <div class="text-center">
              <dt class="text-[0.68rem] text-ink-faint">درس ویدیویی</dt>
              <dd class="u-latin mt-1 text-[1.05rem] font-bold text-ink" dir="ltr">
                {{ formatNumber(selectedLevel.stats.lessons) }}
              </dd>
            </div>
            <div class="border-x border-line text-center">
              <dt class="text-[0.68rem] text-ink-faint">ساعت آموزش</dt>
              <dd class="u-latin mt-1 text-[1.05rem] font-bold text-ink" dir="ltr">
                {{ formatNumber(selectedLevel.stats.hours) }}
              </dd>
            </div>
            <div class="text-center">
              <dt class="text-[0.68rem] text-ink-faint">دانش‌آموز</dt>
              <dd class="u-latin mt-1 text-[1.05rem] font-bold text-ink" dir="ltr">
                {{ formatNumber(selectedLevel.stats.students) }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.level-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  border-radius: var(--r-xl);
  transition:
    transform var(--dur-base) var(--ease-out-soft),
    box-shadow var(--dur-base) var(--ease-out-soft),
    border-color var(--dur-base) var(--ease-out-soft);
}

.level-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.level-card--selected {
  border-color: color-mix(in srgb, var(--c-brand) 42%, transparent);
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--c-brand) 16%, transparent),
    var(--shadow-md);
}

.level-card--selected::before {
  content: '';
  position: absolute;
  inset-inline: 1.25rem;
  inset-block-start: 0;
  height: 3px;
  border-radius: 0 0 3px 3px;
  background: linear-gradient(90deg, var(--c-brand), var(--c-accent));
}

.grade-chip {
  min-width: 2.75rem;
  min-height: 2.25rem;
  padding: 0.25rem 0.6rem;
  border-radius: var(--r-pill);
  border: 1px solid var(--c-border);
  background: var(--c-surface);
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--c-ink-soft);
  transition:
    background-color var(--dur-fast) var(--ease-out-soft),
    color var(--dur-fast) var(--ease-out-soft),
    border-color var(--dur-fast) var(--ease-out-soft),
    transform var(--dur-fast) var(--ease-out-soft);
}

.grade-chip:hover {
  border-color: var(--c-brand-300);
  color: var(--c-brand);
  transform: translateY(-1px);
}

.grade-chip--active {
  background: var(--c-brand);
  border-color: var(--c-brand);
  color: var(--c-action-ink);
  font-weight: 600;
}

.selection-panel {
  border-radius: var(--r-xl);
}

.selection-panel__head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1rem 1rem;
}

@media (min-width: 640px) {
  .selection-panel__head {
    padding: 1.1rem 1.5rem;
  }
}

.check-dot {
  display: grid;
  place-items: center;
  width: 1.3rem;
  height: 1.3rem;
  flex-shrink: 0;
  margin-block-start: 0.35rem;
  border-radius: 50%;
  background: var(--c-mint-soft);
  color: var(--c-mint);
}
</style>
