<template>
  <div>
    <a-table
      :columns="header"
      :data-source="propDataTable"
      :pagination="false"
      bordered
      row-key="id"
    >
      <div slot="order" slot-scope="text, record, index">
        {{ index + 1 }}
      </div>
      <div
        v-for="(col, i) in ['timeStart', 'timeEnd']"
        :key="i"
        :slot="col"
        slot-scope="text, record"
      >
        <div v-if="record.editable">
          <a-input v-model="record[col]" />
        </div>
        <div v-else>{{ text }}</div>
      </div>
      <div slot="status" slot-scope="text, record">
        <a-switch v-model="record.status" />
      </div>
      <div slot="operation" slot-scope="text, record">
        <a-icon type="edit" @click="editColunm(record)" />
      </div>
    </a-table>
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
  methods: {
    editColunm(record) {
      record.editable = !record.editable
    },
  },
}
</script>
