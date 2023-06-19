import { t } from 'i18next'
import { useRouter } from 'next/router'
import { useState } from 'react'

import InputBox from '../InputBox'
import TopLayout from '../TopLayout'

const EnterAddressScreen = () => {
  const router = useRouter()

  const [engLayoutVisible, setEngLayoutVisible] = useState(true)

  // TODO englist 사용하는 것인지 아닌지 필요.. SG ,US 아니면 영어 보여 지도록

  return (
    <>
      <TopLayout
        title={t('address_input')}
        titleColor="text-[#ffffff]"
        backColor="bg-[#5D32B0]"
        showLeftBtn
        onLeftPress={router.back}
      />
      <div className="p-5">
        <>
          {t('address')} ({t('local_language')})
        </>
        <div className="mt-2" />
        <InputBox placeholder={t('zipcode')} />
        <div className="mt-3" />
        <InputBox placeholder={t('default_addr')} />
        <div className="mt-3" />
        <InputBox placeholder={t('detail_addr')} />

        {engLayoutVisible && (
          <>
            <div className="mt-5">
              {t('address')} ({t('english')})
            </div>
            <div className="mt-3" />
            <InputBox placeholder={t('default_addr')} />
            <div className="mt-3" />
            <InputBox placeholder={t('detail_addr')} />
          </>
        )}

        <div
          className=" 
            flex 
            flex-row
            items-center
            justify-center
            bg-[#7340BF]
            text-white
            p-4
            rounded-xl
            mt-10"
          onClick={() => console.log('TODO')}
        >
          {t('save')}
        </div>
      </div>
    </>
  )
}

export default EnterAddressScreen
