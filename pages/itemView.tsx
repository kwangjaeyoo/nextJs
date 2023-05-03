import Link from 'next/link'
import { Item } from 'semantic-ui-react'
import { itemObjectProps } from './itemList'

interface itemProps {
  itemList: itemObjectProps[]
}

export default function ItemView({ itemList }: itemProps) {
  console.log('ItemView ' + typeof itemList)

  return (
    <>
      {itemList.length > 0 && (
        <>
          {itemList.map((item) => (
            <div key={item.id}>
              <Link href={`/item/${item.id}`} legacyBehavior>
                <Item.Group>
                  <Item style={{ padding: '5px' }}>
                    <Item.Image size="tiny" src={item.image_link} />
                    <Item.Content>
                      <Item.Header as="a">{item.name}</Item.Header>
                      <Item.Meta>{item.description}</Item.Meta>
                      <Item.Extra>{item.price}</Item.Extra>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Link>
            </div>
          ))}
        </>
      )}
    </>
  )
}
