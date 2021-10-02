const { merge } = require("webpack-merge")
const common = require("./webpack.common")

const prodConfig = {
  mode: "production",
  devtool: "source-map",
}

module.exports = merge(common, prodConfig)
