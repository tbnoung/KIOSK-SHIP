export const state = () => ({
  visitor: [],
})
export const mutations = {
  SET_VISITOR(stateMutation, data) {
    stateMutation.visitor = data
  },
}

export const getters = {
  getVisitor({ visitor }) {
    return visitor
  },
}

export const actions = {
  async getShipVisitor({ commit }, payload) {
    try {
      const result = await this.$repositories.visitorRepository.search(payload)
      commit('SET_VISITOR', result.data.data)
    } catch (error) {
      console.log(error.data)
    }
  },
}
