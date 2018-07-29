
import ElementUi from './container/vuex'
import {store, getter} from './store'
export const route = {
  path: '/vuex',
  name: 'vuex',
  component: ElementUi
}

export const stores = {
  store,
  getter
}
