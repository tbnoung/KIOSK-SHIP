<template>
  <a-card :bordered="false">
    <div class="min-h-screen p-5">
      <a-row type="flex" justify="center">
        <a-col :span="24" :lg="12" :xl="18">
          <a-spin :spinning="isLoading">
            <div>
              <div slot="cover" class="flex justify-center">
                <img
                  slot="cover"
                  class="mb-12 text-center"
                  alt="example"
                  src="kronos-blue.png"
                />
              </div>
              <a-card-meta style="text-align: center">
                <div
                  slot="title"
                  class="mt-3 mb-3 font-medium md:text-lg lg:text-3xl"
                >
                  {{ $t('preRegister.title') }}
                </div>
                <template slot="vms.pttdigital.com/enco"> ENCO </template>
              </a-card-meta>
              <validation-observer
                ref="inputForm"
                v-slot="{ handleSubmit }"
                slim
              >
                <a-form
                  class="mt-5"
                  :form="form"
                  :label-col="{ xs: { span: 24 }, lg: { span: 8 } }"
                  :wrapper-col="{ xs: { span: 24 }, lg: { span: 12 } }"
                  @submit.prevent="handleSubmit(onSubmit)"
                >
                  <div style="background-color: #ececec; padding: 5px">
                    <a-card>
                      <div
                        slot="title"
                        class="text-2xl font-medium text-center"
                      >
                        {{ $t('preRegister.profileInformation') }}
                      </div>
                      <validation-provider
                        v-slot="{ errors }"
                        :name="$t('preRegister.name')"
                        rules="required"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('preRegister.name')"
                          required
                          class="mb-3"
                        >
                          <a-input
                            v-model="form.firstname"
                            :placeholder="$t('preRegister.require_name')"
                          />
                        </a-form-item>
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        :name="$t('preRegister.surname')"
                        rules="required"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('preRegister.surname')"
                          required
                          class="mb-3"
                        >
                          <a-input
                            v-model="form.lastname"
                            :placeholder="$t('preRegister.require_surname')"
                          />
                        </a-form-item>
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        :name="$t('preRegister.identifier')"
                        rules="required|citizenOrPassport"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('preRegister.identifier')"
                          required
                          class="mb-3"
                        >
                          <label slot="label">
                            {{ $t('preRegister.identifier') }}
                          </label>
                          <a-input
                            v-model="form.verifyIdentity"
                            :placeholder="$t('preRegister.require_identifier')"
                            name="verifyIdentity"
                          />
                        </a-form-item>
                        <a-alert
                          v-if="errorMessage"
                          type="error"
                          class="mb-4"
                          banner
                        >
                          <span slot="message" class="text-via-red">{{
                            errorMessage
                          }}</span>
                        </a-alert>
                      </validation-provider>
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
                            :placeholder="$t('preRegister.require_email')"
                          />
                        </a-form-item>
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        :name="$t('preRegister.mobile')"
                        rules="required|numeric|length:10"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('preRegister.mobile')"
                          required
                          class="mb-3"
                        >
                          <a-input
                            v-model="form.mobile"
                            :placeholder="$t('preRegister.require_mobile')"
                          />
                        </a-form-item>
                      </validation-provider>
                    </a-card>
                  </div>
                  <div style="background-color: #ececec; padding: 5px">
                    <a-card>
                      <div
                        slot="title"
                        class="text-2xl font-medium text-center"
                      >
                        {{ $t('preRegister.contactInformation') }}
                      </div>
                      <validation-provider
                        v-slot="{ errors }"
                        :name="$t('preRegister.pattern')"
                        rules="required"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('preRegister.pattern')"
                          required
                          class="mb-3"
                        >
                          <a-radio-group v-model="value" @change="onChange">
                            <a-radio :style="radioStyle" :value="1">
                              {{ $t('preRegister.contact') }}
                            </a-radio>
                            <a-radio :style="radioStyle" :value="2">
                              {{ $t('preRegister.company') }}
                            </a-radio>
                          </a-radio-group>
                          <div v-if="value === 1">
                            <validation-provider
                              v-slot="{ errors }"
                              :name="$t('preRegister.contact')"
                              :rules="{ required: !form.company }"
                            >
                              <a-form-item
                                :validate-status="errors[0] ? 'error' : null"
                                :help="errors[0]"
                                required
                                class="mb-3"
                              >
                                <a-auto-complete
                                  v-model="form.host"
                                  :data-source="hostFounds"
                                  class="w-full"
                                  :placeholder="
                                    $t('preRegister.require_contact')
                                  "
                                  @search="handleSearchHost"
                                />
                              </a-form-item>
                            </validation-provider>
                          </div>
                          <div v-else>
                            <validation-provider
                              v-slot="{ errors }"
                              :name="$t('preRegister.company')"
                              :rules="{ required: !form.host }"
                            >
                              <a-form-item
                                :validate-status="errors[0] ? 'error' : null"
                                :help="errors[0]"
                                required
                                class="mb-3"
                              >
                                <a-select
                                  v-model="form.company"
                                  :placeholder="
                                    $t('preRegister.require_company')
                                  "
                                  label="company_name"
                                  class="w-full"
                                  show-search
                                  :filter-option="filterOption"
                                >
                                  <a-icon slot="suffixIcon" type="bank" />
                                  <a-select-option
                                    v-for="com in options.company"
                                    :key="com.id"
                                    :value="com.id"
                                  >
                                    {{ com.nameTh }}
                                  </a-select-option>
                                </a-select>
                              </a-form-item>
                            </validation-provider>
                          </div>
                        </a-form-item>
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        :name="$t('preRegister.date')"
                        rules="required"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('preRegister.date')"
                          required
                          class="mb-3"
                        >
                          <a-row :gutter="8">
                            <a-col :span="24" :sm="12">
                              <a-date-picker
                                v-model="form.dateFrom"
                                :disabled-date="disabledStartDate"
                                format="YYYY-MM-DD"
                                :placeholder="$t('preRegister.from')"
                                class="w-full"
                                @openChange="handleStartOpenChange"
                              />
                            </a-col>
                            <a-col :span="24" :sm="12">
                              <a-date-picker
                                v-model="form.dateTo"
                                :disabled-date="disabledEndDate"
                                format="YYYY-MM-DD"
                                :placeholder="$t('preRegister.to')"
                                class="w-full"
                                :open="endOpen"
                                @openChange="handleEndOpenChange"
                              />
                            </a-col>
                          </a-row>
                        </a-form-item>
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        :name="$t('preRegister.date')"
                        rules="required"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('preRegister.time')"
                          required
                          class="mb-3"
                        >
                          <a-row :gutter="8">
                            <a-col :span="24" :sm="12">
                              <a-time-picker
                                v-model="form.timeFrom"
                                :default-value="moment('08:00', 'HH:mm')"
                                format="HH:mm"
                                class="w-full"
                                @change="onChangeTimeFromTo"
                              />
                            </a-col>
                            <a-col :span="24" :sm="12">
                              <a-time-picker
                                v-model="form.timeTo"
                                :default-value="moment('17:00', 'HH:mm')"
                                format="HH:mm"
                                class="w-full"
                                :disabled-hours="disabledExpiredAtHours"
                                :disabled-minutes="disabledExpiredAtMinutes"
                              />
                            </a-col>
                          </a-row>
                        </a-form-item>
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        :name="$t('preRegister.objective')"
                        rules="required"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('preRegister.objective')"
                          required
                          class="mb-3"
                        >
                          <a-select
                            v-model="form.objective"
                            :placeholder="$t('preRegister.require_objective')"
                            class="w-full"
                            label="objective"
                            track-by="id"
                            show-search
                            :filter-option="filterOption"
                          >
                            <a-icon slot="suffixIcon" type="info-circle" />
                            <a-select-option
                              v-for="obj in options.objective"
                              :key="obj.id"
                              :value="obj.id"
                            >
                              {{ obj.nameTh }}
                            </a-select-option>
                          </a-select>
                        </a-form-item>
                      </validation-provider>
                      <a-form-item>
                        <span style="margin-right: 24px">
                          <a-badge :count="countFollows"
                            ><a-avatar icon="user"
                          /></a-badge>
                        </span>
                        <label slot="label">
                          {{ $t('preRegister.follow') }}
                        </label>
                        <div>
                          <a-card
                            v-for="(person, index) in form.followers"
                            :key="index"
                            size="small"
                            class="mb-4"
                          >
                            <a
                              slot="extra"
                              @click="handleRemovePersonal(index)"
                            >
                              <font-awesome-icon :icon="['fad', 'trash']" />
                              {{ $t('preRegister.remove') }}
                            </a>
                            <validation-provider
                              v-slot="{ errors }"
                              :name="$t('preRegister.name')"
                              :rules="{
                                required: true,
                              }"
                            >
                              <a-form-item
                                class="mb-3"
                                :validate-status="errors[0] ? 'error' : null"
                                :help="errors[0]"
                                required
                              >
                                <a-input
                                  v-model="form.followers[index].firstname"
                                  name="firstname[]"
                                  :placeholder="$t('preRegister.name')"
                                />
                              </a-form-item>
                            </validation-provider>
                            <validation-provider
                              v-slot="{ errors }"
                              :name="$t('preRegister.surname')"
                              :rules="{
                                required: true,
                              }"
                            >
                              <a-form-item
                                class="mb-3"
                                :validate-status="errors[0] ? 'error' : null"
                                :help="errors[0]"
                                required
                              >
                                <a-input
                                  v-model="form.followers[index].lastname"
                                  name="lastname[]"
                                  :placeholder="$t('preRegister.surname')"
                                />
                              </a-form-item>
                            </validation-provider>
                            <validation-provider
                              v-slot="{ errors }"
                              :name="$t('preRegister.citizenId')"
                              :rules="{
                                required: true,
                                citizenId: true,
                              }"
                            >
                              <a-form-item
                                :validate-status="errors[0] ? 'error' : null"
                                :help="errors[0]"
                                required
                              >
                                <a-input
                                  v-model="form.followers[index].citizenId"
                                  name="citizenId[]"
                                  :placeholder="$t('preRegister.citizenId')"
                                />
                              </a-form-item>
                              <a-alert
                                v-if="errorMessage"
                                type="error"
                                class="mb-4"
                                banner
                              >
                                <span slot="message" class="text-via-red">{{
                                  errorMessage
                                }}</span>
                              </a-alert>
                            </validation-provider>
                          </a-card>
                          <a-button
                            block
                            @click="handleSubmit(handleAddPerson)"
                          >
                            <font-awesome-icon :icon="['fad', 'user-plus']" />
                          </a-button>
                        </div>
                        <a-button
                          :loading="isLoading"
                          type="primary"
                          html-type="submit"
                          block
                          shape="round"
                        >
                          {{ $t('preRegister.register') }}
                        </a-button>
                      </a-form-item>
                    </a-card>
                  </div>
                </a-form>
              </validation-observer>
            </div>
          </a-spin>
        </a-col>
      </a-row>
      <!-- <a-modal
      :visible="!isAccptPrivancy"
      centered
      :closable="false"
      :mask-closable="false"
      :confirm-loading="isConfirmLoading"
      width="700px"
    >
      <template slot="footer">
        <a-button type="primary" @click="confirm"> ยอมรับ </a-button>
      </template>
      <div class="flex">
        <div>
          <a-icon type="info-circle" class="text-lg" />
        </div>
        <div class="flex-1 ml-2">
          <div class="mb-3 text-xl font-bold">
            ข้อตกลงและเงื่อนไขของบริษัท ENCO
          </div>
          <p>
            <span class="ml-10"></span>
            ข้าพเจ้าตกลงยินยอม ให้บริษัท เอนเนอร์ยี่ คอมเพล็กซ์ จำกัด เก็บ
            รวบรวม ใช้ หรือ เปิดเผยข้อมูลส่วนบุคคลของข้าพเจ้า
            ซึ่งมีข้อมูลดังต่อไปนี้
          </p>
          <p>
            <span class="ml-10"></span>1. รายละเอียดข้อมูลต่าง ๆ ที่ได้กรอกในการ
            Register นี้ เช่น ชื่อ นามสกุล เบอร์โทรศัพท์ อีเมล เป็นต้น
          </p>
          <p>
            <span class="ml-10"></span>2. รายละเอียดข้อมูลต่าง ๆ
            ในเอกสารหรือหลักฐานที่ในการรับบัตร Visitor เช่น เลขบัตรประชาชน
            เลขที่ passport รูปภาพ เป็นต้น
          </p>
          <p>
            อ่านรายละเอียดเพิ่มเติม ประกาศ นโยบายการคุ้มครองข้อมูลส่วนบุคคล
            บริษัท เอนเนอร์ยี่ คอมเพล็กซ์ จำกัด
          </p>
          <a
            href="https://www.energycomplex.co.th/th/News/NewsDetail/259"
            target="_blank"
            class="break-all"
            >https://www.energycomplex.co.th/th/News/NewsDetail/259</a
          >
          <p></p>
          <p>ข้าพเจ้าขอรับรองว่า :</p>
          <p class="font-bold text-red-500">
            "ข้อมูลที่ข้าพเจ้าให้เป็นข้อมูลส่วนบุคคลของข้าพเจ้า
            ซึ่งเป็นข้อมูลที่แท้จริง ถูกต้อง และเป็นปัจจุบัน”
          </p>
        </div>
      </div>
    </a-modal> -->
      <PDPA :visible="showPDPA" @cancel="closePDPA" />
    </div>
  </a-card>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  useContext,
  computed,
  watch,
  useRouter,
} from '@nuxtjs/composition-api'
import { map, find } from 'lodash'
import moment from 'moment'
import PDPA from '@/components/pdpa.vue'

