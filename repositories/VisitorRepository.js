const resource = `/api/ShipVisitor`
export default (axios) => ({
  search(payload) {
    return axios.post(`${resource}/Search`, payload)
  },
})
