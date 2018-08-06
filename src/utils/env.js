// 是否加密
let isEncrypted
let envHost
let md5Key
let DES = { Iv: '', Key: '' }

const defaultHost = 'test'
const SUNMI_ENV = process.env.SUNMI_ENV || defaultHost
const NODE_HOST = SUNMI_ENV
const NODE_ENV = process.env.NODE_ENV
const SUNMI_REMOTESERVER = process.env.SUNMI_REMOTESERVER
const SUNMI_RAP_SERVER = process.env.SUNMI_RAP_SERVER
switch (SUNMI_ENV) {
  case 'dev':
  case 'test':
    isEncrypted = 0
    envHost = (host) => `https://${SUNMI_ENV}.${host}`
    md5Key = process.env.SUNMI_DEVELOPMENT_MD5KEY
    DES = {
      Iv: process.env.SUNMI_DEVELOPMENT_DESIV || 'abc',
      Key: process.env.SUNMI_DEVELOPMENT_DESKEY || 'abc'
    }
    break
  case 'uat':
    isEncrypted = 1
    envHost = (host) => `https://${SUNMI_ENV}.${host}`
    md5Key = process.env.SUNMI_PRODUCTION_MD5KEY
    DES = {
      Iv: process.env.SUNMI_PRODUCTION_DESIV || 'abc',
      Key: process.env.SUNMI_PRODUCTION_DESKEY || 'abc'
    }
    break
  case 'pub':
  default:
    isEncrypted = 1
    envHost = (host) => `https://${host}`
    md5Key = process.env.SUNMI_PRODUCTION_MD5KEY
    DES = {
      Iv: process.env.SUNMI_PRODUCTION_DESIV || 'abc',
      Key: process.env.SUNMI_PRODUCTION_DESKEY || 'abc'
    }
    break
}

export {
  SUNMI_ENV,
  envHost,
  isEncrypted,
  md5Key,
  DES,
  NODE_HOST,
  NODE_ENV,
  defaultHost,
  SUNMI_RAP_SERVER,
  SUNMI_REMOTESERVER
}
