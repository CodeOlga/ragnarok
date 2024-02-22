const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    app: "./src/assets/js/index.js",
  },
  output: {
    clean: true,
    filename: "[name].bundle.js", // [name] тут дорівнює app
    path: path.resolve(__dirname, "docs"),
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
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // для картинок
        type: "asset/resource",
        generator: {
          filename: "assets/[name][ext][query]", // сохраняем изображения в папку assets
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "God Of War",
      template: "src/index.html",
    }),
  ],
};
