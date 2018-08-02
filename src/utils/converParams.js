import Des from './secure'
import md5 from 'md5'
// import store from '@/store'
// import { getToken } from '@/utils/auth'
import {isEncrypted, md5Key} from './env'
export function paramsEncode (params) {
  const paramsString = JSON.stringify(params)
  if (isEncrypted) {
    return Des.encrypt(paramsString)
  } else {
    return paramsString
  }
}
export function signEncode (form) {
  if (!md5Key) {
    throw new Error('请检查.env环境变量配置文件！no md5Key')
  }
  const key = md5Key
  const { params, timeStamp, randomNum } = form
  return md5(params + isEncrypted + timeStamp + randomNum + md5(key))
}

export function converParamsToFormData (params) {
  const myFormData = new FormData()
  Object.keys(params).forEach((key) => {
    myFormData.append(key, params[key])
  })
  return myFormData
}
export function normalizeParams (params) {
  const formData = {}
  formData.timeStamp = Math.floor(new Date().getTime() / 1000)
  formData.randomNum = Math.floor(Math.random() * 1000000)
  formData.isEncrypted = isEncrypted
  if (!params) {
    formData.params = ''
  } else {
    if (params.file) {
      formData.file = params.file
      delete params.file
    }
    formData.params = paramsEncode(params)
  }
  formData.sign = signEncode(formData)
  formData.lang = 'zh'
  return formData
}
