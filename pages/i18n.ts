import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from '../public/locales/en/common.json'
import ko from '../public/locales/ko/common.json'

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: 'en',
  resources: {
    ko: { translation: ko },
    en: { translation: en },
  },
})

export default i18n
