import { t } from 'i18next'
import { useEffect, useRef, useState } from 'react'
import { TfiAngleRight } from 'react-icons/tfi'
import Select, { StylesConfig } from 'react-select'

import BottomModal from '@/pages/component/modal/BottomModal'
import Modal from '@/pages/component/modal/Modal'
import { callMSmartShipAPI } from '@/pages/util/ServerApi'
import Checkbox from '../Checkbox'

const colourStyles: StylesConfig<any> = {
  control: (styles, state) => ({
    ...styles,
    borderColor: state.isFocused ? '#7340BF !important' : '#dbdbdb',
    boxShadow: state.isFocused ? 'none' : styles.boxShadow,
    outline: state.isFocused ? 'none' : styles.outline,
    height: 45,
  }),
}

const fromNationList = [
  { value: 'SG', label: 'Singapore' },
  { value: 'KR', label: 'South Korea' },
  { value: 'MY', label: 'Malaysia' },
]

const RegistStep1 = () => {
  const didMount = useRef(false)

  const [showModal, setShowModal] = useState({ content: '', btn: '' })
  const [showBtnModal, setShowBtnModal] = useState(false)
  const [isCheckd, setIsCheckd] = useState(false)

  const [fromNation, setFromNation] = useState({ nation: '', nationIso: '' })
  const [toNation, setToNation] = useState({ nation: '', nationIso: '' })

  const [toNationList, setToNationList] = useState<any>([])

  const loadFromNation = async () => {
    try {
      const result = await callMSmartShipAPI('GetStartNation', null)
      if (result) {
        if (result.status === 200) {
          const resultList = JSON.parse(result.data.ResultObject)

          let list = []
          for (var i = 0; i < resultList.length; i++) {
            // sg / kr / my 만 가능
            if (
              resultList[i].start_nation_cd === 'SG' ||
              resultList[i].start_nation_cd === 'KR' ||
              resultList[i].start_nation_cd === 'MY'
            ) {
              const conventItem = {
                nation_name: resultList[i].nation_name,
                nation_isocode: resultList[i].start_nation_cd,
              }
              list.push(conventItem)
            }
          }
          console.log(list)
        }
      }

      // const param = {}
      // const re = await callMobileSmartShipApi('GetSmartShipOrderList', param)
    } catch (e) {}
  }

  useEffect(() => {
    if (didMount.current) {
      console.log('RegistStep1')
      // loadFromNation()
    } else {
      didMount.current = true
    }
  }, [])

  const settingFromNation = (value: any) => {
    setFromNation({ nationIso: value.value, nation: value.label })

    let list = []
    if (value.value === 'SG') {
      // TODO api call
    } else if (value.value === 'KR') {
      list = [
        { label: 'Singapore', value: 'SG' },
        { label: 'Malaysia', value: 'MY' },
        { label: 'Japan', value: 'JP' },
        { label: 'Taiwan', value: 'TW' },
        { label: 'Hong Kong', value: 'HK' },
        { label: 'USA', value: 'US' },
        { label: 'ThaiLand', value: 'TH' },
        { label: 'Vietnam', value: 'VN' },
        { label: 'England', value: 'UK' },
        { label: 'Canada', value: 'CA' },
      ]
      setToNationList(list)
    } else if (value.value === 'MY') {
      // 출발국가 my 에서는 sg 일단 가능
      list = [{ label: 'Singapore', value: 'SG' }]
      setToNationList(list)
    }
  }

  const settingToNation = (value: any) => {
    setToNation({ nationIso: value.value, nation: value.label })
  }

  const checkModal = () => {
    if (fromNation.nationIso === '') {
      setShowModal({ content: t('please_select_from_nation'), btn: t('ok') })
      return
    }

    if (toNation.nationIso === '') {
      setShowModal({ content: t('please_select_nation'), btn: t('ok') })
      return
    }

    setShowBtnModal(true)
  }

  return (
    <>
      <div
        className="
          flex 
          flex-col
          bg-white
          ml-8
          mr-8
          p-4
          rounded-xl "
      >
        <div className="flex flex-row">
          <div className="font-semi-bold text-[16px]">
            {t('origin_country')}
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

        <div className="h-14 mt-3">
          <Select
            styles={colourStyles}
            isSearchable={false}
            options={fromNationList}
            components={{ IndicatorSeparator: () => null }}
            onChange={settingFromNation}
          />
        </div>

        <div className="flex flex-row mt-8 ">
          <div className="font-semi-bold text-[16px]">
            {t('destination_country')}
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

        <div className="h-14 mt-3">
          <Select
            styles={colourStyles}
            isSearchable={false}
            options={toNationList}
            components={{ IndicatorSeparator: () => null }}
            onChange={(value) => settingToNation(value)}
          />
        </div>
      </div>

      <div
        className="
          flex 
          flex-row
          bg-white
          m-10
          p-4
          rounded-xl"
        onClick={() => checkModal()}
      >
        <div className="flex items-center">
          <Checkbox checked={isCheckd} disabled />
        </div>
        <div className="text-[16px] ml-4">
          {t('msg_agree_qdelivery_service_guide')}
        </div>
        <div className="flex-grow"></div>
        <div className="flex items-center justify-end">
          <TfiAngleRight />
        </div>
      </div>

      <Modal
        isOpen={showModal.content !== ''}
        onSubmit={() => setShowModal({ content: '', btn: '' })}
        title={showModal.content}
        actionLabel={showModal.btn}
      />

      <BottomModal
        isOpen={showBtnModal}
        contents={t('service_guide_detail')}
        onClosed={() => {
          setShowBtnModal(false)
          setIsCheckd(true)
        }}
      />
    </>
  )
}

export default RegistStep1
