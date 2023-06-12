import { t } from 'i18next'

import InputBox from '../InputBox'

const RegistStep3 = () => {
  return (
    <>
      <div className="ml-8 font-semi-bold text-[16px]">{t('text_sender')}</div>

      <div
        className="
          flex 
          flex-col
          bg-white
          ml-8
          mr-8
          mt-4
          p-4
          rounded-xl"
      >
        <div className="font-semi-bold text-[16px] mb-3">
          {t('origin_country')}
        </div>
        <InputBox placeholder="TODO" disable />

        <div className="flex mt-5 mb-3">
          <div className="font-semi-bold text-[16px]">{t('name')}</div>
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
          <div className="font-semi-bold text-[16px]">{t('address')}</div>
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

        <div className="flex flex-row mb-3">
          <InputBox placeholder="" disable />
          <div
            className="
              w-32
              bg-[#9772D1]
              rounded
              ml-2
              flex
              items-center 
              justify-center
              text-white
              "
          >
            {t('search')}
          </div>
        </div>

        <div className="mb-3">
          <InputBox placeholder="" disable />
        </div>
        <InputBox
          placeholder={t('please_check_address_detail_input')}
          onChange={(value) => console.log(value)}
        />

        {/*영문주소....... TODO */}

        <div className="flex mt-5 mb-3">
          <div className="font-semi-bold text-[16px]">
            {t('telephone_number')}
          </div>
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
        <InputBox placeholder={''} onChange={(value) => console.log(value)} />
      </div>
    </>
  )
}

export default RegistStep3
