
import model from './store/model'
import getter from './store/getter'
export const route = {
  path: '/demo',
  name: 'demo',
  component: () => import('./container/axios')
}

export const stores = {
  model,
  getter
}
