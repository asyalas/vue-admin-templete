'use strict';

// const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
// // const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
// const ignoredFiles = require('react-dev-utils/ignoredFiles');
const path = require('path');
const paths = require('./paths');
const host = process.env.HOST || 'localhost';
const port = process.env.PORT && Number(process.env.PORT) || 8080
const isWatch = paths.isDll ? {
      watchContentBase:true,
      contentBase: paths.outPutPath, // since we use CopyWebpackPlugin. 
    }:{contentBase:false}
module.exports = {
      clientLogLevel: 'warning', 
      historyApiFallback: { 
        rewrites: [ 
          { from: /.*/, to: path.posix.join('/', 'index.html') }, 
        ], 
      }, 
      hot: true, 
      ...isWatch,
      compress: true, 
      host,
      port, 
      open: true, 
      overlay: { warnings: false, errors: true } , 
      publicPath:'/' ,
      proxy: {}, 
      quiet: true, // necessary for FriendlyErrorsPlugin 
      watchOptions: { 
        watch:true,
        // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
        poll: 1000, 
      } 
}