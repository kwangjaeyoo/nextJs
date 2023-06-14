import Image from 'next/image'
import { useState } from 'react'

interface ItemViewProps {
  item: any
  click: boolean
  onClick: () => void
}

const ItemView: React.FC<ItemViewProps> = ({ item, click, onClick }) => {
  return (
    <div className="bg-[#f4f4f4] pl-3 pr-3 pt-2">
      <div
        onClick={onClick}
        className={`
          flex 
          flex-row 
          bg-white 
          w-full 
          rounded-xl 
          p-4
          ${click && 'border border-[#5D32B0]'}
        `}
      >
        <Image
          src={'/item_no_image.png'}
          width={120}
          height={120}
          alt="itemImg"
        />
        <div className="flex flex-col ml-3">
          <div>TODO</div>
          <div>TODO</div>
        </div>
      </div>
    </div>
  )
}

export default ItemView
