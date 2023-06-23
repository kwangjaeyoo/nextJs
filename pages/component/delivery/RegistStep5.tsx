import { t } from 'i18next'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import useCustomModal from '@/pages/hook/useCustomModal'
import { convertDateformat } from '@/util/Util'

import CustomCalendar from '../calendar/CustomCalendar'
import InputBox from '../InputBox'
import PurpleDot from '../PurpleDot'
import Modal from '../modal/Modal'

const RegistStep5 = () => {
  const customModal = useCustomModal()

  const [isRegistryOrder, setIsRegistryOrder] = useState(false)
  const [calendarModalShow, setCalendarModalShow] = useState(false)

  const tomorrowDate = useRef<Date>(new Date())

  const setupPickupDate = (): Date => {
    const date = new Date()
    const year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()

    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)

    if (lastDay.getDate().toString() === date.getDate().toString()) {
      // 월의 마지막 날이면 다음달 1일로 설정해주기.
      month = month + 1
      day = 1
    } else {
      day = date.getDate() + 1
    }

    tomorrowDate.current = new Date(year, month, day)

    return new Date(year, month, day)
  }

  const [pickupDate, setPickupDate] = useState(setupPickupDate())

  const didMount = useRef(false)

  useEffect(() => {
    if (didMount.current) {
      console.log('RegistStep5')
    } else {
      didMount.current = true
    }
  })

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
          <PurpleDot />
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
          onClick={() => setCalendarModalShow(true)}
        >
          <div>{convertDateformat(pickupDate)}</div>
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

        <textarea
          className="
            h-32
            p-3
            border 
            rounded
            border-[#dbdbdb]
            focus:outline-none
            focus:border-[#7340BF]
            focus:border-2
            resize-none"
        />
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
          onClick={() => {
            console.log('TODO ')
            customModal.onOpen('TODO TODO', 'TODO')
          }}
        >
          {isRegistryOrder ? t('text_signup') : t('search_estimated_costs')}
        </div>
      </div>

      <Modal
        isOpen={calendarModalShow}
        onSubmit={() => setCalendarModalShow(false)}
        title={t('request_pickup_date')!!}
        actionLabel={''}
        showFooter={false}
        outsideClick={() => setCalendarModalShow(false)}
        body={
          <CustomCalendar
            settingValue={pickupDate}
            selectDay={(value) => {
              const diff = value.getTime() - tomorrowDate.current.getTime()
              console.log('diff ' + diff)
              if (diff >= 0) {
                setPickupDate(value)
                setCalendarModalShow(false)
              } else {
                customModal.onOpen(
                  "Please select a date after tomorrow's date.",
                )
              }
            }}
          />
        }
      />
    </div>
  )
}

export default RegistStep5
