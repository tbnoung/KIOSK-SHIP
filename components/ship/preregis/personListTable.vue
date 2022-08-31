<template>
  <div :key="updateComponent">
    <a-table
      :columns="columns"
      :data-source="dataTable"
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
      <div slot="qrCode" slot-scope="text, record">
        <a @click="openQrModal(record)"> view </a>
      </div>
    </a-table>
    <SharesModalConfirmModal
      :active="confirmModal.active"
      text-confirm="Confirm"
      text-cancle="Cancle"
      :content="confirmModal.content"
      @confirm="confirm"
      @close="close"
    />
    <ShipPreregisConsiderationQrCodeModal
      :active="openModal.active"
      :record="openModal.record"
      text-cancle="close"
      @close="openModal.active = false"
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
    columns: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      updateComponent: 0,
      openModal: {
        active: false,
        record: null,
      },
      selectedRowKeys: [],
      selectedRows: [],
      confirmModal: {
        active: false,
        content: '',
        action: null,
      },
    }
  },
  computed: {
    roleApprove() {
      return this.$shipUser.getRole() === 'approve'
    },
  },
  methods: {
    openQrModal(record) {
      this.openModal.record = record
      this.openModal.active = true
    },
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
