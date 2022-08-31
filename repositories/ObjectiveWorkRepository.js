const resource = `/api/ObjectiveWorks`
export default (axios) => ({
  get() {
    return axios.get(`${resource}`)
  },
  search(item) {
    return axios.post(`${resource}/Search`, item)
  },
  update(payload) {
    return axios.put(`${resource}`, payload)
  },
  create(payload) {
    return axios.post(`${resource}`, payload)
  },
})
