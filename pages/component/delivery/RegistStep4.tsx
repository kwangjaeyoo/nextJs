import axios from 'axios'
import { t } from 'i18next'
import { useEffect, useRef, useState } from 'react'

import useCustomModal from '@/pages/hook/useCustomModal'

import ItemListLayout from '../item/ItemListLayout'
import FullModal from '../modal/FullModal'
import DeliveryItem from './DeliveryItem'
import RegiBottomLayout from './RegiBottomLayout'

interface RegistStep4Props {
  nextClick: (itemList: any[]) => void
  prevClick: () => void
}

const RegistStep4: React.FC<RegistStep4Props> = ({ nextClick, prevClick }) => {
  const didMount = useRef(false)

  const customModal = useCustomModal()

  const [itemDataList, setItemDataList] = useState<any[]>([])
  const [enableNextBtn, setEnableNextBtn] = useState('bg-[#dbdbdb]')

  const [itemModal, setItemModal] = useState(false)

  const nationList = useRef<any[]>([])

  useEffect(() => {
    if (didMount.current) {
      getNationList()
      console.log('RegistStep4 nationList')
    } else {
      didMount.current = true
    }
  }, [])

  const getNationList = async () => {
    try {
      const result = await axios.post('/api/callMemberAPI', {
        apiName: 'GetNationList',
      })
      if (result && result.status == 200) {
        nationList.current = result.data
      }
    } catch (e) {}
  }

  useEffect(() => {
    setEnableNextBtn(itemDataList.length > 0 ? 'bg-[#7340BF]' : 'bg-[#dbdbdb]')
  }, [itemDataList])

  const checkItemList = () => {
    if (itemDataList.length == 0) {
      customModal.onOpen(t('no_item_info'))
    } else {
      for (let i = 0; i < itemDataList.length; i++) {
        const data = itemDataList[i]

        if (data.name.trim().length == 0) {
          customModal.onOpen(t('no_item_name'))
          return
        }

        if (data.count.trim().length == 0) {
          customModal.onOpen(t('no_item_count'))
          return
        }

        if (data.price == '' || data.price == 0) {
          customModal.onOpen(t('no_item_price'))
          return
        }

        if (data.currency.trim().length == 0) {
          customModal.onOpen(t('no_item_currency'))
          return
        }

        if (data.url.trim().length == 0 && data.imageUrl.trim().length == 0) {
          customModal.onOpen(t('no_item_url'))
          return
        }
      }

      nextClick(itemDataList)
    }
  }

  return (
    <div className="relative">
      <div className="p-6">
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
              setItemModal(true)
              // 일단 말풍선 Add item 은 삭제...
              // 아이템 추가 시 이미지 처리 추후
              // if (itemDataList.length < 4) {
              //   setAddPopup(!addPopup)
              // } else {
              //   customModal.onOpen(t('msg_allow_total_4_items'))
              // }
            }}
          >
            + {t('text_add')}
          </div>
        </div>

        {/* {addPopup && (
          <>
            <div
              className="fixed inset-0 bg-[#00000090] z-30"
              onClick={() => setAddPopup(false)}
            />

            <div className="absolute z-40 w-4 h-4 bg-white rotate-45 right-10 top-[4rem]" />
            <div className="absolute z-50 rounded bg-white right-0 top-[4.5rem] flex flex-col p-4">
              <div
                className="h-10 flex items-center active:bg-[#dbdbdb]"
                onClick={() => {
                  setAddPopup(false)
                  setItemModal(true)
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
        )} */}

        <div className="mt-8">
          {itemDataList.map((item, index) => (
            <DeliveryItem
              key={index}
              index={index}
              item={item}
              nationLists={nationList.current}
              onChange={(value) => {
                setItemDataList((prevList) => {
                  const newList = [...prevList]
                  newList[index] = value
                  return newList
                })
              }}
              deleteItem={(indexRemove) => {
                customModal.onOpen(
                  t('delete_item_msg'),
                  {
                    btnClick: () => {
                      setItemDataList((prevList) =>
                        prevList.filter((_, index) => index !== indexRemove),
                      )
                    },
                  },
                  {
                    btnText: t('cancel')!!,
                    btnBgColor: 'bg-[#dbdbdb]',
                  },
                )
              }}
            />
          ))}
        </div>
      </div>

      <RegiBottomLayout
        nextClick={checkItemList}
        nextBgColor={enableNextBtn}
        prevClick={prevClick}
      />

      <FullModal
        isOpen={itemModal}
        title={t('international_ship_management')}
        titleBgColor="bg-[#5D32B0]"
        titleTextColor="text-[#ffffff]"
        showRightBtn
        rightBtnImage="/close-wh.png"
        onRightPress={() => setItemModal(false)}
        body={
          <ItemListLayout
            selectItem={(item) => {
              setItemModal(false)

              const model = {
                name: item.ITEM_NM,
                count: '',
                price: item.item_price,
                currency: item.currency.trim(),
                weight: item.package_weight,
                url: item.ITEM_URL ?? '',
                image: '',
                imageUrl: item.item_image_url,
              }

              console.log(model)

              setItemDataList(itemDataList.concat(model))
            }}
          />
        }
      />
    </div>
  )
}

export default RegistStep4
