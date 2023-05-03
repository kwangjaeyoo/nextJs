import Axios from 'axios'
import ItemView from './itemView'
import { itemObjectProps } from './itemList'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type dataProps = {
  data: itemObjectProps[]
}

export default function Server({ data }: dataProps) {
  const { i18n, t } = useTranslation('common')

  console.log('locale ')

  return (
    <div style={{ paddingLeft: '30px', paddingRight: '30px' }}>
      <ItemView itemList={data} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<dataProps> = async ({
  locale,
}) => {
  const API_URL =
    'http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline'

  const res = await Axios.get(API_URL)

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
      data: res.data,
    },
  }
}
