
import model from './store/model'
import getter from './store/getter'
import i18n from './i18n'
const namespace = 'demo'
export const route = {
  path: '/demo',
  name: 'demo',
  component: () => import('component/container'),
  redirect: '/demo/index',
  children: [
    {
      path: 'index',
      name: 'index',
      component: () => import('./container/axios')
    }
  ]
}

export const stores = {
  model,
  getter
}
export const lang = {
  namespace,
  i18n
}
