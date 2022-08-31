<template>
  <div>
    <a-modal
      v-model="openModal"
      centered
      :closable="false"
      :mask-closable="false"
      class="overflow-modal"
      width="750px"
    >
      <a-row slot="title" type="flex" justify="center">{{ title }}</a-row>
      <a-row type="flex" justify="center" class="fix-content-modal">
        <a-col :span="6" class="mt-5"
          >เหตุผล
          <SharesFormRequiredLabel />
        </a-col>
        <a-col :span="16" class="mt-5">
          <a-input v-model="errorMessage" type="textarea"></a-input>
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
          @click="confirmModal"
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
    title: {
      type: String,
      default: 'ยืนยันนำใบงานกลับมาเเก้ไข',
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
      errorMessage: '',
    }
  },
  watch: {
    active() {
      this.openModal = this.active
    },
  },
  methods: {
    confirmModal() {
      this.$emit('confirm', this.errorMessage)
      this.errorMessage = ''
    },
  },
}
</script>
