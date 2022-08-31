<template>
  <div>
    <!-- <Example :value="fullName" @input="handleInput" /> -->
    <!-- <Example v-model="fullName" /> -->
    <!-- <WorkPermitForm /> -->
    <WorkPermitFormRegister />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
// import WorkPermitForm from '@/components/work-permit/form-register.vue'

export default defineComponent({
  components: {
    // WorkPermitForm,
  },
  setup() {
    // const fullName = ref({
    //   firstname: 'เทส',
    //   lastname: 'เนม',
    // })

    return {
      // fullName,
    }
  },
})
</script>
