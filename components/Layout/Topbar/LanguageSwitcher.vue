<template>
  <a-dropdown :trigger="['click']" placement="bottomRight">
    <div class="px-3 uppercase transition-all duration-200 cursor-pointer">
      {{ currentLocale !== undefined ? currentLocale.code : '' }}
      <a-icon type="down" />
    </div>
    <a-menu slot="overlay">
      <a-menu-item v-for="locale in locales" :key="locale.code">
        <a @click="changeLanguage(locale.code)">
          {{ locale.name }}
        </a>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  useContext,
} from '@nuxtjs/composition-api'
import { find } from 'lodash'
export default defineComponent({
  setup(_, context) {
    // Hook
    const {
      app: { i18n },
    } = useContext()
    // Ref
    const locales = ref(i18n.locales)
    // Computed
    const currentLocale = computed(() => {
      return find(locales.value, (l) => {
        const code = typeof l === 'object' ? l.code : l
        return code === i18n.locale
      })
    })
    function changeLanguage(code: any) {
      i18n.setLocale(code)
      context.root.$nuxt.$emit('changeLanguage')
    }
    return {
      locales,
      currentLocale,
      changeLanguage,
    }
  },
})
</script>
