<template>
  <div class="p-4">
    <a-modal
      :visible="visible"
      centered
      :closable="false"
      :mask-closable="false"
      :confirm-loading="isLoading"
      width="1100px"
    >
      <template slot="footer">
        <a-button type="primary" @click="$emit('cancel', updated)">
          ปิดหน้านี้
        </a-button>
      </template>
      <div class="flex">
        <div>
          <font-awesome-icon :icon="['fad', 'edit']" class="text-lg" />
        </div>
        <div class="flex-1 ml-2">
          <div class="mb-3 text-xl font-bold">
            {{
              form.isReset
                ? $t('history.work_permit.btn_edit.title_reset')
                : $t('history.work_permit.btn_edit.title')
            }}
          </div>
          <validation-observer ref="inputForm" v-slot="{ handleSubmit }" slim>
            <a-form
              class="mt-5"
              :form="form"
              :label-col="{ xs: { span: 24 }, lg: { span: 8 } }"
              :wrapper-col="{ xs: { span: 24 }, lg: { span: 12 } }"
            >
              <a-card :bordered="false">
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
                  <a-alert v-if="errorMessage" type="error" class="mb-4" banner>
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
                  <a-alert v-if="errorMessage" type="error" class="mb-4" banner>
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
                    <label slot="label">
                      {{ $t('workPermit.rack_no') }}
                    </label>
                    <a-input
                      v-model="form.rackNo"
                      :placeholder="$t('workPermit.require_rack_no')"
                    />
                  </a-form-item>
                  <a-alert v-if="errorMessage" type="error" class="mb-4" banner>
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
                          :default-value="moment()"
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
                          :default-value="moment()"
                          format="HH:mm"
                          :disabled-hours="disabledExpiredAtHours"
                          :disabled-minutes="disabledExpiredAtMinutes"
                        />
                      </a-col>
                    </a-row>
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
                      :disabled="form.isApproved"
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
                      :disabled="form.isApproved"
                      :placeholder="$t('workPermit.require_email_manager')"
                    />
                  </a-form-item>
                  <a-alert v-if="errorMessage" type="error" class="mb-4" banner>
                    <span slot="message" class="text-via-red">{{
                      errorMessage
                    }}</span>
                  </a-alert>
                </validation-provider>
                <validation-provider
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
                  <a-alert v-if="errorMessage" type="error" class="mb-4" banner>
                    <span slot="message" class="text-via-red">{{
                      errorMessage
                    }}</span>
                  </a-alert>
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
                  <a-alert v-if="errorMessage" type="error" class="mb-4" banner>
                    <span slot="message" class="text-via-red">{{
                      errorMessage
                    }}</span>
                  </a-alert>
                </validation-provider>
                <div class="flex justify-center">
                  <a-button
                    :loading="isLoading"
                    type="danger"
                    html-type="submit"
                    shape="round"
                    size="large"
                    @click="handleSubmit(onSubmit)"
                  >
                    {{
                      form.isReset
                        ? $t('history.work_permit.btn_edit.edit_reset')
                        : $t('history.work_permit.btn_edit.edit')
                    }}
                  </a-button>
                </div>
              </a-card>
            </a-form>
          </validation-observer>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import {
  ref,
  computed,
  watch,
  defineComponent,
  reactive,
  useContext,
  onMounted,
} from '@nuxtjs/composition-api'
import moment from 'moment'
import { find } from 'lodash'

interface WorkPermitForm {
  id: number | null
  accountId: string | null
  bookingId: string | null
  pinCode: string | null
  firstname: string | null
  lastname: string | null
  citizenId: string | null
  email: string | null
  mobile: string | null
  company: string | null
  projectName: string | null
  description: string | null
  workingDate: any | null
  serverRoomId: number | null
  agency: string | null
  rackNo: string | null
  timeFrom: string | null
  timeTo: string | null
  managerId: number | null
  emailManager: string | null
  ocioManager: string | null
  emailOcioManager: string | null
  managerApproved: boolean | false
  managerApprovedDate: Date | null
  ocioManagerApproved: boolean | false
  ocioManagerApprovedDate: Date | null
  tokenId: string | null
  ticketId: number | null
  createdAt: Date | null
  createdBy: string | null
  updatedAt: Date | null
  updatedBy: string | null
  deletedAt: string | null
  deletedBy: Date | null
  deleteRemark: string | null
  guid: string | null
  managerRemark: string | null
  ocioRemark: string | null
}

