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
        >ช่วงวันที่เเละช่วงเวลาที่อนุญาตให้ปฏิบัติงาน</a-row
      >
      <a-row type="flex" justify="center" class="fix-content-modal">
        <a-col :span="22">
          ต้องการเเก้ไขวันที่เริ่ม - สิ้นสุดการปฏิบัติงาน
        </a-col>
        <a-col :span="22" class="mt-5">
          <a-row type="flex" :gutter="[12, 0]">
            <a-col :span="10">
              วันที่เริ่ม - สิ้นสุดการปฏิบัติงาน
              <SharesFormRequiredLabel />
            </a-col>
            <a-col :span="7">
              <a-date-picker
                v-model="form.startDate"
                type="date"
                :disabled-date="$global.disabledDate"
                placeholder="Pick a date"
              />
            </a-col>
            <a-col :span="7">
              <a-date-picker
                v-model="form.expireDate"
                type="date"
                :disabled-date="$global.disabledDate"
                placeholder="Pick a date"
              />
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="22" class="mt-5">
          ต้องการเเก้ไขช่วงระยะเวลาการอนุญาติให้ปฏิบัติงาน
        </a-col>
        <a-col :span="22" class="mt-5">
          <a-row type="flex" :gutter="[12, 0]">
            <a-col :span="10"
              >ช่วงระยะเวลาการอนุญาตให้ปฏิบัติงาน
              <SharesFormRequiredLabel />
            </a-col>
            <a-col :span="14">
              <a-select
                v-model="form.timeWorkId"
                style="width: 100%"
                :placeholder="$t('ShipPreregister.placeholder.select')"
                @change="selectTimeWork"
              >
                <a-select-option
                  v-for="timeWork in getTimeWork"
                  :key="timeWork.id"
                  :value="timeWork.id"
                >
                  <span v-if="timeWork.timeStart === 'อื่น ๆ'">{{
                    timeWork.timeStart
                  }}</span>
                  <span v-else
                    >{{ timeWork.timeStart }} - {{ timeWork.timeEnd }}</span
                  >
                </a-select-option>
              </a-select>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="22" class="mt-5">
          <ShipPreregisEditTimeTable
            :data-table="dataTable"
            @onSelectChange="onSelectChange"
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
          :disabled="!canConfirm"
          @click="confirmModal"
          >{{ textConfirm }}
        </a-button>
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
      selectColumnTable: [],
      form: {},
    }
  },
  computed: {
    getTimeWork() {
      return this.$store.getters['timeWork/getTimeWorkData']
    },
    canConfirm() {
      return this.selectColumnTable.length > 0
    },
  },
  watch: {
    active() {
      this.form = _.cloneDeep(this.propsForm)
      this.setDataTable(this.form)
      this.openModal = this.active
    },
  },
  methods: {
    setDataTable(item) {
      this.dataTable = []
      this.dataTable.push(preRegisterConsentFormatter(item))
      this.dataTable.push(...item?.shipPreregistorFollow)
      this.dataTable = this.$global.orderItem(this.dataTable)
    },
    onSelectChange(val) {
      this.selectColumnTable = val
    },
    async confirmModal() {
      this.$emit('close')
      this.$store.commit('global/SET_OPEN_LOADER')
      const payload = {
        preRegistorId: [],
        preRegistorIdFollow: [],
        timeWorkId: this.form.timeWorkId,
        timeStart: this.form.peregistorTimeStart,
        timeEnd: this.form.peregistorTimeEnd,
        startDay: this.form.startDate,
        expiryDate: this.form.expireDate,
      }
      for (const item of this.selectColumnTable) {
        if (
          item.preregistorId === this.form.preregistorId &&
          item?.type === 'master'
        ) {
          payload.preRegistorId.push(item.preregistorId)
        } else {
          payload.preRegistorIdFollow.push(item.preregistorId)
        }
      }
      await this.$store.dispatch('history/updateTimeHistory', payload)
      this.$nuxt.$emit('fetchContent')
      this.$nuxt.$emit('clearSelectedRows')
      this.selectColumnTable = []
      this.$store.commit('global/SET_CLOSE_LOADER')
    },
    selectTimeWork(val) {
      if (val === 0) {
        this.form.peregistorTimeStart = ''
        this.form.peregistorTimeEnd = ''
      } else {
        const find = this.getTimeWork.find((element) => element.id === val)
        this.form.peregistorTimeStart = find.timeStart
        this.form.peregistorTimeEnd = find.timeEnd
      }
    },
  },
}
</script>
