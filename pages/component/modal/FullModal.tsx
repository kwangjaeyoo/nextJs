'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

interface FullModalPops {
  isOpen: boolean
  title: string
  titleBgColor?: string
  titleTextColor?: string
  showLeftBtn?: boolean
  onLeftPress?: () => void
  showRightBtn?: boolean
  onRightPress?: () => void
  rightBtnImage?: string
  body: React.ReactElement
}

const FullModal: React.FC<FullModalPops> = ({
  isOpen,
  title,
  titleBgColor = 'bg-[#ffffff]',
  titleTextColor = 'text-black',
  showLeftBtn = false,
  onLeftPress,
  showRightBtn = false,
  onRightPress,
  rightBtnImage = '/headic_close.png',
  body,
}) => {
  const [showModal, setShowModal] = useState(isOpen)

  useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen])

  if (!isOpen) {
    return <></>
  }

  return (
    <>
      <div
        className="
          justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-20 
          outline-none 
          focus:outline-none
          bg-neutral-800/70
          p-10
      "
      >
        <div
          className={`  
            relative 
            w-full
            h-full
            border
            rounded
            bg-white
            flex
            flex-col
          `}
        >
          {/* header */}
          <div
            className={`
              flex 
              items-center 
              p-4
              rounded
              justify-center
              relative
              border-b-[1px]
              ${titleBgColor}
            `}
          >
            {showLeftBtn && (
              <div
                className="
                  absolute
                  inset-y-0 
                  left-0
                  w-16 
                  z-20
                  flex 
                  items-center 
                  justify-center
                 "
                onClick={() => {
                  if (onLeftPress) onLeftPress()
                }}
              >
                <Image
                  src={
                    titleBgColor == 'bg-[#ffffff]'
                      ? '/headic_pre.png'
                      : '/prew-wh.png'
                  }
                  width={25}
                  height={25}
                  alt="back"
                />
              </div>
            )}

            <div
              className={`
                text-lg 
                font-semibold t
                ${titleTextColor}`}
            >
              {title}
            </div>

            {showRightBtn && (
              <div
                className="
                  absolute
                  inset-y-0 
                  right-0 
                  w-16
                  z-30
                  flex
                  items-center 
                  justify-center
                "
                onClick={() => {
                  if (onRightPress) onRightPress()
                }}
              >
                <Image src={rightBtnImage} width={25} height={25} alt="close" />
              </div>
            )}
          </div>

          <div className="flex flex-col overflow-auto">{body}</div>
        </div>
      </div>
    </>
  )
}

export default FullModal
