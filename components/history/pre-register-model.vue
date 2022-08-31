<template>
  <div class="p-4">
    <a-modal
      :visible="visible"
      centered
      :closable="false"
      :mask-closable="false"
      :confirm-loading="isConfirmLoading"
      width="1100px"
    >
      <template slot="footer">
        <a-button type="primary" @click="$emit('cancel')">
          ปิดหน้านี้
        </a-button>
      </template>
      <div class="flex">
        <div>
          <font-awesome-icon :icon="['fad', 'info-circle']" class="text-lg" />
        </div>
        <div class="flex-1 ml-2">
          <div class="mb-3 text-xl font-bold">
            {{ $t('history.pre_register.title') }}
          </div>
          <a-card :title="titleCard">
            <a-card :title="$t('history.pre_register.approve_infomation')">
              <a-descriptions
                :title="$t('history.pre_register.user_information')"
                layout="vertical"
              >
                <a-descriptions-item
                  :label="$t('history.pre_register.fullname')"
                >
                  {{ data ? data.firstname : '' }}
                  {{ data ? data.lastname : '' }}
                </a-descriptions-item>
                <a-descriptions-item
                  :label="$t('history.pre_register.verify_identity')"
                >
                  {{ data ? data.verifyIdentity : '' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('history.pre_register.email')">
                  {{ data ? data.email : '' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('history.pre_register.mobile')">
                  {{ data ? data.mobile : '' }}
                </a-descriptions-item>
                <a-descriptions-item
                  :label="$t('history.pre_register.first_person_status')"
                >
                  {{
                    data
                      ? data.firstPerson == true
                        ? 'ลงทะเบียนด้วยตนเอง'
                        : 'ผู้ติดตาม'
                      : ''
                  }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('history.pre_register.remark')">
                  {{ data ? data.remark : '' }}
                </a-descriptions-item>
              </a-descriptions>
            </a-card>
            <a-card :title="$t('history.pre_register.meeting_infomation')">
              <a-descriptions>
                <a-descriptions-item :label="$t('history.pre_register.host')">
                  {{ data ? data.hostDetail : '' }}
                </a-descriptions-item>
                <a-descriptions-item
                  :label="$t('history.pre_register.objectivity')"
                >
                  {{ data ? data.objectivityDetail : '' }}
                </a-descriptions-item>
                <a-descriptions-item
                  :label="$t('history.pre_register.description')"
                >
                  {{ data ? data.remark : '' }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('history.pre_register.date')">
                  {{
                    data
                      ? data.dateFrom == data.dateTo
                        ? $moment(data.dateFrom).format('DD/MM/YYYY')
                        : $moment(data.dateFrom).format('DD/MM/YYYY') +
                          ' ' +
                          $moment(data.dateTo).format('DD/MM/YYYY')
                      : ''
                  }}
                </a-descriptions-item>
                <a-descriptions-item :label="$t('history.pre_register.time')">
                  {{
                    data
                      ? data.timeFrom == data.timeTo
                        ? data.timeFrom
                        : data.timeFrom + ' ' + data.timeTo
                      : ''
                  }}
                </a-descriptions-item>
                <a-descriptions-item
                  :label="$t('history.pre_register.company')"
                >
                  {{
                    companyData
                      ? $i18n.locale == 'th'
                        ? companyData.nameTh
                        : companyData.nameEn
                      : ''
                  }}
                </a-descriptions-item>
              </a-descriptions>
            </a-card>
            <a-card title="ข้อมูลการอนุมัติ" class="h-full"
              ><a-row :gutter="24">
                <a-col :span="12">
                  <a-card
                    :title="$t('history.pre_register.approve')"
                    :bordered="true"
                    class="h-full"
                  >
                    <!-- {{ data }} -->
                    <div
                      v-if="
                        (data
                          ? data.hostId === hostId
                            ? false
                            : true
                          : false) &&
                        (!data.confirmed && !data.rejected ? true : false)
                      "
                    >
                      <a-avatar
                        size="large"
                        icon="user"
                        :style="{
                          backgroundColor: 'orange',
                          verticalAlign: 'middle',
                        }"
                        class="mr-2"
                      />
                      <a-tag color="orange" class="text-sm">
                        รอ ผนักงาน อนุมัติเข้าสถานที่
                      </a-tag>
                    </div>
                    <div v-else>
                      <div
                        v-if="
                          (data
                            ? !data.confirmed && !data.rejected
                              ? true
                              : false
                            : false) || isEdit
                        "
                      >
                        <validation-observer
                          ref="inputForm"
                          v-slot="{ handleSubmit }"
                          slim
                        >
                          <a-form
                            class="mt-0"
                            :form="form"
                            :label-col="{ xs: { span: 24 }, lg: { span: 16 } }"
                          >
                            <validation-provider
                              v-slot="{ errors }"
                              :name="$t('preRegister.name')"
                              :rules="{ required: requireFloorApprove }"
                            >
                              <a-form-item
                                :validate-status="errors[0] ? 'error' : null"
                                :help="errors[0]"
                                required
                                class="mb-3"
                              >
                                <a-select
                                  v-model="form.floor"
                                  :placeholder="
                                    $t('history.pre_register.floor_select')
                                  "
                                  label="company_name"
                                  class="w-full"
                                  show-search
                                  :filter-option="filterOption"
                                >
                                  <a-icon slot="suffixIcon" type="bank" />
                                  <a-select-option
                                    v-for="floor in options.floor"
                                    :key="floor.floorId"
                                    :value="floor.floorId"
                                  >
                                    {{ floor.name.th }}
                                  </a-select-option>
                                </a-select>
                              </a-form-item>
                            </validation-provider>
                            <validation-provider
                              v-slot="{ errors }"
                              :name="$t('history.pre_register.fill_remark')"
                              :rules="{ required: requireDetailApprove }"
                            >
                              <a-form-item
                                :validate-status="errors[0] ? 'error' : null"
                                :help="errors[0]"
                                :label="$t('history.pre_register.comment')"
                                class="mb-3"
                              >
                                <a-textarea
                                  v-model="formApprove.remark"
                                  :placeholder="
                                    $t('history.pre_register.fill_remark')
                                  "
                                  :rows="4"
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
                            <a-button
                              type="primary"
                              icon="check-circle"
                              @click="approved(handleSubmit)"
                            >
                              อนุมัติ
                            </a-button>
                            <a-button
                              type="danger"
                              icon="close-circle"
                              @click="rejected(handleSubmit)"
                            >
                              ไม่อนุมัติ
                            </a-button>
                          </a-form>
                        </validation-observer>
                      </div>
                      <div v-else>
                        <div
                          v-if="data ? (data.confirmed ? true : false) : false"
                        >
                          <a-avatar
                            :size="64"
                            icon="check-circle"
                            :style="{
                              backgroundColor: '#87d068',
                              verticalAlign: 'middle',
                            }"
                          />
                          <p class="mt-2 text-green-600">อนุมัติเข้าพบ</p>
                          <p class="mt-2 text-green-600">
                            สถานที่นัดพบ :
                            {{ floorName ? floorName : '' }} <br />
                            {{ data ? data.confirmedRemark : '' }}
                          </p>
                          <p class="mt-2 text-black">
                            ผลการอนุมัติโดย : {{ data ? data.confirmedBy : '' }}
                          </p>
                          <p class="mt-2 text-black">
                            วันที่อนุมัติ :
                            {{
                              data && data.confirmedDate
                                ? $moment(data.confirmedDate).format(
                                    'DD/MM/YYYY HH:mm'
                                  )
                                : '-'
                            }}
                          </p>
                        </div>
                        <div v-else>
                          <a-avatar
                            :size="64"
                            icon="close-circle"
                            :style="{
                              backgroundColor: '#ff0000',
                              verticalAlign: 'middle',
                            }"
                          />
                          <p class="mt-2 text-red-500">
                            ไม่อนุมัติเข้าพบ เนื่องจาก :
                            {{ data ? data.rejectedRemark : '-' }}
                          </p>
                          <p class="mt-2 text-black">
                            ผลการอนุมัติโดย : {{ data ? data.rejectedBy : '-' }}
                          </p>
                          <p class="mt-2 text-black">
                            วันที่อนุมัติ :
                            {{
                              data && data.rejectedDate
                                ? $moment(data.rejectedDate).format(
                                    'DD/MM/YYYY HH:mm'
                                  )
                                : '-'
                            }}
                          </p>
                        </div>
                        <a-button
                          v-if="
                            data
                              ? data.hostId === hostId
                                ? true
                                : false
                              : false
                          "
                          type="danger"
                          icon="edit"
                          class="mt-5"
                          @click="editApproved"
                        >
                          แก้ไขผลอนุมัติ
                        </a-button>
                      </div>
                    </div>
                  </a-card>
                </a-col>
                <a-col :span="12">
                  <a-card
                    :title="$t('history.pre_register.timeline')"
                    :bordered="true"
                    class="h-full"
                  >
                    <a-timeline mode="right">
                      <a-timeline-item
                        >สร้างคำร้องขอ
                        {{
                          data
                            ? $moment(data.createdAt).format('DD/MM/YYYY HH:mm')
                            : ''
                        }}</a-timeline-item
                      >
                      <a-timeline-item
                        >ตรวจสอบข้อมูลเพื่อขออนุมัติ
                        {{
                          data
                            ? $moment() > $moment(data.createdAt).add(1, 'hour')
                              ? $moment(data.createdAt)
                                  .add(45, 'minute')
                                  .format('DD/MM/YYYY HH:mm')
                              : '-'
                            : ''
                        }}</a-timeline-item
                      >
                      <a-timeline-item
                        v-if="
                          data
                            ? data.confirmed || data.rejected
                              ? true
                              : false
                            : false
                        "
                      >
                        <a-icon
                          v-if="data ? (data.rejected ? true : false) : false"
                          slot="dot"
                          type="close-circle"
                          theme="twoTone"
                          two-tone-color="#ff0000"
                          style="font-size: 16px"
                        />
                        {{ data ? getStatus(data) : 'รอการอนุมัติ' }}
                      </a-timeline-item>

                      <a-timeline-item v-else color="red">
                        <a-icon
                          slot="dot"
                          type="clock-circle-o"
                          style="font-size: 16px"
                        />
                        {{ data ? getStatus(data) : 'รอการอนุมัติ' }}
                      </a-timeline-item>
                      <a-timeline-item
                        v-if="
                          data
                            ? data.ticketId !== null && data.confirmed
                              ? true
                              : false
                            : false
                        "
                        >{{
                          data
                            ? data.ticketId !== null
                              ? 'เข้าอาคาร ENCO เรียบร้อยแล้ว'
                              : 'รอดำเนินการ'
                            : 'รอดำเนินการ'
                        }}
                      </a-timeline-item>
                      <a-timeline-item
                        v-else-if="
                          data
                            ? data.ticketId !== null && !data.rejected
                              ? true
                              : false
                            : false
                        "
                        color="red"
                      >
                        <a-icon
                          slot="dot"
                          type="clock-circle-o"
                          style="font-size: 16px"
                        />
                        รอดำเนินการ
                      </a-timeline-item>
                      <a-timeline-item
                        v-else-if="
                          data
                            ? data.ticketId == null && data.confirmed
                              ? true
                              : false
                            : false
                        "
                      >
                        <a-icon
                          slot="dot"
                          type="check-circle"
                          theme="twoTone"
                          two-tone-color="#52c41a"
                          style="font-size: 16px"
                        />
                        รอผู้ติดต่อเข้าพบตามนัด
                      </a-timeline-item>
                    </a-timeline>
                  </a-card>
                </a-col>
              </a-row>
            </a-card>
          </a-card>
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

interface PreRegisterForm {
  id: number | null
  accountId: string | null
  typeId: number | null
  currentStep: number | null
  visitorId: number | null
  firstname: string | null
  lastname: string | null
  verifyIdentity: string | null
  email: string | null
  mobile: string | null
  firstPerson: boolean | null
  followPerson: number | null
  accessCardId: number | null
  hostId: number | null
  hostDetail: string | null
  objectivityId: number | null
  objectivityDetail: string | null
  documentNo: string | null
  documentType: number | null
  remark: string | null
  floorId: number | null
  dateFrom: Date | null
  dateTo: Date | null
  timeFrom: string | null
  timeTo: string | null
  companyId: number | null
  confirmed: boolean | null
  confirmedDate: Date | null
  confirmedBy: string | null
  rejected: boolean | false
  rejectedRemark: string | null
  rejectDate: Date | null
  rejectBy: string | null
  tokenId: string | null
  allDayCheckin: boolean | false
  ticketId: number | null
  createdAt: Date | null
  createdBy: string | null
  updatedAt: Date | null
  updatedBy: string | null
  deletedAt: string | null
  deletedBy: Date | null
  deleteRemark: string | null
  guid: string | null
  confirmedRemark: string | null
}

interface Company {
  nameTh: string | null
  nameEn: string | null
  description: string | null
}

interface MyForm {
  floor?: any | null
}

interface ApproveForm {
  guid: string | null
  confirmed: boolean | null
  confirmedBy: string | null
  confirmedDate: Date | null
  confirmedRemark: string | null
  rejected: boolean | null
  rejectedBy: string | null
  rejectedDate: Date | null
  rejectedRemark: string | null
  remark: string | null
  floorId: number | null
  floorName: string | null
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
  },

  setup(props, context) {
    const {
      $auth: { user },
    } = useContext()
    const isConfirmLoading = ref(false)
    const isEdit = ref(false)
    const data = ref<PreRegisterForm>()
    const i18n = context.root.$i18n
    const locales = ref(i18n.locales)
    const currentLocale = computed(() => {
      return find(locales.value, (l: any) => l.code === i18n.locale)
    })
    const options = reactive({
      floor: [],
    })
    const errorMessage = ref()
    const floorName = ref(String)
    const form = reactive<MyForm>({
      floor: undefined,
    })
    const requireFloorApprove = ref(true)
    const requireDetailApprove = ref(true)
    const formApprove = reactive<ApproveForm>({
      guid: null,
      confirmed: false,
      confirmedBy: null,
      confirmedDate: null,
      confirmedRemark: null,
      rejected: false,
      rejectedBy: null,
      rejectedDate: null,
      rejectedRemark: null,
      remark: null,
      floorId: null,
      floorName: null,
    })

    function getStatus(data: any) {
      if (data.confirmed) {
        return (
          'อนุมัติเข้าพบ ' +
          moment(data.confirmedDate).format('DD/MM/YYYY HH:mm')
        )
      } else if (data.rejected) {
        return (
          'คำขอถูกปฏิเสธ ' +
          moment(data.rejectedDate).format('DD/MM/YYYY HH:mm')
        )
      } else {
        return 'รออนุมัติ'
      }
    }

    function fetchAPI() {
      isEdit.value = false
      isConfirmLoading.value = false
      requireFloorApprove.value = true
      requireDetailApprove.value = true
      options.floor = []
      // console.log('guid:' + props.guid)
      return context.root.$axios
        .get(`History/GetHistory/PreRegister/${props.guid}`, {})
        .then((res) => {
          isConfirmLoading.value = true
          formApprove.guid = props.guid
          data.value = res.data as PreRegisterForm
          console.log('ดาต้า', data.value)
          console.log('ดาต้า2', data.value.companyId)

          if (hostId.value) {
            getFloorToApprove()
          }

          if (data.value.companyId !== null) {
            getCompanyInfo(data.value.companyId)
            if (hostId.value) {
              getFloorToApprove()
            }
          }
          if (data.value.floorId !== null) {
            getFloorName(data.value.floorId)
          }
          console.log('ticketId :' + data.value.ticketId)
          formApprove.remark = data.value.confirmedRemark
        })
        .catch((e) => {
          console.log(e) // eslint-disable-line no-console
          const modal = {
            title: 'มีข้อผิดพลาด',
            content: '',
          }

          if (e.response.status === 400) {
            modal.title = e.response.data.message.th
            modal.content = e.response.data.message.th
          } else {
            modal.title = 'ไม่สำเร็จ'
            modal.content = e.response.data.message.th
          }

          context.root.$error(modal)
        })
        .finally(() => {
          isConfirmLoading.value = false
        })
    }

    const companyData = ref<Company>()
    function getCompanyInfo(id: number) {
      console.log('id: ' + id)
      if (id > 0) {
        context.root.$axios.get(`Company/${id}`).then(({ data }) => {
          companyData.value = data as Company
          console.log(companyData.value)
        })
      }
    }

    function getFloorToApprove() {
      context.root.$axios
        .get('History/GetHistory/PreRegister/FloorToApprove')
        .then(({ data }) => {
          options.floor = data
        })
    }

    function getFloorName(id: number) {
      if (id) {
        context.root.$axios.get(`Floor/${id}`).then(({ data }) => {
          console.log(data)
          floorName.value = data.nameTh
        })
      }
    }

    function editApproved() {
      console.log('clicked')
      isEdit.value = true
      getFloorToApprove()
    }

    function clickApprove() {
      const floor: any = find(options.floor, ['floorId', form.floor])
      // console.log(floor)
      return context.root.$axios
        .post('PreRegister/Approved', {
          guid: formApprove.guid,
          confirmed: true,
          confirmed_date: moment(),
          confirmed_remark: formApprove.remark,
          confirmed_by: formApprove.confirmedBy,
          floor_id: floor ? floor.floorId : null,
          floor_name: floor ? floor.name.th : null,
          rejected: false,
          rejected_date: null,
          rejected_remark: null,
          rejected_by: null,
        })
        .then(() => {
          context.root.$success({
            title: 'บันทึกสำเร็จ',
            content: 'อนุมัติผลการลงทะเบียนเข้าอาคาร ENCO ล่วงหน้าสำเร็จ',
          })

          formApprove.confirmed = false
          formApprove.confirmedRemark = null
          formApprove.rejected = false
          formApprove.rejectedRemark = null
          formApprove.remark = null

          fetchAPI()
        })
        .catch((e) => {
          console.log(e.response) // eslint-disable-line no-console
          const modal = {
            title: 'มีข้อผิดพลาด',
            content: '',
          }

          if (e.response.status === 400) {
            modal.title = e.response.data.message.th
            modal.content = e.response.data.message.th
          } else {
            modal.title = 'อนุมัติไม่สำเร็จ'
            modal.content = e.response.data.message.th
          }

          context.root.$error(modal)
        })
        .then(() => {
          isConfirmLoading.value = false
        })
    }

    function approved(handleSubmit: any) {
      requireFloorApprove.value = true
      requireDetailApprove.value = true
      console.log('approved')
      console.log(requireFloorApprove.value)
      console.log(requireDetailApprove.value)
      setTimeout(handleSubmit(clickApprove), 500)

      requireFloorApprove.value = true
      requireDetailApprove.value = true
    }

    function clickReject() {
      return context.root.$axios
        .post('PreRegister/Approved', {
          guid: formApprove.guid,
          rejected: true,
          rejected_date: moment(),
          rejected_remark: formApprove.remark,
          rejected_by: formApprove.rejectedBy,
        })
        .then(() => {
          context.root.$success({
            title: 'บันทึกสำเร็จ',
            content: 'อนุมัติผลการลงทะเบียนเข้าอาคาร ENCO ล่วงหน้าสำเร็จ',
          })

          formApprove.confirmed = false
          formApprove.confirmedRemark = null
          formApprove.rejected = false
          formApprove.rejectedRemark = null
          formApprove.remark = null

          fetchAPI()
        })
        .catch((e) => {
          console.log(e.response) // eslint-disable-line no-console
          const modal = {
            title: 'มีข้อผิดพลาด',
            content: '',
          }

          if (e.response.status === 400) {
            modal.title = e.response.data.message.th
            modal.content = e.response.data.message.th
          } else {
            modal.title = 'อนุมัติไม่สำเร็จ'
            modal.content = e.response.data.message.th
          }

          context.root.$error(modal)
        })
        .then(() => {
          isConfirmLoading.value = false
        })
    }

    function rejected(handleSubmit: any) {
      requireFloorApprove.value = false
      requireDetailApprove.value = true
      console.log('reject')
      console.log(requireFloorApprove.value)
      console.log(requireDetailApprove.value)
      setTimeout(handleSubmit(clickReject), 500)

      requireFloorApprove.value = false
      requireDetailApprove.value = true
    }

    function filterOption(input: any, option: any) {
      const text = option.componentOptions.children[0].text.toLowerCase()
      console.log('text', text)
      return text.includes(input.toLowerCase())
    }

    watch(
      () => props.guid,
      () => {
        if (
          props.guid !== '' &&
          props.guid != null &&
          props.guid !== 'undefined'
        ) {
          fetchAPI()
        }
      }
    )

    watch(
      () => user,
      (v) => {
        formApprove.confirmedBy = v?.displayName || null
        formApprove.rejectedBy = v?.displayName || null
        // if (v?.id) {
        //   return context.root.$axios
        //     .get('Auth/Permission', {})
        //     .then((res) => {
        //       console.log('permission', res.data)
        //     })
        //     .catch((e) => {
        //       console.log(e.response) // eslint-disable-line no-console
        //     })
        // }
      },
      {
        immediate: true,
      }
    )

    const titleCard = computed(() => {
      let title = i18n.t('history.pre_register.user_type')
      title =
        title +
        ' : ' +
        (data === null
          ? i18n.t('history.pre_register.guest')
          : i18n.t('history.pre_register.member'))

      return title
    })

    onMounted(() => {
      requireFloorApprove.value = true
      requireDetailApprove.value = true
      options.floor = []
      Permission()
    })

    // onMounted(() => {
    //   fetchAPI()
    // })
    const hostId = ref(0)
    function Permission() {
      return context.root.$axios
        .get('Auth/Permission', {})
        .then((res) => {
          hostId.value = res.data?.hostId
        })
        .catch(() => {})
    }
    return {
      moment,
      isConfirmLoading,
      data,
      titleCard,
      getCompanyInfo,
      companyData,
      currentLocale,
      options,
      getFloorToApprove,
      form,
      editApproved,
      approved,
      rejected,
      isEdit,
      filterOption,
      errorMessage,
      formApprove,
      floorName,
      getFloorName,
      requireFloorApprove,
      requireDetailApprove,
      clickApprove,
      clickReject,
      getStatus,
      hostId,
      Permission,
    }
  },
})
</script>
