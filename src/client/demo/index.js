
import model from './store/model'
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
  model
}
export const lang = {
  namespace,
  i18n
}
