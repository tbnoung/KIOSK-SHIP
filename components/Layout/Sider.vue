<template>
  <a-layout-sider
    v-model="collapsed"
    breakpoint="lg"
    :collapsed-width="isMobileView ? 0 : 80"
    width="250"
    collapsible
    zero-width-trigger-style="background-color: #108ee9"
    @collapse="onCollapse"
    @breakpoint="onBreakpoint"
  >
    <!-- <a-layout-sider
    v-model="collapsed"
    breakpoint="lg"
    class="z-40 overflow-x-hidden overflow-y-auto shadow-lg bg-slate-98"
    :width="200"
    :collapsible="isMobileView ? false : true"
  > -->
    <!-- <a-layout-sider
    v-model="collapsed"
    width="240"
    class="z-40 overflow-x-hidden overflow-y-auto shadow-lg bg-slate-98"
    collapsible
  > -->
    <div class="app-menu">
      <!-- <LayoutMenu :collapsed="collapsed" class="mt-4" /> -->
      <LayoutShipMenu :collapsed="collapsed" />
    </div>
  </a-layout-sider>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onBeforeUnmount,
  ref,
  useContext,
  watch,
} from '@nuxtjs/composition-api'

const COLLAPSED = 'collapsed'

export default defineComponent({
  setup() {
    const {
      app: { $storage },
    } = useContext()

    const collapsed = ref(false)

    watch(collapsed, (collapsed) => {
      $storage.setUniversal(COLLAPSED, collapsed)
    })

    onMounted(() => {
      $storage.syncUniversal(COLLAPSED, false)
      detectViewPort()
      window.addEventListener('resize', detectViewPortListener)
      collapsed.value = $storage.getUniversal(COLLAPSED)
    })
    onBeforeUnmount(() => {
      window.removeEventListener('resize', detectViewPortListener)
    })
    const state = {
      next: {
        mobile: false,
        tablet: false,
        desktop: false,
      },
    }
    const isMobileView = ref<Boolean>()
    // const firstLoad = ref<Boolean>()
    function detectViewPort() {
      const width = window.innerWidth
      // console.log(width)
      if (width < 768) {
        state.next.mobile = true
        state.next.tablet = false
        state.next.desktop = false
      } else if (width < 992) {
        state.next.tablet = true
        state.next.mobile = false
        state.next.desktop = false
      } else {
        state.next.desktop = true
        state.next.tablet = false
        state.next.mobile = false
      }

      // desktop
      if (state.next.desktop) {
        isMobileView.value = false
      }
      // tablet & collapse menu
      if (state.next.tablet) {
        isMobileView.value = false
      }
      // mobile
      if (state.next.mobile) {
        isMobileView.value = true
      }
      // state. = {
      //   next: {
      //     mobile: width < 768,
      //     tablet: width < 992,
      //     desktop: !(width < 768) && !(width < 992),
      //   },
      // }
    }
    function detectViewPortListener() {
      detectViewPort()
    }

    function onCollapse(collapsed: any, type: any) {
      return true
      // console.log(collapsed, type)
    }
    function onBreakpoint(broken: any) {
      return true
      // console.log('broken', broken)
    }

    return {
      collapsed,
      isMobileView,
      onCollapse,
      onBreakpoint,
    }
  },
})
</script>
