const lodash = require('lodash')
export const state = () => ({
  zone: [],
  plant: [],
  area: [],
})
export const mutations = {
  SET_ZONE(stateMutation, data) {
    stateMutation.zone = data
  },
  SET_PLANT(stateMutation, data) {
    stateMutation.plant = data
  },
  SET_AREA(stateMutation, data) {
    stateMutation.area = data
  },
}

export const getters = {
  getZone({ zone }) {
    return zone
  },
  getPlant({ plant }) {
    return plant
  },
  getArea({ area }) {
    return area
  },
}

export const actions = {
  async getZone({ commit }) {
    try {
      const payload = [
        {
          layeR_NAME: 'BUILDING',
          searcH_COLUMN: [],
        },
      ]
      const result = await this.$repositories.mapRepository.getMap(payload)
      const zone = lodash.uniqBy(result.data.data.data[0].RESULT, 'ZONE')
      commit('SET_ZONE', zone)
    } catch (error) {
      console.log(error.data)
    }
  },
  async getPlant({ commit }, payload) {
    try {
      const result = await this.$repositories.mapRepository.getMap(payload)
      const plant = lodash.uniqBy(result.data.data.data[0].RESULT, 'UNITNAME')
      commit('SET_PLANT', plant)
    } catch (error) {
      console.log(error.data)
    }
  },
  async getArea({ commit }, payload) {
    try {
      const result = await this.$repositories.mapRepository.getMap(payload)
      const area = lodash.uniqBy(result.data.data.data[0].RESULT, 'SUBUNITNAME')
      commit('SET_AREA', area)
    } catch (error) {
      console.log(error.data)
    }
  },
}
