<template>
  <div class="layout-header">
    <a-row
      type="flex"
      justify="space-between"
      align="middle"
      style="height: 100%"
    >
      <a-col>
        <nuxt-link to="/" class="mx-5">
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
        <a-icon
          class="mt-1"
          :type="toggle ? 'menu-fold' : 'menu-unfold'"
          @click="$emit('changeToggle')"
        />
      </a-col>
      <a-col class="mr-5">
        <LayoutTopbar class="flex items-center" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  props: {
    toggle: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
<style lang="less" scoped>
.layout-header {
  height: 60px !important;
  width: 100%;
  position: fixed !important;
  background: white;
}
</style>
