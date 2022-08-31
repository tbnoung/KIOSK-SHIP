<template>
  <div>
    <a-row type="flex" justify="space-between" class="mb-3">
      <span>ผู้ติดตาม</span>
      <a-button
        type="primaty"
        :disabled="!$shipPermission.canEditShip(propsForm)"
        @click="openAddSupporterModal('add')"
        >เพิ่มผู้ติดตาม</a-button
      >
    </a-row>
    <a-table
      :columns="columns"
      :data-source="dataTable"
      :pagination="false"
      bordered
      row-key="order"
    >
      <div slot="order" slot-scope="text, record, index">{{ index + 1 }}</div>
      <div slot="image" slot-scope="text, record">
        <a-row type="flex" justify="center">
          <a-avatar :src="getImage(record.image)" :size="50" />
        </a-row>
      </div>
      <div slot="fullname" slot-scope="text, record">
        {{ getFullname(record) }}
      </div>
      <a-row
        slot="action"
        slot-scope="text, record, index"
        type="flex"
        justify="center"
      >
        <a-col v-if="canAction(record)">
          <a-icon
            type="edit"
            class="mr-3"
            @click="openAddSupporterModal('edit', record, index)"
          />
          <a-icon type="delete" @click="openModal(record)" />
        </a-col>
      </a-row>
    </a-table>
    <SharesModalConfirmModal
      :active="deleteModal.active"
      text-confirm="Confirm"
      text-cancle="Cancle"
      :content="deleteModal.content"
      @confirm="deleteContent"
      @close="deleteModal.active = false"
    />
    <ShipPreregisDetailAddSupporterModal
      :active="addSupporterModal.active"
      :data-modal-action="addSupporterModal.action"
      :data-index="addSupporterModal.index"
      text-confirm="Confirm"
      text-cancle="Cancle"
      :props-form="propsFormEdit"
      :current-form="currentForm"
      @confirm="$nuxt.$emit('submitFormDetail', 'addSupporter')"
      @close="closeAddSupporterModal"
      @onSubmit="confirmSupporterModal"
    />
    <SharesModalConfirmModal
      :active="blackListModal.active"
      text-cancle="Cancle"
      :content="blackListModal.content"
      @close="blackListModal.active = false"
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
      propsFormEdit: null,
      currentForm: null,
      baseURLImg: process.env.APP_IMAGE,
      deleteModal: {
        active: false,
        record: null,
        content: 'หากต้องการลบผู้ติดตามนี้กด confirm เพื่อยืนยัน',
      },
      blackListModal: {
        active: false,
        content: '',
      },
      addSupporterModal: {
        active: false,
        record: null,
        index: null,
        action: 'add',
      },
      columns: [
        {
          title: 'ลำดับ',
          align: 'center',
          dataIndex: 'order',
          width: '80px',
          scopedSlots: { customRender: 'order' },
        },
        {
          title: 'รูปภาพ',
          dataIndex: 'image',
          scopedSlots: { customRender: 'image' },
        },
        {
          title: 'ชื่อนามสกุล',
          dataIndex: 'name',
          scopedSlots: { customRender: 'fullname' },
        },
        {
          title: 'เลขบัตรประชาชน',
          dataIndex: 'citizenId',
        },
        {
          title: 'ตำเเหน่ง',
          dataIndex: 'positionName',
        },
      ],
    }
  },
  computed: {
    getBlackList() {
      return this.$store.getters['ship/accessControlInterface/getBlackList']
    },
  },
  watch: {
    dataTable() {
      this.setColumnsTable()
    },
  },
  created() {
    this.setColumnsTable()
  },
  methods: {
    getImage(img) {
      const base64 = img.includes('data:image')
      return base64 ? img : `${this.baseURLImg}${img}`
    },
    setColumnsTable() {
      const { shipPreregistorFollow } = this.propsForm
      const checkCanEditShipPreRegisterFollow = shipPreregistorFollow.some(
        (item) => {
          return [null, 0, 1, 2, 4].includes(item?.statusOperationId)
        }
      )

      if (
        checkCanEditShipPreRegisterFollow ||
        this.$shipUser.isAdmin() ||
        this.$shipUser.isStaff()
      ) {
        const findColumnAction = this.columns.find((item) => {
          return item.dataIndex === 'action'
        })
        if (!findColumnAction) {
          this.columns.push({
            title: '',
            dataIndex: 'action',
            width: 80,
            scopedSlots: { customRender: 'action' },
          })
        }
      } else {
        const findIndex = this.columns.findIndex(
          (item) => item.dataIndex === 'action'
        )
        this.columns.splice(findIndex, 1)
      }
    },
    getFullname(val) {
      return `${val.firstname} ${val.lastname}`
    },
    openModal(record) {
      this.deleteModal.record = record
      this.deleteModal.content = `หากต้องการลบ ${this.getFullname(
        record
      )} ผู้ติดตามนี้กด confirm เพื่อยืนยัน`
      this.deleteModal.active = true
    },
    deleteContent() {
      this.$emit('deleteContent', this.deleteModal.record)
      this.deleteModal.active = false
    },
    closeAddSupporterModal() {
      this.$nuxt.$emit('reRenderPage')
      this.addSupporterModal.active = false
    },
    openAddSupporterModal(actionSupporter, record = null, index = null) {
      this.addSupporterModal.action = actionSupporter
      this.addSupporterModal.index = index
      this.addSupporterModal.active = true
      this.propsFormEdit = _.cloneDeep(record)
      this.currentForm = _.cloneDeep(this.propsForm)
    },
    editSupporter(editrecord) {
      this.$emit('editSupporter', editrecord)
      this.addSupporterModal.active = false
    },
    addSupporter(newRecord) {
      this.$emit('addSupporter', newRecord)
      this.addSupporterModal.active = false
    },
    confirmSupporterModal(newRecord) {
      if (this.getBlackList?.id) {
        this.blackListModal.content =
          'ไม่สามารถลงทะเบียนได้เนื่องจากหมายเลขบัตรประชาชนหรือ Passport ติด Blacklist'
        this.blackListModal.active = true
      } else if (this.addSupporterModal.action === 'add') {
        this.addSupporter(newRecord)
      } else {
        this.editSupporter(newRecord)
      }
    },
    canAction(record) {
      const getAccountId = this.$shipUser.getAccountId()
      if (this.$shipUser.isAdmin() || this.$shipUser.isStaff()) {
        return true
      } else if (
        getAccountId === this.propsForm.accountId ||
        this.$route?.query?.nonAccount === 'true'
      ) {
        return [null, 0, 1, 2, 4].includes(record?.statusOperationId)
      }
      return false
    },
  },
}
</script>
