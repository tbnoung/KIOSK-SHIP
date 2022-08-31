<template>
  <a-modal
    v-model="openModal"
    centered
    :closable="false"
    :mask-closable="false"
    data-error-modal="error"
    class="overflow-modal"
    width="750px"
  >
    <a-row slot="title" type="flex" justify="center">Error Require Field</a-row>
    <a-row type="flex" justify="center" class="fix-content-modal">
      <a-col :span="22">
        <div v-for="(item, index) in propsForm" :key="index" class="mb-5">
          <div v-if="item.requireField.length !== 0">
            <h4>
              {{ item.title }}
              <a-button type="like" @click="routerToError(item)"
                >คลิกที่นี้เพื่อเเก้ไข</a-button
              >
            </h4>
            <div
              v-for="(errorText, idxError) in item.requireField"
              :key="idxError"
              class="pl-10 mb-5"
            >
              - {{ errorText }}
            </div>
          </div>
        </div>
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
      type: Array,
      default: () => [],
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
    routerToError(val) {
      this.$router.push({ path: val.path, query: val.query })
    },
  },
}
</script>
