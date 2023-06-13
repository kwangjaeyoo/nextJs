import { t } from 'i18next'

import DeliveryItem from './DeliveryItem'

interface RegistStep4Props {
  nextClick: () => void
  prevClick: () => void
}

const RegistStep4: React.FC<RegistStep4Props> = ({ nextClick, prevClick }) => {
  return (
    <div className="m-8">
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
            "
          onClick={() => console.log('TODO')}
        >
          + {t('text_add')}
        </div>
      </div>

      <div className="mt-8">
        <DeliveryItem index={0} item={null} />
        <DeliveryItem index={1} item={null} />
      </div>
    </div>
  )
}

export default RegistStep4
