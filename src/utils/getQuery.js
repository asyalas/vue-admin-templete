/**
 * 获取location中的指定参数
 */
export default function getQuery (name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')

  let r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}
