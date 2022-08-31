export const state = () => ({
  history: [],
})
export const mutations = {
  SET_HISTORY(stateMutation, value) {
    stateMutation.history = value
  },
}

export const getters = {
  getHistory({ history }) {
    return history
  },
}

export const actions = {
  async getHistoryByPage({ commit }, payload) {
    try {
      const result = await this.$repositories.history.getByPage(payload)
      commit('SET_HISTORY', result.data.data)
      return result.data.data
    } catch (error) {
      console.log(error.data)
    }
  },
  async updateStatusShipRegister(_, payload) {
    try {
      const result = await this.$repositories.history.updateStatus(payload)
      return result.data.data
    } catch (error) {
      console.log(error.data)
    }
  },
  async deleteShipHistory(_, payload) {
    try {
      const result = await this.$repositories.history.delete(payload)
      return result.data.data
    } catch (error) {
      console.log(error.data)
    }
  },
  async updateTimeHistory(_, payload) {
    try {
      const result = await this.$repositories.history.updateTime(payload)
      return result.data.data
    } catch (error) {
      console.log(error.data)
    }
  },
}
