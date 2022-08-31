<template>
  <div v-if="isReady" :key="reRenderPage">
    <ShipPreregisSteppers :current="1" @changeSteps="nextPage" />
    <ShipPreregisDetail
      :props-form="form"
      :router-next-page="routerNextPage"
      @nextPage="nextPage"
    />
  </div>
</template>

<script>
import { preRegisterDetailFormatter } from '@/helpers/ship/preregister/detail'

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
      reRenderPage: 0,
      form: {},
      routerNextPage: () => {
        // to assign
      },
    }
  },
  mounted() {
    this.$nuxt.$on('reRenderPage', () => {
      this.reRenderPage++
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('reRenderPage')
  },
  async created() {
    this.$store.commit('global/SET_OPEN_LOADER')
    const perRegisterId = this.$route.params?.id || null
    await this.$store.dispatch('personalType/getPersonalType')
    await this.$store.dispatch('covid/getCovid')
    await this.$store.dispatch('timeWork/getTimeWork')
    await this.$store.dispatch('ship/position/getAllPosition')
    await this.$store.dispatch('ship/accessControlInterface/getCompanyList')
    await this.$store.dispatch('RequireFields/getRequireFields')
    const result = await this.$store.dispatch(
      'preRegister/getPreRegisterById',
      perRegisterId
    )
    this.form = preRegisterDetailFormatter(_.cloneDeep(result))
    this.$store.commit(
      'preRegister/SET_DEFAULT_PRE_REGISTER',
      _.cloneDeep(this.form)
    )
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
  },
}
</script>
