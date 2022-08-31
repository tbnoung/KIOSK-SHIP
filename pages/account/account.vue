<template>
  <div>
    <a-divider orientation="center">
      <h1 id="headerregister">{{ $t('account.title') }}</h1>
    </a-divider>
    <a-card :bordered="false">
      <div>
        <div class="flex mb-4 justify-items-start">
          <a-input-search
            v-model="form.keyword"
            :placeholder="$t('account.search_placeholder')"
            enter-button
            class="w-72"
            @search="onSearch"
          />
        </div>
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
            <template slot="id" slot-scope="id">
              <a-tag class="text-sm" color="#34495E"> {{ id }} </a-tag>
            </template>
            <template slot="createdAt" slot-scope="createdAt">
              {{ $moment(createdAt).format('DD/MM/YYYY HH:mm') }}
            </template>
            <template slot="verifyAccount" slot-scope="verifyAccount">
              <a-tag v-if="verifyAccount" class="text-sm" color="#28B463">
                VERIFIED
              </a-tag>
              <a-tag v-else class="text-sm" color="#E74C3C"> PENDING </a-tag>
            </template>
            <template slot="vip" slot-scope="vip">
              <a-tag v-if="vip" class="text-sm" color="#F39C12"
                ><a-icon type="star" /> VIP
              </a-tag>
              <a-tag v-else class="text-sm" color="#5D6D7E"> LOCAL </a-tag>
            </template>
            <template slot="banned" slot-scope="banned">
              <a-tag v-if="banned" class="text-sm" color="#E74C3C">
                BANNED
              </a-tag>
              <a-tag v-else class="text-sm" color="#28B463"> AVAILBLE </a-tag>
            </template>
            <template slot="displayImg" slot-scope="displayImg">
              <img
                v-if="displayImg !== null ? true : false"
                slot="cover"
                :src="displayImg"
              />
              <img v-else slot="cover" src="image-not-available.png" />
            </template>
            <template slot="operation" slot-scope="text, record">
              <a-button
                type="primary"
                icon="form"
                shape="circle"
                @click="onView(record)"
              ></a-button>
              <!-- <a-button
            type="danger"
            icon="crown"
            shape="circle"
            @click="onView(record)"
          ></a-button> -->
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
            width="1200px"
          >
            <template slot="footer">
              <a-button type="primary" @click="handleSubmit(showPropsConfirm)">
                อัพเดตโปรไฟล์
              </a-button>
              <a-button type="danger" @click="closeDetail">
                ปิดหน้านี้
              </a-button>
            </template>
            <div>
              <a-form
                class="mt-5"
                :form="form"
                :label-col="{ xs: { span: 24 }, lg: { span: 8 } }"
                :wrapper-col="{ xs: { span: 24 }, lg: { span: 16 } }"
              >
                <div class="flex-1 ml-2">
                  <a-row :gutter="24">
                    <a-col :span="10">
                      <a-card
                        title="รูปโปรไฟล์"
                        :bordered="false"
                        style="width: 100%"
                      >
                        <div align="center" class="mb-5">
                          <img
                            slot="cover"
                            alt=""
                            :src="
                              accountData
                                ? accountData.displayImg
                                : 'image-not-available.png'
                            "
                            style="width: 250px"
                          />
                        </div>
                        <a-card-meta title="รูปโปรไฟล์" class="mb-5">
                          <template slot="description">
                            <a-upload-dragger
                              list-type="picture"
                              :multiple="false"
                              :file-list="fileLists"
                              :before-upload="beforeUpload"
                              :remove="handleRemove"
                              action="http://vms-poc.pttdigital.com/dev_api/"
                              @change="handleChange"
                            >
                              <p class="ant-upload-drag-icon">
                                <a-icon type="inbox" />
                              </p>
                              <p class="ant-upload-text">
                                {{ $t('UserMenu.PicUploadTile') }}
                              </p>
                              <p class="ant-upload-hint">
                                {{ $t('UserMenu.PicUploadSubTile') }}
                              </p>
                            </a-upload-dragger>
                          </template>
                        </a-card-meta>
                        <validation-provider
                          v-slot="{ errors }"
                          :name="$t('account.profile.email_account')"
                          rules="required"
                        >
                          <a-form-item
                            :validate-status="errors[0] ? 'error' : null"
                            :help="errors[0]"
                            :label="$t('account.profile.email_account')"
                            class="mb-3"
                          >
                            <a-input
                              v-model="accountData.emailAccount"
                              :placeholder="$t('account.profile.email_account')"
                            />
                          </a-form-item>
                        </validation-provider>
                        <validation-provider
                          v-slot="{ errors }"
                          :name="$t('account.profile.username')"
                        >
                          <a-form-item
                            :validate-status="errors[0] ? 'error' : null"
                            :help="errors[0]"
                            :label="$t('account.profile.username')"
                            class="mb-3"
                          >
                            <a-input
                              v-model="accountData.username"
                              :placeholder="$t('account.profile.username')"
                            />
                          </a-form-item>
                        </validation-provider>
                        <validation-provider
                          v-slot="{ errors }"
                          :name="$t('account.profile.lasted_login')"
                        >
                          <a-form-item
                            :validate-status="errors[0] ? 'error' : null"
                            :help="errors[0]"
                            :label="$t('account.profile.lasted_login')"
                            class="mb-3"
                          >
                            <a-date-picker
                              v-model="accountData.lastedLogin"
                              :default-value="
                                moment('2015/01/01', 'DD/MM/YYYY')
                              "
                              :format="`DD/MM/YYYY`"
                              disabled
                            />
                            <!-- <a-time-picker
                        v-model="accountData.lastedLogin"
                        :default-value="moment('12:08:23', 'HH:mm:ss')"
                        disabled
                      /> -->
                          </a-form-item>
                        </validation-provider>
                        <!-- <validation-provider
                      v-slot="{ errors }"
                      :name="$t('account.profile.verify_account')"
                    >
                      <a-form-item
                        :validate-status="errors[0] ? 'error' : null"
                        :help="errors[0]"
                        :label="$t('account.profile.verify_account')"
                        class="mb-3"
                      >
                        <a-tag v-if="accountData.verifyAccount" color="#28B463">
                          VERIFIED
                        </a-tag>
                        <a-tag v-else color="#E74C3C"> PENDING </a-tag>
                      </a-form-item>
                    </validation-provider> -->
                        <validation-provider
                          v-slot="{ errors }"
                          :name="$t('account.profile.vip')"
                        >
                          <a-form-item
                            :validate-status="errors[0] ? 'error' : null"
                            :help="errors[0]"
                            :label="$t('account.profile.vip')"
                            class="mb-3"
                          >
                            <a-radio-group
                              v-model="accountData.verifyAccount"
                              name="rdoverifyAccount"
                            >
                              <a-radio :value="false">
                                <a-tag color="#E74C3C"
                                  ><a-icon type="star" /> PENDING
                                </a-tag>
                              </a-radio>
                              <a-radio :value="true"
                                ><a-tag color="#28B463"
                                  ><a-icon type="user" /> VERIFIED
                                </a-tag></a-radio
                              >
                            </a-radio-group>
                          </a-form-item>
                        </validation-provider>
                        <validation-provider
                          v-slot="{ errors }"
                          :name="$t('account.profile.verify_token')"
                        >
                          <a-form-item
                            :validate-status="errors[0] ? 'error' : null"
                            :help="errors[0]"
                            :label="$t('account.profile.verify_token')"
                            class="mb-3"
                          >
                            <a-input
                              v-model="accountData.verifyToken"
                              :placeholder="$t('account.profile.verify_token')"
                              disabled
                            />
                          </a-form-item>
                        </validation-provider>
                        <validation-provider
                          v-slot="{ errors }"
                          :name="$t('account.profile.vip')"
                        >
                          <a-form-item
                            :validate-status="errors[0] ? 'error' : null"
                            :help="errors[0]"
                            :label="$t('account.profile.vip')"
                            class="mb-3"
                          >
                            <!-- <a-tag v-if="accountData.vip" color="#F39C12"
                          ><a-icon type="star" /> VIP
                        </a-tag> -->
                            <a-radio-group
                              v-model="accountData.vip"
                              name="rdoVip"
                            >
                              <a-radio :value="true">
                                <a-tag color="#F39C12"
                                  ><a-icon type="star" /> VIP
                                </a-tag>
                              </a-radio>
                              <a-radio :value="false"
                                ><a-tag color="#5D6D7E"
                                  ><a-icon type="user" /> LOCAL
                                </a-tag></a-radio
                              >
                            </a-radio-group>
                          </a-form-item>
                        </validation-provider>
                        <validation-provider
                          v-slot="{ errors }"
                          :name="$t('account.profile.vip_date')"
                        >
                          <a-form-item
                            :validate-status="errors[0] ? 'error' : null"
                            :help="errors[0]"
                            :label="$t('account.profile.vip_date')"
                            class="mb-3"
                          >
                            <a-date-picker
                              v-model="accountData.vipDate"
                              :default-value="
                                moment('2015/01/01', 'DD/MM/YYYY')
                              "
                              :format="`DD/MM/YYYY`"
                              disabled
                            />
                            <!-- <a-time-picker
                        v-model="accountData.lastedLogin"
                        :default-value="moment('12:08:23', 'HH:mm:ss')"
                        disabled
                      /> -->
                          </a-form-item>
                        </validation-provider>
                        <validation-provider
                          v-slot="{ errors }"
                          :name="$t('account.profile.banned')"
                        >
                          <a-form-item
                            :validate-status="errors[0] ? 'error' : null"
                            :help="errors[0]"
                            :label="$t('account.profile.banned')"
                            class="mb-3"
                          >
                            <!-- <a-tag v-if="accountData.banned" color="#E74C3C">
                          BANNED
                        </a-tag>
                        <a-tag v-else color="#2E86C1"> NO </a-tag> -->
                            <a-radio-group
                              v-model="accountData.banned"
                              name="rdoBanned"
                            >
                              <a-radio :value="false"
                                ><a-tag color="#28B463"
                                  ><a-icon type="smile" /> ACTIVED
                                </a-tag></a-radio
                              >
                              <a-radio :value="true">
                                <a-tag color="#E74C3C"
                                  ><a-icon type="meh" /> BANNED
                                </a-tag>
                              </a-radio>
                            </a-radio-group>
                          </a-form-item>
                        </validation-provider>
                        <validation-provider
                          v-slot="{ errors }"
                          :name="$t('account.profile.banned_date')"
                        >
                          <a-form-item
                            :validate-status="errors[0] ? 'error' : null"
                            :help="errors[0]"
                            :label="$t('account.profile.banned_date')"
                            class="mb-3"
                          >
                            <a-date-picker
                              v-model="accountData.bannedDate"
                              :default-value="
                                moment('2015/01/01', 'DD/MM/YYYY')
                              "
                              :format="`DD/MM/YYYY`"
                            />
                            <!-- <a-time-picker
                        v-model="accountData.lastedLogin"
                        :default-value="moment('12:08:23', 'HH:mm:ss')"
                        disabled
                      /> -->
                          </a-form-item>
                        </validation-provider>
                        <validation-provider
                          v-slot="{ errors }"
                          :name="$t('account.profile.role')"
                          rules="required"
                        >
                          <a-form-item
                            :validate-status="errors[0] ? 'error' : null"
                            :help="errors[0]"
                            :label="$t('account.profile.role')"
                            class="mb-3"
                          >
                            <a-select
                              v-model="accountData.roleId"
                              :placeholder="$t('account.profile.role')"
                              class="w-full"
                              label="name"
                              track-by="id"
                              show-search
                              :filter-option="filterOption"
                            >
                              <a-icon slot="suffixIcon" type="info-circle" />
                              <a-select-option
                                v-for="obj in options.role"
                                :key="obj.name"
                                :value="obj.id"
                              >
                                {{ obj.name }}
                              </a-select-option>
                            </a-select>
                          </a-form-item>
                        </validation-provider>
                      </a-card>
                    </a-col>
                    <a-col :span="14">
                      <a-card title="โปรไฟล์ของคุณ" :bordered="false">
                        <a-card title="ข้อมูลส่วนตัว">
                          <validation-provider
                            v-slot="{ errors }"
                            :name="$t('account.profile.firstname_th')"
                          >
                            <a-form-item
                              :validate-status="errors[0] ? 'error' : null"
                              :help="errors[0]"
                              :label="$t('account.profile.firstname_th')"
                              class="mb-3"
                            >
                              <a-input
                                v-model="accountData.firstnameTh"
                                :placeholder="
                                  $t('account.profile.firstname_th')
                                "
                              />
                            </a-form-item>
                          </validation-provider>
                          <validation-provider
                            v-slot="{ errors }"
                            :name="$t('account.profile.lastname_th')"
                          >
                            <a-form-item
                              :validate-status="errors[0] ? 'error' : null"
                              :help="errors[0]"
                              :label="$t('account.profile.lastname_th')"
                              class="mb-3"
                            >
                              <a-input
                                v-model="accountData.lastnameTh"
                                :placeholder="$t('account.profile.lastname_th')"
                              />
                            </a-form-item>
                          </validation-provider>
                          <validation-provider
                            v-slot="{ errors }"
                            :name="$t('account.profile.firstname_en')"
                            rules="alpha"
                          >
                            <a-form-item
                              :validate-status="errors[0] ? 'error' : null"
                              :help="errors[0]"
                              :label="$t('account.profile.firstname_en')"
                              class="mb-3"
                            >
                              <a-input
                                v-model="accountData.firstnameEn"
                                :placeholder="
                                  $t('account.profile.firstname_en')
                                "
                              />
                            </a-form-item>
                          </validation-provider>
                          <validation-provider
                            v-slot="{ errors }"
                            :name="$t('account.profile.lastname_en')"
                            rules="alpha"
                          >
                            <a-form-item
                              :validate-status="errors[0] ? 'error' : null"
                              :help="errors[0]"
                              :label="$t('account.profile.lastname_en')"
                              class="mb-3"
                            >
                              <a-input
                                v-model="accountData.lastnameEn"
                                :placeholder="$t('account.profile.lastname_en')"
                              />
                            </a-form-item>
                          </validation-provider>
                          <validation-provider
                            v-slot="{ errors }"
                            :name="$t('account.profile.email')"
                            rules="email"
                          >
                            <a-form-item
                              :validate-status="errors[0] ? 'error' : null"
                              :help="errors[0]"
                              :label="$t('account.profile.email')"
                              class="mb-3"
                            >
                              <a-input
                                v-model="accountData.email"
                                :placeholder="$t('account.profile.email')"
                              />
                            </a-form-item>
                          </validation-provider>
                          <validation-provider
                            v-slot="{ errors }"
                            :name="$t('account.profile.mobile')"
                            rules="numeric|length:10"
                          >
                            <a-form-item
                              :validate-status="errors[0] ? 'error' : null"
                              :help="errors[0]"
                              :label="$t('account.profile.mobile')"
                              class="mb-3"
                            >
                              <a-input
                                v-model="accountData.mobile"
                                :placeholder="$t('account.profile.mobile')"
                              />
                            </a-form-item>
                          </validation-provider>
                          <validation-provider
                            v-slot="{ errors }"
                            :name="$t('account.profile.display_name')"
                            rules="required"
                          >
                            <a-form-item
                              :validate-status="errors[0] ? 'error' : null"
                              :help="errors[0]"
                              :label="$t('account.profile.display_name')"
                              class="mb-3"
                            >
                              <a-input
                                v-model="accountData.displayName"
                                :placeholder="
                                  $t('account.profile.display_name')
                                "
                              />
                            </a-form-item>
                          </validation-provider>
                        </a-card>
                        <a-card
                          title="ข้อมูลสำหรับยืนยันตัวตน"
                          :style="{ marginTop: '16px' }"
                        >
                          <validation-provider
                            v-slot="{ errors, validated }"
                            :name="$t('account.profile.citizen')"
                            :rules="{ required: isRequired, citizenId: true }"
                          >
                            <a-form-item
                              :validate-status="
                                errors[0]
                                  ? 'error'
                                  : validated
                                  ? 'success'
                                  : null
                              "
                              :label="$t('account.profile.citizen')"
                              :help="errors[0]"
                              has-feedback
                              class="mb-3"
                            >
                              <a-input
                                v-model="accountData.citizenId"
                                type="text"
                                :placeholder="$t('account.profile.citizen')"
                                allow-clear
                              ></a-input>
                            </a-form-item>
                          </validation-provider>
                          <validation-provider
                            v-slot="{ errors, validated }"
                            :name="$t('account.profile.passport')"
                            :rules="{ required: isRequired, passportNo: true }"
                          >
                            <a-form-item
                              :validate-status="
                                errors[0]
                                  ? 'error'
                                  : validated
                                  ? 'success'
                                  : null
                              "
                              :help="errors[0]"
                              has-feedback
                              class="mb-3"
                              :label="$t('account.profile.passport')"
                            >
                              <a-input
                                v-model="accountData.passportNo"
                                type="text"
                                :placeholder="$t('profile.passport')"
                                allow-clear
                              ></a-input>
                            </a-form-item>
                          </validation-provider>
                          <!-- <validation-provider
                            v-slot="{ errors, validated }"
                            :name="$t('account.profile.driving_no')"
                            :rules="{ required: isRequired, drivingNo: true }"
                          >
                            <a-form-item
                              :validate-status="
                                errors[0]
                                  ? 'error'
                                  : validated
                                  ? 'success'
                                  : null
                              "
                              :help="errors[0]"
                              has-feedback
                              class="mb-3"
                              :label="$t('account.profile.driving_no')"
                            >
                              <a-input
                                v-model="accountData.drivingNo"
                                type="text"
                                :placeholder="$t('account.profile.driving_no')"
                                allow-clear
                              ></a-input>
                            </a-form-item>
                          </validation-provider> -->
                          <validation-provider
                            v-slot="{ errors, validated }"
                            :name="$t('account.profile.personal_no')"
                            :rules="{ required: isRequired, personal: true }"
                          >
                            <a-form-item
                              :validate-status="
                                errors[0]
                                  ? 'error'
                                  : validated
                                  ? 'success'
                                  : null
                              "
                              :help="errors[0]"
                              has-feedback
                              class="mb-3"
                              :label="$t('account.profile.personal_no')"
                            >
                              <a-input
                                v-model="accountData.personalNo"
                                type="text"
                                :placeholder="$t('account.profile.personal_no')"
                                allow-clear
                              ></a-input>
                            </a-form-item>
                          </validation-provider>
                        </a-card>
                      </a-card>
                    </a-col>
                  </a-row>
                </div>
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
  computed,
  reactive,
  ref,
  useContext,
  defineNuxtMiddleware,
} from '@nuxtjs/composition-api'
import moment from 'moment'
import { find, head } from 'lodash'

