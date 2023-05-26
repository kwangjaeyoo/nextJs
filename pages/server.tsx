import Axios from 'axios'
import { GetServerSideProps } from 'next'

import { itemObjectProps } from './itemList'
import ItemView from './itemView'

type dataProps = {
  data: itemObjectProps[]
}

export default function Server({ data }: dataProps) {
  return (
    <div style={{ paddingLeft: '30px', paddingRight: '30px' }}>
      {data && <ItemView itemList={data} />}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<dataProps> = async () => {
  let data = []
  try {
    const API_URL =
      'http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline'

    const res = await Axios.get(API_URL, { timeout: 10000 })
    data = res.data
  } catch (e: any) {}

  return {
    props: {
      data: data,
    },
  }
}
