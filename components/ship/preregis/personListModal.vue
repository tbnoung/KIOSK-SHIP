<template>
  <div v-if="propsForm">
    <a-modal
      v-model="openModal"
      centered
      :closable="false"
      :mask-closable="false"
      class="overflow-modal"
      width="750px"
    >
      <a-row slot="title" type="flex" justify="center"
        >รายชื่อบุคคลในใบงาน</a-row
      >
      <a-row type="flex" justify="center" class="fix-content-modal">
        <a-col :span="22" class="mt-5">
          <ShipPreregisPersonListTable
            :data-table="dataTable"
            :columns="columns"
          />
        </a-col>
      </a-row>
      <a-row slot="footer" type="flex" justify="end">
        <a-button type="danger" @click="$emit('close')">{{
          textCancle
        }}</a-button>
        <a-button
          v-if="textConfirm"
          type="primary"
          class="ml-3"
          @click="$emit('confirm')"
          >{{ textConfirm }}</a-button
        >
      </a-row>
    </a-modal>
  </div>
</template>

<script>
import { preRegisterConsentFormatter } from '@/helpers/ship/preregister/consent'

export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    propsForm: {
      type: Object,
      default: null,
    },
    textConfirm: {
      type: String,
      default: null,
    },
    textCancle: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      openModal: false,
      dataTable: [],
      columns: [],
      columnInvitation: [
        {
          title: 'ลำดับ',
          align: 'center',
          width: '80px',
          dataIndex: 'order',
        },
        {
          title: 'ชื่อ - นามสกุล',
          dataIndex: 'fullname',
          align: 'center',
          width: '150px',
          scopedSlots: { customRender: 'fullname' },
        },
        {
          title: 'บริษัท',
          align: 'center',
          width: '100px',
          dataIndex: 'companyName',
        },
        {
          title: 'วันที่เริ่ม-สิ้นสุด',
          dataIndex: 'timeWork',
          align: 'center',
          width: '150px',
          scopedSlots: { customRender: 'timeWork' },
        },
        {
          title: 'ช่วงระยะเวลาการปฏิบัติงาน',
          dataIndex: 'preregistertime',
          align: 'center',
          width: '150px',
          scopedSlots: { customRender: 'preregistertime' },
        },
        {
          title: 'QR Code',
          dataIndex: 'qrCode',
          align: 'center',
          width: '100px',
          scopedSlots: { customRender: 'qrCode' },
        },
      ],
      columnPreRegister: [
        {
          title: 'ลำดับ',
          align: 'center',
          width: '80px',
          dataIndex: 'order',
        },
        {
          title: 'ชื่อ - นามสกุล',
          dataIndex: 'fullname',
          align: 'center',
          width: '150px',
          scopedSlots: { customRender: 'fullname' },
        },
        {
          title: 'บริษัท',
          align: 'center',
          width: '100px',
          dataIndex: 'companyName',
        },
        {
          title: 'วันที่เริ่ม-สิ้นสุด',
          dataIndex: 'timeWork',
          align: 'center',
          width: '150px',
          scopedSlots: { customRender: 'timeWork' },
        },
        {
          title: 'ช่วงระยะเวลาการปฏิบัติงาน',
          dataIndex: 'preregistertime',
          align: 'center',
          width: '150px',
          scopedSlots: { customRender: 'preregistertime' },
        },
        {
          title: 'สถานะ',
          dataIndex: 'status',
          align: 'center',
          width: '100px',
          scopedSlots: { customRender: 'status' },
        },
        {
          title: 'QR Code',
          dataIndex: 'qrCode',
          align: 'center',
          width: '100px',
          scopedSlots: { customRender: 'qrCode' },
        },
      ],
      form: {},
    }
  },
  computed: {
    getTimeWork() {
      return this.$store.getters['timeWork/getTimeWorkData']
    },
  },
  watch: {
    active() {
      this.form = _.cloneDeep(this.propsForm)
      this.setDataTable(this.form)
      this.openModal = this.active
      const checkPathInvatation =
        this.$route.path.split('/').pop() === 'Invitation'
      if (checkPathInvatation) {
        this.columns = this.columnInvitation
      } else {
        this.columns = this.columnPreRegister
      }
    },
  },
  methods: {
    setDataTable(item) {
      this.dataTable = []
      this.dataTable.push(preRegisterConsentFormatter(item))
      this.dataTable.push(...item?.shipPreregistorFollow)
      this.dataTable = this.$global.orderItem(this.dataTable)
    },
  },
}
</script>
