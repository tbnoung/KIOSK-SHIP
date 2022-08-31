export const state = () => ({
  timeWork: {},
  searchTimeWork: [],
})
export const mutations = {
  SET_GET_DATA(stateMutaion, value) {
    stateMutaion.timeWork = value
  },
  SET_SEARCH_TIME_WORK(stateMutation, value) {
    stateMutation.searchTimeWork = value
  },
}

export const getters = {
  getTimeWorkData({ timeWork }) {
    return timeWork
  },
  getSearchTimeWork({ searchTimeWork }) {
    return searchTimeWork
  },
}

export const actions = {
  async getTimeWork({ commit }) {
    try {
      const result = await this.$repositories.timeWork.get()
      commit('SET_GET_DATA', result.data.data)
      return result.data.data
    } catch (error) {
      console.log(error.data)
    }
  },
  async getSearchTimeWork(_, payload) {
    try {
      const result = await this.$repositories.timeWork.search(payload)
      return result.data.data
    } catch (error) {
      console.log(error.data)
    }
  },
  async updateTimeWork(_, payload) {
    try {
      await this.$repositories.timeWork.update(payload)
    } catch (error) {
      console.log(error.data)
    }
  },
  async createTimeWork(_, payload) {
    try {
      await this.$repositories.timeWork.create(payload)
    } catch (error) {
      console.log(error.data)
    }
  },
}
