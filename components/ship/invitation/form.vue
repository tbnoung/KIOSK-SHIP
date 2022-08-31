<template>
  <div>
    <a-form-model ref="ruleForm" :model="form" :rules="rules">
      <a-row type="flex" justify="center">Invitation</a-row>
      <div class="mt-5">บุคคลที่ต้องการส่ง Invitation</div>
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
        <a-col :span="10" class="pl-5 pt-1"
          >เบอร์ติดต่อ
          <SharesFormRequiredLabel />
        </a-col>
        <a-col :span="14">
          <a-form-model-item prop="mobile">
            <a-input v-model="form.mobile" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <!-- -----------------------อีเมล์------------------------------ -->
      <a-row type="flex">
        <a-col :span="10" class="pl-5 pt-1"
          >อีเมล์
          <SharesFormRequiredLabel />
        </a-col>
        <a-col :span="14">
          <a-form-model-item prop="email">
            <a-input v-model="form.email" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <div class="mt-5">รายการติดต่อ</div>
      <!-- -----------------------เลือกประเภทพื้นที่เข้า------------------------------ -->
      <a-row type="flex" class="mt-3">
        <a-col :span="10" class="pl-5 pt-1"
          >เลือกประเภทพื้นที่เข้า
          <SharesFormRequiredLabel />
        </a-col>
        <a-col :span="14">
          <a-form-model-item prop="areaZoneId">
            <a-select
              v-model="form.areaZoneId"
              show-search
              :filter-option="$global.filterOption"
              :placeholder="$t('ShipPreregister.placeholder.select')"
              @change="selectAreaZone"
            >
              <a-select-option
                v-for="areaZone in getAreaZone"
                :key="areaZone.id"
                :value="areaZone.id"
              >
                {{ areaZone.nameTh }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>
      <!--------------------locationType field -------------------------->
      <a-row v-if="showSubArea" type="flex">
        <a-col :span="10" class="pt-1 pl-5"
          >พื้นที่ย่อย
          <SharesFormRequiredLabel />
        </a-col>
        <a-col :span="14">
          <a-form-model-item>
            <a-select
              v-model="form.subareazoneid"
              show-search
              :filter-option="$global.filterOption"
              :placeholder="$t('ShipPreregister.placeholder.select')"
              @change="selectSubAreaZone"
            >
              <a-select-option
                v-for="subAreaZone in getSubAreaZone"
                :key="subAreaZone.id"
                :value="subAreaZone.id"
              >
                {{ subAreaZone.nameTh }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>
      <!-- -----------------------วัตถุประสงค์ในการเข้าพื้นที่------------------------------ -->
      <a-row type="flex">
        <a-col :span="10" class="pl-5 pt-1"
          >วัตถุประสงค์ในการเข้าพื้นที่
          <SharesFormRequiredLabel />
        </a-col>
        <a-col :span="14">
          <a-form-model-item prop="objectiveWorkId">
            <a-select
              v-model="form.objectiveWorkId"
              show-search
              :filter-option="$global.filterOption"
              :placeholder="$t('ShipPreregister.placeholder.select')"
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
      <!-- -----------------------รายละเอียดงานที่เข้ามาปฏิบัติงาน------------------------------ -->
      <a-row type="flex">
        <a-col :span="10" class="pl-5 pt-1"
          >รายละเอียดงานที่เข้ามาปฏิบัติงาน
          <SharesFormRequiredLabel />
        </a-col>
        <a-col :span="14">
          <a-form-model-item prop="detailPreregistor">
            <a-input v-model="form.detailPreregistor" type="textarea" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <!-- -----------------------วันที่เริ่ม - สิ้นสุดการปฏิบัติงาน------------------------------ -->
      <a-row type="flex">
        <a-col :span="10" class="pl-5 pt-1"
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
              :disabled-date="disabledEndDate"
              placeholder="Pick a date"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <!-- ----------------------ช่วงระยะเวลาการอนุญาติให้ปฏิบัติงาน------------------------------ -->
      <a-row type="flex">
        <a-col :span="10" class="pl-5 pt-1"
          >ช่วงระยะเวลาการอนุญาติให้ปฏิบัติงาน
          <SharesFormRequiredLabel />
        </a-col>
        <a-col :span="14">
          <a-form-model-item prop="timeWorkId">
            <a-select
              v-model="form.timeWorkId"
              show-search
              :filter-option="$global.filterOption"
              :placeholder="$t('ShipPreregister.placeholder.select')"
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
              :disabled="!$shipPermission.canEditShip(form, $route)"
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
              :disabled="!$shipPermission.canEditShip(form, $route)"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
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
      getSubAreaZone: [],
      getCompany: ['บริษัท 1', 'บริษัท 2', 'บริษัท 3'],
      getTitle: ['นาย', 'นาง', 'นางสาว'],
    }
  },
  computed: {
    showSubArea() {
      return this.form.subareazonename || this.getSubAreaZone.length > 0
    },
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
  mounted() {
    this.$nuxt.$on('submitInvitation', () => {
      this.onSubmit()
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('submitInvitation')
  },
  created() {
    this.form = this.propsForm
    this.mapSubAreaZone()
  },
  methods: {
    selectObjectiveWork(id) {
      if (id === 9999) {
        this.form.objectiveWorkName = ''
      } else {
        const find = this.getObjectiveWork.find((element) => element.id === id)
        this.form.objectiveWorkName = find.nameTh
      }
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
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('onSubmit')
        } else {
          setTimeout(() => {
            const element = document.querySelector('.ant-form-explain')
            this.$global.scrollToElement(element, 'center')
          }, 100)
        }
      })
    },
    // selectAreaZone(id) {
    //   const find = this.getAreaZone.find((element) => element.id === id)
    //   this.form.areaZoneName = find.nameTh
    // },
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
    disabledEndDate(endValue) {
      const startValue = this.form.startDate
      if (!endValue || !startValue) {
        return false
      }
      return startValue.valueOf() >= endValue.valueOf()
    },
  },
}
</script>
