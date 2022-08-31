export const state = () => ({
  objectiveWork: [],
  searchObjectiveWork: [],
})
export const mutations = {
  SET_GET_DATA(stateMutaion, value) {
    stateMutaion.objectiveWork = value
  },
  SET_SEARCH_OBJECTTIVE_WORK(stateMutation, value) {
    stateMutation.searchObjectiveWork = value
  },
}

export const getters = {
  getObjectiveWorkData({ objectiveWork }) {
    return objectiveWork
  },
  getSearchObjectiveWork({ searchObjectiveWork }) {
    return searchObjectiveWork
  },
}

export const actions = {
  async getObjectiveWork({ commit }) {
    try {
      const result = await this.$repositories.objectiveWork.get()
      commit('SET_GET_DATA', result.data.data)
      return result.data.data
    } catch (error) {
      console.log(error.data)
    }
  },
  async getSearchObjectiveWork(_, payload) {
    try {
      const result = await this.$repositories.objectiveWork.search(payload)
      return result.data.data
    } catch (error) {
      console.log(error.data)
    }
  },
  async updateObjectiveWork(_, payload) {
    try {
      await this.$repositories.objectiveWork.update(payload)
    } catch (error) {
      console.log(error.data)
    }
  },
  async createObjectiveWork(_, payload) {
    try {
      await this.$repositories.objectiveWork.create(payload)
    } catch (error) {
      console.log(error.data)
    }
  },
}
