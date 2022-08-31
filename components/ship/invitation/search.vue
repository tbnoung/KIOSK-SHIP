<template>
  <div>
    <a-row type="flex" justify="center">Invitation </a-row>
    <a-row class="mt-5">กรอกเพื่อทำการค้นหา</a-row>
    <a-row type="flex" :gutter="[20, 0]" class="mt-5">
      <a-col :span="5" class="text-center pt-1">
        <span>ชื่อ VIP</span>
      </a-col>
      <a-col :span="7">
        <a-input v-model="firstNameAndLastName" />
      </a-col>
      <a-col :span="5" class="text-center pt-1">
        <span>ผู้ควบคุมงาน</span>
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
          <a-select-option v-for="companys in getCompany" :key="companys">
            {{ companys }}
          </a-select-option>
        </a-select>
      </a-col>
      <!-- <a-col :span="5" class="text-center pt-1">
        <span>ช่วงเวลาที่อนุญาติให้ปฏิบัติงาน</span>
      </a-col>
      <a-col :span="7">
        <a-input placeholder="search text" />
      </a-col> -->
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
    </a-row>
    <a-row type="flex" justify="center" class="mt-5">
      <a-button class="mr-3" type="primary" @click="searchHistory(1)"
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
      getCompany: ['บริษัท 1', 'บริษัท 2', 'บริษัท 3'],
      getStatus: ['กำลังดำเนินการ', 'อนุมัติ', 'ไม่อนุมัติ', 'นำกลับมาเเก้ไข'],
    }
  },
  computed: {
    getTimeWork() {
      return this.$store.getters['timeWork/getTimeWorkData']
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
    },
    searchHistory(page = 1) {
      const dayStart = _.cloneDeep(this.dayStart)
      const expireDay = _.cloneDeep(this.expireDay)
      const setPayload = {
        firstNameAndLastName: this.firstNameAndLastName,
        company: this.company,
        agencyApprover: this.agencyApprover,
        dayStart: dayStart ? moment(dayStart).format('DD/MM/YYYY') : '',
        expireDay: expireDay ? moment(expireDay).format('DD/MM/YYYY') : '',
        timeWorkId: this.timeWorkId,
        page,
      }
      this.$emit('searchHistory', setPayload)
    },
  },
}
</script>
