<template>
  <div :key="updateComponent">
    <a-row type="flex" justify="end" class="mb-5">
      <a-button class="btn-green"
        ><a-icon type="plus-circle" /> เพิ่มรายการ
      </a-button>
    </a-row>
    <a-table
      :columns="columns"
      :data-source="dataTable"
      :pagination="false"
      :scroll="{ x: 'auto' }"
    >
      <div slot="status" slot-scope="text, record">
        <a-switch v-model="record.status" />
      </div>
      <div
        v-for="(col, i) in ['nameTh', 'nameEn']"
        :key="i"
        :slot="col"
        slot-scope="text, record"
        class="text-left"
      >
        <div v-if="record.editable">
          <a-input v-model="record[col]" />
        </div>
        <div v-else>{{ text }}</div>
      </div>
      <!-- <div slot="nameTh" slot-scope="text, record" class="text-left">
        {{ record.nameTh }}
      </div> -->
      <div slot="edit" slot-scope="text, record">
        <a-icon type="edit" @click="editRecord(record)" />
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
      columns: [
        {
          title: 'ประเภทพื้นที่ย่อย',
          align: 'center',
          width: '200px',
          dataIndex: 'nameTh',
          scopedSlots: { customRender: 'nameTh' },
        },
        {
          title: 'ประเภทพื้นที่ย่อย (ภาษาอังกฤษ)',
          dataIndex: 'nameEn',
          width: '200px',
          align: 'center',
          scopedSlots: { customRender: 'nameEn' },
        },
        {
          title: 'สถานะ',
          dataIndex: 'status',
          align: 'center',
          width: '100px',
          scopedSlots: { customRender: 'status' },
        },
        {
          title: 'เเก้ไข',
          dataIndex: 'edit',
          align: 'center',
          width: '100px',
          scopedSlots: { customRender: 'edit' },
        },
      ],
      confirmModal: {
        active: false,
        content: '',
        action: null,
      },
    }
  },
  methods: {
    editRecord(record) {
      record.editable = !record.editable
      this.updateComponent++
    },
  },
}
</script>
