import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Header, Image, Menu, MenuItemProps } from 'semantic-ui-react'
import { useTranslation } from 'next-i18next'

const Navbar = () => {
  const { t } = useTranslation()

  // console.log('Navbar ?? ' + i18n.language)

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

  return (
    <div style={{ padding: '30px' }}>
      <div>
        <Header as="h2">
          <Image circular src="/patrick.png" alt="profile" />
          Qxpress smartship !!!
        </Header>
      </div>
      <Menu>
        <Menu.Item
          name="home"
          active={activeItem === 'home'}
          onClick={itemClick}
        >
          {t('home')}
        </Menu.Item>

        <Menu.Item
          name="item"
          active={activeItem === 'item'}
          onClick={itemClick}
        >
          {t('itemList')}
        </Menu.Item>

        <Menu.Item
          name="server"
          active={activeItem === 'server'}
          onClick={itemClick}
        >
          {t('serverSide')}
        </Menu.Item>

        <Menu.Item
          name="language"
          active={activeItem === 'language'}
          onClick={itemClick}
        >
          {t('language')}
        </Menu.Item>

        <Menu.Item
          name="mobile"
          active={activeItem === 'mobile'}
          onClick={itemClick}
        >
          {t('mobile')}
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default Navbar
