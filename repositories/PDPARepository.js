const resource = `/api/GSPconsent`
export default (axios) => ({
  check(payload) {
    return axios.get(`${resource}/CheckConSentByEmailOrIdCard?Input=${payload}`)
  },
  consentForVisitor(payload) {
    return axios.post(`${resource}/SendconsentForVisitor`, payload)
  },
})
