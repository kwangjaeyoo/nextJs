import { t } from 'i18next'
import Image from 'next/image'
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
    <div className="flex mt-8 ml-8 mr-8 w-full">
      {registPosition.map((item, index) => (
        <div
          className={`
            flex 
            flex-col 
            items-center
            w-full
            relative
          `}
          key={index}
        >
          <div
            className={`
              mt-5
              w-12
              h-12 
              rounded-full
              ${
                position == index + 1
                  ? 'bg-[#7340BF]'
                  : position < index + 1
                  ? 'bg-[#dbdbdb]'
                  : 'bg-[#D5C6EC]'
              }
              flex 
              items-center
              justify-center 
              mr-2
              text-white 
              font-semi-bold
              text-lg
              z-20
            `}
          >
            {position > index + 1 ? (
              <Image
                src="/icon_check.png"
                width={24}
                height={24}
                alt="iconCheck"
              />
            ) : (
              <>{index + 1}</>
            )}
          </div>

          {index < registPosition.length - 1 && (
            <div
              className={`
              absolute
              bg-[#D5C6EC]
              h-0.5
              z-10
              w-full
              left-1/2
              top-11
            `}
            />
          )}

          <div className="mt-4 mb-4 font-bold text-[#7340BF] text-center">
            {item}
          </div>
        </div>
      ))}
    </div>
  )
}

export default RegiPosTopLayout
