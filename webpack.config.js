import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WorkboxPlugin from 'workbox-webpack-plugin';

const mode = process.env.NODE_ENV || 'development';

export default {
  entry: './src/client/index.js',
  mode,
  output: {
    path: path.resolve('dist'),
    filename: 'main.js',
  },
  devServer: {
    static: path.resolve('dist'),
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/views/index.html',
    }),
    ...(mode === 'production'
      ? [
          new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
          }),
        ]
      : []),
  ],
};
