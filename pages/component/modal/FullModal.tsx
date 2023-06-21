'use client'

import { useEffect, useState } from 'react'

interface FullModalPops {
  isOpen: boolean
  title: string
  body: React.ReactElement
}

const FullModal: React.FC<FullModalPops> = ({ isOpen, title, body }) => {
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
          z-50 
          outline-none 
          focus:outline-none
          bg-neutral-800/70
          p-10
      "
      >
        <div
          className=" 
            relative 
            w-full
            h-full
            border
            rounded
            bg-white
            flex
            flex-col
            "
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
            `}
          >
            <div className="text-lg font-semibold"> {title} </div>
          </div>

          <div className="flex flex-col overflow-auto">{body}</div>
        </div>
      </div>
    </>
  )
}

export default FullModal
