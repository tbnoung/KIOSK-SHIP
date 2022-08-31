<template>
  <div>
    <a-divider orientation="center">
      <h1 id="headerregister">{{ $t('masterData.titleVistors') }}</h1>
    </a-divider>
    <a-card :bordered="false">
      <div class="bg-white">
        <div class="SearchBox">
          <a-input-search
            v-model="message"
            :placeholder="$t('masterData.search_btn')"
            enter-button
            size="large"
            class="w-80 mb-3 mt-3 mr-3"
            @search="onSearch"
          />
        </div>

        <a-table
          :columns="columns"
          :row-key="(record) => record.id"
          :data-source="data"
          :pagination="pagination"
          :loading="loading"
          :scroll="{ x: 800 }"
          @change="handleTableChange"
        >
          <!-- หัวคอลัม -->
          <template v-for="(item, index) in columns" :slot="item.slotName">
            <span :key="index">{{ $t(item.slotName) }}</span>
          </template>
          <!-- <template slot="citizenId" slot-scope="citizenId">
          {{ citizenId | Substr }}
        </template> -->
          <template slot="id" slot-scope="id">
            <a @click="showModal(id)"><a-icon type="idcard" /></a>
          </template>
          <template slot="action" slot-scope="text">
            <a-select
              :default-value="text.visitorStatusId"
              style="width: 120px"
              @change="handleChangeSelect"
            >
              <a-select-option
                value="Normal"
                @click="onChangenNorMal(text.id, text.nameTh, 0)"
              >
                Normal
              </a-select-option>
              <a-select-option
                value="Vip"
                @click="onChangeSelectVip(text.id, text.nameTh, 1)"
              >
                Vip
              </a-select-option>
              <a-select-option
                value="Ban"
                @click="onChangeSelectBan(text.id, text.nameTh, 2)"
              >
                Ban
              </a-select-option>
            </a-select>
          </template>
        </a-table>
      </div>

      <div>
        <a-modal
          title=""
          :visible="visible"
          :width="1100"
          :footer="null"
          :ok-button-props="{ props: { disabled: false } }"
          :cancel-button-props="{ props: { disabled: true } }"
          @ok="handleOk"
          @cancel="handleCancel"
        >
          <a-row>
            <a-col :span="12">
              <div>
                <h1 id="headerregister">
                  {{ $t('masterData.visitorModel.titleContactInformation') }}
                </h1>
                <hr />
                <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                  <a-form-item
                    :label="$t('masterData.visitorModel.titleContactID')"
                  >
                    {{ dataModel.id }}
                  </a-form-item>
                  <a-form-item
                    :label="$t('masterData.visitorModel.titleNameSurnameThai')"
                  >
                    {{ dataModel.firstnameTh }}
                    {{ dataModel.lastnameTh }}
                  </a-form-item>
                  <a-form-item
                    :label="$t('masterData.visitorModel.titleNameSurnameEng')"
                  >
                    {{ dataModel.firstnameEn }}
                    {{ dataModel.lastnameEn }}
                  </a-form-item>
                  <a-form-item
                    :label="$t('masterData.visitorModel.titlecitizenid')"
                  >
                    {{ dataModel.citizenId }}
                  </a-form-item>
                  <a-form-item
                    :label="$t('masterData.visitorModel.titlePassport')"
                    >-</a-form-item
                  >
                  <a-form-item
                    :label="$t('masterData.visitorModel.titleEmployee')"
                    >-</a-form-item
                  >
                  <a-form-item
                    :label="$t('masterData.visitorModel.titleDriver')"
                    >-</a-form-item
                  >
                </a-form>
              </div>
              <div>
                <h1 id="headerregister">
                  {{
                    $t(
                      'masterData.visitorModel.titleContactInformationAdditional'
                    )
                  }}
                </h1>
                <hr />
                <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                  <a-form-item
                    :label="$t('masterData.visitorModel.titleAddress')"
                  >
                    {{ dataModel.address1 }}
                  </a-form-item>
                  <a-form-item :label="$t('masterData.visitorModel.titleEmail')"
                    >-</a-form-item
                  >
                  <a-form-item
                    :label="$t('masterData.visitorModel.titlebirthDate')"
                  >
                    {{ $moment(dataModel.birthDate).format('YYYY/MM/DD') }}
                  </a-form-item>
                  <a-form-item
                    :label="$t('masterData.visitorModel.titleGender')"
                  >
                    {{ dataModel.gender }}
                  </a-form-item>
                </a-form>
              </div>
              <div>
                <h1 id="headerregister">
                  {{ $t('masterData.visitorModel.titleotherinformation') }}
                </h1>
                <hr />
                <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                  <a-form-item
                    :label="$t('masterData.visitorModel.titleotherRemark')"
                  >
                    {{ dataModel.remark }}
                  </a-form-item>
                </a-form>
              </div>
            </a-col>
            <a-col :span="12">
              <center>
                <h1 id="headerregister">
                  {{ $t('masterData.visitorModel.titlelatestphoto') }}
                </h1>
              </center>
              <a-card>
                <center>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr-a1v_DeJiDqk9moYaRsMUoJZbYfjQwo5-A&usqp=CAU"
                    class="img-fluid"
                  />
                </center>
              </a-card>
              <a-row>
                <a-col :span="12">
                  <center>
                    <h1 id="headerregister">
                      {{ $t('masterData.visitorModel.titleIDcardpicture') }}
                    </h1>
                  </center>
                  <a-card>
                    <img
                      src="https://sites.google.com/site/funnycatmeawww/_/rsrc/1422326075261/home/6997052-funny-cat.jpg?height=675&width=1200"
                      class="img-fluid"
                    />
                  </a-card>
                </a-col>
                <a-col :span="12">
                  <center>
                    <h1 id="headerregister">
                      {{ $t('masterData.visitorModel.titlecardscanimage') }}
                    </h1>
                  </center>
                  <a-card>
                    <img
                      src="https://ichef.bbci.co.uk/news/640/cpsprodpb/51F3/production/_106997902_gettyimages-611696954.jpg"
                      class="img-fluid"
                    />
                  </a-card>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-modal>
      </div>
    </a-card>
  </div>
