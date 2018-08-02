
import * as manifest from '../client'
import common from './common'
import getLang from 'utils/getLang'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import iviewEnLocale from 'iview/dist/locale/en-US' // iview lang
import iviewZhLocale from 'iview/dist/locale/zh-CN'// iview lang
const en = {}
const zh = {}
Object.keys(manifest)
  .filter(key => !!manifest[key].lang)
  .map(key => manifest[key].lang)
  .map(lang => {
    en[lang.namespace] = lang.i18n.en
    zh[lang.namespace] = lang.i18n.zh
  })
Vue.use(VueI18n)

const messages = {
  en: {
    common: common.en,
    ...en,
    ...iviewEnLocale
  },
  zh: {
    common: common.zh,
    ...zh,
    ...iviewZhLocale
  }
}

const i18n = new VueI18n({
  // set locale
  // options: en or zh
  locale: getLang(),
  // set locale messages
  messages
})

export default i18n