interface MyForm {
  keyword: string | null
  page: number | null
  pageSize: number | null
}

interface Data {
  id: number
  accountTypeId: number | null
  accountType: string | null
  emailAccount: string | null
  username: string | number
  pwd: string | null
  displayName: string | null
  displayImg: string | null
  firstnameTh: string | null
  lastnameTh: string | null
  firstnameEn: string | null
  lastnameEn: string | null
  lastedLogin: Date | null
  vip: boolean | null
  vipBy: string | null
  vipDate: Date | null
  banned: boolean | null
  bannedBy: string | null
  bannedDate: Date | null
  createdAt: Date | null
  createdBy: string | null
  updatedAt: Date | null
  updatedBy: string | number
  deleteRemark: string | null
  deletedAt: Date | null
  deletedBy: string | null
  profileId: number | null
  resetPwdDate: Date | null
  resetPwdToken: string | null
  verifyAccount: boolean | null
  verifyToken: string | null
  email: string | null
  mobile: string | null
  citizenId: string | null
  passportNo: string | null
  drivingNo: string | null
  personalNo: string | null
  company: string | null
  roleId: number | null
}

export default defineComponent({
  middleware: 'isdev',
  setup(_props, context) {
    const {
      app: { i18n },
      $message,
      $confirm,
    } = useContext()

    defineNuxtMiddleware((ctx) => {
      // do stuff
    })

    const form = reactive<MyForm>({
      keyword: null,
      page: 1,
      pageSize: 10,
    })

    const options = reactive({
      role: [],
    })
    const fileLists = ref<
      {
        uid: number
        name: string
        status: string
        url: string
        thumbUrl: string
      }[]
    >()
    const isShowDetail = ref(false)
    const isConfirmLoading = ref(false)
    const profile = reactive<Data>({
      id: 0,
      accountTypeId: null,
      accountType: null,
      emailAccount: null,
      username: '',
      pwd: null,
      displayName: null,
      displayImg: null,
      firstnameTh: null,
      lastnameTh: null,
      firstnameEn: null,
      lastnameEn: null,
      lastedLogin: null,
      vip: false,
      vipBy: null,
      vipDate: null,
      banned: false,
      bannedBy: null,
      bannedDate: null,
      createdAt: null,
      createdBy: null,
      updatedAt: null,
      updatedBy: '',
      deleteRemark: null,
      deletedAt: null,
      deletedBy: null,
      profileId: 1,
      resetPwdDate: null,
      resetPwdToken: '',
      verifyAccount: false,
      verifyToken: '',
      email: null,
      mobile: null,
      citizenId: null,
      passportNo: null,
      drivingNo: null,
      personalNo: null,
      company: null,
      roleId: null,
    })
    const sortedInfo = ref<any>(null)
    const columns = [
      {
        slotName: 'account.table.operation',
        dataIndex: 'operation',
        key: 'operation',
        scopedSlots: {
          customRender: 'operation',
          title: 'account.table.operation',
        },

        align: 'center',
      },
      {
        slotName: 'account.table.display_img',
        dataIndex: 'displayImg',
        scopedSlots: {
          customRender: 'displayImg',
          title: 'account.table.display_img',
        },
        align: 'center',

        key: 'displayImg',
      },
      {
        slotName: 'account.table.id',
        dataIndex: 'id',
        key: 'id',
        scopedSlots: { customRender: 'id', title: 'account.table.id' },

        align: 'center',
        sorter: (a: any, b: any) => a.id - b.id,
        sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
      },
      {
        slotName: 'account.table.email_account',
        dataIndex: 'emailAccount',
        key: 'emailAccount',

        align: 'center',
        scopedSlots: { title: 'account.table.email_account' },
      },
      {
        slotName: 'account.table.display_name',
        dataIndex: 'displayName',
        key: 'displayName',

        align: 'center',
        scopedSlots: { title: 'account.table.display_name' },
      },
      {
        slotName: 'account.table.fullname_th',
        dataIndex: 'fullnameTh',
        key: 'fullnameTh',

        align: 'center',
        scopedSlots: { title: 'account.table.fullname_th' },
      },
      {
        slotName: 'account.table.email',
        dataIndex: 'email',
        key: 'email',
        scopedSlots: { title: 'account.table.email' },
      },
      {
        slotName: 'account.table.role',
        dataIndex: 'roleName',
        align: 'center',
        key: 'roleName',
        scopedSlots: { title: 'account.table.role' },
      },
      {
        slotName: 'account.table.created_at',
        dataIndex: 'createdAt',
        scopedSlots: {
          customRender: 'createdAt',
          title: 'account.table.created_at',
        },
        align: 'center',
        key: 'createdAt',
      },
      {
        slotName: 'account.table.verify_account',
        dataIndex: 'verifyAccount',
        scopedSlots: {
          customRender: 'verifyAccount',
          title: 'account.table.verify_account',
        },

        align: 'center',
        key: 'verifyAccount',
      },
      {
        slotName: 'account.table.vip',
        dataIndex: 'vip',
        scopedSlots: { customRender: 'vip', title: 'account.table.vip' },

        align: 'center',
        key: 'vip',
      },
      {
        slotName: 'account.table.banned',
        dataIndex: 'banned',
        scopedSlots: { customRender: 'banned', title: 'account.table.banned' },

        align: 'center',
        key: 'banned',
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
    const accountData = ref<Data>({
      id: 0,
      accountTypeId: null,
      accountType: null,
      emailAccount: null,
      username: '',
      pwd: null,
      displayName: null,
      displayImg: null,
      firstnameTh: null,
      lastnameTh: null,
      firstnameEn: null,
      lastnameEn: null,
      lastedLogin: null,
      vip: false,
      vipBy: null,
      vipDate: null,
      banned: false,
      bannedBy: null,
      bannedDate: null,
      createdAt: null,
      createdBy: null,
      updatedAt: null,
      updatedBy: '',
      deleteRemark: null,
      deletedAt: null,
      deletedBy: null,
      profileId: 1,
      resetPwdDate: null,
      resetPwdToken: '',
      verifyAccount: false,
      verifyToken: '',
      email: null,
      mobile: null,
      citizenId: null,
      passportNo: null,
      drivingNo: null,
      personalNo: null,
      company: null,
      roleId: null,
    })

    function fetchAPI() {
      loading.value = true

      return context.root.$axios
        .post('Account/GetAccounts', {
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
      isConfirmLoading.value = true
      return context.root.$axios
        .get(`Account/${record.id}`, {})
        .then((res: any) => {
          // console.log(res.data)
          accountData.value = res.data as Data
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

    function filterOption(input: any, option: any) {
      const text = option.componentOptions.children[0].text.toLowerCase()
      return text.includes(input.toLowerCase())
    }

    function closeDetail() {
      isConfirmLoading.value = true
      isShowDetail.value = false
      loading.value = false
      clearForm()
    }

    function beforeUpload(file: File) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        $message.error('You can only upload JPG file!')
        return false
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        $message.error('Image must smaller than 2MB!')
        return false
      }

      getBase64(file, (url: any) => {
        fileLists.value = [
          {
            uid: 1,
            name: file.name,
            status: 'done',
            url,
            thumbUrl: url,
          },
        ]
        loading.value = false
      })

      // return isJpgOrPng && isLt2M
      return false
    }
    function handleRemove() {
      fileLists.value = []
    }

    function getBase64(img: any, callback: any) {
      const reader = new FileReader()
      reader.addEventListener('load', () => callback(reader.result))
      reader.readAsDataURL(img)
    }

    function showPropsConfirm() {
      $confirm({
        title: 'ต้องการอัพเดตข้อมูลผู้ใช้งาน ?',
        content: 'คลิกที่ปุ่ม ยืนยัน เพื่อบันทึกข้อมูล',
        okText: 'ยืนยัน',
        okType: 'primary',
        okButtonProps: {
          props: { disabled: false },
        },
        cancelText: 'ยกเลิก',
        onOk() {
          updateProfile()
        },
        onCancel() {
          clearForm()
        },
      })
    }

    function getRole() {
      context.root.$axios.get('Role/Dropdown').then(({ data }) => {
        options.role = data
      })
    }

    function updateProfile() {
      const role: any = find(options.role, ['id', accountData.value.roleId])
      const displayImg = head(fileLists.value)
      return context.root.$axios
        .put('Account/Update', {
          id: accountData.value.id,
          accountTypeId: accountData.value.accountTypeId,
          emailAccount: accountData.value.emailAccount,
          username: accountData.value.username,
          pwd: accountData.value.pwd,
          displayName: accountData.value.displayName,
          displayImg: displayImg?.url,
          firstnameTh: accountData.value.firstnameTh,
          lastnameTh: accountData.value.lastnameTh,
          firstnameEn: accountData.value.firstnameEn,
          lastnameEn: accountData.value.lastnameEn,
          email: accountData.value.email,
          mobile: accountData.value.mobile,
          citizenId: accountData.value.citizenId,
          passportNo: accountData.value.passportNo,
          drivingNo: accountData.value.drivingNo,
          personalNo: accountData.value.personalNo,
          lastedLogin: accountData.value.lastedLogin,
          vip: accountData.value.vip,
          vipDate: accountData.value.vipDate,
          vipBy: accountData.value.vipBy,
          banned: accountData.value.banned,
          bannedDate: accountData.value.bannedDate,
          bannedBy: accountData.value.bannedBy,
          createdAt: accountData.value.createdAt,
          createdBy: accountData.value.createdBy,
          updatedAt: accountData.value.updatedAt,
          updatedBy: accountData.value.updatedBy,
          profileId: accountData.value.profileId,
          resetPwdToken: accountData.value.resetPwdToken,
          resetPwdDate: accountData.value.resetPwdDate,
          verifyToken: accountData.value.verifyToken,
          verifyAccount: accountData.value.verifyAccount,
          company: accountData.value.company,
          roleId:
            accountData.value.roleId === null
              ? role.id
              : accountData.value.roleId,
        })
        .then(() => {
          context.root.$success({
            title: 'บันทึกสำเร็จ',
            content: 'อัพเดตข้อมุลผู้ใช้งานสำเร้จ',
          })
          closeDetail()
          fetchAPI()
          clearForm()
        })
        .catch((e: any) => {
          console.log(e.response) // eslint-disable-line no-console
          const modal = {
            title: 'มีข้อผิดพลาด',
            content: '',
          }

          if (e.response.status === 400) {
            modal.title = e.response.data.message.th
            modal.content = e.response.data.message.th
          } else {
            modal.title = 'บันทึกไม่สำเร็จ'
            modal.content = e.response.data.message.th
          }

          context.root.$error(modal)
        })
        .then(() => {
          loading.value = false
        })
    }

    function clearForm() {
      accountData.value = {
        id: 0,
        accountTypeId: null,
        accountType: null,
        emailAccount: null,
        username: '',
        pwd: null,
        displayName: null,
        displayImg: null,
        firstnameTh: null,
        lastnameTh: null,
        firstnameEn: null,
        lastnameEn: null,
        lastedLogin: null,
        vip: false,
        vipBy: null,
        vipDate: null,
        banned: false,
        bannedBy: null,
        bannedDate: null,
        createdAt: null,
        createdBy: null,
        updatedAt: null,
        updatedBy: '',
        deleteRemark: null,
        deletedAt: null,
        deletedBy: null,
        profileId: 1,
        resetPwdDate: null,
        resetPwdToken: '',
        verifyAccount: false,
        verifyToken: '',
        email: null,
        mobile: null,
        citizenId: null,
        passportNo: null,
        drivingNo: null,
        personalNo: null,
        company: null,
        roleId: null,
      }
      fileLists.value = []
    }

    function handleChange(info: any) {
      let fileList = [...info.fileList]

      // 1. Limit the number of uploaded files
      //    Only to show two recent uploaded files, and old ones will be replaced by the new
      fileList = fileList.slice(-1)

      // 2. read from response and show file link
      fileList = fileList.map((file) => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.url
        }
        return file
      })
      fileLists.value = fileList
      info.fileList = fileList

      if (info.fileList.length > 1) {
        return false
      }

      if (info.file.status === 'uploading') {
        loading.value = true
        // console.log('status: ', info.file.status)
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (url: any) => {
          imageUrl.value = url
          // console.log(imageUrl.value)
          // imageUrl.value = url
          // loading.value = false
          // form.displayImg = imageUrl.value
          form.displayImg = imageUrl.value
          loading.value = false
        })
        // console.log('statusdone: ', info.file.status)
        // console.log('img: ', imageUrl)
      }
    }

    onMounted(() => {
      getRole()
      form.page = 1
      form.pageSize = 10
      fetchAPI()
    })

    const isRequired = computed(() => {
      // console.log(this.errors.items.length === 0)
      return !(
        accountData.value.citizenId ||
        accountData.value.passportNo ||
        accountData.value.drivingNo ||
        accountData.value.personalNo
      )
    })

    return {
      clearForm,
      updateProfile,
      profile,
      beforeUpload,
      handleRemove,
      moment,
      form,
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
      accountData,
      isRequired,
      showPropsConfirm,
      options,
      getRole,
      filterOption,
      fileLists,
      handleChange,
    }
  },
})
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
#headerregister {
  font-size: x-large;
}
</style>
