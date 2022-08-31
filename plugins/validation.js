import thaiIdCard from 'thai-id-card'
const lodash = require('lodash')

export default function (app, inject) {
  inject('Rules', {
    require(message = '', type = 'string') {
      return [
        {
          type,
          required: true,
          message,
          whitespace: true,
        },
      ]
    },
    image(message = '') {
      return [
        {
          message,
          required: true,
          // trigger: 'change',
          // validator: checkImage,
        },
      ]
    },
    citizen(message = '') {
      return [
        {
          message:
            'หมายเลขบัตรประชาชนหรือ Passport ถูกใช้งานเเล้ว กรุณากรอกใหม่อีกครั้ง',
          validator: checkDuplicateIdCard,
        },
        {
          message,
          validator: handleThaiCard,
        },
      ]
    },
    email(message = '') {
      return [
        {
          type: 'email',
          message,
        },
      ]
    },
    phone(message = '') {
      return [
        {
          message,
          validator: handleNumber,
        },
      ]
    },
    maxLength(message = '', max = 0, min = 0) {
      return [
        {
          min,
          max,
          message,
        },
      ]
    },
  })
  const checkImage = (rule, value, callback) => {
    if (!value) {
      callback(rule.message)
    }
    callback()
  }
  const checkDuplicateIdCard = (rule, value, callback) => {
    const getFormUser = app.store.getters['preRegister/getFormUser']
    const findDuplicate = getFormUser.find(
      (element) => element?.citizenId === value
    )
    const getActionEdit =
      document
        .querySelector('[data-modal-action]')
        ?.getAttribute('data-modal-action') === 'edit'
    const getActionAdd =
      document
        .querySelector('[data-modal-action]')
        ?.getAttribute('data-modal-action') === 'add'
    const getIndex = document
      .querySelector('[data-index]')
      ?.getAttribute('data-index')
    const isOpenModal = document.querySelector('.ant-modal')
    const isNotEmpty = !lodash.isEmpty(findDuplicate)
    let isNotOriginal = getFormUser[0]?.citizenId !== value
    if (isOpenModal && getActionEdit) {
      isNotOriginal = getFormUser[parseInt(getIndex) + 1]?.citizenId !== value
    }
    if (isNotEmpty) {
      if (
        (!isOpenModal && isNotOriginal) ||
        (getActionEdit && isNotOriginal) ||
        getActionAdd
      ) {
        callback(rule.message)
      }
    }
    callback()
  }
  const handleThaiCard = (rule, value, callback) => {
    const validateThaiCard = thaiIdCard.verify(String(value))
    const validatePassport = /^[0-9A-Z]*$/i.test(value)
    if (
      (!validateThaiCard && !(value.length >= 8 && value.length <= 9)) ||
      !validatePassport
    ) {
      callback(rule.message)
    }
    callback()
  }

  const handleNumber = (rule, value, callback) => {
    const checkNumber = /^[\d]*$/i.test(value)
    if (!checkNumber) {
      callback(rule.message)
    }
    callback()
  }
}
