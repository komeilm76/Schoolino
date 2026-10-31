<script setup lang="ts">
import { services } from '../../data/content'
import { useNavigation } from '../../composables/useNavigation'
import ServiceCard from './ServiceCard.vue'
const { openPanel } = useNavigation()
</script>
<template>
  <section id="services" class="services" aria-labelledby="services-title">
    <div class="section-heading">
      <span class="eyebrow" aria-hidden="true"></span>
      <h2 id="services-title">یک اکوسیستم، سه مسیر تحول</h2>
      <p>
        با ترکیب آموزش، هوش مصنوعی و فناوری اطلاعات، مسیر رشد افراد، سازمان‌ها و کسب‌وکارها را هموار
        می‌کنیم.
      </p>
    </div>
    <div class="service-grid">
      <ServiceCard
        v-for="service in services"
        :key="service.id"
        :service="service"
        @select="openPanel"
      />
    </div>
  </section>
</template>
