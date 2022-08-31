<template>
  <div v-if="active">
    <a-modal
      v-model="openModal"
      centered
      :closable="false"
      :mask-closable="false"
      class="overflow-modal"
      width="750px"
    >
      <a-row slot="title" type="flex" justify="center">QR Code</a-row>
      <a-row type="flex" justify="center" class="fix-content-modal pl-0">
        <a-col :span="16">
          QR Code สำหรับใช้สเเกนเข้าพื้นที่ของ : {{ fullname }}
        </a-col>
        <a-col :span="24" class="mt-5">
          <a-row type="flex" justify="center">
            <a-col :span="10" class="qr-code"></a-col>
          </a-row>
        </a-col>
      </a-row>
      <a-row slot="footer" type="flex" justify="end">
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
    record: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      openModal: this.active,
    }
  },
  computed: {
    fullname() {
      return `${this.record?.titleName} ${this.record?.firstname} ${this.record?.lastname}`
    },
  },
  watch: {
    active() {
      this.openModal = this.active
    },
  },
}
</script>
<style lang="less" scoped>
.qr-code {
  height: 200px;
  border: 1px solid gray;
}
</style>
