import * as enumList from '@/enum/index'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function (app, inject) {
  inject('enum', {
    ...enumList,
  })
}
