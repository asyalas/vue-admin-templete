'use strict'
const path = require('path')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const env = require('../config/env')
const paths = require('../config/paths')
const webpack = require('webpack')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}


module.exports = {
  context: paths.contextPath,
  entry: {
    app:paths.appPath
  },
  output: {
    path: paths.outPutPath,
    publicPath:paths.assetsPublicPath ,
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/chunk/[id].[chunkhash:8].chunk.js'
  },
  plugins: [
    new webpack.DefinePlugin(env.stringified),
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      ...paths.extraAlias
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: paths.eslintPath,
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: !config.dev.showEslintErrorsInOverlay
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include:paths.appSrc
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: paths.svgSpritePath,
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: paths.svgSpritePath,
        options: {
          limit: 10000,
          name: paths.staticResolve('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: paths.staticResolve('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: paths.staticResolve('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
