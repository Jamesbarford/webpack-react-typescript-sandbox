const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const TerserPlugin = require("terser-webpack-plugin");
const babelConfig = require("./babel.config");

const production = process.env.ENV === "production";
const analyse = process.env.ENV === "analyse";
const development = process.env.ENV === "development";
const mode = development ? "development" : "production";

console.log({ development, production, analyse });

const WebpackConfig = {
  entry: "./src/app/index.tsx",
  mode,
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({ template: "template.html" }),
    new webpack.HashedModuleIdsPlugin(), // so that file hashes don"t change unexpectedly
  ],
  // To split chunks
  optimization: {
    runtimeChunk: "single",
    minimize: !development,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          }
        },
        parallel: true,
        cache: true,
        sourceMap: true
      })
   ],
    splitChunks: {
      chunks: "all",
      minSize: 0,
      maxInitialRequests: Infinity,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `npm.${packageName.replace("@", "")}`;
          },
        }
      }
    }
  },
  devtool:
    process.env.NODE_ENV === "development" ? "inline-source-map" : "source-map",
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"]
  },
  devServer: {
    contentBase: "./dist",
    compress: true,
    port: 3000,
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "http://[::1]:8000",
        secure: false,
        changeOrigin: false
      }
    }
  },
  module: {
    rules: [
      {
        test: /favicon\.ico$/,
        loader: "url",
        query: { 
          limit: 1,
          name: "[name].[ext]",
        }
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        enforce: "pre",
        use: [
          {
            loader: "tslint-loader",
            options: {
              configFile: "./src/tslint.json"
            }
          }
        ]
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "awesome-typescript-loader",
            options: {
              useBabel: true,
              babelOptions: {
                babelrc: false,
                presets: babelConfig.presets,
                plugins: babelConfig.plugins
              },
              babelCore: "@babel/core"
            }
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        use: [
          {
            loader: "file-loader"
          },
        ],
      },
    ]
  }
};

if (analyse) WebpackConfig.plugins.push(new BundleAnalyzerPlugin());

module.exports = WebpackConfig;
