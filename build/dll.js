'use strict'
require('../config/check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const webpackConfig = require('../config/webpack.prod.conf')
const paths = require('../config/paths')
const spinner = ora('building for production...')

// Ensure environment variables are read.
require('../config/env')

spinner.start()

rm(path.join(paths.outPutPath, paths.assetsSubDirectory), err => {
  if (paths.isDll) {
    webpackConfig.plugins.push(
      new webpack.DllReferencePlugin({
        // context: paths.contextPath,
        manifest: paths.dllManifestPath
      })
    )
  }
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
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
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
