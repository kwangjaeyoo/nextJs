import Axios from 'axios'
import type { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect, useState } from 'react'
import { Loader } from 'semantic-ui-react'
import ItemView from './itemView'

export interface itemObjectProps {
  id: number
  image_link: string
  name: string
  price: string
  description: string
}

export default function ItemList() {
  const [list, setList] = useState<itemObjectProps[]>([])
  const [loading, setLoading] = useState(true)

  const API_URL =
    'http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline'

  useEffect(() => {
    try {
      Axios.get(API_URL).then((res) => {
        setList(res.data)
        setLoading(false)
      })
    } catch (e: any) {
      console.log(e)
    }
  }, [])

  return (
    <div style={{ paddingLeft: '30px', paddingRight: '30px' }}>
      {loading ? (
        <div style={{ margin: '300px 300px' }}>
          <Loader active inline="centered">
            Loading
          </Loader>
        </div>
      ) : (
        <ItemView itemList={list} />
      )}
    </div>
  )
}
