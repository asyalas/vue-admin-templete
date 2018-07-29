
import Vuex from './container/vuex'
import {store, getter} from './store'
export const route = {
  path: '/vuex',
  name: 'vuex',
  component: Vuex
}

export const stores = {
  store,
  getter
}
