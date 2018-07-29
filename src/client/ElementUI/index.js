
export const route = {
  path: '/ElementUi',
  component: () => import('component/container'),
  redirect: '/ElementUi/index',
  children: [
    {
      path: 'ChildPage',
      name: 'ChildPage',
      component: () => import('./component/ChildPage')
    },
    {
      path: 'index',
      component: () => import('./container/ElementUi')
    }]
}
