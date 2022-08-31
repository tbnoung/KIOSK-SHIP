export default {
  methods: {
    onReset() {
      this.dataTable = _.cloneDeep(this.getSearch)
    },
    setDataTable(result) {
      for (const item of result) {
        item.editable = false
        item.type = 'edit'
      }
      return result
    },
    checkUpdate() {
      const payloadUpdate = []

      for (const [index, value] of this.getUpdate().entries()) {
        const result = this.$global.dataChange(this.getSearch[index], value)
        if (result) {
          payloadUpdate.push(value)
        }
      }
      return payloadUpdate
    },
    getUpdate() {
      return this.dataTable.filter((element) => element.type !== 'create')
    },
    getCreate() {
      return this.dataTable.filter((element) => element.type === 'create')
    },
  },
}
