const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// const extractSass = new ExtractTextPlugin({
//     filename: "[name].[contenthash].css",
//     disable: process.env.NODE_ENV === "development"
// });

const extractSass = new ExtractTextPlugin('mainwp.css');

// const webpack = require('webpack');

module.exports = {
  entry: glob.sync('./src/**/**/*.js'),
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
  }
  // },
  // module: {
  //   rules: [{
  //     test: /\.scss$/,
  //     use: extractSass.extract({
  //       use: [{
  //         loader: "css-loader"
  //       }, {
  //         loader: "sass-loader"
  //         }],
  //       // use style-loader in development
  //       fallback: "style-loader"
  //     })
  //   }]
  // },
  // plugins: [
  //   extractSass
  // ]
}