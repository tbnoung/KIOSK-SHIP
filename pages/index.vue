<template>
  <div v-if="isReady">
    <ShipPreregisSteppers :current="0" @changeSteps="nextPages" />
    <div class="mt-5">
      <a-card>
        <a-row type="flex" align="middle" class="height-content">
          <a-col :span="24" class="text-center">
            <a-row type="flex" justify="center">
              กรุณากรอกเลขบัตรประจำตัวประชาชน หรือ Passport
              เพื่อทำการตรวจสอบก่อนลงทะเบียน
            </a-row>
            <a-row type="flex" justify="center">
              <a-col :span="8" class="mt-5">
                <a-form-model ref="ruleForm" :model="form" :rules="rules">
                  <a-form-model-item prop="citizenId">
                    <a-input
                      v-model="form.citizenId"
                      :disabled="!$shipPermission.canEditShip(form, $route)"
                      @change="checkCitizenId"
                    />
                  </a-form-model-item>
                </a-form-model>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
        <a-row type="flex" justify="end">
          <a-button @click="onSubmit">next</a-button>
        </a-row>
      </a-card>
      <ShipPreregisPrivacyNoticeModal
        :active="activePrivacyNoticeModal"
        title="Privacy Notice"
        text-confirm="Confirm"
        text-cancle="Cancle"
        @confirm="confirmPrivacyNotice"
      />
      <SharesModalConfirmModal
        :active="nextPageModal.active"
        text-confirm="Confirm"
        text-cancle="Cancle"
        :content="nextPageModal.content"
        @confirm="confirmNextPageModal"
        @close="closeNextPageModal"
      />
      <SharesModalConfirmModal
        :active="blackListModal.active"
        text-cancle="Cancle"
        :content="blackListModal.content"
        @close="blackListModal.active = false"
      />
      <SharesModalConfirmModal
        :active="oldPreRegistorModal.active"
        text-confirm="Confirm"
        text-cancle="Cancle"
        :content="oldPreRegistorModal.content"
        @confirm="useOldPreRegistorModal"
        @close="confirmNextPageModal"
      />
    </div>
  </div>
</template>

