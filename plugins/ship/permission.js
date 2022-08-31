/* eslint-disable promise/param-names */
export default function ({ $shipUser }, inject) {
  const user = $shipUser
  inject('shipPermission', {
    canEditShip(item, route) {
      const createItem =
        [null, undefined].includes(route?.query?.id) &&
        [null, undefined].includes(route?.params?.id)
      if (createItem) {
        return true
      } else if (user.isAdmin()) {
        return true
      } else if (
        user.getAccountId() === item.accountId ||
        (user.getAccountId() === undefined && item.accountId === null)
      ) {
        return this.checkPermission(item)
      }
      return false
    },
    checkPermission(item) {
      const { shipStatusOperation } = item
      return [null, undefined, '', 0, 1, 4, 5].includes(shipStatusOperation?.id)
    },
  })
}
