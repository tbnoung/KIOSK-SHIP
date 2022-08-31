<template>
  <div>
    <a-divider orientation="center">
      <h1 id="headerregister">{{ $t('masterData.titletaccesscard') }}</h1>
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
                >{{ $t('masterData.titletIInsertaccesscard') }}</a-button
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
          <!-- หัวคอลัม -->
          <template v-for="(item, index) in columns" :slot="item.slotName">
            <span :key="index">{{ $t(item.slotName) }}</span>
          </template>
          <!-- เพิ่มไอคอน -->
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
            <!-- <a @click="showModal(id)"><a-icon type="edit" /></a> -->
            <!-- <a @click="deleteItem(id)"><a-icon type="delete" /></a> -->
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
                :name="$t('masterData.accesscardModel.titleNumberserial')"
                rules="required"
              >
                <a-form-item
                  :validate-status="errors[0] ? 'error' : null"
                  :help="errors[0]"
                  :label="$t('masterData.accesscardModel.titleNumberserial')"
                >
                  <a-input
                    v-model="form.serialNumber"
                    :placeholder="
                      $t('masterData.accesscardModel.titleNumberserial')
                    "
                  ></a-input>
                </a-form-item>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                :name="$t('masterData.accesscardModel.titleNumberCard')"
                rules="required"
              >
                <a-form-item
                  :validate-status="errors[0] ? 'error' : null"
                  :help="errors[0]"
                  :label="$t('masterData.accesscardModel.titleNumberCard')"
                >
                  <a-input
                    v-model="form.cardNo"
                    :placeholder="
                      $t('masterData.accesscardModel.titleNumberCard')
                    "
                  ></a-input>
                </a-form-item>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                :name="$t('masterData.accesscardModel.titleDescrption')"
                rules="required"
              >
                <a-form-item
                  :validate-status="errors[0] ? 'error' : null"
                  :help="errors[0]"
                  :label="$t('masterData.accesscardModel.titleDescrption')"
                >
                  <a-input
                    v-model="form.cardDescription"
                    :placeholder="
                      $t('masterData.accesscardModel.titleDescrption')
                    "
                  ></a-input>
                </a-form-item>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                :name="$t('masterData.accesscardModel.titleMac')"
                rules="required"
              >
                <a-form-item
                  :validate-status="errors[0] ? 'error' : null"
                  :help="errors[0]"
                  :label="$t('masterData.accesscardModel.titleMac')"
                >
                  <a-input
                    v-model="form.macaddress"
                    :placeholder="$t('masterData.accesscardModel.titleMac')"
                  ></a-input>
                </a-form-item>
              </validation-provider>
              <a-form-item>
                <a-input v-model="form.id" hidden> </a-input>
              </a-form-item>
            </a-form>
          </a-modal>
        </validation-observer></div
    ></a-card>
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
// import Stable from '../components/Table/index.js'

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
      cardNo: '',
      serialNumber: '',
      cardDescription: '',
      macaddress: '',
    })
    // -------------

    const columns = [
      {
        title: '#',
        dataIndex: 'numRow',
      },
      {
        slotName: 'masterData.accesscardModel.titleNumberserial',
        dataIndex: 'serialNumber',
        scopedSlots: {
          title: 'masterData.accesscardModel.titleNumberserial',
        },
      },
      {
        slotName: 'masterData.accesscardModel.titleNumberCard',
        dataIndex: 'cardNo',
        scopedSlots: {
          title: 'masterData.accesscardModel.titleNumberCard',
        },
      },
      {
        slotName: 'masterData.accesscardModel.titleMac',
        dataIndex: 'macAddress',
        scopedSlots: {
          title: 'masterData.accesscardModel.titleMac',
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
        .get('/apis/AccessCardMaster')
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
          .put('/apis/AccessCardMaster/Update', form)
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
          .post('/apis/AccessCardMaster/Create', form)
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
          .get('/apis/AccessCardMaster/' + id)
          .then(({ data }) => {
            form.cardNo = data.message.cardNo
            form.serialNumber = data.message.serialNumber
            form.cardDescription = data.message.cardDescription
            form.macaddress = data.message.macAddress
            form.id = data.message.id
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
        form.cardNo = ''
        form.serialNumber = ''
        form.cardDescription = ''
        form.macaddress = ''
        form.id = ''
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
        .get('/apis/AccessCardMaster')
        .then((r) => {
          const datavalue = r.data.message.filter(
            (x) =>
              x.serialNumber === value.trim() ||
              x.cardDescription === value.trim() ||
              x.cardNo === value.trim() ||
              x.macAddress === value.trim()
          )
          // eslint-disable-next-line array-callback-return
          datavalue.map((el) => {
            numRow.value = numRow.value + 1
            el.numRow = numRow.value
            el.createdAt = moment().format('YYYY-MM-DD')
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
              .delete('/apis/AccessCardMaster/Delete/' + id)
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
