<template>
  <div :key="updateComponent">
    <a-row v-if="$shipUser.isApprove()" type="flex" justify="end" class="mb-5">
      <a-button icon="check" class="btn-green" @click="approve" />
      <a-button icon="close" type="danger" class="mx-3" @click="cancle" />
      <a-button icon="rollback" class="btn-yellow" @click="reject" />
    </a-row>
    <a-table
      v-if="$shipUser.isApprove()"
      :columns="columns"
      :data-source="dataTable"
      :row-selection="{
        onChange: onSelectChange,
      }"
    >
      <div slot="fullname" slot-scope="text, record">
        {{ getFullname(record) }}
      </div>
      <div slot="status" slot-scope="text, record">
        {{ getStatus(record) }}
      </div>
      <div slot="qrCode" slot-scope="text, record">
        <a @click="openQrModal(record)"> view </a>
      </div>
    </a-table>
    <a-table v-else :columns="columns" :data-source="dataTable">
      <div slot="fullname" slot-scope="text, record">
        {{ getFullname(record) }}
      </div>
      <div slot="status" slot-scope="text, record">
        {{ getStatus(record) }}
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
      @confirm="confirmUpdateStatusRegisterModal"
      @close="close"
    />
    <ShipPreregisConsiderationQrCodeModal
      :active="openModal.active"
      :record="openModal.record"
      text-cancle="close"
      @close="openModal.active = false"
    />
    <ShipPreregisUpdateStatusRegisterModal
      text-cancle="Close"
      text-confirm="Submit"
      :title="updateStatusRegisterModal.title"
      :active="updateStatusRegisterModal.active"
      @close="updateStatusRegisterModal.active = false"
      @confirm="confirmUpdateStatusRegisterModal"
    />
  </div>
</template>

<script>
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
      updateStatusRegisterModal: {
        active: false,
        action: '',
        title: '',
      },
      openModal: {
        active: false,
        record: null,
      },
      columns: [
        {
          title: 'ลำดับ',
          width: '80px',
          dataIndex: 'order',
        },
        {
          title: 'ชื่อ - นามสกุล',
          dataIndex: 'fullname',
          scopedSlots: { customRender: 'fullname' },
        },
        {
          title: 'ประเภทบุคคล',
          dataIndex: 'personName',
        },
        {
          title: 'ตำเเหน่งงาน',
          dataIndex: 'positionName',
        },
        {
          title: 'สถานะให้ความยินยอม (PDPA)',
          dataIndex: 'licenseName',
        },
        {
          title: 'สถานะ',
          dataIndex: 'status',
          align: 'center',
          scopedSlots: { customRender: 'status' },
        },
        {
          title: 'QR Code',
          dataIndex: 'qrCode',
          align: 'center',
          scopedSlots: { customRender: 'qrCode' },
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
    getPayload(remark = '') {
      const payload = {
        preRegistorId: [],
        preRegistorIdFollow: [],
        status: 0,
        remark: '',
      }
      for (const item of this.selectedRows) {
        const preRegistorId = !this.$global.dataChange(item, this.dataTable[0])
        if (preRegistorId) {
          payload.preRegistorId.push(item.preregistorId)
        } else {
          payload.preRegistorIdFollow.push(item.preRegistorIdFollow)
        }
      }
      payload.remark = remark
      switch (this.updateStatusRegisterModal.action) {
        case 'approve':
          payload.status = 3
          break
        case 'cancle':
          payload.status = 2
          break
        case 'rollback':
          payload.status = 4
          break
        default:
          break
      }
      return payload
    },
    updateStatusRegister(action) {
      this.updateStatusRegisterModal.action = action
      this.updateStatusRegisterModal.active = true
    },
    approve() {
      if (this.selectedRowKeys.length !== 0) {
        this.updateStatusRegisterModal.action = 'approve'
        this.confirmModal.content =
          'กดยืนยันเพื่อทำการอนุมัติรายชื่อบุคคลที่เลือก โดยระบบจะทำการส่งเมล์ไปยังเจ้าของใบงาน'
        this.confirmModal.active = true
      }
    },
    cancle() {
      if (this.selectedRowKeys.length !== 0) {
        this.updateStatusRegisterModal.title = 'ยืนยันการยกเลิกใบงาน'
        this.updateStatusRegister('cancle')
      }
    },
    reject() {
      if (this.selectedRowKeys.length !== 0) {
        this.updateStatusRegisterModal.title = 'ยืนยันนำใบงานกลับมาเเก้ไข'
        this.updateStatusRegister('rollback')
      }
    },
    async confirm(payload) {
      this.close()
      this.$store.commit('global/SET_OPEN_LOADER')
      this.selectedRowKeys = []
      this.selectedRows = []
      await this.$store.dispatch('history/updateStatusShipRegister', payload)
      this.updateComponent++
      this.$nuxt.$emit('fetchContent')
    },
    close() {
      this.confirmModal.active = false
    },
    confirmUpdateStatusRegisterModal(message) {
      const getPayload = this.getPayload(message)
      this.updateStatusRegisterModal.active = false
      this.confirmModal.active = false
      this.confirm(getPayload)
    },
  },
}
</script>
