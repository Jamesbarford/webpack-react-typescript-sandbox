const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const devMode = "development";
const prodMode = "production";
const mode = process.env.NODE_ENV === devMode ? devMode : prodMode;

console.log({ mode });

module.exports = {
  entry: "./src/App/index.tsx",
  mode,
  output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, 'dist'),
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"],
  },
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "style.css" }),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: "Webpack React Typescript Sandbox",
      template: 'template.html'
    })
  ]
};