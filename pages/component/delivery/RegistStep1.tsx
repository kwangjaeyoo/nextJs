import { t } from 'i18next'
import { useEffect, useRef, useState } from 'react'
import Select, { StylesConfig } from 'react-select'

import Modal from '@/pages/component/modal/Modal'
import { callMSmartShipAPI } from '@/pages/util/ServerApi'

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
        { nation_name: 'Singapore', nation_isocode: 'SG' },
        { nation_name: 'Malaysia', nation_isocode: 'MY' },
        { nation_name: 'Japan', nation_isocode: 'JP' },
        { nation_name: 'Taiwan', nation_isocode: 'TW' },
        { nation_name: 'Hong Kong', nation_isocode: 'HK' },
        { nation_name: 'USA', nation_isocode: 'US' },
        { nation_name: 'ThaiLand', nation_isocode: 'TH' },
        { nation_name: 'Vietnam', nation_isocode: 'VN' },
        { nation_name: 'England', nation_isocode: 'UK' },
        { nation_name: 'Canada', nation_isocode: 'CA' },
      ]
      setToNationList(list)
    } else if (value.value === 'MY') {
      // 출발국가 my 에서는 sg 일단 가능
      list = [{ nation_name: 'Singapore', nation_isocode: 'SG' }]
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

    setShowModal({ content: '1111', btn: t('ok') })
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
        <div className="flex bg-pink-400 items-center">TODO</div>
        <div className="text-[16px] ml-4">
          {t('msg_agree_qdelivery_service_guide')}
        </div>
        <div className="flex-grow"></div>
        <div className="flex items-center justify-end">TODO</div>
      </div>

      <Modal
        isOpen={showModal.content !== ''}
        onSubmit={() => setShowModal({ content: '', btn: '' })}
        title={showModal.content}
        actionLabel={showModal.btn}
      />
    </>
  )
}

export default RegistStep1
