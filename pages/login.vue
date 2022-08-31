<template>
  <div class="w-full max-w-lg">
    <div class="mb-12 text-center">
      <!-- <h1 class="mb-12 text-4xl">
        <strong>Welcome to {{ $config.APP_NAME }}</strong>
      </h1> -->
      <!-- <p>
        {{ $t('login.titleLine1') }}
        <br />{{ $t('login.titleLine2') }}
      </p> -->
    </div>
    <ShipPreregisPrivacyNoticeForVisitor style="display: none" />
    <ShipPreregisPrivacyNoticeForEmployee style="display: none" />
    <a-card class="mb-8 login-card">
      <a-row type="flex" justify="center">
        <div style="width: 300px">
          <img
            slot="cover"
            class="mb-12 text-center"
            alt="example"
            src="@/static/logo_PTT_3.png"
          />
        </div>
      </a-row>
      <div class="mb-4 text-white font-size-24">
        <strong>{{ $t('login.signInTitle') }}</strong>
      </div>
      <a-alert v-if="errorMessage" type="error" class="mb-4" banner>
        <span slot="message" class="text-via-red">{{ errorMessage }}</span>
      </a-alert>
      <ValidationObserver v-slot="{ handleSubmit }" slim>
        <a-form class="mb-6" @submit.prevent="handleSubmit(onSubmit)">
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            name="account"
          >
            <a-form-item
              :validate-status="errors[0] ? 'error' : null"
              :help="errors[0]"
              name="account"
            >
              <a-input
                v-model="form.account"
                size="large"
                :placeholder="$t('login.account')"
              />
            </a-form-item>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            name="password"
          >
            <a-form-item
              :validate-status="errors[0] ? 'error' : null"
              :help="errors[0]"
              name="password"
            >
              <a-input
                v-model="form.password"
                size="large"
                :placeholder="$t('login.password')"
                type="password"
              />
            </a-form-item>
          </ValidationProvider>
          <div class="flex justify-between pb-5">
            <div>
              <a-checkbox
                v-decorator="['rememberMe', { valuePropName: 'checked' }]"
                :checked="isRemember"
                class="text-white"
                @change="onChange"
                >{{ $t('login.remember') }}</a-checkbox
              >
            </div>
            <div>
              <!-- <router-link to="/services" class="kit__utils__link font-size-16">
                {{ $t('login.guest') }}
              </router-link> -->
              <router-link
                to="/ship/pre-register/create?nonAccount=true"
                class="kit__utils__link font-size-16"
              >
                ลงทะเบียนแบบบุคคลภายนอก
              </router-link>
            </div>
          </div>
          <a-button
            type="primary"
            html-type="submit"
            size="large"
            class="text-center w-100"
            block
          >
            {{ $t('login.signInBtn') }}
          </a-button>
        </a-form>
      </ValidationObserver>
      <div class="flex justify-between">
        <div>
          <!-- {{ $t('login.signInOther') }}<span> </span>
            <a-button shape="circle" icon="key" />
            <a-button shape="circle" icon="team" />
            <a-button shape="circle" icon="qrcode" />
            <a-button shape="circle" icon="facebook" />
            <a-button shape="circle" icon="google" /> -->
        </div>
        <!-- <div>
          <a @click="showModal">{{ $t('login.forgotPassword') }}</a>
        </div> -->
      </div>
    </a-card>

    <!-- <div class="pt-2 mb-auto text-center">
      <span class="mr-2">{{ $t('login.dontHaveAccount') }}</span>
      <router-link to="/register" class="kit__utils__link font-size-16">
        {{ $t('login.register') }}
      </router-link>
      <br /><br />
      <a-tag color="#108ee9">
        {{ 'Api ' + apiVersion }}
      </a-tag>
      <br /><br />
      <a-tag color="#108ee9">
        {{ 'Web ' + WebVersion }}
      </a-tag>
    </div> -->
    <validation-observer ref="inputForm" v-slot="{ handleSubmit }" slim>
      <a-modal
        v-model="modelVisible"
        :title="$t('login.forgotPassword')"
        :ok-text="$t('forgotPassword.btnReset')"
        :cancel-text="$t('forgotPassword.btnCancel')"
        :confirm-loading="isSubmitting"
        @ok="handleSubmit(handleOk)"
      >
        <p>{{ $t('forgotPassword.inputEmail') }}</p>

        <validation-provider
          v-slot="{ errors }"
          :name="$t('preRegister.email')"
          rules="required|email"
        >
          <a-form-item
            :validate-status="errors[0] ? 'error' : null"
            :help="errors[0]"
            :label="$t('preRegister.email')"
            required
            class="mb-3"
          >
            <a-input
              v-model="form.email"
              size="large"
              :placeholder="$t('forgotPassword.email')"
            />
          </a-form-item>
        </validation-provider>
      </a-modal>
    </validation-observer>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  computed,
  useContext,
  onMounted,
  useStore,
} from '@nuxtjs/composition-api'
import { find } from 'lodash'
import Utf8 from 'crypto-js/enc-utf8'
import Base64 from 'crypto-js/enc-base64'

