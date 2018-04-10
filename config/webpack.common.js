const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');
const autoprefixer = require('autoprefixer');

const projectRoot = path.resolve(__dirname, '..'); // Project root

const isHot = process.argv.indexOf('--hot') !== -1;

const NODE_ENV = process.env.NODE_ENV || 'development';

const __DEV__ = NODE_ENV === 'development';
const __TEST__ = NODE_ENV === 'test';
const __PROD__ = NODE_ENV === 'production';

const SemanticExtractPlugin = new ExtractTextWebpackPlugin('semantic-[contenthash:20].css', { allChunks : true });
const ReactTableExtractPlugin = new ExtractTextWebpackPlugin('react-table[contenthash:20].css');
const StyleExtractPlugin = new ExtractTextWebpackPlugin({
  filename: 'style-[contenthash:20].css',
  allChunks: true,
  disable: isHot // Disable and fallback to style-loader if HMR is enabled
});

module.exports = {
  resolve: {
    modules: ['node_modules', 'node_modules/semantic-ui-css', 'src']
  },
  entry: {
    main: ['./src/main.js'] // This is an array because we want to be able to add HMR in dev config
  },
  output: {
    path: path.resolve(projectRoot, 'dist'),
    filename: '[name].js',
    sourceMapFilename: '[file].map',
    chunkFilename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: path.resolve(projectRoot, 'node_modules/react-table/react-table.css'),
        use: ReactTableExtractPlugin.extract({ use: ['css-loader'] })
      },
      {
        test: path.resolve(projectRoot, 'node_modules/semantic-ui-css/semantic.min.css'),
        use: SemanticExtractPlugin.extract({ use: ['css-loader'] })
      },
      {
        // CSS/SCSS loader
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: StyleExtractPlugin.extract({
          fallback: 'style-loader',
          // Use ETWP to put CSS in its own file
          use: [
            {
              loader: 'css-loader', // Load css and turn into modules
              options: {
                modules: true,
                localIdentName: '_[hash:base64:5]',
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader', // Used to add autoprefixes
              options: {
                sourceMap: true,
                plugins: () =>
                  autoprefixer({
                    browsers: ['last 5 versions']
                  })
              }
            },
            'sass-loader', // Used to parse SCSS
            {
              loader: 'sass-resources-loader', // Used to inject SCSS variables, thus making them "global"
              options: {
                resources: './src/css/resources/_*.scss',
                sourceMap: true
              }
            }
          ]
        })
      },
      // Use babel-loader for js
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|png|woff|woff2|otf|ttf|eot|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 5000,
            name: './images/[hash].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // Create a html with the build files from template
      template: './src/index.html',
      chunksSortMode: (chunk1, chunk2) => {
        const order = ['vendor', 'lodash-moment', 'semantic', 'main'];
        const order1 = order.indexOf(chunk1.names[0]);
        const order2 = order.indexOf(chunk2.names[0]);
        return order1 - order2;
      }
    }),
    // Extract loaded CSS and save to a file
    SemanticExtractPlugin,
    ReactTableExtractPlugin,
    StyleExtractPlugin,
    new DotenvWebpackPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.HashedModuleIdsPlugin(), // So vendor caching works correctly
    // Extract commonly used components to main bundle
    new webpack.optimize.CommonsChunkPlugin({
      name: 'main',
      children: true,
      minChunks(module, count) {
        return count >= 2;
      }
    }),
    // Bundle vendor libraries
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (m) => /node_modules/.test(m.context)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'lodash-moment',
      minChunks: (m) => /node_modules\/(?:lodash|moment)/.test(m.context)
    }),
    // Bundle semantic-ui seperatly
    new webpack.optimize.CommonsChunkPlugin({
      name: 'semantic',
      chunks: ['vendor'],
      minChunks: (m) => /node_modules\/(?:semantic-ui-react)/.test(m.context)
    }),
    // Extract manifest
    new webpack.optimize.CommonsChunkPlugin({ name: 'manifest', minChunks: Infinity }),
    new webpack.DefinePlugin(Object.assign({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
      },
      __DEV__,
      __TEST__,
      __PROD__
    }, {}))
  ],
  node: {
    fs: 'empty'
  }
};
