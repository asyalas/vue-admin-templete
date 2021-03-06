import axios from 'axios'
import { Message } from 'iview'

import i18n from '../lang'
// 解决axios finally在低版本不可用的bug
// https://github.com/axios/axios/issues/34
require('promise.prototype.finally').shim()
// 对接口进行配置，一般用于定义环境，如uat,dev,test等
const envHost = (path) => path
const baseURL = envHost('https://www.dianping.com')
// create an axios instance
const service = axios.create({
  headers: {
    // 换form-data格式打开
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  // api的base_url
  baseURL,
  // request timeout
  timeout: 10000,
  // 对json数据进行处理，以form-data的形式提交
  transformRequest: [function (data, headers) {
    // 根据具体的项目对请求参数进行加密，转成form-data格式
    // return converParamsToFormData(normalizeParams(data))
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
    // 这里可以对所有请求加上默认的数据，比如用户token 或者 用户id
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
  Message.show({
    type: 'error',
    content: i18n.t('common.errCode1'),
    onClose: () => location.replace('/login')
  })
  console.log('err') // for debug
  return Promise.reject(error)
}
// respone interceptor
service.interceptors.response.use(
  response => {
    try {
      // 正确的code，其他的全部以错误抛出
      if (response.data.code !== 200) {
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
