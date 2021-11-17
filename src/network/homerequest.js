import { request1 } from "./request";
export function gethomemultidata() {
  return request1({
  url: '/home/multidata'
  })
}
export function getgoods(type,page){
  return request1({
    url: '/home/data',
    params: {
      type,
      page,
    }
  })
}