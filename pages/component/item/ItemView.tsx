import Image from 'next/image'

interface ItemViewProps {
  item: any
  click: boolean
  onClick: () => void
}

const ItemView: React.FC<ItemViewProps> = ({ item, click, onClick }) => {
  let imageURL = '/item_no_image.png'
  if (item.item_image_url != null && item.item_image_url.length > 0) {
    if (
      item.item_image_url.startsWith('http:') ||
      item.item_image_url.startsWith('https:')
    ) {
      imageURL = item.item_image_url
    }
  }

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
          src={imageURL}
          width={120}
          height={120}
          alt="itemImg"
          onError={(err) => {
            // console.log(err)
          }}
        />
        <div className="flex flex-col ml-3">
          <div>{item.ITEM_CD}</div>
          <div>{item.ITEM_NM}</div>

          <div className="mt-2 flex flew-row h-7 p-1">
            <Image src={'/ic_price.png'} alt="price" height={18} width={18} />
            <div className="ml-1">
              {item.item_price} {item.currency ? <>({item.currency})</> : ''}
            </div>
          </div>
          {/** TODO 이미지싸이즈가 쪼금 이상한듯 조절이 안됨 */}
          <div className="flex flew-row h-7 p-1">
            <Image src={'/ic_barcode.png'} alt="price" height={18} width={18} />
            <div className="ml-1">{item.barcode ? <>Y</> : <>N</>}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemView
