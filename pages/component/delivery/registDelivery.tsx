import { useEffect, useState } from 'react'

import RegiPosTopLayout from './RegiPosTopLayout'
import RegistStep1 from './RegistStep1'
import RegistStep2 from './RegistStep2'
import RegistStep3 from './RegistStep3'
import Modal from '@/pages/component/modal/Modal'

const RegistDelivery = () => {
  const [position, setPosition] = useState(0)

  return (
    <div className="h-screen bg-[#f4f4f4]">
      <div className="flex flex-row ">
        <RegiPosTopLayout pos={position} />
      </div>
      {position == 0 && <RegistStep1 />}
      {position == 1 && <RegistStep2 />}
      {position == 2 && <RegistStep3 />}
    </div>
  )
}

export default RegistDelivery
