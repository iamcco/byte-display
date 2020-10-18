const path = require('path');

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: './src/index.ts',
  mode: 'production',
  resolve: {
    mainFields: ['module', 'main'],
    extensions: ['.js', '.ts'],
  },
  externals: {
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
  output: {
    path: path.join(__dirname, 'out'),
    filename: 'index.js',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  plugins: [],
  node: {
    __dirname: false,
    __filename: false,
  },
};
