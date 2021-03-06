const path = require("path")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const AnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const PORT = 9999
const BACKEND_PORT = 9000
const isProdBuild = process.env.NODE_ENV === "production"
const runBundleAnalyzer = process.env.ANALYZE

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development"
}

const PATHS = {
  assets: `${__dirname}/assets`,
  src: `${__dirname}/src`,
}

const basePlugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    favicon: "assets/favicon.ico",
    template: "src/index.hbs",
    minify: {
      minifyCSS: true,
      minifyJS: true,
      minifyURLs: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
    },
  }),
  new MiniCssExtractPlugin({
    filename: "qdb.css",
  }),
]

const devPlugins = [
  new ForkTsCheckerWebpackPlugin({
    eslint: true,
    measureCompilationTime: false,
  }),
]

const prodPlugins = [
  new CopyWebpackPlugin([{ from: "./assets/", to: "assets/" }]),
]

module.exports = {
  devServer: {
    compress: true,
    host: "localhost",
    hot: false,
    overlay: !isProdBuild && {
      errors: true,
      warnings: false,
    },
    port: PORT,
    proxy: {
      context: ["/imp", "/exp", "/exec", "/chk"],
      target: `http://localhost:${BACKEND_PORT}/`,
    },
  },
  mode: isProdBuild ? "production" : "development",
  entry: "./src/js/index",
  output: {
    filename: "qdb.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
      {
        test: /\.hbs$/,
        loader: "handlebars-loader",
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    ...basePlugins,
    ...(isProdBuild ? prodPlugins : devPlugins),
    ...(runBundleAnalyzer ? [new AnalyzerPlugin({ analyzerPort: 9998 })] : []),
  ],
  stats: {
    all: false,
    chunks: true,
    env: true,
    errors: true,
    errorDetails: true,
  },
}