interface MyForm {
  id: number | null
  bookingId: string | null
  pinCode: string | null
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
  guid: string | ''
  isReset: boolean | true
  isApproved: boolean | false
}

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      required: false,
    },
    guid: {
      type: String,
      required: true,
    },
    reset: {
      type: Boolean,
      required: true,
    },
  },

  setup(props, context) {
    const {
      $auth: { user },
    } = useContext()
    const isConfirmLoading = ref(false)
    const isEdit = ref(false)
    const data = ref<WorkPermitForm>()
    const form = reactive<MyForm>({
      id: null,
      bookingId: null,
      pinCode: null,
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
      ocioManager: 'K.สุประเสริฐ ขาวละออ',
      emailOCIO: 'suprasert.k@pttdigital.com',
      guid: '',
      isReset: true,
      isApproved: false,
    })
    const i18n = context.root.$i18n
    const locales = ref(i18n.locales)
    const currentLocale = computed(() => {
      return find(locales.value, (l: any) => l.code === i18n.locale)
    })
    const inputForm = ref<any>(null)
    const isLoading = ref(false)
    const errorMessage = ref()
    const updated = ref(false)
    const options = reactive({
      serverRoom: [],
      manager: [],
    })

    function fetchAPI() {
      isEdit.value = false
      isLoading.value = false
      return context.root.$axios
        .get(`History/GetHistory/WorkPermit/${props.guid}`, {})
        .then((res) => {
          isConfirmLoading.value = true
          form.guid = props.guid
          data.value = res.data as WorkPermitForm

          form.id = data.value?.id
          form.firstname = data.value?.firstname
          form.lastname = data.value?.lastname
          form.citizenId = data.value?.citizenId
          form.email = data.value?.email
          form.mobile = data.value?.mobile
          form.company = data.value?.company
          form.project = data.value?.projectName
          form.description = data.value?.description
          form.date = moment(data.value?.workingDate)
          form.serverRoom = data.value?.serverRoomId
          form.agency = data.value?.agency
          form.rackNo = data.value?.rackNo
          form.timeTo = moment(data.value?.timeTo, 'hh:mm')
          form.timeFrom = moment(data.value?.timeFrom, 'hh:mm')
          form.manager = data.value?.managerId
          form.emailManager = data.value?.emailManager
          form.ocioManager = data.value?.ocioManager
          form.emailOCIO = data.value?.emailOcioManager
          form.isReset = props.reset
          form.isApproved = data.value?.ocioManagerApproved
        })
        .catch((e) => {
          console.error(e) // eslint-disable-line no-console
          const modal = {
            title: 'มีข้อผิดพลาด',
            content: 'ไม่สามารถแสดงผลข้อมูลได้, กรุณาลองใหม่อีกครั้ง',
          }
          context.root.$error(modal)
        })
        .finally(() => {
          isLoading.value = false
        })
    }

    function disabledStartDate(v: any) {
      if (v.startOf('day').isBefore(moment().startOf('day'))) {
        return true
      }
    }

    function getServerRoom() {
      context.root.$axios.get('ServerRoom/Dropdown').then(({ data }) => {
        options.serverRoom = data
      })
    }

    function filterOption(input: any, option: any) {
      const text = option.componentOptions.children[0].text.toLowerCase()
      return text.includes(input.toLowerCase())
    }

    function getManager() {
      context.root.$axios.get('LineManager/Dropdown').then(({ data }) => {
        options.manager = data
      })
    }

    function handleOnSelectManager() {
      const manager = find(options.manager, ['id', form.manager])
      if (manager) {
        form.emailManager = manager.email
      }
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

      return context.root.$axios
        .put(`WorkPermit/Register/ResetApproved/${props.reset}`, {
          id: form.id,
          accountId: form.accountId,
          bookingId: form.bookingId,
          pinCode: form.pinCode,
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
          agency: form.agency,
          rackNo: form.rackNo,
          timeFrom: moment(form.timeFrom).format('HH:mm'),
          timeTo: moment(form.timeTo).format('HH:mm'),
          managerId: objManager ? objManager.id : null,
          emailManager: form.emailManager,
          ocioManager: form.ocioManager,
          emailOcioManager: form.emailOCIO,
        })
        .then(() => {
          isLoading.value = false
          updated.value = true
          context.root.$success({
            title: 'บันทึกสำเร็จ',
            content: props.reset
              ? 'โปรดติดตามผลอนุมัติของ Manager สายงานและ OCIO Manager ใหม่อีกครั้ง'
              : 'อัพเดตข้อมูลคำร้องขอเข้าปฏิบัติงานสำเร็จ',
          })
          context.emit('cancel', updated.value)
        })
        .catch((e) => {
          isLoading.value = false
          updated.value = false
          console.error('response: ', e.response.data) // eslint-disable-line no-console
          const modal = {
            title: 'เกิดข้อผิดพลาด',
            content: 'กรุณาตรวจสอบข้อมูลและลองใหม่อีกครั้ง',
          }
          context.root.$error(modal)
        })
    }

    watch(
      () => props.guid,
      () => {
        if (
          props.guid !== '' &&
          props.guid != null &&
          props.guid !== 'undefined'
        ) {
          updated.value = false
          fetchAPI()
        }
      }
    )

    onMounted(() => {
      getServerRoom()
      getManager()
      form.timeTo = form.timeTo == null ? moment() : form.timeTo
      form.timeFrom = form.timeFrom == null ? moment() : form.timeFrom
    })

    return {
      moment,
      isLoading,
      data,
      currentLocale,
      isEdit,
      filterOption,
      errorMessage,
      disabledStartDate,
      getManager,
      updated,
      user,
      disabledExpiredAtHours,
      disabledExpiredAtMinutes,
      onChangeTimeFromTo,
      form,
      options,
      handleOnSelectManager,
      onSubmit,
      inputForm,
    }
  },
})
</script>
