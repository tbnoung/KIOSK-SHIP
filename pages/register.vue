<template>
  <div class="w-full max-w-3xl">
    <!-- <h3><span>{{ $t('user.register.register') }}</span></h3> -->
    <div slot="cover" class="flex justify-center">
      <img
        slot="cover"
        class="mb-10 mt-0 text-center max-w-screen-sm"
        alt="example"
        src="kronos-blue.png"
      />
    </div>
    <validation-observer ref="inputForm" v-slot="{ handleSubmit }" slim>
      <a-form
        class="mt-2"
        :form="form"
        :label-col="{ xs: { span: 24 }, lg: { span: 24 } }"
        :wrapper-col="{ xs: { span: 24 }, lg: { span: 24 } }"
        @submit.prevent="handleSubmit(showCondition)"
      >
        <a-card :bordered="false">
          <template #title>
            <span class="text-xl">{{ $t('register.register') }}</span>
          </template>
          <a-card :title="$t('register.profile')">
            <validation-provider
              v-slot="{ errors }"
              :name="$t('register.firstname')"
              rules="required"
            >
              <a-form-item
                :validate-status="errors[0] ? 'error' : null"
                :help="errors[0]"
                class="mb-3"
              >
                <a-input
                  v-model="form.firstname"
                  size="large"
                  type="text"
                  :placeholder="$t('register.firstname')"
                  allow-clear
                ></a-input>
              </a-form-item>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              :name="$t('register.lastname')"
              rules="required"
            >
              <a-form-item
                :validate-status="errors[0] ? 'error' : null"
                :help="errors[0]"
                class="mb-3"
              >
                <a-input
                  v-model="form.lastname"
                  size="large"
                  type="text"
                  :placeholder="$t('register.lastname')"
                  allow-clear
                ></a-input>
              </a-form-item>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              :name="$t('register.mobileNo')"
              rules="required|numeric|length:10"
            >
              <a-form-item
                :validate-status="errors[0] ? 'error' : null"
                :help="errors[0]"
                class="mb-3"
              >
                <a-input
                  v-model="form.mobile"
                  size="large"
                  type="text"
                  :placeholder="$t('register.mobileNo')"
                  allow-clear
                />
              </a-form-item>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              :name="$t('register.email')"
              rules="required|email"
            >
              <a-form-item
                :validate-status="errors[0] ? 'error' : null"
                :help="errors[0]"
                class="mb-3"
              >
                <a-input
                  v-model="form.email"
                  size="large"
                  type="text"
                  :placeholder="$t('register.email')"
                  allow-clear
                  @change="fillEmailAccount()"
                />
              </a-form-item>
            </validation-provider>
          </a-card>
          <a-card class="mt-5" :title="$t('register.identifier')">
            <validation-provider
              v-slot="{ errors, validated }"
              :name="$t('register.citizen')"
              :rules="{ required: isRequired, citizenId: true }"
            >
              <a-form-item
                :validate-status="
                  errors[0] ? 'error' : validated ? 'success' : null
                "
                :help="errors[0]"
                has-feedback
                class="mb-3"
              >
                <!-- {{ isRequired }} -->
                <a-input
                  v-model="form.citizenId"
                  size="large"
                  type="text"
                  :placeholder="$t('register.citizen')"
                  allow-clear
                ></a-input>
              </a-form-item>
            </validation-provider>

            <validation-provider
              v-slot="{ errors, validated }"
              :name="$t('register.passport')"
              :rules="{ required: isRequired, passport: true }"
            >
              <a-form-item
                :validate-status="
                  errors[0] ? 'error' : validated ? 'success' : null
                "
                :help="errors[0]"
                has-feedback
                class="mb-3"
              >
                <!-- {{ isRequired }} -->
                <a-input
                  v-model="form.passportNo"
                  size="large"
                  type="text"
                  :placeholder="$t('register.passport')"
                  allow-clear
                ></a-input>
              </a-form-item>
            </validation-provider>
            <!-- <validation-provider
              v-slot="{ errors, validated }"
              :name="$t('register.drivingNo')"
              :rules="{ required: isRequired, drivingNo: true }"
            >
              <a-form-item
                :validate-status="
                  errors[0] ? 'error' : validated ? 'success' : null
                "
                :help="errors[0]"
                has-feedback
                class="mb-3"
              >
                <a-input
                  v-model="form.drivingNo"
                  size="large"
                  type="text"
                  :placeholder="$t('register.drivingNo')"
                  allow-clear
                ></a-input>
              </a-form-item>
            </validation-provider> -->
            <validation-provider
              v-slot="{ errors, validated }"
              :name="$t('register.personalNo')"
              :rules="{ required: isRequired, personal: true }"
            >
              <a-form-item
                :validate-status="
                  errors[0] ? 'error' : validated ? 'success' : null
                "
                :help="errors[0]"
                has-feedback
                class="mb-3"
              >
                <!-- {{ isRequired }} -->
                <a-input
                  v-model="form.personalNo"
                  size="large"
                  type="text"
                  :placeholder="$t('register.personalNo')"
                  allow-clear
                ></a-input>
              </a-form-item>
            </validation-provider>
          </a-card>
          <a-card class="mt-5" :title="$t('register.account')">
            <a-form-item hidden>
              <a-switch default-checked size="small" @change="onChangeSwitch">
                <a-icon slot="checkedChildren" type="check" />
                <a-icon slot="unCheckedChildren" type="close" />
              </a-switch>
              <span class="ml-3 text-sm">{{
                $t('register.useSameEmail')
              }}</span>
            </a-form-item>
            <validation-provider
              v-slot="{ errors }"
              :name="$t('register.username')"
              rules="required|email"
            >
              <a-form-item
                :validate-status="errors[0] ? 'error' : null"
                :help="errors[0]"
                required
                class="mb-3"
              >
                <a-input
                  v-model="form.account"
                  size="large"
                  type="text"
                  :placeholder="$t('register.username')"
                  allow-clear
                  disabled
                >
                  <a-icon slot="prefix" type="user" />
                  <a-tooltip slot="suffix" :title="$t('register.username')">
                    <a-icon
                      type="info-circle"
                      style="color: rgba(0, 0, 0, 0.45)"
                    />
                  </a-tooltip>
                </a-input>
              </a-form-item>
            </validation-provider>
            <!-- <ValidationProvider
              v-slot="{ errors }"
              name="รหัสผ่าน"
              rules="confirmed:xxxx"
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
                  :placeholder="$t('register.password')"
                  allow-clear
                />
              </a-form-item>
            </ValidationProvider> -->
            <ValidationProvider
              v-slot="{ errors }"
              name="รหัสผ่าน"
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
                  :placeholder="$t('register.password')"
                  allow-clear
                />
              </a-form-item>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors }"
              name="ยืนยันรหัสผ่าน"
              :rules="{
                required: true,
                confirmed: 'รหัสผ่าน',
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
                  :placeholder="$t('register.passwordConfirm')"
                  allow-clear
                />
              </a-form-item>
            </ValidationProvider>
          </a-card>
        </a-card>
        <div class="pt-4">
          <a-form-item>
            <a-button
              :loading="isLoading"
              type="primary"
              html-type="submit"
              block
              shape="round"
            >
              {{ $t('register.save') }}
            </a-button>
            <router-link class="pl-4 login" :to="{ name: 'login' }">{{
              $t('register.haveAccount')
            }}</router-link>
          </a-form-item>
          <!-- <a-button type="primary" @click="showCondition"> PDPA </a-button> -->
          <PDPA :visible="showPDPA" @cancel="closePDPA" />
        </div>
      </a-form>
    </validation-observer>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  useContext,
  computed,
  useRouter,
} from '@nuxtjs/composition-api'
import { find } from 'lodash'
import Utf8 from 'crypto-js/enc-utf8'
import Base64 from 'crypto-js/enc-base64'
import PDPA from '@/components/pdpa.vue'

