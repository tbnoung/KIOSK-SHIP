<template>
  <div class="mt-5">
    <a-table
      :columns="columns"
      :data-source="getUserManagement.result"
      bordered
      :pagination="false"
    >
      <div slot="order" slot-scope="text, record, index">
        {{ 5 * (getUserManagement.currentPage - 1) + (index + 1) }}
      </div>
      <div slot="fullName" slot-scope="text, record" class="text-left">
        {{ getFullname(record) }}
      </div>
      <div slot="citizenId" slot-scope="text" class="text-left">
        {{ text }}
      </div>
      <div slot="username" slot-scope="text" class="text-left">
        {{ text }}
      </div>
      <div slot="action" slot-scope="text, record">
        <a-button
          icon="edit"
          class="mr-2"
          @click="openModalUserManagement(record)"
        />
      </div>
    </a-table>
    <a-row :key="updateComponent" type="flex" justify="center" class="mt-3">
      <a-pagination
        v-model="current"
        :total="getUserManagement.rowCount"
        :default-page-size="getUserManagement.pageSize"
        show-less-items
        @change="onChangePage"
      />
    </a-row>
    <ShipUserManagementModal
      :active="openModal.active"
      :record="openModal.record"
      text-cancle="close"
      text-confirm="submit"
      @confirm="updateUserManagement"
      @close="openModal.active = false"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      openModal: {
        active: false,
        record: null,
      },
      current: 1,
      updateComponent: 0,
      columns: [
        {
          title: 'ลำดับ',
          dataIndex: 'order',
          align: 'center',
          width: '80px',
          scopedSlots: { customRender: 'order' },
        },
        {
          title: 'บัญชีผู้ใช้งาน',
          dataIndex: 'fullName',
          align: 'center',
          scopedSlots: { customRender: 'fullName' },
        },
        {
          title: 'บริษัท',
          dataIndex: 'company',
          align: 'center',
          width: '200px',
        },
        {
          title: 'เลขบัตรประชาชนหรือ passport',
          dataIndex: 'citizenId',
          align: 'center',
          width: '250px',
          scopedSlots: { customRender: 'citizenId' },
        },
        {
          title: 'Username',
          dataIndex: 'username',
          align: 'center',
          width: '200px',
          scopedSlots: { customRender: 'username' },
        },
        {
          title: '',
          dataIndex: 'action',
          align: 'center',
          width: '100px',
          scopedSlots: { customRender: 'action' },
        },
      ],
    }
  },
  computed: {
    getUserManagement() {
      return this.$store.getters['ship/userManagement/getUserManagement']
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
    getFullname(record) {
      return `${record.firstName} ${record.lastName}`
    },
    openModalUserManagement(record) {
      this.openModal.record = record
      this.openModal.active = true
    },
    onChangePage(page) {
      this.$nuxt.$emit('changePage', page)
    },
    async updateUserManagement(item) {
      this.openModal.active = false
      const payload = {
        accountId: item.id,
        img: item.displayImg,
        roleId: item.roleId,
      }
      await this.$store.dispatch(
        'ship/userManagement/updateUserManagement',
        payload
      )
      this.$nuxt.$emit('changePage', this.current)
    },
  },
}
</script>
