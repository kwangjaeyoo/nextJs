export function convertDateformat(year: number, month: number, day: number) {
  var displayMonth = month >= 10 ? month : '0' + month
  var displayDay = day >= 10 ? day : '0' + day
  return year + '-' + displayMonth + '-' + displayDay
}
