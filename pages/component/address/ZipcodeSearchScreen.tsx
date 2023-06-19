import { t } from 'i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

import TopLayout from '../TopLayout'

const ZipcodeSearchScreen = () => {
  const router = useRouter()

  const [text, setText] = useState('')

  return (
    <>
      <TopLayout
        title={t('search_address')}
        titleColor="text-[#ffffff]"
        backColor="bg-[#5D32B0]"
        showLeftBtn
        onLeftPress={router.back}
      />
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
          />
        </div>
      </div>
      <div className="h-0.5 bg-[#5D32B0]" />
      TODO
    </>
  )
}

export default ZipcodeSearchScreen
