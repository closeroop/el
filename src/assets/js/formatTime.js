function getTime (time) {
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  let day = time.getDate()
  let hour = time.getHours()
  let min = time.getMinutes()
  let sen = time.getSeconds()
  let standard = year + '-' + getzero(month) + '-' + getzero(day) + ' ' + getzero(hour) + ':' + getzero(min) + ':' + getzero(sen)
  return standard
}
function getzero (num) {
  if (num < 10) {
    num = '0' + num
  }
  return num
}
export { getTime }
