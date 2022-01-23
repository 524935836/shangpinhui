module.exports = {
  // 不打包map文件
  // productionSourceMap: false,
  // 关闭ESLINT校验工具
  // lintOnSave: false,
  devServer: {
    port: 8000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://39.98.123.211',
        // pathRewrite: { '^/api': '' },
      }
    }
  },
  chainWebpack: config => {
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-prod.js')

      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        nprogress: 'NProgress',
        swiper: 'Swiper',
        'vee-validate': 'VeeValidate',
        mockjs: 'Mock',
        qrcode: 'QRCode',
        'vue-lazyload': 'VueLazyload',
        vuex: 'Vuex'
      })

      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })

    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')

      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
  }
}