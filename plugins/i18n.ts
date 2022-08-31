import { Plugin } from '@nuxt/types'
import { localize } from 'vee-validate'

const i18nPlugin: Plugin = ({ app: { $moment, i18n } }) => {
  if (i18n.locale) {
    localize(i18n.locale)
    $moment.locale(i18n.locale)
  }

  // onLanguageSwitched called right after a new locale has been set
  // See https://nuxt-community.github.io/nuxt-i18n/api/#onlanguageswitched
  i18n.onLanguageSwitched = (_oldLocale: string, newLocale: string) => {
    localize(newLocale)
    $moment.locale(newLocale)
  }
}

export default i18nPlugin
