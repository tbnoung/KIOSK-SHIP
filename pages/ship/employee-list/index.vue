<template>
  <a-card v-if="isReady">
    <ShipEmployeeListSearch @updateDataTable="searchPIS" />
    <ShipEmployeeListTable />
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
    await this.$store.dispatch('ship/position/getAllPosition')
    await this.$store.dispatch('personalType/getPersonalType')
    await this.searchPIS(this.getPayload())
    this.isReady = true
  },
  methods: {
    async searchPIS(payload) {
      this.$store.commit('global/SET_OPEN_LOADER')
      await this.$store.dispatch('ship/PISInterface/getEmployee', payload)
      this.$nuxt.$emit('updateCurrentPage', payload.currentPage)
      this.$store.commit('global/SET_CLOSE_LOADER')
    },
    getPayload() {
      return {
        positionCode: '',
        employeeCode: '',
        unitCode: '',
        numberOfRecordPerPage: 5,
        currentPage: 1,
      }
    },
  },
}
</script>
