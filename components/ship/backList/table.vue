<template>
  <div class="mt-5">
    <a-table
      :columns="columns"
      :data-source="dataTable"
      :scroll="{ x: 'auto' }"
      bordered
    >
      <div slot="order" slot-scope="text, record, index">{{ index + 1 }}</div>
      <div slot="remark" slot-scope="text" class="text-left">
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
        {
          fullname: 'นายไกรวิทย์ สุขใจ',
          personName: 'ผู้รับเหมาประจำ',
          company: 'PTT Digital',
          citizenId: '111111111111',
          remark: 'ละเมิดข้อปฏิบัติการเข้าพื้นที่',
          date: '01/02/2022',
          by: 'Admin',
        },
      ],
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
          width: '200px',
          scopedSlots: { customRender: 'fullname' },
        },
        {
          title: 'ประเภทบุคคล',
          dataIndex: 'personName',
          align: 'center',
          width: '150px',
          scopedSlots: { customRender: 'personName' },
        },
        {
          title: 'บริษัท',
          dataIndex: 'company',
          align: 'center',
          width: '150px',
        },
        {
          title: 'เลขบัตรประชาชนหรือ passport',
          dataIndex: 'citizenId',
          align: 'center',
          width: '250px',
        },
        {
          title: 'เหตุผล',
          dataIndex: 'remark',
          align: 'center',
          width: '150px',
          scopedSlots: { customRender: 'remark' },
        },
        {
          title: 'วันที่ banned',
          dataIndex: 'date',
          align: 'center',
          width: '150px',
          scopedSlots: { customRender: 'date' },
        },
        {
          title: 'banned โดย',
          dataIndex: 'by',
          align: 'center',
          width: '150px',
          scopedSlots: { customRender: 'by' },
        },
      ],
    }
  },
}
</script>
