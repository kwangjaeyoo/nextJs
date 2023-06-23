import { t } from 'i18next'
import { useEffect, useState } from 'react'

import FullModal from '../modal/FullModal'
import DirectAddressLayout from './DirectAddressLayout'
import SearchAddressLayout from './SearchAddressLayout'
import StreetAddressLayout from './StreetAddressLayout'
import ZipcodeSearchLayout from './ZipcodeSearchLayout'

export enum SHOW_TYPE {
  select,
  keyword,
  street,
  direct,
}

export interface addressData {
  zipCode: string
  frontAddress: string
  backAddress: string
  frontAddressEn: string
  backAddressEn: string
}

interface props {
  isOpen: boolean
  countryCode: string
  setIsOpen: (value: boolean) => void
  setAddress: (address: addressData) => void
}

const SearchAddressModal: React.FC<props> = ({
  isOpen,
  countryCode = 'SG',
  setIsOpen,
  setAddress,
}) => {
  const [showBack, setShowBack] = useState(false)

  const [showType, setShowType] = useState<SHOW_TYPE>(SHOW_TYPE.select)

  useEffect(() => {
    setShowType(SHOW_TYPE.select)
  }, [isOpen])

  useEffect(() => {
    if (showType == SHOW_TYPE.select) {
      setShowBack(false)
    }
  }, [showType])

  const selectAddress = (address: addressData) => {
    setIsOpen(false)
    setAddress(address)
  }

  return (
    <FullModal
      isOpen={isOpen}
      title={t('search_address')}
      titleBgColor="bg-[#5D32B0]"
      titleTextColor="text-[#ffffff]"
      showLeftBtn={showBack}
      onLeftPress={() => {
        setShowType(SHOW_TYPE.select)
      }}
      showRightBtn
      rightBtnImage="/close-wh.png"
      onRightPress={() => setIsOpen(false)}
      body={
        <div>
          {showType == SHOW_TYPE.select && (
            <SearchAddressLayout
              countryCode={countryCode}
              selectType={(type) => {
                setShowType(type)
                setShowBack(true)
              }}
            />
          )}
          {showType == SHOW_TYPE.keyword && (
            <ZipcodeSearchLayout
              countryCode={countryCode}
              selectAddress={selectAddress}
            />
          )}
          {showType == SHOW_TYPE.street && (
            <StreetAddressLayout
              countryCode={countryCode}
              selectAddress={selectAddress}
            />
          )}
          {showType == SHOW_TYPE.direct && (
            <DirectAddressLayout
              countryCode={countryCode}
              selectAddress={selectAddress}
            />
          )}
        </div>
      }
    />
  )
}

export default SearchAddressModal
