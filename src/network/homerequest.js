import { request1 } from "./request";
export function gethomemultidata() {
  return request1({
  url: '/home/multidata'
  })
}
export function getgoods(){
  return request1({
    url: '/home/data'
  })
}