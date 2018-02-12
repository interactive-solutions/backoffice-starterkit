const path = require('path');

const entryPath = path.join(__dirname, 'src/app.js');
const outputPath = path.join(__dirname, 'dist');

module.exports = {
  target: 'node',
  resolve: {
    extensions: ['.js']
  },
  entry: entryPath,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    path: outputPath,
    filename: 'app.js',
    publicPath: '/'
  }
};