<script>
import rulesValidateForm from '@/mixins/ship/rules'
import preRegister from '@/mixins/ship/preRegister'
import { preRegisterCreateFormatter } from '@/helpers/ship/preregister/create'
import lodash from 'lodash'
export default {
  mixins: [rulesValidateForm, preRegister],
  beforeRouteLeave(_, __, next) {
    this.routerNextPage = next
  },
  layout: 'nonAccount',
  data() {
    return {
      isReady: false,
      form: {},
      nextPage: '',
      nextPageModal: {
        active: false,
        content: '',
        actionNextStep: false,
      },
      blackListModal: {
        active: false,
        content: '',
      },
      oldPreRegistorModal: {
        active: false,
        content: '',
      },
      oldPreRegistor: null,
      activePrivacyNoticeModal: false,
      routerNextPage: () => {
        // to assign
      },
    }
  },
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n?.locale,
      },
    }
  },
  auth: false,
  computed: {
    getDefaultPreRegister() {
      return this.$store.getters['preRegister/getDefaultPreRegister']
    },
    getBlackList() {
      return this.$store.getters['ship/accessControlInterface/getBlackList']
    },
  },
  watch: {
    routerNextPage() {
      const perRegisterId = this.$route.query?.id || null
      if (perRegisterId) {
        this.nextPage = 'routerNextPage'
        this.checkDataChange()
      } else {
        this.routerNextPage()
      }
    },
  },
  created() {
    this.$router.replace({
      query: { nonAccount: 'true' },
    })
    this.$store.commit('global/SET_OPEN_LOADER')
    setTimeout(async () => {
      const perRegisterId = this.$route.query?.id || null
      if (perRegisterId) {
        const result = await this.$store.dispatch(
          'preRegister/getPreRegisterById',
          perRegisterId
        )
        this.setForm(result)
      } else {
        this.form = preRegisterCreateFormatter({
          accountId: this.$shipUser.getAccountId(),
        })
        this.$store.commit(
          'preRegister/SET_DEFAULT_PRE_REGISTER',
          lodash.cloneDeep(this.form)
        )
        this.activePrivacyNoticeModal = true
      }
      await this.$store.dispatch('personalType/getPersonalType')
      this.$store.dispatch('preRegister/mapUser', lodash.cloneDeep(this.form))
      this.isReady = true
      this.$store.commit('global/SET_CLOSE_LOADER')
    }, 100)
  },
  methods: {
    nextPages(path) {
      if (this.$route?.query?.nonAccount === 'true') {
        this.$router.push({ path, query: { nonAccount: 'true' } })
      } else {
        this.$router.push(path)
      }
    },
    setForm(result) {
      this.form = preRegisterCreateFormatter(lodash.cloneDeep(result))
      this.$store.commit(
        'preRegister/SET_DEFAULT_PRE_REGISTER',
        lodash.cloneDeep(this.form)
      )
    },
    onSubmit() {
      const getId = this.$route.query.id || this.$route.params.id
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.nextPage = `/ship/pre-register/${getId}/detail`
          if (this.getBlackList?.id) {
            this.blackListModal.content =
              'ไม่สามารถลงทะเบียนได้เนื่องจากหมายเลขบัตรประชาชนหรือ Passport ติด Blacklist'
            this.blackListModal.active = true
          } else {
            this.checkDataChange()
          }
        } else {
          return false
        }
      })
    },
    async confirmNextPageModal() {
      const result = await this.$store.dispatch(
        'preRegister/updatePreRegister',
        this.form
      )
      const id = this.$route.query.id
      if (this.nextPage === 'routerNextPage') {
        this.routerNextPage()
      } else {
        this.setForm(result)
        this.nextPageModal.active = false
        if (!id) {
          this.nextPage = `/ship/pre-register/${result.idPreRegister}/detail`
          this.nextPages(this.nextPage)
        } else {
          this.nextPages(this.nextPage)
        }
      }
    },
    validateCitizen() {
      return (
        (this.form.citizenId.length >= 8 && this.form.citizenId.length <= 9) ||
        this.form.citizenId.length === 13
      )
    },
    async checkBlackList() {
      await this.$store.dispatch(
        'ship/accessControlInterface/checkBlacklist',
        this.form.citizenId
      )
      if (this.getBlackList?.id) {
        this.blackListModal.content =
          'ไม่สามารถลงทะเบียนได้เนื่องจากหมายเลขบัตรประชาชนหรือ Passport ติด Blacklist'
        this.blackListModal.active = true
      }
    },
    async checkOldPreRegister() {
      const nonAccount = this.$route?.query?.nonAccount === 'true'
      const id = this.$route.query.id
      if (nonAccount) {
        this.oldPreRegistor = await this.$store.dispatch(
          'history/getHistoryByPage',
          this.payloadCheckCitizenId()
        )
        if (this.oldPreRegistor?.result.length > 0 && !id) {
          this.oldPreRegistorModal.active = true
          this.oldPreRegistorModal.content =
            'มีใบงานที่ทำการสร้างไว้อยู่เเล้วกด confirm เพื่อกรอกข้อมูลต่อ หรือกด cancle เพื่อดำเนินการสร้างใบงานใหม่'
        }
      }
    },
    payloadCheckCitizenId() {
      return {
        getBy: 'general user',
        citizenidOrPassportNo: this.form.citizenId,
        isVisitor: true,
        page: 1,
        pageSize: 5,
      }
    },
    checkCitizenId: lodash.debounce(async function () {
      try {
        const checkValidationForm = document.querySelector('.ant-form-explain')
        if (this.validateCitizen() && !checkValidationForm) {
          await this.checkBlackList()
        }
      } catch (err) {
        console.log(err)
        this.$store.commit('ship/accessControlInterface/SET_BLACK_LIST', {})
        await this.checkOldPreRegister()
      }
    }, 1000),
    useOldPreRegistorModal() {
      const preregistorId = this.oldPreRegistor.result[0].preregistorId
      this.nextPage = `/ship/pre-register/${preregistorId}/detail`
      this.nextPages(this.nextPage)
    },
    confirmPrivacyNotice(form) {
      this.form.personName = form.personName
      this.form.personTypeId = form.personTypeId
      this.form.accesstypepersonId = form.accesstypepersonId
      this.form.statusPrivacyNotice = form.statusPrivacyNotice
      this.activePrivacyNoticeModal = false
    },
  },
}
</script>

<style lang="less" scoped>
.height-content {
  height: calc(100vh - 250px) !important;
}
</style>
