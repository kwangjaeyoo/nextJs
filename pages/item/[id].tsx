import { useRouter } from 'next/router'

export default function ItemDetailView() {
  const router = useRouter()
  const { id } = router.query

  //   const API_URL = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`;

  return (
    <>
      <p>다이나믹 링크로 받은 데이터 ..</p>
      <p>{id}</p>
    </>
  )
}
