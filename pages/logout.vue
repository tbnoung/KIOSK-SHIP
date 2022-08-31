<template>
  <div class="flex items-center justify-center w-full h-full">
    <a-spin :tip="$t('signingOut')" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'no-slide-menu',

  setup(_props, context) {
    onMounted(() => {
      context.root.$auth.logout()
    })
  },
})
</script>
