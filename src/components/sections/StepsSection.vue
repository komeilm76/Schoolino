<script setup lang="ts">
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { learningSteps } from '@/data/steps'

/** The four-step learning journey, drawn as a connected path. */
</script>

<template>
  <section id="path" class="section" aria-labelledby="path-title">
    <div class="container-page">
      <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="مسیر یادگیری"
          title="از انتخاب پایه تا دیدن پیشرفت، در چهار قدم"
          description="مسیر کوتاه است و هر قدم نتیجه مشخصی دارد؛ همین باعث می‌شود بدانی الان کجایی و قدم بعدی چیست."
        />

        <p v-reveal class="hidden items-center gap-2 text-[0.82rem] text-ink-faint lg:flex">
          <AppIcon name="clock" :size="16" />
          هر قدم کمتر از ۱۰ دقیقه وقت می‌گیرد
        </p>
      </div>

      <ol class="steps mt-12">
        <li
          v-for="(step, index) in learningSteps"
          :key="step.id"
          v-reveal="{ delay: index * 110 }"
          class="step"
        >
          <div class="step__marker">
            <span class="step__index u-latin">{{ index + 1 }}</span>
            <span class="step__icon" aria-hidden="true">
              <AppIcon :name="step.icon" :size="18" />
            </span>
          </div>

          <div class="step__body">
            <h3 class="text-[1rem] font-bold text-ink">{{ step.title }}</h3>
            <p class="text-body mt-1 text-[0.85rem]">{{ step.description }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.steps {
  position: relative;
  display: grid;
  gap: 1.25rem;
}

@media (min-width: 768px) {
  .steps {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .steps {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.5rem;
  }

  /* Dashed connector between markers */
  .steps::before {
    content: '';
    position: absolute;
    inset-block-start: 1.6rem;
    inset-inline: 3rem;
    height: 2px;
    background-image: linear-gradient(90deg, var(--c-border-strong) 0 8px, transparent 8px 16px);
    background-size: 16px 2px;
    opacity: 0.9;
  }
}

.step {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 1024px) {
  .step {
    padding-inline-end: 0.5rem;
  }
}

.step__marker {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  align-self: flex-start;
  padding: 0.35rem 0.85rem 0.35rem 0.4rem;
  border-radius: var(--r-pill);
  border: 1px solid var(--c-border);
  background: var(--c-surface);
  box-shadow: var(--shadow-xs);
  transition:
    border-color var(--dur-base) var(--ease-out-soft),
    transform var(--dur-base) var(--ease-spring);
}

.step:hover .step__marker {
  border-color: var(--c-brand-300);
  transform: translateY(-2px);
}

.step__index {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--c-ink-faint);
}

.step__icon {
  display: grid;
  place-items: center;
  width: 1.9rem;
  height: 1.9rem;
  border-radius: 50%;
  background: var(--c-brand-soft);
  color: var(--c-brand);
  transition: background-color var(--dur-base) var(--ease-out-soft);
}

.step:hover .step__icon {
  background: var(--c-brand);
  color: #fff;
}

.step__body {
  padding-inline-start: 0.15rem;
}

@media (max-width: 1023px) {
  /* Vertical rail on small screens */
  .steps {
    position: relative;
  }

  .step {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.9rem;
    align-items: start;
  }

  .step__body {
    padding-block-start: 0.35rem;
  }
}
</style>
