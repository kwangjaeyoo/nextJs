import axios from 'axios'
import { t } from 'i18next'
import { useEffect, useRef, useState } from 'react'
import Select from 'react-select'

import useLoadingModal from '@/pages/hook/useLoadingModal'
import { colourStyles } from '@/util/SelectStyle'

import { addressData } from './SearchAddressModal'
import { getFrontAddress_local } from './ZipcodeSearchLayout'

interface StreetAddressLayoutProps {
  countryCode: string
  selectAddress: (item: addressData) => void
}

const StreetAddressLayout: React.FC<StreetAddressLayoutProps> = ({
  countryCode,
  selectAddress,
}) => {
  const didMount = useRef(false)
  const loadingModal = useLoadingModal()

  const [enableList, setEnableList] = useState([true, true, true])

  const address = useRef({
    nation_cd: countryCode,
    state: '',
    city: '',
  })

  const [stateList, setStateList] = useState<any[]>([])
  const [cityList, setCityList] = useState<any[]>([])
  const [streetList, setStreetList] = useState<any[]>([])
  const [addressList, setAddressList] = useState<any[]>([])

  useEffect(() => {
    if (didMount.current) {
      console.log('StreetAddressLayout start')
      getStateData()
    } else {
      didMount.current = true
    }
  }, [])

  const getStateData = async () => {
    loadingModal.onOpen()
    try {
      const result = await axios.post('/api/callMemberAPI', {
        apiName: 'SearchAddrGroup',
        param: address.current,
      })
      if (result && result.status === 200) {
        let list: any[] = []
        result.data.map((item: any) => {
          list = list.concat({ value: item.state_en, label: item.state })
        })
        setStateList(list)
        setEnableList([false, true, true])
        setAddressList([])
      }
    } catch (e) {
      //
    } finally {
      loadingModal.onClose()
    }
  }

  const getCityData = async (select: any) => {
    loadingModal.onOpen()
    address.current = {
      nation_cd: countryCode,
      state: select.label,
      city: '',
    }
    try {
      const result = await axios.post('/api/callMemberAPI', {
        apiName: 'SearchAddrGroup',
        param: address.current,
      })
      if (result && result.status === 200) {
        let list: any[] = []
        result.data.map((item: any) => {
          list = list.concat({ value: item.city_en, label: item.city })
        })
        setCityList(list)
        setEnableList([false, false, true])
        setAddressList([])
      }
    } catch (e) {
      //
    } finally {
      loadingModal.onClose()
    }
  }

  const getStreetData = async (select: any) => {
    loadingModal.onOpen()
    address.current = {
      nation_cd: countryCode,
      state: address.current.state,
      city: select.label,
    }

    try {
      const result = await axios.post('/api/callMemberAPI', {
        apiName: 'SearchAddrGroup',
        param: address.current,
      })
      if (result && result.status === 200) {
        let list: any[] = []
        result.data.map((item: any) => {
          list = list.concat({ value: item.street_en, label: item.street })
        })
        setStreetList(list)
        setEnableList([false, false, false])
      }
    } catch (e) {
      //
    } finally {
      loadingModal.onClose()
    }
  }

  const callSearchAddress = async (select: any) => {
    loadingModal.onOpen()
    try {
      const result = await axios.post('/api/callMemberAPI', {
        apiName: 'SearchAddress',
        param: {
          SchCountry: countryCode,
          SchType: 'S',
          SchValue: select.label,
          SchCount: 10000,
        },
      })
      if (result && result.status === 200) {
        const list = result.data.filter(
          (item: any) =>
            item.State === address.current.state &&
            item.City === address.current.city &&
            item.Street === select.label,
        )
        setAddressList(list)
      }
    } catch (e) {
      //
    } finally {
      loadingModal.onClose()
    }
  }

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="p-4 ">
        <Select
          styles={colourStyles}
          components={{ IndicatorSeparator: () => null }}
          options={stateList}
          isDisabled={enableList[0]}
          placeholder={t('select_state')}
          onChange={(select) => getCityData(select)}
        />
        <div className="mt-3" />
        <Select
          styles={colourStyles}
          components={{ IndicatorSeparator: () => null }}
          options={cityList}
          isDisabled={enableList[1]}
          placeholder={t('select_city')}
          onChange={(select) => getStreetData(select)}
        />
        <div className="mt-3" />
        <Select
          styles={colourStyles}
          components={{ IndicatorSeparator: () => null }}
          options={streetList}
          isDisabled={enableList[2]}
          placeholder={t('select_street')}
          onChange={(select) => callSearchAddress(select)}
        />
      </div>
      <div className="h-0.5 bg-[#5D32B0]" />
      <div className="flex flex-col min-h-[600px] overflow-auto">
        {addressList.map((item, index) => (
          <div key={index} className="flex flex-col h-12">
            <div
              className={`flex h-12 items-center p-2 active:bg-[#D5C6EC]`}
              onClick={() => {
                const address: addressData = {
                  zipCode: item.ZipCode,
                  frontAddress: item.State + ' ' + item.City,
                  backAddress: item.Street + ' ' + item.Number,
                  frontAddressEn: item.StateEn + ' ' + item.CityEn,
                  backAddressEn: item.StreetEn + ' ' + item.NumberEn,
                }

                selectAddress(address)
              }}
            >
              ( {item.ZipCode} ) {getFrontAddress_local(item, countryCode)}
            </div>
            {index !== addressList.length - 1 && <hr />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default StreetAddressLayout
