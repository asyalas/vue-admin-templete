const path = require("path");
const paths = require("./paths");
const DllPlugin = require("webpack/lib/DllPlugin");

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry:  {
        dll: require(paths.packageJSON).dll
    },
    output: {
        filename: "[name]-[hash:8].dll.js",
        path: paths.dllOutPutPath,
        library: '_dll_[name]_library',
        publicPath: paths.assetsPublicPath,
        // libraryTarget: "window"
    },
    plugins: [
        new DllPlugin({
            name: '_dll_[name]_library',
            path: paths.dllManifestPath,
        }),
        new HtmlWebpackPlugin({
            filename: paths.dllHtml,
            template: 'index.html',
            favicon:'favicon.ico',
            inject: true
        })
    ]
};
