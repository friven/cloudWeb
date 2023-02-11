const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // transpileDependencies: true,
  devServer: {
    port: 8082, // 前端项目启动端口
    proxy: {
      '/api': {
        target: 'http://1.13.176.99:8080', // 将所有请求代理到这台机器上
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // 正则匹配请求中的api替换为''
        }
      },
      '/net': {
        target: 'https://tenapi.cn/v2', // 将所有请求代理到这台机器上
        changeOrigin: true,
        pathRewrite: {
          '^/net': '' // 正则匹配请求中的api替换为''
        }
      }
    }
  }
})
