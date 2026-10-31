<script setup lang="ts">
import { RouterView } from 'vue-router'
import SiteHeader from '../components/layout/SiteHeader.vue'
import HeroSection from '../components/home/HeroSection.vue'
import ServicesSection from '../components/home/ServicesSection.vue'
</script>
<template>
  <main dir="rtl">
    <a href="#main-content" class="skip-link">رفتن به محتوای اصلی</a>
    <SiteHeader />
    <HeroSection />
    <ServicesSection />
    <RouterView v-slot="{ Component, route }"
      ><component :is="Component" :key="route.path"
    /></RouterView>
  </main>
</template>
