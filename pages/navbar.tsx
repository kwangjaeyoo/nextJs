import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Navbar = () => {
  const { t } = useTranslation()

  const router = useRouter()
  const [activeItem, setActiveItem] = useState('')
  const [isMenuVisible, setMenuVisible] = useState(false)
  const [showMenu, setShowMenu] = useState(true)

  const itemClick = (data: string) => {
    console.log('itemClick ' + data)
    if (data != undefined) {
      setActiveItem(data)

      if (data === 'home') {
        router.push('/')
      } else if (data === 'serverSide') {
        router.push('/server')
      } else if (data === 'static') {
        router.push('/static')
      } else if (data === 'language') {
        router.push('/language')
      } else if (data === 'regi') {
        setShowMenu(false)
        router.push('/deliveryRegister')
      } else if (data === 'table') {
        router.push('/component/table')
      }
    }
  }

  let mode = process.env.NODE_ENV

  return (
    <>
      {showMenu && (
        <>
          <div className="flex flex-row h-40 w-full bg-gray-500">
            <div className="flex bg-blue-500 justify-center items-center w-1/6">
              Qxpress !!
            </div>
            <div className="w-5/6">
              <div className="bg-red-200 h-16">{mode} mode</div>
              <div
                className="flex flex-row h-24"
                onMouseEnter={() => setMenuVisible(true)}
                onMouseLeave={() => setMenuVisible(false)}
              >
                <div
                  className={`
                    flex 
                    ${activeItem === 'home' ? 'bg-pink-100' : 'bg-blue-100'} 
                    items-center 
                    justify-center
                    `}
                  style={{ minWidth: '150px', maxWidth: '300px' }}
                  onClick={() => itemClick('home')}
                >
                  {t('home')}
                </div>
                <div
                  className={`
                    flex 
                    ${activeItem === 'mobile' ? 'bg-pink-100' : 'bg-blue-100'} 
                    items-center 
                    justify-center
                    `}
                  style={{ minWidth: '150px', maxWidth: '300px' }}
                  onClick={() => itemClick('regi')}
                >
                  {t('regi')}
                </div>
                <div
                  className={`
                    flex 
                    ${
                      activeItem === 'serverSide'
                        ? 'bg-pink-100'
                        : 'bg-blue-100'
                    } 
                    items-center 
                    justify-center
                    `}
                  style={{ minWidth: '150px', maxWidth: '300px' }}
                  onClick={() => itemClick('serverSide')}
                >
                  {t('serverSide')}
                </div>
                <div
                  className={`
                    flex 
                    ${activeItem === 'static' ? 'bg-pink-100' : 'bg-blue-100'} 
                    items-center 
                    justify-center
                    `}
                  style={{ minWidth: '150px', maxWidth: '300px' }}
                  onClick={() => itemClick('static')}
                >
                  {t('static')}
                </div>
                <div
                  className={`
                    flex 
                    ${
                      activeItem === 'language' ? 'bg-pink-100' : 'bg-blue-100'
                    } 
                    items-center 
                    justify-center
                    `}
                  style={{ minWidth: '150px', maxWidth: '300px' }}
                  onClick={() => itemClick('language')}
                >
                  {t('language')}
                </div>

                <div
                  className={`
                    flex 
                    ${activeItem === 'table' ? 'bg-pink-100' : 'bg-blue-100'} 
                    items-center 
                    justify-center
                    `}
                  style={{ minWidth: '150px', maxWidth: '300px' }}
                  onClick={() => itemClick('table')}
                >
                  {t('table')}
                </div>
              </div>
            </div>
          </div>
          {isMenuVisible && (
            <div
              className="absolute left-0 bg-gray-200 p-2 w-full z-10"
              onMouseEnter={() => setMenuVisible(true)}
              onMouseLeave={() => setMenuVisible(false)}
            >
              <ul>
                <li>Menu Item 1</li>
                <li>Menu Item 2</li>
                <li>Menu Item 3</li>
              </ul>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default Navbar
