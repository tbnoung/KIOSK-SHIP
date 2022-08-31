export const state = () => ({
  safetyTrainingInfo: [],
})
export const mutations = {
  SET_SAFETY_TRAINING_INFO(stateMutation, data) {
    stateMutation.safetyTrainingInfo = data
  },
}

export const getters = {
  getSafetyTrainingInfo({ safetyTrainingInfo }) {
    return safetyTrainingInfo
  },
}

export const actions = {
  async checkPersonTraining(_, payload) {
    try {
      const result =
        await this.$repositories.safetyTrainingRepository.checkPersonTraining(
          payload
        )
      return result.data
    } catch (error) {
      console.log(error.data)
    }
  },
  async getSafetyTrainingInfo({ commit }, payload) {
    try {
      const result =
        await this.$repositories.safetyTrainingRepository.getSafetyTrainingInfo(
          payload
        )
      commit('SET_SAFETY_TRAINING_INFO', result.data.data)
    } catch (error) {
      console.log(error.data)
    }
  },
}
