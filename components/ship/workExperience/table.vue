<template>
  <div class="mt-5">
    <a-table
      :columns="columns"
      :data-source="safetyTrainingInfo.Entry"
      :scroll="{ x: 'auto' }"
      bordered
      :pagination="{ pageSize: 5 }"
    >
      <div slot="order" slot-scope="text, record, index">{{ index + 1 }}</div>
      <div slot="timeWork" slot-scope="text, record">
        {{ getTimeWork(record) }}
      </div>
      <div slot="status" slot-scope="text, record">
        {{ getStatus(record) }}
      </div>
    </a-table>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
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
          dataIndex: 'Name',
          align: 'center',
          width: '200px',
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
          scopedSlots: { customRender: 'company' },
        },
        {
          title: 'วันที่เริ่ม - สิ้นสุดการปฏิบัติงาน',
          dataIndex: 'timeWork',
          align: 'center',
          width: '150px',
          scopedSlots: { customRender: 'timeWork' },
        },
        {
          title: 'ประเภทการอบรม',
          dataIndex: 'TrainingType',
          align: 'center',
          width: '150px',
        },
        {
          title: 'สถานะ',
          dataIndex: 'status',
          align: 'center',
          width: '150px',
          scopedSlots: { customRender: 'status' },
        },
      ],
    }
  },
  computed: {
    safetyTrainingInfo() {
      return this.$store.getters['ship/safetyTraining/getSafetyTrainingInfo']
    },
  },
  methods: {
    getTimeWork(record) {
      const getStartDate = moment(record.startDate).format('DD/MM/YYYY')
      const getEndDate = moment(record.expireDate).format('DD/MM/YYYY')
      return `${getStartDate} -  ${getEndDate}`
    },
    getStatus(record) {
      return record.Status === 'N'
        ? 'เข้ารับการอบรมเเล้ว'
        : 'ยังไม่เข้ารับการอบรม'
    },
  },
}
</script>
