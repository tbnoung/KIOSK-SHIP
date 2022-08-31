<template>
  <a-card v-if="isReady">
    <ShipInvitationSearch @searchHistory="searchHistory" />
    <ShipInvitationTable @onChangePagination="onChangePagination" />
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      isReady: false,
    }
  },
  mounted() {
    this.$nuxt.$on('fetchContent', async () => {
      await this.setData()
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('fetchContent')
  },
  async created() {
    await this.$store.dispatch('areaZone/getAreaZone')
    await this.setData()
    this.isReady = true
  },
  methods: {
    async setData() {
      this.$store.commit('global/SET_OPEN_LOADER')
      const payload = this.payloadGetHistory()
      await this.$store.dispatch('history/getHistoryByPage', payload)
      this.$store.commit('global/SET_CLOSE_LOADER')
    },
    payloadGetHistory(searchInput) {
      return {
        page: this.currentPage,
        pageSize: 5,
        getby: 'invitation',
        ...searchInput,
      }
    },
    async searchHistory(searchInput) {
      const payload = this.payloadGetHistory(searchInput)
      const result = await this.$store.dispatch(
        'history/getHistoryByPage',
        payload
      )
      this.currentPage = result.currentPage
      this.$nuxt.$emit('updatePagination', this.currentPage)
      this.$store.commit('global/SET_CLOSE_LOADER')
    },
    onChangePagination(page) {
      this.currentPage = page
      this.$store.commit('global/SET_OPEN_LOADER')
      this.$nuxt.$emit('searchHistory', page)
    },
  },
}
</script>
