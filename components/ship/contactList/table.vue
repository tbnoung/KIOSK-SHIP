<template>
  <div class="mt-5">
    <a-table
      :columns="columns"
      :data-source="getVisitor.result"
      :scroll="{ x: 'auto' }"
      :pagination="false"
      bordered
    >
      <div slot="order" slot-scope="text, record, index">
        {{ 5 * (getVisitor.currentPage - 1) + (index + 1) }}
      </div>
      <div slot="fullname" slot-scope="text, record" class="text-left">
        {{ getFullName(record) }}
      </div>
      <div slot="personName" slot-scope="text" class="text-left">
        {{ text }}
      </div>
      <div slot="areaZoneName" slot-scope="text" class="text-left">
        {{ text }}
      </div>
      <div slot="companyName" slot-scope="text" class="text-left">
        {{ text }}
      </div>
      <div slot="consentStatus" slot-scope="text" class="text-left">
        {{ getConsentStatus(text) }}
      </div>
      <div slot="citizenId" slot-scope="text" class="text-left">
        {{ text }}
      </div>
      <div slot="mobile" slot-scope="text" class="text-left">
        {{ text }}
      </div>
      <div slot="email" slot-scope="text" class="text-left">
        {{ text }}
      </div>
      <div slot="action" slot-scope="text, record">
        <a-button
          icon="search"
          class="mr-2"
          @click="openModalContactList(record)"
        />
      </div>
    </a-table>
    <a-row :key="updateComponent" type="flex" justify="center" class="mt-3">
      <a-pagination
        v-model="current"
        :total="getVisitor.rowCount"
        :page-size="getVisitor.pageSize"
        show-less-items
        @change="onChangePage"
      />
    </a-row>
    <ShipContactListModal
      :active="openModal.active"
      :record="openModal.record"
      text-cancle="close"
      @close="openModal.active = false"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 1,
      updateComponent: 0,
      openModal: {
        active: false,
        record: null,
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
          width: '200px',
          scopedSlots: { customRender: 'areaZoneName' },
        },
        {
          title: 'บริษัท',
          dataIndex: 'companyName',
          align: 'center',
          width: '150px',
          scopedSlots: { customRender: 'companyName' },
        },
        {
          title: 'consent',
          dataIndex: 'consentStatus',
          align: 'center',
          width: '150px',
          scopedSlots: { customRender: 'consentStatus' },
        },
        {
          title: 'เลขบัตรประชาชน',
          dataIndex: 'citizenId',
          align: 'center',
          width: '200px',
          scopedSlots: { customRender: 'citizenId' },
        },
        {
          title: 'เบอร์โทร',
          dataIndex: 'mobile',
          align: 'center',
          width: '150px',
          scopedSlots: { customRender: 'mobile' },
        },
        {
          title: 'อีเมล์',
          dataIndex: 'email',
          align: 'center',
          width: '150px',
          scopedSlots: { customRender: 'email' },
        },
        {
          title: 'action',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
        },
      ],
    }
  },
  computed: {
    getVisitor() {
      return this.$store.getters['ship/shipVisitor/getVisitor']
    },
  },
  mounted() {
    this.$nuxt.$on('updateCurrentPage', (page) => {
      this.current = page
      this.updateComponent++
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('updateCurrentPage')
  },
  methods: {
    openModalContactList(record) {
      this.openModal.record = record
      this.openModal.active = true
    },
    getFullName(record) {
      return `${record.titleName} ${record.firstname} ${record.lastname}`
    },
    getConsentStatus(text) {
      return text
        ? 'ยินยอมจัดเก็บข้อมูลส่วนบุคคล'
        : 'ยังไม่ยินยอมจัดเก็บข้อมูลส่วนบุคคล'
    },
    onChangePage(page) {
      this.$nuxt.$emit('changePage', page)
    },
  },
}
</script>
