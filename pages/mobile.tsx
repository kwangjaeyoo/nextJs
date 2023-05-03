import { isMobile } from 'react-device-detect'

export default function Mobile() {
  return (
    <div style={{ paddingLeft: '30px', paddingRight: '30px' }}>
      {isMobile ? <p>isMobile </p> : <p>Not is Mobile</p>}
    </div>
  )
}
