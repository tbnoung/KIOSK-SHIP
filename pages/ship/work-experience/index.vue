<template>
  <a-card v-if="isReady">
    <ShipWorkExperienceSearch
      @searchSafetyTrainingInfo="searchSafetyTraining"
    />
    <ShipWorkExperienceTable :key="updateComponent" />
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      isReady: false,
      updateComponent: 0,
    }
  },
  async created() {
    this.$store.commit('global/SET_OPEN_LOADER')
    await this.$store.dispatch('ship/accessControlInterface/getCompanyList')
    await this.searchSafetyTraining(this.getPayload())
    this.isReady = true
  },
  methods: {
    async searchSafetyTraining(payload) {
      this.$store.commit('global/SET_OPEN_LOADER')
      await this.$store.dispatch(
        'ship/safetyTraining/getSafetyTrainingInfo',
        payload
      )
      this.updateComponent++
      this.$store.commit('global/SET_CLOSE_LOADER')
    },
    getPayload() {
      return {
        idCard: '',
        name: '',
        companyCode: '',
        startDate: '',
        endDate: '',
        status: '',
      }
    },
  },
}
</script>
