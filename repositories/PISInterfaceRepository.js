const resource = `/api/PIS`
export default (axios, app) => ({
  getToken() {
    const bodyParameter = {
      grant_type: 'client_credentials',
    }
    app.$auth.strategy.token.set(
      'Basic dHc4QW1xVkVZYjRGNFMzdW1DYmZ5M1JvZ3FzYTpnRndxVlIwSXg4RHppUEFkWkRXdDRJeHNfd1lh'
    )
    // return axios.post(
    //   `https://pttapi-dev.pttplc.com/oauth2/token`,
    //   bodyParameter
    // )https://ptt-acc.iottechgroup.com/backend
    return axios.post(
      `https://ptt-acc.iottechgroup.com/backend/api/v1/blacklist`,
      {
        CID: '1101800770453',
      }
    )
  },
  getById(employeeId) {
    return axios.get(`${resource}/${employeeId}`)
  },
  search(payload) {
    return axios.post(`${resource}`, payload)
  },
})
