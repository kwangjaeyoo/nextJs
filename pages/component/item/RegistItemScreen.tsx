import { t } from 'i18next'
import { useRouter } from 'next/router'
import { useState } from 'react'

import InputBox from '../InputBox'
import PurpleDot from '../PurpleDot'
import TopLayout from '../TopLayout'

const RegistItemScreen = () => {
  const router = useRouter()

  // TODO

  const [basicInfoOpen, setBasicInfoOpen] = useState(true)
  const [itemCodeOpen, setItemCodeOpen] = useState(false)
  const [productOpen, setProductOpen] = useState(false)
  const [customsInfoOpen, setCustomsInfoOpen] = useState(false)

  return (
    <>
      <TopLayout
        title={t('register_item')}
        showLeftBtn
        onLeftPress={router.back}
      />

      <div className="h-screen bg-[#f4f4f4] p-3 overflow-y-auto">
        <div className="bg-white rounded">
          <div
            className="flex justify-between p-4"
            onClick={() => setBasicInfoOpen(!basicInfoOpen)}
          >
            <div className="flex flex-row">
              <>{t('item_default_info')}</>
              <PurpleDot />
            </div>

            <div>aaaa</div>
          </div>

          {basicInfoOpen && (
            <div>
              <div className="h-0.5 bg-[#f4f4f4] ml-2 mr-2" />

              <div className="p-4 flex flex-col">
                <div className="mb-2">{t('item_code')}</div>
                <InputBox placeholder={t('item_code_msg')!!} disable />

                <div className="mt-4 mb-2">{t('item_detail_category')}</div>
                <InputBox />

                <div className="mt-4 mb-2 flex flex-row">
                  <div className="">{t('item_name')}</div>
                  <PurpleDot />
                </div>
                <InputBox />

                <div className="mt-4 mb-2">{t('item_option')}</div>
                <InputBox />

                <div className="mt-4 mb-2">{t('item_price')}</div>
                <div className="flex flex-row">
                  <div className=" w-1/2 mr-2 rounded border border-[#dbdbdb]">
                    aaaa selecter
                  </div>
                  <InputBox />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded mt-4">
          <div
            className="flex justify-between p-4"
            onClick={() => setItemCodeOpen(!itemCodeOpen)}
          >
            <>{t('manage_item_code')}</>
            <div>aaaa</div>
          </div>

          {itemCodeOpen && (
            <div>
              <div className="h-0.5 bg-[#f4f4f4] ml-2 mr-2" />

              <div className="p-4 flex flex-col">
                <div className="mb-2">{t('register_barcode')}</div>
                <InputBox />

                <div className="mt-4 mb-2">{t('user_define_item_code')}</div>
                <InputBox />

                <div className="mt-2 text-[#939393]">
                  {t('msg_user_define_item_code')}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded mt-4">
          <div
            className="flex justify-between p-4"
            onClick={() => setProductOpen(!productOpen)}
          >
            <div className="flex flex-row">
              <>{t('item_detail_info')}</>
              <PurpleDot />
            </div>

            <div>aaaa</div>
          </div>

          {productOpen && (
            <div>
              <div className="h-0.5 bg-[#f4f4f4] ml-2 mr-2" />

              <div className="p-4 flex flex-col">
                <>aaaa Image</>
                <div className="mb-2">{t('brand')}</div>
                <InputBox />

                <div className="mt-4 mb-2">{t('metarial')}</div>
                <InputBox />

                <div className="mt-4 mb-2">{t('origin')}</div>
                <InputBox />

                <div className="mt-2 text-[#939393]">{t('origin_msg')}</div>

                <div className="mt-4 mb-2">
                  <div className="flex flex-row">
                    {t('url')}
                    <PurpleDot />
                  </div>
                </div>
                <InputBox />

                <div className="mt-2 text-[#939393]">{t('msg_url')}</div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded mt-4">
          <div
            className="flex justify-between p-4"
            onClick={() => setCustomsInfoOpen(!customsInfoOpen)}
          >
            <>{t('customs_info')}</>
            <div>aaaa</div>
          </div>

          {customsInfoOpen && (
            <div>
              <div className="h-0.5 bg-[#f4f4f4] ml-2 mr-2" />

              <div className="p-4 flex flex-col">
                <div className="mb-2">{t('oversea_trade_code')}</div>
                <div className="flex flex-row">
                  <div className=" w-1/2 mr-2 rounded border border-[#dbdbdb]">
                    aaaa selecter
                  </div>
                  <InputBox />
                </div>

                <div className="mt-4 mb-2">{t('postal_tax')}</div>
                <InputBox />
              </div>
            </div>
          )}
        </div>

        <div className="mt-5 text-[#7340BF]"> {t('customs_msg')} </div>

        <div
          className="
            flex
            items-center
            justify-center  
            bg-[#7340BF] 
            h-12 
            rounded 
            mt-5
            text-white
            "
          onClick={() => console.log('aaaa')}
        >
          {t('register_item')}
        </div>
      </div>
    </>
  )
}

export default RegistItemScreen
