<template>
  <div>
    <a-row type="flex" justify="space-between">
      <a-col class="mt-2">รายละเอียดพื้นที่เข้าใช้</a-col>
      <a-col>
        <a-button v-if="disableBtn" class="btn-green" @click="addArea"
          >เพิ่มพื้นที่เข้าใช้</a-button
        >
      </a-col>
    </a-row>
    <div class="mt-5">
      <a-table
        :columns="columns"
        :data-source="propsForm.shipUserarea"
        :pagination="false"
        bordered
      >
        <div slot="order" slot-scope="text, record, index">{{ index + 1 }}</div>
        <div slot="plant" slot-scope="text">{{ text ? text : '-' }}</div>
        <div slot="area" slot-scope="text">{{ text ? text : '-' }}</div>
        <div slot="setting" slot-scope="text, record, index">
          <a-icon type="edit" class="mr-3" @click="editArea(record, index)" />
          <a-icon
            v-if="$shipPermission.canEditShip(propsForm, $route)"
            type="delete"
            @click="deleteArea(index)"
          />
        </div>
      </a-table>
    </div>
    <ShipPreregisContactAddAreaModal
      :active="addAreaActive.active"
      :prop-area="addAreaActive"
      :props-form="propsForm"
      text-confirm="Confirm"
      text-cancle="Cancle"
      @comfirm="confirmAreaModal"
      @close="addAreaActive.active = false"
    />
    <SharesModalConfirmModal
      :active="deleteModal.active"
      text-confirm="Confirm"
      text-cancle="Cancle"
      :content="deleteModal.content"
      @confirm="confirmDeleteArea"
      @close="deleteModal.active = false"
    />
  </div>
</template>

<script>
export default {
  props: {
    propsForm: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      addAreaActive: {
        active: false,
        action: 'add',
        title: 'เพิ่มรายละเอียดพื้นที่ใช้งาน',
        record: null,
      },
      deleteModal: {
        active: false,
        record: null,
        content: 'กด confirm เพื่อยืนยันการลบ',
      },
      columns: [
        {
          title: 'ลำดับ',
          width: '80px',
          align: 'center',
          dataIndex: 'order',
          scopedSlots: { customRender: 'order' },
        },
        {
          title: 'Zone',
          align: 'center',
          dataIndex: 'zoneName',
          scopedSlots: { customRender: 'zoneName' },
        },
        {
          title: 'Plant',
          dataIndex: 'plantName',
          align: 'center',
          scopedSlots: { customRender: 'plant' },
        },
        {
          title: 'Area',
          align: 'center',
          dataIndex: 'areaName',
          scopedSlots: { customRender: 'area' },
        },
        {
          title: '',
          dataIndex: 'setting',
          align: 'center',
          width: 80,
          scopedSlots: { customRender: 'setting' },
        },
      ],
    }
  },
  computed: {
    disableBtn() {
      return this.propsForm.shipUserarea.length < 5
    },
  },
  methods: {
    addArea() {
      this.addAreaActive.active = true
      this.addAreaActive.action = 'add'
      this.addAreaActive.title = 'เพิ่มรายละเอียดพื้นที่ใช้งาน'
    },
    deleteArea(index) {
      this.deleteModal.active = true
      this.addAreaActive.index = index
    },
    confirmDeleteArea() {
      this.$emit('deleteArea', this.addAreaActive.index)
      this.deleteModal.active = false
    },
    editArea(record, index) {
      this.addAreaActive.action = 'edit'
      this.addAreaActive.title = 'เเก้ไขรายละเอียดพื้นที่ใช้งาน'
      this.addAreaActive.record = _.cloneDeep(record)
      this.addAreaActive.index = index
      this.addAreaActive.active = true
    },
    confirmAreaModal(record) {
      if (this.addAreaActive.action === 'add') {
        this.$emit('addArea', record)
      } else {
        this.$emit('editArea', this.addAreaActive)
      }
      this.addAreaActive.active = false
    },
  },
}
</script>
