export const state = () => ({
  loader: false,
})
export const mutations = {
  SET_OPEN_LOADER(stateMutation) {
    // console.log('SET_OPEN_LOADER')
    stateMutation.loader = true
  },
  SET_CLOSE_LOADER(stateMutation) {
    // console.log('SET_CLOSE_LOADER')
    stateMutation.loader = false
  },
}

export const getters = {
  getLoader({ loader }) {
    return loader
  },
}

export const actions = {}
