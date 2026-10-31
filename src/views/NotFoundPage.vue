<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
<template>
  <main dir="rtl" class="grid min-h-screen place-content-center gap-6 p-6 text-center">
    <p class="text-6xl text-cyan-400">۴۰۴</p>
    <h1 class="text-2xl font-bold">صفحه پیدا نشد</h1>
    <p>نشانی واردشده در این وب‌سایت وجود ندارد.</p>
    <RouterLink class="button button-primary" :to="{ name: 'home' }">بازگشت به خانه ←</RouterLink>
  </main>
</template>
