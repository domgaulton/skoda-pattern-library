const path = require('path');
const glob = require('glob');
const webpack = require('webpack');

module.exports = {
  entry: glob.sync('./src/_webparts/webparts/**/*.js'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
}