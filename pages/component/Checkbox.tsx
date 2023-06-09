interface CheckboxProps {
  children?: React.ReactElement
  disabled?: boolean
  checked: boolean
  onChange?: (arg: boolean) => void
}

const Checkbox: React.FC<CheckboxProps> = ({
  children,
  disabled,
  checked,
  onChange,
}) => {
  return (
    <label>
      <input
        type="checkbox"
        disabled={disabled}
        checked={checked}
        onChange={({ target: { checked } }) => {
          if (onChange) {
            onChange(checked)
          }
        }}
      />
      {children}
    </label>
  )
}

export default Checkbox
