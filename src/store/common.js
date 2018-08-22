
import getQuery from 'utils/getQuery'
import Cookie from 'utils/cookie'
// 对cookie key值的加密根据公司自己定制
const token = Cookie.getItem('token')
export default{
  namespace: 'common',
  state: {
    clientId: getQuery('clientId'),
    token
  }
}
