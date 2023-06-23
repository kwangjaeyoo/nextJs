import axios from 'axios'
import { t } from 'i18next'
import { useEffect, useRef, useState } from 'react'

import useLoadingModal from '@/pages/hook/useLoadingModal'

import ItemView from './ItemView'

const ItemListLayout = () => {
  const didMount = useRef(false)
  const loadingModal = useLoadingModal()

  const [itemClickedIndex, setItemClickedIndex] = useState(-1)
  const [itemList, setItemList] = useState<any>([])

  const schType = useRef('')
  const [schValue, setSchValue] = useState('')

  const getItemList = async () => {
    const param = {
      schType: schType.current,
      schValue: schValue,
    }

    loadingModal.onOpen()

    try {
      const result = await axios.post('/api/callItemAPI', {
        apiName: 'GetItemList',
        param: {},
      })
      if (result && result.status == 200) {
        setItemList(result.data.rows.slice(100, 300))
      }
    } catch (e) {
      //
    } finally {
      loadingModal.onClose()
    }
  }

  useEffect(() => {
    if (didMount.current) {
      getItemList()
    } else {
      didMount.current = true
    }
  }, [])

  return (
    <>
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
      </div>

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
            text-white
            fixed
            left-10
            right-10
            bottom-10
          "
        >
          {t('get_item_info')}
        </div>
      )}
    </>
  )
}

export default ItemListLayout
