<template>
  <div>
    <a-form-model ref="formContact" :model="form" :rules="rules">
      <!--------------------locationType field -------------------------->
      <a-row :key="updateAreaTable" type="flex">
        <a-col :span="24" class="mb-8">
          <ShipPreregisContactTableArea
            :props-form="propsForm"
            @addArea="addArea"
            @deleteArea="deleteArea"
            @editArea="editArea"
          />
        </a-col>
      </a-row>
      <!-------------------- purposeOfUseSpace field -------------------------->
      <a-row type="flex">
        <a-col :span="8" class="pt-2"
          >{{ $t('ShipPreregister.label.purposeOfUseSpace') }}
          <SharesFormRequiredLabel />
        </a-col>
        <a-col :span="16">
          <a-form-model-item prop="objectiveWorkId">
            <a-select
              v-model="form.objectiveWorkId"
              show-search
              :filter-option="$global.filterOption"
              :placeholder="$t('ShipPreregister.placeholder.select')"
              :disabled="!$shipPermission.canEditShip(form, $route)"
              @select="selectObjectiveWork"
            >
              <a-select-option
                v-for="objectiveWork in getObjectiveWork"
                :key="objectiveWork.id"
                :value="objectiveWork.id"
              >
                {{ objectiveWork.nameTh }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row v-if="activeFieldObjectiveWorkName" type="flex" justify="end">
        <a-col :span="8" class="pt-2">
          <a-row type="flex" justify="end" class="pr-5">{{
            $t('ShipPreregister.label.detailOfPurposeOfUseSpace')
          }}</a-row>
        </a-col>
        <a-col :span="16">
          <a-form-model-item>
            <a-input
              v-model="form.objectiveWorkName"
              :disabled="!$shipPermission.canEditShip(form, $route)"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <!--------------------detailOfWork field -------------------------->
      <a-row type="flex">
        <a-col :span="8" class="pt-2"
          >{{ $t('ShipPreregister.label.detailOfWork') }}
          <SharesFormRequiredLabel v-if="propDetail" />
        </a-col>
        <a-col :span="16">
          <a-form-model-item :prop="propDetail">
            <a-input
              v-model="form.detailPreregistor"
              type="textarea"
              :disabled="!$shipPermission.canEditShip(form, $route)"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <!-------------------- Moc -------------------------->
      <a-row type="flex">
        <span class="pr-3"
          >กรณีเป็นงานที่ปฏิบัติงานโครงการปรับปรุงเปลี่ยนเเปลงภายในโรงงาน</span
        >
        <a-checkbox
          v-model="form.factoryDatabaseStatus"
          :disabled="!$shipPermission.canEditShip(form, $route)"
        />
      </a-row>
      <a-row v-if="form.factoryDatabaseStatus" type="flex">
        <a-col :span="24">
          <ShipPreregisContactTableMOC
            :data-table="form.shipPreregistorMoc"
            :props-form="form"
            @addMOC="addMOC"
            @deleteMOC="deleteMOC"
          />
        </a-col>
      </a-row>
      <!--------------------ผู้ควบคุมงาน label -------------------------->
      <a-row type="flex" class="my-5">ผู้ควบคุมงาน </a-row>
      <!--------------------ชื่อหรือรหัสพนักงาน  -------------------------->
      <a-row type="flex">
        <a-col :span="8" class="pt-2"
          >กรอกชื่อหรือรหัสพนักงาน
          <SharesFormRequiredLabel />
        </a-col>
        <a-col :span="16">
          <a-form-model-item>
            <!-- <a-input v-model="employeeApprover" /> -->
            <a-select
              v-model="form.employeeApprover"
              show-search
              @search="searchEmployeeList"
              @change="selectEmployeeApprover"
            >
              <a-select-option
                v-for="employee in employeeApproverList"
                :key="employee.CODE"
                :value="employee.CODE"
              >
                <div>
                  <span
                    >{{ employee.FULLNAMETH }} ({{ employee.EmailAddr }})</span
                  >
                </div>
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>
      <!--------------------หน่วยงาน  -------------------------->
      <a-row type="flex">
        <a-col :span="8" class="pt-2">หน่วยงาน </a-col>
        <a-col :span="16">
          <a-form-model-item>
            <a-input v-model="form.agencyApprover" disabled />
          </a-form-model-item>
        </a-col>
      </a-row>
      <!-------------------- เบอร์ติดต่อ -------------------------->
      <a-row type="flex">
        <a-col :span="8" class="pt-2">เบอร์ติดต่อ </a-col>
        <a-col :span="16">
          <a-form-model-item>
            <a-input v-model="form.mobileApprover" disabled />
          </a-form-model-item>
        </a-col>
      </a-row>
      <!-------------------- อีเมล์ -------------------------->
      <a-row type="flex">
        <a-col :span="8" class="pt-2">อีเมล์ </a-col>
        <a-col :span="16">
          <a-form-model-item>
            <a-input v-model="form.emailApprover" disabled />
          </a-form-model-item>
        </a-col>
      </a-row>
      <!-------------------- รายละเอียดเพิ่มเติม -------------------------->
      <a-row type="flex">
        <a-col :span="24" class="pt-2 mb-5">รายละเอียดเพิ่มเติม </a-col>
        <a-col :span="8" class="pt-2"
          >นำยานพาหนะเข้าพื้นที่หรือไม่
          <SharesFormRequiredLabel />
        </a-col>
        <a-col :span="16">
          <a-form-model-item>
            <a-radio-group
              v-model="form.vehicleCar"
              :disabled="!$shipPermission.canEditShip(form, $route)"
              :default-value="1"
            >
              <a-radio
                v-for="item in otherRadio"
                :key="item.id"
                :value="item.value"
                class="pr-10"
                >{{ item.text }}
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="8" class="pt-2"
          >นำพัสดุเข้าพื้นที่หรือไม่
          <SharesFormRequiredLabel />
        </a-col>
        <a-col :span="16">
          <a-form-model-item>
            <a-radio-group
              v-model="form.vehicleItem"
              :disabled="!$shipPermission.canEditShip(form, $route)"
              :default-value="1"
            >
              <a-radio
                v-for="item in otherRadio"
                :key="item.id"
                :value="item.value"
                class="pr-10"
                >{{ item.text }}
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
    <ShipPreregisContactErrorRequireField
      :active="activeErrorModal"
      text-cancle="Cancle"
      :props-form="requireFieldError"
      @close="activeErrorModal = false"
    />
  </div>
</template>

<script>
import rulesValidateForm from '@/mixins/ship/rules'
export default {
  mixins: [rulesValidateForm],
  props: {
    propsForm: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      updateAreaTable: 0,
      employeeApprover: '',
      selectedMoc: false,
      form: {},
      getSubAreaZone: [],
      otherRadio: [
        { id: 1, text: 'นำเข้า', value: 2 },
        { id: 2, text: 'ไม่ได้นำเข้า', value: 1 },
      ],
      activeErrorModal: false,
      requireFieldError: [
        {
          title: 'ข้อมูลรหัสบัตรประชาชน',
          path: '',
          requireField: [],
        },
        {
          title: 'ข้อมูลส่วนบุคคล',
          path: '',
          query: {},
          requireField: [],
        },
        {
          title: 'กรุณายินยอมการเก็บข้อมูลส่วนบุคคล ดังนี้',
          path: '',
          query: {},
          requireField: [],
        },
      ],
    }
  },
  computed: {
    timeWorks() {
      return `${this.form.peregistorTimeStart} - ${this.form.peregistorTimeEnd}`
    },
    activeFieldObjectiveWorkName() {
      return this.form.objectiveWorkId === 9999
    },
    getAreaZone() {
      return this.$store.getters['areaZone/getAreaZone'].filter(
        (element) => element.status === true
      )
    },
    getObjectiveWork() {
      return this.$store.getters['objectiveWork/getObjectiveWorkData'].filter(
        (element) => element.status === true
      )
    },
    showSubArea() {
      return this.form.subareazonename || this.getSubAreaZone.length > 0
    },
    employeeApproverList() {
      return this.$store.getters['ship/PISInterface/getEmployeeApproverList']
    },
    getStatusRequireField() {
      return this.$store.getters['RequireFields/getStatusRequireField']
    },
    propDetail() {
      return this.getStatusRequireField.detail ? 'detailPreregistor' : ''
    },
  },
  mounted() {
    this.$nuxt.$on('submitFormContact', (checkForm = false) => {
      this.onSubmit(checkForm)
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('submitFormContact')
  },
  async created() {
    this.form = this.propsForm
    this.mapSubAreaZone()
    await this.$store.dispatch(
      'ship/PISInterface/getEmployeeById',
      this.form.employeeApprover
    )
  },
  methods: {
    searchEmployeeList: _.debounce(async function (search) {
      try {
        await this.$store.dispatch('ship/PISInterface/getEmployeeById', search)
      } catch (err) {
        console.log(err)
      }
    }, 1000),
    validateFormSubmit() {
      if (this.validateRequireField()) {
        this.form.status = 1
        this.$emit('onSubmit')
      } else {
        this.activeErrorModal = true
      }
    },
    validateRequireField() {
      this.checkStepDetail()
      // this.checkConsent()
      return (
        this.requireFieldError[1].requireField.length === 0 &&
        this.requireFieldError[2].requireField.length === 0
      )
    },
    checkStepDetail() {
      const requireField = [
        { key: 'titleName', textError: 'คุณยังไม่ทำการเลือกคำนำหน้า' },
        { key: 'firstname', textError: 'คุณยังไม่ทำการกรอกชื่อ' },
        { key: 'lastname', textError: 'คุณยังไม่ทำการกรอกนามสกุล' },
        { key: 'companyName', textError: 'คุณยังไม่ทำการเลือกบริษัท' },
        // { key: 'mobile', textError: 'คุณยังไม่ทำการกรอกเบอร์โทรติดต่อ' },
        { key: 'email', textError: 'คุณยังไม่ทำการกรอก email' },
        { key: 'positionName', textError: 'คุณยังไม่ทำการเลือกตำเเหน่ง' },
        { key: 'personName', textError: 'คุณยังไม่ทำการเลือกประเภทบุคคล' },
        {
          key: 'peregistorTimeStart',
          textError: 'คุณยังไม่ทำการเลือกวันเริ่มเข้าปฏิบัติงาน',
        },
        {
          key: 'peregistorTimeEnd',
          textError: 'คุณยังไม่ทำการเลือกวันออกปฏิบัติงาน',
        },
        {
          key: 'startDate',
          textError: 'คุณยังไม่ทำการเลือกช่วงเวลาเข้าปฏิบัติงาน',
        },
        {
          key: 'expireDate',
          textError: 'คุณยังไม่ทำการเลือกช่วงเวลาออกปฏิบัติงาน',
        },
        {
          key: 'image',
          textError: 'คุณยังไม่ได้อัพโหลดรูปภาพ',
        },
      ]
      for (const item of requireField) {
        if (this.form[item.key] === '') {
          this.requireFieldError[1].requireField.push(item.textError)
        }
      }
      this.requireFieldError[1].path = `/ship/pre-register/${this.form.id}/detail`
      this.requireFieldError[1].query = { error: 'errorRequireField' }
      if (this.$route?.query?.nonAccount === 'true') {
        this.requireFieldError[1].query = {
          nonAccount: 'true',
          error: 'errorRequireField',
        }
      }
      return this.requireFieldError[1].requireField.length === 0
    },
    checkConsent() {
      const checkConsent = this.form.consentStatus !== true
      if (checkConsent) {
        this.requireFieldError[2].requireField.push(
          `${this.form.titleName} ${this.form.firstname} ${this.form.lastname}`
        )
      }
      for (const item of this.form.shipPreregistorFollow) {
        if (!item.consentStatus) {
          this.requireFieldError[2].requireField.push(
            `${item.titleName} ${item.firstname} ${item.lastname}`
          )
        }
      }
      this.requireFieldError[2].query = { error: 'errorConsentStatus' }
      this.requireFieldError[2].path = `/ship/pre-register/${this.form.id}/detail`
      return this.requireFieldError[2].requireField.length === 0
    },
    onSubmit(checkForm) {
      this.$refs.formContact.validate((valid) => {
        if (valid) {
          if (checkForm) {
            this.validateFormSubmit()
          } else {
            this.$emit('onSubmit')
          }
        } else {
          setTimeout(() => {
            const element = document.querySelector('.ant-form-explain')
            this.$global.scrollToElement(element, 'center')
          }, 100)
          return false
        }
      })
    },
    addMOC(val) {
      this.form.shipPreregistorMoc = _.unionBy(
        this.form.shipPreregistorMoc,
        val,
        'mocNo'
      )
    },
    deleteMOC(val) {
      const findIndex = this.findElement(val)
      this.form.shipPreregistorMoc.splice(findIndex, 1)
    },
    findElement(record) {
      const findElement = (element) => element.id === record.id
      return this.form.shipPreregistorMoc.findIndex(findElement)
    },
    selectObjectiveWork(id) {
      if (id === 9999) {
        this.form.objectiveWorkName = ''
      } else {
        const find = this.getObjectiveWork.find((element) => element.id === id)
        this.form.objectiveWorkName = find.nameTh
      }
    },
    selectAreaZone(id) {
      const find = this.getAreaZone.find((element) => element.id === id)
      this.form.areaZoneName = find.nameTh
      this.getSubAreaZone = find.shipSubArea
      this.form.subareazonename = ''
      this.form.subareazoneid = ''
    },
    selectSubAreaZone(id) {
      const find = this.getSubAreaZone.find((element) => element.id === id)
      this.form.subareazonename = find.nameTh
    },
    mapSubAreaZone() {
      const find = this.getAreaZone.find(
        (element) => element.id === this.form.areaZoneId
      )
      this.getSubAreaZone = find?.shipSubArea || []
    },
    selectEmployeeApprover(code) {
      const find = this.employeeApproverList.find(
        (element) => element.CODE === code
      )
      this.form.agencyApprover = find?.POSNAME
      this.form.mobileApprover = find?.mobile
      this.form.emailApprover = find?.EmailAddr
    },
    addArea(record) {
      this.form.shipUserarea.push(record)
    },
    deleteArea(index) {
      this.form.shipUserarea.splice(index, 1)
    },
    editArea(item) {
      this.form.shipUserarea[item.index] = item.record
      this.updateAreaTable++
    },
  },
}
</script>
