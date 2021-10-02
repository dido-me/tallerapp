const { merge } = require("webpack-merge")
const common = require("./webpack.common")
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")

const devConfig = {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    static: "./dist",
    open: true,
    hot: true,
    port: 3000,
    historyApiFallback: true,
  },
  plugins: [
    new ReactRefreshWebpackPlugin({
      overlay: false,
    }),
  ],
  target: "web",
}

module.exports = merge(common, devConfig)
