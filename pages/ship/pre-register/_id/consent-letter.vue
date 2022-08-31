<template>
  <div v-if="isReady">
    <ShipPreregisSteppers :current="4" @changeSteps="changeSteps" />
    <ShipPreregisConsent :data-table="dataTable" />
  </div>
</template>

<script>
import { preRegisterConsentFormatter } from '@/helpers/ship/preregister/consent'

export default {
  data() {
    return {
      isReady: false,
      dataTable: [],
    }
  },
  mounted() {
    this.$nuxt.$on('fetchContent', async () => {
      await this.setData()
      this.$store.commit('global/SET_CLOSE_LOADER')
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('fetchContent')
  },
  async created() {
    await this.setData()
    this.isReady = true
  },
  methods: {
    async setData() {
      const perRegisterId = this.$route.params?.id || null
      const result = await this.$store.dispatch(
        'preRegister/getPreRegisterById',
        perRegisterId
      )
      this.$store.commit(
        'preRegister/SET_DEFAULT_PRE_REGISTER',
        _.cloneDeep(result)
      )
      this.setDataTable(result)
    },
    changeSteps(path) {
      this.nextPage(path)
    },
    nextPage(path) {
      this.$router.push({ path })
    },
    setDataTable(item) {
      this.dataTable = []
      this.dataTable.push(preRegisterConsentFormatter(item))
      this.dataTable.push(...item.shipPreregistorFollow)
      this.dataTable = this.$global.orderItem(this.dataTable)
    },
  },
}
</script>
