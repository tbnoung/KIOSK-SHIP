<template>
  <div v-if="active">
    <a-modal
      v-model="openModal"
      centered
      :closable="false"
      :mask-closable="false"
      class="overflow-modal"
      width="650px"
    >
      <a-row slot="title" type="flex" justify="center"
        >จัดการบัญชีผู้ใช้งาน</a-row
      >
      <a-row type="flex" justify="center" class="fix-content-modal pl-0">
        <a-col :span="20">
          <a-row type="flex">
            <a-col :span="4" class="pt-1">สิทธิ์</a-col>
            <a-col :span="10">
              <a-input :value="recordName" disabled></a-input>
            </a-col>
          </a-row>
          <a-row type="flex">
            <a-col :span="24">
              <ShipPermissionTable :record="record" />
            </a-col>
          </a-row>
        </a-col>
      </a-row>
      <a-row slot="footer" type="flex" justify="end">
        <a-button
          type="primary"
          class="ml-3"
          @click="$emit('confirm', record)"
          >{{ textConfirm }}</a-button
        >
        <a-button type="danger" class="ml-3" @click="$emit('close')">{{
          textCancle
        }}</a-button>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    textCancle: {
      type: String,
      default: null,
    },
    textConfirm: {
      type: String,
      default: null,
    },
    record: {
      type: Array,
      default: () => [],
    },
    recordName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      openModal: this.active,
      propRecord: null,
      getPermission: ['contractor', 'supervisor', 'admin', 'staff'],
    }
  },
  watch: {
    active() {
      this.propRecord = this.record
      this.openModal = this.active
    },
  },
}
</script>
