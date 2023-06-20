// import 'semantic-ui-css/semantic.min.css'
import '@/styles/globals.css'
import '@/styles/Calendar.css'
import '@/util/Constants'

import i18n from 'i18next'
import { appWithTranslation } from 'next-i18next'
import React from 'react'
import { initReactI18next } from 'react-i18next'

import en from '../public/locales/en/common.json'
import ko from '../public/locales/ko/common.json'
import LoadingModal from './component/modal/LoadingModal'
import Layout from './layout'

import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  const [hydrated, setHydrated] = React.useState(false)

  React.useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null
  }

  return (
    <>
      <LoadingModal />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

i18n.use(initReactI18next).init({
  debug: false,
  fallbackLng: 'en',
  resources: {
    ko: { translation: ko },
    en: { translation: en },
  },
})

export default appWithTranslation(App)
