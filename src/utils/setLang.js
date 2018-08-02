
import Cookie from 'utils/cookie'
export default function setLang (lang) {
  Cookie.setItem('lang', lang, 60 * 60 * 24 * 7, '/')
}
