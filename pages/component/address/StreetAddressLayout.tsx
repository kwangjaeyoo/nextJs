import Select from 'react-select'

import { colourStyles } from '@/util/SelectStyle'

import { addressData } from './SearchAddressModal'
import { useState } from 'react'

interface StreetAddressLayoutProps {
  countryCode: string
  selectAddress: (item: addressData) => void
}

const StreetAddressLayout: React.FC<StreetAddressLayoutProps> = ({
  countryCode,
  selectAddress,
}) => {
  const [stateList, setStateList] = useState<any[]>([])

  return (
    <div className="flex flex-col bg-slate-200 overflow-hidden">
      <div className="p-4 ">
        <Select
          styles={colourStyles}
          components={{ IndicatorSeparator: () => null }}
          options={stateList}
          onChange={() => console.log('TODO')}
        />
        <div className="mt-3" />
        <Select
          styles={colourStyles}
          components={{ IndicatorSeparator: () => null }}
          options={stateList}
          onChange={() => console.log('TODO')}
        />
        <div className="mt-3" />
        <Select
          styles={colourStyles}
          components={{ IndicatorSeparator: () => null }}
          options={stateList}
          onChange={() => console.log('TODO')}
        />
      </div>
      <div className="h-0.5 bg-[#5D32B0]" />
      <div className="bg-pink-200 flex h-full overflow-auto"></div>
    </div>
  )
}

export default StreetAddressLayout
