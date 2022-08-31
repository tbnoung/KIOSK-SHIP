<template>
  <div v-if="isReady">
    <ShipPreregisSteppers :current="2" @changeSteps="nextPage" />
    <ShipPreregisContact
      :props-form="form"
      :router-next-page="routerNextPage"
      :data-table="dataTable"
      @nextPage="nextPage"
    />
  </div>
</template>

<script>
import { preRegisterContactFormatter } from '@/helpers/ship/preregister/contact'
import { preRegisterConsentFormatter } from '@/helpers/ship/preregister/consent'
export default {
  beforeRouteLeave(_, __, next) {
    this.routerNextPage = next
  },
  layout(context) {
    return context?.route?.query?.nonAccount === 'true'
      ? 'nonAccount'
      : 'default'
  },
  auth: false,
  data() {
    return {
      isReady: false,
      form: {},
      routerNextPage: () => {
        // to assign
      },
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
    this.$store.commit('global/SET_OPEN_LOADER')
    await this.setData()
    this.$store.commit('global/SET_CLOSE_LOADER')
    this.isReady = true
  },
  methods: {
    nextPage(path) {
      if (this.$route?.query?.nonAccount === 'true') {
        this.$router.push({ path, query: { nonAccount: 'true' } })
      } else {
        this.$router.push(path)
      }
    },
    async setData() {
      const perRegisterId = this.$route.params?.id || null
      await this.$store.dispatch('areaZone/getAreaZone')
      await this.$store.dispatch('ship/mapInterface/getZone')
      await this.$store.dispatch('objectiveWork/getObjectiveWork')
      await this.$store.dispatch('RequireFields/getRequireFields')
      const result = await this.$store.dispatch(
        'preRegister/getPreRegisterById',
        perRegisterId
      )
      this.form = preRegisterContactFormatter(_.cloneDeep(result))
      this.$store.commit(
        'preRegister/SET_DEFAULT_PRE_REGISTER',
        _.cloneDeep(this.form)
      )
      this.setDataTable(result)
      this.isReady = true
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
