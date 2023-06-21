import { t } from 'i18next'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import Select from 'react-select'

import { colourStyles } from '@/util/SelectStyle'

import AddressBookLayout from '../address/AddressBookLayout'
import InputBox from '../InputBox'
import FullModal from '../modal/FullModal'
import Modal from '../modal/Modal'
import PurpleDot from '../PurpleDot'
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
  const router = useRouter()
  const didMount = useRef(false)

  const [sender, setSender] = useState(senderModel)
  const [addressBook, setAddressBook] = useState(false)
  const [showEnglishAddress] = useState(
    nationModel.search_fromCode === nationModel.search_toCode,
  )

  const [showModal, setShowModal] = useState({ content: '', btn: '' })

  useEffect(() => {
    if (didMount.current) {
      console.log('RegistStep2')
    } else {
      didMount.current = true
    }
  }, [])

  const checkSenderModel = () => {
    if (sender.name.trim().length == 0) {
      setShowModal({ content: t('no_input_name'), btn: t('ok') })
      return
    }

    if (sender.zipCode.trim().length == 0) {
      setShowModal({ content: t('no_input_zipcode'), btn: t('ok') })
      return
    }

    if (
      sender.frontAddress.trim().length == 0 ||
      sender.backAddress.trim().length == 0
    ) {
      setShowModal({ content: t('no_input_address'), btn: t('ok') })
      return
    }

    if (showEnglishAddress) {
      if (
        sender.frontAddressEn.trim().length == 0 ||
        sender.backAddressEn.trim().length == 0
      ) {
        setShowModal({ content: t('no_input_address_en'), btn: t('ok') })
        return
      }
    }

    if (sender.telNo.trim().length == 0) {
      setShowModal({ content: t('no_input_tel'), btn: t('ok') })
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
          placeholder=""
          onChange={(value) => setSender({ ...sender, name: value })}
        />

        <div className="flex mt-5 mb-3">
          <div className="font-semi-bold text-[16px]">{t('address')}</div>
          <PurpleDot />
        </div>

        <div className="flex flex-row mb-3">
          <InputBox value={sender.zipCode} placeholder="" disable />
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
            onClick={() => {
              // router.push({
              //   pathname: '/address',
              // })
              // TODO 갔다 왔을 때 처리 필요...
            }}
          >
            {t('search')}
          </div>
        </div>

        <div className="mb-3">
          <InputBox placeholder="" disable value={sender.frontAddress} />
        </div>
        <InputBox
          value={sender.backAddress}
          placeholder={t('please_check_address_detail_input')}
          onChange={(value) => setSender({ ...sender, backAddress: value })}
        />

        {showEnglishAddress && (
          <>
            <div className="font-semi-bold mt-4 text-[16px] mb-3">
              {t('english_address')}
            </div>
            <div className="mb-3">
              <InputBox placeholder="" disable value={sender.frontAddressEn} />
            </div>
            <InputBox
              value={sender.backAddress}
              placeholder={t('please_check_address_detail_input')}
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
          placeholder=""
          onChange={(value) => setSender({ ...sender, telNo: value })}
        />

        <div className="flex mt-5 mb-3">
          <div className="font-semi-bold text-[16px]">{t('email_address')}</div>
        </div>
        <InputBox
          value={sender.email}
          placeholder=""
          onChange={(value) => setSender({ ...sender, email: value })}
        />
      </div>

      <div className="flex flex-row h-14 mt-10 ml-8 mr-8 mb-10">
        <div
          className=" 
            flex 
            w-1/2
            mr-1
            items-center
            justify-center
            bg-[#f4f4f4]
            text-[#939393]
            font-semibold
            rounded-xl
            shadow-lg"
          onClick={prevClick}
        >
          {t('text_prev')}
        </div>
        <div
          className=" 
            flex
            w-1/2
            ml-1
            items-center
            justify-center
            bg-[#7340BF]
            text-white
            font-semibold
            rounded-xl"
          onClick={checkSenderModel}
        >
          {t('text_next')}
        </div>
      </div>

      <Modal
        isOpen={showModal.content !== ''}
        onSubmit={() => setShowModal({ content: '', btn: '' })}
        title={showModal.content}
        actionLabel={showModal.btn}
      />

      <FullModal
        isOpen={addressBook}
        title={t('addressList')}
        body={
          <AddressBookLayout
            itemClick={(value) => {
              // TODO 국가가 다름...처리
              // if (value.nation_cd == nationModel.search_fromCode) {
              console.log('TODO value ' + JSON.stringify(value))
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
    </>
  )
}

export default RegistStep2
