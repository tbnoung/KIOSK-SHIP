<template>
  <div class="mt-5">
    <a-row type="flex" justify="end" class="mb-5">
      <a-button class="btn-green">export excel</a-button>
    </a-row>
    <a-table
      :columns="columns"
      :data-source="dataTable"
      :scroll="{ x: 'auto' }"
      bordered
    >
      <div slot="order" slot-scope="text, record, index">{{ index + 1 }}</div>
      <div slot="startDate" slot-scope="text, record">
        <div>{{ record.startDate }}</div>
        <div>{{ record.startTime }}</div>
      </div>
      <div slot="endDate" slot-scope="text, record">
        <div>{{ record.endDate }}</div>
        <div>{{ record.endTime }}</div>
      </div>
    </a-table>
    <!-- <a-row type="flex" justify="center" class="mt-3">
      <a-pagination
        v-model="current"
        :total="50"
        :default-page-size="1"
        show-less-items
      />
    </a-row> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 1,
      dataTable: [
        {
          fullname: 'นางเเสนดี ดีใจ',
          personName: 'ผู้รับเหมาประจำ',
          areaZoneName: 'พื้นที่กระบวนการผลิต',
          company: 'PTT Digital',
          startDate: '15/01/2022',
          startTime: '07:33:00 น.',
          endTime: '17:05:00 น.',
          endDate: '15/01/2022',
          status: 'Check out',
          citizen: '1171615244265',
        },
        {
          fullname: 'นายมาดี สุขใส',
          personName: 'ผู้รับเหมาประจำ',
          areaZoneName: 'พื้นที่กระบวนการผลิต',
          company: 'PTT Digital',
          startDate: '15/01/2022',
          startTime: '08:15:00 น.',
          endTime: '',
          endDate: '',
          trainingStatus: '',
          status: 'Check in',
          citizen: '1109202299901',
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
          title: 'ประเภทพื้นที่',
          dataIndex: 'areaZoneName',
          align: 'center',
          width: '150px',
          scopedSlots: { customRender: 'areaZoneName' },
        },
        {
          title: 'บริษัท',
          dataIndex: 'company',
          align: 'center',
          width: '150px',
          scopedSlots: { customRender: 'company' },
        },
        {
          title: 'เลขบัตรประชาชน',
          dataIndex: 'citizen',
          align: 'center',
          width: '150px',
          scopedSlots: { customRender: 'citizen' },
        },
        {
          title: 'วันที่เข้าเเละเวลา',
          dataIndex: 'startDate',
          align: 'center',
          width: '150px',
          scopedSlots: { customRender: 'startDate' },
        },
        {
          title: 'วันที่ออกเเละเวลา',
          dataIndex: 'endDate',
          align: 'center',
          width: '150px',
          scopedSlots: { customRender: 'endDate' },
        },
        {
          title: 'สถานะล่าสุด',
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
