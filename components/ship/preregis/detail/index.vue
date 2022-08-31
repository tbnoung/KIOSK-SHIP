<template>
  <a-row type="flex" justify="center">
    <a-col :span="24">
      <a-card class="mt-5">
        <a-row type="flex" justify="center">
          <a-col :span="18">
            <a-row type="flex" justify="center" class="mb-5"
              >ข้อมูลส่วนตัว</a-row
            >
            <ShipPreregisDetailForm
              :key="updateComponent"
              ref-form="ruleForm"
              :props-form="form"
              @onSubmit="onSubmit"
            />
            <a-row type="flex">
              <a-col :span="24">
                <ShipPreregisDetailTableSupporter
                  :data-table="form.shipPreregistorFollow"
                  :props-form="form"
                  @deleteContent="deleteContent"
                  @addSupporter="addSupporter"
                  @editSupporter="editSupporter"
                />
              </a-col>
            </a-row>
            <a-row type="flex" justify="end" class="mt-5">
              <a-button @click="next">Next</a-button>
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
  },
  data() {
    return {
      updateComponent: 0,
      nextPageModal: {
        active: false,
        content: '',
        actionNextStep: false,
      },
      nextPage: '',
      form: {},
    }
  },
  computed: {
    getDefaultPreRegister() {
      return this.$store.getters['preRegister/getDefaultPreRegister']
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
    this.$store.dispatch('preRegister/mapUser', _.cloneDeep(this.form))
  },
  methods: {
    next() {
      this.updateComponent++
      setTimeout(() => {
        this.$nuxt.$emit('submitFormDetail', 'ruleForm')
      }, 100)
    },
    async confirmNextPageModal() {
      await this.$store.dispatch('preRegister/updatePreRegister', this.form)
      if (this.nextPage === 'routerNextPage') {
        this.routerNextPage()
      } else {
        this.$emit('nextPage', this.nextPage)
      }
    },
    onSubmit() {
      if (!this.nextPageModal.actionNextStep) {
        this.nextPage = `/ship/pre-register/${this.form.id}/contact`
      }
      if (this.$route?.query?.nonAccount === 'true') {
        this.$router.push({
          path: this.nextPage,
          query: { nonAccount: 'true' },
        })
      } else {
        this.$router.push(this.nextPage)
      }
    },
    deleteContent(record) {
      const findIndex = this.findElement(record)
      this.form.shipPreregistorFollow.splice(findIndex, 1)
      this.$store.dispatch('preRegister/mapUser', _.cloneDeep(this.form))
    },
    findElement(record) {
      const findElement = (element) => element.id === record.id
      return this.form.shipPreregistorFollow.findIndex(findElement)
    },
    addSupporter(newRecord) {
      this.form.shipPreregistorFollow.push(newRecord)
      this.$store.dispatch('preRegister/mapUser', _.cloneDeep(this.form))
      this.$nuxt.$emit('reRenderPage')
    },
    editSupporter(editRecord) {
      const findIndex = this.findElement(editRecord)
      this.form.shipPreregistorFollow[findIndex] = editRecord
      this.$store.dispatch('preRegister/mapUser', _.cloneDeep(this.form))
      this.$nuxt.$emit('reRenderPage')
    },
  },
}
</script>
<style lang="less" scoped>
.displayimg {
  width: 100px;
  height: 100px;
  border: 0.5px solid gray;
  background-color: gray;
}
</style>
