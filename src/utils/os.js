/* eslint-disable */
export default (function () {
  var ua = navigator.userAgent

  var isWindowsPhone = /(?:Windows Phone)/.test(ua)

  var isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone

  var isAndroid = /(?:Android)/.test(ua)

  var isFireFox = /(?:Firefox)/.test(ua)

  var isChrome = /(?:Chrome|CriOS)/.test(ua)

  var isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua))

  var isPhone = /(?:iPhone)/.test(ua) && !isTablet

  var isPc =( !isPhone && !isAndroid && !isSymbian) || (isChrome && isAndroid &&  process.env.NODE_ENV !== 'production')

  return {
    isTablet,
    isPhone,
    isAndroid,
    isPc,
    isChrome
  }
}())
