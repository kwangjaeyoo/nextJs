import { Html, Head, Main, NextScript } from 'next/document'
import type { DocumentProps } from 'next/document'
import i18nextConfig from '../next-i18next.config'

type Props = DocumentProps & {
  // add custom document props
}

export default function Document(props: Props) {
  const currentLocale = //i18nextConfig.i18n.defaultLocale
    props.__NEXT_DATA__.locale ?? i18nextConfig.i18n.defaultLocale

  console.log('props.__NEXT_DATA__.locale  ' + props.__NEXT_DATA__.locale)
  console.log(
    'i18nextConfig.i18n.defaultLocale  ' + i18nextConfig.i18n.defaultLocale,
  )
  console.log('currentLocale  ' + currentLocale)

  return (
    <Html lang={currentLocale}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
