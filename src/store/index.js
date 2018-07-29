import Vue from 'vue'
import Vuex from 'vuex'
import * as manifest from '../client'
Vue.use(Vuex)
const modules = Object.keys(manifest).filter(key => !!manifest[key].stores)
const stores = modules.map(key => manifest[key].stores.store)
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
