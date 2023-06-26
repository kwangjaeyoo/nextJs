import axios from 'axios'
import { t } from 'i18next'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import useLoadingModal from '@/pages/hook/useLoadingModal'

import SpeechArrowModal from '../modal/SpeechArrowModal'
import ItemView from './ItemView'

interface ItemListLayoutProps {
  selectItem: (item: any) => void
}

enum type {
  all = '',
  item_name = 'NM',
  item_code = 'CD',
}

const ItemListLayout: React.FC<ItemListLayoutProps> = ({ selectItem }) => {
  const didMount = useRef(false)
  const loadingModal = useLoadingModal()

  const noImageItemCheck = useRef<HTMLInputElement>(null)
  const [noImageFilterClicked, setNoImageFilterClicked] = useState(false)
  const noBarcodeItemCheck = useRef<HTMLInputElement>(null)
  const [noBarcodeFilterClicked, setNoBarcodeFilterClicked] = useState(false)
  const [filterModel, setFilterModel] = useState(false)

  const [itemClickedIndex, setItemClickedIndex] = useState(-1)
  const orgItemList = useRef<any>([])
  const [itemList, setItemList] = useState<any>([])

  const [schTypeModal, setSchTypeModal] = useState(false)
  const [schType, setSchType] = useState<type>(type.all)
  const [schValue, setSchValue] = useState('')

  const getItemList = async () => {
    loadingModal.onOpen()

    try {
      const params = {
        schType: schType,
        schValue: schValue,
      }

      // https://nextjs.org/docs/messages/api-routes-response-size-limit
      // console.log('callItemAPI ' + JSON.stringify(params))
      const result = await axios.post('/api/callItemAPI', {
        apiName: 'GetItemList',
        param: params,
      })

      if (result && result.status == 200) {
        // console.log('result TODO ' + result.data.rows.length)
        orgItemList.current = result.data.rows.slice(0, 1000)
      }
    } catch (e) {
      console.log(e)
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

  const clickNoImageInput = () => {
    if (noImageItemCheck.current) {
      noImageItemCheck.current.click()
      setNoImageFilterClicked(noImageItemCheck.current.checked)
    }
    setFilterModel(false)
  }

  const clickNoBarcodeInput = () => {
    if (noBarcodeItemCheck.current) {
      noBarcodeItemCheck.current.click()
      setNoBarcodeFilterClicked(noBarcodeItemCheck.current.checked)
    }
    setFilterModel(false)
  }

  useEffect(() => {
    const filteredItems = orgItemList.current.filter((item: any) => {
      if (noImageFilterClicked && noBarcodeFilterClicked) {
        return (
          (item.item_image_url === '' || item.item_image_url === null) &&
          (item.barcode === '' || item.barcode === null)
        )
      }
      if (noImageFilterClicked) {
        return item.item_image_url === '' || item.item_image_url === null
      }
      if (noBarcodeFilterClicked) {
        return item.barcode === '' || item.barcode === null
      }
      return item
    })

    setItemList(filteredItems)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgItemList.current, noImageFilterClicked, noBarcodeFilterClicked])

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
          <div
            className="w-1/3 ml-2 flex justify-between whitespace-nowrap"
            onClick={() => setSchTypeModal(!schTypeModal)}
          >
            {schType === type.all && <>{t('all')}</>}
            {schType === type.item_code && <>{t('item_code')}</>}
            {schType === type.item_name && <>{t('item_name')}</>}
            <Image src="/ic_arrow_down.png" alt="down" width={25} height={25} />
          </div>

          <div className="w-0.5 h-full bg-[#dbdbdb]" />
          <div className="flex flex-row w-full justify-between pl-3 pr-2">
            <>
              <input
                className="
                  w-full 
                  focus:outline-none 
                  focus:border-[#7340BF] 
                  focus:ring-[#7340BF] 
                  focus:border-2"
                value={schValue}
                onChange={(value) => setSchValue(value.target.value)}
              />
            </>
            <div className="flex flex-row">
              <Image
                src={
                  schValue.length > 0 ? '/Search.png' : '/Search-disable.png'
                }
                width={30}
                height={30}
                alt="search"
                onClick={getItemList}
              />
              <Image
                src={
                  noImageFilterClicked || noBarcodeFilterClicked
                    ? '/ic_search_filter_on.png'
                    : '/ic_search_filter.png'
                }
                width={30}
                height={30}
                alt="filter"
                onClick={() => setFilterModel(!filterModel)}
              />
            </div>
          </div>
        </div>
      </div>

      {schTypeModal && (
        <SpeechArrowModal
          marginLeft="10px"
          arrowLeftPos="40px"
          body={
            <div className="w-32">
              <div
                className={`
                  flex 
                  items-center 
                  h-10 
                  pl-3 
                  pr-3 
                  ${schType === type.all ? 'bg-[#EEE8F7]' : ''}
                `}
                onClick={() => {
                  setSchType(type.all)
                  setSchTypeModal(false)
                }}
              >
                {t('all')}
              </div>
              <div
                className={`
                  flex 
                  items-center 
                  h-10 
                  pl-3 
                  pr-3 
                  ${schType === type.item_name ? 'bg-[#EEE8F7]' : ''}
                `}
                onClick={() => {
                  setSchType(type.item_name)
                  setSchTypeModal(false)
                }}
              >
                {t('item_name')}
              </div>
              <div
                className={`
                  flex 
                  items-center 
                  h-10 
                  pl-3 
                  pr-3 
                  ${schType === type.item_code ? 'bg-[#EEE8F7]' : ''}
                `}
                onClick={() => {
                  setSchType(type.item_code)
                  setSchTypeModal(false)
                }}
              >
                {t('item_code')}
              </div>
            </div>
          }
          onClose={() => setSchTypeModal(false)}
        />
      )}

      {filterModel && (
        <SpeechArrowModal
          marginLeft="50px"
          right="10px"
          arrowRightPos="12px"
          onClose={() => setFilterModel(false)}
          body={
            <>
              <div
                className="flex items-center h-10 pl-3 pr-3"
                onClick={clickNoImageInput}
              >
                <input
                  ref={noImageItemCheck}
                  type="checkbox"
                  className="mr-3"
                  onClick={clickNoImageInput}
                  defaultChecked={noImageFilterClicked}
                />
                {t('no_image_item')}
              </div>
              <div
                className="flex items-center h-10 pl-3 pr-3"
                onClick={clickNoBarcodeInput}
              >
                <input
                  ref={noBarcodeItemCheck}
                  type="checkbox"
                  className="mr-3"
                  onClick={clickNoBarcodeInput}
                  defaultChecked={noBarcodeFilterClicked}
                />
                {t('no_barcode_item')}
              </div>
            </>
          }
        />
      )}

      <div className="flex flex-col bg-[#f4f4f4]">
        {noImageFilterClicked && (
          <div className="flex flex-row ">
            <div
              className="flex flex-row rounded-full bg-[#EEE8F7] m-2 pl-3 pr-3 pt-1 pb-1"
              onClick={() => setNoImageFilterClicked(false)}
            >
              <div className="mr-2">{t('no_image_item')}</div>
              <Image src="/ic_delete.png" width={20} height={20} alt="del" />
            </div>
          </div>
        )}
        {noBarcodeFilterClicked && (
          <div className="flex flex-row ">
            <div
              className="flex flex-row rounded-full bg-[#EEE8F7] m-2 pl-3 pr-3 pt-1 pb-1"
              onClick={() => setNoBarcodeFilterClicked(false)}
            >
              <div className="mr-2">{t('no_barcode_item')}</div>
              <Image src="/ic_delete.png" width={20} height={20} alt="del" />
            </div>
          </div>
        )}
      </div>

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
          onClick={() => selectItem(itemList[itemClickedIndex])}
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
