export const state = () => ({
  areaZone: {},
  searchAreaZone: [],
})
export const mutations = {
  SET_AREA_ZONE(stateMutation, value) {
    stateMutation.areaZone = value
  },
  SET_SEARCH_AREA_ZONE(stateMutation, value) {
    stateMutation.searchAreaZone = value
  },
}

export const getters = {
  getAreaZone({ areaZone }) {
    return areaZone
  },
  getSearchAreaZone({ searchAreaZone }) {
    return searchAreaZone
  },
}

export const actions = {
  async getAreaZone({ commit }) {
    try {
      const result = await this.$repositories.areaZone.get()
      commit('SET_AREA_ZONE', result.data.data)
      return result.data.data
    } catch (error) {
      console.log(error.data)
    }
  },
  async getSearchAreaZone(_, payload) {
    try {
      const result = await this.$repositories.areaZone.search(payload)
      return result.data.data
    } catch (error) {
      console.log(error.data)
    }
  },
  async updateAreaZone(_, payload) {
    try {
      await this.$repositories.areaZone.update(payload)
    } catch (error) {
      console.log(error.data)
    }
  },
  async createAreaZone(_, payload) {
    try {
      await this.$repositories.areaZone.create(payload)
    } catch (error) {
      console.log(error.data)
    }
  },
}
