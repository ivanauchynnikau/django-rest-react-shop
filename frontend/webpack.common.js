const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

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
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: { outputPath: 'public/fonts' }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: 'public/img/[name].[ext]',
            outputPath: 'static/img/'
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/public/path/to/',
            },
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
                sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackBuildNotifierPlugin({title: 'react-shop'}),
    new MiniCssExtractPlugin()
  ],
};

