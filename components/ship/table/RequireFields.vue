<template>
  <div v-if="isReady" :key="updateComponets">
    <a-row type="flex" justify="center"> Require Field </a-row>
    <div class="mt-5">กรอกเพื่อทำการค้นหา</div>
    <a-row type="flex" class="mt-5">
      <a-col :span="4" class="text-center pt-1">
        <span>Require Field </span>
      </a-col>
      <a-col :span="12">
        <a-input v-model="searchRequireFields" placeholder="search text" />
      </a-col>
    </a-row>
    <a-row type="flex" justify="center" class="mt-5 mb-5">
      <a-col :span="4"></a-col>
      <a-col :span="12" class="text-right">
        <a-button class="mr-3" type="primary" @click="onSearch">ค้นหา</a-button>
        <a-button class="btn-yellow" @click="resetField">Reset</a-button>
      </a-col>
      <a-col :span="8"></a-col>
    </a-row>
    <ShipTableMaster
      :header="headerTableRequireFields"
      :prop-data-table="dataTable"
    />
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
import { headerTableRequireFields } from '@/helpers/ship/headerTable'
import masterContents from '@/mixins/ship/masterContents'
export default {
  mixins: [masterContents],
  data() {
    return {
      isReady: false,
      dataTable: [],
      headerTableRequireFields,
      confirmModal: {
        active: false,
        content: 'ยืนยืนการบันทึก',
      },
      updateComponets: 0,
      searchRequireFields: '',
    }
  },
  computed: {
    getSearch() {
      return this.$store.getters['RequireFields/getSearchRequireFields']
    },
  },
  async created() {
    this.$store.commit('global/SET_OPEN_LOADER')
    await this.setRequireField()
    this.$store.commit('global/SET_CLOSE_LOADER')
    this.isReady = true
  },
  methods: {
    async setRequireField() {
      let result = await this.$store.dispatch('RequireFields/getRequireFields')
      result = this.setDataTable(result)
      this.$store.commit('RequireFields/SET_SEARCH_REQUIRE_FIELDS', result)
      this.dataTable = _.cloneDeep(result)
    },
    async onSearch() {
      const payload = {
        search: this.searchRequireFields,
      }
      let result = await this.$store.dispatch(
        'RequireFields/getSearchRequireFields',
        payload
      )
      result = this.setDataTable(result)
      this.dataTable = _.cloneDeep(result)
      this.$store.commit('RequireFields/SET_SEARCH_REQUIRE_FIELDS', result)
    },
    async confirm() {
      this.confirmModal.active = false
      this.$store.commit('global/SET_OPEN_LOADER')
      const payloadUpdate = this.checkUpdate()
      await this.$store.dispatch(
        'RequireFields/updateRequireFields',
        payloadUpdate
      )

      this.setRequireField()
      this.updateComponets++
      this.$store.commit('global/SET_CLOSE_LOADER')
    },
    resetField() {
      this.searchRequireFields = ''
      this.onSearch()
    },
  },
}
</script>
