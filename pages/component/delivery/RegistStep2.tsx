import { t } from 'i18next'
import { useEffect, useRef, useState } from 'react'
import Select from 'react-select'

import useCustomModal from '@/pages/hook/useCustomModal'
import { colourStyles } from '@/util/SelectStyle'

import AddressBookLayout from '../address/AddressBookLayout'
import SearchAddressModal from '../address/SearchAddressModal'
import InputBox from '../InputBox'
import FullModal from '../modal/FullModal'
import PurpleDot from '../PurpleDot'
import RegiBottomLayout from './RegiBottomLayout'
import { IaddressModel, InationModel } from './RegistDeliveryScreen'

const inputTypeList = [
  { value: 'direct', label: t('direct_input') },
  { value: 'address', label: t('used_my_address_book') },
]

interface RegistStep2Props {
  nationModel: InationModel
  senderModel: IaddressModel
  nextClick: (sender: IaddressModel) => void
  prevClick: () => void
}

const RegistStep2: React.FC<RegistStep2Props> = ({
  nationModel,
  senderModel,
  nextClick,
  prevClick,
}) => {
  const didMount = useRef(false)

  const customModal = useCustomModal()

  const [sender, setSender] = useState(senderModel)
  const [addressBook, setAddressBook] = useState(false)
  const [showEnglishAddress] = useState(
    nationModel.search_fromCode === nationModel.search_toCode,
  )

  const [searchAddress, setSearchAddress] = useState(false)

  useEffect(() => {
    if (didMount.current) {
      console.log('RegistStep2')
    } else {
      didMount.current = true
    }
  }, [])

  const checkSenderModel = () => {
    if (sender.name.trim().length == 0) {
      customModal.onOpen(t('no_input_name'))
      return
    }

    if (sender.zipCode.trim().length == 0) {
      customModal.onOpen(t('no_input_zipcode'))
      return
    }

    if (
      sender.frontAddress.trim().length == 0 ||
      sender.backAddress.trim().length == 0
    ) {
      customModal.onOpen(t('no_input_address'))
      return
    }

    if (showEnglishAddress) {
      if (
        sender.frontAddressEn.trim().length == 0 ||
        sender.backAddressEn.trim().length == 0
      ) {
        customModal.onOpen(t('no_input_address_en'))
        return
      }
    }

    if (sender.telNo.trim().length == 0) {
      customModal.onOpen(t('no_input_tel'))
      return
    }

    nextClick(sender)
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
        <div className="font-semi-bold text-[16px]">
          {t('select_address_input_type')}
        </div>
        <Select
          className="mt-3"
          styles={colourStyles}
          isSearchable={false}
          defaultValue={inputTypeList[0]}
          options={inputTypeList}
          components={{ IndicatorSeparator: () => null }}
          onChange={(value: any) => {
            if (value.value === 'address') {
              setAddressBook(true)
            }
          }}
        />
      </div>

      <div
        className="
          flex 
          flex-col
          bg-white
          mt-8
          ml-8
          mr-8
          p-4
          rounded-xl "
      >
        <div className="font-semi-bold text-[16px] mb-3">
          {t('origin_country')}
        </div>
        <InputBox placeholder={nationModel.search_from} disable />

        <div className="flex mt-5 mb-3">
          <div className="font-semi-bold text-[16px]">{t('name')}</div>
          <PurpleDot />
        </div>
        <InputBox
          value={sender.name}
          onChange={(value) => setSender({ ...sender, name: value })}
        />

        <div className="flex mt-5 mb-3">
          <div className="font-semi-bold text-[16px]">{t('address')}</div>
          <PurpleDot />
        </div>

        <div className="flex flex-row mb-3">
          <InputBox value={sender.zipCode} disable />
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
          <InputBox disable value={sender.frontAddress} />
        </div>
        <InputBox
          value={sender.backAddress}
          placeholder={t('please_check_address_detail_input')!!}
          onChange={(value) => setSender({ ...sender, backAddress: value })}
        />

        {showEnglishAddress && (
          <>
            <div className="font-semi-bold mt-4 text-[16px] mb-3">
              {t('english_address')}
            </div>
            <div className="mb-3">
              <InputBox disable value={sender.frontAddressEn} />
            </div>
            <InputBox
              value={sender.backAddress}
              placeholder={t('please_check_address_detail_input')!!}
              onChange={(value) =>
                setSender({ ...sender, backAddressEn: value })
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
          value={sender.telNo}
          onChange={(value) => setSender({ ...sender, telNo: value })}
        />

        <div className="flex mt-5 mb-3">
          <div className="font-semi-bold text-[16px]">{t('email_address')}</div>
        </div>
        <InputBox
          value={sender.email}
          onChange={(value) => setSender({ ...sender, email: value })}
        />
      </div>

      <RegiBottomLayout nextClick={checkSenderModel} prevClick={prevClick} />

      <FullModal
        isOpen={addressBook}
        title={t('addressList')}
        body={
          <AddressBookLayout
            itemClick={(value) => {
              // TODO 국가가 다름...처리
              // if (value.nation_cd == nationModel.search_fromCode) {

              setAddressBook(false)

              setSender({
                ...sender,
                name: value.addr_nm,
                zipCode: value.zip_code,
                frontAddress: value.addr_front,
                backAddress: value.addr_last,
                frontAddressEn: value.addr_front_en,
                backAddressEn: value.addr_last_en,
                telNo: value.tel_no,
                email: value.email,
              })
              // } else {
              //
              // }
            }}
          />
        }
      />

      <SearchAddressModal
        isOpen={searchAddress}
        countryCode={'KR'}
        setIsOpen={(value) => setSearchAddress(value)}
        setAddress={(value) => {
          setSender({
            ...sender,
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

export default RegistStep2
