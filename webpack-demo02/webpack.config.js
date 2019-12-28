const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
  mode: 'development',
  devServer: {
    port: 3000,
    compress: true,
  },
  devtool: 'cheap-module-eval-source-map',
  entry: {
    home: './src/index.js',
    // other: './src/other.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  // watch: true,
  // watchOptions: {
  //   poll: 1000,
  //   aggregateTimeout: 500,
  //   ignored: /node_modules/
  // },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.css', '.json'],
    // alias:{}
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       common: {
  //         chunks: 'initial',
  //         minSize: 0,
  //         minChunks: 2
  //       },
  //       vender: {
  //         test: /node_modules/,
  //         chunks: 'initial',
  //         minSize: 0,
  //         minChunks: 2,
  //         priority: 1
  //       }
  //     }
  //   }
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['home']
    }),
    // new HtmlWebpackPlugin({
    //   template: './src/index.html',
    //   filename: 'other.html',
    //   chunks: ['other']
    // }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{
      from: './src/doc', to: './'
    }]),
    new webpack.BannerPlugin('created by cy 2019'),
    new webpack.DefinePlugin({
      DEV: JSON.stringify('dev'),
      FLAG: 'true',
      EXPRESION: '1+1'
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
    //  
  ],
  module: {
    noParse: /jquery/,
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ]
          }
        }
      }
    ]
  }
}