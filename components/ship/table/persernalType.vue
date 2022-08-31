<template>
  <div :key="updateComponets">
    <a-row type="flex" justify="center"> ประเภทบุคคล </a-row>
    <div class="mt-5">กรอกเพื่อทำการค้นหา</div>
    <a-row type="flex" class="mt-5">
      <a-col :span="4" class="text-center pt-1">
        <span>ประเภทกลุ่มบุคคล </span>
      </a-col>
      <a-col :span="12">
        <a-input v-model="searchPersonalType" placeholder="search text" />
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
      <a-button class="btn-green" @click="addPersonalType">
        <a-icon type="plus-circle" />เพิ่มรายการ
      </a-button>
    </a-row>
    <ShipTableMaster
      :header="headerTablePersonType"
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
import { headerTablePersonType } from '@/helpers/ship/headerTable'
import masterContents from '@/mixins/ship/masterContents'
export default {
  mixins: [masterContents],
  data() {
    return {
      dataTable: [],
      headerTablePersonType,
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
      return this.$store.getters['personalType/getSearchPersonalTyps']
    },
  },
  created() {
    this.setPersonalType()
  },
  methods: {
    async setPersonalType() {
      let result = await this.$store.dispatch('personalType/getPersonalType')
      await this.$store.dispatch('personalType/getAccessTypePerson')
      result = this.setDataTable(result)
      this.$store.commit('personalType/SET_SEARCH_PERSONAL_TYPE', result)
      this.dataTable = _.cloneDeep(result)
    },
    async onSearch() {
      if (this.searchPersonalType) {
        const payload = {
          search: this.searchPersonalType,
        }
        let result = await this.$store.dispatch(
          'personalType/getSearchPersonalType',
          payload
        )
        result = this.setDataTable(result)
        this.dataTable = _.cloneDeep(result)
        this.$store.commit('personalType/SET_SEARCH_PERSONAL_TYPE', result)
      } else {
        this.setPersonalType()
      }
    },
    async confirm() {
      this.confirmModal.active = false
      this.$store.commit('global/SET_OPEN_LOADER')
      const payloadUpdate = this.checkUpdate()
      await this.$store.dispatch(
        'personalType/updatePersonalType',
        payloadUpdate
      )
      const payloadCreate = this.getCreate()
      await this.$store.dispatch(
        'personalType/createPersonalType',
        payloadCreate
      )

      this.setPersonalType()
      this.updateComponets++
      this.$store.commit('global/SET_CLOSE_LOADER')
    },
    addPersonalType() {
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
      this.searchPersonalType = ''
      this.setPersonalType()
    },
  },
}
</script>
