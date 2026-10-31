<script setup lang="ts">
import { computed, ref } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { useDemoNotice } from '@/composables/useDemoNotice'

/**
 * Hero product mock: a lesson player with a chapter list and a progress panel.
 *
 * It is intentionally interactive (play, lesson switching) so the hero proves
 * the product's behaviour instead of showing a static picture. Nothing here
 * pretends to stream video: pressing play explains that media is out of scope
 * for the frontend demo.
 */
interface MockLesson {
  id: string
  title: string
  duration: string
  state: 'done' | 'current' | 'todo'
}

const lessons = ref<MockLesson[]>([
  { id: 'l1', title: 'شناخت معادله درجه دوم', duration: '۹:۴۰', state: 'done' },
  { id: 'l2', title: 'روش تجزیه و ریشه‌ها', duration: '۱۲:۱۵', state: 'current' },
  { id: 'l3', title: 'حل تمرین‌های کتاب', duration: '۱۰:۰۵', state: 'todo' },
  { id: 'l4', title: 'آزمون تثبیت فصل', duration: '۶ سؤال', state: 'todo' },
])

const { openNotice } = useDemoNotice()
const activeId = ref('l2')

const activeLesson = computed(
  () => lessons.value.find((lesson) => lesson.id === activeId.value) ?? lessons.value[0],
)

const completed = computed(() => lessons.value.filter((lesson) => lesson.state === 'done').length)
const progress = computed(() => Math.round((completed.value / lessons.value.length) * 100))

function selectLesson(lesson: MockLesson): void {
  activeId.value = lesson.id
}

function play(): void {
  openNotice({
    title: 'پخش‌کننده ویدیو در دمو موجود نیست',
    message:
      'این کارت فقط رفتار مسیر یادگیری را نمایش می‌دهد. پخش ویدیو در نسخه نهایی به سرور محتوا و احراز اشتراک متصل می‌شود.',
  })
}

/** Weekly activity bars (demo data), height in percent. */
const weekBars = [38, 62, 45, 78, 56, 92, 70]
const weekDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']
</script>

<template>
  <div class="lesson-card">
    <div class="lesson-card__head">
      <div class="flex items-center gap-2">
        <span class="lesson-card__chip">
          <AppIcon name="calculator" :size="13" />
          ریاضی · پایه نهم
        </span>
        <span class="lesson-card__live">
          <span class="lesson-card__live-dot" aria-hidden="true"></span>
          در حال یادگیری
        </span>
      </div>
      <span class="u-latin text-[0.72rem] font-semibold text-ink-faint">فصل ۳ / ۶</span>
    </div>

    <!-- Player -->
    <div class="player">
      <div class="player__grid" aria-hidden="true"></div>
      <div class="player__content">
        <p class="player__kicker">درس سوم از نُه درس</p>
        <p class="player__title">{{ activeLesson?.title }}</p>
      </div>

      <button type="button" class="player__play" aria-label="پخش ویدیو (نمایشی)" @click="play">
        <AppIcon name="play" :size="20" :stroke-width="2.2" />
      </button>

      <div class="player__meta">
        <span>{{ activeLesson?.duration }}</span>
        <span>کیفیت ۱۰۸۰p</span>
      </div>

      <div
        class="player__progress"
        role="progressbar"
        :aria-valuenow="progress"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="پیشرفت این فصل"
      >
        <span class="player__progress-fill" :style="{ width: `${progress}%` }"></span>
      </div>
    </div>

    <!-- Lesson list -->
    <ul class="lesson-list" aria-label="فهرست جلسه‌های فصل">
      <li v-for="lesson in lessons" :key="lesson.id">
        <button
          type="button"
          class="lesson-row"
          :class="{ 'lesson-row--active': lesson.id === activeId }"
          :aria-current="lesson.id === activeId ? 'true' : undefined"
          @click="selectLesson(lesson)"
        >
          <span class="lesson-row__status" :class="`lesson-row__status--${lesson.state}`">
            <AppIcon
              :name="
                lesson.state === 'done' ? 'check' : lesson.state === 'current' ? 'play' : 'minus'
              "
              :size="12"
              :stroke-width="2.4"
            />
          </span>
          <span class="min-w-0 flex-1 truncate text-[0.82rem] font-medium">
            {{ lesson.title }}
          </span>
          <span class="u-latin text-[0.7rem] text-ink-faint">{{ lesson.duration }}</span>
        </button>
      </li>
    </ul>

    <!-- Footer summary -->
    <div class="lesson-card__foot">
      <div class="flex items-center gap-2 text-[0.74rem] font-semibold text-ink-soft">
        <AppIcon name="chart-line" :size="15" class="text-mint" />
        <span>{{ completed }} جلسه تکمیل شده</span>
      </div>
      <span class="chip chip--mint">{{ progress }}٪ پیشرفت</span>
    </div>

    <!-- Weekly activity strip (kept inside the card so nothing overlaps) -->
    <div class="week-strip">
      <div class="flex items-center justify-between">
        <p class="text-[0.72rem] font-bold text-ink">فعالیت این هفته</p>
        <span class="chip chip--accent">+۱۲٪</span>
      </div>

      <div class="mt-2 flex items-end justify-between gap-1.5" aria-hidden="true">
        <span
          v-for="(bar, index) in weekBars"
          :key="index"
          class="week-bar"
          :class="{ 'week-bar--today': index === 5 }"
          :style="{ height: `${bar * 0.42}px` }"
        ></span>
      </div>

      <div class="mt-1 flex justify-between text-[0.58rem] text-ink-faint" aria-hidden="true">
        <span v-for="(day, index) in weekDays" :key="index">{{ day }}</span>
      </div>

      <p class="sr-only">نمودار نمونه فعالیت هفتگی؛ بیشترین فعالیت در روز پنجم هفته ثبت شده است.</p>
    </div>
  </div>
