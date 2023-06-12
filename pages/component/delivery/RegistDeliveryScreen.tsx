import { useRef, useState } from 'react'

import RegiPosTopLayout from './RegiPosTopLayout'
import RegistStep1 from './RegistStep1'
import RegistStep2 from './RegistStep2'
import RegistStep3 from './RegistStep3'
import RegistStep4 from './RegistStep4'
import RegistStep5 from './RegistStep5'
import RegistStep6 from './RegistStep6'

export interface InationModel {
  search_from: string
  search_fromCode: string
  search_to: string
  search_toCode: string
}

const RegistDeliveryScreen = () => {
  const [position, setPosition] = useState(2)

  const nationModel = useRef<InationModel>({
    search_from: '',
    search_fromCode: '',
    search_to: '',
    search_toCode: '',
  })

  const goSenderInputStep = (nation: InationModel) => {
    nationModel.current = nation
    setPosition(position + 1)
  }

  return (
    <div className="h-screen bg-[#f4f4f4] overflow-y-auto">
      <div className="flex flex-row">
        <RegiPosTopLayout pos={position} />
      </div>
      {position == 1 && (
        <RegistStep1
          nationModel={nationModel.current}
          nextClick={goSenderInputStep}
        />
      )}
      {position == 2 && <RegistStep2 nationModel={nationModel.current} />}
      {position == 3 && <RegistStep3 />}
      {position == 4 && <RegistStep4 />}
      {position == 5 && <RegistStep5 />}
      {position == 6 && <RegistStep6 />}
    </div>
  )
}

export default RegistDeliveryScreen
