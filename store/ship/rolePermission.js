export const state = () => ({
  permission: [],
  permissionById: [],
})
export const mutations = {
  SET_PERMISSION(stateMutation, data) {
    stateMutation.permission = data
  },
  SET_PERMISSION_BY_ID(stateMutation, data) {
    stateMutation.permissionById = data
  },
}

export const getters = {
  getPermission({ permission }) {
    return permission
  },
  getPermissionById({ permissionById }) {
    return permissionById
  },
}

export const actions = {
  async getPermission({ commit }) {
    try {
      const result = await this.$repositories.rolePermissionRepository.getAll()
      commit('SET_PERMISSION', result.data.data)
      return result.data.data
    } catch (error) {
      console.log(error.data)
    }
  },
  async getPermissionById({ commit }, id) {
    try {
      const result = await this.$repositories.rolePermissionRepository.getById(id)
      commit('SET_PERMISSION_BY_ID', result.data.data)
      return result.data.data
    } catch (error) {
      console.log(error.data)
    }
  },
  async updatePermission(_, payload) {
    try {
      const result = await this.$repositories.rolePermissionRepository.update(
        payload
      )
      return result.data
    } catch (error) {
      console.log(error.data)
    }
  },
  async searchPermission({ commit }, payload) {
    try {
      const result = await this.$repositories.rolePermissionRepository.search(
        payload
      )
      commit('SET_PERMISSION', result.data.data)
      return result.data.data
    } catch (error) {
      console.log(error.data) 
    }
  },
}
