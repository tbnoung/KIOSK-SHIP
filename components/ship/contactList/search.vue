<template>
  <div>
    <a-row type="flex" justify="center">ข้อมูลผู้ลงทะเบียน </a-row>
    <a-row class="mt-5">กรอกเพื่อทำการค้นหา</a-row>
    <a-row type="flex" :gutter="[20, 0]" class="mt-5">
      <a-col :span="5" class="text-center pt-1">
        <span>เลขบัตรประจำตัวประชาชน</span>
      </a-col>
      <a-col :span="7">
        <a-input v-model="citizenIdOrPassport" />
      </a-col>
      <a-col :span="5" class="text-center pt-1">
        <span>ชื่อ - นามสกุล</span>
      </a-col>
      <a-col :span="7">
        <a-input v-model="fristNameAndLastName" />
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
            :value="companys.company_name"
          >
            {{ companys.company_name }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :span="5" class="text-center pt-1">
        <span>สถานะยินยอมจัดเก็บข้อมูล</span>
      </a-col>
      <a-col :span="7">
        <a-select
          v-model="consentStatus"
          show-search
          :filter-option="$global.filterOption"
          style="width: 100%"
        >
          <a-select-option
            v-for="(item, index) in getConsentStatus"
            :key="index"
            :value="item.value"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <a-row type="flex" justify="center" class="mt-5">
      <a-button class="mr-3" type="primary" @click="search()">ค้นหา</a-button>
      <a-button class="btn-yellow" @click="resetField">Reset</a-button>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fristNameAndLastName: '',
      company: '',
      citizenIdOrPassport: '',
      consentStatus: '',
      getConsentStatus: [
        { value: true, name: 'ยินยอมจัดเก็บข้อมูลส่วนบุคคล' },
        { value: false, name: 'ยังไม่ยินยอมจัดเก็บข้อมูลส่วนบุคคล' },
      ],
    }
  },
  computed: {
    getCompany() {
      return this.$store.getters['ship/accessControlInterface/getCompanyList']
    },
  },
  mounted() {
    this.$nuxt.$on('changePage', (page) => {
      this.search(page)
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('changePage')
  },
  methods: {
    search(page = 1) {
      const payload = {
        fristNameAndLastName: this.fristNameAndLastName,
        company: this.company,
        citizenIdOrPassport: this.citizenIdOrPassport,
        consentStatus: this.consentStatus,
        pageSize: 5,
        page,
      }
      this.$emit('updateDataTable', payload)
    },
    resetField() {
      this.fristNameAndLastName = ''
      this.company = ''
      this.citizenIdOrPassport = ''
      this.consentStatus = ''
      this.search()
    },
  },
}
</script>
