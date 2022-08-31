<template>
  <div class="mt-5">
    <a-table
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      row-key="key"
      :columns="columns"
      :data-source="data"
      :scroll="{ x: 0, y: 300 }"
    >
    </a-table>
  </div>
</template>

<script>
const data = []
for (let i = 0; i < 10; i++) {
  data.push({
    id: 0,
    key: i,
    mocNo: `Moc no ${i}`,
    fullname: `fullname ${i}`,
    jobName: `workName ${i}`,
    preregistorId: 26,
    responsiblePerson: `responsiblePerson ${i}`,
    status: 'Open',
  })
}
export default {
  data() {
    return {
      data,
      columns: [
        {
          title: 'MOC No.',
          dataIndex: 'mocNo',
          width: '100px',
        },
        {
          title: 'ชื่องาน',
          dataIndex: 'jobName',
        },
        {
          title: 'ชื่อ-นามสกุล',
          dataIndex: 'fullname',
          scopedSlots: { customRender: 'fullname' },
        },
        {
          title: 'สถานะ',
          dataIndex: 'status',
        },
        {
          title: 'ผู้รับผิดชอบ',
          dataIndex: 'responsiblePerson',
          scopedSlots: { customRender: 'responsiblePerson' },
        },
      ],
      selectedRowKeys: [],
      selectedRows: [],
    }
  },
  mounted() {
    this.$nuxt.$on('confirmAddMocModal', () => {
      this.$emit('selectedRows', this.selectedRows)
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('confirmAddMocModal')
  },
  methods: {
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    getFullname(val) {
      return `${val.firstName} ${val.lastName}`
    },
    getFullnameResponsible(val) {
      return `${val.firstNameResponsible} ${val.lastNameResponsible}`
    },
  },
}
</script>
