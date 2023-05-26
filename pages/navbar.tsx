import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { MenuItemProps } from 'semantic-ui-react'

const Navbar = () => {
  const { t } = useTranslation()

  const router = useRouter()
  const [activeItem, setActiveItem] = useState('Home')

  function itemClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    data: MenuItemProps,
  ) {
    console.log('itemClick ' + data.name)
    if (data.name != undefined) {
      setActiveItem(data.name)

      if (data.name === 'home') {
        router.push('/')
      } else if (data.name === 'item') {
        router.push('/itemList')
      } else if (data.name === 'server') {
        router.push('/server')
      } else if (data.name === 'static') {
        router.push('/static')
      } else if (data.name === 'language') {
        router.push('/language')
      } else if (data.name === 'mobile') {
        router.push('/mobile')
      }
    }
  }

  useEffect(() => {
    if (router.pathname === '/') {
      setActiveItem('home')
    } else if (router.pathname === '/itemList') {
      setActiveItem('item')
    } else if (router.pathname === '/server') {
      setActiveItem('server')
    }
  }, [])

  let mode = process.env.NODE_ENV

  return (
    <>
      <div
        className=" 
            flex
            flex-row
          "
      >
        Qxpress !!
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </div>
      <div className="flex flex-row font-semibold font">zzzzzzz</div>
    </>
  )
}

export default Navbar
