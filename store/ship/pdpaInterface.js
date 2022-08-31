export const state = () => ({})
export const mutations = {}

export const getters = {}

export const actions = {
  async consentForVisitor(_, payload) {
    try {
      const result = await this.$repositories.pdpaRepository.consentForVisitor(
        payload
      )
      return result?.data?.status
    } catch (error) {
      console.log(error)
    }
  },
  async checkConsent(_, payload) {
    try {
      const result = await this.$repositories.pdpaRepository.check(payload)
      if (result.data.content.length === 0) {
        return false
      } else {
        const find = result.data.content[0].purposes.find(
          (res) => res.id === '1ce54642-e743-4998-82b3-cd119418ae5a'
        )
        return find.status === 'ACTIVE'
      }
    } catch (error) {
      console.log(error.data)
    }
  },
}
