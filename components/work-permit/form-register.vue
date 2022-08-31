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
                  class="
                    mt-3
                    mb-3
                    font-medium
                    sm:text-sm
                    md:text-base
                    lg:text-lg
                  "
                >
                  {{ $t('workPermit.title') }}
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
                  :label-col="{
                    xs: { span: 24 },
                    md: { span: 24 },
                    lg: { span: 8 },
                  }"
                  :wrapper-col="{
                    xs: { span: 24 },
                    md: { span: 24 },
                    lg: { span: 12 },
                  }"
                  @submit.prevent="handleSubmit(onSubmit)"
                >
                  <div style="background-color: #ececec; padding: 5px">
                    <a-card>
                      <div
                        slot="title"
                        class="
                          sm:text-sm
                          md:text-base
                          lg:text-lg
                          text-center
                          font-medium
                        "
                      >
                        {{ $t('workPermit.profileInformation') }}
                      </div>
                      <validation-provider
                        v-slot="{ errors }"
                        :name="$t('workPermit.name')"
                        rules="required"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('workPermit.name')"
                          required
                          class="mb-3"
                        >
                          <a-input
                            v-model="form.firstname"
                            :placeholder="$t('workPermit.require_name')"
                          />
                        </a-form-item>
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        :name="$t('workPermit.surname')"
                        rules="required"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('workPermit.surname')"
                          required
                          class="mb-3"
                        >
                          <a-input
                            v-model="form.lastname"
                            :placeholder="$t('workPermit.require_surname')"
                          />
                        </a-form-item>
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        :name="$t('workPermit.identifier')"
                        rules="required|citizenId"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('workPermit.identifier')"
                          required
                          class="mb-3"
                        >
                          <label slot="label">
                            {{ $t('workPermit.identifier') }}
                          </label>
                          <a-input
                            v-model="form.citizenId"
                            :placeholder="$t('workPermit.require_identifier')"
                            name="citizenId"
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
                        :name="$t('workPermit.email')"
                        rules="required|email"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('workPermit.email')"
                          required
                          class="mb-3"
                        >
                          <a-input
                            v-model="form.email"
                            :placeholder="$t('workPermit.require_email')"
                          />
                        </a-form-item>
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        :name="$t('workPermit.mobile')"
                        rules="required|mobile"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('workPermit.mobile')"
                          required
                          class="mb-3"
                        >
                          <a-input
                            v-model="form.mobile"
                            :placeholder="$t('workPermit.require_mobile')"
                          />
                        </a-form-item>
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        :name="$t('workPermit.company')"
                        rules="required"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('workPermit.company')"
                          required
                          class="mb-3"
                        >
                          <label slot="label">
                            {{ $t('workPermit.company') }}
                          </label>
                          <a-input
                            v-model="form.company"
                            :placeholder="$t('workPermit.require_company')"
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
                  </div>
                  <div style="background-color: #ececec; padding: 5px">
                    <a-card>
                      <div
                        slot="title"
                        class="
                          sm:text-sm
                          md:text-base
                          lg:text-lg
                          text-center
                          font-medium
                        "
                      >
                        {{ $t('workPermit.workInformation') }}
                      </div>
                      <validation-provider
                        v-slot="{ errors }"
                        :name="$t('workPermit.project')"
                        rules="required"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('workPermit.project')"
                          required
                          class="mb-3"
                        >
                          <label slot="label">
                            {{ $t('workPermit.project') }}
                          </label>
                          <a-input
                            v-model="form.project"
                            :placeholder="$t('workPermit.require_project')"
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
                        :name="$t('workPermit.detail')"
                        rules="required"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('workPermit.detail')"
                          required
                          class="mb-3"
                        >
                          <label slot="label">
                            {{ $t('workPermit.detail') }}
                          </label>
                          <a-textarea
                            v-model="form.description"
                            :auto-size="{ minRows: 3, maxRows: 5 }"
                            :placeholder="$t('workPermit.require_detail')"
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
                        :name="$t('workPermit.date')"
                        rules="required"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('workPermit.date')"
                          required
                          class="mb-3"
                        >
                          <a-date-picker
                            v-model="form.date"
                            :disabled-date="disabledStartDate"
                            format="YYYY-MM-DD"
                            :placeholder="$t('workPermit.require_date')"
                            class="w-full"
                          />
                        </a-form-item>
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        :name="$t('workPermit.manager')"
                        rules="required"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('workPermit.manager')"
                          required
                          class="mb-3"
                        >
                          <a-select
                            v-model="form.manager"
                            :placeholder="$t('workPermit.require_manager')"
                            class="w-full"
                            label="manager"
                            track-by="Id"
                            show-search
                            :filter-option="filterOption"
                            @change="handleOnSelectManager"
                          >
                            <a-icon slot="suffixIcon" type="info-circle" />
                            <a-select-option
                              v-for="manager in options.manager"
                              :key="manager.id"
                              :value="manager.id"
                            >
                              {{ manager.managerName }}
                            </a-select-option>
                          </a-select>
                        </a-form-item>
                      </validation-provider>

                      <validation-provider
                        v-slot="{ errors }"
                        :name="$t('workPermit.email_manager')"
                        rules="required"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('workPermit.email_manager')"
                          required
                          class="mb-3"
                        >
                          <label slot="label">
                            {{ $t('workPermit.email_manager') }}
                          </label>
                          <a-input
                            v-model="form.emailManager"
                            :placeholder="
                              $t('workPermit.require_email_manager')
                            "
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
                        :name="$t('workPermit.server_room')"
                        rules="required"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('workPermit.server_room')"
                          required
                          class="mb-3"
                        >
                          <a-select
                            v-model="form.serverRoom"
                            :placeholder="$t('workPermit.require_server_room')"
                            class="w-full"
                            label="serverRoom"
                            track-by="Id"
                            show-search
                            :filter-option="filterOption"
                            @change="handleOnSelectSerVerRoom"
                          >
                            <a-icon slot="suffixIcon" type="info-circle" />
                            <a-select-option
                              v-for="room in options.serverRoom"
                              :key="room.id"
                              :value="room.id"
                            >
                              {{ room.roomName }}
                            </a-select-option>
                          </a-select>
                        </a-form-item>
                      </validation-provider>

                      <validation-provider
                        v-slot="{ errors }"
                        :name="$t('workPermit.rack_no')"
                        rules="required"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('workPermit.rack_no')"
                          required
                          class="mb-3"
                        >
                          <div class="flex-content">
                            <div style="width: calc(100% - 25px)">
                              <a-select
                                v-model="form.rackNo"
                                :placeholder="$t('workPermit.rack_no')"
                                class="w-full"
                                label="rack"
                                track-by="rack_name"
                                show-search
                                :filter-option="filterOption"
                              >
                                <a-icon slot="suffixIcon" type="info-circle" />
                                <a-select-option
                                  v-for="Rack in options.Rack"
                                  :key="Rack.rack_name"
                                  :value="Rack.rack_name"
                                >
                                  {{ Rack.rack_name }}
                                </a-select-option>
                              </a-select>
                            </div>
                            <div style="width: 25px">
                              <a-popover>
                                <template slot="content">
                                  <div style="width: 280px">
                                    <span>{{ $t('tooltip.rack') }}</span>
                                  </div>
                                </template>
                                <a-icon class="pl-3" type="question-circle" />
                              </a-popover>
                            </div>
                          </div>
                        </a-form-item>

                        <!-- <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('workPermit.rack_no')"
                          required
                          class="mb-3"
                        >
                          <label slot="label">
                            {{ $t('workPermit.rack_no') }}
                          </label>
                          <a-input
                            v-model="form.rackNo"
                            :placeholder="$t('workPermit.require_rack_no')"
                          />
                        </a-form-item> -->
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
                        :name="$t('workPermit.time_start')"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('workPermit.time_start')"
                          required
                          class="mb-3"
                        >
                          <a-row :gutter="8">
                            <a-col :span="24" :sm="12">
                              <a-time-picker
                                v-model="form.timeFrom"
                                :default-value="moment('08:00', 'HH:mm')"
                                format="HH:mm"
                                @change="onChangeTimeFromTo"
                              />
                            </a-col>
                          </a-row>
                        </a-form-item>
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        :name="$t('workPermit.time_end')"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('workPermit.time_end')"
                          required
                          class="mb-3"
                        >
                          <a-row :gutter="8">
                            <a-col :span="24" :sm="12">
                              <a-time-picker
                                v-model="form.timeTo"
                                :default-value="moment('17:00', 'HH:mm')"
                                format="HH:mm"
                                :disabled-hours="disabledExpiredAtHours"
                                :disabled-minutes="disabledExpiredAtMinutes"
                              />
                            </a-col>
                          </a-row>
                        </a-form-item>
                      </validation-provider>

                      <!-- <validation-provider
                        v-slot="{ errors }"
                        :name="$t('workPermit.email_manager')"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('workPermit.ocio')"
                          class="mb-3"
                        >
                          <label slot="label">
                            {{ $t('workPermit.ocio') }}
                          </label>
                          <a-input
                            v-model="form.ocioManager"
                            :placeholder="$t('workPermit.require_ocio')"
                            default-value="K.Darunee"
                            disabled
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
                      </validation-provider> -->

                      <validation-provider
                        v-slot="{ errors }"
                        :name="$t('workPermit.require_ocio')"
                        rules="required"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('workPermit.ocio')"
                          required
                          class="mb-3"
                        >
                          <a-select
                            v-model="form.ocioManager"
                            :placeholder="$t('workPermit.require_ocio')"
                            class="w-full"
                            label="datacentermanagername"
                            track-by="Id"
                            show-search
                            :filter-option="filterOption"
                            @change="handleOnSelectDataCenter"
                          >
                            <a-icon slot="suffixIcon" type="info-circle" />
                            <a-select-option
                              v-for="datacentermanager in options.datacentermanager"
                              :key="datacentermanager.datacentermanagername"
                              :value="datacentermanager.datacentermanagername"
                            >
                              {{ datacentermanager.datacentermanagername }}
                            </a-select-option>
                          </a-select>
                        </a-form-item>
                      </validation-provider>

                      <validation-provider
                        v-slot="{ errors }"
                        :name="$t('workPermit.require_email_ocio')"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('workPermit.email_ocio')"
                          class="mb-3"
                        >
                          <label slot="label">
                            {{ $t('workPermit.email_ocio') }}
                          </label>
                          <a-input
                            v-model="form.emailOCIO"
                            :placeholder="$t('workPermit.require_email_ocio')"
                            default-value="suprasert.k@pttdigital.com"
                            disabled
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

                      <!-- <validation-provider
                        v-slot="{ errors }"
                        :name="$t('workPermit.require_email_ocio')"
                        rules="required"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('workPermit.require_email_ocio')"
                          required
                          class="mb-3"
                        >
                          <label slot="label">
                            {{ $t('workPermit.require_email_ocio') }}
                          </label>
                          <a-input
                            v-model="form.emailOCIO"
                            :placeholder="$t('workPermit.require_email_ocio')"
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
                      </validation-provider> -->
                      <div class="flex justify-center">
                        <a-button
                          :loading="isLoading"
                          type="primary"
                          html-type="submit"
                          shape="round"
                          size="large"
                        >
                          {{ $t('workPermit.register') }}
                        </a-button>
                      </div>
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
import { find } from 'lodash'
import moment from 'moment'
import PDPA from '@/components/pdpa.vue'
// import validator from 'vee-validate'

