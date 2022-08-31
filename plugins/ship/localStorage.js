export default function (_, inject) {
  inject('localStorage', {
    getAccessToken() {
      return localStorage.getItem('access_token')
    },
  })
}
