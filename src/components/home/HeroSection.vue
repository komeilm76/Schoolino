<script setup lang="ts">
import { useNavigation } from '../../composables/useNavigation'
import { orbitLabels as labels } from '../../data/content'
import Icon from '../ui/Icon.vue'
import HeroBackdrop from './HeroBackdrop.vue'
const { openPanel: open, showServices } = useNavigation()
</script>
<template>
  <section id="main-content" class="hero" aria-labelledby="hero-title">
    <HeroBackdrop />
    <div class="star-field" aria-hidden="true">
      <i
        v-for="n in 45"
        :key="n"
        :style="{
          left: `${(n * 37.7) % 100}%`,
          top: `${(n * 23.3) % 100}%`,
          opacity: ((n % 4) + 1) / 7,
        }"
      ></i>
    </div>
    <div class="hero-inner">
      <div class="hero-copy">
        <span class="eyebrow" aria-hidden="true"></span>
        <h1 id="hero-title">آینده را<br /><strong>هوشمندانه می‌سازیم</strong></h1>
        <p>آموزش، هوش مصنوعی، فناوری اطلاعات،<br />ویدئوی درخواستی و توسعه مسیر شغلی</p>
        <div class="hero-actions">
          <button class="button button-primary" @click="showServices">
            آشنایی با خدمات <Icon name="arrow" :size="25" /></button
          ><button class="button button-outline" @click="open('contact')">
            <Icon name="mail" /> ارتباط با ما
          </button>
        </div>
      </div>
      <div class="hero-visual">
        <div class="ecosystem-stage">
          <img
            src="/assets/ecosystem.webp"
            width="1200"
            height="896"
            alt="کره درخشان شبکه هوشمند با نمادهای آموزش، هوش مصنوعی، فناوری اطلاعات و توسعه شغلی"
            fetchpriority="high"
          />
          <button
            v-for="label in labels"
            :key="label.position"
            class="orbit-label"
            :class="label.position"
            @click="open(label.panel)"
          >
            <template v-if="label.position === 'career'">کاریابی و توسعه<br />مسیر شغلی</template
            ><template v-else>{{ label.text }}</template>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
