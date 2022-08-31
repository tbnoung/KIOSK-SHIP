<template>
  <a-card v-if="isReady">
    <ShipUserManagementSearch @updateDataTable="searchUserManagement" />
    <ShipUserManagementTable />
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
    await this.searchUserManagement(this.getPayload())
    this.isReady = true
  },
  methods: {
    async searchUserManagement(payload) {
      this.$store.commit('global/SET_OPEN_LOADER')
      await this.$store.dispatch(
        'ship/userManagement/getUsermanagement',
        payload
      )
      this.$nuxt.$emit('updateCurrentPage', payload.page)
      this.$store.commit('global/SET_CLOSE_LOADER')
    },
    getPayload() {
      return {
        fristNameAndLastName: '',
        company: '',
        username: '',
        page: 1,
        pageSize: 5,
      }
    },
  },
}
</script>
