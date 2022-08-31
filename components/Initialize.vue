<template>
  <a-config-provider :locale="locales[$i18n.locale]">
    <slot />
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import enUS from 'ant-design-vue/lib/locale-provider/en_US'
import thTH from 'ant-design-vue/lib/locale-provider/th_TH'

export default defineComponent({
  setup() {
    const locales = ref({
      en: enUS,
      th: thTH,
    })

    return {
      locales,
    }
  },
})
</script>
