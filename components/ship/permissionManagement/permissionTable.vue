<template>
  <div class="mt-5">
    <a-table
      :columns="columns"
      :data-source="record"
      bordered
      :pagination="false"
    >
      <div slot="nameTh" slot-scope="text" class="text-left pl-10">
        {{ text }}
      </div>
      <div slot="status" slot-scope="text, record">
        <a-checkbox v-model="record.status"> มีสิทธิ์ </a-checkbox>
      </div>
    </a-table>
  </div>
</template>

<script>
export default {
  props: {
    record: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      columns: [
        {
          title: 'เมนู',
          dataIndex: 'nameTh',
          align: 'center',
          scopedSlots: { customRender: 'nameTh' },
        },
        {
          title: 'สิทธิ์การทำงาน',
          dataIndex: 'status',
          align: 'center',
          width: '150px',
          scopedSlots: { customRender: 'status' },
        },
      ],
    }
  },
}
</script>
