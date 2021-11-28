import { request1 } from "./request";
export function getdetaildata(id){
  return request1({
    url: '/detail',
    params: {
     iid: id,
    }
  })
}
// 把所需数据传到一个对象里面，到时候组件用这个对象里面的数据
export class Goods {
  constructor(itemInfo,columns,services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}
// 获取详情页里面推荐商品的数据
export function getrecom(){
  return request1({
    url: '/recommend'
  })
}