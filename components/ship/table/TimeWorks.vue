<template>
  <div :key="updateComponets">
    <a-row type="flex" justify="center"> ช่วงเวลาที่อนุญาตให้ปฏิบัติงาน </a-row>
    <div class="mt-5">กรอกเพื่อทำการค้นหา</div>
    <a-row type="flex" class="mt-5">
      <a-col :span="4" class="text-center pt-1">
        <span>ช่วงเวลาที่อนุญาตให้ปฏิบัติงาน </span>
      </a-col>
      <a-col :span="12">
        <a-input v-model="searchTimeWorks" placeholder="search text" />
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
      <a-button class="btn-green" @click="addTimeWorks">
        <a-icon type="plus-circle" />เพิ่มรายการ
      </a-button>
    </a-row>
    <ShipTableTimeMaster
      :header="headerTableTimeWorks"
      :prop-data-table="dataTable"
    />
    <div>
      <a-row type="flex" justify="end" class="mt-5">
        <a-button
          type="primary"
          class="mr-5"
          @click="confirmModal.active = true"
          >Confirm
        </a-button>
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
import { headerTableTimeWorks } from '@/helpers/ship/headerTable'
import masterContents from '@/mixins/ship/masterContents'
export default {
  mixins: [masterContents],
  data() {
    return {
      dataTable: [],
      headerTableTimeWorks,
      confirmModal: {
        active: false,
        content: 'ยืนยืนการบันทึก',
      },
      updateComponets: 0,
      searchTimeWorks: '',
    }
  },
  computed: {
    getSearch() {
      return this.$store.getters['timeWork/getTimeWorkData']
    },
  },
  created() {
    this.setTimeWorks()
  },
  methods: {
    async setTimeWorks() {
      let result = await this.$store.dispatch('timeWork/getTimeWork')
      result = this.setDataTable(result)
      this.$store.commit('timeWork/SET_SEARCH_TIME_WORK', result)
      this.dataTable = _.cloneDeep(result)
    },
    async onSearch() {
      if (this.searchTimeWorks) {
        const payload = {
          search: this.searchTimeWorks,
        }
        let result = await this.$store.dispatch(
          'timeWork/getSearchTimeWork',
          payload
        )
        result = this.setDataTable(result)
        this.dataTable = _.cloneDeep(result)
        this.$store.commit('timeWork/SET_SEARCH_TIME_WORK', result)
      } else {
        this.setTimeWorks()
      }
    },
    async confirm() {
      this.confirmModal.active = false
      this.$store.commit('global/SET_OPEN_LOADER')
      const payloadUpdate = this.checkUpdate()
      await this.$store.dispatch('timeWork/updateTimeWork', payloadUpdate)
      const payloadCreate = this.getCreate()
      await this.$store.dispatch('timeWork/createTimeWork', payloadCreate)

      this.setTimeWorks()
      this.updateComponets++
      this.$store.commit('global/SET_CLOSE_LOADER')
    },
    addTimeWorks() {
      this.dataTable.push({
        id: this.dataTable.length + 1000,
        type: 'create',
        timeStart: '',
        timeEnd: '',
        editable: true,
        status: false,
      })
    },
    resetField() {
      this.searchTimeWorks = ''
      this.setTimeWorks()
    },
  },
}
</script>
