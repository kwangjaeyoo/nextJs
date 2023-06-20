import { t } from 'i18next'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import Select from 'react-select'

import { ADDRESS_TYPE } from '@/pages/address'

import InputBox from '../InputBox'
import { colourStyles } from '@/util/SelectStyle'
import PurpleDot from '../PurpleDot'
import { IaddressModel, InationModel } from './RegistDeliveryScreen'

const inputTypeList = [
  { value: 'direct', label: t('direct_input') },
  { value: 'address', label: t('used_my_address_book') },
]

interface RegistStep2Props {
  nationModel: InationModel
  senderModel: IaddressModel
  nextClick: () => void
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

  useEffect(() => {
    if (didMount.current) {
      console.log('RegistStep2')
    } else {
      didMount.current = true
    }
  })

  const setInputType = (value: any) => {
    if (value.value === 'address') {
      router.push({
        pathname: '/address',
        query: { type: ADDRESS_TYPE.ADDRESS_BOOK },
      })
      // TODO 갔다 왔을 때 데이터 처리....
    }
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
          onChange={setInputType}
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
          placeholder=""
          onChange={(value) => {
            senderModel.name = value
          }}
        />

        <div className="flex mt-5 mb-3">
          <div className="font-semi-bold text-[16px]">{t('address')}</div>
          <PurpleDot />
        </div>

        <div className="flex flex-row mb-3">
          <InputBox placeholder="" disable />
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
              router.push({
                pathname: '/address',
                query: { type: ADDRESS_TYPE.SEARCH_ADDRESS },
              })
              // TODO 갔다 왔을 때 처리 필요...
            }}
          >
            {t('search')}
          </div>
        </div>

        <div className="mb-3">
          <InputBox placeholder="" disable />
        </div>
        <InputBox
          placeholder={t('please_check_address_detail_input')}
          onChange={(value) => console.log('TODO ' + value)}
        />

        <div className="flex mt-5 mb-3">
          <div className="font-semi-bold text-[16px]">
            {t('telephone_number')}
          </div>
          <PurpleDot />
        </div>
        <InputBox
          placeholder=""
          onChange={(value) => (senderModel.telNo = value)}
        />

        <div className="flex mt-5 mb-3">
          <div className="font-semi-bold text-[16px]">{t('email_address')}</div>
        </div>
        <InputBox
          placeholder=""
          onChange={(value) => (senderModel.email = value)}
        />
      </div>

      <div className="flex flex-row mt-10 h-14 ml-8 mr-8">
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
          onClick={() => console.log('TODO ' + JSON.stringify(senderModel))}
        >
          {t('text_next')}
        </div>
      </div>
    </>
  )
}

export default RegistStep2
