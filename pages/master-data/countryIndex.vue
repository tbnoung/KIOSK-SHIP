<template>
  <countryPage />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import countryPage from '@/components/MasterDataPage/countryPage.vue'

export default defineComponent({
  components: {
    countryPage,
  },
  setup() {},
})
</script>
