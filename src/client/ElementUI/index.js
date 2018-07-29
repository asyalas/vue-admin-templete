
import ElementUi from './container/ElementUi'
import ChildPage from './component/ChildPage'
import {container} from 'component'
export const route = {
  path: '/ElementUi',
  component: container,
  redirect: '/ElementUi/index',
  children: [
    {
      path: 'ChildPage',
      name: 'ChildPage',
      component: ChildPage
    },
    {
      path: 'index',
      component: ElementUi
    }]
}
