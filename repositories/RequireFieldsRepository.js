// const resource = `/api/PersenonTypes`
const resource = `api/RequireFields`
export default (axios) => ({
  get() {
    return axios.get(`${resource}`)
  },
  update(payload) {
    return axios.put(`${resource}`, payload)
  },
  search(item) {
    return axios.post(`${resource}/Search`, item)
  },
})
