const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/app.js'
  ],
  output: {
    path: path.resolve(__dirname, './static/build'),
    filename: 'app.js',
    publicPath: './../static'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },{
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: 'public/img/[name].[ext]',
            outputPath: 'static/img/'
          }
        }
      },{
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackBuildNotifierPlugin({
      title: 'react-shop',
    }),
    new ExtractTextPlugin({filename: 'main.css'}),
  ],
};

