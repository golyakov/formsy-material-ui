const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './demo/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'resources/[name].[ext]'
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|dist)/,
        use: {
          loader: 'ts-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
    }),
    new MiniCssExtractPlugin('[name].css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'demo/index.html')
    })
  ],
  devtool: 'inline-source-map',
  bail: true,
  mode: 'development'
};
