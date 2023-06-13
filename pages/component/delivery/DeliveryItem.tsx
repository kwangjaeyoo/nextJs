import { t } from 'i18next'
import React, { useState, MouseEvent } from 'react'
import InputBox from '../InputBox'
import Select, { StylesConfig } from 'react-select'
import { colourStyles } from '../modal/SelectStyle'

interface DeliveryItemProps {
  index: number
  item: any
  deleteItem: (index: number) => void
}

const currencyList = [
  { value: 'SG', label: 'TODO' },
  { value: 'KR', label: 'TODO Korea' },
  { value: 'MY', label: 'TODO' },
]

const DeliveryItem: React.FC<DeliveryItemProps> = ({
  index,
  item,
  deleteItem,
}) => {
  const [open, setOpen] = useState(true)

  const handleDeleteClick = (event: MouseEvent<HTMLDivElement>) => {
    console.log('del ' + index)
    deleteItem(index)
    event.stopPropagation()
  }

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
          <div>TODO</div>
        </div>
      </div>

      {open ? (
        <>
          <div className="h-0.5 bg-[#f4f4f4] mt-4 mb-2" />

          <div className="flex mt-5 mb-3">
            <div className="font-semi-bold text-[14px]">{t('item_name')}</div>
            <div
              className="
                mt-1 
                ml-2 
                flex 
                self-center
                w-2
                h-2 
                bg-[#9772D1]
                rounded-full"
            />
          </div>
          <InputBox placeholder="" />

          <div className="flex mt-5 mb-3">
            <div className="font-semi-bold text-[14px]">{t('item_count')}</div>
            <div
              className="
                mt-1 
                ml-2 
                flex 
                self-center
                w-2
                h-2 
                bg-[#9772D1]
                rounded-full"
            />
          </div>
          <InputBox placeholder="" />

          <div className="flex mt-5 mb-3">
            <div className="font-semi-bold text-[14px]">{t('item_price')}</div>
            <div
              className="
                mt-1 
                ml-2 
                flex 
                self-center
                w-2
                h-2 
                bg-[#9772D1]
                rounded-full"
            />
          </div>
          <div className="flex flex-row">
            <div className="flew w-1/2 mr-1">
              <Select
                styles={colourStyles}
                isSearchable={false}
                options={currencyList}
                components={{ IndicatorSeparator: () => null }}
                onChange={() => console.log('TODO')}
              />
            </div>
            <div className="flew w-1/2 ml-1">
              <InputBox placeholder="" />
            </div>
          </div>

          <div className="flex mt-5 mb-3">
            <div className="font-bold text-[14px]">{t('url_or_picture')}</div>
            <div
              className="
              mt-1 
              ml-2 
              flex 
              self-center
              w-2
              h-2 
              bg-[#9772D1]
              rounded-full"
            />
          </div>

          <div className="text-[13px]">{t('msg_required_url_or_image')}</div>
          <div className="flex mt-3 mb-3">{t('url')}</div>

          <InputBox placeholder="" />

          <div className="flex mt-3 mb-3">{t('item_image')}</div>
          <div className="flex flex-row">
            <div className="flew w-1/2 mr-1"></div>
            <div className="flew w-1/2 ml-1">{t('msg_upload_image')}</div>
          </div>
        </>
      ) : (
        <div className="mt-4 mb-2">close TODO</div>
      )}
    </div>
  )
}

export default DeliveryItem
