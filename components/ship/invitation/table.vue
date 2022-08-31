<template>
  <div class="mt-5">
    <a-row type="flex" justify="end" class="mb-5">
      <a-button class="btn-green" @click="add">
        <a-icon type="plus-circle" /> เพิ่มรายการ
      </a-button>
    </a-row>
    <a-table
      :columns="columns"
      :data-source="getHistory.result"
      :pagination="false"
      bordered
      :scroll="{ x: 'auto' }"
    >
      <div slot="order" slot-scope="text, record, index">
        {{ index + 1 }}
      </div>
      <div slot="fullname" slot-scope="text, record">
        {{ getFullname(record) }}
      </div>
      <div slot="timeWork" slot-scope="text, record">
        {{ getTimeWork(record) }}
      </div>
      <div slot="preregistertime" slot-scope="text, record">
        {{ getPreRegisterTime(record) }}
      </div>
      <div slot="areaZone" slot-scope="text, record">
        {{ getAreaZoneById(record) }}
      </div>
      <div slot="action" slot-scope="text, record">
        <a-button icon="search" class="mr-2" @click="openPersonList(record)" />
        <a-button icon="edit" class="mr-2" @click="edit(record)" />
        <a-button icon="delete" @click="deleteRegister(record)" />
      </div>
    </a-table>
    <a-row type="flex" justify="center" class="mt-3">
      <a-pagination
        v-model="current"
        :total="getHistory.pageCount"
        :default-page-size="currentPage"
        show-less-items
      />
    </a-row>
    <ShipPreregisPersonListModal
      text-cancle="Close"
      :active="personListModal.active"
      :props-form="personListModal.form"
      @close="personListModal.active = false"
    />
    <ShipPreregisUpdateStatusRegisterModal
      text-cancle="Close"
      :title="updateStatusRegisterModal.title"
      :active="updateStatusRegisterModal.active"
      @close="updateStatusRegisterModal.active = false"
    />
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      current: 1,
      personListModal: {
        active: false,
        form: null,
      },
      updateStatusRegisterModal: {
        active: false,
        form: null,
        title: '',
      },
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
          scopedSlots: { customRender: 'companyName' },
        },
        {
          title: 'วันที่เริ่ม -  สิ้นสุดการเข้าพื้นที่',
          dataIndex: 'timeWork',
          align: 'center',
          width: '150px',
          scopedSlots: { customRender: 'timeWork' },
        },
        {
          title: 'ช่วงเวลาที่อนุญาติให้ปฏิบัติงาน',
          dataIndex: 'preregistertime',
          align: 'center',
          width: '150px',
          scopedSlots: { customRender: 'preregistertime' },
        },
        {
          title: 'ประเภทพื้นที่',
          dataIndex: 'areaZone',
          align: 'center',
          width: '150px',
          scopedSlots: { customRender: 'areaZone' },
        },
        {
          title: 'action',
          dataIndex: 'action',
          align: 'center',
          width: '170px',
          scopedSlots: { customRender: 'action' },
        },
      ],
    }
  },
  computed: {
    getHistory() {
      return this.$store.getters['history/getHistory']
    },
    getAreaZone() {
      return this.$store.getters['areaZone/getAreaZone']
    },
  },
  methods: {
    add() {
      this.$router.push('/ship/invitation/create')
    },
    getFullname(record) {
      return `${record.firstname} ${record.lastname}`
    },
    getTimeWork(record) {
      const getStartDate = moment(record.startDate).format('DD/MM/YYYY')
      const getEndDate = moment(record.expireDate).format('DD/MM/YYYY')
      return `${getStartDate} -  ${getEndDate}`
    },
    getPreRegisterTime(record) {
      return `${record.peregistorTimeStart} -  ${record.peregistorTimeEnd}`
    },
    getAreaZoneById(record) {
      const find = this.getAreaZone.find(
        (element) => element.id === record.areaZoneId
      )
      return find?.nameTh
    },
    openPersonList(record) {
      this.personListModal.form = record
      this.personListModal.active = true
    },
    deleteRegister(record) {
      this.updateStatusRegisterModal.title = 'ยืนยันการลบ'
      this.updateStatusRegisterModal.form = record
      this.updateStatusRegisterModal.active = true
    },
    edit(record) {
      this.$router.push({
        path: '/ship/invitation/create',
        query: { id: record.preregistorId },
      })
    },
  },
}
</script>
