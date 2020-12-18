const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const TerserPlugin = require("terser-webpack-plugin");


module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    filename: 'app.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },

  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
  ],
  // TODO: production config
  /* optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  }, */
}