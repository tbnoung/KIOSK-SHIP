export default function ({ app }, inject) {
  inject('shipUser', {
    getAccountId() {
      return app.$auth.$state.user?.id
    },
    getRole() {
      return app.$auth.$state.user?.role
    },
    isUser() {
      return app.$auth.$state.user?.role === 'user'
    },
    isApprove() {
      return app.$auth.$state.user?.role === 'approver'
    },
    isAdmin() {
      return app.$auth.$state.user?.role === 'admin'
    },
    isStaff() {
      return app.$auth.$state.user?.role === 'staff'
    },
  })
}
