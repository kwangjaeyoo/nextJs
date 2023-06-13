import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import AddressBookScreen from './component/address/AddressBookScreen'
import SearchAddressScreen from './component/address/SearchAddressScreen'

export enum ADDRESS_TYPE {
  ADDRESS_BOOK,
  SEARCH_ADDRESS,
}

const Address = () => {
  const router = useRouter()
  const [type, setType] = useState('1')

  useEffect(() => {
    const { type } = router.query
    if (type) {
      setType(type.toString())
    }
    router.replace('/address', undefined, { shallow: true })
  }, [])

  return (
    <>
      {type == ADDRESS_TYPE.ADDRESS_BOOK.toString() && <AddressBookScreen />}
      {type == ADDRESS_TYPE.SEARCH_ADDRESS.toString() && (
        <SearchAddressScreen />
      )}
    </>
  )
}

export default Address
