const path = require('path');
const glob = require('glob');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");

// const extractSass = new ExtractTextPlugin('mainwp.css');

// const webpack = require('webpack');

module.exports = {
  entry: glob.sync('./src/**/**/*.js'),

  // entry: [
  //   glob.sync('./src/**/**/*.js'),
  //   glob.sync('./src/**/**/*.sass')
  // ],

  output: {
    filename: 'main.js',  
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [ // from 'loaders' to 'rules'
      {
        test: /\.(js|jsx|ts)$/,
        use: [{
          loader: 'babel-loader',
          // options: {
          //   sourceMap: (production) ? false : true
          // }
        }],
        exclude: '/node_modules/',
      },

      {
        test:/\.(s*)css$/,
        use:['style-loader','css-loader', 'sass-loader']
      }

      // {
      //   test: /(\.css|\.scss)$/,
      //     use: ExtractTextPlugin.extract({
      //      fallback: 'style-loader',
      //      loader: 'sass-loader',
      //   })
      // }

    ]
  },

  // plugins: [
  //   extractSass
  // ]

}

