// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// 导入element-ui UI组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 初始化全局css
import 'normalize.css/normalize.css'

// 导入iView UI组件库
import iView from 'iView'
import 'iview/dist/styles/iview.css'

import {Svg} from 'component'// svg组件
// 全局注册svg组件
Vue.component('svg-icon', Svg)
// 对svg目录的svg文件自动进行svg-sprite-loader
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('../static/svg', false, /\.svg$/)
requireAll(req)

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(iView)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
