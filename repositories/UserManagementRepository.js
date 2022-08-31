const resource = `/api/ShipUserManagement`
export default (axios) => ({
  search(payload) {
    return axios.post(`${resource}/search`, payload)
  },
  update(payload) {
    return axios.put(`${resource}/Update`, payload)
  },
})
