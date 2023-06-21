import axios from 'axios'
import { t } from 'i18next'
import { useEffect, useRef, useState } from 'react'
import AddressItem from './AddressItem'

interface AddressBookLayoutProps {
  itemClick: (value: any) => void
}

const AddressBookLayout: React.FC<AddressBookLayoutProps> = ({ itemClick }) => {
  const didMount = useRef(false)

  const [addressList, setAddresList] = useState<any[]>([])
  const [itemList, setItemList] = useState<any[]>([])

  const sortType = [
    t('all'),
    t('pickup_address'),
    t('return_address'),
    t('representing_address'),
    t('shipping_address'),
  ]
  const [select, setSelect] = useState([true, false, false, false, false])

  const getAllAddress = async () => {
    try {
      const result = await axios.post('/api/callMemberAPI', {
        apiName: 'getAddressBook',
        param: {
          addr_type: -1, // all:-1,
        },
      })
      if (result) {
        if (result.data.returnCode === 0) {
          setAddresList(JSON.parse(result.data.returnData))
        }
      }
    } catch (e) {}
  }

  useEffect(() => {
    if (didMount.current) {
      console.log('AddressBookScreen start')
      getAllAddress()
    } else {
      didMount.current = true
    }
  }, [])

  const clickType = (index: number) => {
    if (index === 0) {
      if (select[0] == false) {
        setSelect([true, false, false, false, false])
      }
    } else {
      setSelect((prevSelect) => {
        let copySelect = [...prevSelect]
        copySelect[0] = false
        copySelect[index] = !copySelect[index]

        if (copySelect[1] && copySelect[2] && copySelect[3] && copySelect[4]) {
          copySelect = [true, false, false, false, false]
        }

        return copySelect
      })
    }
  }

  useEffect(() => {
    if (addressList.length > 0) {
      let list: any[] = []
      if (select[0] === true) {
        list = addressList
      } else {
        if (select[1] === true) {
          const pickUpData = addressList.filter(
            (subData) => subData.addr_type === 3,
          )
          if (pickUpData.length > 0) {
            list = list.concat(pickUpData)
          }
        }

        if (select[2] === true) {
          const returnData = addressList.filter(
            (subData) => subData.addr_type === 5,
          )
          if (returnData.length > 0) {
            list = list.concat(returnData)
          }
        }

        if (select[3] === true) {
          const representData = addressList.filter(
            (subData) => subData.addr_type === 0,
          )
          if (representData.length > 0) {
            list = list.concat(representData)
          }
        }

        if (select[4] === true) {
          const shippingData = addressList.filter(
            (subData) => subData.addr_type === 7,
          )
          if (shippingData.length > 0) {
            list = list.concat(shippingData)
          }
        }
      }

      console.log('useEffect list.length = ' + list.length)
      setItemList(list)
    }
  }, [select, addressList])

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <div className="flex flex-col p-4 pb-0">
        <div className="flex">{t('address_promotion_msg')}</div>
        <div className="overflow-x-auto mt-3">
          <div className="flex flex-row pb-3">
            {sortType.map((item, index) => (
              <div
                className={`
                  pl-3
                  pr-3
                  pt-2
                  pb-2 
                  rounded-full 
                  text-[#0d1e20]
                  ${select[index] ? 'bg-[#EEE8F7]' : 'bg-[#ECECEC]'}
                  ${index > 0 && 'ml-3'}
                  flex-shrink-0
              `}
                key={index}
                onClick={() => clickType(index)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-1.5 bg-gradient-to-b from-[#dbdbdb]" />

      <div className="flex flex-col pl-4 pr-4 bg-[#f4f4f4]  overflow-auto ">
        {itemList.map((item, index) => (
          <AddressItem key={index} item={item} onClick={itemClick} />
        ))}
      </div>
    </div>
  )
}

export default AddressBookLayout
