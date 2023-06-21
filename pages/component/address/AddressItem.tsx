import { getAddrType } from '@/util/Util'

interface AddressItemProps {
  item: any
  onClick: (value: any) => void
}

const AddressItem: React.FC<AddressItemProps> = ({ item, onClick }) => {
  return (
    <div
      className="
        flex 
        flex-col
        rounded 
        bg-white 
        mt-2
        mb-2
        p-4
        active:bg-[#dbdbdb]
      "
      onClick={() => onClick(item)}
    >
      <div className="flex flex-rol">
        <div
          className="
            rounded-full 
            pl-4
            pr-4
            bg-[#939393]
            text-white
          "
        >
          {getAddrType(item)}
        </div>
      </div>
      <div className="mt-2">{item.addr_front + ' ' + item.addr_last}</div>
      <div className="mt-2">{item.addr_nm + ' / ' + item.hp_no}</div>
    </div>
  )
}

export default AddressItem
