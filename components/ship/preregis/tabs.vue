<template>
  <a-tabs v-model="activeKey" type="card" class="mt-5" @change="callback">
    <a-tab-pane v-for="item in tabList" :key="item.key" :tab="item.text">
      <div class="px-5">
        <ShipPreregisTable
          :current-page="currentPage"
          @onChangePagination="onChangePagination"
        />
      </div>
    </a-tab-pane>
    <a-button slot="tabBarExtraContent" class="btn-green" @click="add">
      <a-icon type="plus-circle" />เพิ่มรายการ
    </a-button>
  </a-tabs>
</template>

<script>
export default {
  data() {
    return {
      activeKey: this.$route.query.status,
      currentPage: 1,
      tabList: [{ key: '1', text: 'ทั้งหมด' }],
      tabListForApprove: [
        { key: '2', text: 'รายการตัวเอง' },
        { key: '3', text: 'รายการรอดำเนินการ' },
      ],
    }
  },
  created() {
    const isApprove = this.$shipUser.isApprove()
    if (isApprove) {
      this.tabList = _.union(this.tabList, this.tabListForApprove)
    }
  },
  methods: {
    async callback(key) {
      await this.$router.replace({
        query: { status: key },
      })
      this.onChangePagination(1)
    },
    onChangePagination(page) {
      this.currentPage = page
      this.$store.commit('global/SET_OPEN_LOADER')
      this.$nuxt.$emit('searchHistory', page)
    },
    add() {
      this.$router.push('/ship/pre-register/create')
    },
  },
}
</script>
<style lang="less">
.ant-tabs-bar {
  margin: 0 !important;
}
.ant-tabs-content {
  border-left: 1px solid #e4e9f0;
  border-right: 1px solid #e4e9f0;
  border-bottom: 1px solid #e4e9f0;
}
.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {
  background: #4682b4;
  color: #fff;
}
</style>
