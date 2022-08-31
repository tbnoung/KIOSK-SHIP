<template>
  <a-row type="flex" justify="center">
    <a-col :span="24">
      <a-card class="mt-5">
        <a-row type="flex" justify="center">
          <a-col :span="18">
            <a-row type="flex" justify="center" class="mb-5"
              >ข้อมูลการติดต่อ</a-row
            >
            <ShipPreregisContactForm :props-form="form" @onSubmit="onSubmit" />
            <a-row type="flex" justify="end">
              <a-button class="mr-3" @click="nextTo('toDetail')">Back</a-button>
              <!-- <a-button @click="$nuxt.$emit('submitFormContact')"
                >Next</a-button
              > -->
              <a-button
                v-if="canSubmit"
                type="primary"
                @click="submitFormContact"
                >Submit</a-button
              >
              <a-button v-if="!canSubmit" @click="nextTo('toConsider')"
                >next</a-button
              >
            </a-row>
          </a-col>
        </a-row>
      </a-card>
    </a-col>
    <SharesModalConfirmModal
      :active="nextPageModal.active"
      text-confirm="Confirm"
      text-cancle="Cancle"
      :content="nextPageModal.content"
      @confirm="confirmNextPageModal"
      @close="closeNextPageModal"
    />
  </a-row>
</template>

<script>
import preRegister from '@/mixins/ship/preRegister'
export default {
  mixins: [preRegister],
  props: {
    propsForm: {
      type: Object,
      default: null,
    },
    routerNextPage: {
      type: Function,
      default: () => {
        // props
      },
    },
    dataTable: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      form: {},
      actionBtn: 'back',
      nextPageModal: {
        active: false,
        content: '',
        actionNextStep: false,
      },
    }
  },
  computed: {
    getDefaultPreRegister() {
      return this.$store.getters['preRegister/getDefaultPreRegister']
    },
    canSubmit() {
      return this.dataTable.some((item) => {
        return [null, 0, 2, 4, 5].includes(item?.statusOperationId)
      })
    },
  },
  watch: {
    routerNextPage() {
      this.nextPage = 'routerNextPage'
      this.checkDataChange()
    },
  },
  created() {
    this.form = this.propsForm
  },
  methods: {
    onSubmit() {
      if (!this.nextPageModal.actionNextStep) {
        this.nextPage = `/ship/pre-register`
      }
      this.$router.push({ path: this.nextPage })
    },
    submitFormContact() {
      this.actionBtn = 'submit'
      this.$nuxt.$emit('submitFormContact', true)
    },
    async submitRegister() {
      const dataTable = _.cloneDeep(this.dataTable)
      this.$store.commit('global/SET_OPEN_LOADER')
      const preRegister = [dataTable.shift()]
      const preRegisterFollow = dataTable
      const payload = {
        preRegistorId: this.filterIdCanSubmit(preRegister, 'preregistorId'),
        preRegistorIdFollow: this.filterIdCanSubmit(
          preRegisterFollow,
          'preRegistorIdFollow'
        ),
        status: 1,
      }
      await this.$store.dispatch('history/updateStatusShipRegister', payload)
      if (this.$route?.query?.nonAccount === 'true') {
        this.$router.push('/login')
      } else {
        this.$router.push('/ship/pre-register')
      }
      this.$store.commit('global/SET_CLOSE_LOADER')
    },
    filterIdCanSubmit(data, key) {
      const result = data.filter((item) => {
        return [null, 0, 1, 2, 4, 5].includes(item?.statusOperationId)
      })
      if (result) {
        const setId = []
        for (const item of result) {
          setId.push(item[key])
        }
        return setId
      } else {
        return 0
      }
    },
    routerBack() {
      this.actionBtn = 'back'
      this.nextPage = `/ship/pre-register/${this.form.id}/detail`
      this.nextPageModal.actionNextStep = true
      this.$nuxt.$emit('submitFormContact')
    },
    nextTo(nextTo) {
      if (nextTo === 'toDetail') {
        this.nextPage = `/ship/pre-register/${this.form.id}/detail`
      } else if (nextTo === 'toConsider') {
        this.nextPage = `/ship/pre-register/${this.form.id}/consideration`
      }
      this.actionBtn = nextTo
      this.nextPageModal.actionNextStep = true
      this.$nuxt.$emit('submitFormContact')
    },
    async confirmNextPageModal() {
      this.nextPageModal.actionNextStep = false
      this.$store.commit('global/SET_OPEN_LOADER')
      const checkErrorModal = document.querySelector('[data-error-modal]')
      await this.$store.dispatch('preRegister/updatePreRegister', this.form)
      if (this.actionBtn === 'submit' && !checkErrorModal) {
        await this.submitRegister()
      }
      if (this.nextPage === 'routerNextPage') {
        this.routerNextPage()
      } else {
        this.$emit('nextPage', this.nextPage)
      }
    },
  },
}
</script>
