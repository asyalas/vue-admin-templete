import axios from 'axios'
import { Message } from 'iView'
import {converParamsToFormData, normalizeParams} from './converParams'
import {envHost} from './env'
/**
 * 国际化
 * 为什么不用i18n实例，是因为引用后会导致国际化失效
 * 待研究
 * **/
import vm from '../main'
// create an axios instance
const baseURL = envHost('webapi.sunmi.com')
const service = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  baseURL, // api的base_url
  timeout: 10000, // request timeout
  // 对json数据进行处理，以form-data的形式提交
  transformRequest: [function (data, headers) {
    return converParamsToFormData(normalizeParams(data))
  }],
  method: 'post'
})
// request config > instance.defaults > 系统默认，优先级高的覆盖优先级低的。

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  //   if (store.getters.token) {
  //     // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  //     config.headers['X-Token'] = getToken()
  //   }
  config.data = {
    // adminId: 'a576e872c2125874178c251f7d0ed540',
    adminId: '88',
    // adminId: '1',
    ...config.data
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  return Promise.reject(error)
})
// 服务请求error handle
const showErrorMsg = (error) => {
  console.log('err') // for debug
  Message.error({
    content: vm.$t('common.errCode1'),
    duration: 2 * 1000
  })
  return Promise.reject(error)
}
// respone interceptor
service.interceptors.response.use(
  response => {
    try {
      if (response.data.code !== 1) {
        throw new Error(JSON.stringify(response.data))
      }
      return response.data
    } catch (error) {
      return showErrorMsg(response.data)
    }
  },
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  // response => {
  //   const res = response.data
  //   if (res.code !== 20000) {
  //     Message({
  //       message: res.message,
  //       type: 'error',
  //       duration: 5 * 1000
  //     })
  //     // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //       // 请自行在引入 MessageBox
  //       // import { Message, MessageBox } from 'element-ui'
  //       MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //         confirmButtonText: '重新登录',
  //         cancelButtonText: '取消',
  //         type: 'warning'
  //       }).then(() => {
  //         store.dispatch('FedLogOut').then(() => {
  //           location.reload() // 为了重新实例化vue-router对象 避免bug
  //         })
  //       })
  //     }
  //     return Promise.reject('error')
  //   } else {
  //     return response.data
  //   }
  // },
  error => showErrorMsg(error))

export default service
