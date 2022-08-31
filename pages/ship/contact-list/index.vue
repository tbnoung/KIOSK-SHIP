<template>
  <a-card v-if="isReady">
    <ShipContactListSearch @updateDataTable="searchShipVisitor" />
    <ShipContactListTable />
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
    await this.$store.dispatch('ship/accessControlInterface/getCompanyList')
    await this.searchShipVisitor(this.getPayload())
    this.isReady = true
  },
  methods: {
    async searchShipVisitor(payload) {
      this.$store.commit('global/SET_OPEN_LOADER')
      await this.$store.dispatch('ship/shipVisitor/getShipVisitor', payload)
      this.$nuxt.$emit('updateCurrentPage', payload.page)
      this.$store.commit('global/SET_CLOSE_LOADER')
    },
    getPayload() {
      return {
        page: 1,
        pageSize: 5,
        fristNameAndLastName: '',
        company: '',
        citizenIdOrPassport: '',
        consentStatus: '',
      }
    },
  },
}
</script>
