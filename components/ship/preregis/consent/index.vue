<template>
  <a-row type="flex" justify="center">
    <a-col :span="24">
      <a-card class="mt-5">
        <a-row type="flex" justify="center">
          <a-col :span="24"> รายชื่อผู้เกี่ยวข้อง </a-col>
          <a-col :span="24" class="mt-5">
            <ShipPreregisConsentTable :data-table="dataTable" />
          </a-col>
          <a-col :span="24" class="mt-5">
            <a-row type="flex" justify="end">
              <a-button class="mr-5">Back</a-button>
              <a-button v-if="canSubmit" type="primary" @click="submit"
                >Submit</a-button
              >
            </a-row>
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
  computed: {
    canSubmit() {
      return this.dataTable.some((item) => {
        return [null, 0, 1, 4].includes(item?.statusOperationId)
      })
    },
  },
  methods: {
    async submit() {
      const dataTable = _.cloneDeep(this.dataTable)
      this.$store.commit('global/SET_OPEN_LOADER')
      const preRegister = [dataTable.shift()]
      const preRegisterFollow = dataTable
      const payload = {
        preRegistorId: this.filterIdCanSubmit(preRegister, 'preregistorId'),
        preRegistorIdFollow: this.filterIdCanSubmit(
          preRegisterFollow,
          'preRegistorIdFollow'
        ),
        status: 1,
      }
      await this.$store.dispatch('history/updateStatusShipRegister', payload)
      this.$router.push('/ship/pre-register')
      this.$store.commit('global/SET_CLOSE_LOADER')
    },
    filterIdCanSubmit(data, key) {
      const result = data.filter((item) => {
        return [null, 0, 1, 4].includes(item?.statusOperationId)
      })
      if (result) {
        const setId = []
        for (const item of result) {
          setId.push(item[key])
        }
        return setId
      } else {
        return 0
      }
    },
  },
}
</script>
