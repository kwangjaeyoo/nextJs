import axios from 'axios'
import { t } from 'i18next'
import { useEffect, useRef, useState } from 'react'
import { TfiAngleRight } from 'react-icons/tfi'
import Select from 'react-select'

import BottomModal from '@/pages/component/modal/BottomModal'
import useCustomModal from '@/pages/hook/useCustomModal'
import useLoadingModal from '@/pages/hook/useLoadingModal'
import { colourStyles } from '@/util/SelectStyle'

import Checkbox from '../Checkbox'
import PurpleDot from '../PurpleDot'
import { NationModel } from './RegistDeliveryScreen'

interface RegistStep1Props {
  nationModel: NationModel
  nextClick: (nationModel: NationModel) => void
}

const RegistStep1: React.FC<RegistStep1Props> = ({
  nationModel,
  nextClick,
}) => {
  const didMount = useRef(false)

  const loadingModal = useLoadingModal()
  const customModal = useCustomModal()

  const selectToNation = useRef<any>(null)

  const [showBtnModal, setShowBtnModal] = useState(false)
  const [isCheckd, setIsCheckd] = useState(false)

  const [fromNation, setFromNation] = useState({ nation: '', nationIso: '' })
  const [toNation, setToNation] = useState({ nation: '', nationIso: '' })

  const [fromNationList, setFromNationList] = useState<any>([])
  const [toNationList, setToNationList] = useState<any>([])

  const loadFromNation = async () => {
    loadingModal.onOpen()
    const result = await axios.post('/api/callMSmartShipAPI', {
      apiName: 'GetStartNation',
    })
    if (result && result.status === 200) {
      const resultList = JSON.parse(result.data.ResultObject)
      let list: { value: any; label: any }[] = []
      resultList.map((item: any) => {
        if (
          item.start_nation_cd === 'SG' ||
          item.start_nation_cd === 'KR' ||
          item.start_nation_cd === 'MY'
        ) {
          list.push({ value: item.start_nation_cd, label: item.nation_name })
        }
      })
      setFromNationList(list)
    }
    loadingModal.onClose()
  }

  const loadToNation = async () => {
    loadingModal.onOpen()
    const result = await axios.post('/api/callMSmartShipAPI', {
      apiName: 'GetQdeliveryDeliveryNation',
      param: {
        start_nation_cd: 'SG',
      },
    })
    if (result && result.status === 200) {
      const resultList = JSON.parse(result.data.ResultObject)
      let list: { value: any; label: any }[] = []
      resultList.map((item: any) => {
        list.push({ value: item.arrive_nation_cd, label: item.nation_nm })
      })
      setToNationList(list)
    }
    loadingModal.onClose()
  }

  useEffect(() => {
    if (didMount.current) {
      console.log('RegistStep1')

      loadFromNation()

      setFromNation({
        nation: nationModel.search_from,
        nationIso: nationModel.search_fromCode,
      })

      setToNation({
        nation: nationModel.search_to,
        nationIso: nationModel.search_toCode,
      })
    } else {
      didMount.current = true
    }
  }, [])

  const settingFromNation = (value: any) => {
    setFromNation({ nationIso: value.value, nation: value.label })
    setToNation({ nationIso: '', nation: '' })

    if (selectToNation.current) {
      selectToNation.current.clearValue()
    }

    let list = []
    if (value.value === 'SG') {
      loadToNation()
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
    if (value) {
      setToNation({ nationIso: value.value, nation: value.label })
    }
  }

  const checkNationSelect = () => {
    if (fromNation.nationIso === '') {
      customModal.onOpen(t('please_select_from_nation'))
      return false
    }

    if (toNation.nationIso === '') {
      customModal.onOpen(t('please_select_nation'))
      return false
    }

    return true
  }

  const checkModal = () => {
    if (checkNationSelect()) {
      setShowBtnModal(true)
    }
  }

  const checkNextStep = () => {
    if (!checkNationSelect()) {
      return
    }

    if (!isCheckd) {
      customModal.onOpen(t('please_checked_terms_conditions'))
      return
    }

    nextClick({
      search_from: fromNation.nation,
      search_fromCode: fromNation.nationIso,
      search_to: toNation.nation,
      search_toCode: toNation.nationIso,
    })
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
          <PurpleDot />
        </div>

        <div className="h-14 mt-3">
          <Select
            styles={colourStyles}
            isSearchable={false}
            defaultValue={fromNationList[0]}
            options={fromNationList}
            components={{ IndicatorSeparator: () => null }}
            onChange={settingFromNation}
          />
        </div>

        <div className="flex flex-row mt-8 ">
          <div className="font-semi-bold text-[16px]">
            {t('destination_country')}
          </div>
          <PurpleDot />
        </div>

        <div className="h-14 mt-3">
          <Select
            ref={selectToNation}
            styles={colourStyles}
            isSearchable={false}
            defaultValue={toNationList[0]}
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

      <div
        className=" 
         flex 
         flex-row
         items-center
         justify-center
         bg-[#7340BF]
         text-white
         font-semibold
         m-10
         p-4
         rounded-xl"
        onClick={checkNextStep}
      >
        {t('text_next')}
      </div>

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
