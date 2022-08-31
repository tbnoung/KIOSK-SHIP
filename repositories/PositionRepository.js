const resource = `/api/GSPOnlineSafetyTraining/PositionMaster`
export default (axios) => ({
  getAll() {
    return axios.post(`${resource}`, {})
  },
})
