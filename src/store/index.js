import Vue from 'vue'
import Vuex from 'vuex'
import invariant from 'invariant'
import * as manifest from '../client'
Vue.use(Vuex)
// 去除没有用vuex的模块
const modules = Object.keys(manifest).filter(key => !!manifest[key].stores)
// 获取namespace  model的namespace优先级高于模块的namespace
const getNameSpace = (stores) => stores.model.namespace || stores.namespace
let stores = {}
// store树的命名以namespace为准
modules.forEach(key => {
  let namespace = getNameSpace(manifest[key].stores)
  invariant(namespace, `the moudle ${key}'s store expect has namespace ,but get ${typeof namespace}`)
  stores[namespace] = manifest[key].stores.model
  return null
})
// 整合所有的getters
const gettersArr = modules.map(key => {
  const namespace = getNameSpace(manifest[key].stores)
  let getter = manifest[key].stores.getter
  // 如果getter是函数，则自动给getter加上namespace
  if (typeof getter === 'function') {
    getter = getter(namespace)
  }
  Object.entries(getter).forEach(([key, func]) => {
    getter[`${namespace}.${key}`] = func
  })
  return getter
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
