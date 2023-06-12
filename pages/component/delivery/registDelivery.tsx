import { useState } from 'react'

import RegiPosTopLayout from './RegiPosTopLayout'
import RegistStep1 from './RegistStep1'
import RegistStep2 from './RegistStep2'
import RegistStep3 from './RegistStep3'
import RegistStep4 from './RegistStep4'
import RegistStep5 from './RegistStep5'
import RegistStep6 from './RegistStep6'

const RegistDelivery = () => {
  const [position, setPosition] = useState(4)

  return (
    <div className="h-screen bg-[#f4f4f4]">
      <div className="flex flex-row ">
        <RegiPosTopLayout pos={position} />
      </div>
      {position == 1 && <RegistStep1 />}
      {position == 2 && <RegistStep2 />}
      {position == 3 && <RegistStep3 />}
      {position == 4 && <RegistStep4 />}
      {position == 5 && <RegistStep5 />}
      {position == 6 && <RegistStep6 />}
    </div>
  )
}

export default RegistDelivery
