import { t } from 'i18next'
import { useEffect, useState } from 'react'

import InputBox from '../InputBox'
import { addressData } from './SearchAddressModal'

interface DirectAddressLayoutProps {
  countryCode: string
  selectAddress: (item: addressData) => void
}

const DirectAddressLayout: React.FC<DirectAddressLayoutProps> = ({
  countryCode,
  selectAddress,
}) => {
  const checkCountry = () => {
    if (countryCode === 'US' || countryCode === 'SG') {
      return false
    } else {
      return true
    }
  }

  const [engLayout] = useState(checkCountry())
  const [saveEnable, setSaveEnable] = useState(false)

  const [address, setAddress] = useState<addressData>({
    zipCode: '',
    frontAddress: '',
    backAddress: '',
    frontAddressEn: '',
    backAddressEn: '',
  })

  const save = () => {}

  useEffect(() => {
    let enable = true
    if (engLayout) {
      enable = false

      if (address.frontAddressEn && address.backAddressEn) {
        enable = true
      }
    }

    if (
      enable &&
      address.zipCode &&
      address.frontAddress &&
      address.backAddress
    ) {
      setSaveEnable(true)
    } else {
      setSaveEnable(false)
    }
  }, [engLayout, address, saveEnable])

  return (
    <>
      <div className="p-5">
        <>
          {t('address')} ({t('local_language')})
        </>
        <div className="mt-2" />
        <InputBox
          placeholder={t('zipcode')!!}
          value={address.zipCode}
          onChange={(value) => {
            if (value && !isNaN(parseInt(value))) {
              setAddress({ ...address, zipCode: value })
            }
          }}
        />
        <div className="mt-3" />
        <InputBox
          placeholder={t('default_addr')!!}
          value={address.frontAddress}
          onChange={(value) => setAddress({ ...address, frontAddress: value })}
        />
        <div className="mt-3" />
        <InputBox
          placeholder={t('detail_addr')!!}
          value={address.backAddress}
          onChange={(value) => setAddress({ ...address, backAddress: value })}
        />

        {engLayout && (
          <>
            <div className="mt-5">
              {t('address')} ({t('english')})
            </div>
            <div className="mt-3" />
            <InputBox
              placeholder={t('default_addr')!!}
              value={address.frontAddressEn}
              onChange={(value) =>
                setAddress({ ...address, frontAddressEn: value })
              }
            />
            <div className="mt-3" />
            <InputBox
              placeholder={t('detail_addr')!!}
              value={address.backAddressEn}
              onChange={(value) =>
                setAddress({ ...address, backAddressEn: value })
              }
            />
          </>
        )}

        <div
          className={`
            flex 
            flex-row
            items-center
            justify-center
            ${saveEnable ? 'bg-[#7340BF]' : 'bg-[#bbbbbb]'}
            text-white
            p-4
            rounded-xl
            mt-10`}
          onClick={() => {
            if (saveEnable) {
              selectAddress(address)
            }
          }}
        >
          {t('save')}
        </div>
      </div>
    </>
  )
}

export default DirectAddressLayout
