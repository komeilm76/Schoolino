<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useTitle } from '@vueuse/core'
const route = useRoute()
useTitle(
  computed(() =>
    route.meta.title ? `${route.meta.title} | آوین` : 'آوین | آینده را هوشمندانه می‌سازیم',
  ),
)
</script>
<template><RouterView /></template>
