import Vue from 'vue'
import Vuex from 'vuex'
import * as manifest from '../client'
Vue.use(Vuex)
// 去除没有用vuex的模块
const modules = Object.keys(manifest).filter(key => !!manifest[key].stores)
let stores = {}
// store树的命名默认为模块的名字，可以使用namespace来修改
modules.forEach(key => {
  let namespace = manifest[key].stores.store.namespace
  stores[namespace || key] = manifest[key].stores.store
  return null
})
// 整合所有的getters
const gettersArr = modules.map(key => manifest[key].stores.getter)
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
