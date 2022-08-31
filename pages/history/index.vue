<template>
  <div>
    <div style="margin-bottom: 25px">
      <NuxtLink class="index_current_2jw3G" to="/"
        ><a-icon type="home" /> Home</NuxtLink
      >
      <!-- <a href="/" class="index_current_2jw3G"><a-icon type="home" /> Home</a
      > -->
      <span>
        <span class="index_arrow_AzRHV"></span>
        <strong class="index_current_2jw3G"> {{ $t('history.title') }} </strong>
      </span>
    </div>
    <!-- <a-divider orientation="center">
      <h1 id="headerregister">{{ $t('history.title') }}</h1>
    </a-divider> -->
    <a-card :bordered="false">
      <div>
        <div class="flex mb-4 justify-items-start">
          <a-row>
            <a-col :xs="{ span: 24 }" :xl="{ span: 24 }">
              <a-range-picker
                v-model="form.dateRange"
                :ranges="{
                  Today: [moment(), moment()],
                  'This Month': [moment(), moment().endOf('month')],
                }"
                format="YYYY/MM/DD"
                @change="onChange"
              />
              <a-select
                style="width: 250px"
                default-value="all"
                @change="handleStatusChange"
              >
                <a-icon slot="suffixIcon" type="flag" />
                <a-select-option value="all"> แสดงทุกสถานะ </a-select-option>
                <!-- <a-select-option value="wait"> รอการอนุมัติ </a-select-option>
                <a-select-option value="pre_approved">
                  อนุมัติ
                </a-select-option>
                <a-select-option value="pre_notapproved">
                  ไม่อนุมัติ
                </a-select-option> -->
                <a-select-option value="work_wait_manager">
                  รอผู้ดูแลโครงการอนุมัติ
                </a-select-option>
                <a-select-option value="work_wait_ocio">
                  รอ DataCenter Manager อนุมัติ
                </a-select-option>
                <a-select-option value="work_manager_notapproved">
                  ผู้ดูแลโครงการไม่อนุมัติ
                </a-select-option>
                <a-select-option value="work_ocio_notapproved">
                  DataCenter Manager ไม่อนุมัติ
                </a-select-option>
                <a-select-option value="work_approved">
                  อนุมัติเข้าปฏิบัติงาน
                </a-select-option>
                <a-select-option value="canceled"> ยกเลิก </a-select-option>
              </a-select>
              <a-select
                style="width: 150px"
                default-value="all"
                @change="handleSystemChange"
              >
                <a-icon slot="suffixIcon" type="flag" />
                <a-select-option value="all"> แสดงทุกระบบ </a-select-option>
                <!-- <a-select-option value="preRegister">
                  PRE REGISTER
                </a-select-option> -->
                <a-select-option value="workPermit">
                  WORK PERMIT
                </a-select-option>
              </a-select>
              <a-input-search
                v-model="form.keyword"
                style="width: 250px"
                :placeholder="$t('history.search_placeholder')"
                enter-button
                @search="onSearch"
              />
            </a-col>
          </a-row>
        </div>
        <div>
          <a-table
            :columns="columns"
            :row-key="(record) => record.guid"
            :data-source="data"
            :pagination="pagination"
            :loading="loading"
            :scroll="{ x: 1024 }"
            @change="handleTableChange"
          >
            <!-- หัวคอลัม -->
            <template v-for="(item, index) in columns" :slot="item.slotName">
              <span :key="index">{{ $t(item.slotName) }}</span>
            </template>
            <template slot="requestDate" slot-scope="requestDate">
              {{ $moment(requestDate).format('DD/MM/YYYY HH:mm') }}
            </template>
            <template slot="statusTag" slot-scope="status, record">
              <a-tag
                v-if="status === 'รอการอนุมัติ' && record.state"
                color="#F39C12"
              >
                {{ status }}
              </a-tag>
              <a-tag
                v-else-if="
                  (status === 'อนุมัติ' ||
                    status === 'อนุมัติเข้าปฏิบัติงาน') &&
                  record.state
                "
                color="#16A085"
              >
                {{ status }}
              </a-tag>
              <a-tag
                v-else-if="
                  (status === 'ไม่อนุมัติ' ||
                    status === 'ผู้ดูแลโครงการไม่อนุมัติ' ||
                    status === 'DataCenter Manager ไม่อนุมัติ') &&
                  record.state
                "
                color="#E74C3C"
              >
                {{ status }}
              </a-tag>
              <a-tag
                v-else-if="status === 'รอผู้ดูแลโครงการอนุมัติ' && record.state"
                color="#2980B9"
              >
                {{ status }}
              </a-tag>
              <a-tag
                v-else-if="
                  status === 'รอ DataCenter Manager อนุมัติ' && record.state
                "
                color="#2C3E50"
              >
                {{ status }}
              </a-tag>
              <a-tag v-else color="#E74C3C"> ยกเลิก </a-tag>
            </template>
            <template slot="systemType" slot-scope="systemType">
              <a-tag v-if="systemType === 'WORK PREMIT'" color="#2db7f5">
                {{ systemType }}
              </a-tag>
              <a-tag v-else color="#48C9B0">
                {{ systemType }}
              </a-tag>
            </template>
            <template slot="userType" slot-scope="userType">
              <a-tag v-if="userType === 'GUEST'" color="cyan">
                {{ userType }}
              </a-tag>
              <a-tag v-else color="purple">
                {{ userType }}
              </a-tag>
            </template>
            <!-- <template slot="operation" slot-scope="text, record">
          <a href="javascript:;" @click="onView(record)">{{
            $t('history.table.btn_view')
          }}</a>
          <a href="javascript:;" @click="onView(record)">{{
            $t('history.table.btn_view')
          }}</a>
        </template> -->
            <template slot="operation" slot-scope="text, record">
              <!--sitemadmin----->
              <div v-if="user.roleId == 7">
                <a-button
                  v-if="record.state"
                  type="primary"
                  icon="check-circle"
                  shape="circle"
                  @click="onView(record)"
                ></a-button>
              </div>
              <div v-else>
                <!-- {{ user }} -->
                <a-button
                  v-if="record.state"
                  type="primary"
                  icon="check-circle"
                  shape="circle"
                  @click="onView(record)"
                ></a-button>
                <a-button
                  v-if="
                    (record.status == 'รอการอนุมัติ' ||
                      record.status == 'รอผู้ดูแลโครงการอนุมัติ') &&
                    record.state
                  "
                  type="danger"
                  icon="stop"
                  shape="circle"
                  @click="cancelRequest(record)"
                ></a-button>

                <a-button
                  v-if="
                    (managerId == null || managerId == 0) &&
                    record.systemType === 'WORK PREMIT' &&
                    record.status != 'อนุมัติเข้าปฏิบัติงาน' &&
                    record.status != 'รอผู้ดูแลโครงการอนุมัติ' &&
                    record.state
                  "
                  type="primary"
                  icon="edit"
                  shape="circle"
                  @click="onEdit(record, true)"
                >
                </a-button>
                <a-button
                  v-if="
                    (record.managerId === managerId ||
                      record.ocioId === managerId) &&
                    false &&
                    record.systemType === 'WORK PREMIT' &&
                    record.status != 'อนุมัติเข้าปฏิบัติงาน' &&
                    record.status != 'รอผู้ดูแลโครงการอนุมัติ' &&
                    record.state
                  "
                  type="primary"
                  icon="edit"
                  shape="circle"
                  @click="onEdit(record, true)"
                >
                  {{ 2 }}</a-button
                >
                <a-button
                  v-if="
                    record.ocioId === managerId &&
                    record.systemType === 'WORK PREMIT' &&
                    record.status === 'อนุมัติเข้าปฏิบัติงาน' &&
                    record.state
                  "
                  type="primary"
                  icon="edit"
                  shape="circle"
                  @click="onEdit(record, false)"
                >
                </a-button>

                <a-button
                  v-if="
                    record.managerId != managerId &&
                    record.ocioId != managerId &&
                    record.systemType === 'WORK PREMIT' &&
                    record.status === 'รอผู้ดูแลโครงการอนุมัติ' &&
                    record.state
                  "
                  type="primary"
                  icon="edit"
                  shape="circle"
                  @click="onEdit(record, false)"
                >
                </a-button>
                <a-button
                  v-if="
                    (user.roleId == 8 ||
                      user.roleId == 0 ||
                      user.roleId == 9) &&
                    record.systemType === 'WORK PREMIT' &&
                    record.status === 'อนุมัติเข้าปฏิบัติงาน' &&
                    record.state
                  "
                  type="danger"
                  icon="undo"
                  shape="circle"
                  @click="rollbackApproved(record)"
                >
                </a-button>
              </div>
            </template>
          </a-table>
        </div>
        <PreRegisterModel
          :visible="modals.preRegister.visible"
          :guid="modals.preRegister.guid"
          @cancel="handleCancelModal"
        />
        <WorkPermitModel
          :visible="modals.workPermit.visible"
          :guid="modals.workPermit.guid"
          @cancel="handleCancelModal"
        />
        <DataCenterModel
          :visible="modals.dataCenter.visible"
          :guid="modals.dataCenter.guid"
          :reset="modals.dataCenter.reset"
          @cancel="handleCancelModal"
        />
        <validation-observer ref="inputForm" v-slot="{ handleSubmit }" slim>
          <a-modal
            v-model="openCancelRequestDialog"
            :title="title"
            :ok-text="$t('role.modal_delete.yes')"
            :ok-button-props="{
              props: { disabled: false, type: 'danger' },
            }"
            :cancel-button-props="{ props: { disabled: false } }"
            :cancel-text="$t('role.modal_delete.no')"
            @ok="handleSubmit(confirmCancelRequest)"
          >
            <div>
              <p class="text-sm font-medium">รายละเอียดคำขอ:</p>
              <p>
                {{ titleCancelRequestText }}
              </p>
              <a-form class="mt-5" :form="form">
                <validation-provider
                  v-slot="{ errors }"
                  :name="$t('role.modal_delete.remark')"
                  rules="required"
                >
                  <a-form-item
                    :validate-status="errors[0] ? 'error' : null"
                    :help="errors[0]"
                    :label="$t('role.modal_delete.remark')"
                    class="mb-3 text-lg font-medium"
                  >
                    <a-textarea
                      v-model="deleteForm.deleteRemark"
                      :placeholder="$t('role.modal_delete.remark')"
                      :rows="4"
                    />
                  </a-form-item>
                </validation-provider>
              </a-form>
            </div>
          </a-modal>
        </validation-observer>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import moment from 'moment'
