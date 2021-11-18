// 需要创建多个实例 所以不要export default
import axios from "axios";
export function request1(config) {
  // 1、创建实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 10000
  })

// 2.1请求拦截
instance.interceptors.request.use(
  config=>{
    return config
  },
  // 请求未成功发送时
  err=> {
    console.log(err)
  }
)
// 2.2响应拦截
instance.interceptors.response.use(
  res=>{
    return res
  },
  // 响应失败时
  err=> {
    console.log(err)
  }
)

  // 3、发送请求
  return instance(config)
}