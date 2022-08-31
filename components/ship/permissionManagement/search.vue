<template>
  <div>
    <a-row type="flex" justify="center">จัดการสิทธิ์ผู้ใช้งาน </a-row>
    <a-row class="mt-5">กรอกเพื่อทำการค้นหา</a-row>
    <a-row type="flex" :gutter="[20, 0]" class="mt-5">
      <a-col :span="5" class="text-center pt-1">
        <span>สิทธิ์</span>
      </a-col>
      <a-col :span="7">
        <a-input v-model="search" />
      </a-col>
    </a-row>
    <a-row type="flex" justify="center" class="mt-5">
      <a-button class="mr-3" type="primary" @click="searchPermission"
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
      search: '',
    }
  },
  methods: {
    async searchPermission() {
      const payload = {
        search: this.search,
      }
      this.$store.commit('global/SET_OPEN_LOADER')
      await this.$store.dispatch(
        'ship/rolePermission/searchPermission',
        payload
      )
      this.$store.commit('global/SET_CLOSE_LOADER')
    },
    resetField() {
      this.search = ''
      this.searchPermission()
    },
  },
}
</script>
