<template>
  <a-spin :spinning="isLoading">
    <div v-if="infomation" class="flex justify-center w-full">
      <div class="w-full" style="max-width: 650px">
        <img
          slot="cover"
          class="mb-12 text-center"
          alt="example"
          src="kronos-blue.png"
        />
      </div>
    </div>
  </a-spin>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  useRouter,
} from '@nuxtjs/composition-api'
// import { integer, integer } from 'vee-validate/dist/rules'

export default defineComponent({
  layout: 'auth',
  auth: false,
  setup(_props, context) {
    const i18n = context.root.$i18n
    const router = useRouter()
    const isLoading = ref(false)

    function activated() {
      isLoading.value = true
      return context.root.$axios
        .put(`Account/Activate/${context.root.$route.query.token}`)
        .then(() => {
          isLoading.value = false
          context.root.$success({
            title: 'เปิดใช้งานบัญชี',
            content: 'คุณได้ทำการเปิดใช้งานบัญชีเรียบร้อยแล้ว',
          })
          setTimeout(() => {
            router.push('/login')
          }, 1000)
        })
        .catch((error) => {
          const modal = {
            title: 'มีข้อผิดพลาด',
            content: '',
          }
          if (
            error.response &&
            error.response.data.message[i18n.locale.toLowerCase()]
          ) {
            modal.title = 'ไม่สามารถเปิดใช้งานบัญชีได้'
            modal.content =
              error.response.data.message[i18n.locale.toLowerCase()]
          } else {
            modal.title = 'มีบางอย่างผิดพลาด'
            modal.content =
              error.response.data.message[i18n.locale.toLowerCase()]
          }
          isLoading.value = false
          context.root.$error(modal)
          setTimeout(() => {
            router.push('/login')
          }, 1000)
        })
    }

    onMounted(() => {
      activated()
    })

    return {
      activated,
      isLoading,
    }
  },
})
</script>
