<template>
  <a-modal
    v-model="openModal"
    centered
    :closable="false"
    :mask-closable="false"
    class="overflow-modal"
    width="850px"
  >
    <a-row slot="title" type="flex" justify="center">ผู้ติดตาม</a-row>
    <a-form-model ref="addSupporter" :model="form" :rules="rules">
      <a-row type="flex" justify="center" class="fix-content-modal">
        <a-col :span="20" :offset="0" class="mb-2"
          >ข้อมูลบุคคลที่ต้องการส่ง Invitation</a-col
        >
        <a-col :span="20">
          <!-- -----------------------คำนำหน้า------------------------------ -->
          <a-row type="flex" class="mt-3">
            <a-col :span="10" class="pl-5 pt-1"
              >คำนำหน้า
              <SharesFormRequiredLabel />
            </a-col>
            <a-col :span="14">
              <a-form-model-item prop="titleName">
                <a-select
                  v-model="form.titleName"
                  show-search
                  :filter-option="$global.filterOption"
                >
                  <a-select-option v-for="title in getTitle" :key="title">
                    {{ title }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
          </a-row>
          <!-- -----------------------ชื่อ------------------------------ -->
          <a-row type="flex">
            <a-col :span="10" class="pl-5 pt-1"
              >ชื่อ
              <SharesFormRequiredLabel />
            </a-col>
            <a-col :span="14">
              <a-form-model-item prop="firstname">
                <a-input v-model="form.firstname" />
              </a-form-model-item>
            </a-col>
          </a-row>
          <!-- -----------------------นามสกุล------------------------------ -->
          <a-row type="flex">
            <a-col :span="10" class="pl-5 pt-1"
              >นามสกุล
              <SharesFormRequiredLabel />
            </a-col>
            <a-col :span="14">
              <a-form-model-item prop="lastname">
                <a-input v-model="form.lastname" />
              </a-form-model-item>
            </a-col>
          </a-row>
          <!-- -----------------------บริษัท------------------------------ -->
          <a-row type="flex">
            <a-col :span="10" class="pl-5 pt-1"
              >บริษัท
              <SharesFormRequiredLabel />
            </a-col>
            <a-col :span="14">
              <a-form-model-item prop="companyName">
                <a-select
                  v-model="form.companyName"
                  show-search
                  :filter-option="$global.filterOption"
                  :placeholder="$t('ShipPreregister.placeholder.select')"
                >
                  <a-select-option v-for="company in getCompany" :key="company">
                    {{ company }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
          </a-row>
          <!-- -----------------------เบอร์ติดต่อ------------------------------ -->
          <a-row type="flex">
            <a-col :span="10" class="pl-5 pt-1">เบอร์ติดต่อ</a-col>
            <a-col :span="14">
              <a-form-model-item>
                <a-input v-model="form.mobile" />
              </a-form-model-item>
            </a-col>
          </a-row>
          <!-- -----------------------อีเมล์------------------------------ -->
          <a-row type="flex">
            <a-col :span="10" class="pl-5 pt-1">อีเมล์</a-col>
            <a-col :span="14">
              <a-form-model-item>
                <a-input v-model="form.email" />
              </a-form-model-item>
            </a-col>
          </a-row>
          <!--------------------date field -------------------------->
          <a-row type="flex">
            <a-col :span="10" class="mt-2"
              >วันที่เริ่ม - สิ้นสุดการปฏิบัติงาน
              <SharesFormRequiredLabel />
            </a-col>
            <a-col :span="7">
              <a-form-model-item prop="startDate">
                <a-date-picker
                  v-model="form.startDate"
                  type="date"
                  :disabled-date="$global.disabledDate"
                  placeholder="Pick a date"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="7">
              <a-form-model-item prop="expireDate">
                <a-date-picker
                  v-model="form.expireDate"
                  type="date"
                  :disabled-date="$global.disabledDate"
                  placeholder="Pick a date"
                />
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row type="flex">
            <a-col :span="10" class="pt-2"
              >ช่วงเวลาการอนุญาตให้ปฏิบัติงาน
              <SharesFormRequiredLabel />
            </a-col>
            <a-col :span="14">
              <a-form-model-item prop="timeWorkId">
                <a-select
                  v-model="form.timeWorkId"
                  show-search
                  :filter-option="$global.filterOption"
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
            <a-col :span="10">
              <a-row type="flex" justify="end" class="pr-5 pt-2"
                >กำหนดช่วงเวลา</a-row
              >
            </a-col>
            <a-col :span="6">
              <a-form-model-item prop="peregistorTimeStart">
                <a-input
                  v-model="form.peregistorTimeStart"
                  placeholder="เริ่มต้น"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="2">
              <a-row type="flex" justify="center" class="pt-1">-</a-row>
            </a-col>
            <a-col :span="6">
              <a-form-model-item prop="peregistorTimeEnd">
                <a-input
                  v-model="form.peregistorTimeEnd"
                  placeholder="สิ้นสุด"
                />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-form-model>
    <a-row slot="footer" type="flex" justify="end">
      <a-button type="danger" @click="$emit('close')">{{
        textCancle
      }}</a-button>
      <a-button
        v-if="textConfirm"
        type="primary"
        class="ml-3"
        @click="addSupporter"
        >{{ textConfirm }}</a-button
      >
    </a-row>
  </a-modal>
</template>

<script>
import rulesValidateForm from '@/mixins/ship/rules'
export default {
  mixins: [rulesValidateForm],
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    propsForm: {
      type: Object,
      default: null,
    },
    currentForm: {
      type: Object,
      default: null,
    },
    textConfirm: {
      type: String,
      default: null,
    },
    textCancle: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      updateComponent: 0,
      openModal: false,
      getCompany: ['บริษัท 1', 'บริษัท 2', 'บริษัท 3'],
      getTitle: ['นาย', 'นาง', 'นางสาว'],
      form: {},
    }
  },
  computed: {
    getAreaZone() {
      return this.$store.getters['areaZone/getAreaZone']
    },
    getObjectiveWork() {
      return this.$store.getters['objectiveWork/getObjectiveWorkData']
    },
    getTimeWork() {
      return this.$store.getters['timeWork/getTimeWorkData']
    },
    activeFieldTime() {
      return this.form.timeWorkId === 0
    },
  },
  watch: {
    active() {
      this.form = _.cloneDeep(this.$enum.preregister.defaultPopupFormDetail)
      this.form.startDate = this.currentForm?.startDate
      this.form.expireDate = this.currentForm?.expireDate
      this.form.peregistorTimeStart = this.currentForm?.peregistorTimeStart
      this.form.peregistorTimeEnd = this.currentForm?.peregistorTimeEnd
      this.form.timeWorkId = this.currentForm?.timeWorkId
      if (this.propsForm) {
        this.form = this.propsForm
      }
      this.openModal = this.active
    },
  },
  methods: {
    addSupporter() {
      this.$refs.addSupporter.validate((valid) => {
        if (valid) {
          this.$emit('confirm', this.form)
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
  },
}
</script>
