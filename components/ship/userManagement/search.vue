<template>
  <div>
    <a-row type="flex" justify="center">จัดการบัญชีผู้ใช้งาน </a-row>
    <a-row class="mt-5">กรอกเพื่อทำการค้นหา</a-row>
    <a-row type="flex" :gutter="[20, 0]" class="mt-5">
      <a-col :span="5" class="text-center pt-1">
        <span>ชื่อ - นามสกุล</span>
      </a-col>
      <a-col :span="7">
        <a-input v-model="fristNameAndLastName" />
      </a-col>
      <a-col :span="5" class="text-center pt-1">
        <span>บริษัท</span>
      </a-col>
      <a-col :span="7">
        <a-input v-model="company" />
      </a-col>
    </a-row>
    <a-row type="flex" :gutter="[20, 0]" class="mt-5">
      <a-col :span="5" class="text-center pt-1">
        <span>Username</span>
      </a-col>
      <a-col :span="7">
        <a-input v-model="username" />
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
      username: '',
    }
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
        username: this.username,
        pageSize: 5,
        page,
      }
      this.$emit('updateDataTable', payload)
    },
    resetField() {
      this.fristNameAndLastName = ''
      this.company = ''
      this.username = ''
      this.search()
    },
  },
}
</script>
