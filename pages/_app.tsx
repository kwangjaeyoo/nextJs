import i18n from 'i18next'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import React from 'react'
import { initReactI18next } from 'react-i18next'
import 'semantic-ui-css/semantic.min.css'
import en from '../public/locales/en/common.json'
import ko from '../public/locales/ko/common.json'
import Layout from './layout'

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
    <Layout>
      <Component {...pageProps} />
    </Layout>
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
