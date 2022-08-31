<template>
  <a-modal
    v-model="openModal"
    centered
    :closable="false"
    :mask-closable="false"
    class="overflow-modal"
    width="750px"
  >
    <a-row slot="title" type="flex" justify="center">ผู้ติดตาม</a-row>
    <a-row type="flex" justify="center" class="fix-content-modal">
      <a-col :span="22">
        <ShipPreregisDetailForm
          :key="updateComponent"
          ref-form="addSupporter"
          :props-form="form"
          @onSubmit="$emit('onSubmit', form)"
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
        @click="$emit('confirm')"
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
    propsForm: {
      type: Object,
      default: null,
    },
    currentForm: {
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
      updateComponent: 0,
      openModal: false,
      form: _.cloneDeep(this.$enum.preregister.defaultPopupFormDetail),
    }
  },
  watch: {
    active() {
      this.form = _.cloneDeep(this.$enum.preregister.defaultPopupFormDetail)
      this.form.startDate = this.currentForm.startDate
      this.form.expireDate = this.currentForm.expireDate
      this.form.peregistorTimeStart = this.currentForm.peregistorTimeStart
      this.form.peregistorTimeEnd = this.currentForm.peregistorTimeEnd
      this.form.timeWorkId = this.currentForm.timeWorkId
      if (this.propsForm) {
        this.form = this.propsForm
      }
      setTimeout(() => {
        this.updateComponent++
        this.openModal = this.active
      }, 100)
    },
  },
}
</script>
