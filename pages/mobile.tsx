import { isMobile } from 'react-device-detect'
import { Button } from 'semantic-ui-react'

import useLoadingModal from './hook/useLoadingModal'

export default function Mobile() {
  const loadingModal = useLoadingModal()

  return (
    <div style={{ paddingLeft: '30px', paddingRight: '30px' }}>
      {isMobile ? <p>isMobile </p> : <p>Not is Mobile</p>}

      <div>Loading count {loadingModal.isOpen}</div>

      <div>
        <Button onClick={loadingModal.onOpen}>Plus Loading cnt</Button>
        <Button onClick={loadingModal.onClose}>Minus Loading cnt</Button>
      </div>
    </div>
  )
}
