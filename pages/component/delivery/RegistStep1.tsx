import { t } from 'i18next'

const RegistStep1 = () => {
  return (
    <>
      <div
        className="
          flex 
          flex-col
          bg-white
          ml-8
          mr-8
          p-4
          rounded-xl "
      >
        <div className="flex flex-row">
          <div className="font-semi-bold text-[16px]">
            {t('origin_country')}
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

        <div
          className="
            border 
            border-dbdbdb 
            h-14 
            flex 
            items-center 
            p-2 
            mt-3 
            justify-between"
        >
          <div className="text-[#939393] text-[16px]">{t('select')}</div>
          <div>TODO</div>
        </div>

        <div className="flex flex-row mt-8 ">
          <div className="font-semi-bold text-[16px]">
            {t('destination_country')}
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

        <div
          className="
            border 
            border-dbdbdb 
            h-14
            flex 
            items-center 
            p-2 
            mt-3 
            justify-between"
        >
          <div className="text-[#939393] text-[16px]">{t('select')}</div>
          <div>TODO</div>
        </div>
      </div>

      <div
        className="
          flex 
          flex-row
          bg-white
          m-10
          p-4
          rounded-xl"
      >
        <div className="bg-pink-400 ">TODO</div>
        <div className="text-[16px] ml-4">
          {t('msg_agree_qdelivery_service_guide')}
        </div>
        <>TODO</>
      </div>
    </>
  )
}

export default RegistStep1
