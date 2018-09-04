import Vue from 'vue'
import Vuex from 'vuex'
import invariant from 'invariant'
import * as manifest from '../client'
// 把vue-router的状态用vuex来管理
import { sync } from 'vuex-router-sync'
import router from '../router'
// 公有的getter方法
import commonGetter from './getter'
// 公有的state
import common from './common'
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
// 整合所有的getters和actions，添加命名空间
const store = new Vuex.Store({
  modules: {
    common,
    ...stores
  },
  getters: {
    ...commonGetter
  }
})
// 注入router的状态
sync(store, router)
export default store
