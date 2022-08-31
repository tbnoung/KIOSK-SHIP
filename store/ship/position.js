export const state = () => ({
  position: {},
})
export const mutations = {
  SET_POSITION(stateMutation, value) {
    stateMutation.position = value
  },
}

export const getters = {
  getAllPosition({ position }) {
    return position
  },
}

export const actions = {
  async getAllPosition({ commit }) {
    try {
      const result = await this.$repositories.position.getAll()
      commit('SET_POSITION', result.data.data)
      return result.data.data
    } catch (error) {
      console.log(error.data)
    }
  },
}
