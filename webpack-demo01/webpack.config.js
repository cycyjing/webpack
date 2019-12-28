const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack')
module.exports = {
  devServer: {//开发服务器的配置
    port: 3000,
    progress: true,//进度条
    contentBase: './dist',//开发服务器基于的根目录
    open: true,
    // hotmoModule: true
  },
  mode: 'production',//两种 development/production(default)
  entry: './src/index.js',//入口
  output: {//出口
    filename: 'bundle.[hash:6].js',//打包后的文件名
    path: path.resolve(__dirname, 'dist'),//必须是绝对路径
    // publicPath:'http://yangandyu.com'
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.[hash:6].html',
      // minify: {
      //   removeAttributeQuotes: true,
      //   removeTagWhitespace: true,
      //   collapseWhitespace: true
      // },
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: '/css/main.[hash:8].css'
    }),
    new webpack.ProvidePlugin({
      "$": 'jquery'
    })
  ],
  externals: {
    'jquery': 'jQuery'
  },
  module: {
    rules: [
      {
        test: /\.(htm|html)$/,
        use: 'html-withimg-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        // use: 'file-loader'
        use: {
          loader: 'url-loader',
          options: {
            limit: 200,
            outputPath: '/img/'
          },
        }
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              exclude: /node_modules/,
              presets: [
                '@babel/preset-env'
              ],
              plugins: [
                ['@babel/plugin-proposal-decorators', { 'legacy': true }],
                ['@babel/plugin-proposal-class-properties', { 'loose': true }],
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', 'postcss-loader', 'less-loader']
      },
    ]
  }
}