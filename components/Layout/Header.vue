<template>
  <a-layout-header class="flex justify-between shadow-sm header-layout">
    <div class="flex items-center">
      <nuxt-link to="/" class="mr-2 text-lg">
        <Logo class="inline" />
        <div
          class="
            inline
            font-semibold
            truncate
            text-kit-black
            dark:text-kit-white
          "
        >
          ONLINE REGISTER
        </div>
      </nuxt-link>
      <div
        id="headerSignInTopBar"
        class="pl-3 ml-3 dark:border-gray-800 text-white"
      >
        ระบบลงทะเบียนขอเข้าพื้นที่ออนไลน์
      </div>
    </div>
    <!-- <LayoutTopbar class="flex items-center" /> -->
  </a-layout-header>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@nuxtjs/composition-api'
import { find } from 'lodash'
import Logo from '@/assets/svg/logo.svg?inline'

export default defineComponent({
  components: {
    Logo,
  },

  setup(_props, context) {
    const i18n = context.root.$i18n
    const locales = ref(i18n.locales)
    const currentLocale = computed(() => {
      return find(locales.value, (l: any) => l.code === i18n.locale)
    })

    return {
      currentLocale,
    }
  },
})
</script>
<style scoped>
@media (max-width: 880px) {
  #headerSignInTopBar {
    display: none;
  }
}
</style>
<style lang="less" scoped>
.header-layout {
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.141);
}
</style>
