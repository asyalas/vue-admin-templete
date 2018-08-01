'use strict'

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err
})

// Ensure environment variables are read.
require('../config/env')

const webpack = require('webpack')
const config = require('../config/webpack.dev.conf')
const utils = require('../config/utils')

const devServerConfig = require('../config/webpackDevServer.conf')
const chalk = require('chalk')
const WebpackDevServer = require('webpack-dev-server')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const notifyOnErrors = true
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || devServerConfig.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config

      // Add FriendlyErrorsPlugin
      config.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devServerConfig.host}:${port}`]
        },
        onErrors: notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))
      resolve(config)
    }
  })
}).then(config => {
  const compiler = webpack(config)
  const devServerConfig = {
    'clientLogLevel': 'warning',
    'historyApiFallback': {
      'rewrites': [
        {
          'from': {

          },
          'to': '/index.html'
        }
      ]
    },
    'hot': true,
    'contentBase': false,
    'compress': true,
    'host': 'localhost',
    'port': 8080,
    'open': false,
    'overlay': {
      'warnings': false,
      'errors': true
    },
    'publicPath': '/',
    'proxy': {

    },
    'quiet': false,
    'watchOptions': {
      'poll': false
    }
  }
  const devServer = new WebpackDevServer(compiler, devServerConfig)
  const {port, host} = devServerConfig
  // Launch WebpackDevServer.
  devServer.listen(port, host, err => {
    if (err) {
      return console.log(err)
    }
    console.log(chalk.cyan('Starting the development server...\n'))
    // openBrowser(urls.localUrlForBrowser)
  })
})
