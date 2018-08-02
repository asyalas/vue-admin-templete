// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// 国际化
import i18n from './lang'
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

Vue.use(iView, {
  i18n: function (path, options) {
    let value = i18n.t(path, options)
    if (value !== null && value !== undefined) {
      return value
    }
    return ''
  }
})

Vue.locale = () => {}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
