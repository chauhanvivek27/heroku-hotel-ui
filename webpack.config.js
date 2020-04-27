const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const AssetsPlugin = require("assets-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");

const env = dotenv.config().parsed;

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: ["babel-polyfill", "./src/index.js"],
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name].[hash].js",
  },
  optimization: {
    chunkIds: "named",
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "initial",
          minChunks: 1,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0, // This is example is too small to create commons chunks
        },
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 10,
          enforce: true,
        },
      },
    },
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: process.env.PORT || 9000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(css|sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
            },
            {
              loader: "sass-loader",
            },
          ],
        }),
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "/assests/users",
              publicPath: "/dist/assests/users",
            },
          },
        ],
      },
    ],
  },
  mode: "development",
  plugins: [
    new webpack.DefinePlugin(envKeys),
    new HtmlWebPackPlugin({
      hash: false,
      filename: "index.html", //target html
      template: "./src/index.html", //source html
    }),
    new ExtractTextPlugin({ filename: "css/style.css" }),
    new AssetsPlugin({
      path: path.join(__dirname),
      filename: "assets.json",
      prettyPrint: true,
    }),
  ],
};
