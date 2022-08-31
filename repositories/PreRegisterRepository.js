const resource = `/api/ShipPreRegister`
export default (axios) => ({
  getById(id) {
    return axios.get(`${resource}/${id}`)
  },
  update(data) {
    return axios.post(`${resource}?id=${data.id}`, data)
  },
  updateLicense(payload) {
    return axios.put(`${resource}/update`, payload)
  },
})
