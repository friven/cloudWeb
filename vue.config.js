const { defineConfig } = require('@vue/cli-service')
const apiUrl = process.env.VUE_APP_API_IP
const netUrl = process.env.VUE_APP_NET_IP
module.exports = defineConfig({
  // transpileDependencies: true,
  devServer: {
    port: 8082, // 前端项目启动端口
    proxy: {
      '/api': {
        target: apiUrl, // 将所有请求代理到这台机器上
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // 正则匹配请求中的api替换为''
        }
      },
      '/net': {
        target: netUrl, // 将所有请求代理到这台机器上
        changeOrigin: true,
        pathRewrite: {
          '^/net': '' // 正则匹配请求中的api替换为''
        }
      }
    }
  }
})
