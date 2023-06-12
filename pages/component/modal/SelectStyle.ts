import { StylesConfig } from 'react-select'

export const colourStyles: StylesConfig<any> = {
  control: (styles, state) => ({
    ...styles,
    borderColor: state.isFocused ? '#7340BF !important' : '#dbdbdb',
    boxShadow: state.isFocused ? 'none' : styles.boxShadow,
    outline: state.isFocused ? 'none' : styles.outline,
    height: 42,
  }),
}
