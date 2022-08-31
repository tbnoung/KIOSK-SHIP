export const state = () => ({
  RequireFields: [],
  searchRequireFields: [],
  statusRequireField: {
    address: false,
    detail: false,
    email: false,
    phone: false,
  },
})
export const mutations = {
  SET_GET_DATA(stateMutaion, value) {
    stateMutaion.RequireFields = value
  },
  SET_SEARCH_REQUIRE_FIELDS(stateMutation, value) {
    stateMutation.searchRequireFields = value
  },
  SET_STATUS_REQUIRE_FIELD(stateMutation, value) {
    const findAddress = value.find((element) => element.id === 4)
    const findDetail = value.find((element) => element.id === 3)
    const findEmail = value.find((element) => element.id === 2)
    const findPhone = value.find((element) => element.id === 1)
    stateMutation.statusRequireField.address = findAddress.status
    stateMutation.statusRequireField.detail = findDetail.status
    stateMutation.statusRequireField.email = findEmail.status
    stateMutation.statusRequireField.phone = findPhone.status
  },
}

export const getters = {
  getRequireFieldsData({ RequireFields }) {
    return RequireFields
  },
  getSearchRequireFields({ searchRequireFields }) {
    return searchRequireFields
  },
  getStatusRequireField({ statusRequireField }) {
    return statusRequireField
  },
}

export const actions = {
  async getRequireFields({ commit }) {
    try {
      const result = await this.$repositories.RequireFields.get()
      commit('SET_GET_DATA', result.data.data)
      commit('SET_STATUS_REQUIRE_FIELD', result.data.data)
      return result.data.data
    } catch (error) {
      console.log(error.data)
    }
  },
  async getSearchRequireFields(_, payload) {
    try {
      const result = await this.$repositories.RequireFields.search(payload)
      return result.data.data
    } catch (error) {
      console.log(error.data)
    }
  },
  async updateRequireFields(_, payload) {
    try {
      await this.$repositories.RequireFields.update(payload)
    } catch (error) {
      console.log(error.data)
    }
  },
}
