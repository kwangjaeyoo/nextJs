import { t } from 'i18next'
import { useEffect } from 'react'
import Select, { StylesConfig } from 'react-select'

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

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
]

const RegistStep1 = () => {
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
    } catch (e) {}
  }

  useEffect(() => {
    console.log('RegistStep1')
    loadFromNation()
  }, [])

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
            options={options}
            components={{ IndicatorSeparator: () => null }}
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
            components={{ IndicatorSeparator: () => null }}
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
      >
        <div className="bg-pink-400 ">TODO</div>
        <div className="text-[16px] ml-4">
          {t('msg_agree_qdelivery_service_guide')}
        </div>
        <>TODO</>
      </div>
    </>
  )
}

export default RegistStep1
