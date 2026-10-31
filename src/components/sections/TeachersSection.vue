<script setup lang="ts">
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import StarRating from '@/components/ui/StarRating.vue'
import type { Teacher, Tone } from '@/types/content'
import { teachers } from '@/data/teachers'
import { resolveTeacherImage } from '@/assets/teacherImages'
import { useDemoNotice } from '@/composables/useDemoNotice'
import { formatNumber } from '@/utils/format'

/**
 * Teachers showcase.
 *
 * Portraits are locally generated illustrations in one consistent style (no
 * stock photos, no external URLs). Cards lift on hover and reveal the teacher's
 * specialties, while every fact stays readable without hover.
 */
const { openNotice } = useDemoNotice()

const toneRing: Record<Tone, string> = {
  brand: 'bg-brand-soft text-brand',
  accent: 'bg-accent-soft text-accent-ink',
  mint: 'bg-mint-soft text-mint',
  coral: 'bg-coral-soft text-coral',
}

function openProfile(teacher: Teacher): void {
  openNotice({
    title: `پروفایل ${teacher.name}`,
    message:
      'صفحه اختصاصی استاد در این دمو ساخته نشده است. اطلاعات کارت‌ها نمونه است و برای نمایش ساختار محتوا طراحی شده.',
  })
}
</script>

<template>
  <section id="teachers" class="section relative overflow-hidden" aria-labelledby="teachers-title">
    <div class="teachers-wash" aria-hidden="true"></div>

    <div class="container-page relative">
      <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="اساتید اسکولینو"
          title="با کسانی یاد بگیر که درس را ساده می‌کنند"
          description="هر استاد فقط در درس تخصصی خودش تدریس می‌کند و محتوای هر جلسه پیش از انتشار بازبینی می‌شود."
        />

        <div v-reveal class="flex items-center gap-3">
          <span class="chip chip--brand">
            <AppIcon name="badge-check" :size="14" />
            گزینش تخصصی اساتید
          </span>
          <button
            type="button"
            class="link-underline text-[0.83rem]"
            @click="openProfile(teachers[0]!)"
          >
            همه اساتید
            <AppIcon name="arrow-left" :size="15" />
          </button>
        </div>
      </div>

      <ul class="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="(teacher, index) in teachers" :key="teacher.id" v-reveal="{ delay: index * 70 }">
          <article class="teacher-card group">
            <div class="teacher-card__portrait">
              <img
                :src="resolveTeacherImage(teacher.imageKey)"
                :alt="`تصویرسازی ${teacher.name}، مدرس ${teacher.subject}`"
                width="536"
                height="960"
                loading="lazy"
                decoding="async"
                class="teacher-card__image"
              />
              <span class="teacher-card__subject" :class="toneRing[teacher.tone]">
                {{ teacher.subject }}
              </span>
            </div>

            <div class="flex flex-1 flex-col p-4">
              <div class="flex items-start justify-between gap-2">
                <div>
                  <h3 class="text-[1.02rem] font-bold text-ink">{{ teacher.name }}</h3>
                  <p class="mt-0.5 text-[0.74rem] text-ink-faint">{{ teacher.level }}</p>
                </div>
                <StarRating :value="teacher.rating" :size="12" hide-value />
              </div>

              <p class="text-body mt-2.5 line-clamp-3 text-[0.82rem]">{{ teacher.bio }}</p>

              <ul class="mt-3 flex flex-wrap gap-1.5">
                <li v-for="item in teacher.specialties" :key="item" class="chip">
                  {{ item }}
                </li>
              </ul>

              <dl class="mt-4 grid grid-cols-3 gap-1 border-t border-line pt-3 text-center">
                <div>
                  <dt class="sr-only">سابقه تدریس</dt>
                  <dd class="text-[0.86rem] font-bold text-ink">
                    {{ formatNumber(teacher.experienceYears) }}
                    <span class="text-[0.66rem] font-normal text-ink-faint">سال</span>
                  </dd>
                </div>
                <div class="border-x border-line">
                  <dt class="sr-only">دانش‌آموز</dt>
                  <dd class="text-[0.86rem] font-bold text-ink">
                    {{ formatNumber(teacher.students) }}
                    <span class="text-[0.66rem] font-normal text-ink-faint">دانش‌آموز</span>
                  </dd>
                </div>
                <div>
                  <dt class="sr-only">درس ویدیویی</dt>
                  <dd class="text-[0.86rem] font-bold text-ink">
                    {{ formatNumber(teacher.lessons) }}
                    <span class="text-[0.66rem] font-normal text-ink-faint">درس</span>
                  </dd>
                </div>
              </dl>

              <button
                type="button"
                class="teacher-card__cta mt-3"
                :aria-label="`مشاهده پروفایل ${teacher.name}`"
                @click="openProfile(teacher)"
              >
                مشاهده پروفایل
                <AppIcon name="chevron-left" :size="15" />
              </button>
            </div>
          </article>
        </li>
      </ul>

      <p class="mt-6 flex items-center gap-2 text-caption">
        <AppIcon name="sparkles" :size="14" class="text-accent-strong" />
        تصاویر و پروفایل‌های این بخش نمونه و طراحی‌شده برای این دمو هستند.
      </p>
    </div>
  </section>
</template>

<style scoped>
.teachers-wash {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(
      ellipse 45% 40% at 85% 8%,
      color-mix(in srgb, var(--c-accent) 10%, transparent),
      transparent 70%
    ),
    radial-gradient(
      ellipse 40% 40% at 5% 80%,
      color-mix(in srgb, var(--c-brand) 8%, transparent),
      transparent 70%
    );
}

.teacher-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border-radius: var(--r-xl);
  border: 1px solid var(--c-border);
  background: var(--c-surface);
  box-shadow: var(--shadow-xs);
  transition:
    transform var(--dur-base) var(--ease-out-soft),
    box-shadow var(--dur-base) var(--ease-out-soft),
    border-color var(--dur-base) var(--ease-out-soft);
}

.teacher-card:hover {
  transform: translateY(-6px);
  border-color: var(--c-border-strong);
  box-shadow: var(--shadow-lg);
}

.teacher-card__portrait {
  position: relative;
  aspect-ratio: 5 / 4;
  overflow: hidden;
  background: var(--c-surface-soft);
}

.teacher-card__image {
  width: 100%;
  height: 100%;
  /* keep the face in frame: the illustrations are 9:16 with the head ~15-55% */
  object-fit: cover;
  object-position: 50% 16%;
  transition: transform 620ms var(--ease-out-soft);
}

.teacher-card:hover .teacher-card__image {
  transform: scale(1.035);
}

.teacher-card__subject {
  position: absolute;
  inset-block-end: 0.65rem;
  inset-inline-start: 0.65rem;
  padding: 0.22rem 0.65rem;
  border-radius: var(--r-pill);
  font-size: 0.72rem;
  font-weight: 600;
  backdrop-filter: blur(6px);
  box-shadow: var(--shadow-xs);
}

.teacher-card__cta {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
  min-height: 2.4rem;
  padding-inline: 0.75rem;
  border-radius: var(--r-sm);
  background: var(--c-surface-soft);
  color: var(--c-ink-soft);
  font-size: 0.8rem;
  font-weight: 600;
  transition:
    background-color var(--dur-fast) var(--ease-out-soft),
    color var(--dur-fast) var(--ease-out-soft);
}

.teacher-card__cta:hover {
  background: var(--c-brand);
  color: var(--c-action-ink);
}

@media (prefers-reduced-motion: reduce) {
  .teacher-card:hover,
  .teacher-card:hover .teacher-card__image {
    transform: none;
  }
}
</style>
