'use client'

interface ButtonProps {
  label: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  bgColor?: string
  disable?: boolean
  small?: boolean
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  bgColor = 'bg-[#7340BF]',
  disable,
  small,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disable}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        ${bgColor}
        text-white
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
      `}
    >
      {label}
    </button>
  )
}

export default Button
