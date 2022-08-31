<template>
  <div>
    <a-divider orientation="center">
      <h1 id="headerregister">{{ $t('Report.preRegister.title') }}</h1>
    </a-divider>
    <a-card :bordered="false">
      <div class="bg-white">
        <div class="justify-items-center">
          <a-row>
            <a-col :xs="{ span: 24 }" :lg="{ span: 20 }">
              <a-range-picker
                :default-value="[
                  moment(TimeNow, dateFormat),
                  moment(TimeNow, dateFormat),
                ]"
                :format="dateFormat"
                @change="onChangeTime"
              />
              <a-select
                default-value="=0"
                style="width: 120px"
                @change="handleChangeStatus"
              >
                <a-select-option value="=0"> เลือกทั้งหมด</a-select-option>
                <a-select-option value="=1"> อนุมัติ</a-select-option>
                <a-select-option value="=3"> รออนุมัติ</a-select-option>
                <a-select-option value="=2"> ไม่อนุมัติ </a-select-option>
              </a-select>

              <!-- <a-input-search
              :placeholder="$t('Report.search_btn')"
              enter-button
              class="w-72"
              @search="onSearch"
            /> -->
            </a-col>
            <!------ ออกรายงาน ---------->
            <a-col :xs="{ span: 24 }" :lg="{ span: 4 }" class="SearchBox">
              <a-button
                type="primary"
                class="mr-2"
                size="large"
                @click="onExport"
                ><a-icon type="file-excel" />Excel</a-button
              >

              <a-button type="primary" size="large" @click="onExportPdf"
                ><a-icon type="file-pdf" />Pdf</a-button
              >
            </a-col>
          </a-row>
          <a-row class="pt-3">
            <a-form
              layout="inline"
              @submit="handleSubmit"
              @submit.native.prevent
            >
              <a-form-item :label="$t('Report.preRegister.titleSearch')">
                <a-input
                  v-model="formInline.fristName"
                  :placeholder="$t('Report.preRegister.titleFristName')"
                >
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input
                  v-model="formInline.lastName"
                  :placeholder="$t('Report.preRegister.titleLastName')"
                >
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input
                  v-model="formInline.host"
                  :placeholder="
                    $t('Report.preRegister.titleEmployeestocontact')
                  "
                >
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input
                  v-model="formInline.email"
                  :placeholder="$t('Report.preRegister.titleEmail')"
                >
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input
                  v-model="formInline.phone"
                  :placeholder="$t('Report.preRegister.titleMobile')"
                >
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-button type="primary" html-type="submit">
                  <a-icon type="search"
                /></a-button>
              </a-form-item>
            </a-form>
          </a-row>
        </div>

        <a-table
          :columns="columns"
          :row-key="(record) => record.id"
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
          <span
            slot="visitorPrepegisterStatusId"
            slot-scope="visitorPrepegisterStatusId"
          >
            <a-tag
              :color="
                visitorPrepegisterStatusId === 'อนุมัติ'
                  ? 'green'
                  : visitorPrepegisterStatusId === 'ไม่อนุมัติ'
                  ? 'volcano'
                  : 'geekblue'
              "
            >
              {{ visitorPrepegisterStatusId }}
            </a-tag>
          </span>
        </a-table>
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
} from '@nuxtjs/composition-api'
import moment from 'moment'
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
    const Timestring = new Date()
    const TimeNow = ref(
      moment(Timestring.toLocaleString('en-US', { timeZone: 'UTC' })).format(
        'YYYY-MM-DD'
      )
    )
    const dateFormat = 'YYYY-MM-DD'
    // -------------
    const columns = [
      {
        title: '#',
        dataIndex: 'numRow',
      },
      {
        slotName: 'Report.preRegister.titleCheckIn',
        dataIndex: 'datefrom',
        scopedSlots: {
          customRender: 'id',
          title: 'Report.preRegister.titleCheckIn',
        },
      },
      {
        slotName: 'Report.preRegister.titlecontactperson',
        dataIndex: 'nameTh',
        scopedSlots: {
          title: 'Report.preRegister.titlecontactperson',
        },
      },
      {
        slotName: 'Report.preRegister.titleEmployeestocontact',
        dataIndex: 'hostdesc',
        scopedSlots: {
          title: 'Report.preRegister.titleEmployeestocontact',
        },
      },
      {
        slotName: 'Report.preRegister.titleEmail',
        dataIndex: 'email',
        scopedSlots: {
          title: 'Report.preRegister.titleEmail',
        },
      },
      {
        slotName: 'Report.preRegister.titleMobileNo',
        dataIndex: 'mobileNo',
        scopedSlots: {
          title: 'Report.preRegister.titleMobileNo',
        },
      },
      {
        slotName: 'Report.preRegister.titleobjective',
        dataIndex: 'objectivity',
        scopedSlots: {
          title: 'Report.preRegister.titleobjective',
        },
      },
      {
        slotName: 'Report.preRegister.titlestatus',
        dataIndex: 'visitorPrepegisterStatusId',
        scopedSlots: {
          customRender: 'visitorPrepegisterStatusId',
          title: 'Report.preRegister.titlestatus',
        },
      },
      {
        slotName: 'Report.preRegister.titleRemark',
        dataIndex: 'RemarkData',
        scopedSlots: {
          title: 'Report.preRegister.titleRemark',
        },
      },
    ]
    const {
      app: { i18n },
    } = useContext()
    const form = reactive({
      status: 0,
      dateStart: '2021-08-01',
      dateEnd: '2021-09-03',
      host: '',
      fristName: '',
      lastName: '',
      phone: '',
      email: '',
      keyword: '',
      page: 1,
      pageSize: 100,
    })
    const formInline = reactive({
      fristName: '',
      lastName: '',
      host: '',
      phone: '',
      email: '',
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
        .post('/apis/ReportTransaction/Getpreregister', {
          status: form.status,
          dateStart: form.dateStart,
          dateEnd: form.dateEnd,
          host: form.host,
          fristName: form.fristName,
          lastName: form.lastName,
          phone: form.phone,
          email: form.email,
          keyword: form.keyword,
          page: form.page,
          pageSize: form.pageSize,
        })
        .then((r) => {
          // eslint-disable-next-line array-callback-return
          r.data.message.result.map((el) => {
            numRow.value = numRow.value + 1
            el.datefrom = moment(el.datefrom).format('YYYY-MM-DD')
            el.numRow = numRow.value
            if (el.visitorPrepegisterStatusId === 1) {
              el.RemarkData = el.floornameth
              el.visitorPrepegisterStatusId = 'อนุมัติ'
            }
            if (el.visitorPrepegisterStatusId === 2) {
              el.RemarkData = el.floornameth + ' เนื่องจาก ' + el.rejectedRemark
              el.visitorPrepegisterStatusId = 'ไม่อนุมัติ'
            }
            if (el.visitorPrepegisterStatusId === 3) {
              el.RemarkData = el.remark
              el.visitorPrepegisterStatusId = 'รออนุมัติ'
            }
          })
          data.value = r.data.message.result
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
    // const filters = (data) => {
    //   return data.substring(0, 8) + 'xx' + data.substring(10, 12)
    // }
    function handleChangeStatus(value) {
      if (value === '=0') {
        form.status = 0
      }
      if (value === '=1') {
        form.status = 1
      }
      if (value === '=2') {
        form.status = 2
      }
      if (value === '=3') {
        form.status = 3
      }
    }
    function onChangeTime(dateString) {
      for (let index = 0; index < dateString.length; index++) {
        if (index === 0) {
          // this.checkIn ={ "Timein":dateString[index]}
          form.dateStart = dateString[index]
        }
        if (index === 1) {
          // this.checkOut = {"Timeout":dateString[index]}
          form.dateEnd = dateString[index]
        }
      }
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

    // function onSearch(value) {
    //   console.log(form)
    //   numRow.value = 0
    //   if (value !== '') {
    //     form.keyword = value
    //     form.page = 1
    //     form.pageSize = 100
    //     fetch()
    //   } else {
    //     form.keyword = value
    //     form.page = 1
    //     form.pageSize = 100
    //     fetch()
    //   }
    // }

    function handleSubmit() {
      numRow.value = 0
      form.fristName = formInline.fristName
      form.lastName = formInline.lastName
      form.host = formInline.host
      form.email = formInline.email
      form.phone = formInline.phone

      form.keyword = ''
      form.page = 1
      form.pageSize = 100
      console.log(form)
      fetch()
    }
    const onExport = () => {
      const d = new Date()
      const dateTime1 = d.toString()
      const split1 = dateTime1.indexOf('(')
      const splitstring = dateTime1.substring(0, split1)
      numRow.value = 0
      form.fristName = formInline.fristName
      form.lastName = formInline.lastName
      form.host = formInline.host
      form.email = formInline.email
      form.phone = formInline.phone

      form.keyword = ''
      form.page = 1
      form.pageSize = 100
      loading.value = true
      const namereport =
        'ticket-transaction-preregister-' + splitstring + '.XLSX'
      if (form.dateStart === '' && form.dateEnd === '') {
        Modal.warning({
          title: 'กรุณาเลือกค่า',
        })
      } else {
        context.root.$axios
          .post(
            '/apis/ReportTransaction/DownloadFilePerRegisterExcel',
            {
              status: form.status,
              dateStart: form.dateStart,
              dateEnd: form.dateEnd,
              host: form.host,
              fristName: form.fristName,
              lastName: form.lastName,
              phone: form.phone,
              email: form.email,
              keyword: form.keyword,
              page: form.page,
              pageSize: form.pageSize,
            },
            {
              responseType: 'blob',
            }
          )
          .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', namereport) // or any other extension
            document.body.appendChild(link)
            link.click()
          })
          .catch(() => {
            Modal.error({
              title: 'ไม่สำเร็จ',
            })
          })
      }
      loading.value = false
    }
    const onExportPdf = () => {
      const d = new Date()
      const dateTime1 = d.toString()
      const split1 = dateTime1.indexOf('(')
      const splitstring = dateTime1.substring(0, split1)
      numRow.value = 0
      form.fristName = formInline.fristName
      form.lastName = formInline.lastName
      form.host = formInline.host
      form.email = formInline.email
      form.phone = formInline.phone

      form.keyword = ''
      form.page = 1
      form.pageSize = 100
      loading.value = true
      const namereport =
        'ticket-transaction-preregister-' + splitstring + '.pdf'
      if (form.dateStart === '' && form.dateEnd === '') {
        Modal.warning({
          title: 'กรุณาเลือกค่า',
        })
      } else {
        context.root.$axios
          .post(
            '/apis/ReportTransaction/DownloadFilePerRegisterPdf',
            {
              status: form.status,
              dateStart: form.dateStart,
              dateEnd: form.dateEnd,
              host: form.host,
              fristName: form.fristName,
              lastName: form.lastName,
              phone: form.phone,
              email: form.email,
              keyword: form.keyword,
              page: form.page,
              pageSize: form.pageSize,
            },
            {
              responseType: 'blob',
            }
          )
          .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', namereport) // or any other extension
            document.body.appendChild(link)
            link.click()
          })
          .catch(() => {
            Modal.error({
              title: 'ไม่สำเร็จ',
            })
          })
      }
      loading.value = false
    }

    return {
      columns,
      data,
      loading,
      pagination,
      handleTableChange,
      visible,
      dataModel,
      message,
      sortedInfo,
      moment,
      dateFormat,
      TimeNow,
      handleChangeStatus,
      onChangeTime,
      formInline,
      handleSubmit,
      onExport,
      onExportPdf,
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
