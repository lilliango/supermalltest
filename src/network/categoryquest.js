import { request1 } from "./request";
// 请求左侧导航栏数据的函数
export function getleftbar() {
 return request1({
   url: 'category'
 })
}
// 请求右上侧图片数据的函数
export function gettopimg() {
  return request1({
    url: 'subcategory',
    params: {
      maitKey: 3627
    }
  })
}
// 右下侧tabcontrol对应数据请求的函数
export function getgoods(type) {
  return request1({
    url: 'subcategory/detail',
    params: {
      miniWallkey: 10062603,
      type,
    }
  })
}