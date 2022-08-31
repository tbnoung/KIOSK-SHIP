<template>
  <div class="mt-5">
    <a-table :columns="columns" :data-source="dataTable" bordered>
      <div slot="action" slot-scope="text, record">
        <a-button icon="edit" class="mr-2" />
      </div>
      <div slot="email" slot-scope="text" class="text-left pl-5">
        {{ text }}
      </div>
    </a-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataTable: [
        { email: 'รูปแบบการส่งเมลหาผู้ควบคุมงานให้อนุมัติ' },
        { email: 'รูปแบบการส่งเมลหาเจ้าของใบงานในกรณีที่อนุมัติเเล้ว' },
        { email: 'รูปแบบการส่งเมล์หา VIP' },
      ],
      columns: [
        {
          title: 'email',
          dataIndex: 'email',
          align: 'center',
          scopedSlots: { customRender: 'email' },
        },
        {
          title: '',
          dataIndex: 'action',
          align: 'center',
          width: '150px',
          scopedSlots: { customRender: 'action' },
        },
      ],
    }
  },
}
</script>
