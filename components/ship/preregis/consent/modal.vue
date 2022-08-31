<template>
  <a-modal
    v-model="openModal"
    centered
    :closable="false"
    :mask-closable="false"
    width="700px"
    class="overflow-modal"
  >
    <a-row slot="title" type="flex" justify="center">Consent Letter</a-row>
    <a-row type="flex" justify="center" class="fix-content-modal">
      <a-col :span="14" class="pdf"></a-col>
      <a-col :span="14" class="mt-5">
        <a-row v-if="openModal" type="flex">
          <a-col :span="8" class="mt-2 text-center">กรุณาลงนาม</a-col>
          <a-col :span="16">
            <a-input v-model="licenseName" />
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="24">
        <a-row type="flex">
          <a-col :span="20" offset="4" class="text-red mt-5">
            ในกรณีที่ต้องการ Print เอกสารเพื่อทำการเซ็นยินยอม
            เเละนำเอกสารกลับมาเเนบด้านล่าง
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="14" class="mb-10 mt-5">
        <a-upload
          action="http://vms-poc.pttdigital.com/dev_api/"
          :transform-file="transformFile"
        >
          <a-button> <a-icon type="upload" /> Upload </a-button>
        </a-upload>
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
        @click="confirm"
        >{{ textConfirm }}</a-button
      >
    </a-row>
  </a-modal>
</template>
<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    editRecord: {
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
      licenseName: '',
    }
  },
  watch: {
    active() {
      this.openModal = this.active
      this.licenseName = this.editRecord.licenseName
    },
  },
  methods: {
    transformFile(file) {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          const canvas = document.createElement('canvas')
          const img = document.createElement('img')
          img.src = reader.result
          img.onload = () => {
            const ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0)
            ctx.fillStyle = 'red'
            ctx.textBaseline = 'middle'
            ctx.fillText('Ant Design', 20, 20)
            canvas.toBlob(resolve)
          }
        }
      })
    },
    confirm() {
      const getFollowId = this.editRecord?.preRegistorIdFollow
      const payload = {
        preRegisterId: getFollowId ? 0 : this.editRecord?.preregistorId,
        preRegisterIdFollower: getFollowId || 0,
        liCenseName: this.licenseName,
        liCenseFile: 'string',
      }
      this.$emit('confirm', payload)
    },
  },
}
</script>

<style lang="less" scoped>
.pdf {
  height: 500px;
  border: 1px solid black;
}
</style>
