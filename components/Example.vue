<template>
  <div>
    {{ fullName }}
    <a-input v-model="newFirstName" />
    <a-input v-model="newLastName" />
    <div>
      <a-button @click="handleChangeName">แก้ไขชื่อ</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from '@nuxtjs/composition-api'

interface Name {
  firstname: string
  lastname: string
}

export default defineComponent({
  props: {
    value: {
      type: Object as () => Name,
      required: true,
    },
  },

  setup(props, { emit }) {
    const newFirstName = ref()
    const newLastName = ref()

    const fullName = computed(() => {
      return `${props.value.firstname} ${props.value.lastname}`
    })

    function handleChangeName() {
      const data: Name = {
        firstname: newFirstName.value,
        lastname: newLastName.value,
      }
      emit('input', data)
    }

    return {
      newFirstName,
      newLastName,
      fullName,
      handleChangeName,
    }
  },
})
</script>
