'use strict';

// const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
// // const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
// const ignoredFiles = require('react-dev-utils/ignoredFiles');
const path = require('path');
const host = process.env.HOST || 'localhost';
const port = process.env.PORT && Number(process.env.PORT) || 8080
module.exports = {
      clientLogLevel: 'warning', 
      historyApiFallback: { 
        rewrites: [ 
          { from: /.*/, to: path.posix.join('/', 'index.html') }, 
        ], 
      }, 
      hot: true, 
      contentBase: false, // since we use CopyWebpackPlugin. 
      compress: true, 
      host,
      port, 
      open: true, 
      overlay: { warnings: false, errors: true } , 
      publicPath: '/', 
      proxy: {}, 
      quiet: true, // necessary for FriendlyErrorsPlugin 
      watchOptions: { 
        watch:true,
        // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
        poll: false, 
      } 
}