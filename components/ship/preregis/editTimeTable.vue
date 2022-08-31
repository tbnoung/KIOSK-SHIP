<template>
  <div :key="updateComponent">
    <a-table
      :columns="columns"
      :data-source="dataTable"
      :row-selection="{
        onChange: onSelectChange,
      }"
      :scroll="{ x: 'auto' }"
    >
      <div slot="fullname" slot-scope="text, record" class="text-left">
        {{ getFullname(record) }}
      </div>
      <div slot="status" slot-scope="text, record" class="text-left">
        {{ getStatus(record) }}
      </div>
      <div slot="timeWork" slot-scope="text, record" class="text-left">
        {{ getTimeWork(record) }}
      </div>
      <div slot="preregistertime" slot-scope="text, record" class="text-left">
        {{ getPreRegisterTime(record) }}
      </div>
    </a-table>
    <SharesModalConfirmModal
      :active="confirmModal.active"
      text-confirm="Confirm"
      text-cancle="Cancle"
      :content="confirmModal.content"
    />
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    dataTable: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      updateComponent: 0,
      columns: [
        {
          title: 'ลำดับ',
          align: 'center',
          width: '80px',
          dataIndex: 'order',
        },
        {
          title: 'ชื่อ - นามสกุล',
          dataIndex: 'fullname',
          align: 'center',
          width: '150px',
          scopedSlots: { customRender: 'fullname' },
        },
        {
          title: 'บริษัท',
          align: 'center',
          width: '100px',
          dataIndex: 'company',
        },
        {
          title: 'วันที่เริ่ม-สิ้นสุด',
          dataIndex: 'timeWork',
          align: 'center',
          width: '150px',
          scopedSlots: { customRender: 'timeWork' },
        },
        {
          title: 'ช่วงระยะเวลาการปฏิบัติงาน',
          dataIndex: 'preregistertime',
          align: 'center',
          width: '150px',
          scopedSlots: { customRender: 'preregistertime' },
        },
        {
          title: 'สถานะ',
          dataIndex: 'status',
          align: 'center',
          width: '100px',
          scopedSlots: { customRender: 'status' },
        },
      ],
      selectedRowKeys: [],
      selectedRows: [],
      confirmModal: {
        active: false,
        content: '',
        action: null,
      },
    }
  },
  mounted() {
    this.$nuxt.$on('clearSelectedRows', () => {
      this.selectedRowKeys = []
      this.selectedRows = []
      this.updateComponent++
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('clearSelectedRows')
  },
  methods: {
    getFullname(record) {
      return `${record?.firstname} ${record?.lastname}`
    },
    getStatus(record) {
      switch (record.statusOperationId) {
        case 0:
          return 'กำลังดำเนินงาน'
        case 1:
          return 'รออนุมัติ'
        case 2:
          return 'ไม่อนุมัติ'
        case 3:
          return 'อนุมัติ'
        case 4:
          return 'ส่งกลับไปเเก้ไข'

        default:
          return 'กำลังดำเนินงาน'
      }
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
      this.$emit('onSelectChange', this.selectedRows)
    },
    getPreRegisterTime(record) {
      return `${record.peregistorTimeStart} -  ${record.peregistorTimeEnd}`
    },
    getTimeWork(record) {
      const getStartDate = moment(record.startDate).format('DD/MM/YYYY')
      const getEndDate = moment(record.expireDate).format('DD/MM/YYYY')
      return `${getStartDate} -  ${getEndDate}`
    },
  },
}
</script>
