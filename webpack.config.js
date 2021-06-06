const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production'

module.exports = {
  devtool: prod ? false : 'source-map',
  entry: {
    'build/bundle': ['./src/index.js']
  },
  output: {
    path: path.join(__dirname, '/public'),
    filename: '[name].js',
    chunkFilename: '[name].[id].js'
  },
  devServer: {
    port: 3000,
    open: true,
    hot: true,
  },
  mode,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|build)/,
        loader: "babel-loader",
      },
    ],
  },
  watchOptions: {
    ignored: "**/node_modules",
  },
  resolve: {
    extensions: ["", ".jsx", ".js", ".wasm"],
    fallback: {
      path: false,
      fs: false,
    },
    alias: {
      assets: path.resolve(__dirname, './assets')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      filename: "index.html",
      inject: 'head',
      scriptLoading: 'blocking',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'assets', to: 'assets' },
        { from: require.resolve('ammo.js'), to: 'build' },
        { from: require.resolve("ammo.js/builds/ammo.wasm.js"), to: 'build' },
        { from: require.resolve("ammo.js/builds/ammo.wasm.wasm"), to: 'build' }
      ]
    })
  ],
};