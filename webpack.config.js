const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, argv) => {
  const IS_DEVELOPMENT = (argv.mode === 'development')

  return {
    entry: './app/frontend/app.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'public', argv.out || 'packs'),
      // publicPath: ''
    },
    devtool: IS_DEVELOPMENT ? 'source-map' : 'none',
    module: {
      rules: [
        {
          test: /\.(css|sass|scss)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // publicPath: ''
              },
            },
            {
              loader: 'css-loader',
              options: {
                // CSS内のurl()メソッドの取り込み
                url: false,
                // ソースマップの作成
                sourceMap: IS_DEVELOPMENT,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                // ソースマップの作成
                sourceMap: IS_DEVELOPMENT,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'bundle.css',
      }),
    ],
  }
}
