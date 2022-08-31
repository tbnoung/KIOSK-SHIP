export const state = () => ({
  user: null,
})
export const mutations = {
  SET_USER(stateMutation, data) {
    stateMutation.user = data
  },
}

export const getters = {
  getUser({ user }) {
    return user
  },
}

export const actions = {
  getUser({ commit }) {
    commit('SET_USER', {
      id: 1,
      accountId: 1,
      firstName: 'Tbnoung',
      lastName: 'Buakai',
      role: 'approve',
    })
  },
}
