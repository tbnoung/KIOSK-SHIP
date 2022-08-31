<template>
  <div class="ship-sider">
    <a-menu
      style="width: 250px"
      theme="dark"
      mode="inline"
      :selected-keys="selectedKeys"
      :default-open-keys="openDefault"
      class="height-sider"
    >
      <a-sub-menu v-for="menu in menus" :key="menu.id">
        <span slot="title">
          <a-icon type="appstore" /><span>{{ menu.nameTh }}</span>
        </span>
        <a-menu-item
          v-for="children in menu.child"
          :key="children.id"
          @click="onSelect($event, children.path)"
        >
          {{ children.nameTh }}</a-menu-item
        >
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedKeys: [],
      openDefault: [],
      menus: [],
    }
  },
  created() {
    this.menus = this.$auth.$state.user.shipPermission
    this.selectedKeys.push(this.setDefaultSelectedKey())
    this.openDefault.push(this.setDefaultOpen())
  },
  methods: {
    setDefaultSelectedKey() {
      const { fullPath } = this.$route
      for (const item of this.menus) {
        for (const child of item.child) {
          if (child.path === fullPath) {
            this.selectedKeys.push(child.key)
            return child.key
          }
        }
      }
    },
    setDefaultOpen() {
      const { fullPath } = this.$route
      for (const item of this.menus) {
        const find = item.child.find((element) => element?.path === fullPath)
        const isNotEmpty = !_.isEmpty(find)
        if (isNotEmpty) {
          return item.key
        }
      }
    },
    onSelect(e, path) {
      this.selectedKeys = e.keyPath
      this.$router.push({ path })
    },
  },
}
</script>
<style lang="less" scoped>
.height-sider {
  height: 100%;
  width: 250px;
  overflow: auto;
  background-color: rgb(38, 54, 63);
}
</style>
