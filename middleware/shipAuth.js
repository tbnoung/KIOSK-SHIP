export default async function ({ app, store }) {
  if (checkToken(app)) {
    await checkUserAuth(store)
  }
}

const checkToken = (app) => {
  const getToken = app.$auth.strategy.token.get()
  if (!getToken) {
    app.$auth.logout()
  } else return true
}
const checkUserAuth = async (store) => {
  const hasUserAuth = store.getters['ship/auth/getUser']
  if (!hasUserAuth) {
    await store.dispatch('ship/auth/getUser')
  }
}
