// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false

NProgress.configure({ showSpinner: false })// NProgress Configuration

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  next()
  NProgress.done()
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

Vue.use(Element)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
