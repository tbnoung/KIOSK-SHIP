<template>
  <div :class="`layout-content ${classMarginShipContent}`">
    <nuxt />
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
  computed: {
    classMarginShipContent() {
      return this.toggle ? 'marginContent' : ''
    },
  },
}
</script>
<style lang="less" scoped>
.layout-content {
  margin-top: 60px;
  height: calc(100vh - 60px) !important;
  background-color: rgb(228, 229, 231) !important;
  padding: 15px !important;
  overflow: auto !important;
}
.marginContent {
  margin-left: 250px !important;
}
</style>
