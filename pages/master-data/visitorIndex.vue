<template>
  <visitorPage />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import visitorPage from '@/components/MasterDataPage/visitorPage.vue'

export default defineComponent({
  components: {
    visitorPage,
  },
  setup() {},
})
</script>
