'use strict'
const utils = require('./utils')
const config = require('../config')

const paths = require('./paths')
module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: paths.isOpenSoucreMap,
    extract: !paths.isOpenSoucreMap
  }),
  cssSourceMap: paths.isOpenSoucreMap,
  // cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
