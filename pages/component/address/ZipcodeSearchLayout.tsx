import axios from 'axios'
import { t } from 'i18next'
import Image from 'next/image'
import { useState } from 'react'

import useLoadingModal from '@/pages/hook/useLoadingModal'

interface ZipcodeSearchLayoutProps {
  countryCode: string
  selectAddress: (item: any) => void
}

const ZipcodeSearchLayout: React.FC<ZipcodeSearchLayoutProps> = ({
  countryCode = 'SG',
  selectAddress,
}) => {
  const loadingModal = useLoadingModal()

  const [text, setText] = useState('')
  const [itemList, setItemList] = useState<any[]>([])

  const search = async () => {
    if (text.trim().length == 0) {
      return
    }

    loadingModal.onOpen()

    let type = isNaN(parseInt(text)) ? 'S' : 'Z'

    if (type === 'Z') {
      if (countryCode === 'CN' && text.length != 6) {
        // 중국 zipcode 6자리
        type = 'S'
      } else if (countryCode === 'DE' && text.length != 5) {
        // 독일 zipcode 5자리
        type = 'S'
      } else if (countryCode === 'ID' && text.length != 5) {
        // 인도네시아 zipcode 5자리
        type = 'S'
      } else if (countryCode === 'IN' && text.length != 6) {
        // 인도 zipcode 6자리
        type = 'S'
      } else if (countryCode === 'JP' && text.length != 7) {
        // 일본 zipcode 7자리
        type = 'S'
      } else if (countryCode === 'KR' && text.length != 5) {
        // 한국 zipcode 5자리
        type = 'S'
      } else if (countryCode === 'MY' && text.length != 5) {
        // 말레이시아 zipcode 5자리
        type = 'S'
      } else if (countryCode === 'SG' && text.length != 6) {
        // 싱가포르 zipcode 6자리
        type = 'S'
      } else if (countryCode === 'TH' && text.length != 5) {
        // 태국 zipcode 6자리
        type = 'S'
      } else if (
        countryCode === 'US' &&
        !(text.length == 5 || text.length == 9)
      ) {
        // 미국 zipcode 5/9자리
        type = 'S'
      }
    }

    try {
      const result = await axios.post('/api/callMemberAPI', {
        apiName: 'SearchAddress',
        param: {
          SearchAddress: {
            SchCountry: countryCode,
            SchType: type,
            SchValue: text,
            SchCount: 10000,
          },
        },
      })

      if (result && result.status === 200) {
        setItemList(result.data)
        // TODO data 가 없을때 처리 ....
      }
    } catch (e) {
      console.log(e)
    } finally {
      loadingModal.onClose()
    }
  }

  return (
    <>
      <div className="h-14 w-full flex items-center pl-5 pr-5 justify-between">
        <input
          className="w-full focus:outline-none"
          placeholder={t('build_zipcode')!!}
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <div className="flex flex-row">
          {text.length > 0 && (
            <Image
              src={'/delet.png'}
              width={30}
              height={30}
              alt="del"
              onClick={() => setText('')}
            />
          )}
          <Image
            src={text.length == 0 ? '/Search-disable.png' : '/Search.png'}
            width={30}
            height={30}
            alt="search"
            onClick={search}
          />
        </div>
      </div>
      <div className="h-0.5 bg-[#5D32B0]" />

      {itemList.length > 0 ? (
        itemList.map((item, index) => (
          <div key={index} className="flex flex-col h-12">
            <div
              className={`flex h-12 items-center p-2 active:bg-[#D5C6EC]`}
              onClick={() => selectAddress(item)}
            >
              ( {item.ZipCode} ) {getFrontAddress_local(item, countryCode)}
            </div>
            {index !== itemList.length - 1 && <hr />}
          </div>
        ))
      ) : (
        <div className="m-20 text-[#5D32B0]">{t('keyword_search')}</div>
      )}
    </>
  )
}

const getFrontAddress_local = (item: any, nation: string) => {
  let addressString = ''
  switch (nation) {
    // case 'KR':
    //   addressString =
    //     item.State + ' ' + item.City + ' ' + item.Street + ' ' + item.Number;
    //   break;
    case 'SG':
      addressString = item.Number + ' ' + item.Street + ' ' + item.Bldg
      break

    default:
      addressString =
        item.State + ' ' + item.City + ' ' + item.Street + ' ' + item.Number
      break
  }
  return addressString
}

export default ZipcodeSearchLayout
