<template>
  <div>
    <a-divider orientation="center">
      <h1 id="headerregister">{{ $t('role.title') }}</h1>
    </a-divider>
    <a-card :bordered="false">
      <div>
        <a-row>
          <a-col :xs="{ span: 24 }" :md="{ span: 8 }">
            <a-input-search
              v-model="form.keyword"
              :placeholder="$t('role.search_placeholder')"
              enter-button
              @search="onSearch"
            >
              <a-icon slot="prefix" type="search" /> </a-input-search
          ></a-col>
          <a-col :xs="{ span: 24 }" :md="{ span: 16 }" class="buttonCreate">
            <a-button type="danger" icon="plus-circle" @click="NewRole">{{
              $t('role.new')
            }}</a-button>
          </a-col>
        </a-row>
        <!-- <div class="flex mb-4 justify-between">
        <div class="justify-start w-3/12">
          <a-input-search
            v-model="form.keyword"
            :placeholder="$t('role.search_placeholder')"
            enter-button
            @search="onSearch"
          >
            <a-icon slot="prefix" type="search" />
          </a-input-search>
        </div>
        <div class="justify-end">
          <a-button type="danger" icon="plus-circle" @click="NewRole">{{
            $t('role.new')
          }}</a-button>

        </div>
      </div> -->
        <div>
          <!-- <a-button @click="setAgeSort"> {{ $t('history.approve_btn') }} </a-button> -->
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
            <template slot="createdAt" slot-scope="createdAt">
              {{ $moment(createdAt).format('DD/MM/YYYY HH:mm') }}
            </template>
            <template slot="updatedAt" slot-scope="updatedAt">
              {{
                updatedAt === null
                  ? ''
                  : $moment(updatedAt).format('DD/MM/YYYY HH:mm')
              }}
            </template>
            <template slot="deletedAt" slot-scope="deletedAt">
              {{
                deletedAt === null
                  ? ''
                  : $moment(deletedAt).format('DD/MM/YYYY HH:mm')
              }}
            </template>
            <template slot="statusTag" slot-scope="record">
              <a-tag v-if="record.deletedAt === null" color="#16A085">
                {{ 'ปกติ' }}
              </a-tag>
              <a-tag v-else color="#C0392B">
                {{ 'ยกเลิก' }}
              </a-tag>
            </template>
            <template slot="operation" slot-scope="text, record">
              <a-button
                v-if="record.deletedAt === null"
                type="primary"
                icon="edit"
                shape="circle"
                @click="onView(record, true, true)"
              ></a-button>
              <a-button
                v-else
                type="primary"
                icon="eye"
                shape="circle"
                @click="onView(record, false, true)"
              ></a-button>
              <a-button
                v-if="record.deletedAt === null"
                type="danger"
                icon="delete"
                shape="circle"
                @click="showDeleteConfirm(record)"
              ></a-button>
            </template>
          </a-table>
        </div>
        <validation-observer ref="inputForm" v-slot="{ handleSubmit }" slim>
          <a-modal
            :visible="isShowDetail"
            centered
            :closable="false"
            :mask-closable="false"
            :confirm-loading="isConfirmLoading"
            width="1000px"
          >
            <template slot="footer">
              <a-button
                v-if="canEdit && !canAdd"
                type="primary"
                @click="handleSubmit(updateRole)"
              >
                อัพเดตข้อมูล
              </a-button>
              <a-button
                v-else-if="canEdit && canAdd"
                type="primary"
                @click="handleSubmit(createRole)"
              >
                บันทึกข้อมูล
              </a-button>
              <a-button type="danger" @click="closeDetail">
                ปิดหน้านี้
              </a-button>
            </template>
            <div class="flex">
              <div>
                <font-awesome-icon
                  v-if="!canAdd"
                  :icon="['fad', 'info-circle']"
                  class="text-lg"
                />
                <font-awesome-icon
                  v-else
                  :icon="['fad', 'file-alt']"
                  class="text-lg"
                />
              </div>
              <div class="flex-1 ml-2">
                <div v-if="!canAdd" class="mb-3 text-xl font-bold">
                  {{ $t('role.detail.title') }}
                </div>
                <div v-else class="mb-3 text-xl font-bold">
                  {{ $t('role.detail.title_create') }}
                </div>
                <a-form class="mt-5" :form="form">
                  <a-card :title="$t('role.detail.role')">
                    <div v-if="canEdit && canView">
                      <validation-provider
                        v-slot="{ errors }"
                        :name="$t('role.detail.name')"
                        rules="required"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('role.detail.name')"
                          class="mb-3"
                        >
                          <a-input
                            v-model="roleData.name"
                            :placeholder="$t('role.detail.name')"
                          />
                        </a-form-item>
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        :name="$t('role.detail.description')"
                        rules="required"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('role.detail.description')"
                          class="mb-3"
                        >
                          <a-input
                            v-model="roleData.description"
                            :placeholder="$t('role.detail.description')"
                          />
                        </a-form-item>
                      </validation-provider>
                    </div>
                    <div v-else-if="!canEdit && canView">
                      <a-descriptions
                        :title="$t('role.detail.role_detail')"
                        layout="vertical"
                      >
                        <a-descriptions-item :label="$t('role.detail.name')">
                          {{ roleData ? roleData.name : '' }}
                        </a-descriptions-item>
                        <a-descriptions-item
                          :label="$t('role.detail.description')"
                        >
                          {{ roleData ? roleData.description : '' }}
                        </a-descriptions-item>
                        <a-descriptions-item :label="$t('role.detail.id')">
                          {{ roleData ? roleData.id : '' }}
                        </a-descriptions-item>
                        <a-descriptions-item :label="$t('role.detail.create')">
                          {{
                            roleData
                              ? $moment(roleData.createdAt).format(
                                  'DD/MM/YYYY HH:mm'
                                )
                              : ''
                          }}
                        </a-descriptions-item>
                        <a-descriptions-item
                          :label="$t('role.detail.create_by')"
                        >
                          {{ roleData ? roleData.createdBy : '' }}
                        </a-descriptions-item>
                      </a-descriptions>
                    </div>
                  </a-card>
                  <a-card :title="$t('role.detail.permission')">
                    <a-row :gutter="16">
                      <a-col :span="8">
                        <a-card title="ลงทะเบียน" :bordered="false">
                          <a-col :span="24">
                            <a-checkbox
                              v-model="roleData.permissions.register.enco"
                              :checked="
                                roleData.permissions !== undefined &&
                                roleData.permissions !== null
                                  ? roleData.permissions.register.enco
                                  : false
                              "
                              name="enco"
                              :disabled="canView && !canEdit"
                            >
                              อาคาร Enco
                            </a-checkbox>
                          </a-col>
                          <a-col :span="24">
                            <a-checkbox
                              v-model="roleData.permissions.register.dataCenter"
                              :checked="
                                roleData.permissions !== undefined &&
                                roleData.permissions !== null
                                  ? roleData.permissions.register.dataCenter
                                  : false
                              "
                              name="dataCenter"
                              :disabled="canView && !canEdit"
                            >
                              ห้อง Data Center
                            </a-checkbox>
                          </a-col>
                        </a-card>
                      </a-col>
                      <a-col :span="8">
                        <a-card title="ประวัติการลงทะเบียน" :bordered="false">
                          <a-col :span="24">
                            <a-checkbox
                              v-model="roleData.permissions.history"
                              :checked="
                                roleData.permissions !== undefined &&
                                roleData.permissions !== null
                                  ? roleData.permissions.history
                                  : false
                              "
                              name="history"
                              :disabled="canView && !canEdit"
                            >
                              ประวัติการลงทะเบียน
                            </a-checkbox>
                          </a-col>
                        </a-card>
                      </a-col>
                      <a-col :span="8">
                        <a-card title="รายงาน" :bordered="false">
                          <a-col :span="24">
                            <a-checkbox
                              v-model="roleData.permissions.report.summary"
                              :checked="
                                roleData.permissions !== undefined &&
                                roleData.permissions !== null
                                  ? roleData.permissions.report.summary
                                  : false
                              "
                              name="summary"
                              :disabled="canView && !canEdit"
                            >
                              รายงานภาพรวมระบบ
                            </a-checkbox>
                          </a-col>
                          <a-col :span="24">
                            <a-checkbox
                              v-model="
                                roleData.permissions.report.checkinCheckout
                              "
                              :checked="
                                roleData.permissions !== undefined &&
                                roleData.permissions !== null
                                  ? roleData.permissions.report.checkinCheckout
                                  : false
                              "
                              name="checkinCheckout"
                              :disabled="canView && !canEdit"
                            >
                              รายงานสรุป เข้า-ออก
                            </a-checkbox>
                          </a-col>
                          <a-col :span="24">
                            <a-checkbox
                              v-model="roleData.permissions.report.daily"
                              :checked="
                                roleData.permissions !== undefined &&
                                roleData.permissions !== null
                                  ? roleData.permissions.report.daily
                                  : false
                              "
                              name="daily"
                              :disabled="canView && !canEdit"
                            >
                              รายงานเข้า-ออก ประจำวัน
                            </a-checkbox>
                          </a-col>
                        </a-card>
                      </a-col>
                    </a-row>
                    <a-row :gutter="16">
                      <a-col :span="8">
                        <a-card title="จัดการผู้ใช้งาน" :bordered="false">
                          <a-col :span="24">
                            <a-checkbox
                              v-model="roleData.permissions.account.user"
                              :checked="
                                roleData.permissions !== undefined &&
                                roleData.permissions !== null
                                  ? roleData.permissions.account.user
                                  : false
                              "
                              name="user"
                              :disabled="canView && !canEdit"
                            >
                              ผู้ใช้งาน
                            </a-checkbox>
                          </a-col>
                          <a-col :span="24">
                            <a-checkbox
                              v-model="roleData.permissions.account.role"
                              :checked="
                                roleData.permissions !== undefined &&
                                roleData.permissions !== null
                                  ? roleData.permissions.account.role
                                  : false
                              "
                              name="role"
                              :disabled="canView && !canEdit"
                            >
                              บทบาท
                            </a-checkbox>
                          </a-col>
                        </a-card>
                      </a-col>
                      <a-col :span="8">
                        <a-card title="ข้อมูลระบบ" :bordered="false">
                          <a-col :span="24">
                            <a-checkbox
                              v-model="roleData.permissions.master.visitor"
                              :checked="
                                roleData.permissions !== undefined &&
                                roleData.permissions !== null
                                  ? roleData.permissions.master.visitor
                                  : false
                              "
                              name="visitor"
                              :disabled="canView && !canEdit"
                            >
                              ผู้ติดต่อ
                            </a-checkbox>
                          </a-col>
                          <a-col :span="24">
                            <a-checkbox
                              v-model="roleData.permissions.master.card"
                              :checked="
                                roleData.permissions !== undefined &&
                                roleData.permissions !== null
                                  ? roleData.permissions.master.card
                                  : false
                              "
                              name="card"
                              :disabled="canView && !canEdit"
                            >
                              ข้อมูลบัตรแลกเข้า
                            </a-checkbox>
                          </a-col>
                          <a-col :span="24">
                            <a-checkbox
                              v-model="roleData.permissions.master.building"
                              :checked="
                                roleData.permissions !== undefined &&
                                roleData.permissions !== null
                                  ? roleData.permissions.master.building
                                  : false
                              "
                              name="building"
                              :disabled="canView && !canEdit"
                            >
                              ข้อมูลอาคาร/ตึก
                            </a-checkbox>
                          </a-col>
                          <a-col :span="24">
                            <a-checkbox
                              v-model="roleData.permissions.master.floor"
                              :checked="
                                roleData.permissions !== undefined &&
                                roleData.permissions !== null
                                  ? roleData.permissions.master.floor
                                  : false
                              "
                              name="floor"
                              :disabled="canView && !canEdit"
                            >
                              ข้อมูลชั้น
                            </a-checkbox>
                          </a-col>
                          <a-col :span="24">
                            <a-checkbox
                              v-model="roleData.permissions.master.company"
                              :checked="
                                roleData.permissions !== undefined &&
                                roleData.permissions !== null
                                  ? roleData.permissions.master.company
                                  : false
                              "
                              name="company"
                              :disabled="canView && !canEdit"
                            >
                              ข้อมูลบริษัท
                            </a-checkbox>
                          </a-col>
                          <a-col :span="24">
                            <a-checkbox
                              v-model="roleData.permissions.master.objective"
                              :checked="
                                roleData.permissions !== undefined &&
                                roleData.permissions !== null
                                  ? roleData.permissions.master.objective
                                  : false
                              "
                              name="objective"
                              :disabled="canView && !canEdit"
                            >
                              ข้อมูลวัตถุประสงค์
                            </a-checkbox>
                          </a-col>
                          <a-col :span="24">
                            <a-checkbox
                              v-model="roleData.permissions.master.country"
                              :checked="
                                roleData.permissions !== undefined &&
                                roleData.permissions !== null
                                  ? roleData.permissions.master.country
                                  : false
                              "
                              name="country"
                              :disabled="canView && !canEdit"
                            >
                              ข้อมูลประเทศ
                            </a-checkbox>
                          </a-col>
                        </a-card>
                      </a-col>
                      <a-col :span="8"> </a-col>
                    </a-row>
                  </a-card>
                </a-form>
              </div>
            </div>
          </a-modal>
          <a-modal
            v-model="isShowPopupDelete"
            :title="popupDeleteTitle"
            :ok-text="$t('role.modal_delete.yes')"
            :ok-button-props="{
              props: { disabled: false, type: 'danger' },
            }"
            :cancel-button-props="{ props: { disabled: false } }"
            :cancel-text="$t('role.modal_delete.no')"
            @ok="handleSubmit(confirmDelete)"
          >
            <div>
              <p>{{ popupDeleteContent }}</p>
              <a-form
                class="mt-5"
                :form="form"
                @submit.prevent="handleSubmit(confirmDelete)"
              >
                <validation-provider
                  v-slot="{ errors }"
                  :name="$t('account.profile.email_account')"
                  rules="required"
                >
                  <a-form-item
                    :validate-status="errors[0] ? 'error' : null"
                    :help="errors[0]"
                    :label="$t('role.modal_delete.remark')"
                    class="mb-3"
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
} from '@nuxtjs/composition-api'
import moment from 'moment'
// import { Modal } from 'ant-design-vue'

