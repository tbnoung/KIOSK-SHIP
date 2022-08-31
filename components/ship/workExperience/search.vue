<template>
  <div>
    <a-row type="flex" justify="center"> ตรวจสอบอายุการปฏิบัติงาน </a-row>
    <a-row class="mt-5">กรอกเพื่อทำการค้นหา</a-row>
    <a-row type="flex" :gutter="[20, 0]" class="mt-5">
      <a-col :span="5" class="text-center pt-1">
        <span>ชื่อ - นามสกุล</span>
      </a-col>
      <a-col :span="7">
        <a-input v-model="name" />
      </a-col>
      <a-col :span="5" class="text-center pt-1">
        <span>เลขบัตรประชาชน</span>
      </a-col>
      <a-col :span="7">
        <a-input v-model="citizenId" />
      </a-col>
    </a-row>
    <a-row type="flex" :gutter="[20, 0]" class="mt-5">
      <a-col v-if="!$shipUser.isUser()" :span="5" class="text-center pt-1">
        <span>บริษัท</span>
      </a-col>
      <a-col v-if="!$shipUser.isUser()" :span="7">
        <a-select
          v-model="companyCode"
          show-search
          :filter-option="$global.filterOption"
          style="width: 100%"
        >
          <a-select-option
            v-for="companys in getCompany"
            :key="companys.company_code"
            :value="companys.company_code"
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
          v-model="status"
          show-search
          :filter-option="$global.filterOption"
          style="width: 100%"
        >
          <a-select-option
            v-for="(item, index) in getStatus"
            :key="index"
            :value="item.value"
          >
            {{ item.name }}
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
              v-model="startDate"
              type="date"
              format="DD-MM-YYYY"
              placeholder="Pick a date"
            />
          </a-col>
          <a-col :span="12">
            <a-date-picker
              v-model="endDate"
              type="date"
              format="DD-MM-YYYY"
              placeholder="Pick a date"
            />
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row type="flex" justify="center" class="mt-5">
      <a-button class="mr-3" type="primary" @click="searchSafetyTrainingInfo"
        >ค้นหา</a-button
      >
      <a-button class="btn-yellow" @click="resetField">Reset</a-button>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      companyCode: '',
      startDate: '',
      endDate: '',
      name: '',
      citizenId: '',
      status: '',
      getStatus: [
        { value: 'N', name: 'เข้ารับการอบรมเเล้ว' },
        { value: 'Y', name: 'ยังไม่เข้ารับการอบรม' },
      ],
    }
  },
  computed: {
    getCompany() {
      return this.$store.getters['ship/accessControlInterface/getCompanyList']
    },
  },
  methods: {
    resetField() {
      this.citizenId = ''
      this.name = ''
      this.companyCode = ''
      this.startDate = ''
      this.endDate = ''
      this.status = ''
    },
    searchSafetyTrainingInfo() {
      const payload = {
        idCard: this.citizenId,
        name: this.name,
        companyCode: this.companyCode,
        startDate: this.startDate,
        endDate: this.endDate,
        status: this.status,
      }
      this.$emit('searchSafetyTrainingInfo', payload)
    },
  },
}
</script>
