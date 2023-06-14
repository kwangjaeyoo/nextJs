import { t } from 'i18next'
import { useRouter } from 'next/router'
import { Key, useState } from 'react'

import TopLayout from '../TopLayout'
import ItemView from './ItemView'

const ItemListScreen = () => {
  const router = useRouter()

  const [itemClickedIndex, setItemClickedIndex] = useState(-1)
  const [itemList, setItemList] = useState<any>([{ 1: 2 }, { 1: 2 }])

  return (
    <>
      <TopLayout
        title={t('international_ship_management')}
        showLeftBtn
        onLeftPress={router.back}
        showRightBtn
        rightBtnImage="/black_plus.png"
        onRightPress={() => router.push('/regitstItem')}
      />

      <div className="h-16 bg-[#f4f4f4] p-3">
        <div
          className="
            bg-white 
            w-full 
            h-full 
            rounded-xl 
            flex 
            items-center 
            p-2"
        >
          <div className="w-1/3 ml-2">TODO</div>
          <div className="w-0.5 h-full bg-[#dbdbdb]" />
          <div className="flex flex-row w-full justify-between pl-3 pr-2">
            <div>TODO</div>
            <div>TODO</div>
          </div>
        </div>
      </div>
      <div className="w-full h-1.5 bg-gradient-to-b from-[#dbdbdb] to-[#f4f4f4]" />

      <div className="h-screen bg-[#f4f4f4]">
        {itemList.map((item: any, index: number) => (
          <ItemView
            key={index}
            item={item}
            click={itemClickedIndex == index}
            onClick={() => setItemClickedIndex(index)}
          />
        ))}

        {itemClickedIndex > -1 && (
          <div
            onClick={() => console.log('TODO')}
            className="
              flex
              items-center
              justify-center
              bg-[#5D32B0] 
              m-3 
              rounded-xl 
              h-14
              text-white"
          >
            {t('get_item_info')}
          </div>
        )}
      </div>
    </>
  )
}

export default ItemListScreen
