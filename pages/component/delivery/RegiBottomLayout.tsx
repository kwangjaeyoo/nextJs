import { t } from 'i18next'

interface Props {
  nextClick: () => void
  nextBgColor?: string
  prevClick: () => void
}

const RegiBottomLayout: React.FC<Props> = ({
  nextClick,
  nextBgColor = 'bg-[#7340BF]',
  prevClick,
}) => {
  return (
    <div className="flex flex-row h-14 mt-10 ml-8 mr-8 mb-10">
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
        className={`
          flex
          w-1/2
          ml-1
          items-center
          justify-center
          ${nextBgColor}
          text-white
          font-semibold
          rounded-xl
        `}
        onClick={nextClick}
      >
        {t('text_next')}
      </div>
    </div>
  )
}

export default RegiBottomLayout
