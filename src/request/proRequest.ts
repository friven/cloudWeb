import axios from 'axios'
// 创建axios实例
const proRequest = axios.create({
  baseURL: '/pro', // 所有的请求地址前缀部分  使用代理后只需要用api标识为代理即可
  timeout: 5000 // 请求超时时间(毫秒)
  // withCredentials: true // 异步请求携带cookie
  // headers: {
  // 设置后端需要的传参类型
  // 'Content-Type': 'application/json',
  // 'token': x-auth-token',//一开始就要token
  // 'X-Requested-With': 'XMLHttpRequest',
  // },
})

// request拦截器
proRequest.interceptors.request.use(
  config => {
    // 如果你要去localStor获取token
    // let token = localStorage.getItem("x-auth-token");
    // if (token) {
    //     config.headers = {"x-auth-token": token}
    // }
    return config
  },
  error => {
    // 对请求错误做些什么
    Promise.reject(error)
  }
)

// response 拦截器
proRequest.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response.data
  },
  error => {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
export default proRequest
