import { t } from 'i18next'
import Image from 'next/image'
import { useState } from 'react'

import { SHOW_TYPE } from './SearchAddressModal'

interface SearchAddressLayoutProps {
  countryCode: string
  selectType: (type: SHOW_TYPE) => void
}

const SearchAddressLayout: React.FC<SearchAddressLayoutProps> = ({
  countryCode,
  selectType,
}) => {
  const [keywordClick, setKeywordClick] = useState(true)

  return (
    <>
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
          <Image
            src={keywordClick ? '/big-on.png' : '/big-off.png'}
            width={20}
            height={20}
            alt="check_image"
            className="mr-3"
          />
          {t('search_by_keyword_zipcode')}
        </div>

        {countryCode !== 'SG' && (
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
            <Image
              src={!keywordClick ? '/big-on.png' : '/big-off.png'}
              width={20}
              height={20}
              alt="check_image"
              className="mr-3"
            />
            {t('address_division')}
          </div>
        )}
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
          onClick={() => {
            if (keywordClick) {
              selectType(SHOW_TYPE.keyword)
            } else {
              selectType(SHOW_TYPE.street)
            }
          }}
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
          onClick={() => selectType(SHOW_TYPE.direct)}
        >
          {t('address_direct')}
        </div>
      </div>
    </>
  )
}

export default SearchAddressLayout
