<template>
  <div class="mt-5">
    <a-row type="flex" justify="end" class="mb-5">
      <a-button @click="openAddSupporterModal('add')">เพิ่มผู้ติดตาม</a-button>
    </a-row>
    <a-table :columns="columns" :data-source="dataTable">
      <div slot="order" slot-scope="text, record, index">{{ index + 1 }}</div>
      <div slot="fullname" slot-scope="text, record" class="text-left">
        {{ getFullName(record) }}
      </div>
      <a-row
        slot="action"
        slot-scope="text, record, index"
        type="flex"
        justify="center"
      >
        <a-col>
          <a-icon
            type="edit"
            class="mr-3"
            @click="openAddSupporterModal('edit', record, index)"
          />
          <a-icon type="delete" @click="openModal(record)" />
        </a-col>
      </a-row>
    </a-table>
    <a-row type="flex" justify="center" class="mt-3">
      <!-- <a-pagination
        v-model="current"
        :total="50"
        :default-page-size="1"
        show-less-items
      /> -->
    </a-row>
    <ShipInvitationAddSupporterModal
      :props-form="addSupporterModal.record"
      :active="addSupporterModal.active"
      text-confirm="Confirm"
      text-cancle="Cancle"
      :current-form="currentForm"
      @confirm="confirmSupporterModal"
      @close="addSupporterModal.active = false"
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
      currentForm: null,
      deleteModal: {
        active: false,
        record: null,
        content: 'หากต้องการลบผู้ติดตามนี้กด confirm เพื่อยืนยัน',
      },
      current: 1,
      columns: [
        {
          title: 'ลำดับ',
          dataIndex: 'order',
          align: 'center',
          width: '80px',
          scopedSlots: { customRender: 'order' },
        },
        {
          title: 'ชื่อ-นามสกุล',
          dataIndex: 'fullname',
          align: 'center',
          scopedSlots: { customRender: 'fullname' },
        },
        {
          title: 'บริษัท',
          dataIndex: 'companyName',
          align: 'center',
          width: '150px',
        },
        {
          title: 'อีเมล์',
          dataIndex: 'email',
          align: 'center',
          width: '150px',
        },
        {
          title: 'action',
          dataIndex: 'action',
          align: 'center',
          width: '100px',
          scopedSlots: { customRender: 'action' },
        },
      ],
      addSupporterModal: {
        active: false,
        record: null,
        action: 'add',
        index: null,
      },
    }
  },
  methods: {
    getFullName(record) {
      return `${record?.titleName} ${record?.firstname} ${record?.lastname}`
    },
    openAddSupporterModal(actionSupporter, record = null, index = null) {
      this.addSupporterModal.action = actionSupporter
      this.addSupporterModal.index = index
      this.addSupporterModal.record = record
      this.addSupporterModal.active = true
      this.currentForm = _.cloneDeep(this.propsForm)
    },
    confirmSupporterModal(newRecord) {
      if (this.addSupporterModal.action === 'add') {
        this.addSupporter(newRecord)
      } else {
        this.editSupporter(newRecord)
      }
    },
    editSupporter(editrecord) {
      this.$emit('editSupporter', editrecord)
      this.addSupporterModal.active = false
    },
    addSupporter(newRecord) {
      this.$emit('addSupporter', newRecord)
      this.addSupporterModal.active = false
    },
    deleteContent() {
      this.$emit('deleteContent', this.deleteModal.record)
      this.deleteModal.active = false
    },
    openModal(record) {
      this.deleteModal.record = record
      this.deleteModal.content = `หากต้องการลบ ${this.getFullName(
        record
      )} ผู้ติดตามนี้กด confirm เพื่อยืนยัน`
      this.deleteModal.active = true
    },
  },
}
</script>
