<template>
  <div class="w-full max-w-lg">
    <div class="mb-12 text-center">
      <img
        slot="cover"
        class="mb-12 text-center"
        alt="example"
        src="kronos-blue.png"
      />
    </div>
    <a-spin :spinning="isLoading">
      <div class="flex justify-center w-full">
        <a-card class="mt-5" :title="$t('forgotPassword.resetEmail')">
          <validation-observer ref="inputForm" v-slot="{ handleSubmit }" slim>
            <a-form
              class="mt-5"
              :form="form"
              @submit.prevent="handleSubmit(onSubmit)"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="passwords"
                :rules="{
                  required: true,
                  PaswordNumber: true,
                }"
                ><a-form-item
                  :validate-status="errors[0] ? 'error' : null"
                  :help="errors[0]"
                  required
                  class="mb-3"
                >
                  <a-input-password
                    v-model="form.pwd"
                    size="large"
                    name="password"
                    :placeholder="$t('forgotPassword.password')"
                    allow-clear
                  />
                </a-form-item>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                :name="$t('forgotPassword.passwordConfirm')"
                :rules="{
                  required: true,
                  confirmed: 'passwords',
                }"
              >
                <a-form-item
                  :validate-status="errors[0] ? 'error' : null"
                  :help="errors[0]"
                  required
                  class="mb-3"
                >
                  <a-input-password
                    v-model="form.confirmPwd"
                    size="large"
                    :placeholder="$t('forgotPassword.passwordConfirm')"
                    allow-clear
                  />
                </a-form-item>
              </ValidationProvider>
              <a-form-item>
                <a-button
                  :loading="isLoading"
                  type="primary"
                  html-type="submit"
                  block
                  shape="round"
                >
                  {{ $t('forgotPassword.save') }}
                </a-button>
              </a-form-item>
            </a-form>
          </validation-observer>
        </a-card>
      </div>
    </a-spin>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useRouter,
  reactive,
} from '@nuxtjs/composition-api'
import Utf8 from 'crypto-js/enc-utf8'
import Base64 from 'crypto-js/enc-base64'
// import { integer, integer } from 'vee-validate/dist/rules'

interface resetModel {
  token: string | null
  pwd: string | null
}

export default defineComponent({
  layout: 'auth',
  auth: false,
  setup(_props, context) {
    const i18n = context.root.$i18n
    const router = useRouter()
    const isLoading = ref(false)
    // Reactive
    const form = reactive<resetModel>({
      token: '',
      pwd: '',
    })

    function onSubmit() {
      isLoading.value = true

      return context.root.$axios
        .put('Account/ConfirmPwd', {
          token: context.root.$route.query.token,
          pwd: Base64.stringify(Utf8.parse(form.pwd || '')),
        })
        .then(() => {
          // visableModal.value = true
          // detail.value = data
          context.root.$success({
            title: 'เปลี่ยนรหัสผ่านสำเร็จ',
            content: 'กรุณาลองเข้าใช้งานระบบใหม่อีกครั้ง',
          })
          setTimeout(() => {
            router.push('/login')
          }, 2000)
        })
        .catch((error) => {
          let message = 'มีบางอย่างผิดพลาด'
          if (
            error.response &&
            error.response.data.message[i18n.locale.toLowerCase()]
          ) {
            message = error.response.data.message[i18n.locale.toLowerCase()]
          }
          const modal = {
            title: 'เปลี่ยนรหัสผ่านไม่สำเร็จ',
            content: message,
          }

          context.root.$error(modal)
          // context.root.$error({
          //   title: 'ลงทะเบียนไม่สำเร็จ',
          //   content: `${
          //     e.response ? e.response.data.message : 'มีบางอย่างผิดพลาด'
          //   }`,
          // })
        })
        .then(() => {
          isLoading.value = false
        })
    }

    return {
      onSubmit,
      isLoading,
      form,
    }
  },
})
</script>
