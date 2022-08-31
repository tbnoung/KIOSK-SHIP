<template>
  <div>
    <a-table
      :columns="header"
      :data-source="propDataTable"
      :pagination="false"
      bordered
      row-key="id"
      :scroll="{ x: 'auto' }"
    >
      <div slot="order" slot-scope="text, record, index">
        {{ index + 1 }}
      </div>
      <div
        v-for="(col, i) in ['nameTh', 'nameEn']"
        :key="i"
        :slot="col"
        slot-scope="text, record"
      >
        <div v-if="record.editable">
          <a-input v-model="record[col]" />
        </div>
        <div v-else>{{ text }}</div>
      </div>
      <div slot="accesstypepersonnameTh" slot-scope="text, record">
        <div v-if="record.editable">
          <a-select
            v-model="record.accesstypepersonId"
            style="width: 100%"
            @select="selectAccessTypePerson($event, record)"
          >
            <a-select-option
              v-for="typePerson in getAccessTypePerson"
              :key="typePerson.id"
              :value="typePerson.id"
            >
              <div>
                <span>{{ typePerson.nameTh }}</span>
              </div>
            </a-select-option>
          </a-select>
        </div>
        <div v-else>{{ text }}</div>
      </div>
      <div slot="subArea" slot-scope="text, record">
        <div v-for="(item, index) in record.shipSubArea" :key="index">
          {{ item.nameTh }}
        </div>
      </div>
      <div slot="status" slot-scope="text, record">
        <a-switch v-model="record.status" />
      </div>
      <div slot="operation" slot-scope="text, record">
        <a-icon type="edit" @click="editColunm(record)" />
      </div>
      <div slot="editSubArea" slot-scope="text, record">
        <a-icon type="edit" @click="editSubColunm(record)" />
      </div>
    </a-table>
    <ShipAreaZoneEditSubAreaModal
      :active="editSubArea.active"
      :props-form="editSubArea.record"
      text-confirm="Save"
      text-cancle="Close"
      @close="editSubArea.active = false"
    />
  </div>
</template>

<script>
export default {
  props: {
    header: {
      type: Array,
      default: () => [],
    },
    propDataTable: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      editSubArea: {
        active: false,
        record: null,
      },
    }
  },
  computed: {
    getAccessTypePerson() {
      return this.$store.getters['personalType/getAccessTypePerson']
    },
  },
  methods: {
    editColunm(record) {
      record.editable = !record.editable
    },
    editSubColunm(record) {
      for (const item of record.shipSubArea) {
        item.editable = false
      }
      this.editSubArea.active = true
      this.editSubArea.record = record
    },
    selectAccessTypePerson(id, record) {
      const find = this.getAccessTypePerson.find((element) => element.id === id)
      record.accesstypepersonnameTh = find.nameTh
    },
  },
}
</script>
