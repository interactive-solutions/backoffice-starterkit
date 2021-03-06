const path = require('path');
const merge = require('webpack-merge');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
// const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { BannerPlugin, LoaderOptionsPlugin } = require('webpack');
const common = require('./webpack.common.js');

const projectRoot = path.resolve(__dirname, '..');

module.exports = merge(common, {
  devtool: 'source-map', // Add source maps
  output: {
    // Add chunkhash to file names in prod
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    // ... also, put build files in static/build
    path: path.resolve(projectRoot, 'dist', 'static', 'build'),
    publicPath: '/static/build/'
  },
  plugins: [
    // new SentryWebpackPlugin({
    //   release: process.env.SENTRY_BUILD ? process.env.SENTRY_BUILD : 'local',
    //   include: './dist',
    //   ignore: ['node_modules']
    // }),
    new LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    // UglifyJS
    new UglifyJsWebpackPlugin({ sourceMap: true }),
    // Add header text to all js files
    new BannerPlugin(`© 2017 - ${new Date().getFullYear()}, ALL RIGHTS RESERVED ([hash])`),
    // Clean /dist onStart and move index.html to root onEnd
    new FileManagerPlugin({
      onStart: {
        delete: ['./dist']
      },
      onEnd: {
        move: [{ source: './dist/static/build/index.html', destination: './dist/index.html' }]
      }
    }),
    // Generate service worker
    new SWPrecacheWebpackPlugin({
      cacheId: 'abrb-sw',
      filepath: path.resolve(projectRoot, 'dist', 'sw.js'),
      minify: true,
      // Remove local path prefixes
      stripPrefix: `${process.cwd()}/dist`,
      // Ignore index.html
      staticFileGlobsIgnorePatterns: [/build\/index\.html$/, /\.map$/],
      // Do not cache bust files with chunkhash
      dontCacheBustUrlsMatching: /-\w{20}/
    }),
    // Create a bundle analyzer report
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: '../../../report.html',
      openAnalyzer: false
    })
  ],
  performance: {
    hints: 'error',
    maxAssetSize: 4000000,
    maxEntrypointSize: 6500000
  }
});
