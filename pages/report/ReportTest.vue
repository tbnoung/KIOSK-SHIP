<template>
  <div class="pt-5">
    <a-divider orientation="center">
      <h1 id="headerregister">ข้อมูลเทส</h1>
    </a-divider>
    <div class="justify-items-center mt-3 ml-5">
      <a-row class="pt-3">
        <a-col :span="20">
          <a-form
            layout="inline"
            style="margin-bottom: 0"
            @submit="handleSubmit"
            @submit.native.prevent
          >
            <a-form-item label="ค้นหาจากวันที่">
              <a-date-picker style="width: 100%" />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit">
                <a-icon type="search"
              /></a-button>
            </a-form-item>
          </a-form>
        </a-col>
        <a-col :span="4">
          <a-button type="primary" class="justify-items-end" @click="onExport"
            ><a-icon type="file-excel" />Excel</a-button
          >

          <a-button
            type="primary"
            class="justify-items-end"
            @click="onExportPdf"
            ><a-icon type="file-pdf" />Pdf</a-button
          >
        </a-col>
        <!-- <a-form layout="inline" @submit="handleSubmit" @submit.native.prevent>
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
              :placeholder="$t('Report.preRegister.titleEmployeestocontact')"
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
        </a-form> -->
        <!-- <a-form-item layout="inline" label="inline" style="margin-bottom: 0">
          <a-form-item
            validate-status="error"
            help="Please select the correct date"
            :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
          >
            <a-date-picker style="width: 100%" />
          </a-form-item>
          <a-form-item wrapper-col="inline-block">
            <a-button type="primary"> Submit </a-button>
          </a-form-item>
        </a-form-item> -->
      </a-row>
    </div>

    <div class="mt-3">
      <a-spin size="large" :spinning="spinning" tip="Loading..."></a-spin>
      <a-table
        :columns="columns"
        :row-key="(record) => record.name"
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
      </a-table>
    </div>
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
import { Modal } from 'ant-design-vue'
import moment from 'moment'
export default defineComponent({
  setup(_props, context) {
    // prop--------
    const loading = ref(false)
    const numRow = ref(0)
    const dataExcel = ref([])
    const data = ref([])
    const spinning = ref(false)
    const dateclick = {
      SearchClick: '',
    }
    const sortedInfo = ref('')
    const {
      app: { i18n },
    } = useContext()
    const formInline = reactive({
      fristName: '',
      lastName: '',
      host: '',
      phone: '',
      email: '',
    })
    // --------------------
    const columns = [
      {
        title: '#',
        dataIndex: 'numRow',
      },
      {
        slotName: 'Report.VipReport.name',
        dataIndex: 'name',
        scopedSlots: {
          title: 'Report.VipReport.name',
        },
      },
      {
        slotName: 'Report.VipReport.citizenid',
        dataIndex: 'citizen_id',
        scopedSlots: {
          title: 'Report.VipReport.citizenid',
        },
      },
      {
        slotName: 'Report.VipReport.gender',
        dataIndex: 'gender',
        scopedSlots: {
          title: 'Report.VipReport.gender',
        },
      },
      {
        slotName: 'Report.VipReport.country',
        dataIndex: 'country',
        scopedSlots: {
          title: 'Report.VipReport.country',
        },
      },
      {
        slotName: 'Report.VipReport.remark',
        dataIndex: 'remark',
        scopedSlots: {
          title: 'Report.VipReport.remark',
        },
      },
      {
        slotName: 'Report.VipReport.vipdate',
        dataIndex: 'visitor_status_date',
        scopedSlots: {
          title: 'Report.VipReport.vipdate',
        },
      },
      {
        slotName: 'Report.VipReport.vipby',
        dataIndex: 'visitor_status_by',
        scopedSlots: {
          title: 'Report.VipReport.vipby',
        },
      },
    ]
    onMounted(() => {
      fetch()
    })
    const pagination = reactive({
      total: 0,
      current: 1,
      pageSize: 100,
      showQuickJumper: true,
      showSizeChanger: true,
      pageSizeOptions: ['100', '125', '150'],
      position: 'top',
      showTotal: (total, range) =>
        i18n.t('masterData.paginationLoad.titleshow') +
        `  ${range[0]}  ` +
        i18n.t('masterData.paginationLoad.titleto') +
        `  ${range[1]}  ` +
        i18n.t('masterData.paginationLoad.titleof') +
        `  ${total}  ` +
        i18n.t('masterData.paginationLoad.titleitems'),
    })

    const fetch = async () => {
      loading.value = true
      dataExcel.value = []
      numRow.value = 0
      await context.root.$axios
        .get('/Report/' + 'GetReportNewVIP')
        .then((r) => {
          // eslint-disable-next-line array-callback-return
          r.data.map((el) => {
            numRow.value = numRow.value + 1
            el.numRow = numRow.value
            el.visitor_status_date = moment(el.visitor_status_date).format(
              'YYYY-MM-DD'
            )
            el.citizen_id = filters(el.citizen_id)
          })
          data.value = r.data
          dataExcel.value = r.data
          loading.value = false
          pagination.showTotal = (total, range) =>
            i18n.t('masterData.paginationLoad.titleshow') +
            `  ${range[0]}  ` +
            i18n.t('masterData.paginationLoad.titleto') +
            `  ${range[1]}  ` +
            i18n.t('masterData.paginationLoad.titleof') +
            `  ${total}  ` +
            i18n.t('masterData.paginationLoad.titleitems')
          numRow.value = 0
        })
        .finally(() => {
          loading.value = false
        })
    }
    function handleTableChange(p, sorter) {
      sortedInfo.value = sorter
      numRow.value = 0
      pagination.pageSize = p.pageSize
      pagination.current = p.current
    }

    const onSearch = async (value) => {
      dateclick.SearchClick = value
      loading.value = true
      data.value = []
      dataExcel.value = []
      numRow.value = 0
      await context.root.$axios
        .post('/Report/' + 'SearchReportNewReportVIP', dateclick)
        .then((r) => {
          // eslint-disable-next-line array-callback-return
          r.data.map((el) => {
            numRow.value = numRow.value + 1
            el.numRow = numRow.value
            el.vip_date = moment(el.vip_date).format('YYYY-MM-DD')
          })
          loading.value = false
          data.value = r.data
          dataExcel.value = r.data
          numRow.value = 0
        })
        .catch(() => {
          loading.value = false
        })
    }
    const onExport = () => {
      spinning.value = true
      const d = new Date()
      const dateTime1 = d.toString()
      const split1 = dateTime1.indexOf('(')
      const splitstring = dateTime1.substring(0, split1)
      loading.value = true
      const namereport = 'visitor-vip-report-' + splitstring + '.XLSX'
      context.root.$axios
        .post('/Report/' + 'DownloadFileVipNewExcel', dateclick, {
          responseType: 'blob',
        })
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

      loading.value = false
      spinning.value = false
    }
    const onExportPdf = () => {
      spinning.value = true
      const d = new Date()
      const dateTime1 = d.toString()
      const split1 = dateTime1.indexOf('(')
      const splitstring = dateTime1.substring(0, split1)
      loading.value = true
      const namereport = 'visitor-vip-report-' + splitstring + '.pdf'
      context.root.$axios
        .post('/Report/' + 'DownloadFileVipNewPdf', dateclick, {
          responseType: 'blob',
        })
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

      loading.value = false
      spinning.value = false
    }

    const filters = (data) => {
      return data.substring(0, 8) + 'xx' + data.substring(10, 12)
    }

    return {
      columns,
      loading,
      handleTableChange,
      pagination,
      data,
      dateclick,
      onSearch,
      onExport,
      onExportPdf,
      sortedInfo,
      spinning,
      moment,
      formInline,
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
  padding-right: 2vw;
}
</style>
