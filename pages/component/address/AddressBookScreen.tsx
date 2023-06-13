import { t } from 'i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import TopLayout from '../TopLayout'

const AddressBookScreen = () => {
  const router = useRouter()

  const sortType = [
    t('all'),
    t('pickup_address'),
    t('return_address'),
    t('representing_address'),
    t('shipping_address'),
  ]
  const [select, setSelect] = useState([true, false, false, false, false])

  useEffect(() => {
    console.log('AddressBookScreen start')
  }, [])

  const clickType = (index: number) => {
    if (index === 0) {
      if (select[0] == false) {
        setSelect([true, false, false, false, false])

        //TODO list all
      }
    } else {
      setSelect((prevSelect) => {
        let copySelect = [...prevSelect]
        copySelect[0] = false
        copySelect[index] = !copySelect[index]

        if (copySelect[1] && copySelect[2] && copySelect[3] && copySelect[4]) {
          copySelect = [true, false, false, false, false]
          //TODO list all
        }

        //TODO list at......

        return copySelect
      })
    }
  }

  return (
    <>
      <TopLayout
        title={t('addressList')}
        showLeftBtn
        onLeftPress={router.back}
      />
      <div className="flex flex-col p-4">
        <div className="flex">{t('address_promotion_msg')}</div>
        <div className="flex flex-row mt-3">
          {sortType.map((item, index) => (
            <div
              className={`
                pl-3
                pr-3
                pt-2
                pb-2 
                rounded-full 
                text-[#0d1e20]
                ${select[index] ? 'bg-[#EEE8F7]' : 'bg-[#ECECEC]'}
                ${index > 0 && 'ml-3'}
              `}
              key={index}
              onClick={() => clickType(index)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-1.5 bg-gradient-to-b from-[#dbdbdb]" />
      <div className="flex flex-col p-4">TODO List</div>
    </>
  )
}

export default AddressBookScreen
