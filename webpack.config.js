const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const babelConfig = require("./babel.config");

const production = process.env.NODE_ENV === "production";
const development = process.env.NODE_ENV === "development";
const mode = development ? "development" : "production";

console.log(`Build ENV: ${mode.toUpperCase()}`);

// Load polyfills first
const entry = ["core-js/stable", "whatwg-fetch", "./src/app/index.tsx"];

// this could be split into different files for plugins you only want for development / production
const plugins = [
  new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
  new HtmlWebpackPlugin({ template: "template.html" }),
  new webpack.HashedModuleIdsPlugin() // keep hash consistent between builds
];

if (development) {
  plugins.push(
    new ForkTsCheckerWebpackPlugin({
      tslint: true,
      tsconfig: path.resolve(__dirname, "tsconfig.json"),
      tslint: path.resolve(__dirname, "./src/tslint.json")
    })
  );
}

if (production) {
  plugins.push(new CleanWebpackPlugin());
}

const WebpackConfig = {
  entry,
  mode,
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    pathinfo: development ? false : true
  },
  plugins,
  // To split chunks
  optimization: {
    runtimeChunk: "single",
    // Only minimize if you are not in development. This is quite a costly step.
    minimize: production,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            comparisons: false,
            inline: 2,
            // if you write a while loop, this will preserve it.
            loops: false
          },
          mangle: true,
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          },
          safari10: true
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
      // Only do this for production builds, should mean dev compliations times are faster
      cacheGroups: production
        ? {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name({ issuer }) {
                const { buildInfo } = issuer;
                const fullDir = buildInfo.fileDependencies
                  ? buildInfo.fileDependencies.entries().next().value[0]
                  : "vendor";
                if (fullDir === "vendor") {
                  return fullDir;
                }
                const fullDirArr = fullDir.split("/");
                const isNodeModule = fullDirArr.includes("node_modules") ? "npm." : "";
                return `${isNodeModule}${fullDirArr[fullDirArr.length - 2]}-${fullDirArr[fullDirArr.length - 1]}`;
              }
            }
          }
        : {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendor"
            }
          }
    }
  },
  // slightly worse source map for dev, enables a faster re-build
  devtool: development ? "inline-source-map" : "source-map",
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
          name: "[name].[ext]"
        }
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: babelConfig.presets,
              plugins: babelConfig.plugins,
              cacheDirectory: true
            }
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      /**
       * Style configurations, allows both `scss` & `css`
       */
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
      },
      /**
       * for things like pictures
       */
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        use: [
          {
            loader: "file-loader"
          }
        ]
      }
    ]
  }
};

module.exports = WebpackConfig;