interface Person {
  firstname: string | null
  lastname: string | null
  citizenId: string | null
  id: number | null
  preRegisterId: number | null
}

interface MyForm {
  accountId: number | null
  typeId: number | null
  currentStep: number | null
  visitorId: number | null
  firstname: string | null
  lastname: string | null
  verifyIdentity: string | null
  email: string | null
  mobile: string | null
  firstPerson: boolean | true
  followPerson: number | null
  accessCardId: number | null
  hostId: number | null
  hostDetail: string | null
  objectivityId: number | null
  objectivityDetail: string | null
  companyId: number | null
  companyDetail: string | null
  remark: string | null
  floorId: number | null
  dateTo: any | null
  dateFrom: any | null
  timeTo: any | null
  timeFrom: any | null
  company?: any | null
  objective?: any | null
  host?: any | null
  followers: Person[]
}
const ACCEPT_PRIVANCY = 'accept_privacy_preregister'
const ACCEPT_FNAME = 'firstname'
const ACCEPT_LNAME = 'lastname'
const ACCEPT_IDENTIFIED = 'identified'
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
      $auth: { user },
    } = useContext()
    const router = useRouter()
    const i18n = context.root.$i18n
    const errorMessage = ref()
    const labelCol = ref({ span: 4 })
    const wrapperCol = ref({ span: 14 })
    const options = reactive({
      company: [],
      objective: [],
      host: [],
    })
    const inputForm = ref<any>(null)
    const form = reactive<MyForm>({
      accountId: null,
      typeId: null,
      currentStep: null,
      visitorId: null,
      firstname: null,
      lastname: null,
      verifyIdentity: null,
      email: null,
      mobile: null,
      firstPerson: true,
      followPerson: 0,
      accessCardId: null,
      hostId: null,
      hostDetail: null,
      objectivityId: null,
      objectivityDetail: null,
      companyId: null,
      companyDetail: null,
      remark: null,
      floorId: null,
      dateTo: null,
      dateFrom: null,
      timeTo: null,
      timeFrom: null,
      company: undefined,
      objective: undefined,
      host: undefined,
      followers: [],
    })
    const hostFounds = ref<any>([])
    const endOpen = ref(false)
    const countFollows = ref(0)
    const isLoading = ref(false)
    const visableModal = ref(false)
    const detail = ref({})
    const isConfirmLoading = ref(false)
    const isAccptPrivancy = ref(false)
    const locales = ref(i18n.locales)
    const currentLocale = computed(() => {
      return find(locales.value, (l: any) => l.code === i18n.locale)
    })

    function disabledStartDate(v: any) {
      if (v.startOf('day').isBefore(moment().startOf('day'))) {
        return true
      }

      if (!v || !form.dateTo) {
        return false
      }

      return v.startOf('day').isAfter(form.dateTo.startOf('day'))
    }

    function disabledEndDate(v: any) {
      if (!v || !form.dateFrom) {
        return false
      }
      return form.dateFrom.valueOf() >= v.valueOf()
    }

    function handleStartOpenChange(open: any) {
      if (!open) {
        endOpen.value = true
      }
    }

    function handleEndOpenChange(open: any) {
      endOpen.value = open
    }

    function onChangeTimeFromTo() {
      if (form.timeFrom && moment(form.timeFrom).isAfter(form.timeTo)) {
        form.timeTo = undefined
      }
    }

    function disabledExpiredAtHours() {
      if (form.timeFrom && form.timeFrom.isSame(form.timeTo, 'date')) {
        const disabled: number[] = []

        for (let i = 0; i < form.timeFrom.hour(); i++) {
          disabled.push(i)
        }

        return disabled
      }
    }
    function disabledExpiredAtMinutes() {
      if (form.timeFrom && form.timeFrom.isSameOrAfter(form.timeTo, 'hour')) {
        const disabled: number[] = []

        for (let i = 0; i < form.timeFrom.minute(); i++) {
          disabled.push(i)
        }

        return disabled
      }
    }

    function countFollowsPerson() {
      const { followers } = form
      countFollows.value = followers === null ? 0 : followers.length
    }

    const dataSource = ['Burns Bay Road', 'Downing Street', 'Wall Street']

    function handleAddPerson() {
      form.followers.push({
        firstname: null,
        lastname: null,
        citizenId: null,
        id: null,
        preRegisterId: null,
      })
      countFollowsPerson()
    }

    function handleRemovePersonal(index: number) {
      form.followers.splice(index, 1)
      countFollowsPerson()
    }

    function handleSearchHost(keyword: string) {
      getHost(keyword)
    }

    function getCompany() {
      context.root.$axios.get('Company/Dropdown').then(({ data }) => {
        options.company = data
      })
    }

    function getObjective() {
      context.root.$axios.get('Objectivity/Dropdown').then(({ data }) => {
        options.objective = data
      })
    }

    function getHost(keyword: string) {
      if (keyword.length === 10 || keyword.length === 9) {
        context.root.$axios.get(`Host/Find/${keyword}`).then(({ data }) => {
          hostFounds.value = data
            ? map(data, (o) => {
                form.hostId = o.id
                form.hostDetail = o.firstname.th + ' ' + o.lastname.th
                return o.firstname.th + ' ' + o.lastname.th
              })
            : []
        })
      }
    }

    function onSubmit() {
      isLoading.value = true
      const company: any = find(options.company, ['id', form.company])
      const objective: any = find(options.objective, ['id', form.objective])

      isAccptPrivancy.value = $storage.setUniversal(
        ACCEPT_FNAME,
        form.firstname
      )
      isAccptPrivancy.value = $storage.setUniversal(ACCEPT_LNAME, form.lastname)
      isAccptPrivancy.value = $storage.setUniversal(
        ACCEPT_IDENTIFIED,
        String(form.verifyIdentity)
      )
      isAccptPrivancy.value = $storage.setUniversal(ACCEPT_EMAIL, form.email)
      isAccptPrivancy.value = $storage.setUniversal(ACCEPT_MOBILE, form.mobile)

      return context.root.$axios
        .post('PreRegister/Register', {
          accountId: form.accountId,
          typeId: form.typeId,
          currentStep: form.currentStep,
          visitorId: form.visitorId,
          firstname: form.firstname,
          lastname: form.lastname,
          verifyIdentity: String(form.verifyIdentity),
          email: form.email,
          mobile: form.mobile,
          firstPerson: form.firstPerson,
          followPerson: form.followers.length,
          hostId: form.hostId,
          hostDetail: form.hostDetail,
          objectivityId: objective ? objective.id : null,
          objectivityDetail: objective ? objective.nameTh : null,
          companyId: company ? company.id : null,
          companyDetail: company ? company.nameTh : null,
          remark: form.remark,
          floorId: form.floorId,
          dateFrom: form.dateFrom.format('YYYY-MM-DD'),
          dateTo: form.dateTo.format('YYYY-MM-DD'),
          timeFrom: moment(form.timeFrom).format('HH:mm'),
          timeTo: moment(form.timeTo).format('HH:mm'),
          persons: form.followers,
        })
        .then(() => {
          // visableModal.value = true
          // detail.value = data
          context.root.$success({
            title: 'ลงทะเบียนสำเร็จ',
            content: 'กรุณาตรวจสอบผลการอนุมัติทางอีเมลของคุณภายใน 1 วันทำการ',
          })

          form.typeId = null
          form.currentStep = null
          form.visitorId = null
          form.firstname = null
          form.lastname = null
          form.verifyIdentity = null
          form.email = null
          form.mobile = null
          form.firstPerson = true
          form.followPerson = 0
          form.accessCardId = null
          form.hostId = null
          form.hostDetail = null
          form.objectivityId = null
          form.objectivityDetail = null
          form.companyId = null
          form.companyDetail = null
          form.remark = null
          form.floorId = null
          form.dateTo = null
          form.dateFrom = null
          form.timeTo = null
          form.timeFrom = null
          form.company = null
          form.objective = null
          form.host = null
          form.followers = []
          countFollows.value = 0

          form.timeTo = form.timeTo == null ? moment() : form.timeTo
          form.timeFrom = form.timeFrom == null ? moment() : form.timeFrom
          form.dateTo = form.dateTo == null ? moment() : form.dateTo
          form.dateFrom = form.dateFrom == null ? moment() : form.dateFrom

          context.root.$nextTick(() => {
            inputForm.value.reset()
          })

          form.timeTo = form.timeTo == null ? moment() : form.timeTo
          form.timeFrom = form.timeFrom == null ? moment() : form.timeFrom
          const fname = $storage.getUniversal(ACCEPT_FNAME)
          const lname = $storage.getUniversal(ACCEPT_LNAME)
          if (fname != null && lname != null) {
            form.firstname = $storage.getUniversal(ACCEPT_FNAME)
            form.lastname = $storage.getUniversal(ACCEPT_LNAME)
          }
          form.verifyIdentity = $storage.getUniversal(ACCEPT_IDENTIFIED)
          form.email = $storage.getUniversal(ACCEPT_EMAIL)
          form.mobile = $storage.getUniversal(ACCEPT_MOBILE)
        })
        .catch((e) => {
          console.log(e) // eslint-disable-line no-console
          const modal = {
            title: 'มีข้อผิดพลาด',
            content: '',
          }
          context.root.$error(modal)
        })
        .then(() => {
          isLoading.value = false
        })
    }

    function filterOption(input: any, option: any) {
      const text = option.componentOptions.children[0].text.toLowerCase()
      return text.includes(input.toLowerCase())
    }

    function confirm() {
      isConfirmLoading.value = true
      isAccptPrivancy.value = $storage.setUniversal(ACCEPT_PRIVANCY, true)
      setTimeout(() => (isConfirmLoading.value = false), 1000)
    }

    function onHide() {
      isAccptPrivancy.value = $storage.setUniversal(ACCEPT_PRIVANCY, false)
      window.close()
    }

    function onChange(e: any) {
      // console.log('radio checked', e.target.value)
      if (e != null) {
        return true
      }
      return true
    }

    const showPDPA = ref(false)
    function closePDPA(isAccept: boolean) {
      showPDPA.value = false
      if (isAccept) {
        isAccptPrivancy.value = $storage.setUniversal(ACCEPT_PRIVANCY, true)
      } else {
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      }
    }

    watch(
      () => user,
      (v) => {
        $storage.syncUniversal(ACCEPT_PRIVANCY, false)
        isAccptPrivancy.value = $storage.getUniversal(ACCEPT_PRIVANCY)
        if (v?.id > 0) {
          showPDPA.value = false
          form.accountId = v?.id
          form.firstname = v?.firstnameTh
          form.lastname = v?.lastnameTh
          form.verifyIdentity = v?.citizenId
          form.email = v?.email
          form.mobile = v?.mobile
        } else if (!isAccptPrivancy.value) {
          form.accountId = null
          form.firstname = $storage.getUniversal(ACCEPT_FNAME)
          form.lastname = $storage.getUniversal(ACCEPT_LNAME)
          form.verifyIdentity = $storage.getUniversal(ACCEPT_IDENTIFIED)
          form.email = $storage.getUniversal(ACCEPT_EMAIL)
          form.mobile = $storage.getUniversal(ACCEPT_MOBILE)
          showPDPA.value = true
        }

        // if (v) {
        //   if (v.Id) {
        //     form.firstname = v.FirstnameTh
        //   } else {
        //     const fname = $storage.getUniversal(ACCEPT_FNAME)
        //     const lname = $storage.getUniversal(ACCEPT_LNAME)
        //     if (fname != null && lname != null) {
        //       form.firstname = $storage.getUniversal(ACCEPT_FNAME)
        //       form.lastname = $storage.getUniversal(ACCEPT_LNAME)
        //       form.email = $storage.getUniversal(ACCEPT_EMAIL)
        //       form.mobile = $storage.getUniversal(ACCEPT_MOBILE)
        //       form.company = $storage.getUniversal(ACCEPT_COMPANY)
        //     }
        //   }
        // }

        // if (form.citizenId) {
        //   // validator.validate('citizenId')

        //   // check
        // }
      },
      {
        immediate: true,
      }
    )

    onMounted(() => {
      // $storage.syncUniversal(ACCEPT_PRIVANCY, false)
      // isAccptPrivancy.value = $storage.getUniversal(ACCEPT_PRIVANCY)
      // console.log('isAccptPrivancy', isAccptPrivancy.value)
      getCompany()
      getObjective()
      form.dateTo = form.dateTo == null ? moment() : form.dateTo
      form.dateFrom = form.dateFrom == null ? moment() : form.dateFrom
      form.timeTo = form.timeTo == null ? moment('17:00', 'HH:mm') : form.timeTo
      form.timeFrom =
        form.timeFrom == null ? moment('08:00', 'HH:mm') : form.timeFrom
      // const fname = $storage.getUniversal(ACCEPT_FNAME)
      // const lname = $storage.getUniversal(ACCEPT_LNAME)
      // if (fname != null && lname != null) {
      //   form.firstname = $storage.getUniversal(ACCEPT_FNAME)
      //   form.lastname = $storage.getUniversal(ACCEPT_LNAME)
      //   form.verifyIdentity = $storage.getUniversal(ACCEPT_IDENTIFIED)
      //   form.email = $storage.getUniversal(ACCEPT_EMAIL)
      //   form.mobile = $storage.getUniversal(ACCEPT_MOBILE)
      // }
    })

    return {
      disabledExpiredAtHours,
      disabledExpiredAtMinutes,
      onChangeTimeFromTo,
      inputForm,
      labelCol,
      wrapperCol,
      options,
      form,
      handleAddPerson,
      handleRemovePersonal,
      handleSearchHost,
      onSubmit,
      isLoading,
      moment,
      errorMessage,
      dataSource,
      filterOption,
      hostFounds,
      getObjective,
      endOpen,
      disabledStartDate,
      disabledEndDate,
      handleStartOpenChange,
      handleEndOpenChange,
      countFollows,
      countFollowsPerson,
      visableModal,
      detail,
      isConfirmLoading,
      confirm,
      onHide,
      isAccptPrivancy,
      locales,
      currentLocale,
      value: 1,
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      },
      onChange,
      showPDPA,
      closePDPA,
    }
  },
})
</script>
