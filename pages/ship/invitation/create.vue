<template>
  <a-card v-if="isReady" :key="reRenderPage">
    <a-row type="flex" justify="center">
      <a-col :span="16">
        <ShipInvitationForm :props-form="form" @onSubmit="onSubmit" />
        <ShipInvitationTableSupporter
          :data-table="form.shipPreregistorFollow"
          :props-form="form"
          @addSupporter="addSupporter"
          @editSupporter="editSupporter"
          @deleteContent="deleteContent"
        />
      </a-col>
    </a-row>
    <a-row type="flex" justify="end">
      <a-button type="primary" @click="$nuxt.$emit('submitInvitation')">{{
        textButton
      }}</a-button>
    </a-row>
    <SharesModalConfirmModal
      :active="nextPageModal.active"
      text-confirm="Confirm"
      text-cancle="Cancle"
      :content="nextPageModal.content"
      @confirm="confirmModal"
      @editSupporter="editSupporter"
      @close="nextPageModal.active = false"
    />
  </a-card>
</template>

<script>
import { invitationCreateFormatter } from '@/helpers/ship/invitation/create'

export default {
  data() {
    return {
      reRenderPage: 0,
      isReady: false,
      form: null,
      nextPageModal: {
        active: false,
        content:
          'กรุณาตรวจสอบข้อมูลให้ถูกต้องเเล้วกด confirm เพื่อ submit ข้อมูล',
      },
    }
  },
  computed: {
    textButton() {
      return this.form?.statusOperationId === 3 ? 'save' : 'submit'
    },
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
    const invitationId = this.$route.query?.id || null
    await this.$store.dispatch('areaZone/getAreaZone')
    await this.$store.dispatch('objectiveWork/getObjectiveWork')
    await this.$store.dispatch('timeWork/getTimeWork')
    if (invitationId) {
      const result = await this.$store.dispatch(
        'preRegister/getPreRegisterById',
        invitationId
      )
      this.form = invitationCreateFormatter(_.cloneDeep(result))
    } else {
      this.form = invitationCreateFormatter()
      this.$store.commit(
        'preRegister/SET_DEFAULT_PRE_REGISTER',
        _.cloneDeep(this.form)
      )
    }
    this.isReady = true
  },
  methods: {
    onSubmit() {
      this.nextPageModal.active = true
    },
    async confirmModal() {
      if (this.textButton === 'submit') {
        this.form.statusOperationId = 3
      }
      await this.$store.dispatch('preRegister/updatePreRegister', this.form)
      this.$router.push('/ship/Invitation')
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
    findElement(record) {
      const findElement = (element) => element.id === record.id
      return this.form.shipPreregistorFollow.findIndex(findElement)
    },
    deleteContent(record) {
      const findIndex = this.findElement(record)
      this.form.shipPreregistorFollow.splice(findIndex, 1)
      this.$store.dispatch('preRegister/mapUser', _.cloneDeep(this.form))
    },
  },
}
</script>
