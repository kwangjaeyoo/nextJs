import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { Dropdown, DropdownProps } from 'semantic-ui-react'

export default function Language() {
  const router = useRouter()

  const { i18n, t } = useTranslation()

  const [select, setSelect] = useState(i18n.language)

  const countryOptions = [
    { key: 'en', value: 'en', text: 'English' },
    { key: 'ko', value: 'ko', text: 'Korean' },
  ]

  return (
    <div style={{ paddingLeft: '30px', paddingRight: '30px' }}>
      <h1>language code = {select}</h1>
      <Dropdown
        style={{ width: '200px' }}
        fluid
        search
        selection
        defaultValue={select}
        options={countryOptions}
        onChange={(
          event: React.SyntheticEvent<HTMLElement>,
          data: DropdownProps,
        ) => {
          console.log('onChange ' + data.value)
          if (typeof data.value == 'string') {
            const locale = data.value
            // i18n.changeLanguage(locale)
            setSelect(locale)

            const { pathname, asPath, query } = router
            router.push({ pathname, query }, asPath, { locale: locale })
          }
        }}
      />
    </div>
  )
}
