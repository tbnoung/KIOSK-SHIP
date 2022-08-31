<template>
  <div :key="updateComponets">
    <a-row type="flex" justify="center"> ประเภทพื้นที่ </a-row>
    <div class="mt-5">กรอกเพื่อทำการค้นหา</div>

    <a-row type="flex" class="mt-5">
      <a-col :span="4" class="text-center pt-1">
        <span>ประเภทพื้นที่</span>
      </a-col>
      <a-col :span="12">
        <a-input v-model="searchAreaZone" placeholder="search text" />
      </a-col>
    </a-row>

    <a-row type="flex" justify="center" class="mt-5">
      <a-col :span="4"></a-col>
      <a-col :span="12" class="text-right">
        <a-button class="mr-3" type="primary" @click="onSearch">ค้นหา</a-button>
        <a-button class="btn-yellow" @click="resetField">Reset</a-button>
      </a-col>
      <a-col :span="8"></a-col>
    </a-row>
    <a-row type="flex" justify="end" class="mt-5 mb-2">
      <a-button class="btn-green" @click="addAreaZone">
        <a-icon type="plus-circle" />เพิ่มรายการ
      </a-button>
    </a-row>
    <ShipTableMaster
      :header="headerTableAreaZone"
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
import { headerTableAreaZone } from '@/helpers/ship/headerTable'
import masterContents from '@/mixins/ship/masterContents'
export default {
  mixins: [masterContents],
  data() {
    return {
      dataTable: [],
      headerTableAreaZone,
      confirmModal: {
        active: false,
        content: 'ยืนยืนการบันทึก',
      },
      updateComponets: 0,
      searchAreaZone: '',
    }
  },
  computed: {
    getSearch() {
      return this.$store.getters['areaZone/getSearchAreaZone']
    },
  },
  created() {
    this.setAreaZoneContent()
  },
  methods: {
    async setAreaZoneContent() {
      let result = await this.$store.dispatch('areaZone/getAreaZone')
      result = this.setDataTable(result)
      this.$store.commit('areaZone/SET_SEARCH_AREA_ZONE', result)
      this.dataTable = _.cloneDeep(result)
    },
    async onSearch() {
      if (this.searchAreaZone) {
        const payload = {
          search: this.searchAreaZone,
        }
        let result = await this.$store.dispatch(
          'areaZone/getSearchAreaZone',
          payload
        )
        result = this.setDataTable(result)
        this.dataTable = _.cloneDeep(result)
        this.$store.commit('areaZone/SET_SEARCH_AREA_ZONE', result)
      } else {
        this.setAreaZoneContent()
      }
    },
    async confirm() {
      this.confirmModal.active = false
      this.$store.commit('global/SET_OPEN_LOADER')
      const payloadUpdate = this.checkUpdate()
      await this.$store.dispatch('areaZone/updateAreaZone', payloadUpdate)
      const payloadCreate = this.getCreate()
      await this.$store.dispatch('areaZone/createAreaZone', payloadCreate)

      this.setAreaZoneContent()
      this.updateComponets++
      this.$store.commit('global/SET_CLOSE_LOADER')
    },
    addAreaZone() {
      this.dataTable.push({
        id: this.dataTable.length + 1000,
        type: 'create',
        nameTh: '',
        nameEn: '',
        editable: true,
        status: false,
        tiltle: '',
      })
    },
    resetField() {
      this.searchAreaZone = ''
      this.setAreaZoneContent()
    },
  },
}
</script>
