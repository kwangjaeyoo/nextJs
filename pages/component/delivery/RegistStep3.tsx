import { t } from 'i18next'
import { useEffect, useRef, useState } from 'react'

import useCustomModal from '@/pages/hook/useCustomModal'

import SearchAddressModal from '../address/SearchAddressModal'
import InputBox from '../InputBox'
import PurpleDot from '../PurpleDot'
import RegiBottomLayout from './RegiBottomLayout'
import { IaddressModel, InationModel } from './RegistDeliveryScreen'

interface RegistStep3Props {
  nationModel: InationModel
  recipientModel: IaddressModel
  nextClick: (recipt: IaddressModel) => void
  prevClick: () => void
}

const RegistStep3: React.FC<RegistStep3Props> = ({
  nationModel,
  recipientModel,
  nextClick,
  prevClick,
}) => {
  const didMount = useRef(false)

  const customModal = useCustomModal()

  const [recipModel, setRecipModel] = useState(recipientModel)
  const [searchAddress, setSearchAddress] = useState(false)

  const [showEnglishAddress] = useState(
    nationModel.search_toCode === 'SG'
      ? false
      : nationModel.search_fromCode === nationModel.search_toCode,
  )

  useEffect(() => {
    if (didMount.current) {
      console.log('RegistStep3')
    } else {
      didMount.current = true
    }
  }, [])

  const checkReciptModel = () => {
    if (recipModel.name.trim().length == 0) {
      customModal.onOpen(t('no_input_name'))
      return
    }

    if (recipModel.zipCode.trim().length == 0) {
      customModal.onOpen(t('no_input_zipcode'))
      return
    }

    if (
      recipModel.frontAddress.trim().length == 0 ||
      recipModel.backAddress.trim().length == 0
    ) {
      customModal.onOpen(t('no_input_address'))
      return
    }

    if (showEnglishAddress) {
      if (
        recipModel.frontAddressEn.trim().length == 0 ||
        recipModel.backAddressEn.trim().length == 0
      ) {
        customModal.onOpen(t('no_input_address_en'))
        return
      }
    }

    if (recipModel.telNo.trim().length == 0) {
      customModal.onOpen(t('no_input_tel'))
      return
    }

    nextClick(recipModel)
  }

  return (
    <>
      <div className="ml-8 font-semi-bold text-[16px]">{t('text_sender')}</div>

      <div
        className="
          flex 
          flex-col
          bg-white
          ml-8
          mr-8
          mt-4
          p-4
          rounded-xl"
      >
        <div className="font-semi-bold text-[16px] mb-3">
          {t('origin_country')}
        </div>
        <InputBox value={nationModel.search_to} disable />

        <div className="flex mt-5 mb-3">
          <div className="font-semi-bold text-[16px]">{t('name')}</div>
          <PurpleDot />
        </div>
        <InputBox
          value={recipModel.name}
          onChange={(value) => setRecipModel({ ...recipModel, name: value })}
        />

        <div className="flex mt-5 mb-3">
          <div className="font-semi-bold text-[16px]">{t('address')}</div>
          <PurpleDot />
        </div>

        <div className="flex flex-row mb-3">
          <InputBox disable value={recipModel.zipCode} />
          <div
            className="
              w-32
              bg-[#9772D1]
              rounded
              ml-2
              flex
              items-center 
              justify-center
              text-white
              "
            onClick={() => setSearchAddress(true)}
          >
            {t('search')}
          </div>
        </div>

        <div className="mb-3">
          <InputBox disable value={recipModel.frontAddress} />
        </div>
        <InputBox
          placeholder={t('please_check_address_detail_input')!!}
          value={recipModel.backAddress}
          onChange={(value) =>
            setRecipModel({ ...recipModel, backAddress: value })
          }
        />

        {/*영문주소. */}
        {showEnglishAddress && (
          <>
            <div className="font-semi-bold mt-4 text-[16px] mb-3">
              {t('english_address')}
            </div>
            <div className="mb-3">
              <InputBox disable value={recipModel.frontAddressEn} />
            </div>
            <InputBox
              value={recipModel.backAddressEn}
              placeholder={t('please_check_address_detail_input')!!}
              onChange={(value) =>
                setRecipModel({ ...recipModel, backAddressEn: value })
              }
            />
          </>
        )}

        <div className="flex mt-5 mb-3">
          <div className="font-semi-bold text-[16px]">
            {t('telephone_number')}
          </div>
          <PurpleDot />
        </div>
        <InputBox
          value={recipModel.telNo}
          onChange={(value) => setRecipModel({ ...recipModel, telNo: value })}
        />
      </div>

      <RegiBottomLayout nextClick={checkReciptModel} prevClick={prevClick} />

      <SearchAddressModal
        isOpen={searchAddress}
        countryCode={nationModel.search_toCode}
        setIsOpen={(value) => setSearchAddress(value)}
        setAddress={(value) => {
          setRecipModel({
            ...recipModel,
            zipCode: value.zipCode,
            frontAddress: value.frontAddress,
            backAddress: value.backAddress,
            frontAddressEn: value.frontAddressEn,
            backAddressEn: value.backAddressEn,
          })
        }}
      />
    </>
  )
}

export default RegistStep3
