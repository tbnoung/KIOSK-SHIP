<template>
  <div>
    <a-divider orientation="center">
      <h1 id="headerregister">{{ $t('masterData.titletcountry') }}</h1>
    </a-divider>
    <a-card :bordered="false">
      <div>
        <div>
          <a-row>
            <a-col :xs="{ span: 24 }" :md="{ span: 8 }">
              <a-input-search
                :placeholder="$t('masterData.search_btn')"
                enter-button
                size="large"
                @search="onSearch"
              />
            </a-col>
            <a-col class="SearchBox" :xs="{ span: 24 }" :md="{ span: 16 }">
              <a-button
                type="primary"
                size="large"
                icon="plus-square"
                @click="showModal()"
                >{{ $t('masterData.titletIInsertcountry') }}</a-button
              >
            </a-col>
          </a-row>
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
          <template v-for="(item, index) in columns" :slot="item.slotName">
            <span :key="index">{{ $t(item.slotName) }}</span>
          </template>

          <template slot="id" slot-scope="id">
            <a-button
              type="primary"
              icon="edit"
              shape="circle"
              @click="showModal(id)"
            ></a-button>
            <a-button
              type="danger"
              icon="delete"
              shape="circle"
              @click="deleteItem(id)"
            ></a-button>
            <!-- <a @click="showModal(id)"><a-icon type="edit" /></a>
            <a @click="deleteItem(id)"><a-icon type="delete" /></a> -->
          </template>
        </a-table>
      </div>

      <div>
        <validation-observer ref="inputForm" v-slot="{ handleSubmit }" slim>
          <a-modal
            :title="titleModel"
            :visible="visible"
            :width="500"
            @ok="handleSubmit(onSubmit)"
            @cancel="handleCancel"
          >
            <a-form :form="form">
              <validation-provider
                v-slot="{ errors }"
                :name="$t('masterData.countryModel.titlecountry')"
                rules="required"
              >
                <a-form-item
                  :validate-status="errors[0] ? 'error' : null"
                  :help="errors[0]"
                  :label="$t('masterData.countryModel.titlecountry')"
                >
                  <a-input
                    v-model="form.countryName"
                    :placeholder="$t('masterData.countryModel.titlecountry')"
                  ></a-input>
                </a-form-item>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                :name="$t('masterData.countryModel.titleISO2CODE')"
                rules="required"
              >
                <a-form-item
                  :validate-status="errors[0] ? 'error' : null"
                  :help="errors[0]"
                  :label="$t('masterData.countryModel.titleISO2CODE')"
                >
                  <a-input
                    v-model="form.iso2code"
                    :placeholder="$t('masterData.countryModel.titleISO2CODE')"
                  ></a-input>
                </a-form-item>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                :name="$t('masterData.countryModel.titleISO3CODE')"
                rules="required"
              >
                <a-form-item
                  :validate-status="errors[0] ? 'error' : null"
                  :help="errors[0]"
                  :label="$t('masterData.countryModel.titleISO3CODE')"
                >
                  <a-input
                    v-model="form.iso3code"
                    :placeholder="$t('masterData.countryModel.titleISO3CODE')"
                  ></a-input>
                </a-form-item>
              </validation-provider>
              <a-form-item label="id" hidden>
                <a-input v-model="form.id" placeholder="id"> </a-input>
              </a-form-item>
            </a-form>
          </a-modal>
        </validation-observer>
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
    // prop
    const data = ref([])
    const titleModel = ref('')
    const numRow = ref(0)
    const loading = ref(false)
    const visible = ref(false)
    const sortedInfo = ref('')
    const dataModel = ref({})
    const formRef = ref()
    const {
      app: { i18n },
    } = useContext()
    const form = reactive({
      id: undefined,
      countryName: '',
      iso2code: '',
      iso3code: '',
    })
    // -------------
    const columns = [
      {
        title: '#',
        dataIndex: 'numRow',
      },
      {
        slotName: 'masterData.countryModel.titlecountry',
        dataIndex: 'countryName',
        scopedSlots: {
          title: 'masterData.countryModel.titlecountry',
        },
      },
      {
        slotName: 'masterData.countryModel.titleISO2CODE',
        dataIndex: 'iso2code',
        scopedSlots: {
          title: 'masterData.countryModel.titleISO2CODE',
        },
      },
      {
        slotName: 'masterData.countryModel.titleISO3CODE',
        dataIndex: 'iso3code',
        scopedSlots: {
          title: 'masterData.countryModel.titleISO3CODE',
        },
      },
      {
        slotName: 'masterData.titleDate',
        dataIndex: 'createdAt',
        scopedSlots: {
          title: 'masterData.titleDate',
        },
      },
      {
        slotName: 'masterData.titleAction',
        dataIndex: 'id',
        scopedSlots: {
          customRender: 'id',
          title: 'masterData.titleAction',
        },
      },
    ]
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
      await context.root.$axios
        .get('/apis/Country')
        .then((r) => {
          // eslint-disable-next-line array-callback-return
          r.data.message.map((el) => {
            numRow.value = numRow.value + 1
            el.numRow = numRow.value
            el.createdAt = moment(el.createdAt).format('YYYY-MM-DD')
          })
          data.value = r.data.message

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
    onMounted(() => {
      fetch()
    })
    function handleTableChange(p, sorter) {
      sortedInfo.value = sorter
      numRow.value = 0
      pagination.pageSize = p.pageSize
      pagination.current = p.current
      fetch()
    }
    const onSubmit = async () => {
      numRow.value = 0
      if (form.id > 0) {
        await context.root.$axios
          .put('/apis/Country/Update', form)
          .then(
            Modal.success({
              title: 'สำเร็จ',
            })
          )
          .catch(() => {
            Modal.error({
              title: 'ไม่สำเร็จ',
            })
          })
          .finally(fetch)
      } else {
        await context.root.$axios
          .post('/apis/Country/Create', form)
          .then(
            Modal.success({
              title: 'สำเร็จ',
            })
          )
          .catch(() => {
            Modal.error({
              title: 'ไม่สำเร็จ',
            })
          })
          .finally(fetch)
      }
      visible.value = false
    }
    function handleCancel() {
      visible.value = false
    }
    const showModal = async (id) => {
      loading.value = true
      if (id != null) {
        titleModel.value = i18n.t('masterData.titleModelEdit')
        await context.root.$axios
          .get('/apis/Country/' + id)
          .then(({ data }) => {
            form.countryName = data.message.countryName
            form.iso2code = data.message.iso2code
            form.iso3code = data.message.iso3code
            form.id = parseInt(data.message.id)
          })
          // eslint-disable-next-line node/handle-callback-err
          .catch(() => {
            Modal.error({
              title: 'ไม่สำเร็จ',
            })
          })
        visible.value = true
      } else {
        titleModel.value = i18n.t('masterData.titleModelAdd')
        form.id = ''
        form.countryName = ''
        form.iso2code = ''
        form.iso3code = ''
        visible.value = true
      }
      loading.value = false
    }
    function onSearch(value) {
      numRow.value = 0
      if (value !== '') {
        Search(value)
      } else {
        fetch()
      }
    }
    const Search = async (value) => {
      loading.value = true
      await context.root.$axios
        .get('/apis/Country')
        .then((r) => {
          const datavalue = r.data.message.filter(
            (x) =>
              x.countryName === value.trim() ||
              x.iso2code === value.trim() ||
              x.iso3code === value.trim()
          )
          // eslint-disable-next-line array-callback-return
          datavalue.map((el) => {
            numRow.value = numRow.value + 1
            el.numRow = numRow.value
            el.createdAt = moment(el.createdAt).format('YYYY-MM-DD')
          })
          data.value = datavalue

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
    const deleteItem = (id) => {
      numRow.value = 0
      if (id != null) {
        Modal.confirm({
          content: 'คุณต้องการลบข้อมูลหรือไม่่',
          onOk() {
            context.root.$axios
              .delete('/apis/Country/Delete/' + id)
              .then(
                Modal.success({
                  title: 'สำเร็จ',
                })
              )
              .catch(() => {
                Modal.error({
                  title: 'ไม่สำเร็จ',
                })
              })
              .finally(fetch)
          },
        })
      }
    }
    return {
      columns,
      data,
      loading,
      pagination,
      handleTableChange,
      visible,
      onSubmit,
      handleCancel,
      showModal,
      dataModel,
      onSearch,
      sortedInfo,
      form,
      titleModel,
      formRef,
      deleteItem,
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
