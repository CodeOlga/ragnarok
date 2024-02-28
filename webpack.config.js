const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");

module.exports = {
  stats: {
    children: true,
  },
  entry: {
    app: "./src/assets/js/index.js",
  },
  output: {
    clean: true,
    filename: "[name].bundle.js", // [name] тут дорівнює app
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/images/[name][ext]", // у dist створюємо папку assets
  },
  mode: "development",
  devServer: {
    static: "./src",
    compress: true,
    port: 9000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]ss|css)$/i, // для sass/css
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "God Of War",
      template: "src/index.html",
      inject: true,
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "src/assets/images", to: "assets/images" }],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].bundle.css",
    }),
  ],
};
