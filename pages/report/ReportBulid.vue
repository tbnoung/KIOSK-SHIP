<template>
  <div>
    <a-divider orientation="center">
      <h1 id="headerregister">{{ $t('Report.titleBulid') }}</h1>
    </a-divider>
    <a-card :bordered="false">
      <div class="justify-items-center">
        <a-row>
          <a-col :xs="{ span: 24 }" :xl="{ span: 20 }">
            <a-range-picker
              :default-value="[
                moment(TimeNow, dateFormat),
                moment(TimeNow, dateFormat),
              ]"
              :format="dateFormat"
              @change="onChangeTime"
            />
            <a-select
              default-value=">=1"
              style="width: 120px"
              @change="handleChangeBulid"
            >
              <a-select-option value=">=1">
                {{ $t('Report.titleselect') }}
              </a-select-option>
              <a-select-option value="=1"> ENCO A </a-select-option>
              <a-select-option value="=2"> ENCO B </a-select-option>
              <a-select-option value="=3"> LOADING A </a-select-option>
              <a-select-option value="=4"> LOADING B </a-select-option>
            </a-select>

            <a-input-search
              :placeholder="$t('Report.search_btn')"
              enter-button
              class="antSize"
              @search="onSearch"
            />
          </a-col>

          <a-col :xs="{ span: 24 }" :xl="{ span: 4 }" class="SearchBox">
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
    const dateclick = {
      checkIn: '',
      checkOut: '',
      bulidclick: '>=1',
      SearchClick: '',
    }
    const dateFormat = 'YYYY-MM-DD'
    const Timestring = new Date()
    const TimeNow = ref(
      moment(Timestring.toLocaleString('en-US', { timeZone: 'UTC' })).format(
        'YYYY-MM-DD'
      )
    )
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
        slotName: 'Report.SummaryReport.titleBulidFloor',
        dataIndex: 'nameBulid',
        scopedSlots: {
          title: 'Report.SummaryReport.titleBulidFloor',
        },
      },
      {
        slotName: 'Report.SummaryReport.titleFloor',
        dataIndex: 'nameFloor',
        scopedSlots: {
          title: 'Report.SummaryReport.titleFloor',
        },
      },
      {
        slotName: 'Report.SummaryReport.titleCheckIn',
        dataIndex: 'checkinCount',
        scopedSlots: {
          title: 'Report.SummaryReport.titleCheckIn',
        },
      },
      {
        slotName: 'Report.SummaryReport.titleCheckOut',
        dataIndex: 'checkoutCount',
        scopedSlots: {
          title: 'Report.SummaryReport.titleCheckOut',
        },
      },
      {
        slotName: 'Report.SummaryReport.titleStay',
        dataIndex: 'checkTime',
        scopedSlots: {
          title: 'Report.SummaryReport.titleStay',
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
        .get('/Report/' + 'GetReportbuilding')
        .then((r) => {
          // eslint-disable-next-line array-callback-return
          r.data.map((el) => {
            numRow.value = numRow.value + 1
            el.numRow = numRow.value
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
    function onChangeTime(dateString) {
      for (let index = 0; index < dateString.length; index++) {
        if (index === 0) {
          // this.checkIn ={ "Timein":dateString[index]}
          dateclick.checkIn = dateString[index]
        }
        if (index === 1) {
          // this.checkOut = {"Timeout":dateString[index]}
          dateclick.checkOut = dateString[index]
        }
      }
    }
    function handleChangeBulid(value) {
      // this.bulidclick = { Bulid: value }
      dateclick.bulidclick = value
    }
    const onSearch = async (value) => {
      dateclick.SearchClick = value
      loading.value = true
      data.value = []
      dataExcel.value = []
      numRow.value = 0
      await context.root.$axios
        .post('/Report/' + 'SearchReportbuilding', dateclick)
        .then((r) => {
          // eslint-disable-next-line array-callback-return
          r.data.map((el) => {
            numRow.value = numRow.value + 1
            el.numRow = numRow.value
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
      const d = new Date()
      const dateTime1 = d.toString()
      const split1 = dateTime1.indexOf('(')
      const splitstring = dateTime1.substring(0, split1)

      const namereport = 'ticket-daily-report-' + splitstring + '.XLSX'
      if (dateclick.checkIn === '' && dateclick.checkOut === '') {
        Modal.warning({
          title: 'กรุณาเลือกค่า',
        })
      } else {
        context.root.$axios
          .post('/Report/' + 'DownloadFileBulidExcel', dateclick, {
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
      }
    }
    const onExportPdf = () => {
      const d = new Date()
      const dateTime1 = d.toString()
      const split1 = dateTime1.indexOf('(')
      const splitstring = dateTime1.substring(0, split1)
      const namereport = 'ticket-daily-report-' + splitstring + '.pdf'
      if (dateclick.checkIn === '' && dateclick.checkOut === '') {
        Modal.warning({
          title: 'กรุณาเลือกค่า',
        })
      } else {
        context.root.$axios
          .post('/Report/' + 'DownloadFileBulidPdf', dateclick, {
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
      }
    }

    return {
      columns,
      loading,
      handleTableChange,
      pagination,
      data,
      onChangeTime,
      dateclick,
      handleChangeBulid,
      onSearch,
      onExport,
      onExportPdf,
      sortedInfo,
      dateFormat,
      TimeNow,
      moment,
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
.antSize {
  width: 250px;
  margin: 0 8px 8px 0;
}
</style>