</template>
<script>
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  useContext,
  h,
} from '@nuxtjs/composition-api'
import moment from 'moment'
// import axios from 'axios'
import { Modal } from 'ant-design-vue'
export default defineComponent({
  setup(_props, context) {
    // prop
    const data = ref([])
    const numRow = ref(0)
    const loading = ref(false)
    const visible = ref(false)
    const sortedInfo = ref('')
    const dataModel = ref({})
    const message = ref('')
    const RemarkConfrim = ref('')
    // -------------
    const columns = [
      {
        title: '#',
        dataIndex: 'numRow',
        width: '5%',
      },
      {
        slotName: 'masterData.titleInformation',
        dataIndex: 'id',
        scopedSlots: {
          customRender: 'id',
          title: 'masterData.titleInformation',
        },

        width: '5%',
      },
      {
        slotName: 'masterData.visitorModel.titleNameSurnameThai',
        dataIndex: 'nameTh',
        width: '15%',
        scopedSlots: {
          title: 'masterData.visitorModel.titleNameSurnameThai',
        },
      },
      {
        slotName: 'masterData.visitorModel.titleNameSurnameEng',
        dataIndex: 'nameEn',
        width: '15%',
        scopedSlots: {
          title: 'masterData.visitorModel.titleNameSurnameEng',
        },
      },
      {
        slotName: 'masterData.visitorModel.titlecitizenid',
        dataIndex: 'citizenId',
        scopedSlots: {
          title: 'masterData.visitorModel.titlecitizenid',
        },
        width: '10%',
      },
      {
        slotName: 'masterData.visitorModel.titlecountry',
        dataIndex: 'country',
        filters: [{ text: 'Thailand', value: 'Thailand' }],
        onFilter: (value, record) => record.country.indexOf(value) === 0,
        sorter: (a, b) => a.country.length - b.country.length,
        sortDirections: ['descend'],
        scopedSlots: {
          title: 'masterData.visitorModel.titlecountry',
        },

        width: '10%',
      },
      {
        slotName: 'masterData.visitorModel.titleGender',
        dataIndex: 'gender',
        // filters: [
        //   { text: 'Male', value: 'Male' },
        //   { text: 'Female', value: 'Female' },
        // ],
        // onFilter: (value, record) => record.gender.indexOf(value) === 0,
        // sorter: (a, b) => a.gender.length - b.gender.length,
        // sortDirections: ['descend'],
        // ellipsis: true,
        scopedSlots: {
          title: 'masterData.visitorModel.titleGender',
        },

        width: '5%',
      },
      {
        slotName: 'masterData.titleDate',
        dataIndex: 'createdAt',
        scopedSlots: {
          title: 'masterData.titleDate',
        },

        width: '10%',
      },
      {
        slotName: 'masterData.titleStatus',
        key: 'action',
        scopedSlots: {
          title: 'masterData.titleStatus',
          customRender: 'action',
        },
        width: '25%',
      },
    ]
    const {
      app: { i18n },
    } = useContext()
    const form = reactive({
      keyword: '',
      page: 1,
      pageSize: 100,
    })
    const UpdateStatus = reactive({
      id: '0',
      status: 0,
      Remark: '',
    })
    const pagination = reactive({
      total: 0,
      current: 1,
      pageSize: 100,
      showQuickJumper: true,
      showSizeChanger: true,
      pageSizeOptions: ['100', '125', '150'],
      position: 'top',
    })
    const fetch = async () => {
      loading.value = true
      await context.root.$axios
        .post('/apis/Visitor/GetVisitorsRows', {
          keyword: form.keyword,
          page: form.page,
          pageSize: form.pageSize,
        })
        .then((r) => {
          // eslint-disable-next-line array-callback-return
          r.data.message.result.map((el) => {
            if (el.country === 'THA') {
              el.country = 'Thailand'
            }
            if (el.gender === 'M') {
              el.gender = 'Male'
            }
            if (el.gender === 'F') {
              el.gender = 'Female'
            }
            el.citizenId = filters(el.citizenId)
            numRow.value = numRow.value + 1
            el.createdAt = moment(el.createdAt).format('YYYY-MM-DD')
            el.nameTh = el.firstnameTh + ' ' + el.lastnameTh
            el.nameEn = el.firstnameEn + ' ' + el.lastnameEn
            el.numRow = numRow.value
            if (el.visitorStatusId === 0) {
              el.visitorStatusId = 'Normal'
            }
            if (el.visitorStatusId === 1) {
              el.visitorStatusId = 'Vip'
            }
            if (el.visitorStatusId === 2) {
              el.visitorStatusId = 'Ban'
            }
            if (el.visitorStatusId === 3) {
              el.visitorStatusId = 'SupperVip'
            }
          })
          data.value = r.data.message.result
          // console.log(r.data.message.result)
          pagination.current = r.data.message.currentPage
          pagination.pageSize = r.data.message.pageSize
          pagination.total = r.data.message.rowCount
          pagination.showTotal = (total, range) =>
            i18n.t('masterData.paginationLoad.titleshow') +
            `  ${range[0]}  ` +
            i18n.t('masterData.paginationLoad.titleto') +
            `  ${range[1]}  ` +
            i18n.t('masterData.paginationLoad.titleof') +
            `  ${total}  ` +
            i18n.t('masterData.paginationLoad.titleitems')
        })
        .finally(() => {
          loading.value = false
        })
    }
    const filters = (data) => {
      return data.substring(0, 8) + 'xx' + data.substring(10, 12)
    }
    onMounted(() => {
      fetch()
    })
    function handleTableChange(p, sorter) {
      numRow.value = 0
      sortedInfo.value = sorter
      numRow.value = 0
      pagination.pageSize = p.pageSize
      pagination.current = p.current
      form.page = pagination.current
      form.pageSize = pagination.pageSize
      fetch()
    }
    function handleOk() {
      visible.value = false
    }
    function handleCancel() {
      visible.value = false
    }
    const showModal = async (id) => {
      loading.value = true
      await context.root.$axios
        .get('/apis/Visitor/' + id)
        .then((r) => {
          if (r.data.message[0].gender === 'M') {
            r.data.message[0].gender = 'Male'
          }
          if (r.data.message[0].gender === 'F') {
            r.data.message[0].gender = 'Female'
          }
          dataModel.value = r.data.message[0]
          visible.value = true
        })
        .finally(() => {
          loading.value = false
        })
    }
    function onSearch(value) {
      numRow.value = 0
      if (value !== '') {
        form.keyword = message.value
        form.page = 1
        form.pageSize = 100
        fetch()
      } else {
        form.keyword = message.value
        form.page = 1
        form.pageSize = 100
        fetch()
      }
    }

    function TabOnChange() {
      // console.log(e.target.value)
      return true
    }

    const updateStatusDatabase = async (UpdateStatus) => {
      await context.root.$axios
        .put('/apis/Visitor/UpdateStatus', UpdateStatus)
        .then(
          Modal.success({
            title: 'สำเร็จ',
          })
        )
        .catch((error) => {
          alert(error)
          Modal.error({
            title: 'ไม่สำเร็จ',
          })
        })
        .finally(() => {
          numRow.value = 0
          fetch()
        })
    }
    const handleChangeSelect = () => {
      // console.log(`selected ${value}`)
      return true
    }
    const onChangeSelectVip = (nameId, nameTh, nameValue) => {
      UpdateStatus.id = nameId.toString()
      UpdateStatus.status = nameValue
      RemarkConfrim.value = ''
      Modal.confirm({
        title: 'คุณต้องเปลื่ยนสถานะของ ' + nameTh + ' เป็นVip หรือไม่',
        content: h('div', {}, [
          h('a-textarea', {
            domProps: {
              value: RemarkConfrim.value,
            },
            on: {
              input: (e) => (RemarkConfrim.value = e.target.value),
            },
          }),
        ]),
        onOk() {
          UpdateStatus.Remark = RemarkConfrim.value
          updateStatusDatabase(UpdateStatus)
        },
        onCancel() {
          location.reload()
        },
      })
    }
    const onChangeSelectBan = (nameId, nameTh, nameValue) => {
      UpdateStatus.id = nameId.toString()
      UpdateStatus.status = nameValue
      RemarkConfrim.value = ''
      Modal.confirm({
        title: 'คุณต้องเปลื่ยนสถานะของ ' + nameTh + ' เป็นBan หรือไม่',
        content: h('div', {}, [
          h('a-textarea', {
            domProps: {
              value: RemarkConfrim.value,
            },
            on: {
              input: (e) => (RemarkConfrim.value = e.target.value),
            },
          }),
        ]),
        onOk() {
          UpdateStatus.Remark = RemarkConfrim.value
          updateStatusDatabase(UpdateStatus)
        },
        onCancel() {
          location.reload()
        },
      })
    }
    const onChangenNorMal = (nameId, nameTh, nameValue) => {
      UpdateStatus.id = nameId.toString()
      UpdateStatus.status = nameValue
      RemarkConfrim.value = ''
      Modal.confirm({
        title: 'คุณต้องเปลื่ยนสถานะของ ' + nameTh + ' เป็นNormal หรือไม่',
        onOk() {
          UpdateStatus.Remark = RemarkConfrim.value
          updateStatusDatabase(UpdateStatus)
        },
        onCancel() {
          location.reload()
        },
      })
    }
    return {
      columns,
      data,
      loading,
      pagination,
      handleTableChange,
      visible,
      handleOk,
      handleCancel,
      showModal,
      dataModel,
      onSearch,
      message,
      sortedInfo,
      TabOnChange,
      handleChangeSelect,
      onChangeSelectVip,
      onChangeSelectBan,
      onChangenNorMal,
    }
  },
})
</script>

<style scoped>
#headerregister {
  font-size: x-large;
}
.SearchBox {
  display: flex;
  justify-content: flex-end;
}
</style>
