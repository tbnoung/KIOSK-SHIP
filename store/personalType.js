export const state = () => ({
  personalData: [],
  searchPersonalTyps: [],
  accessTypePerson: [],
})
export const mutations = {
  SET_GET_DATA(stateMutaion, value) {
    stateMutaion.personalData = value
  },
  SET_SEARCH_PERSONAL_TYPE(stateMutation, value) {
    stateMutation.searchPersonalTyps = value
  },
  SET_ACCESS_TYPE_PERSON(stateMutation, value) {
    stateMutation.accessTypePerson = value
  },
}

export const getters = {
  getPersonalData({ personalData }) {
    return personalData
  },
  getSearchPersonalTyps({ searchPersonalTyps }) {
    return searchPersonalTyps
  },
  getAccessTypePerson({ accessTypePerson }) {
    return accessTypePerson
  },
}

export const actions = {
  async getPersonalType({ commit }) {
    try {
      const result = await this.$repositories.personalType.get()
      commit('SET_GET_DATA', result.data.data)
      return result.data.data
    } catch (error) {
      console.log(error.data)
    }
  },
  async getSearchPersonalType(_, payload) {
    try {
      const result = await this.$repositories.personalType.search(payload)
      return result.data.data
    } catch (error) {
      console.log(error.data)
    }
  },
  async updatePersonalType(_, payload) {
    try {
      await this.$repositories.personalType.update(payload)
    } catch (error) {
      console.log(error.data)
    }
  },
  async createPersonalType(_, payload) {
    try {
      await this.$repositories.personalType.create(payload)
    } catch (error) {
      console.log(error.data)
    }
  },
  async getAccessTypePerson({ commit }) {
    try {
      const result = await this.$repositories.personalType.getAccessTypePerson()
      commit('SET_ACCESS_TYPE_PERSON', result.data.data)
    } catch (error) {
      console.log(error.data)
    }
  },
}
