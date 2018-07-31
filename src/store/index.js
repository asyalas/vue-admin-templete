import Vue from 'vue'
import Vuex from 'vuex'
import invariant from 'invariant'
import * as manifest from '../client'
Vue.use(Vuex)
// 去除没有用vuex的模块
const modules = Object.keys(manifest).filter(key => !!manifest[key].stores)
let stores = {}
// store树的命名以namespace为准
modules.forEach(key => {
  let namespace = manifest[key].stores.model.namespace
  invariant(namespace, `the moudle ${key}'s store expect has namespace ,but get ${typeof namespace}`)
  stores[namespace] = manifest[key].stores.model
  return null
})
// 整合所有的getters
const gettersArr = modules.map(key => {
  const namespace = manifest[key].stores.model.namespace
  const getter = manifest[key].stores.getter
  const getters = {}
  Object.entries(getter).forEach(([key, func]) => {
    getters[`${namespace}.${key}`] = func
  })
  return getters
})
const getters = Object.assign({}, ...gettersArr)
const store = new Vuex.Store({
  modules: {
    ...stores
  },
  getters: {
    ...getters
  }
})

export default store
