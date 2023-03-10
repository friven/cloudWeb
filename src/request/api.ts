// 定义接口格式：
// export  const  自定义接口名  =  (形参)  =>  instance.方法(路径，后端要的参数);
import instance from './request'
import { request } from './commonRequest'
import proRequest from './proRequest'
import nodeRequest from './nodeRequest'
import { AxiosRequestConfig } from 'axios'
interface registerParam {
  userName: string;
  passWord: string;
  email: string;
}

interface loginParam {
  userName: string;
  passWord: string;
}

interface responstType {
  code: number;
  info: string;
}

// post请求 ，没参数
export const testAPI = () => instance.post('/test')

export const yiyanAPI = () => request.post('/yiyan')

export const blogAPI = () => proRequest.get('/blog/list')

// // post请求，有参数
// export const registerAPI = (data: registerParam) =>
//   nodeRequest.post('/register', data)
export const registerAPI = (data: registerParam) =>
  instance.post('/user/register', data)

// // post请求，有参数
// export const loginAPI = (data: loginParam) =>
//   nodeRequest.post('/login', data)
export const loginAPI = (data: loginParam) =>
  instance.post('/user/login', data)

// 获取好友申请列表
export const getFriend = (userId: string | undefined) =>
  instance.get(`/friend/queryFriendRequestList?userId=${userId}`)

export const getapplicatNum = (userId: string | undefined) =>
  instance.get(`/friend/hadFriendRequest?userId=${userId}`)

// 搜索用户
export const searchUser = (phoneNumber: string | undefined) =>
  instance.get(`/user/queryUser?phoneNumber=${phoneNumber}`)

// // post请求 ，没参数，但要路径传参
// export const StatusAPI = (data: IupdateNavStatus) =>
// instance.post(`/productCategory?ids=${data.id}&navStatus=${data.navStatus}`)

// //  get请求，没参数，
export const testGetApi = () => instance.get('/test')

export const getFriendsAPI = (userID: string) => nodeRequest.get('/getFriends?userID=' + userID)
// 箭头函数带不带大括号的区别
// 首先不加{}，这时箭头函数指向的就是这个函数的返回值，用在只返回返回值的时候，只写一个箭头，就行
// 另一种加{}，这就是一个代码块跟之前没区别，还是要写上返回值，就是要return 东西，不然什么也得不到

// // get请求，有参数，路径也要传参
// export const ProductCategoryApi = (params: IUseTableParam): dataAPI<any> =>
//   instance.get(`/productCategory/list/${params.parentId}`, { params })

// // get请求，有参数，
// export const AdminListAPI = (
//   params: IAdminListParam
// ): dataAPI<AdminListDate> => instance.get('/admin/list', { params })
