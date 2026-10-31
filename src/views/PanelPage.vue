<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { VDialog, VCard, VCardText, VBtn } from 'vuetify/components'
import { services, panelTitles } from '../data/content'
import { useNavigation } from '../composables/useNavigation'
import ContactForm from '../components/forms/ContactForm.vue'
const route = useRoute(),
  router = useRouter()
const panel = computed(() => route.meta.panel)
const selected = computed(() => services.find((service) => service.id === panel.value))
const isContact = computed(() => panel.value === 'contact' || panel.value === 'cooperate')
const title = computed(() => (panel.value ? panelTitles[panel.value] : 'آوین'))
const { openPanel: open } = useNavigation()
const visible = ref(true)
const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
/** Close to home; browser Back/Forward also controls the dialog through its route. */
async function close() {
  visible.value = false
  await router.push({ name: 'home' })
}
onBeforeUnmount(() => {
  void nextTick(() => {
    if (opener?.isConnected) opener.focus({ preventScroll: true })
  })
})
</script>
<template>
  <VDialog
    :close-on-back="false"
    :model-value="visible"
    max-width="650"
    aria-labelledby="panel-title"
    @update:model-value="close"
  >
    <VCard class="detail-card" dir="rtl" rounded="xl">
      <div class="dialog-header">
        <h2 id="panel-title">{{ title }}</h2>
        <VBtn icon variant="text" aria-label="بستن" @click="close">×</VBtn>
      </div>
      <VCardText>
        <ContactForm v-if="isContact" />
        <template v-else-if="selected">
          <p class="detail-description">{{ selected.description }}</p>
          <ul class="detail-list">
            <li v-for="detail in selected.details" :key="detail">{{ detail }}</li>
          </ul>
          <VBtn color="primary" variant="outlined" @click="open('cooperate')"
            >گفت‌وگو درباره همکاری ←</VBtn
          >
        </template>
        <template v-else-if="panel === 'about'">
          <p class="detail-description">آینده را هوشمندانه می‌سازیم.</p>
          <p>
            آوین، یک اکوسیستم برای آموزش، هوش مصنوعی و فناوری اطلاعات است. با ترکیب دانش و فناوری،
            مسیر رشد افراد، سازمان‌ها و کسب‌وکارها را هموار می‌کنیم.
          </p>
          <VBtn class="mt-6" color="primary" variant="outlined" @click="open('services')"
            >آشنایی با خدمات ←</VBtn
          >
        </template>
        <template v-else>
          <p class="mb-6">
            {{
              panel === 'solutions'
                ? 'راهکارهای یکپارچه برای یادگیری، رشد و تحول دیجیتال.'
                : 'یک اکوسیستم، سه مسیر تحول'
            }}
          </p>
          <button
            v-for="service in services"
            :key="service.id"
            class="service-option"
            @click="open(service.id)"
          >
            <strong>{{ service.title }}</strong
            ><span>{{ service.description }}</span
            ><b>مشاهده بیشتر ←</b>
          </button>
        </template>
      </VCardText>
    </VCard>
  </VDialog>
</template>
