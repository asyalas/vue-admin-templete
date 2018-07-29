import Vue from 'vue'
import Router from 'vue-router'
import * as manifest from '../client'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import {page404} from 'component'
Vue.use(Router)
// 注入路由
const routes = Object.keys(manifest)
  .filter(key => !!manifest[key].route)
  .map(key => manifest[key].route)
let router = new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    ...routes,
    { path: '*', component: page404 }
  ]
})

NProgress.configure({ showSpinner: false })// NProgress Configuration

// 加上进度条
// 以后可以在这里做路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  next()
  // NProgress.done()
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
export default router