interface MyForm {
  keyword: string | null
  page: number | null
  pageSize: number | null
}

interface DeleteForm {
  id: number | null
  deleteRemark: string | null
}

interface Data {
  id: number | null
  name: string | null
  description: string | null
  displayName: string | null
  createdAt: Date | null
  createdBy: string | null
  updatedAt: Date | null
  updatedBy: string | number
  deleteRemark: string | null
  deletedAt: Date | null
  deletedBy: string | null
}

interface RoleRegister {
  active: boolean
  enco: boolean
  dataCenter: boolean
}

interface RoleReport {
  active: boolean
  summary: boolean
  checkinCheckout: boolean
  daily: boolean
}

interface RoleAccount {
  active: boolean
  user: boolean
  role: boolean
}

interface RoleMaster {
  active: boolean
  visitor: boolean
  card: boolean
  building: boolean
  floor: boolean
  company: boolean
  objective: boolean
  country: boolean
}

interface RolePermission {
  id: number | null
  register: RoleRegister | null
  history: boolean
  report: RoleReport | null
  account: RoleAccount | null
  master: RoleMaster | null
}

interface RoleForm {
  id: number | null
  name: string | null
  description: string | null
  createdAt: Date | null
  createdBy: string | null
  updatedAt: Date | null
  updatedBy: string | null
  deleteRemark: string | null
  deletedAt: Date | null
  deletedBy: string | null
  permissions: RolePermission | null
}