interface MyForm {
  firstname: string | null
  lastname: string | null
  email: string | null
  mobile: string | null
  passportNo: string | null
  citizenId: string | null
  drivingNo: string | null
  personalNo: string | null
  account: string | null
  pwd: string | null
  confirmPwd: string | null
}

const ACCEPT_PRIVANCY = 'accept_privacy_account'
const ACCEPT_FNAME = 'firstname'
const ACCEPT_LNAME = 'lastname'
const ACCEPT_EMAIL = 'email'
const ACCEPT_MOBILE = 'mobile'

export default defineComponent({
  components: {
    PDPA,
  },
  layout: 'auth',
  auth: false,

  setup(_props, context) {
    const {
      app: { $storage },
    } = useContext()
    const router = useRouter()
    const isAccptPrivancy = ref(false)
    const isLoading = ref(false)
    const isFill = ref(true)
    const errorMessage = ref()
    const labelCol = ref({ span: 4 })
    const wrapperCol = ref({ span: 14 })
    const i18n = context.root.$i18n
    const locales = ref(i18n.locales)
    const currentLocale = computed(() => {
      return find(locales.value, (l: any) => l.code === i18n.locale)
    })
    const showPDPA = ref(false)
    const inputForm = ref<any>(null)
    const form = reactive<MyForm>({
      firstname: null,
      lastname: null,
      email: null,
      mobile: null,
      passportNo: null,
      citizenId: null,
      drivingNo: null,
      personalNo: null,
      account: null,
      pwd: null,
      confirmPwd: null,
    })

    function onSubmit() {
      isLoading.value = true

      isAccptPrivancy.value = $storage.setUniversal(
        ACCEPT_FNAME,
        form.firstname
      )
      isAccptPrivancy.value = $storage.setUniversal(ACCEPT_LNAME, form.lastname)
      isAccptPrivancy.value = $storage.setUniversal(ACCEPT_EMAIL, form.email)
      isAccptPrivancy.value = $storage.setUniversal(ACCEPT_MOBILE, form.mobile)

      return context.root.$axios
        .post('Account/Register', {
          firstname: form.firstname,
          lastname: form.lastname,
          email: form.email,
          mobile: form.mobile,
          citizenId: form.citizenId ? String(form.citizenId) : null,
          passportNo: form.passportNo ? String(form.passportNo) : null,
          drivingNo: form.drivingNo ? String(form.drivingNo) : null,
          personalNo: form.personalNo ? String(form.personalNo) : null,
          account: Base64.stringify(Utf8.parse(form.account || '')),
          pwd: Base64.stringify(Utf8.parse(form.pwd || '')),
        })
        .then(() => {
          // visableModal.value = true
          // detail.value = data
          isLoading.value = false
          context.root.$success({
            title: 'ลงทะเบียนสำเร็จ',
            content: 'กรุณายืนยันการเปิดใช้งานบัญชีผ่านทางอีเมลของคุณ',
          })
          setTimeout(() => {
            router.push('/login')
          }, 2000)
        })
        .catch((error) => {
          isLoading.value = false
          let message = 'มีบางอย่างผิดพลาด'
          if (
            error.response &&
            error.response.data.message[i18n.locale.toLowerCase()]
          ) {
            message = error.response.data.message[i18n.locale.toLowerCase()]
          }
          const modal = {
            title: 'ลงทะเบียนไม่สำเร็จ',
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

    function confirmPassword() {
      let ok = false
      if (form.pwd !== 'undefined' && form.confirmPwd !== 'undefined') {
        if (form.pwd === form.confirmPwd) {
          ok = true
        }
      } else {
        ok = false
      }
      return ok
    }

    function onChangeSwitch(checked: any) {
      isFill.value = checked
      if (!isFill.value && form.account === form.email) {
        form.account = null
      } else {
        form.account = form.email
      }
    }

    function fillEmailAccount() {
      if (isFill.value) {
        form.account = form.email
      }
    }

    const isRequired = computed(() => {
      // console.log(this.errors.items.length === 0)
      if (form.citizenId) {
        return false
      }
      if (form.passportNo) {
        return false
      }
      if (form.personalNo) {
        return false
      }
      return true
      // return !(form.personalNo || form.citizenId || form.passportNo)
    })

    onMounted(() => {
      $storage.syncUniversal(ACCEPT_PRIVANCY, false)
      isAccptPrivancy.value = $storage.getUniversal(ACCEPT_PRIVANCY)
      const fname = $storage.getUniversal(ACCEPT_FNAME)
      const lname = $storage.getUniversal(ACCEPT_LNAME)
      if (fname != null && lname != null) {
        form.firstname = $storage.getUniversal(ACCEPT_FNAME)
        form.lastname = $storage.getUniversal(ACCEPT_LNAME)
        form.email = $storage.getUniversal(ACCEPT_EMAIL)
        form.mobile = $storage.getUniversal(ACCEPT_MOBILE)
        fillEmailAccount()
      }
    })

    function showCondition() {
      showPDPA.value = true
    }

    function closePDPA(isAccept: boolean) {
      // console.log('accept:', isAccept)
      showPDPA.value = false
      if (isAccept) {
        onSubmit()
      }
    }

    return {
      showCondition,
      closePDPA,
      isFill,
      onChangeSwitch,
      isRequired,
      inputForm,
      labelCol,
      wrapperCol,
      form,
      errorMessage,
      isAccptPrivancy,
      locales,
      currentLocale,
      isLoading,
      onSubmit,
      confirmPassword,
      fillEmailAccount,
      showPDPA,
    }
  },
})
</script>
