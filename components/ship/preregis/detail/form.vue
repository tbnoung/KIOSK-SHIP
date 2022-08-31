<template>
  <div :key="updateForm">
    <a-form-model :ref="refForm" :model="form" :rules="rules">
      <!--------------------Title id field -------------------------->
      <a-row v-if="refForm === 'addSupporter'" type="flex">
        <a-col :span="8" class="pt-2"
          >{{ $t('ShipPreregister.label.citizenId') }}
          <SharesFormRequiredLabel />
        </a-col>
        <a-col :span="16">
          <a-form-model-item prop="citizenId">
            <a-input
              v-model="form.citizenId"
              :disabled="!canEditField"
              @change="checkBlackList"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <!--------------------Title field -------------------------->
      <a-row type="flex">
        <a-col :span="8" class="pt-2"
          >คำนำหน้า
          <SharesFormRequiredLabel />
        </a-col>
        <a-col :span="16">
          <a-form-model-item prop="titleName">
            <a-select
              v-model="form.titleName"
              show-search
              :filter-option="$global.filterOption"
              :disabled="!canEditField"
            >
              <a-select-option v-for="title in getTitle" :key="title">
                {{ title }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>
      <!--------------------Firstname field -------------------------->
      <a-row type="flex">
        <a-col :span="8" class="pt-2"
          >{{ $t('ShipPreregister.label.firstname') }}
          <SharesFormRequiredLabel />
        </a-col>
        <a-col :span="16">
          <a-form-model-item prop="firstname">
            <a-input v-model="form.firstname" :disabled="!canEditField" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <!--------------------Lastname field -------------------------->
      <a-row type="flex">
        <a-col :span="8" class="pt-2"
          >{{ $t('ShipPreregister.label.lastname') }}
          <SharesFormRequiredLabel />
        </a-col>
        <a-col :span="16">
          <a-form-model-item prop="lastname">
            <a-input v-model="form.lastname" :disabled="!canEditField" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <!--------------------Company field -------------------------->
      <a-row v-if="refForm === 'ruleForm'" type="flex">
        <a-col :span="8" class="pt-2"
          >{{ $t('ShipPreregister.label.company') }}
          <SharesFormRequiredLabel />
        </a-col>
        <a-col :span="16">
          <a-form-model-item prop="companycode">
            <a-select
              v-model="form.companycode"
              :placeholder="$t('ShipPreregister.placeholder.select')"
              show-search
              :filter-option="$global.filterOption"
              :disabled="!canEditField"
              @change="selectCompany"
            >
              <a-select-option
                v-for="company in getCompany"
                :key="company.id"
                :value="company.company_code"
              >
                {{ company.company_name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>
      <!--------------------Phone field -------------------------->
      <a-row type="flex">
        <a-col :span="8" class="pt-2"
          >{{ $t('ShipPreregister.label.phone') }}
          <SharesFormRequiredLabel v-if="propPhone" />
        </a-col>
        <a-col :span="16">
          <a-form-model-item :prop="propPhone">
            <a-input v-model="form.mobile" :disabled="!canEditField" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <!--------------------Email field -------------------------->
      <a-row type="flex">
        <a-col :span="8" class="pt-2"
          >{{ $t('ShipPreregister.label.email') }}
          <SharesFormRequiredLabel v-if="propEmail" />
        </a-col>
        <a-col :span="16">
          <a-form-model-item :prop="propEmail">
            <a-input v-model="form.email" :disabled="!canEditField" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <!--------------------Address field -------------------------->
      <a-row type="flex">
        <a-col :span="8" class="pt-2"
          >{{ $t('ShipPreregister.label.address') }}
          <SharesFormRequiredLabel v-if="propAddress" />
        </a-col>
        <a-col :span="16">
          <a-form-model-item :prop="propAddress">
            <a-input
              v-model="form.address"
              :disabled="!canEditField"
              type="textarea"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <!--------------------Position field -------------------------->
      <a-row type="flex">
        <a-col :span="8" class="pt-2"
          >{{ $t('ShipPreregister.label.position') }}
          <SharesFormRequiredLabel />
        </a-col>
        <a-col :span="16">
          <a-form-model-item prop="positionName">
            <a-select
              v-model="form.positioncode"
              :placeholder="$t('ShipPreregister.placeholder.select')"
              show-search
              :filter-option="$global.filterOption"
              :disabled="!canEditField"
              @change="selectPosition"
            >
              <a-select-option
                v-for="position in getPosition"
                :key="position.positionCode"
                :value="position.positionCode"
              >
                {{ position.positionName }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>
      <!--------------------PersonalType field -------------------------->
      <a-row type="flex">
        <a-col :span="8" class="pt-2"
          >{{ $t('ShipPreregister.label.personalType') }}
          <SharesFormRequiredLabel />
        </a-col>
        <a-col :span="16">
          <a-form-model-item prop="personName">
            <a-select
              v-model="form.personTypeId"
              :placeholder="$t('ShipPreregister.placeholder.select')"
              show-search
              :filter-option="$global.filterOption"
              :disabled="refForm === 'ruleForm'"
              @change="selectPersonalType"
            >
              <a-select-option
                v-for="personalType in getPersonalType"
                :key="personalType.id"
                :value="personalType.id"
              >
                {{ $global.language(personalType.nameTh, personalType.nameEn) }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>
      <!--------------------date field -------------------------->
      <a-row type="flex">
        <a-col :span="8" class="mt-2"
          >วันที่เริ่ม - สิ้นสุดการปฏิบัติงาน
          <SharesFormRequiredLabel />
        </a-col>
        <a-col :span="8">
          <a-form-model-item prop="startDate">
            <a-date-picker
              v-model="form.startDate"
              type="date"
              placeholder="Pick a date"
              :disabled-date="$global.disabledDate"
              :disabled="!canEditField"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item prop="expireDate">
            <a-date-picker
              v-model="form.expireDate"
              type="date"
              placeholder="Pick a date"
              :disabled-date="disabledEndDate"
              :disabled="!canEditField"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row type="flex">
        <a-col :span="8" class="pt-2"
          >ช่วงเวลาการอนุญาตให้ปฏิบัติงาน
          <SharesFormRequiredLabel />
        </a-col>
        <a-col :span="16">
          <a-form-model-item prop="timeWorkId">
            <a-select
              v-model="form.timeWorkId"
              :placeholder="$t('ShipPreregister.placeholder.select')"
              :disabled="!canEditField"
              @change="selectTimeWork"
            >
              <a-select-option
                v-for="timeWork in getTimeWork"
                :key="timeWork.id"
                :value="timeWork.id"
              >
                <span v-if="timeWork.timeStart === 'อื่น ๆ'">{{
                  timeWork.timeStart
                }}</span>
                <span v-else
                  >{{ timeWork.timeStart }} - {{ timeWork.timeEnd }}</span
                >
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row v-if="activeFieldTime" type="flex">
        <a-col :span="8">
          <a-row type="flex" justify="end" class="pr-5 pt-2"
            >กำหนดช่วงเวลา</a-row
          >
        </a-col>
        <a-col :span="7">
          <a-form-model-item prop="peregistorTimeStart">
            <a-input
              v-model="form.peregistorTimeStart"
              placeholder="เริ่มต้น"
              :disabled="!canEditField"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="2">
          <a-row type="flex" justify="center" class="pt-1">-</a-row>
        </a-col>
        <a-col :span="7">
          <a-form-model-item prop="peregistorTimeEnd">
            <a-input
              v-model="form.peregistorTimeEnd"
              placeholder="สิ้นสุด"
              :disabled="!canEditField"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <!--------------------Image field -------------------------->
      <a-row type="flex">
        <a-col :span="8" class="pt-2"
          >{{ $t('ShipPreregister.label.image') }}
          <SharesFormRequiredLabel />
        </a-col>
        <a-col :key="updateAUpload" :span="16">
          <a-form-model-item :prop="propImg">
            <a-row type="flex">
              <a-col>
                <a-upload
                  list-type="picture-card"
                  :show-upload-list="false"
                  :action="baseURLImg"
                  :before-upload="beforeUpload"
                  @change="handleChange"
                >
                  <img
                    v-if="form.image"
                    :src="getImage(form.image)"
                    alt="avatar"
                  />
                  <div v-else></div>
                </a-upload>
              </a-col>
              <a-col>
                <div style="width: 100px">
                  <a-button block @click="onPickFile">Upload</a-button>
                </div>
              </a-col>
            </a-row>
          </a-form-model-item>
        </a-col>
      </a-row>
      <!--------------------Training field -------------------------->
      <a-row type="flex">
        <a-col :span="8" class="pt-2"
          >{{ $t('ShipPreregister.label.requireTraining') }}
        </a-col>
        <a-col :key="updateTrainngStatus" :span="16">
          <a-form-model-item prop="requireTraining">
            <a-input
              :value="getMessageTrainingStatus(form.trainingStatus)"
              disabled
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <!--------------------Covid field -------------------------->
      <!-- <a-row type="flex">
        <a-col :span="8" class="pt-2"
          >{{ $t('ShipPreregister.label.requireCovid') }}
        </a-col>
        <a-col :span="16">
          <a-form-model-item prop="requireCovid">
            <a-input :value="requireCovid()" disabled />
          </a-form-model-item>
        </a-col>
      </a-row> -->
      <ShipPreregisDetailConsent
        :key="updateConsentComponent"
        class="mb-3 consent-content"
        :consent-status="form.consentStatus"
        @consent="pdpaModal = true"
      />
      <ShipPreregisDetailPdpaModal
        :active="pdpaModal"
        text-cancle="Cancle"
        text-confirm="Submit"
        :accesstypeperson-id="form.accesstypepersonId"
        :consent-status="form.consentStatus"
        @close="closeConsentModal"
        @confirm="confirmConsentModal"
      />
      <SharesModalConfirmModal
        :active="blackListModal.active"
        text-cancle="Cancle"
        :content="blackListModal.content"
        @close="blackListModal.active = false"
      />
    </a-form-model>
  </div>
</template>

<script>
import rulesValidateForm from '@/mixins/ship/rules'
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  mixins: [rulesValidateForm],
  props: {
    refForm: {
      type: String,
      default: 'ruleForm',
    },
    propsForm: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      updateForm: 0,
      updateAUpload: 0,
      updateTrainngStatus: 0,
      updateConsentComponent: 0,
      pdpaModal: false,
      form: {},
      blackListModal: {
        active: false,
        content: '',
      },
      baseURLImg: process.env.APP_IMAGE,
      getTitle: ['นาย', 'นาง', 'นางสาว'],
    }
  },
  computed: {
    propImg() {
      return this.form.image === '' ? 'image' : ''
    },
    getPosition() {
      return this.$store.getters['ship/position/getAllPosition']
    },
    getPersonalType() {
      return this.$store.getters['personalType/getPersonalData'].filter(
        (element) => element.status === true
      )
    },
    getCovid() {
      return this.$store.getters['covid/getCovid']
    },
    getTimeWork() {
      return this.$store.getters['timeWork/getTimeWorkData'].filter(
        (element) => element.status === true
      )
    },
    activeFieldTime() {
      return this.form.timeWorkId === 0
    },
    canEditField() {
      return (
        this.$shipPermission.canEditShip(this.form, this.$route) ||
        this.refForm === 'addSupporter'
      )
    },
    getCompany() {
      return this.$store.getters['ship/accessControlInterface/getCompanyList']
    },
    getDefaultPreRegister() {
      return this.$store.getters['preRegister/getDefaultPreRegister']
    },
    getBlackList() {
      return this.$store.getters['ship/accessControlInterface/getBlackList']
    },
    getCurrentCompanyCode() {
      return this.$store.getters[
        'ship/accessControlInterface/getCurrentCompanyCode'
      ]
    },
    getStatusRequireField() {
      return this.$store.getters['RequireFields/getStatusRequireField']
    },
    propAddress() {
      return this.getStatusRequireField.address && this.refForm === 'ruleForm'
        ? 'address'
        : ''
    },
    propEmail() {
      return this.getStatusRequireField.email && this.refForm === 'ruleForm'
        ? 'email'
        : ''
    },
    propPhone() {
      return this.getStatusRequireField.phone && this.refForm === 'ruleForm'
        ? 'mobile'
        : ''
    },
  },
  mounted() {
    this.$nuxt.$on('submitFormDetail', (refForm) => {
      if (refForm === this.refForm) {
        this.onSubmit()
      }
    })
    this.$nuxt.$on('changeLanguage', () => {
      this.updateForm++
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('changeLanguage')
    this.$nuxt.$off('submitFormDetail')
  },
  created() {
    this.form = this.propsForm
    this.checkScrollToError()
  },
  methods: {
    getMessageTrainingStatus(status) {
      return status ? 'เข้ารับการอบรมเเล้ว' : 'ยังไม่เข้ารับการอบรม'
    },
    getImage(img) {
      const base64 = img.includes('data:image')
      return base64 ? img : `${this.baseURLImg}${img}`
    },
    checkScrollToError() {
      if (this.$route.query?.error === 'errorRequireField') {
        setTimeout(() => {
          this.onSubmit()
        }, 1000)
      } else if (this.$route.query?.error === 'errorConsentStatus') {
        // eslint-disable-next-line nuxt/no-globals-in-created
        setTimeout(() => {
          // eslint-disable-next-line nuxt/no-globals-in-created
          const element = document.querySelector('.consent-content')
          this.$global.scrollToElement(element, 'center')
        }, 1000)
      }
    },
    requireCovid() {
      return this.$global.language(this.getCovid?.nameTh, this.getCovid?.nameEn)
    },
    onPickFile() {
      this.$refs[this.refForm].$el
        .querySelector('.ant-upload')
        .querySelector('.ant-upload')
        .click()
    },
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.form.image = imageUrl
          this.loading = false
        })
      }
      this.updateAUpload++
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    },
    onSubmit() {
      this.$refs[this.refForm].validate((valid) => {
        if (valid) {
          this.$emit('onSubmit')
          return ''
        } else {
          setTimeout(() => {
            const element = document.querySelector('.ant-form-explain')
            this.$global.scrollToElement(element, 'center')
          }, 100)
          return false
        }
      })
    },
    selectTimeWork(val) {
      if (val === 0) {
        this.form.peregistorTimeStart = ''
        this.form.peregistorTimeEnd = ''
      } else {
        const find = this.getTimeWork.find((element) => element.id === val)
        this.form.peregistorTimeStart = find.timeStart
        this.form.peregistorTimeEnd = find.timeEnd
      }
    },
    selectCompany(val) {
      const find = this.getCompany.find(
        (element) => element.company_code === val
      )
      this.form.companyName = find.company_name
      if (this.refForm === 'ruleForm') {
        this.$store.commit(
          'ship/accessControlInterface/SET_CURRENT_COMPANY_CODE',
          val
        )
      }
      this.checkTrainingStatus()
    },
    async closeConsentModal() {
      this.pdpaModal = false
      this.$store.commit('global/SET_OPEN_LOADER')
      const result = await this.$store.dispatch(
        'ship/pdpaInterface/checkConsent',
        this.form.citizenId
      )
      this.updateConsentComponent++
      this.form.consentStatus = result
      this.$store.commit('global/SET_CLOSE_LOADER')
    },
    async checkTrainingStatus() {
      const { citizenId } = this.form
      const companycode = this.form?.companycode || this.getCurrentCompanyCode
      if (citizenId && companycode) {
        const payload = {
          idCard: citizenId,
          companyCode: companycode,
        }
        const result = await this.$store.dispatch(
          'ship/safetyTraining/checkPersonTraining',
          payload
        )
        this.form.trainingStatus = result.data.status === 'N'
        this.updateTrainngStatus++
      }
    },
    validateCitizen() {
      return (
        (this.form.citizenId.length >= 8 && this.form.citizenId.length <= 9) ||
        this.form.citizenId.length === 13
      )
    },
    checkBlackList: _.debounce(async function () {
      try {
        const checkValidationForm = [
          'กรุณากรอกรหัสประชาชน',
          'หมายเลขบัตรประชาชนหรือ Passport ไม่ถูกต้อง',
        ].includes(document.querySelector('.ant-form-explain')?.textContent)
        if (this.validateCitizen() && !checkValidationForm) {
          await this.$store.dispatch(
            'ship/accessControlInterface/checkBlacklist',
            this.form.citizenId
          )
          if (this.getBlackList?.id) {
            this.blackListModal.content =
              'ไม่สามารถลงทะเบียนได้เนื่องจากหมายเลขบัตรประชาชนหรือ Passport ติด Blacklist'
            this.blackListModal.active = true
          }
        }
      } catch (err) {
        console.log(err)
        this.checkTrainingStatus()
        this.$store.commit('ship/accessControlInterface/SET_BLACK_LIST', {})
      }
    }, 1000),
    selectPersonalType(id) {
      const find = this.getPersonalType.find((element) => element.id === id)
      this.form.personName = find?.nameTh
    },
    selectPosition(code) {
      const find = this.getPosition.find(
        (element) => element.positionCode === code
      )
      this.form.positionName = find?.positionName
    },
    disabledEndDate(endValue) {
      const startValue = this.form.startDate
      if (!endValue || !startValue) {
        return false
      }
      return startValue.valueOf() >= endValue.valueOf()
    },
    async confirmConsentModal(status) {
      this.form.consentStatus = status
      this.pdpaModal = false
      this.$store.commit('global/SET_OPEN_LOADER')
      const payload = {
        identifier: this.form.citizenId,
        requestInformation: `eyJhbGciOiJSUzUxMiJ9.eyJvdEp3dFZlcnNpb24iOjEsInByb2Nlc3NJZCI6IjFmYTVjZGNjLTNjMzQtNDlhOC1hMGM3LTAzNDBkMGQxODU1MiIsInByb2Nlc3NWZXJzaW9uIjoxLCJpYXQiOiIyMDIyLTA4LTEwVDA1OjMxOjExLjU4NyIsIm1vYyI6IkFQSSIsInBvbGljeV91cmkiOm51bGwsInN1YiI6IklEQ2FyZC9QYXNzcG9ydCBObyIsImlzcyI6bnVsbCwidGVuYW50SWQiOiIwZmY3N2QwNS1iMzcwLTRkODAtYTA1MS03OTlkMGU1Y2I3ODgiLCJkZXNjcmlwdGlvbiI6IlBUVCBTSElQIENvbGxlY3Rpb24gUG9pbnQgVGVzdDIiLCJjb25zZW50VHlwZSI6IkNPTkRJVElPTkFMVFJJR0dFUiIsImFsbG93Tm90R2l2ZW5Db25zZW50cyI6dHJ1ZSwiZG91YmxlT3B0SW4iOmZhbHNlLCJwdXJwb3NlcyI6W3siaWQiOiJkZjU4ZDM4MS1mODlhLTQxNDEtYWJlMy1jYzcyYWVlNGQzZGIiLCJ2ZXJzaW9uIjoxLCJwYXJlbnRJZCI6bnVsbCwidG9waWNzIjpbXSwiY3VzdG9tUHJlZmVyZW5jZXMiOltdLCJlbmFibGVHZW9sb2NhdGlvbiI6ZmFsc2V9XSwibm90aWNlcyI6W10sImRzRGF0YUVsZW1lbnRzIjpbIkVtYWlsIiwiUHJlZml4IiwiRmlyc3ROYW1lIiwiTGFzdE5hbWUiXSwiYXV0aGVudGljYXRpb25SZXF1aXJlZCI6ZmFsc2UsInJlY29uZmlybUFjdGl2ZVB1cnBvc2UiOmZhbHNlLCJvdmVycmlkZUFjdGl2ZVB1cnBvc2UiOnRydWUsImR5bmFtaWNDb2xsZWN0aW9uUG9pbnQiOmZhbHNlLCJhZGRpdGlvbmFsSWRlbnRpZmllcnMiOlsiRW1haWwiXSwibXVsdGlwbGVJZGVudGlmaWVyVHlwZXMiOmZhbHNlLCJlbmFibGVQYXJlbnRQcmltYXJ5SWRlbnRpZmllcnMiOmZhbHNlLCJwYXJlbnRQcmltYXJ5SWRlbnRpZmllcnNUeXBlIjpudWxsLCJhZGRpdGlvbmFsUGFyZW50SWRlbnRpZmllclR5cGVzIjpbXSwiZW5hYmxlR2VvbG9jYXRpb24iOmZhbHNlfQ.FYfqDWReI53SfLtP-6v7dqBCz3lEQjNuB0wGA0r-zcrRPH2_YUoLhCCj22VUG6rLY4AUygEORyVtuLYcLz8mXWWTVD4RirvJ2T-IInnNdTbOwm812ZBDmLeTtTzZio2seuqMJvGaDx9ogl3BChWOaz5lzN4ipdl7UKomYi4304HnAYeZXOgzQVbYgF25c_xVu3N0WgfkWL871Fz1NywoQA9A9pEtRUOvZJHMRusZAwnuz7JJCsvMLP_gM7YwnFX_qoYTuqmtwzSe_gSE4ygWZywLz2c3oaMY08lHjZlUk79x59EkAv74cWxFayj4oWaebWW2wNx6-u9nbAuhGfnF280CNyonjs_NH7FCYaO7x0sNFU8itFJc04Z6zjqYCRZV0G59lVW82RI6oTANJyH69temNcf0dntiXLSMi3sytwI5XKE1OkYPohgHcRKeYapb_o5QSBqs35Y77aLVv933A3Y4ruoGZbomkDm_PrS4AX4LKGj-QYNHZ3V8PbB2BYjseXOkXKk4CGb0ChhfRBjE82gI9fWjcC0nx3HsOehnFtNSAwKnlhEGcyYhJphOc7QRGw8KP4EkiOWoPjTXffk-rpRdmczqZQzIRnJsSPMDKwGbcR6m0qxhD3mD9MVPU43mDy4vsHokQQSLrtoAjxB_2idKWiIoSl2dZ7-u3rKF-RU`,
        purposes: [
          {
            id: 'df58d381-f89a-4141-abe3-cc72aee4d3db',
            transactionType: status ? 'CONFIRMED' : 'WITHDRAWN',
          },
        ],
        dsDataElements: {
          email: this.form.email,
          prefix: this.form.titleName,
          firstName: this.form.firstname,
          lastName: this.form.lastname,
        },
      }
      const result = await this.$store.dispatch(
        'ship/pdpaInterface/consentForVisitor',
        payload
      )
      if (result) {
        await this.$store.dispatch('preRegister/updatePreRegister', this.form)
      }
      this.$store.commit('global/SET_CLOSE_LOADER')
    },
  },
}
</script>
