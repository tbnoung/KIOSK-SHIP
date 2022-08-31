<template>
  <div>
    <a-divider orientation="center">
      <h1 id="headerregister">{{ $t('Report.VipReport.title') }}</h1>
    </a-divider>
    <a-card :bordered="false">
      <div class="justify-items-center">
        <a-row>
          <a-col :xs="{ span: 24 }" :md="{ span: 8 }">
            <a-input-search
              :placeholder="$t('Report.search_btn')"
              enter-button
              size="large"
              @search="onSearch"
            />
          </a-col>

          <a-col :xs="{ span: 24 }" :md="{ span: 16 }" class="SearchBox">
            <a-button type="primary" class="mr-2" size="large" @click="onExport"
              ><a-icon type="file-excel" />Excel</a-button
            >
            <a-button type="primary" size="large" @click="onExportPdf"
              ><a-icon type="file-pdf" />Pdf</a-button
            >
          </a-col>
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
        filters: [
          { text: 'ชาย', value: '1' },
          { text: 'หญิง', value: '2' },
        ],
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
            el.gender = el.gender === '1' ? 'ชาย' : 'หญิง'
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
            el.gender = el.gender === '1'  ? 'ชาย' : 'หญิง'
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
