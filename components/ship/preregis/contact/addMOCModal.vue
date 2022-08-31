<template>
  <a-modal
    v-model="openModal"
    centered
    :closable="false"
    :mask-closable="false"
    width="700px"
    class="overflow-modal"
  >
    <a-row slot="title" type="flex" justify="center">เลือกรายการ MOC</a-row>
    <a-row type="flex" justify="center" class="fix-content-modal">
      <a-col :span="20">
        <ShipPreregisContactFormSearchMOC />
      </a-col>
      <a-col :span="24" class="pr-6">
        <ShipPreregisContactTableSearchMOC
          @selectedRows="$emit('comfirm', $event)"
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
        @click="$nuxt.$emit('confirmAddMocModal')"
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
    }
  },
  watch: {
    active() {
      this.openModal = this.active
    },
  },
  methods: {
    selectedRows(val) {
      console.log('selectedRows', val)
      this.$emit('comfirm', val)
    },
  },
}
</script>
