import Vue from 'vue'
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from 'vee-validate'
import en from 'vee-validate/dist/locale/en.json'
import th from 'vee-validate/dist/locale/th.json'
import thaiIdCard from 'thai-id-card'
import {
  required,
  email,
  length,
  numeric,
  confirmed,
  alpha,
} from 'vee-validate/dist/rules'
import { scorePassword } from '@/middleware/util.js'
import VueI18n from 'vue-i18n'
extend('required', required)

localize({
  en,
  th,
})
const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: {
      validations: 'en',
    },
    th: {
      validations: th,
    },
  },
})
// Register it globally
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

export default () => {
  extend('required', required)
  extend('email', email)
  extend('length', length)
  extend('numeric', numeric)
  extend('confirmed', confirmed)
  extend('alpha', alpha)

  // Add a rule.
  extend('citizenId', {
    validate: (value) => {
      return thaiIdCard.verify(String(value))
    },
    message: 'หมายเลขบัตรประชาชน ไม่ถูกต้อง',
    // message: () => i18n.t('UserMenu.btnCancel').toString(),
  })

  extend('citizenOrPassport', {
    validate: (value) => {
      value = String(value)
      // console.log(value)
      if (value.length === 13) {
        if (thaiIdCard.verify(String(value))) return true
        else return false
      } else if (value.length >= 8 && value.length <= 9) {
        return /^[0-9A-Z]*$/i.test(String(value))
      } else {
        return false
      }
    },
    message: 'หมายเลขบัตรประชาชนหรือ Passport ไม่ถูกต้อง',
  })

  extend('passport', {
    validate: (value) => {
      value = String(value)
      // console.log(value)
      if (value.length >= 8) {
        if (/^(?!^0+$)[a-zA-Z0-9]{6,9}$/i.test(String(value))) {
          return true
        } else {
          return false
        }

        // return /^[0-9A-Z]*$/i.test(String(value))
      } else {
        return false
      }
    },
    message: 'หมายเลข Passport ไม่ถูกต้อง',
  })

  extend('drivingNo', {
    validate: (value) => {
      value = String(value)
      // console.log(value)
      if (value.length >= 5) {
        return /^[0-9A-Z]*$/i.test(String(value))
      } else {
        return false
      }
    },
    message: 'เลขที่ใบขับขี่ไม่ถูกต้อง',
  })

  extend('personal', {
    validate: (value) => {
      value = String(value)
      // console.log(value)
      if (value.length >= 5) {
        return /^[0-9A-Z]*$/i.test(String(value))
      } else {
        return false
      }
    },
    message: 'หมายเลขบัตรพนักงานไม่ถูกต้อง',
  })

  extend('mobile', {
    validate: (value) => {
      if (value.length === 10) {
        return /^[0-9]*$/i.test(String(value))
      } else {
        return false
      }
    },
    message: 'เบอร์โทรไม่ถูกต้อง (กรอกตัวเลขจำนวน 10 หลักเท่านั้น)',
  })
  extend('PaswordNumber', {
    validate: (value) => {
      value = String(value)
      if (value.length > 5) {
        let check = false
        if (scorePassword(value) >= 30) {
          check = false
        }
        if (scorePassword(value) > 60) {
          check = true
        }
        if (scorePassword(value) > 80) {
          check = true
        }
        return check
      } else {
        return false
      }
    },
    message: 'รหัสผ่านคาดเดาง่ายเกินไป ,รหัสผ่านควรมีอย่างน้อย 6 ตัวอักษร',
  })

  // extend('duplicate', {
  //   params: ['target'],
  //   validate(value, target) {
  //     console.log('target', target)
  //     return value !== target
  //   },
  //   message: 'หมายเลขบัตรประชาชนซ้ำ',
  // })

  th.messages.required = 'กรุณาระบุ {_field_}'

  // Register it globally
  Vue.component('ValidationObserver', ValidationObserver)
  Vue.component('ValidationProvider', ValidationProvider)
}
