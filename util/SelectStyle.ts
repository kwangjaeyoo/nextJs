import { StylesConfig } from 'react-select'

export const colourStyles: StylesConfig<any> = {
  control: (styles, state) => ({
    ...styles,
    background: state.isDisabled ? '#dbdbdb' : '#ffffff',
    borderColor: state.isFocused ? '#7340BF !important' : '#dbdbdb',
    boxShadow: state.isFocused ? 'none' : styles.boxShadow,
    outline: state.isFocused ? 'none' : styles.outline,
    height: 42,
  }),
  option: (styles, { isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isFocused
        ? '#7340BF'
        : isSelected
        ? '#D5C6EC'
        : '#ffffff',

      color: isFocused ? '#0D1E20' : '#0D1E20',

      ':active': {
        ...styles[':active'],
        backgroundColor: '#7340BF',
      },
    }
  },
}
