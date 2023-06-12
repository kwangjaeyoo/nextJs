import { t } from 'i18next'
import { useEffect, useState } from 'react'

interface RegiPosTopLayoutProp {
  pos: number
}

const registPosition = [
  t('delivery_section'),
  t('text_sender'),
  t('text_recipient'),
  t('item_information'),
  t('pickup_information'),
]

const RegiPosTopLayout: React.FC<RegiPosTopLayoutProp> = ({ pos }) => {
  const [position, setPosition] = useState(0)

  useEffect(() => {
    setPosition(pos)
  }, [pos])

  return (
    <div className="flex m-8 w-full">
      {registPosition.map((item, index) => (
        <div className="flex flex-col items-center w-full" key={index}>
          <div
            className={`
              mt-5
              w-12
              h-12 
              rounded-full
              ${position == index + 1 ? 'bg-[#7340BF]' : 'bg-[#D5C6EC]'}
              flex 
              items-center
              justify-center 
              mr-2
              text-white 
              font-semi-bold
              text-lg
            `}
          >
            {position > index + 1 ? <>TD</> : <>{index + 1}</>}
          </div>

          <div className="mt-4 mb-4 font-bold text-[#7340BF] text-center">
            {item}
          </div>
        </div>
      ))}
    </div>
  )
}

export default RegiPosTopLayout
