export default {
  methods: {
    closeNextPageModal() {
      const getId = this.$route.query.id || this.$route.params.id
      if (getId) {
        if (this.actionBtn === 'submit') {
          this.nextPageModal.active = false
        } else if (this.nextPage === 'routerNextPage') {
          this.routerNextPage()
        } else if (this.nextPageModal.actionNextStep) {
          this.$emit('nextPage', this.nextPage)
        } else {
          this.setForm(this.form)
          this.nextPageModal.active = false
          this.$router.push({ path: this.nextPage })
          // this.$emit('nextPage', this.nextPage)
        }
      } else {
        this.nextPageModal.active = false
      }
    },
    checkDataChange() {
      const dataChange = this.$global.dataChange(
        this.form,
        this.getDefaultPreRegister
      )
      if (dataChange) {
        this.nextPageModal.content = this.nextPageModal.actionNextStep
          ? 'ข้อมูลที่การเปลี่ยนเเปลงกรุณากด confirm เพื่อบันทึก'
          : 'กรุณาตรวจสอบข้อมูลให้ถูกต้องเเล้วกด confirm เพื่อดำเนินการต่อไป'
        this.nextPageModal.active = true
      } else if (this.nextPage === 'routerNextPage') {
        this.routerNextPage()
      } else {
        this.$router.push({ path: this.nextPage })
      }
      this.$store.commit('global/SET_CLOSE_LOADER')
    },
  },
}
