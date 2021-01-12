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
        filename: '[name].[contenthash:8].css'
      })
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
              ]
            },
          }
        },
        {
          test: /\.css$/,
          use: [
            env.prod ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader'
          ]
        }
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
