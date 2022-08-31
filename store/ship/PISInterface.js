export const state = () => ({
  employeeApproverList: [],
  employeeList: [],
})
export const mutations = {
  SET_EMPLOYEE_APPROVER(stateMutation, data) {
    stateMutation.employeeApproverList = data
  },
  SET_EMPLOYEE_LIST(stateMutation, data) {
    stateMutation.employeeList = data
  },
}

export const getters = {
  getEmployeeApproverList({ employeeApproverList }) {
    return employeeApproverList
  },
  getEmployeeList({ employeeList }) {
    return employeeList
  },
}

export const actions = {
  async getEmployeeById({ commit }, search) {
    try {
      const result = await this.$repositories.PISInterfaceRepository.getById(
        search
      )
      commit('SET_EMPLOYEE_APPROVER', result?.data?.data?.Entries?.Entry)
    } catch (error) {
      console.log(error.data)
    }
  },
  async getEmployee({ commit }, search) {
    try {
      const result = await this.$repositories.PISInterfaceRepository.search(
        search
      )
      commit('SET_EMPLOYEE_LIST', result?.data?.data?.Entries)
    } catch (error) {
      console.log(error.data)
    }
  },
}