import natsort from 'natsort'
import PreRegisterModel from '@/components/history/pre-register-model.vue'
import WorkPermitModel from '@/components/history/work-permit-model.vue'
import DataCenterModel from '@/components/history/datacenter-model.vue'

interface MyForm {
  dateTo: any | null
  dateFrom: any | null
  keyword: string | null
  page: number | null
  pageSize: number | null
  dateRange: any | null
  status: string | null
  system: string | null
}
interface Data {
  status: string
  systemType: string
  userType: string
  requestDate: string
  fullName: string
  description: string
  mobile: string
  email: string
  date: string
  time: string
  guid: string
}
interface DeleteForm {
  id: string | null
  deleteRemark: string | null
}
export default defineComponent({
  components: {
    PreRegisterModel,
    WorkPermitModel,
    DataCenterModel,
  },
  setup(_props, context) {
    const {
      $auth: { user },
    } = useContext()
    const form = reactive<MyForm>({
      dateTo: null,
      dateFrom: null,
      keyword: null,
      page: 1,
      pageSize: 10,
      dateRange: null,
      status: null,
      system: null,
    })
    const managerId = ref(0)
    const isShowDetail = ref(false)
    const isConfirmLoading = ref(false)
    const openCancelRequestDialog = ref(false)
    const titleCancelRequestText = ref('')
    const systemType = ref('')
    const title = ref('')
    const deleteForm = reactive<DeleteForm>({
      id: '',
      deleteRemark: '',
    })
    function fetchAPI() {
      // console.log('user', user)
      loading.value = true
      return context.root.$axios
        .post('History/GetHistory', {
          dateFrom: form.dateFrom.format('YYYY-MM-DD'),
          dateTo: form.dateTo.format('YYYY-MM-DD'),
          keyword: form.keyword,
          page: form.page,
          pageSize: form.pageSize,
          status: form.status,
          system: form.system,
        })
        .then((r) => {
          // console.log(r.data.result)
          data.value = r.data.result as Data[]
          pagination.current = r.data.currentPage
          pagination.pageSize = r.data.pageSize
          pagination.total = r.data.rowCount
        })
        .finally(() => {
          loading.value = false
        })
    }
    const modals = reactive({
      preRegister: {
        visible: false,
        guid: '',
      },
      workPermit: {
        visible: false,
        guid: '',
      },
      dataCenter: {
        visible: false,
        guid: '',
        reset: true,
      },
    })
    const sortedInfo = ref<any>(null)
    const columns = [
      {
        slotName: 'history.table.operation',
        dataIndex: 'guid',
        scopedSlots: {
          customRender: 'operation',
          title: 'history.table.operation',
        },
        width: 150,
      },
      {
        slotName: 'history.table.status',
        dataIndex: 'status',
        width: 200,
        scopedSlots: {
          customRender: 'statusTag',
          title: 'history.table.status',
        },
      },
      {
        slotName: 'history.table.system_type',
        dataIndex: 'systemType',
        width: 150,
        scopedSlots: {
          customRender: 'systemType',
          title: 'history.table.system_type',
        },
        filters: [
          { text: 'WORK PREMIT', value: 'WORK PREMIT' },
          // { text: 'PRE REGISTER', value: 'PRE REGISTER' },
        ],
        onFilter: (value: any, record: any) => {
          return record.systemType.includes(value)
        },
        sorter: (a: any, b: any) => {
          const sorter = natsort()
          return sorter(a.systemType, b.systemType)
        },
      },
      {
        slotName: 'history.table.user_type',
        width: 100,
        dataIndex: 'userType',
        onFilter: (value: any, record: any) => record.gender.includes(value),
        sorter: (a: any, b: any) => {
          const sorter = natsort()
          return sorter(a.userType, b.userType)
        },
        ellipsis: true,
        // width: '8%',
        scopedSlots: {
          customRender: 'userType',
          title: 'history.table.user_type',
        },
      },
      {
        slotName: 'history.table.request_date',
        dataIndex: 'requestDate',
        width: 180,
        scopedSlots: {
          customRender: 'requestDate',
          title: 'history.table.request_date',
        },
        sorter: (a: any, b: any) => {
          const sorter = natsort()
          return sorter(a.requestDate, b.requestDate)
        },
      },
      {
        slotName: 'history.table.name',
        dataIndex: 'fullName',
        width: 200,
        key: 'fullName',
        sort: true,
        scopedSlots: {
          title: 'history.table.name',
        },
      },
      {
        slotName: 'history.table.ApproverNameandEmail',
        dataIndex: 'managerNameAndEmail',
        width: 250,
        key: 'managerNameAndEmail',
        sort: true,
        scopedSlots: {
          title: 'history.table.ApproverNameandEmail',
        },
      },
      {
        slotName: 'history.table.DataCenteNameAndEmail',
        dataIndex: 'ocioNameAndEmail',
        width: 250,
        key: 'ocioNameAndEmail',
        sort: true,
        scopedSlots: {
          title: 'history.table.DataCenteNameAndEmail',
        },
      },
      {
        slotName: 'history.table.description',
        dataIndex: 'description',
        key: 'description',
        width: 180,
        scopedSlots: {
          title: 'history.table.description',
        },
      },
      {
        slotName: 'history.table.mobile',
        dataIndex: 'mobile',
        width: 150,
        key: 'mobile',
        scopedSlots: {
          title: 'history.table.mobile',
        },
      },
      // {
      //   title: i18n.t('history.table.email'),
      //   dataIndex: 'email',
      //   key: 'email',
      // },
      {
        slotName: 'history.table.date',
        dataIndex: 'date',
        width: 150,
        key: 'date',
        scopedSlots: {
          title: 'history.table.date',
        },
      },
      {
        slotName: 'history.table.time',
        dataIndex: 'time',
        width: 150,
        key: 'time',
        scopedSlots: {
          title: 'history.table.time',
        },
      },
    ]
    const loading = ref(false)
    const pagination = reactive({
      total: 0,
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
      pageSizeOptions: ['10', '30', '100'],
      position: 'both',
    })
    const data = ref<Data[]>([])
    const endOpen = ref(false)
    function disabledEndDate(v: any) {
      if (!v || !form.dateFrom) {
        return false
      }
      return form.dateFrom.valueOf() > v.valueOf()
    }
    function handleStartOpenChange(open: any) {
      if (!open) {
        endOpen.value = true
      }
    }
    function handleEndOpenChange(open: any) {
      endOpen.value = open
    }
    function onSearch() {
      fetchAPI()
    }
    function handleTableChange(p: any, sorter: any) {
      sortedInfo.value = sorter
      pagination.pageSize = p.pageSize
      pagination.current = p.current
      form.page = pagination.current
      form.pageSize = pagination.pageSize
      fetchAPI()
    }
    function onView(record: typeof data.value[0]) {
      if (record.systemType === 'WORK PREMIT') {
        modals.workPermit.visible = true
        modals.workPermit.guid = record.guid
        fetchAPI()
      } else if (record.systemType === 'PRE REGISTER') {
        modals.preRegister.visible = true
        modals.preRegister.guid = record.guid
        fetchAPI()
      }
    }
    function onEdit(record: typeof data.value[0], reset: boolean) {
      // console.log('DataReCord', record)
      if (record.systemType === 'WORK PREMIT') {
        modals.dataCenter.visible = true
        modals.dataCenter.guid = record.guid
        modals.dataCenter.reset = reset
      } else {
        modals.preRegister.visible = false
        modals.preRegister.guid = ''
        modals.workPermit.visible = false
        modals.workPermit.guid = ''
        modals.dataCenter.visible = false
        modals.dataCenter.guid = ''
      }
    }
    function handleCancelModal(refresh: boolean) {
      // console.log('refresh', refresh)
      modals.preRegister.visible = false
      modals.preRegister.guid = ''
      modals.workPermit.visible = false
      modals.workPermit.guid = ''
      modals.dataCenter.visible = false
      modals.dataCenter.guid = ''
      if (refresh) {
        fetchAPI()
      }
    }
    function closeDetail() {
      isConfirmLoading.value = true
      isShowDetail.value = false
      setTimeout(() => (isConfirmLoading.value = false), 1000)
    }
    function onChange(dates: any) {
      form.dateFrom = dates[0]
      form.dateTo = dates[1]
    }
    function permission() {
      return context.root.$axios
        .get('Auth/Permission', {})
        .then((res) => {
          managerId.value = res.data?.managerId
          // console.log('Your Manager Id: ', managerId.value)
        })
        .catch(() => {})
    }
    function cancelRequest(record: typeof data.value[0]) {
      // console.log('type: ', record.systemType, record.guid)
      systemType.value = record.systemType
      if (record.systemType === 'PRE REGISTER') {
        title.value = 'คุณต้องการยกเลิกคำขอเข้าอาคาร ENCO'
      } else {
        title.value = 'คุณต้องการยกเลิกคำขอเข้าห้อง DATA CENTER'
      }
      deleteForm.id = record.guid
      titleCancelRequestText.value =
        record.description +
        ' ช่วงวันที่ ' +
        record.date +
        ' ช่วงเวลา ' +
        record.time
      openCancelRequestDialog.value = true
    }
    function confirmCancelRequest() {
      // console.log('type: ', systemType.value)
      if (systemType.value === 'PRE REGISTER') {
        return context.root.$axios
          .delete('PreRegister/Register/Cancel', {
            data: { guid: deleteForm.id, remark: deleteForm.deleteRemark },
          })
          .then(() => {
            openCancelRequestDialog.value = false
            titleCancelRequestText.value = ''
            systemType.value = ''
            context.root.$success({
              title: 'ยกเลิกคำขอสำเร็จ',
              content: 'ทำการยกเลิกคำขอเข้าอาคาร ENCO ของคุณเรียบร้อยแล้ว',
            })
            fetchAPI()
          })
          .catch((e: any) => {
            systemType.value = ''
            // console.error('code: ', e.response.status)
            // console.error('response: ', e.response.data) // eslint-disable-line no-console
            const modal = {
              title: 'ยกเลิกคำขอไม่สำเร็จ',
              content: 'กรุณาตรวจสอบข้อมูลและลองใหม่อีกครั้ง',
            }
            context.root.$error(modal)
          })
          .finally(() => {
            title.value = ''
            deleteForm.id = ''
            deleteForm.deleteRemark = ''
            titleCancelRequestText.value = ''
            systemType.value = ''
          })
      } else {
        return context.root.$axios
          .delete('WorkPermit/Register/Cancel', {
            data: { guid: deleteForm.id, remark: deleteForm.deleteRemark },
          })
          .then(() => {
            systemType.value = ''
            openCancelRequestDialog.value = false
            titleCancelRequestText.value = ''
            context.root.$success({
              title: 'ยกเลิกคำขอสำเร็จ',
              content:
                'ทำการยกเลิกคำขอเข้าห้อง DATA CENTER ของคุณเรียบร้อยแล้ว',
            })
            fetchAPI()
          })
          .catch((e: any) => {
            systemType.value = ''
            // console.error('code: ', e.response.status)
            // console.error('response: ', e.response.data) // eslint-disable-line no-console
            const modal = {
              title: 'ยกเลิกคำขอไม่สำเร็จ',
              content: 'กรุณาตรวจสอบข้อมูลและลองใหม่อีกครั้ง',
            }
            context.root.$error(modal)
          })
          .finally(() => {
            systemType.value = ''
            title.value = ''
            deleteForm.id = ''
            deleteForm.deleteRemark = ''
            titleCancelRequestText.value = ''
          })
      }
    }
    function rollbackApproved(record: typeof data.value[0]) {
      context.root.$confirm({
        title: 'คุณต้องการถอยสถานะคำขอเข้าปฏิบัติงาน ?',
        content:
          'หลังจากถอยสถานะแล้ว ผู้ดูแลโครงการจะต้องตรวจสอบข้อมูลและอนุมัติใหม่อีกครั้ง',
        okText: 'ถอยสถานะ',
        okType: 'danger',
        cancelText: 'ยกเลิก',
        onOk() {
          return context.root.$axios
            .put(`WorkPermit/RollbackApproved/${record.guid}`, {})
            .then(() => {
              context.root.$success({
                title: 'ถอยสถานะคำขอสำเร็จ',
                content: 'ทำการถอยสถานะคำขอเข้าห้อง DATA CENTER เรียบร้อยแล้ว',
              })
              fetchAPI()
            })
            .catch((e) => {
              // console.error('code: ', e.response.status)
              // console.error('response: ', e.response.data) // eslint-disable-line no-console
              const modal = {
                title: 'ถอยสถานะคำขอเข้าปฏิบัติงานไม่สำเร็จ',
                content: 'กรุณาตรวจสอบข้อมูลและลองใหม่อีกครั้ง',
              }
              context.root.$error(modal)
            })
            .finally(() => {
              isConfirmLoading.value = false
            })
        },
        onCancel() {
          // console.info('Cancel')
        },
      })
    }
    function handleStatusChange(value: any) {
      if (value === 'all') {
        form.status = ''
      } else if (value === 'canceled') {
        form.status = 'ยกเลิก'
      } else if (value === 'wait') {
        form.status = 'รอการอนุมัติ'
      } else if (value === 'pre_approved') {
        form.status = 'อนุมัติ'
      } else if (value === 'pre_notapproved') {
        form.status = 'ไม่อนุมัติ'
      } else if (value === 'work_wait_manager') {
        form.status = 'รอผู้ดูแลโครงการอนุมัติ'
      } else if (value === 'work_wait_ocio') {
        form.status = 'รอ DataCenter Manager อนุมัติ'
      } else if (value === 'work_manager_notapproved') {
        form.status = 'ผู้ดูแลโครงการไม่อนุมัติ'
      } else if (value === 'work_ocio_notapproved') {
        form.status = 'DataCenter Manager ไม่อนุมัติ'
      } else {
        form.status = 'อนุมัติเข้าปฏิบัติงาน'
      }
    }
    function handleSystemChange(value: any) {
      form.system = value === 'all' ? '' : value
    }
    onMounted(() => {
      form.dateTo = moment().endOf('month')
      form.dateFrom = moment().startOf('month')
      form.page = 1
      form.pageSize = 10
      form.dateRange = [moment().startOf('month'), moment().endOf('month')]
      form.status = 'all'
      form.system = 'all'
      permission()
      fetchAPI()
    })
    return {
      handleStatusChange,
      handleSystemChange,
      rollbackApproved,
      onEdit,
      cancelRequest,
      onChange,
      moment,
      form,
      loading,
      pagination,
      disabledEndDate,
      handleStartOpenChange,
      handleEndOpenChange,
      endOpen,
      columns,
      onSearch,
      handleTableChange,
      data,
      sortedInfo,
      onView,
      handleCancelModal,
      isShowDetail,
      isConfirmLoading,
      closeDetail,
      modals,
      user,
      managerId,
      openCancelRequestDialog,
      titleCancelRequestText,
      title,
      deleteForm,
      confirmCancelRequest,
      user,
    }
  },
})
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
.index_current_2jw3G {
  font-size: larger;
}
.index_arrow_AzRHV {
  display: inline-block;
}
.index_arrow_AzRHV::after {
  display: inline-block;
  content: '·';
  color: #141322;
  font-size: large;
}
[data-kit-theme='dark'] .index_arrow_AzRHV::after {
  color: #141322;
}
#headerregister {
  font-size: x-large;
}
</style>
