const path = require("path");

module.exports = {
  entry: "./src/App/index.tsx",
  output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
          test: /\.(ts|tsx)$/,
          loader: "awesome-typescript-loader"
      },
      {
      test: /\.scss$/,
        use: [ "style-loader", "css-loader", "sass-loader" ]
      }
    ]
  },
};