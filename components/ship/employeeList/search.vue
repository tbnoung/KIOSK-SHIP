<template>
  <div>
    <a-row type="flex" justify="center">ข้อมูลพนักงาน </a-row>
    <a-row class="mt-5">กรอกเพื่อทำการค้นหา</a-row>
    <a-row type="flex" :gutter="[20, 0]" class="mt-5">
      <a-col :span="5" class="text-center pt-1">
        <span>ชื่อ - นามสกุล</span>
      </a-col>
      <a-col :span="7">
        <a-input v-model="name" />
      </a-col>
      <a-col :span="5" class="text-center pt-1">
        <span>รหัสพนักงาน</span>
      </a-col>
      <a-col :span="7">
        <a-input v-model="employeeCode" />
      </a-col>
    </a-row>
    <a-row type="flex" :gutter="[20, 0]" class="mt-5">
      <a-col :span="5" class="text-center pt-1">
        <span>หน่วยงาน</span>
      </a-col>
      <a-col :span="7">
        <a-input v-model="unitCode" />
      </a-col>
      <a-col :span="5" class="text-center pt-1">
        <span>ตำเเหน่ง</span>
      </a-col>
      <a-col :span="7">
        <a-select v-model="positionCode" style="width: 100%">
          <a-select-option
            v-for="position in getPosition"
            :key="position.positionCode"
            :value="position.positionCode"
          >
            {{ position.positionName }}
          </a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <a-row type="flex" justify="center" class="mt-5">
      <a-button class="mr-3" type="primary" @click="search()">ค้นหา</a-button>
      <a-button class="btn-yellow" @click="clearField">Reset</a-button>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      positionCode: '',
      employeeCode: '',
      unitCode: '',
      name: '',
    }
  },
  computed: {
    getPosition() {
      return this.$store.getters['ship/position/getAllPosition']
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
        positionCode: this.positionCode,
        employeeCode: this.employeeCode,
        unitCode: this.unitCode,
        numberOfRecordPerPage: 5,
        currentPage: page,
      }
      this.$emit('updateDataTable', payload)
    },
    clearField() {
      this.positionCode = ''
      this.employeeCode = ''
      this.unitCode = ''
      this.name = ''
    },
  },
}
</script>
