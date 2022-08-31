<template>
  <span>
    <a-icon v-if="menu.meta.icon" :type="iconType" :component="iconComponent">
      <component
        :is="menu.meta.icon.name"
        v-bind="menu.meta.icon.props"
      /> </a-icon
    ><span>{{
      typeof menu.meta.title === 'object'
        ? menu.meta.title[$i18n.locale] ||
          menu.meta.title[Object.keys(menu.meta.title)[0]]
        : menu.meta.title
    }}</span>
  </span>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  inheritAttrs: false,
  props: {
    menu: {
      type: Object as () => MenuRoute,
      default: null,
    },
  },

  setup(props) {
    const iconType = computed(() => {
      const { meta } = props.menu
      return typeof meta.icon === 'string' ? meta.icon : undefined
    })
    const iconComponent = computed(() => {
      const { meta } = props.menu
      return typeof meta.icon === 'object' ? meta.icon?.component : undefined
    })

    return {
      iconType,
      iconComponent,
    }
  },
})
</script>
