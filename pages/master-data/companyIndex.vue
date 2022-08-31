<template>
  <companyPage />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import companyPage from '@/components/MasterDataPage/companyPage.vue'

export default defineComponent({
  components: {
    companyPage,
  },
  setup() {},
})
</script>
