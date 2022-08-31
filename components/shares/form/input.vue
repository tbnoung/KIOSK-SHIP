<template>
  <a-form-item>
    <a-input v-decorator="rules" :placeholder="placeholder" />
  </a-form-item>
</template>

<script>
export default {
  props: {
    rules: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
}
</script>
