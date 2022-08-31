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
      <a-row slot="title" type="flex" justify="center">ประเภทพื้นที่ย่อย</a-row>
      <a-row type="flex" justify="center" class="fix-content-modal">
        <a-col :span="22">
          <a-row type="flex">
            <a-col :span="6" class="mt-5 pt-2">ประเภทพื้นที่</a-col>
            <a-col :span="10" class="mt-5">
              <a-input v-model="editSubArea.nameTh" disabled></a-input>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="22">
          <a-row type="flex">
            <a-col :span="6" class="mt-5 pt-2"
              >ประเภทพื้นที่ (ภาษาอังกฤษ)</a-col
            >
            <a-col :span="10" class="mt-5">
              <a-input disabled></a-input>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="22" class="mt-5">
          <ShipAreaZoneEditSubAreaTable :data-table="editSubArea.shipSubArea" />
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
          @click="$emit('confirm')"
          >{{ textConfirm }}</a-button
        >
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
      editSubArea: {},
    }
  },
  watch: {
    active() {
      this.editSubArea = this.propsForm
      this.openModal = this.active
    },
  },
}
</script>
