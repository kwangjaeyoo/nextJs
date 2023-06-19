'use client'

import { useCallback, useEffect, useState } from 'react'
import Button from '../Button'

interface ModalPops {
  isOpen?: boolean
  onSubmit: () => void
  title?: string
  body?: React.ReactElement
  footer?: React.ReactElement
  showFooter?: boolean
  outsideClick?: () => void
  actionLabel: string
  disabled?: boolean
  secondaryActionLable?: string
  secondaryAction?: () => void
}

const Modal: React.FC<ModalPops> = ({
  isOpen,
  onSubmit,
  title,
  body,
  footer,
  showFooter = true,
  outsideClick,
  actionLabel,
  disabled,
  secondaryActionLable,
  secondaryAction,
}) => {
  const [showModal, setShowModal] = useState(isOpen)

  useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen])

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return
    }
    onSubmit()
  }, [onSubmit, disabled])

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return
    }
    secondaryAction()
  }, [secondaryAction, disabled])

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
          z-50 
          outline-none 
          focus:outline-none
          bg-neutral-800/70
          "
        onClick={() => {
          if (outsideClick) outsideClick()
        }}
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
              ${showModal ? 'translate-y-0' : 'translate-y-full'}
              ${showModal ? 'opacity-100' : 'opacity-0'}
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
                  ${body ? 'border-b-[1px]' : ''}  
                `}
              >
                <div className="text-lg font-semibold"> {title} </div>
              </div>

              {/*body*/}
              {body ? (
                <div className="relative p-6 flex-auto flex justify-center">
                  {body}
                </div>
              ) : (
                <></>
              )}

              {showFooter && (
                <>
                  {/*footer*/}
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
                      {secondaryActionLable && secondaryAction && (
                        <Button
                          outline
                          disable={disabled}
                          label={secondaryActionLable}
                          onClick={secondaryAction}
                        />
                      )}

                      <Button
                        disable={disabled}
                        label={actionLabel}
                        onClick={handleSubmit}
                      />
                    </div>
                    {footer}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
