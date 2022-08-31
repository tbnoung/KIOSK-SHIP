import { preRegisterConsentFormatter } from '@/helpers/ship/preregister/consent'
export const state = () => ({
  defaultPreRegister: {},
  formUser: [],
})
export const mutations = {
  SET_DEFAULT_PRE_REGISTER(stateMutation, data) {
    stateMutation.defaultPreRegister = data
  },
  SET_FORM_USER(stateMutation, data) {
    stateMutation.formUser = data
  },
}

export const getters = {
  getDefaultPreRegister({ defaultPreRegister }) {
    return defaultPreRegister
  },
  getFormUser({ formUser }) {
    return formUser
  },
}

export const actions = {
  async getPreRegisterById(_, data) {
    try {
      const result = await this.$repositories.preRegister.getById(data)
      result.data.data.shipPreregistorFollow = this.$global.orderItem(
        result.data.data.shipPreregistorFollow
      )
      return result.data.data
    } catch (error) {
      console.log(error.data)
    }
  },
  async updatePreRegister(_, data) {
    try {
      const result = await this.$repositories.preRegister.update(data)
      return result.data.data
    } catch (error) {
      console.log(error.data)
    }
  },
  async updateLicense(_, data) {
    try {
      const result = await await this.$repositories.preRegister.updateLicense(
        data
      )
      return result.data.data
    } catch (error) {
      console.log(error.data)
    }
  },
  mapUser(_, data) {
    const mapDataTable = []
    mapDataTable.push(preRegisterConsentFormatter(data))
    mapDataTable.push(...data.shipPreregistorFollow)
    this.commit('preRegister/SET_FORM_USER', mapDataTable)
  },
}
