import { Plugin } from '@nuxt/types'

const axiosPlugin: Plugin = ({ $axios, redirect }) => {
  $axios.onRequest((config) => {
    config.headers['Content-Type'] = 'application/json'
    config.headers['Access-Control-Allow-Origin'] = '*'
    const getAuthorization = config?.headers?.Authorization
    if (getAuthorization) {
      const checkType = config?.headers?.Authorization.split(' ').length
      if (checkType === 1) {
        config.headers.Authorization = `Bearer ${getAuthorization}`
      }
    }
  })

  $axios.onError((error) => {
    // console.log('xxxerror', error, error.response)
    if (error.response?.status === 401) {
      redirect('/logout')
    }

    if (typeof error.response === 'undefined') {
      // console.log('Axios Error: ', error) // eslint-disable-line no-console
    }
  })
}

export default axiosPlugin
