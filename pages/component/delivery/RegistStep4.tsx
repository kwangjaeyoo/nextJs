import { t } from 'i18next'
import { useState } from 'react'

import DeliveryItem from './DeliveryItem'
import { useRouter } from 'next/router'

interface RegistStep4Props {
  nextClick: () => void
  prevClick: () => void
}

const RegistStep4: React.FC<RegistStep4Props> = ({ nextClick, prevClick }) => {
  const router = useRouter()

  const [addPopup, setAddPopup] = useState(false)
  const [itemDataList, setItemDataList] = useState<any[]>([])

  return (
    <div className="m-8 relative">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <div className="font-bold text-[16px]">{t('item_information')}</div>
          <div className="mt-2"> {t('msg_allow_total_4_items')}</div>
        </div>
        <div
          className="
            flex
            border 
            rounded 
            bg-[#7340BF] 
            text-white 
            w-24
            justify-center
            items-center 
            z-10
            "
          onClick={() => {
            if (itemDataList.length < 4) {
              setAddPopup(!addPopup)
            } else {
              // TODO 다찾음....팝업..
            }
          }}
        >
          + {t('text_add')}
        </div>
      </div>

      {addPopup && (
        <>
          {/*말풍선*/}
          <div
            className="fixed inset-0 bg-[#00000090] z-30"
            onClick={() => setAddPopup(false)}
          />

          <div className="absolute z-40 w-4 h-4 bg-white rotate-45 right-10 top-[4rem]" />
          <div className="absolute z-50 rounded bg-white right-0 top-[4.5rem] flex flex-col p-4">
            <div
              className="h-10 flex items-center"
              onClick={() => {
                setAddPopup(false)
                router.push('/itemList')
              }}
            >
              {t('add_before_item')}
            </div>
            <div
              className="h-10 flex items-center"
              onClick={() => {
                setAddPopup(false)
                const model = {
                  name: '',
                  count: '',
                  price: '',
                  currency: '',
                  weight: '',
                  url: '',
                  image: '',
                  imageUrl: '',
                }
                setItemDataList(itemDataList.concat(model))
              }}
            >
              {t('add_new_item')}
            </div>
          </div>
        </>
      )}

      <div className="mt-8">
        {itemDataList.map((item, index) => (
          <DeliveryItem
            key={index}
            index={index}
            item={item}
            deleteItem={(index) => {
              console.log('TODO popup')
            }}
          />
        ))}
      </div>

      <div className="flex flex-row mt-10 h-14">
        <div
          className=" 
            flex 
            w-1/2
            mr-1
            items-center
            justify-center
            bg-[#f4f4f4]
            text-[#939393]
            font-semibold
            rounded-xl
            shadow-lg"
          onClick={prevClick}
        >
          {t('text_prev')}
        </div>

        <div
          className={`
              flex
              w-1/2
              ml-1
              items-center
              justify-center
              ${
                itemDataList.length > 0 && itemDataList.length
                  ? 'bg-[#7340BF]'
                  : 'bg-[#dbdbdb]'
              }
              text-white
              font-semibold
              rounded-xl
            `}
          onClick={() => console.log('TODO')}
        >
          {t('text_next')}
        </div>
      </div>
    </div>
  )
}

export default RegistStep4
