import { t } from 'i18next'

export function convertDateformat(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 월은 0부터 시작하므로 1을 더하고, 2자리로 만듭니다.
  const day = String(date.getDate()).padStart(2, '0') // 일을 2자리로 만듭니다.

  return year + '-' + month + '-' + day
}

export function getAddrType(item: any) {
  var type = ''

  switch (item.addr_type) {
    case 0:
      type = t('representing_address')
      break

    case 3:
      type = t('pickup_address')
      break

    case 5:
      type = t('return_address')
      break

    case 7:
      type = t('shipping_address')
      break

    default:
      type = t('all')
      break
  }

  return type
}