</template>

<style scoped>
.lesson-card {
  position: relative;
  width: 100%;
  max-width: 30rem;
  margin-inline: auto;
  padding: 1rem;
  border-radius: var(--r-2xl);
  border: 1px solid var(--c-border);
  background: var(--c-surface);
  box-shadow: var(--shadow-xl);
}

@media (min-width: 1024px) {
  .lesson-card {
    margin-inline: 0;
    transform: rotate(-1.1deg);
    transition: transform var(--dur-slow) var(--ease-out-soft);
  }

  .lesson-card:hover {
    transform: rotate(0deg) translateY(-4px);
  }
}

.lesson-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.15rem 0.35rem 0.85rem;
}

.lesson-card__chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.28rem 0.6rem;
  border-radius: var(--r-pill);
  background: var(--c-brand-soft);
  color: var(--c-brand-ink);
  font-size: 0.72rem;
  font-weight: 600;
}

.lesson-card__live {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--c-mint);
}

.lesson-card__live-dot {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--c-mint) 18%, transparent);
}

.player {
  position: relative;
  overflow: hidden;
  border-radius: var(--r-lg);
  background:
    radial-gradient(circle at 78% 18%, rgb(87 65 214 / 0.55), transparent 55%),
    radial-gradient(circle at 12% 92%, rgb(244 166 42 / 0.32), transparent 52%), #17163a;
  color: #f7f4ec;
  padding: 1rem;
  padding-block-end: 1.75rem;
  min-height: 10.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.player__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgb(255 255 255 / 0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(255 255 255 / 0.06) 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: radial-gradient(circle at 50% 50%, #000, transparent 78%);
  -webkit-mask-image: radial-gradient(circle at 50% 50%, #000, transparent 78%);
}

.player__content {
  position: relative;
  max-width: 68%;
}

.player__kicker {
  font-size: 0.68rem;
  color: #b9b3e8;
  margin-block-end: 0.2rem;
}

.player__title {
  font-family: 'Estedad Variable', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.6;
  color: #fdfaf3;
}

.player__play {
  position: absolute;
  inset-block-start: 50%;
  inset-inline-end: 1rem;
  transform: translateY(-50%);
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: #fdfaf3;
  color: #17163a;
  box-shadow: 0 12px 26px -14px rgb(0 0 0 / 0.9);
  transition:
    transform var(--dur-base) var(--ease-spring),
    background-color var(--dur-base) var(--ease-out-soft);
}

.player__play:hover {
  transform: translateY(-50%) scale(1.07);
  background: var(--c-accent);
}

.player__meta {
  position: relative;
  display: flex;
  justify-content: space-between;
  font-size: 0.66rem;
  color: #bab5e0;
  margin-block-start: 0.85rem;
  direction: ltr;
}

.player__progress {
  position: absolute;
  inset-inline: 0;
  inset-block-end: 0;
  height: 4px;
  background: rgb(255 255 255 / 0.14);
}

.player__progress-fill {
  display: block;
  height: 100%;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--c-accent), #ffd28a);
  transition: width var(--dur-slow) var(--ease-out-soft);
}

.lesson-list {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-block: 0.75rem;
}

.lesson-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  min-height: 2.5rem;
  padding: 0.45rem 0.6rem;
  border-radius: var(--r-sm);
  color: var(--c-ink-soft);
  text-align: start;
  transition:
    background-color var(--dur-fast) var(--ease-out-soft),
    color var(--dur-fast) var(--ease-out-soft);
}

.lesson-row:hover {
  background: var(--c-surface-soft);
  color: var(--c-ink);
}

.lesson-row--active {
  background: var(--c-brand-soft);
  color: var(--c-brand-ink);
  font-weight: 600;
}

.lesson-row__status {
  display: grid;
  place-items: center;
  width: 1.35rem;
  height: 1.35rem;
  flex-shrink: 0;
  border-radius: 50%;
  border: 1px solid var(--c-border);
  color: var(--c-ink-faint);
  background: var(--c-surface);
}

.lesson-row__status--done {
  background: var(--c-mint-soft);
  border-color: transparent;
  color: var(--c-mint);
}

.lesson-row__status--current {
  background: var(--c-brand);
  border-color: transparent;
  color: #fff;
}

.lesson-card__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.7rem 0.5rem 0.25rem;
  border-block-start: 1px solid var(--c-border);
}

.week-strip {
  margin-block-start: 0.45rem;
  padding: 0.7rem 0.75rem 0.5rem;
  border-radius: var(--r-md);
  background: var(--c-surface-soft);
}

.week-bar {
  flex: 1;
  border-radius: 4px;
  background: color-mix(in srgb, var(--c-brand) 24%, transparent);
  transition: background-color var(--dur-base) var(--ease-out-soft);
}

.week-bar--today {
  background: var(--c-brand);
}

@media (prefers-reduced-motion: reduce) {
  .lesson-card,
  .lesson-card:hover,
  .player__play:hover {
    transform: none;
  }

  .lesson-card {
    transform: rotate(-1.1deg);
  }
}
</style>
