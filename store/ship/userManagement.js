export const state = () => ({
  userManagement: null,
})
export const mutations = {
  SET_USER_MANAGEMENT(stateMutation, data) {
    stateMutation.userManagement = data
  },
}

export const getters = {
  getUserManagement({ userManagement }) {
    return userManagement
  },
}

export const actions = {
  async getUsermanagement({ commit }, payload) {
    try {
      const result = await this.$repositories.userManagementRepository.search(
        payload
      )
      commit('SET_USER_MANAGEMENT', result.data.data)
    } catch (error) {
      console.log(error.data)
    }
  },
  async updateUserManagement(_, payload) {
    try {
      const result = await this.$repositories.userManagementRepository.update(
        payload
      )
      return result.data.data
    } catch (error) {
      console.log(error.data)
    }
  },
}
