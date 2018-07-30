
export const route = {
  path: '/iView',
  component: () => import('component/container'),
  redirect: '/iView/index',
  children: [
    {
      path: 'index',
      component: () => import('./container/iView')
    }]
}
