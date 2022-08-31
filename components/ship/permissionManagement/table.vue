<template>
  <div class="mt-5">
    <a-table
      :columns="columns"
      :data-source="getPermission"
      bordered
      :pagination="false"
    >
      <div slot="nameTh" slot-scope="text" class="text-left pl-10">
        {{ text }}
      </div>
      <div slot="action" slot-scope="text, record">
        <a-button
          icon="edit"
          class="mr-2"
          @click="openModalPermission(record)"
        />
      </div>
    </a-table>
    <ShipPermissionManagementModal
      :active="openModal.active"
      :record="openModal.record"
      :record-name="openModal.recordName"
      text-cancle="close"
      text-confirm="submit"
      @confirm="updatePermission"
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
        recordName: '',
      },
      columns: [
        {
          title: 'สิทธิ์',
          dataIndex: 'nameTh',
          align: 'center',
          scopedSlots: { customRender: 'nameTh' },
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
  computed: {
    getPermission() {
      return this.$store.getters['ship/rolePermission/getPermission']
    },
  },
  methods: {
    async openModalPermission(record) {
      const result = await this.$store.dispatch(
        'ship/rolePermission/getPermissionById',
        record.id
      )
      this.openModal.record = _.cloneDeep(result)
      this.openModal.recordName = record.nameTh
      this.openModal.active = true
    },
    async updatePermission(val) {
      this.$store.commit('global/SET_OPEN_LOADER')
      this.openModal.active = false
      const payload = {
        permissionAuthorization: val,
      }
      await this.$store.dispatch(
        'ship/rolePermission/updatePermission',
        payload
      )
      this.$store.commit('global/SET_CLOSE_LOADER')
    },
  },
}
</script>
