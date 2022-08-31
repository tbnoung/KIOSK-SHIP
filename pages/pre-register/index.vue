<template>
  <RegisterForm />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import RegisterForm from '@/components/pre-register/form-register.vue'

export default defineComponent({
  components: {
    RegisterForm,
  },
  layout: 'auth',
  auth: false,
  setup() {},
})
</script>
