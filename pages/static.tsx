import Axios from 'axios'
import { GetStaticProps, GetStaticPropsContext } from 'next'

import { itemObjectProps } from './itemList'
import ItemView from './itemView'

type dataProps = {
  data: itemObjectProps[]
}

const Static = ({ data }: dataProps) => {
  return (
    <div style={{ paddingLeft: '30px', paddingRight: '30px' }}>
      {data && <ItemView itemList={data} />}
    </div>
  )
}

export default Static

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext,
) => {
  let data = null
  try {
    const API_URL =
      'http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline'

    const res = await Axios.get(API_URL)
    data = res.data
  } catch (e: any) {
    console.log(e)
  }

  return {
    props: {
      data: data,
    },
  }
}
