<template>
  <a-card v-if="isReady">
    <ShipPreregisSearch @searchHistory="searchHistory" />
    <ShipPreregisTabs />
    <ShipPreregisPrivacyNoticeForVisitor style="display: none" />
    <ShipPreregisPrivacyNoticeForEmployee style="display: none" />
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
    const checkQuery = this.$route.query?.status
    if (!checkQuery) {
      this.$router.replace({
        query: { status: 1 },
      })
    }
    await this.$store.dispatch('timeWork/getTimeWork')
    await this.$store.dispatch('ship/accessControlInterface/getCompanyList')
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
        getBy: 'general user',
        page: this.currentPage,
        pageSize: 5,
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
