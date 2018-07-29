
import {store, getter} from './store'
export const route = {
  path: '/vuex',
  name: 'vuex',
  component: () => import('./container/vuex')
}

export const stores = {
  store,
  getter
}
