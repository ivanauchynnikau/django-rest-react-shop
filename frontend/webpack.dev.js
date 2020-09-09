const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
  plugins: [
    new ProgressBarPlugin()
  ],
});
