import { t } from 'i18next'

import InputBox from '../InputBox'
import PurpleDot from '../PurpleDot'
import { IaddressModel, InationModel } from './RegistDeliveryScreen'

interface RegistStep3Props {
  nationModel: InationModel
  recipientModel: IaddressModel
  nextClick: () => void
  prevClick: () => void
}

const RegistStep3: React.FC<RegistStep3Props> = ({
  nationModel,
  recipientModel,
  nextClick,
  prevClick,
}) => {
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
          <PurpleDot />
        </div>
        <InputBox placeholder="" />

        <div className="flex mt-5 mb-3">
          <div className="font-semi-bold text-[16px]">{t('address')}</div>
          <PurpleDot />
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
            onClick={
              () => {}
              // TODO 갔다 왔을 때 처리 필요...
            }
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
          <PurpleDot />
        </div>
        <InputBox placeholder="" onChange={(value) => console.log(value)} />
      </div>

      <div className="flex flex-row mt-10 h-14 ml-8 mr-8">
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
          className=" 
              flex
              w-1/2
              ml-1
              items-center
              justify-center
              bg-[#7340BF]
              text-white
              font-semibold
              rounded-xl"
          onClick={() => console.log('TODO ')}
        >
          {t('text_next')}
        </div>
      </div>
    </>
  )
}

export default RegistStep3
