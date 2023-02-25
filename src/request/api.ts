// 定义接口格式：
// export  const  自定义接口名  =  (形参)  =>  instance.方法(路径，后端要的参数);
import instance from './request'
import { request } from './commonRequest'
import proRequest from './proRequest'
interface IloginParam {
  firstName: string;
  secondName: string;
}

interface IupdateNavStatus {
  id: string;
  navStatus: string;
}

// post请求 ，没参数
export const testAPI = () => instance.post('/test')

export const yiyanAPI = () => request.post('/yiyan')

export const blogAPI = () => proRequest.get('/blog/list')

// // post请求，有参数
// export const loginAPI = (data: IloginParam): dataAPI<IloginParam> =>
//   instance.post('/admin/login', data)

// // post请求 ，没参数，但要路径传参
export const StatusAPI = (data: IupdateNavStatus) =>
  instance.post(`/productCategory?ids=${data.id}&navStatus=${data.navStatus}`)

// //  get请求，没参数，
export const testGetApi = () => instance.get('/test')
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
