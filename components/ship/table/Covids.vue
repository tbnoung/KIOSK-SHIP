<template>
  <div :key="updateComponets">
    <a-row class="mb-5" type="flex" justify="center">
      COVID-19 Management
    </a-row>

    <ShipTableMaster :header="headerTableCovids" :prop-data-table="dataTable" />
    <div>
      <a-row type="flex" justify="end" class="mt-5">
        <a-button
          type="primary"
          class="mr-5"
          @click="confirmModal.active = true"
          >Confirm</a-button
        >
        <a-button class="btn-yellow" @click="onReset">Reset</a-button>
      </a-row>
    </div>
    <SharesModalConfirmModal
      :active="confirmModal.active"
      text-confirm="Confirm"
      text-cancle="Cancle"
      :content="confirmModal.content"
      @confirm="confirm"
      @close="confirmModal.active = false"
    />
  </div>
</template>

<script>
import { headerTableCovids } from '@/helpers/ship/headerTable'
import masterContents from '@/mixins/ship/masterContents'
export default {
  mixins: [masterContents],
  data() {
    return {
      dataTable: [{ nameTh: 'ตรวจสอบ COVID-19' }],
      headerTableCovids,
      confirmModal: {
        active: false,
        content: 'ยืนยืนการบันทึก',
      },
      updateComponets: 0,
      searchPersonalType: '',
    }
  },
  computed: {
    getSearch() {
      return this.$store.getters['covid/getSearchRequireFields']
    },
  },
  created() {
    this.setCovids()
  },
  methods: {
    async setCovids() {
      let result = await this.$store.dispatch('covid/getCovid')

      result = this.setDataTable(result)

      this.$store.commit('covid/SET_SEARCH_COVID', result)

      this.dataTable = _.cloneDeep(result)
    },
    async confirm() {
      this.confirmModal.active = false
      this.$store.commit('global/SET_OPEN_LOADER')
      const payloadUpdate = this.checkUpdate()
      await this.$store.dispatch('covid/updateRequireFields', payloadUpdate)

      this.setCovids()
      this.updateComponets++
      this.$store.commit('global/SET_CLOSE_LOADER')
    },
  },
}
</script>
