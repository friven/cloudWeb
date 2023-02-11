import axios from 'axios'
// 创建axios实例
export const request = axios.create({
  baseURL: '/net', // 所有的请求地址前缀部分  使用代理后只需要用api标识为代理即可
  timeout: 5000 // 请求超时时间(毫秒)
})
