import Image from 'next/image'

interface TopLayoutProps {
  title: string
  titleColor?: string
  backColor?: string
  showLeftBtn?: boolean
  onLeftPress?: () => void
  showRightBtn?: boolean
  rightBtnImage?: string
  onRightPress?: () => void
}

const TopLayout: React.FC<TopLayoutProps> = ({
  title,
  titleColor = 'text-[#000000]',
  backColor = 'bg-[#ffffff]',
  showLeftBtn = false,
  onLeftPress,
  showRightBtn = false,
  rightBtnImage = '/headic_close.png',
  onRightPress,
}) => {
  return (
    <div className="flex flex-col">
      <div
        className={`
          relative 
          h-14 
          flex 
          w-full
          ${backColor}
        `}
      >
        {showLeftBtn && (
          <div
            className="
              absolute
              inset-y-0 
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
                backColor == 'bg-[#ffffff]' ? '/headic_pre.png' : '/prew-wh.png'
              }
              width={25}
              height={25}
              alt="back"
            />
          </div>
        )}

        <div
          className={`  
            flex
            items-center 
            justify-center   
            z-10
            w-full
            font-semibold
            text-[16px]
            ${titleColor}
          `}
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
      <div>
        <div className="flex w-full h-0.5 bg-[#dbdbdb] justify-end" />
      </div>
    </div>
  )
}

export default TopLayout
