import { useState } from 'react'

import RegiPosTopLayout from './RegiPosTopLayout'
import RegistStep1 from './RegistStep1'
import RegistStep2 from './RegistStep2'
import RegistStep3 from './RegistStep3'

const RegistDelivery = () => {
  const [position, setPosition] = useState(1)

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
