module.exports = {
  configureWebpack: {
    // 解决路径相关
    resolve: {
      alias: {
        assets: '@/assets',
        commonjsfile: '@/commonjsfile',
        components: '@/components',
        network: '@/network',
        views: '@/views',
      }
    }
  }
}