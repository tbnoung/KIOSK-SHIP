const resource = `/api/GSPOnlineSafetyTraining`
export default (axios) => ({
  checkPersonTraining(payload) {
    return axios.post(`${resource}/PersonTraining`, payload)
  },
  getSafetyTrainingInfo(payload) {
    return axios.post(`${resource}/TrainingInfo`, payload)
  },
})
