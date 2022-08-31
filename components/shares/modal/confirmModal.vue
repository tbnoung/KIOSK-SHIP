<template>
  <a-modal
    v-model="openModal"
    centered
    :closable="false"
    :mask-closable="false"
    :footer="null"
    :title="null"
  >
    <a-row type="flex">
      <a-col :span="24">
        <h4>{{ content }}</h4>
      </a-col>
      <a-col :span="24" class="mt-5">
        <a-row type="flex" justify="end">
          <a-button type="danger" @click="$emit('close')">{{
            textCancle
          }}</a-button>
          <a-button
            v-if="textConfirm"
            type="primary"
            class="ml-3"
            @click="$emit('confirm')"
            >{{ textConfirm }}
          </a-button>
        </a-row>
      </a-col>
    </a-row>
    <div></div>
  </a-modal>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
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
    }
  },
  watch: {
    active() {
      this.openModal = this.active
    },
  },
  created() {},
}
</script>
