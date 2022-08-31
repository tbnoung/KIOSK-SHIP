<template>
  <div>
    <a-table :columns="columns" :data-source="dataTable">
      <div slot="fullname" slot-scope="text, record">
        {{ getFullname(record) }}
      </div>
      <div slot="consent" slot-scope="text, record">
        <a-row type="flex">
          <a href=""> ดาวน์โหลด </a>
          <a-icon type="edit" class="ml-5" @click="editConsent(record)" />
        </a-row>
      </div>
    </a-table>
    <ShipPreregisConsentModal
      text-confirm="Confirm"
      text-cancle="Cancle"
      :active="active"
      :edit-record="editRecord"
      @close="active = false"
      @confirm="update"
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
      active: false,
      editRecord: null,
      columns: [
        {
          title: 'ลำดับ',
          dataIndex: 'order',
          width: '100px',
        },
        {
          title: 'ชื่อ - นามสกุล',
          dataIndex: 'fullname',
          scopedSlots: { customRender: 'fullname' },
        },
        {
          title: 'เกี่ยวข้องเป็น',
          dataIndex: 'personName',
        },
        {
          title: 'ลายเซ็นยินยอม',
          dataIndex: 'licenseName',
        },
        {
          title: 'Concent Letter',
          dataIndex: 'consent',
          width: '150px',
          scopedSlots: { customRender: 'consent' },
        },
      ],
    }
  },
  methods: {
    getFullname(record) {
      return `${record?.firstname} ${record?.lastname}`
    },
    async update(payload) {
      this.active = false
      this.$store.commit('global/SET_OPEN_LOADER')
      await this.$store.dispatch('preRegister/updateLicense', payload)
      this.$nuxt.$emit('fetchContent')
    },
    editConsent(record) {
      this.active = true
      this.editRecord = record
    },
  },
}
</script>
