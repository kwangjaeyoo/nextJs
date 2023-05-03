import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import './i18n'
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

export default appWithTranslation(App)
