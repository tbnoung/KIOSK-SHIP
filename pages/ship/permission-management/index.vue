<template>
  <a-card v-if="isReady">
    <ShipPermissionManagementSearch />
    <ShipPermissionManagementTable />
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      isReady: false,
    }
  },
  async created() {
    this.$store.commit('global/SET_OPEN_LOADER')
    await this.$store.dispatch('ship/rolePermission/getPermission')
    this.$store.commit('global/SET_CLOSE_LOADER')
    this.isReady = true
  },
}
</script>
