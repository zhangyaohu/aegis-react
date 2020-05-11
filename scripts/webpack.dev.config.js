
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin }  = require('clean-webpack-plugin')
const os = require('os');
let selfIp;
try {
  selfIp = os.networkInterfaces()['WLAN'][1].address;
} catch (e) {
  selfIp = 'localhost'
}

const PORT = 3333
function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}
const webpackConfigDev = {
  mode: 'development',
  plugins: [
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      IS_DEVELOPMETN: true,
    }),
    // 将打包后的资源注入到html文件内    
    new HtmlWebpackPlugin({
      template: resolve('../public/index.html'),
      dlls: [],
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: resolve('../src'),
    historyApiFallback: false,
    open: true,
    hot: true, 
    host: selfIp,
    port: PORT,
    proxy: {
      '/api/*': {//代理请求前缀
        target: 'http://127.0.0.1:5555',//代理服务端路径
        secure: false,
        changeOrigin:true
        //changeOrigin: true,
        //pathRewrite: {'^/api' : ''}//请求到服务端后是否重写路径
      }
    }
  },
}

module.exports = merge(webpackConfigBase, webpackConfigDev)
