<template>
  <WorkPermitForm />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import WorkPermitForm from '@/components/work-permit/form-register.vue'

export default defineComponent({
  components: {
    WorkPermitForm,
  },
  layout: 'auth',
  auth: false,
  setup() {},
})
</script>
