const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const DotenvWebpackPlugin = require("dotenv-webpack")

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "../dist"),
    assetModuleFilename: "assets/[hash][ext][query]",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.s?css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|gif|jpe?g)$/i,
        type: "asset",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
    new MiniCssExtractPlugin(),
    new DotenvWebpackPlugin({
      path: "./.env",
      safe: false,
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  performance: {
    hints: false,
  },
}
