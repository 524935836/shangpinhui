module.exports = {
  devServer: {
    port: 8000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://39.98.123.211',
        // pathRewrite: { '^/api': '' },
      }
    }
  }
}