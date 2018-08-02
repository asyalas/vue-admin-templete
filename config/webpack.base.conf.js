'use strict'
const path = require('path')
const paths = require('./paths')
const webpack = require('webpack')
const vueLoaderConfig = require('./vue-loader.conf')
const getClientEnvironment = require('./env');
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = '';
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl); 
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  context: paths.contextPath,
  entry: {
    app: paths.appPath
  },
  output: {
    path: paths.outPutPath,
    publicPath:paths.assetsPublicPath,

    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/chunk/[id].[chunkhash:8].chunk.js'
  },
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
          emitWarning: true
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
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
        test: /\.js$/,
        loader: 'babel-loader',
        include:paths.appSrc
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
  plugins: [
    new webpack.DefinePlugin(env.stringified),
  ],
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
