export const state = () => ({
  covid: {},
  searchCovid: [],
})
export const mutations = {
  SET_GET_DATA(stateMutation, value) {
    stateMutation.covid = value
  },
  SET_SEARCH_COVID(stateMutation, value) {
    stateMutation.searchCovid = value
  },
}

export const getters = {
  getCovid({ covid }) {
    return covid
  },
  getSearchRequireFields({ searchCovid }) {
    return searchCovid
  },
}

export const actions = {
  async getCovid({ commit }) {
    try {
      const result = await this.$repositories.covid.get()
      commit('SET_GET_DATA', result.data.data[0])
      return result.data.data[0]
    } catch (error) {
      console.log(error.data)
    }
  },
  async updateRequireFields(_, payload) {
    try {
      await this.$repositories.covid.update(payload)
    } catch (error) {
      console.log(error.data)
    }
  },
}
