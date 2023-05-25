import Axios from 'axios'
import { useEffect, useState } from 'react'
import ItemView from './itemView'
import useLoadingModal from './hook/useLoadingModal'

export interface itemObjectProps {
  id: number
  image_link: string
  name: string
  price: string
  description: string
}

export default function ItemList() {
  const loadingModal = useLoadingModal()
  const [list, setList] = useState<itemObjectProps[]>([])

  const API_URL =
    'http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline'

  const callApi = async () => {
    try {
      loadingModal.onOpen()
      const result = await Axios.get(API_URL)
      setList(result.data)
    } catch (e: any) {
      alert(e)
      console.log(e)
    } finally {
      loadingModal.onClose()
    }
  }

  useEffect(() => {
    callApi()
  }, [])

  return (
    <div style={{ paddingLeft: '30px', paddingRight: '30px' }}>
      <ItemView itemList={list} />
    </div>
  )
}
