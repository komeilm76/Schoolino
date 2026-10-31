<script setup lang="ts">
import { onMounted } from 'vue'
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import DemoNoticeHost from '@/components/layout/DemoNoticeHost.vue'
import BackToTop from '@/components/layout/BackToTop.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import StatsSection from '@/components/sections/StatsSection.vue'
import GradesSection from '@/components/sections/GradesSection.vue'
import WhySection from '@/components/sections/WhySection.vue'
import StepsSection from '@/components/sections/StepsSection.vue'
import TeachersSection from '@/components/sections/TeachersSection.vue'
import PlansSection from '@/components/sections/PlansSection.vue'
import TestimonialsSection from '@/components/sections/TestimonialsSection.vue'
import FaqSection from '@/components/sections/FaqSection.vue'
import FinalCtaSection from '@/components/sections/FinalCtaSection.vue'
import { useTheme } from '@/composables/useTheme'

const { syncTheme } = useTheme()

onMounted(() => {
  // Align the document with the persisted / system theme after hydration.
  syncTheme()
})
</script>

<template>
  <!-- v-app provides the layout context Vuetify overlays (the mobile drawer)
       need. It is styled to be visually neutral. -->
  <v-app class="app-shell">
    <a class="skip-link" href="#main">پرش به محتوای اصلی</a>

    <div id="app-content" class="app-content">
      <SiteHeader />

      <main id="main" tabindex="-1">
        <HeroSection />
        <StatsSection />
        <GradesSection />
        <WhySection />
        <StepsSection />
        <TeachersSection />
        <PlansSection />
        <TestimonialsSection />
        <FaqSection />
        <FinalCtaSection />
      </main>

      <SiteFooter />
      <BackToTop />
      <DemoNoticeHost />
    </div>
  </v-app>
</template>

<style>
/* v-app paints its own background; the design system controls the canvas. */
.app-shell {
  background: transparent !important;
}

.v-application {
  background: transparent !important;
  font-family: inherit !important;
}

/* Vuetify's layout wrapper adds a viewport-height minimum that would create
   empty space below the footer; content itself drives the document height. */
.v-application__wrap {
  min-height: 0 !important;
}

.app-content {
  min-height: 100vh;
}
</style>
