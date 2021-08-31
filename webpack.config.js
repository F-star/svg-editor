/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

function createPlugins(env) {
  if (env.prod) {
    return [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({ template: 'src/index.html' }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css',
      }),
    ]
  }
  return [new HtmlWebpackPlugin({ template: 'src/index.html' })]
}

module.exports = (env) => {
  // use production config when `env.prod` is true
  console.log('env:', env.prod ? 'production' : 'development')

  const config = {
    mode: env.prod ? 'production' : 'development',
    // entry: './src/app.ts',
    entry: './src/views/index.tsx',
    output: {
      filename: 'app.[contenthash:8].js',
      path: path.resolve(__dirname, 'dist'),
    },

    devtool: env.prod ? false : 'inline-source-map',
    devServer: {
      contentBase: './dist',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: 'defaults' }],
                '@babel/preset-react',
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            env.prod
              ? {
                  loader: MiniCssExtractPlugin.loader,
                  options: { publicPath: '' }, // fix issue: https://stackoverflow.com/questions/64294706/webpack5-automatic-publicpath-is-not-supported-in-this-browser
                }
              : 'style-loader',
            'css-loader',
            'postcss-loader',
          ],
        },
        {
          test: /\.less$/,
          exclude: /node_modules/,
          use: [
            env.prod
              ? {
                  loader: MiniCssExtractPlugin.loader,
                  options: { publicPath: '' }, // fix issue: https://stackoverflow.com/questions/64294706/webpack5-automatic-publicpath-is-not-supported-in-this-browser
                }
              : 'style-loader',
            'css-loader',
            'postcss-loader',
            'less-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },
    // TODO: how does it work
    resolve: {
      extensions: ['.ts', '.tsx', '.js', 'jsx'],
    },
    plugins: createPlugins(env),
    optimization: env.prod
      ? {
          minimize: true,
          minimizer: [new TerserPlugin()],
        }
      : {},
  }

  return config
}
