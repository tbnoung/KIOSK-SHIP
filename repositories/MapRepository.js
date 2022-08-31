const resource = `/api/GspMap/GetMap`
export default (axios) => ({
  getMap(payload) {
    return axios.post(`${resource}`, payload)
  },
})