interface MyForm {
  accountId: number | null
  firstname: string | null
  lastname: string | null
  citizenId: string | null
  email: string | null
  mobile: string | null
  company: string | null
  project: string | null
  description: string | null
  date: any
  serverRoom?: any | null
  agency: string | null
  rackNo: string | null
  timeTo: any | null
  timeFrom: any | null
  manager?: any | null
  emailManager: string | null
  ocioManager: string | null
  emailOCIO: string | null
  ocioId: string | null
}

const ACCEPT_PRIVANCY = 'accept_privacy_workpermit'
const ACCEPT_FNAME = 'firstname'
const ACCEPT_LNAME = 'lastname'
const ACCEPT_VERIFIED = 'citizenId'
const ACCEPT_EMAIL = 'email'
const ACCEPT_MOBILE = 'mobile'
const ACCEPT_COMPANY = 'company'

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
      i18n,
    } = useContext()
    const router = useRouter()
    const errorMessage = ref()
    const labelCol = ref({ span: 4 })
    const wrapperCol = ref({ span: 14 })
    const options = reactive({
      serverRoom: [],
      manager: [],
      Rack: [],
      datacentermanager: [],
    })
    const inputForm = ref<any>(null)
    const form = reactive<MyForm>({
      accountId: null,
      firstname: null,
      lastname: null,
      citizenId: null,
      email: null,
      mobile: null,
      company: null,
      project: null,
      description: null,
      date: null,
      serverRoom: null,
      agency: null,
      rackNo: null,
      timeTo: null,
      timeFrom: null,
      manager: null,
      emailManager: null,
      ocioManager: null,
      emailOCIO: null,
      ocioId: null,
    })
    const hostFounds = ref<any>([])
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

      if (!v || !form.date) {
        return false
      }

      return v.startOf('day').isAfter(form.date.startOf('day'))
    }

    function getServerRoom() {
      context.root.$axios.get('ServerRoom/Dropdown').then(({ data }) => {
        options.serverRoom = data
      })
    }
    function getServerRoomData(data: any) {
      context.root.$axios.get('ServerRoom/Get/' + data).then(({ data }) => {
        options.serverRoom = data
      })
    }

    function getRackData(approverId: any, roomId: any) {
      context.root.$axios
        .get(`Rack/GetRackIDForDropDown/` + approverId + `/` + roomId)
        .then(({ data }) => {
          options.Rack = data
        })
    }

    function getManager() {
      context.root.$axios.get('LineManager/Dropdown').then(({ data }) => {
        options.manager = data
      })
    }
    function getdatacenterManager() {
      context.root.$axios
        .get('LineManager/DropdownDataCenter')
        .then(({ data }) => {
          options.datacentermanager = data
        })
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

    function onSubmit() {
      isLoading.value = true
      const objManager = find(options.manager, ['id', form.manager])
      const objRoom = find(options.serverRoom, ['id', form.serverRoom])
      isAccptPrivancy.value = $storage.setUniversal(
        ACCEPT_FNAME,
        form.firstname
      )
      isAccptPrivancy.value = $storage.setUniversal(ACCEPT_LNAME, form.lastname)
      isAccptPrivancy.value = $storage.setUniversal(
        ACCEPT_VERIFIED,
        String(form.citizenId)
      )
      isAccptPrivancy.value = $storage.setUniversal(ACCEPT_EMAIL, form.email)
      isAccptPrivancy.value = $storage.setUniversal(ACCEPT_MOBILE, form.mobile)
      isAccptPrivancy.value = $storage.setUniversal(
        ACCEPT_COMPANY,
        form.company
      )
      return context.root.$axios
        .post('WorkPermit/Register', {
          id: null,
          accountId: form.accountId,
          bookingId: null,
          pinCode: null,
          firstname: form.firstname,
          lastname: form.lastname,
          citizenId: String(form.citizenId),
          email: form.email,
          mobile: form.mobile,
          company: form.company,
          projectName: form.project,
          description: form.description,
          workingDate: moment(form.date).format('YYYY-MM-DD'),
          serverRoomId: objRoom ? objRoom.id : null,
          agency: form.company,
          rackNo: form.rackNo,
          timeFrom: moment(form.timeFrom).format('HH:mm'),
          timeTo: moment(form.timeTo).format('HH:mm'),
          managerId: objManager ? objManager.id : null,
          emailManager: form.emailManager,
          ocioManager: form.ocioManager,
          emailOcioManager: form.emailOCIO,
          ocioId: form.ocioId,
        })
        .then(() => {
          context.root.$success({
            title: 'ลงทะเบียนสำเร็จ',
            content: 'กรุณาตรวจสอบผลการอนุมัติทางอีเมลของคุณภายใน 1 วันทำการ',
          })

          form.firstname = null
          form.lastname = null
          form.citizenId = null
          form.email = null
          form.mobile = null
          form.project = null
          form.description = null
          form.date = null
          form.serverRoom = null
          form.agency = null
          form.rackNo = null
          form.timeTo = null
          form.timeFrom = null
          form.manager = null
          form.emailManager = null

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
            form.citizenId = $storage.getUniversal(ACCEPT_VERIFIED)
            form.email = $storage.getUniversal(ACCEPT_EMAIL)
            form.mobile = $storage.getUniversal(ACCEPT_MOBILE)
            form.company = $storage.getUniversal(ACCEPT_COMPANY)
          }
        })
        .catch((e) => {
          console.log(e.response) // eslint-disable-line no-console
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

    function handleOnSelectManager() {
      form.serverRoom = null
      const manager = find(options.manager, ['id', form.manager])
      if (manager) {
        form.emailManager = manager.email
        // console.log(manager.id)
        getServerRoomData(manager.id)
      }
    }
    function handleOnSelectSerVerRoom() {
      form.rackNo = null
      const manager = find(options.manager, ['id', form.manager])
      if (manager) {
        const ServerRoom = find(options.serverRoom, ['id', form.serverRoom])
        if (ServerRoom) {
          // console.log('manager', manager.id)
          // console.log('ServerRoom', ServerRoom.id)
          getRackData(manager.id, ServerRoom.id)
        }
      }
      // console.log('options.Rack', options.Rack)
      // console.log('form.rackNo', form.rackNo)
      // const rack = find(options.Rack, ['id', form.rackNo])
      // console.log('DataPick', rack)
      // if (rack) {
      //   alert('กด')
      //   // form.emailManager = manager.email
      //   // console.log(manager.id)
      //   console.log('DataPick', rack)
      //   getRackData(rack.approver_id, rack.room_id)
      // }
    }
    function handleOnSelectDataCenter() {
      const datacentermanager = find(options.datacentermanager, [
        'datacentermanagername',
        form.ocioManager,
      ])
      if (datacentermanager) {
        form.emailOCIO = datacentermanager.email
        form.ocioId = datacentermanager.id
      }
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
          form.citizenId = v?.citizenId
          form.email = v?.email
          form.mobile = v?.mobile
          form.company = v?.company
        } else if (!isAccptPrivancy.value) {
          showPDPA.value = true
          form.accountId = v?.id || null
          form.firstname = $storage.getUniversal(ACCEPT_FNAME)
          form.lastname = $storage.getUniversal(ACCEPT_LNAME)
          form.citizenId = $storage.getUniversal(ACCEPT_VERIFIED)
          form.email = $storage.getUniversal(ACCEPT_EMAIL)
          form.mobile = $storage.getUniversal(ACCEPT_MOBILE)
          form.company = $storage.getUniversal(ACCEPT_COMPANY)
        }
      },
      {
        immediate: true,
      }
    )

    onMounted(() => {
      // getServerRoom()
      getManager()
      getdatacenterManager()
      form.timeTo = form.timeTo == null ? moment('17:00', 'HH:mm') : form.timeTo
      form.timeFrom =
        form.timeFrom == null ? moment('08:00', 'HH:mm') : form.timeFrom
    })

    return {
      disabledExpiredAtHours,
      disabledExpiredAtMinutes,
      onChangeTimeFromTo,
      disabledStartDate,
      handleOnSelectManager,
      inputForm,
      labelCol,
      wrapperCol,
      options,
      form,
      onSubmit,
      isLoading,
      moment,
      errorMessage,
      filterOption,
      hostFounds,
      getServerRoom,
      getManager,
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
      showPDPA,
      closePDPA,
      getdatacenterManager,
      handleOnSelectDataCenter,
      getServerRoomData,
      getRackData,
      handleOnSelectSerVerRoom,
    }
  },
})
</script>

<style lang="less">
.flex-content {
  width: calc(100% + 25px);
  display: flex;
  flex-wrap: wrap;
}
</style>
