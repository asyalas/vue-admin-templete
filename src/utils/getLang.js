/**
 * 确定当前系统的国际化语言(优先级如下)
 *
 *   1) 开发者文档链接过来的语言(?lang=zh)
 *   2) cookies.lang中存储的语言
 *   3) navigator.language浏览器默认语言
 */
/**
 * 设置语言
 */
import getQuery from 'utils/getQuery'
import Cookie from 'utils/cookie'
export default function getLang () {
  // 系统支持的语言包
  const supportLangs = ['zh', 'en']
  // 1、解析url参数
  let langQuery = getQuery('lang')
  // 2、解析cookies
  let langCookie = Cookie.getItem('lang')
  // 3、解析浏览器默认语言
  let langBrowser = navigator.language.split('-').shift()
  // 非支持的语言包，则默认使用中文
  const lang = langQuery || langCookie || langBrowser
  return supportLangs.indexOf(lang) !== -1 ? lang : 'zh'
}
