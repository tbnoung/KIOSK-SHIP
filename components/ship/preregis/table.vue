<template>
  <div class="mt-5 mb-5">
    <a-table
      :columns="columns"
      :data-source="getHistory.result"
      class="mt-5"
      :pagination="false"
      bordered
      :scroll="{ x: 'auto' }"
    >
      <div slot="order" slot-scope="text, record, index">
        {{ 5 * (getHistory.currentPage - 1) + (index + 1) }}
      </div>
      <div slot="fullname" slot-scope="text, record" class="text-left">
        {{ getFullname(record) }}
      </div>
      <div slot="companyName" slot-scope="text" class="text-left">
        <div v-if="text">{{ text }}</div>
        <div v-else>-</div>
      </div>
      <div slot="companyName" slot-scope="text" class="text-left">
        <div v-if="text">{{ text }}</div>
        <div v-else>-</div>
      </div>
      <div slot="shipUserareas" slot-scope="text, record" class="text-left">
        <div v-if="text.length > 0">
          <div
            v-for="(item, index) in text"
            :key="index"
            class="text-indent-area"
          >
            <span>{{ index + 1 }}. {{ item.zoneName }}</span>
            <span v-if="item.plantName">, {{ item.plantName }}</span>
            <span v-if="item.areaName">, {{ item.areaName }}</span>
          </div>
        </div>
        <div v-else>-</div>
      </div>
      <div slot="timeWork" slot-scope="text, record" class="text-left">
        {{ getTimeWork(record) }}
      </div>
      <div slot="preregistertime" slot-scope="text, record" class="text-left">
        {{ getPreRegisterTime(record) }}
      </div>
      <div slot="countSupporter" slot-scope="text, record">
        {{ record.shipPreregistorFollow.length }} คน
      </div>
      <div
        slot="shipStatusOperation"
        slot-scope="text, record"
        class="text-left"
      >
        <div>
          กำลังดำเนินการ :
          {{ record.statusData.waitForSummit + record.statusData.waitApproved }}
        </div>
        <div>อนุมัติ : {{ record.statusData.approved }}</div>
        <div>ไม่อนุมัติ : {{ record.statusData.noApproved }}</div>
        <div>นำกลับมาเเก้ไข : {{ record.statusData.reject }}</div>
      </div>
      <a-row
        slot="action"
        slot-scope="text, record"
        type="flex"
        justify="center"
      >
        <a-button icon="search" class="mr-2" @click="openPersonList(record)" />
        <a-button icon="edit" class="mr-2" @click="edit(record)" />
        <a-button
          v-if="canDelete(record)"
          icon="delete"
          class="mr-2"
          type="danger"
          @click="deleteRegister(record)"
        />
        <a-button
          v-if="canActionApprove(record)"
          icon="check"
          class="mr-2 btn-green"
          @click="approveRegister(record)"
        />
        <a-button
          v-if="canActionApprove(record)"
          icon="close"
          class="mr-2"
          type="danger"
          @click="cancleRegister(record)"
        />
        <a-button
          v-if="canRollback(record) || canActionApprove(record)"
          icon="rollback"
          class="btn-yellow"
          @click="rollbackRegister(record)"
        />
        <a-button
          v-if="$shipUser.isAdmin()"
          icon="clock-circle"
          style="background-color: orange"
          class="mr-2"
          @click="editTime(record)"
          >เเก้ไขเวลา</a-button
        >
      </a-row>
    </a-table>
    <a-row :key="updateComponent" type="flex" justify="center" class="mt-3">
      <a-pagination
        v-model="current"
        :total="getHistory.pageCount"
        :default-page-size="currentPage"
        show-less-items
        @change="onChange"
      />
    </a-row>
    <ShipPreregisEditTimeModal
      text-cancle="Close"
      text-confirm="Submit"
      :active="editTimeModal.active"
      :props-form="editTimeModal.form"
      @close="editTimeModal.active = false"
      @confirm="editTimeModal.active = false"
    />
    <ShipPreregisPersonListModal
      text-cancle="Close"
      :active="personListModal.active"
      :props-form="personListModal.form"
      @close="personListModal.active = false"
    />
    <ShipPreregisUpdateStatusRegisterModal
      text-cancle="Close"
      text-confirm="Submit"
      :title="updateStatusRegisterModal.title"
      :active="updateStatusRegisterModal.active"
      @close="updateStatusRegisterModal.active = false"
      @confirm="confirmUpdateStatusRegisterModal"
    />
    <SharesModalConfirmModal
      :active="approveModal.active"
      text-confirm="Confirm"
      text-cancle="Cancle"
      :content="approveModal.content"
      @confirm="confirmUpdateStatusRegisterModal"
      @close="approveModal.active = false"
    />
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      updateComponent: 0,
      current: 1,
      editTimeModal: {
        active: false,
        form: null,
      },
      approveModal: {
        content: '',
        active: false,
      },
      personListModal: {
        active: false,
        form: null,
      },
      updateStatusRegisterModal: {
        active: false,
        record: null,
        action: '',
        title: '',
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
          dataIndex: 'shipUserareas',
          align: 'center',
          width: '200px',
          scopedSlots: { customRender: 'shipUserareas' },
        },
        {
          title: 'บริษัท',
          align: 'center',
          width: '200px',
          dataIndex: 'companyName',
          scopedSlots: { customRender: 'companyName' },
        },
        {
          title: 'วันที่เริ่ม-สิ้นสุด',
          dataIndex: 'timeWork',
          align: 'center',
          width: '150px',
          scopedSlots: { customRender: 'timeWork' },
        },
        {
          title: 'ช่วงระยะเวลาการปฏิบัติงาน',
          dataIndex: 'preregistertime',
          align: 'center',
          width: '150px',
          scopedSlots: { customRender: 'preregistertime' },
        },
        {
          title: 'จำนวนผู้ติดตาม',
          dataIndex: 'countSupporter',
          align: 'center',
          width: '100px',
          scopedSlots: { customRender: 'countSupporter' },
        },
        {
          title: 'สถานะ',
          width: '150px',
          dataIndex: 'status',
          align: 'center',
          scopedSlots: { customRender: 'shipStatusOperation' },
        },
        {
          title: 'action',
          dataIndex: 'action',
          width: 280,
          align: 'center',
          scopedSlots: { customRender: 'action' },
        },
      ],
    }
  },
  computed: {
    getHistory() {
      return this.$store.getters['history/getHistory']
    },
  },
  mounted() {
    this.$nuxt.$on('updatePagination', (page) => {
      this.current = page
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('updatePagination')
  },
  methods: {
    countPerson(record) {
      return record?.shipPreregistorFollow.length + 1
    },
    canActionApprove(record) {
      return (
        record?.statusData?.waitForSummit !== this.countPerson(record) &&
        this.$shipUser.isApprove()
      )
    },
    canRollback(record) {
      return (
        record?.statusData?.waitForSummit !== this.countPerson(record) &&
        record.accountId === this.$shipUser.getAccountId() &&
        record?.statusData?.reject !== this.countPerson(record)
      )
    },
    canDelete(record) {
      const checkActionFollow = record.shipPreregistorFollow.find((element) =>
        [null, undefined, 0].includes(element.statusOperationId)
      )
      return (
        checkActionFollow &&
        [null, undefined, 0].includes(record.statusOperationId) &&
        record.accountId === this.$shipUser.getAccountId()
      )
    },
    add() {
      this.$router.push('/ship/pre-register/create')
    },
    edit(record) {
      if (this.$shipUser.isApprove() && record.statusOperationId === 1) {
        this.$router.push(
          `/ship/pre-register/${record.preregistorId}/consideration`
        )
      } else {
        this.$router.push({
          path: '/ship/pre-register/create',
          query: { id: record.preregistorId },
        })
      }
    },
    onChange(val) {
      this.$emit('onChangePagination', val)
    },
    getFullname(record) {
      const titleName = record.titleName ? record.titleName : ''
      const firstname = record.firstname ? record.firstname : ''
      const lastname = record.lastname ? record.lastname : ''
      return !titleName && !firstname && !lastname
        ? '-'
        : `${titleName} ${firstname} ${lastname}`
    },
    getPreRegisterTime(record) {
      return record.peregistorTimeStart || record.peregistorTimeEnd
        ? `${record.peregistorTimeStart} -  ${record.peregistorTimeEnd}`
        : '-'
    },
    getTimeWork(record) {
      const getStartDate = moment(record.startDate).format('DD/MM/YYYY')
      const getEndDate = moment(record.expireDate).format('DD/MM/YYYY')
      return record.startDate || record.expireDate
        ? `${getStartDate} -  ${getEndDate}`
        : '-'
    },
    async updateStatusShipHistory(record, status, remark = '') {
      this.$store.commit('global/SET_OPEN_LOADER')
      const payload = {
        flatStatus: true,
        preRegistorId: [record?.preregistorId],
        preRegistorIdFollow: [],
        status,
        remark,
      }
      await this.$store.dispatch('history/updateStatusShipRegister', payload)
      this.$nuxt.$emit('fetchContent')
    },
    editTime(record) {
      this.editTimeModal.form = record
      this.editTimeModal.active = true
    },
    openPersonList(record) {
      this.personListModal.form = record
      this.personListModal.active = true
    },
    updateStatusRegister(record, action) {
      this.updateStatusRegisterModal.record = record
      this.updateStatusRegisterModal.action = action
      this.updateStatusRegisterModal.active = true
    },
    deleteRegister(record) {
      this.updateStatusRegisterModal.title = 'ยืนยันการลบ'
      this.updateStatusRegister(record, 'delete')
    },
    rollbackRegister(record) {
      this.updateStatusRegisterModal.title = 'ยืนยันนำใบงานกลับมาเเก้ไข'
      this.updateStatusRegister(record, 'rollback')
    },
    approveRegister(record) {
      this.updateStatusRegisterModal.action = 'approve'
      this.updateStatusRegisterModal.record = record
      this.approveModal.content =
        'กดยืนยันเพื่อทำการอนุมัติรายชื่อบุคคลทั้งหมดในใบงานนี้ โดยระบบจะทำการส่งเมล์ไปยังเจ้าของใบงาน'
      this.approveModal.active = true
    },
    cancleRegister(record) {
      this.updateStatusRegisterModal.title = 'ยืนยันการยกเลิกใบงาน'
      this.updateStatusRegister(record, 'cancle')
    },
    confirmUpdateStatusRegisterModal(message) {
      this.updateStatusRegisterModal.active = false
      this.approveModal.active = false
      switch (this.updateStatusRegisterModal.action) {
        case 'delete':
          this.deleteShipHistory(message)
          break
        case 'cancle':
          this.updateStatusShipHistory(
            this.updateStatusRegisterModal.record,
            2,
            message
          )
          break
        case 'rollback':
          this.updateStatusShipHistory(
            this.updateStatusRegisterModal.record,
            4,
            message
          )
          break
        case 'approve':
          this.updateStatusShipHistory(
            this.updateStatusRegisterModal.record,
            3,
            message
          )
          break
        default:
          break
      }
    },
    async deleteShipHistory(message) {
      const payload = {
        preRegistorId: [this.updateStatusRegisterModal.record.preregistorId],
        remark: message,
      }
      await this.$store.dispatch('history/deleteShipHistory', payload)
      this.$nuxt.$emit('fetchContent')
    },
  },
}
</script>

<style lang="less" scoped>
.text-indent-area {
  text-indent: 10px;
}
</style>
