<template>
  <Initialize>
    <a-spin :spinning="getLoader">
      <!-- <div class="spin-content">
        <a-layout class="h-screen">
          <LayoutHeader />
          <a-layout>
            <LayoutSider />
            <a-layout-content
              class="overflow-x-hidden overflow-y-auto"
              style="background: #ececec; padding: 15px"
            >
              <Nuxt />
            </a-layout-content>
          </a-layout>
        </a-layout>
      </div> -->
      <LayoutShipHeader :toggle="toggle" @changeToggle="changeToggle" />
      <transition name="home">
        <a-layout v-if="toggle">
          <a-layout-sider class="ship-sider">
            <LayoutShipSider />
          </a-layout-sider>
        </a-layout>
      </transition>
      <a-layout>
        <LayoutShipContent :toggle="toggle" />
        <!-- <a-row type="flex" justify="center" class="mb-5 mt-16" style="margin-top: 60px; background: #ececec; padding: 15px; height: calc(100vh - 60px); overflow: auto;position: fixed; width: 100vw">
        <a-col :span="16">
          <Nuxt />
        </a-col>
      </a-row> -->
      </a-layout>
    </a-spin>
  </Initialize>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      toggle: true,
    }
  },
  computed: {
    getLoader() {
      return this.$store.getters['global/getLoader']
    },
  },
  methods: {
    changeToggle() {
      this.toggle = !this.toggle
    },
  },
})
</script>
<style lang="less" scoped>
.ship-sider {
  overflow: auto;
  height: calc(100vh - 60px);
  position: fixed;
  top: 60px;
  left: 0;
}

.home-enter-active,
.home-leave-active {
  transition: opacity 0.5s;
}
.home-enter,
.home-leave-active {
  opacity: 0;
}
</style>
