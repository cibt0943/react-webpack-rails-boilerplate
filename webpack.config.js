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
            // CSSをバンドルするための設定
            {
              loader: 'css-loader',
              options: {
                // CSS内のurl()メソッドの取り込み
                url: false,
                // ソースマップの作成
                sourceMap: IS_DEVELOPMENT,
                // Sass+PostCSSの場合は2を指定
                // 0 => no loaders (default);
                // 1 => postcss-loader;
                // 2 => postcss-loader, sass-loader
                importLoaders: 2,
              },
            },
            // PostCSSのための設定
            {
              loader: 'postcss-loader',
              options: {
                // PostCSS側でもソースマップを有効にする
                sourceMap: true,
                plugins: [
                  // Autoprefixerを有効化
                  // ベンダープレフィックスを自動付与する
                  require('autoprefixer')({ grid: true })
                ]
              },
            },
            // Sassをバンドルするための設定
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
