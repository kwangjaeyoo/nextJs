'use client'

import { useCallback, useEffect, useRef } from 'react'

import useCustomModal from '@/pages/hook/useCustomModal'

import Button from '../Button'
import { t } from 'i18next'

const CustomModal = () => {
  const didMount = useRef(false)

  const modalData = useCustomModal()

  useEffect(() => {
    if (didMount.current) {
      // console.log('CustomModal ' + JSON.stringify(modalData))
    } else {
      didMount.current = true
    }
  }, [modalData])

  const handleSubmit = useCallback(() => {
    if (modalData.obj.btnObject.btnClick) {
      modalData.obj.btnObject.btnClick()
    }
    modalData.onClose()
  }, [modalData])

  if (!modalData.obj.open) {
    return <></>
  }

  return (
    <div
      className="
        justify-center 
        items-center 
        flex 
        overflow-x-hidden 
        overflow-y-auto 
        fixed 
        inset-0 
        z-50 
        outline-none 
        focus:outline-none
        bg-neutral-800/70
        "
      onClick={() => handleSubmit()}
    >
      <div
        className="
          relative 
          w-4/6
          my-6
          mx-auto 
        "
        onClick={(event) => {
          event.stopPropagation()
        }}
      >
        {/* content */}
        <div
          className={`
            translate 
            duration-300
            h-full
            translate-y-0
            opacity-100
          `}
        >
          <div
            className="
              translate
              h-full
              lg:h-auto
              md:h-auto
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
            {/* header */}
            <div
              className={`
                flex 
                items-center 
                p-6
                rounded
                justify-center
                relative
              `}
            >
              <div className="text-lg font-semibold">{modalData.obj.msg}</div>
            </div>

            <div className="flex flex-col gap-2 p-6">
              <div
                className="
                  flex 
                  flex-row 
                  items-center 
                  gap-4  
                  w-full
                "
              >
                <Button
                  label={modalData.obj.btnObject.btnText}
                  bgColor={modalData.obj.btnObject.btnBgColor}
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomModal
