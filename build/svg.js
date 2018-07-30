const path = require('path')  
const fs = require('fs')  
  
const appDirectory = fs.realpathSync(process.cwd());  
const resolve =function (paths){ 
    return path.resolve(appDirectory, paths)  
}
const requireAll = requireContext => requireContext.keys().map(requireContext)
console.log('req================',req)
requireAll(require.context(resolve('static/svg'), false, /\.svg$/))