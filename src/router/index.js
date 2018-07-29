import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import * as manifest from '../client'
Vue.use(Router)
const routes = Object.keys(manifest)
  .filter(key => !!manifest[key].route)
  .map(key => manifest[key].route)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    ...routes
  ]
})
