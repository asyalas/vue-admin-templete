'use strict'
const utils = require('./utils')
const paths = require('../config/paths')
module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: paths.isOpenSoucreMap,
    extract: !paths.isOpenSoucreMap
  }),
  cssSourceMap: paths.isOpenSoucreMap,
  cacheBusting: paths.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
