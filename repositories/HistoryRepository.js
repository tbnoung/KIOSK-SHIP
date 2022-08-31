const resource = `/api/ShipHistoryRegistration`
export default (axios) => ({
  getByPage(payload) {
    return axios.post(`${resource}`, payload)
  },
  updateStatus(payload) {
    return axios.put(`${resource}/UpdateStatus`, payload)
  },
  delete(payload) {
    return axios.post(`${resource}/Delete`, payload)
  },
  updateTime(payload) {
    return axios.put(`${resource}/UpdateTimesPerRegistorId`, payload)
  },
})
