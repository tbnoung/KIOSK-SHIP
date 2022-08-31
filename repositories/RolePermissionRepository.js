const resource = `/api/ShipRolePerminssions`
export default (axios) => ({
  getAll() {
    return axios.get(`${resource}`)
  },
  getById(id) {
    return axios.get(`${resource}/${id}`)
  },
  update(payload) {
    return axios.put(`${resource}`, payload)
  },
  search(payload) {
    return axios.post(`${resource}/Search`, payload)
  },
})
