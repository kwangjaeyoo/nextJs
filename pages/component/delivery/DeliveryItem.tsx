import { t } from 'i18next'
import Image from 'next/image'
import React, { MouseEvent, useEffect, useRef, useState } from 'react'
import Select from 'react-select'

import { colourStyles } from '@/util/SelectStyle'
import { isNumericOrEmpty } from '@/util/Util'

import InputBox from '../InputBox'
import PurpleDot from '../PurpleDot'

interface DeliveryItemProps {
  index: number
  item: any
  nationLists: any[]
  deleteItem: (index: number) => void
  onChange: (value: any) => void
}

const DeliveryItem: React.FC<DeliveryItemProps> = ({
  index,
  item,
  nationLists,
  deleteItem,
  onChange,
}) => {
  const didMount = useRef(false)
  const [open, setOpen] = useState(true)

  const [itemData, setItemData] = useState(() => {
    console.log(item)

    if (
      item.imageUrl.trim().length == 0 ||
      !(
        item.imageUrl.toLowerCase().endsWith('jpg') ||
        item.imageUrl.toLowerCase().endsWith('png')
      )
    ) {
      item.imageUrl = '/item_no_image.png'
    }

    return item
  })

  const [defCurrencyIndex, setDefCurrencyIndex] = useState(-1)

  const [nationlist] = useState(() => {
    let list: { value: any; label: any }[] = []
    nationLists.map((data, index) => {
      list.push({
        label: data.currency + ' (' + data.nation_nm + ')',
        value: data.currency,
      })

      if (item.currency === data.currency) {
        setDefCurrencyIndex(index)
      }
    })
    return list
  })

  const handleDeleteClick = (event: MouseEvent<HTMLDivElement>) => {
    deleteItem(index)
    event.stopPropagation()
  }

  useEffect(() => {
    if (didMount.current) {
      console.log('DeliveryItem')
    } else {
      didMount.current = true
    }
  }, [])

  useEffect(() => {
    onChange(itemData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemData])

  return (
    <div
      className="
        mt-3
        bg-white
        p-4
        rounded-xl"
    >
      <div
        className="flex flex-row justify-between"
        onClick={() => setOpen(!open)}
      >
        <div>
          {t('text_product')} {index + 1}
        </div>
        <div className="flex flex-row">
          <div className="text-[#eb5757]" onClick={handleDeleteClick}>
            {t('delete')}
          </div>
          <div className="w-0.5 bg-[#f4f4f4] ml-3 mr-3" />

          <Image
            src={open ? '/ic_arrow_up.png' : '/ic_arrow_down.png'}
            alt="arrow"
            height={30}
            width={30}
          />
        </div>
      </div>

      {open ? (
        <>
          <div className="h-0.5 bg-[#f4f4f4] mt-4 mb-2" />

          <div className="flex mt-5 mb-3">
            <div className="font-semi-bold text-[14px]">{t('item_name')}</div>
            <PurpleDot />
          </div>
          <InputBox
            value={itemData.name}
            onChange={(value) => {
              setItemData((prevItemData: any) => ({
                ...prevItemData,
                name: value,
              }))
            }}
          />

          <div className="flex mt-5 mb-3">
            <div className="font-semi-bold text-[14px]">{t('item_count')}</div>
            <PurpleDot />
          </div>
          <InputBox
            value={itemData.count}
            onChange={(value) => {
              if (isNumericOrEmpty(value)) {
                setItemData({ ...itemData, count: value })
              }
            }}
          />

          <div className="flex mt-5 mb-3">
            <div className="font-semi-bold text-[14px]">{t('item_price')}</div>
            <PurpleDot />
          </div>
          <div className="flex flex-row">
            <div className="flew w-1/2 mr-1">
              <Select
                styles={colourStyles}
                isSearchable={false}
                defaultValue={() => nationlist[defCurrencyIndex]}
                options={nationlist}
                components={{ IndicatorSeparator: () => null }}
                onChange={(value) =>
                  setItemData({ ...itemData, currency: value.value })
                }
              />
            </div>
            <div className="flew w-1/2 ml-1">
              <InputBox
                value={itemData.price}
                onChange={(value) => {
                  if (isNumericOrEmpty(value)) {
                    setItemData({ ...itemData, price: value })
                  }
                }}
              />
            </div>
          </div>

          <div className="flex mt-5 mb-3">
            <div className="font-bold text-[14px]">{t('url_or_picture')}</div>
            <PurpleDot />
          </div>

          <div className="text-[13px]">{t('msg_required_url_or_image')}</div>
          <div className="flex mt-3 mb-3">{t('url')}</div>

          <InputBox
            value={itemData.url}
            onChange={(value) => {
              setItemData({ ...itemData, url: value })
            }}
          />

          <div className="flex mt-3 mb-3">{t('item_image')}</div>
          <div className="flex flex-row">
            <div className="flew w-1/2 mr-1">
              <Image
                src={itemData.imageUrl}
                height={200}
                width={200}
                alt="item"
              />
            </div>
            <div className="flew w-1/2 ml-1">{t('msg_upload_image')}</div>
          </div>
        </>
      ) : (
        <div className="flex flex-row mt-4 mb-2">
          <div className="flew w-1/2 mr-1">
            <Image
              src={itemData.imageUrl}
              height={200}
              width={200}
              alt="item"
            />
          </div>
          <div className="flex items-center">
            <div>
              <div>{item.name}</div>
              <div>
                {item.price} {item.currency}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeliveryItem
