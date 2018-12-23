const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const is_dev = process.env.NODE_ENV === "development";

const mode = process.env.NODE_ENV || "production";

const rootAssetPath = path.join(__dirname, "assets");

const plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "src/index.html")
  }),
  new webpack.HotModuleReplacementPlugin(),
  new MiniCssExtractPlugin({
    filename: "[name].[hash].css"
  })
];

const jsLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env"],
      plugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: true }]
      ]
    }
  }
};

const alias = {
  Assets: path.resolve(__dirname, "assets")
};

const extensions = [".js", ".jsx", ".json", ".scss", ".css"];

module.exports = {
  mode,
  entry: [path.join(__dirname, "/src/index.js")],
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].[hash].js"
  },
  resolve: {
    alias,
    extensions
  },
  module: {
    rules: [
      jsLoader,
      {
        test: /\.(s)?css$/,
        use: [
          {
            loader: is_dev ? "style-loader" : MiniCssExtractPlugin.loader
          },
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        //eslint-disable-next-line
        test: /\.(wav|webm|mp3|woff|woff2|ttf|eot|svg|png|jpe?g|gif|ico)(\?.*)?$/i,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[hash].[ext]",
            context: rootAssetPath
          }
        }
      }
    ]
  },
  plugins,
  devServer: {
    compress: true,
    disableHostCheck: true, // That solved it
    historyApiFallback: true
  }
};
