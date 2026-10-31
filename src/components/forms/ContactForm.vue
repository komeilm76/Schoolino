<script setup lang="ts">
import { computed } from 'vue'
import { usePreferredReducedMotion } from '@vueuse/core'
import { VBtn, VTextField, VTextarea } from 'vuetify/components'
import { useContactForm } from '../../composables/useContactForm'
const { name, email, message, submitted, error, submit } = useContactForm()
const reducedMotion = usePreferredReducedMotion()
const confirmationMotion = computed(() =>
  reducedMotion.value === 'reduce'
    ? { initial: { opacity: 1 }, enter: { opacity: 1 } }
    : { initial: { opacity: 0 }, enter: { opacity: 1, transition: { duration: 160 } } },
)
</script>
<template>
  <div v-if="submitted" v-motion="confirmationMotion" role="status" class="confirmation">
    <span>✓</span>
    <h3>اطلاعات شما بررسی شد</h3>
    <p>
      این فرم نسخه نمایشی است؛ پیام شما ارسال یا ذخیره نشده است. ارسال پیام پس از اتصال سرویس
      ارتباطی فعال خواهد شد.
    </p>
    <VBtn color="primary" variant="outlined" @click="submitted = false">بازگشت به فرم</VBtn>
  </div>
  <form v-else novalidate @submit.prevent="submit">
    <p class="form-intro">از ایده‌ها و نیازهای خود برای ما بنویسید.</p>
    <VTextField v-model="name" label="نام و نام خانوادگی" autocomplete="name" variant="outlined" />
    <VTextField
      v-model="email"
      label="ایمیل"
      type="email"
      autocomplete="email"
      variant="outlined"
      dir="ltr"
    />
    <VTextarea v-model="message" label="پیام شما" variant="outlined" rows="4" />
    <p v-if="error" class="form-error" role="alert">{{ error }}</p>
    <p class="demo-note">نسخه نمایشی — اطلاعات ارسال یا ذخیره نمی‌شود.</p>
    <VBtn type="submit" color="primary" size="large">بررسی پیام ←</VBtn>
  </form>
</template>
