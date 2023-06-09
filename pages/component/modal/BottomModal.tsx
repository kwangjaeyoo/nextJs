'use client'

import { useEffect, useState } from 'react'
import { TfiClose } from 'react-icons/tfi'

interface ModalPops {
  isOpen?: boolean
  contents: string
  onClosed: () => void
}

const BottomModal: React.FC<ModalPops> = ({ isOpen, contents, onClosed }) => {
  const [showModal, setShowModal] = useState(isOpen)

  useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  return (
    <>
      <div
        className="
          flex 
          items-end 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-50 
          outline-none 
          focus:outline-none
          bg-neutral-800/70
        "
      >
        <div
          className="
            relative 
            w-full
            h-2/3
          "
        >
          <div
            className={`
              translate
              duration-300
              h-full
              ${showModal ? 'translate-y-0' : 'translate-y-full'}
              ${showModal ? 'opacity-100' : 'opacity-0'}
          `}
          >
            <div
              className="
                translate
                h-full
                border-0 
                rounded-lg 
                shadow-lg 
                relative 
                flex 
                flex-col
                w-full 
                bg-white 
                outline-none 
                focus:outline-none
              "
            >
              <div className="flex  justify-end">
                <div className="p-6" onClick={onClosed}>
                  <TfiClose />
                </div>
              </div>
              <div
                className="
                  flex 
                  p-6
                  relative
                  overflow-y-auto
                "
              >
                {contents}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BottomModal
