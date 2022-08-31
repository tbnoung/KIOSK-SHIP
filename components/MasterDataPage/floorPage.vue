<template>
  <div>
    <a-divider orientation="center">
      <h1 id="headerregister">{{ $t('masterData.titletfloor') }}</h1>
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
                >{{ $t('masterData.titletIInsertfloor') }}</a-button
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
            <a-form ref="formRef" :model="form" :rules="rules">
              <validation-provider
                v-slot="{ errors }"
                :name="$t('masterData.floorModel.titleNameFloor')"
                rules="required"
              >
                <a-form-item
                  :validate-status="errors[0] ? 'error' : null"
                  :help="errors[0]"
                  :label="$t('masterData.floorModel.titleNameFloor')"
                >
                  <a-input
                    v-model="form.nameTh"
                    :placeholder="$t('masterData.floorModel.titleNameFloor')"
                  ></a-input>
                </a-form-item>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                :name="$t('masterData.floorModel.titleNameFloorEN')"
                rules="required"
              >
                <a-form-item
                  :validate-status="errors[0] ? 'error' : null"
                  :help="errors[0]"
                  :label="$t('masterData.floorModel.titleNameFloorEN')"
                >
                  <a-input
                    v-model="form.nameEn"
                    :placeholder="$t('masterData.floorModel.titleNameFloorEN')"
                  ></a-input>
                </a-form-item>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                :name="$t('masterData.floorModel.titleBulid')"
                rules="required"
              >
                <a-form-item
                  :validate-status="errors[0] ? 'error' : null"
                  :help="errors[0]"
                  :label="$t('masterData.floorModel.titleBulid')"
                  has-feedback
                >
                  <a-select
                    v-model="form.buildingId"
                    :placeholder="$t('masterData.floorModel.titleBulid')"
                  >
                    <a-select-option
                      v-for="selectData in SelectbuildingId"
                      :key="selectData.id"
                      :value="selectData.id"
                    >
                      {{ selectData.nameTh }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                :name="$t('masterData.floorModel.titleDescrption')"
                rules="required"
              >
                <a-form-item
                  :validate-status="errors[0] ? 'error' : null"
                  :help="errors[0]"
                  :label="$t('masterData.floorModel.titleDescrption')"
                >
                  <a-input
                    v-model="form.description"
                    :placeholder="$t('masterData.floorModel.titleDescrption')"
                  ></a-input>
                </a-form-item>
              </validation-provider>
              <a-form-item hidden>
                <a-input v-model="form.id"> </a-input>
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
      nameTh: '',
      nameEn: '',
      description: '',
      buildingId: '',
    })
    const SelectbuildingId = ref()
    // -------------
    const columns = [
      {
        title: '#',
        dataIndex: 'numRow',
      },
      {
        slotName: 'masterData.floorModel.titleNameFloor',
        dataIndex: 'nameTh',
        scopedSlots: {
          title: 'masterData.floorModel.titleNameFloor',
        },
      },
      {
        slotName: 'masterData.floorModel.titleNameFloorEN',
        dataIndex: 'nameEn',
        scopedSlots: {
          title: 'masterData.floorModel.titleNameFloorEN',
        },
      },
      {
        slotName: 'masterData.floorModel.titleBulid',
        dataIndex: 'nameBulid',
        scopedSlots: {
          title: 'masterData.floorModel.titleBulid',
        },
      },
      {
        slotName: 'masterData.floorModel.titleDescrption',
        dataIndex: 'description',
        scopedSlots: {
          title: 'masterData.floorModel.titleDescrption',
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
    const rules = {
      id: [
        {
          required: false,
        },
      ],
      nameTh: [
        {
          required: true,
          message:
            'Please input ' +
            i18n.t('masterData.ObjectiveModel.titleObjective'),
        },
      ],
      nameEn: [
        {
          required: true,
          message:
            'Please input ' +
            i18n.t('masterData.ObjectiveModel.titleObjectiveEN'),
        },
      ],
    }
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
        .get('/apis/Floor')
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
      fetchDropDown()
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
        let datareult = form.buildingId
        SelectbuildingId.value.forEach((x) => {
          if (x.nameTh === form.buildingId) {
            datareult = x.id
          }
        })
        form.buildingId = datareult
        await context.root.$axios
          .put('/apis/Floor/Update', form)
          .then(
            Modal.success({
              title: 'สำเร็จ1',
            })
          )
          .catch(() => {
            Modal.error({
              title: 'ไม่สำเร็จ1',
            })
          })
          .finally(fetch)
      } else {
        await context.root.$axios
          .post('/apis/Floor/Create', form)
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
          .get('/apis/Floor/' + id)
          .then(({ data }) => {
            form.id = parseInt(data.message[0].id)
            form.nameTh = data.message[0].nameTh
            form.nameEn = data.message[0].nameEn
            form.description = data.message[0].description
            form.buildingId = data.message[0].nameBulid
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
        form.nameTh = ''
        form.nameEn = ''
        form.description = ''
        form.buildingId = ''
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
        .get('/apis/Floor')
        .then((r) => {
          const datavalue = r.data.message.filter(
            (x) =>
              x.nameTh === value.trim() ||
              x.nameBulid === value.trim() ||
              x.description === value.trim()
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
              .delete('/apis/Floor/Delete/' + id)
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

    const fetchDropDown = () => {
      context.root.$axios.get('/apis/Floor/BulidDropdown').then(({ data }) => {
        SelectbuildingId.value = data.message
      })
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
      rules,
      formRef,
      deleteItem,
      SelectbuildingId,
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
