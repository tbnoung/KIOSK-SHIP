const resource = `/api/Covids`
export default (axios) => ({
  get() {
    return axios.get(`${resource}`)
  },
  update(payload) {
    return axios.put(`${resource}/${payload.id}`, payload)
  },
})
