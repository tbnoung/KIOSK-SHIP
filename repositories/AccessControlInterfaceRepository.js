const resource = `https://ptt-acc.iottechgroup.com/backend`
export default (axios) => ({
  checkBlacklist(search) {
    return axios.post(`${resource}/api/v1/blacklist/check`, {
      CID: search,
    })
  },
  getCompanyList() {
    return axios.get(`${resource}/api/v1/company`)
  },
})
