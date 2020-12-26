const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

function createPlugins(env) {
  if (env.prod) {
    return [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({ template: 'src/index.html' }),
    ]
  }
  return [
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
  ]
}

module.exports = env => {
  // use production config when `env.prod` is true
  console.log('env:', env.prod ? 'production' : 'development')

  const config = {
    mode: env.prod ? 'production' : 'development',
    entry: './src/app.js',
    output: {
      filename: 'app.[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
    },

    devtool: env.prod ? false : 'inline-source-map',
    devServer: {
      contentBase: './dist',
    },
    plugins: createPlugins(env),
    optimization: env.prod ? {
      minimize: true,
      minimizer: [new TerserPlugin()],
    } : {},
  }

  return config
}