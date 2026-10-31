<script setup lang="ts">
import { ref } from 'vue'
import { useNavigation } from '../../composables/useNavigation'
import Icon from '../ui/Icon.vue'
import Brand from '../ui/Brand.vue'
const menu = ref(false)
const { openPanel, goHome, showServices } = useNavigation()
function open(value: Parameters<typeof openPanel>[0]) {
  menu.value = false
  return openPanel(value)
}
</script>
<template>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand-link" href="#" aria-label="آوین — خانه" @click.prevent="goHome"><Brand /></a>
      <nav class="desktop-nav" aria-label="منوی اصلی">
        <a class="active" href="#" @click.prevent="goHome">خانه</a>
        <button @click="open('about')">درباره آوین</button>
        <a href="#services" @click.prevent="showServices">حوزه‌های فعالیت</a>
        <button @click="open('solutions')">راهکارها</button>
        <button @click="open('contact')">تماس با ما</button>
      </nav>
      <button class="button button-primary header-cta" @click="open('cooperate')">
        شروع همکاری <Icon name="arrow" />
      </button>
      <button
        class="menu-toggle"
        :aria-expanded="menu"
        aria-controls="mobile-nav"
        :aria-label="menu ? 'بستن فهرست' : 'باز کردن فهرست'"
        @click="menu = !menu"
      >
        <Icon :name="menu ? 'close' : 'menu'" />
      </button>
    </div>
    <nav v-if="menu" id="mobile-nav" class="mobile-nav" aria-label="منوی موبایل">
      <a href="#" @click="menu = false">خانه</a><button @click="open('about')">درباره آوین</button
      ><a href="#services" @click="menu = false">حوزه‌های فعالیت</a
      ><button @click="open('solutions')">راهکارها</button
      ><button @click="open('contact')">تماس با ما</button
      ><button @click="open('cooperate')">شروع همکاری</button>
    </nav>
  </header>
</template>