export default defineComponent({
  setup(_props, context) {
    // const {
    //   app: { i18n },
    // } = useContext()

    const form = reactive<MyForm>({
      keyword: null,
      page: 1,
      pageSize: 10,
    })
    const deleteForm = reactive<DeleteForm>({
      id: null,
      deleteRemark: '',
    })
    const isShowPopupDelete = ref(false)
    const popupDeleteContent = ref('')
    const popupDeleteTitle = ref('')
    const isRequired = ref(false)
    const isShowDetail = ref(false)
    const canView = ref(false)
    const canEdit = ref(false)
    const canAdd = ref(false)
    const isConfirmLoading = ref(false)
    function fetchAPI() {
      loading.value = true

      return context.root.$axios
        .post('Role/GetRoles', {
          keyword: form.keyword,
          page: form.page,
          pageSize: form.pageSize,
        })
        .then((r) => {
          data.value = r.data.result as Data[]
          pagination.current = r.data.currentPage
          pagination.pageSize = r.data.pageSize
          pagination.total = r.data.rowCount
        })
        .finally(() => {
          loading.value = false
        })
    }

    const sortedInfo = ref<any>(null)
    const columns = [
      {
        slotName: 'role.table.operation',
        dataIndex: 'operation',
        key: 'operation',
        scopedSlots: {
          customRender: 'operation',
          title: 'role.table.operation',
        },
        align: 'center',
      },
      {
        slotName: 'role.table.id',
        dataIndex: 'id',
        scopedSlots: { customRender: 'id', title: 'role.table.id' },
        align: 'center',
        key: 'id',
      },
      {
        slotName: 'role.table.name',
        dataIndex: 'name',
        scopedSlots: { customRender: 'name', title: 'role.table.name' },
        align: 'left',
        key: 'name',
      },
      {
        slotName: 'role.table.description',
        dataIndex: 'description',
        key: 'description',
        align: 'left',
        scopedSlots: {
          title: 'role.table.description',
        },
      },
      {
        slotName: 'role.table.created_at',
        dataIndex: 'createdAt',
        scopedSlots: {
          customRender: 'createdAt',
          title: 'role.table.created_at',
        },
        align: 'center',
        key: 'createdAt',
      },
      {
        slotName: 'role.table.created_by',
        dataIndex: 'createdBy',
        key: 'createdBy',
        align: 'center',
        scopedSlots: {
          title: 'role.table.created_by',
        },
      },
      {
        slotName: 'role.table.updated_at',
        dataIndex: 'updatedAt',
        scopedSlots: {
          customRender: 'updatedAt',
          title: 'role.table.updated_at',
        },
        align: 'center',
        key: 'updatedAt',
      },
      {
        slotName: 'role.table.updated_by',
        dataIndex: 'updatedBy',
        key: 'updatedBy',
        align: 'center',
        scopedSlots: {
          title: 'role.table.updated_by',
        },
      },
      {
        slotName: 'role.table.deleted_at',
        dataIndex: 'deletedAt',
        scopedSlots: {
          customRender: 'deletedAt',
          title: 'role.table.deleted_at',
        },
        align: 'center',
      },
      {
        slotName: 'role.table.deleted_by',
        dataIndex: 'deletedBy',
        key: 'deletedBy',
        align: 'center',
        scopedSlots: { title: 'role.table.deleted_by' },
      },
      {
        slotName: 'role.table.deleted_remark',
        dataIndex: 'deleteRemark',
        key: 'deleteRemark',
        align: 'center',
        scopedSlots: { title: 'role.table.deleted_remark' },
      },
      {
        slotName: 'role.table.status',
        scopedSlots: { customRender: 'statusTag', title: 'role.table.status' },
        // sorter: (a: any, b: any) => a.dob.age - b.dob.age,
        // sortOrder: sortedInfo.columnKey === 'systemType' && sortedInfo.order,
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
    const roleData = ref<RoleForm>({
      id: 0,
      name: '',
      description: '',
      createdAt: null,
      createdBy: null,
      updatedAt: null,
      updatedBy: null,
      deleteRemark: null,
      deletedAt: null,
      deletedBy: null,
      permissions: {
        id: null,
        register: {
          active: false,
          enco: false,
          dataCenter: false,
        },
        history: false,
        report: {
          active: false,
          summary: false,
          checkinCheckout: false,
          daily: false,
        },
        account: {
          active: false,
          user: false,
          role: false,
        },
        master: {
          active: false,
          visitor: false,
          card: false,
          building: false,
          floor: false,
          company: false,
          objective: false,
          country: false,
        },
      },
    })

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

    function NewRole() {
      isConfirmLoading.value = false
      canView.value = true
      canEdit.value = true
      canAdd.value = true
      roleData.value = {
        id: 0,
        name: '',
        description: '',
        createdAt: null,
        createdBy: null,
        updatedAt: null,
        updatedBy: null,
        deleteRemark: null,
        deletedAt: null,
        deletedBy: null,
        permissions: {
          id: null,
          register: {
            active: false,
            enco: false,
            dataCenter: false,
          },
          history: false,
          report: {
            active: false,
            summary: false,
            checkinCheckout: false,
            daily: false,
          },
          account: {
            active: false,
            user: false,
            role: false,
          },
          master: {
            active: false,
            visitor: false,
            card: false,
            building: false,
            floor: false,
            company: false,
            objective: false,
            country: false,
          },
        },
      }
      isShowDetail.value = true
    }

    function onView(
      record: typeof data.value[0],
      edit: boolean,
      view: boolean
    ) {
      return context.root.$axios
        .get(`Role/AccountRolePermission/${record.id}`, {})
        .then((res: any) => {
          roleData.value = res.data as RoleForm
          if (roleData.value.permissions === null) {
            roleData.value.permissions = {
              id: roleData.value.id,
              register: {
                active: false,
                enco: false,
                dataCenter: false,
              },
              history: false,
              report: {
                active: false,
                summary: false,
                checkinCheckout: false,
                daily: false,
              },
              account: {
                active: false,
                user: false,
                role: false,
              },
              master: {
                active: false,
                visitor: false,
                card: false,
                building: false,
                floor: false,
                company: false,
                objective: false,
                country: false,
              },
            }
          }
          canView.value = view
          canEdit.value = edit
          isShowDetail.value = true
          isConfirmLoading.value = false
        })
        .catch((e: any) => {
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
          // isConfirmLoading.value = false
        })
    }

    function handleCancelModal(refresh: boolean) {
      if (refresh) {
        fetchAPI()
      }
    }

    function closeDetail() {
      isConfirmLoading.value = true
      isShowDetail.value = false
    }

    function showDeleteConfirm(record: typeof data.value[0]) {
      popupDeleteContent.value =
        record.description === null ? '' : record.description
      popupDeleteTitle.value = 'ต้องการยกเลิก Role ' + record.name + ' ?'
      isShowPopupDelete.value = true
      deleteForm.id = data.value[0].id
    }

    function confirmDelete() {
      return context.root.$axios
        .delete('Role/Delete', {
          data: { id: deleteForm.id, deleteRemark: deleteForm.deleteRemark },
        })
        .then(() => {
          isShowPopupDelete.value = false
          popupDeleteContent.value = ''
          popupDeleteTitle.value = ''
          context.root.$success({
            title: 'ยกเลิกสำเร็จ',
            content: 'ทำการยกเลิก Role เรียบร้อยแล้ว',
          })
          fetchAPI()
        })
        .catch((e: any) => {
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
          // isConfirmLoading.value = false
        })
    }

    function createRole() {
      console.log('role: ', roleData.value)
      isConfirmLoading.value = true
      return context.root.$axios
        .post('Role/CreateAccountRolePermission', roleData.value)
        .then(() => {
          context.root.$success({
            title: 'บันทึกสำเร็จ',
            content: 'สร้างบทบาทใหม่เรียบร้อยแล้ว',
          })
          fetchAPI()
          canAdd.value = false
          canView.value = false
          canEdit.value = false
          isConfirmLoading.value = false
          isShowDetail.value = false
        })
        .catch((e: any) => {
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
          // isConfirmLoading.value = false
        })
    }

    function updateRole() {
      console.log('role: ', roleData.value)
      isConfirmLoading.value = true
      return context.root.$axios
        .put('Role/UpdateAccountRolePermission', roleData.value)
        .then(() => {
          context.root.$success({
            title: 'บันทึกสำเร็จ',
            content: 'อัพเดตข้อมูลบทบาทเรียบร้อยแล้ว',
          })
          fetchAPI()
          canAdd.value = false
          canView.value = false
          canEdit.value = false
          isConfirmLoading.value = false
          isShowDetail.value = false
        })
        .catch((e: any) => {
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
          // isConfirmLoading.value = false
        })
    }

    onMounted(() => {
      form.page = 1
      form.pageSize = 10
      fetchAPI()
    })

    return {
      moment,
      form,
      deleteForm,
      loading,
      pagination,
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
      roleData,
      isRequired,
      showDeleteConfirm,
      popupDeleteContent,
      popupDeleteTitle,
      isShowPopupDelete,
      confirmDelete,
      canView,
      canEdit,
      canAdd,
      NewRole,
      createRole,
      updateRole,
    }
  },
})
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
.buttonCreate {
  display: flex;
  justify-content: flex-end;
}
#headerregister {
  font-size: x-large;
}
</style>
