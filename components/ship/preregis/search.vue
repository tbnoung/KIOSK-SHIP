<template>
  <div>
    <a-row type="flex" justify="center"> รายการลงทะเบียน </a-row>
    <a-row class="mt-5">กรอกเพื่อทำการค้นหา</a-row>
    <a-row type="flex" :gutter="[20, 0]" class="mt-5">
      <a-col :span="5" class="text-center pt-1">
        <span>ชื่อ - นามสกุล</span>
      </a-col>
      <a-col :span="7">
        <a-input v-model="firstNameAndLastName" />
      </a-col>
      <a-col :span="5" class="text-center pt-1">
        <span>ผู้ควบคุมงาน ปตท.</span>
      </a-col>
      <a-col :span="7">
        <a-select
          v-model="agencyApprover"
          show-search
          :filter-option="$global.filterOption"
          style="width: 100%"
        >
          <!-- <a-select-option v-for="company in getCompany" :key="company">
            {{ company }}
          </a-select-option> -->
        </a-select>
      </a-col>
    </a-row>
    <a-row type="flex" :gutter="[20, 0]" class="mt-5">
      <a-col :span="5" class="text-center pt-1">
        <span>บริษัท</span>
      </a-col>
      <a-col :span="7">
        <a-select
          v-model="company"
          show-search
          :filter-option="$global.filterOption"
          style="width: 100%"
        >
          <a-select-option
            v-for="companys in getCompany"
            :key="companys.id"
            :value="companys.id"
          >
            {{ companys.company_name }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :span="5" class="text-center pt-1">
        <span>สถานะ</span>
      </a-col>
      <a-col :span="7">
        <a-select
          v-model="statusOperationId"
          show-search
          :filter-option="$global.filterOption"
          style="width: 100%"
        >
          <a-select-option
            v-for="(status, index) in getStatus"
            :key="index"
            :value="status.id"
          >
            {{ status.name }}
          </a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <a-row type="flex" :gutter="[20, 0]" class="mt-5">
      <a-col :span="5" class="text-center pt-1">
        <span>วันที่เริ่ม - สิ้นสุดการปฏิบัติงาน</span>
      </a-col>
      <a-col :span="7">
        <a-row type="flex" :gutter="[20, 0]">
          <a-col :span="12">
            <a-date-picker
              v-model="dayStart"
              type="date"
              format="DD-MM-YYYY"
              placeholder="Pick a date"
            />
          </a-col>
          <a-col :span="12">
            <a-date-picker
              v-model="expireDay"
              type="date"
              format="DD-MM-YYYY"
              placeholder="Pick a date"
            />
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="5" class="text-center pt-1">
        <span>เลขบัตรประจำตัวประชาชน</span>
      </a-col>
      <a-col :span="7">
        <a-input v-model="citizenidOrPassportNo" />
      </a-col>
    </a-row>
    <a-row type="flex" :gutter="[20, 0]" class="mt-5">
      <a-col :span="5" class="text-center pt-1">
        <span>ช่วงระยะเวลาปฏิบัติงาน</span>
      </a-col>
      <a-col :span="7">
        <a-select
          v-model="timeWorkId"
          show-search
          :filter-option="$global.filterOption"
          style="width: 100%"
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
      </a-col>
    </a-row>
    <a-row type="flex" justify="center" class="mt-5">
      <a-button type="primary" class="mr-3" @click="searchHistory(1)"
        >ค้นหา</a-button
      >
      <a-button class="btn-yellow" @click="resetField">Reset</a-button>
    </a-row>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      firstNameAndLastName: '',
      company: '',
      agencyApprover: '',
      dayStart: '',
      expireDay: '',
      timeWorkId: '',
      statusOperationId: '',
      citizenidOrPassportNo: '',
      // getCompany: ['บริษัท 1', 'บริษัท 2', 'บริษัท 3'],
      getStatus: [
        { id: 1, name: 'รออนุมัติ' },
        { id: 2, name: 'ไม่อนุมัติ' },
        { id: 3, name: 'อนุมัติ' },
        { id: 4, name: 'นำกลับมาเเก้ไข' },
        { id: 5, name: 'ฉบับร่าง' },
      ],
    }
  },
  computed: {
    getTimeWork() {
      return this.$store.getters['timeWork/getTimeWorkData']
    },
    getCompany() {
      return this.$store.getters['ship/accessControlInterface/getCompanyList']
    },
  },
  mounted() {
    this.$nuxt.$on('searchHistory', (page) => {
      this.searchHistory(page)
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('searchHistory')
  },
  methods: {
    selectTimeWork(val) {
      if (val === 1) {
        this.search.peregistorTimeStart = ''
        this.search.peregistorTimeEnd = ''
      } else {
        const find = this.getTimeWork.find((element) => element.id === val)
        this.search.peregistorTimeStart = find.timeStart
        this.search.peregistorTimeEnd = find.timeEnd
      }
    },
    resetField() {
      this.firstNameAndLastName = ''
      this.company = ''
      this.agencyApprover = ''
      this.dayStart = ''
      this.expireDay = ''
      this.timeWorkId = ''
      this.statusOperationId = ''
      this.citizenidOrPassportNo = ''
      this.searchHistory()
    },
    searchHistory(page = 1) {
      this.$store.commit('global/SET_OPEN_LOADER')
      const dayStart = _.cloneDeep(this.dayStart)
      const expireDay = _.cloneDeep(this.expireDay)
      const checkQuery = this.$route.query?.status
      let assignApprover
      switch (checkQuery) {
        case '2':
          assignApprover = false
          break
        case '3':
          assignApprover = true
          break
        default:
          assignApprover = null
          break
      }
      const setPayload = {
        firstNameAndLastName: this.firstNameAndLastName,
        company: this.company,
        agencyApprover: this.agencyApprover,
        statusOperationId: this.statusOperationId,
        dayStart: dayStart ? moment(dayStart).format('DD/MM/YYYY') : '',
        expireDay: expireDay ? moment(expireDay).format('DD/MM/YYYY') : '',
        timeWorkId: this.timeWorkId,
        citizenidOrPassportNo: this.citizenidOrPassportNo,
        assignApprover,
        page,
      }
      this.$emit('searchHistory', setPayload)
    },
  },
}
</script>
