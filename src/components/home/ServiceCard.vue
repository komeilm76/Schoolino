<script setup lang="ts">
import type { Service, ServiceId } from '../../data/content'
import Icon from '../ui/Icon.vue'
defineProps<{ service: Service }>()
const emit = defineEmits<{ select: [id: ServiceId] }>()
</script>
<template>
  <article class="service-card">
    <div class="service-content">
      <h3>
        <span class="service-icon"><Icon :name="service.id" :size="20" /></span>{{ service.title }}
      </h3>
      <p>{{ service.description }}</p>
      <button class="more-link" @click="emit('select', service.id)">
        مشاهده بیشتر <Icon name="arrow" :size="20" />
      </button>
    </div>
    <img
      class="service-image"
      :src="`/assets/${service.id}.webp`"
      :alt="''"
      width="240"
      height="240"
      loading="lazy"
    />
  </article>
</template>
