'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const paths = require('./paths')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const utils = require('./utils')

module.exports  = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap:paths.isOpenSoucreMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      favicon:'favicon.ico',
      inject: true
    })
  ]
})

