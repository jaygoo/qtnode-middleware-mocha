'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
        chunks: ['index'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'detail.html',
      template: 'detail.html',
        chunks: ['detail'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'addsite.html',
      template: 'addsite.html',
        chunks: ['addsite'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'editsite.html',
      template: 'editsite.html',
        chunks: ['editsite'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'managesite.html',
      template: 'managesite.html',
        chunks: ['managesite'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'chosite.html',
      template: 'chosite.html',
        chunks: ['chosite'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'productlist.html',
      template: 'productlist.html',
      chunks: ['productlist'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'wxorder.html',
      template: 'wxorder.html',
      chunks: ['wxorder'],
      inject: true
    }),
	new HtmlWebpackPlugin({
      filename: 'suborder.html',
      template: 'suborder.html',
      chunks: ['suborder'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'center.html',
      template: 'center.html',
      chunks: ['center'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'drawingOrder.html',
      template: 'drawingOrder.html',
      chunks: ['drawingOrder'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'tradercenter.html',
      template: 'tradercenter.html',
      chunks: ['tradercenter'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'traderdrawingOrder.html',
      template: 'traderdrawingOrder.html',
      chunks: ['traderdrawingOrder'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'upload.html',
      template: 'upload.html',
      chunks: ['upload'],
      inject: true
    }),
    new ExtractTextPlugin("[name].css")
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
