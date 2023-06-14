import { t } from 'i18next'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { convertDateformat } from '@/pages/util/Util'

import InputBox from '../InputBox'

const RegistStep5 = () => {
  const [isRegistryOrder, setIsRegistryOrder] = useState(false)
  const [pickupDate, setPickupDate] = useState('')

  const didMount = useRef(false)

  useEffect(() => {
    if (didMount.current) {
      console.log('RegistStep5')
      setupPickupDate()
    } else {
      didMount.current = true
    }
  })

  const setupPickupDate = () => {
    const date = new Date()
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()

    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)

    if (lastDay.getDate().toString() === date.getDate().toString()) {
      // 월의 마지막 날이면 다음달 1일로 설정해주기.
      month = month + 1
      day = 1
    } else {
      day = date.getDate() + 1
    }

    let pickupDate = convertDateformat(year, month, day)
    setPickupDate(pickupDate)
  }

  return (
    <div className="flex flex-col m-8">
      <div className="font-bold text-[16px]">{t('pickup_information')}</div>

      <div
        className="
          flex 
          flex-col
          bg-white
          p-4
          mt-4
          rounded-xl"
      >
        <div className="text-[#0D1E20]">{t('pickup_address')}</div>
        <div className="text-[#939393] mt-3">TODO</div>
      </div>

      <div
        className="
          flex 
          flex-col
          bg-white
          p-4
          mt-4
          rounded-xl"
      >
        <div className="flex mt-1 mb-3">
          <div className="font-semi-bold text-[14px]">
            {t('request_pickup_date')}
          </div>
          <div
            className="
              mt-1 
              ml-2 
              flex 
              self-center
              w-2
              h-2 
              bg-[#9772D1]
              rounded-full"
          />
        </div>
        <div
          className="
            flex
            items-center
            justify-between
            h-12 
            p-4
            rounded 
            border 
            border-[#dbdbdb]"
          onClick={() => console.log('TODO')}
        >
          <div>{pickupDate}</div>
          <Image
            src={'/icon_calendar.png'}
            width={25}
            height={25}
            alt={'calendar'}
          />
        </div>

        <div className="font-semi-bold text-[14px] mt-4 mb-3">
          {t('pickup_memo')}
        </div>

        <InputBox placeholder="TODO" height="h-32" />
      </div>

      <div
        className="
          flex 
          flex-row
          bg-white
          p-6
          mt-4
          rounded-xl"
      >
        <div className="text-[#0D1E20]">{t('qxmoney_balance')} : </div>
        <div className="text-[#7340BF] ml-2">
          {String('1111111111 TODO ').replace(
            /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
            ',',
          )}
          {' ' + 'TODO'}
        </div>
      </div>

      <div
        className="
          flex 
          flex-col
          bg-white
          p-4
          mt-4
          rounded-xl"
      >
        <div className="font-semi-bold text-[14px]">
          {t('box_weight_input')}
        </div>
        <div className="mt-2 mb-2">{t('box_weight')}</div>
        <InputBox
          placeholder="0"
          type="number"
          onChange={() => console.log('TODO 타입처리 ??')}
        />

        <div className="mt-2 mb-2">{t('box_size')}</div>
        <InputBox
          placeholder="0"
          type="number"
          onChange={() => console.log('TODO 타입처리 ??')}
        />
      </div>

      <div className="flex flex-row mt-10 h-14">
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
          onClick={() => console.log('TODO ')}
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
          onClick={() => console.log('TODO ')}
        >
          {isRegistryOrder ? t('text_signup') : t('search_estimated_costs')}
        </div>
      </div>
    </div>
  )
}

export default RegistStep5
