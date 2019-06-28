var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname , 'dist'),
    filename: 'widget.js',
    library: 'Widget',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader' },
      { test: /\.css$/,  use: [ 'style-loader', 'css-loader'] },
      { test: /\.scss$/, use: [ 'style-loader', 'css-loader', 'sass-loader' ] }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:9000',
        secure: false
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin ({
      template : './index.html',
      inject: 'head'
    })
  ]
}