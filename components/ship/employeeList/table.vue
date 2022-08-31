<template>
  <div class="mt-5">
    <a-table
      :columns="columns"
      :data-source="getEmployeeList.Entry"
      :scroll="{ x: 'auto' }"
      :pagination="false"
      bordered
    >
      <div slot="order" slot-scope="text, record, index">
        {{ 5 * (getEmployeeList.PageInfo.CurrentPage - 1) + (index + 1) }}
      </div>
    </a-table>
    <a-row :key="updateComponent" type="flex" justify="center" class="mt-3">
      <a-pagination
        v-model="current"
        :total="getEmployeeList.PageInfo.TotalRecord"
        :default-page-size="getEmployeeList.PageInfo.CurrentPage"
        show-less-items
        @change="onChangePage"
      />
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 1,
      updateComponent: 0,
      columns: [
        {
          title: 'ลำดับ',
          dataIndex: 'order',
          align: 'center',
          width: '80px',
          scopedSlots: { customRender: 'order' },
        },
        {
          title: 'รหัสพนักงาน',
          dataIndex: 'CODE',
          align: 'center',
          width: '150px',
        },
        {
          title: 'ชื่อ-นามสกุล',
          dataIndex: 'FULLNAMETH',
          align: 'center',
          width: '200px',
        },
        {
          title: 'หน่วยงาน',
          dataIndex: 'agency',
          align: 'center',
          width: '150px',
        },
        {
          title: 'ตำเเหน่ง',
          dataIndex: 'posname',
          align: 'center',
          width: '150px',
        },
        {
          title: 'อีเมล์',
          dataIndex: 'EmailAddr',
          align: 'center',
          width: '200px',
        },
        {
          title: 'เบอร์โทร',
          dataIndex: 'mobile',
          align: 'center',
          width: '200px',
        },
      ],
    }
  },
  computed: {
    getEmployeeList() {
      return this.$store.getters['ship/PISInterface/getEmployeeList']
    },
  },
  mounted() {
    this.$nuxt.$on('updateCurrentPage', (page) => {
      this.current = page
      this.updateComponent++
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('updateCurrentPage')
  },
  methods: {
    onChangePage(page) {
      this.$nuxt.$emit('changePage', page)
    },
  },
}
</script>
