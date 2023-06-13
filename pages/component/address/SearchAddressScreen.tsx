import { t } from 'i18next'
import { useRouter } from 'next/router'
import { useState } from 'react'

import TopLayout from '../TopLayout'

const SearchAddressScreen = () => {
  const router = useRouter()
  const [keywordClick, setKeywordClick] = useState(true)

  return (
    <>
      <TopLayout
        title={t('search_address')}
        titleColor="text-[#ffffff]"
        backColor="bg-[#5D32B0]"
      />

      <div
        className="
          flex 
          flex-col
          bg-[#f4f4f4]
          mt-8
          ml-8
          mr-8
          p-4
          rounded-xl"
      >
        <div className="mb-3">{t('search_type')}</div>

        <div
          className={`
            flex
            flex-row
            bg-[#ffffff] 
            rounded-xl 
            h-14
            mb-3
            pl-4
            items-center
            ${keywordClick && 'border border-[#5D32B0]'}
            `}
          onClick={() => setKeywordClick(true)}
        >
          {t('search_by_keyword_zipcode')}
        </div>

        <div
          className={`
            flex
            flex-row
            bg-[#ffffff] 
            rounded-xl 
            h-14
            mb-3
            pl-4
            items-center
            ${!keywordClick && 'border border-[#5D32B0]'}
           `}
          onClick={() => setKeywordClick(false)}
        >
          <div className="" />
          {t('address_division')}
        </div>
      </div>

      <div className="ml-10 mr-10 mt-10">
        <div
          className=" 
            flex 
            flex-row
            items-center
            justify-center
            bg-[#7340BF]
            text-white
            p-4
            rounded-xl"
          onClick={() => console.log('TODO')}
        >
          {t('text_next')}
        </div>

        <div
          className=" 
            flex 
            flex-row
            mt-5
            items-center
            justify-center
            bg-[#ffffff]
            border 
            border-[#5D32B0]
            text-[#5D32B0]
            p-4
            rounded-xl"
          onClick={() => console.log('TODO')}
        >
          {t('address_direct')}
        </div>
      </div>
    </>
  )
}

export default SearchAddressScreen
