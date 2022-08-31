<template>
  <a-row type="flex" justify="center">
    <a-col :span="24">
      <a-card class="mt-5">
        <a-row type="flex" justify="center">
          <a-col :span="24"> รายชื่อผู้เกี่ยวข้อง </a-col>
          <a-col :span="24" class="mt-5">
            <ShipPreregisConsiderationTable :data-table="dataTable" />
          </a-col>
        </a-row>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
export default {
  props: {
    dataTable: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
