<template>
  <div>
    <a-row type="flex" justify="space-between" class="my-3">
      <span>รายละเอียด MOC</span>
      <a-button
        class="btn-green"
        :disabled="!$shipPermission.canEditShip(propsForm)"
        @click="addMOCActive = true"
      >
        <a-icon type="plus-circle" />เพิ่มรายการ
      </a-button>
    </a-row>
    <a-table
      :columns="columns"
      :data-source="dataTable"
      :pagination="false"
      bordered
      row-key="id"
    >
      <div
        v-if="$shipPermission.canEditShip(propsForm)"
        slot="action"
        slot-scope="text, record"
      >
        <a-icon type="delete" @click="openModal(record)" />
      </div>
    </a-table>
    <ShipPreregisContactAddMOCModal
      :active="addMOCActive"
      text-confirm="Confirm"
      text-cancle="Cancle"
      @comfirm="addMOC"
      @close="cancle"
    />
    <SharesModalConfirmModal
      :active="deleteModal.active"
      text-confirm="Confirm"
      text-cancle="Cancle"
      :content="deleteModal.content"
      @confirm="deleteContent"
      @close="deleteModal.active = false"
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
    propsForm: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      addMOCActive: false,
      shipPreregistorMoc: [],
      deleteModal: {
        active: false,
        record: null,
        content: '',
      },
      columns: [
        {
          title: 'MOC No.',
          dataIndex: 'mocNo',
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
    }
  },
  created() {
    if (this.$shipPermission.canEditShip(this.propsForm)) {
      this.columns.push({
        title: '',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' },
      })
    }
  },
  methods: {
    openModal(record) {
      this.deleteModal.record = record
      this.deleteModal.content = `หากต้องการลบกรุณากด confirm เพื่อยืนยัน`
      this.deleteModal.active = true
    },
    deleteContent() {
      this.$emit('deleteMOC', this.deleteModal.record)
      this.deleteModal.active = false
    },
    addMOC(val) {
      this.addMOCActive = false
      this.$emit('addMOC', val)
    },
    cancle() {
      this.addMOCActive = false
    },
  },
}
</script>
