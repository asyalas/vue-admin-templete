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

const paths = require('../config/paths')
// const ora = require('ora')
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
  if (paths.isDll) {
    config.plugins.push(
      new webpack.DllReferencePlugin({
        // context: paths.contextPath,
        manifest: paths.dllManifestPath
      })
    )
  }
  const compiler = webpack(config, (err, stats) => {
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
  })

  /**
   * 添加热更新
   * 必须在webpack执行后，否则js监听不到
   * **/
  WebpackDevServer.addDevServerEntrypoints(config, devServerConfig)

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
