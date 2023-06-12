interface InputBoxProp {
  placeholder: string
  disable?: boolean
  onChange?: (value: string) => void
}

const InputBox: React.FC<InputBoxProp> = ({
  placeholder,
  disable,
  onChange,
}) => {
  return (
    <input
      className="
        flex
        border
        w-full
        border-[#dbdbdb]
        h-12
        rounded 
        items-center 
        pl-3
        pr-3
        focus:outline-none
        focus:ring-[#7340BF]
        focus:border-[#7340BF]
        disabled:text-[#939393]
        disabled:bg-white
        text-[#0D1E20]
        "
      placeholder={placeholder}
      disabled={disable}
      onChange={(value) => {
        if (onChange) onChange(value.target.value)
      }}
    />
  )
}

export default InputBox
