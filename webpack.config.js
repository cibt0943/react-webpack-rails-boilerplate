const path = require('path')

module.exports = (env, argv) => {
  return {
    entry: './app/frontend/app.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'public', argv.out || 'packs'),
    },
  }
}
