import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store =  new Vuex.Store({
  state: {
    cartlist: [],
  },
  mutations: {
    addcount(state,payload) {
      payload.count += 1
    },
    addtocart(state,payload) {
      // 这里没有先添加这个属性，又搞出bug
     payload.checked = false
     state.cartlist.push(payload)
     
    }
    
  },
  actions: {
    addcart(context,payload) {
     return new Promise((resolve,reject) => {
        // 通过find查找添加的商品id和cartlist里面的商品id是否有相等，相等则返回添加的商品 赋值给变量，否则这个变量为undefined
                      //这里掉了context白花了了四十分钟！！！
      let oldproduct = context.state.cartlist.find(item => item.id === payload.id)
      // 这个变量有值（说明商品已经存在）则让该商品count加1  否则将商品添加到cartlist里面
      if(oldproduct) {
        context.commit('addcount',oldproduct)
        resolve('该商品已经在购物车中，快去购物车看看吧')
      }else{
        context.commit('addtocart',payload)
        resolve('加入购物车成功')
      }
     })
  }
  },
  getters: {
    // 别忘记state！
   cartlength(state) {
     return  state.cartlist.length
   },
   cartlist(state) {
     return state.cartlist
   }
  },
  modules: {
  }
})
export default store
