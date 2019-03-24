const path = require('path')
const fs = require('fs')
const jsYaml = require('js-yaml')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development'

  const config = jsYaml.safeLoad(fs.readFileSync('config/webpack.yml', 'utf-8'))[argv.mode]

  return {
    entry: './app/frontend/app.ts',

    output: {
      filename: '[name]-[hash].js',
      path: path.resolve(__dirname, config.public_root_path, config.output_path),
      // publicPath: '',
    },

    devtool: isDevelopment ? 'source-map' : 'none',

    resolve: {
      // modules: [
      //   "node_modules",
      //   path.resolve(__dirname, "app/webpacks"),
      // ],

      extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css'],
    },

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
                sourceMap: isDevelopment,
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
                  require('autoprefixer')({ grid: true }),
                ],
              },
            },
            // Sassをバンドルするための設定
            {
              loader: 'sass-loader',
              options: {
                // ソースマップの作成
                sourceMap: isDevelopment,
              },
            },
          ],
        },
      ],
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name]-[hash].css',
      }),
      new ManifestPlugin({
        fileName: 'manifest.json',
        // publicPath: プロダクトにて実際にJSへアクセスする際のパスと同様になるように指定
        publicPath: `/${config.output_path}/`,
        writeToFileEmit: true,
      }),
    ],

    // Configuration for dev server
    devServer: {
      // publicPath: プロダクトにて実際にJSへアクセスする際のパスと同様になるように指定
      publicPath: `/${config.output_path}/`,
      // contentBase: 公開するリソースのルートディレクトリ。未指定の場合はカレントディレクトリが起点になる。
      contentBase: path.resolve(__dirname, config.public_root_path, config.output_path),
      host: config.dev_server.host,
      // port: ポート番号。未指定の場合は8080が初期値になる。
      port: config.dev_server.port,
      // inline: ライブリロードを行うための設定。true or falseで指定。未指定の場合はtrue
      // inline: true,
      // hot: Hot Module Replacement(HMR)を有効にします。true or falseで指定。未指定の場合はtrue。
      // hot: true,
      disableHostCheck: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  }
}
