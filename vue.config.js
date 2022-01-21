module.exports = {
  // 不打包map文件
  // productionSourceMap: false,
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