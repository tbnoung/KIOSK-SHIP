const lodash = require('lodash')
const moment = require('moment')
export default function (_, inject) {
  inject('global', {
    dataChange(oldValue, newValue) {
      console.log('oldValue', oldValue, newValue)
      return !lodash.isEqual(JSON.stringify(oldValue), JSON.stringify(newValue))
    },
    language(typeTh, typeEn) {
      return _.i18n.localeProperties.code === 'en' ? typeEn : typeTh
    },
    orderItem(item) {
      return item.map((res, index) => {
        return {
          ...res,
          order: index + 1,
        }
      })
    },
    scrollToElement(element, position) {
      element.scrollIntoView({ behavior: 'smooth', block: position })
    },
    findElement(find, record, array) {
      const findElement = (element) => element[find] === record[find]
      return array.findIndex(findElement)
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text
        .toLowerCase()
        .includes(input.toLowerCase())
    },
    disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().startOf('day')
    },
  })
}
