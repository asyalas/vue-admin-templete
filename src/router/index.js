import Vue from 'vue'
import Router from 'vue-router'
import * as manifest from '../client'
Vue.use(Router)
// 注入路由
const routes = Object.keys(manifest)
  .filter(key => !!manifest[key].route)
  .map(key => manifest[key].route)
export default new Router({
  routes: [
    ...routes
  ]
})
