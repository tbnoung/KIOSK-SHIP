export const state = () => ({
  blackList: {},
  companyList: [],
  currentCompanyCode: '',
})
export const mutations = {
  SET_BLACK_LIST(stateMutation, data) {
    stateMutation.blackList = data
  },
  SET_COMPANY_LIST(stateMutation, data) {
    stateMutation.companyList = data
  },
  SET_CURRENT_COMPANY_CODE(stateMutation, data) {
    stateMutation.currentCompanyCode = data
  },
}

export const getters = {
  getBlackList({ blackList }) {
    return blackList
  },
  getCompanyList({ companyList }) {
    return companyList
  },
  getCurrentCompanyCode({ currentCompanyCode }) {
    return currentCompanyCode
  },
}

export const actions = {
  async checkBlacklist({ commit }, search) {
    const result =
      await this.$repositories.accessControlInterfaceRepository.checkBlacklist(
        search
      )
    commit('SET_BLACK_LIST', result.data)
    return result.data
  },
  async getCompanyList({ commit }) {
    try {
      const result =
        await this.$repositories.accessControlInterfaceRepository.getCompanyList()
      commit('SET_COMPANY_LIST', result.data)
    } catch (error) {
      console.log(error)
    }
  },
}