const ACCEPT_REMEMBER = false
const ACCEPT_ACCOUNT = 'guest'

export default defineComponent({
  layout: 'auth',

  setup(_props, context) {
    const i18n = context.root.$i18n
    const { $message, env } = useContext()
    const locales = ref(i18n.locales)
    const currentLocale = computed(() => {
      return find(locales.value, (l: any) => l.code === i18n.locale)
    })

    const Store = useStore()

    // Reactive
    const form = reactive({
      account: null,
      password: null,
      email: null,
    })
    const {
      app: { $storage },
    } = useContext()
    const isRemember = ref(false)
    // Ref
    const isSubmitting = ref(false)
    const errorMessage = ref(null)
    const modelVisible = ref(false)
    const apiVersion = ref('')
    const WebVersion = ref('')
    function showModal() {
      modelVisible.value = true
    }

    function handleOk() {
      if (form.email !== null) {
        isSubmitting.value = true
        return context.root.$axios
          .get(`Account/Reset/${form.email}`)
          .then(() => {
            isSubmitting.value = false
            context.root.$success({
              title: 'รีเซ็ตรหัสผ่านสำเร็จ',
              content: 'กรุณาตรวจสอบอีเมลของคุณเพื่อตั้งรหัสผ่านใหม่',
            })
          })
          .catch((e) => {
            isSubmitting.value = false
            // console.log('error', e.response) // eslint-disable-line no-console
            const modal = {
              title: 'มีข้อผิดพลาด',
              content: '',
            }

            if (e.response.status === 400 || e.response.status === 404) {
              modal.title = e.response.data.message.th
              modal.content = e.response.data.message.en
            } else {
              modal.title = 'ไม่สำเร็จ'
              modal.content = e.response.data.message.en
            }

            context.root.$error(modal)
          })
      } else {
        const modal = {
          title: 'มีข้อผิดพลาด',
          content: 'กรุณากรอกอีเมลที่ใช้ในการลงทะเบียน',
        }
        context.root.$error(modal)
      }
      isSubmitting.value = false
      form.email = null
    }

    function onChange(e: any) {
      // console.log(`checked = ${e.target.checked}`)
      isRemember.value = e.target.checked
    }

    // Method
    function onSubmit() {
      isSubmitting.value = true
      Store.commit('global/SET_OPEN_LOADER')
      context.root.$auth
        .loginWith('local', {
          data: {
            account: Base64.stringify(Utf8.parse(form.account || '')),
            pwd: Base64.stringify(Utf8.parse(form.password || '')),
            refreshToken: '',
          },
        })
        .then(() => {
          $storage.setUniversal(ACCEPT_REMEMBER, isRemember.value)
          if (isRemember.value) {
            // console.log(
            //   'account :' + form.account + ' ,temp : ' + ACCEPT_ACCOUNT
            // )
            $storage.setUniversal(ACCEPT_ACCOUNT, form.account)
          }
          $message.info('Success')
        })
        .catch((error) => {
          // console.log('log xxx: ' + error)
          let message = 'มีบางอย่างผิดพลาด'
          if (
            error.response &&
            error.response.data.message[i18n.locale.toLowerCase()]
          ) {
            message = error.response.data.message[i18n.locale.toLowerCase()]
          }
          Store.commit('global/SET_CLOSE_LOADER')

          $message.error(message)
        })
        .finally(() => {
          isSubmitting.value = false
          Store.commit('global/SET_CLOSE_LOADER')
        })
    }

    function getVersion() {
      context.root.$axios.get('Auth/Version').then(({ data }) => {
        apiVersion.value = data
      })
    }

    onMounted(() => {
      getVersion()
      WebVersion.value = env.WEB_VER
      isRemember.value = $storage.getUniversal(ACCEPT_REMEMBER)
      // console.log('account', context.root.$route.query.user)
      if (context.root.$route.query.user === undefined) {
        if (isRemember.value) {
          form.account = $storage.getUniversal(ACCEPT_ACCOUNT)
          // console.log('show account remember : ', form.account)
        }
      } else {
        form.account = context.root.$route.query.user
      }
      form.email = null
    })

    return {
      getVersion,
      apiVersion,
      form,
      isSubmitting,
      errorMessage,
      onSubmit,
      currentLocale,
      modelVisible,
      showModal,
      handleOk,
      isRemember,
      onChange,
      WebVersion,
    }
  },
})
</script>
<style lang="less" scoped>
.login-card {
  border-radius: 10px !important;
  border: none !important;
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.141);
}
</style>
