'use client'

interface ButtonProps {
  label: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  disable?: boolean
  outline?: boolean
  small?: boolean
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disable,
  outline,
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
        ${outline ? 'bg-white' : 'bg-[#7340BF]'}
        ${outline ? 'border-black' : 'bg-[#7340BF]'}
        ${outline ? 'text-black' : 'text-white'}
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
