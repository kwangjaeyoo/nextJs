interface TopLayoutProps {
  title: string
  titleColor?: string
  backColor?: string
  showLeftBtn?: boolean
  onLeftPress?: () => void
  showRightBtn?: boolean
  onRightPress?: () => void
}

const TopLayout: React.FC<TopLayoutProps> = ({
  title,
  titleColor = 'text-[#000000]',
  backColor = 'bg-[#ffffff]',
  showLeftBtn = false,
  onLeftPress,
  showRightBtn = false,
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
            LeftBtn
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
            right
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
