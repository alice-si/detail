const Dotenv = require('dotenv-webpack')

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new Dotenv()
    ]
  }
}
