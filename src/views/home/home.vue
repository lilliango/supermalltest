<template>
  <div id="home">

  <navbar class="homenav"><template v-slot:center>购物街</template></navbar>
  <scroll class="content">
  <home-swiper :banners="banners"></home-swiper>
  <homerecommend :recommends="recommends"></homerecommend>
  <fashion></fashion>
  <tabcontrol :titles='["流行","新款","精选"]' class="tabcontrol" @tbclick='changegoods'></tabcontrol>
  <goodslist :goods='goods[currenttype].list'></goodslist>
  </scroll>
  
  </div>
</template>

<script>
import HomeSwiper from './childcomps/homeswiper.vue'
import homerecommend from './childcomps/homerecommend.vue'
import fashion from './childcomps/fashion.vue'

import navbar from 'components/common/navbar/navbar'
import tabcontrol from 'components/current/tabcontrol/tabcontrol'
import goodslist from 'components/current/goods/goodslist'
import scroll from 'components/common/scroll/scroll'

import {gethomemultidata,getgoods} from 'network/homerequest'

export default {
name: 'home',
components: {
  navbar,
HomeSwiper,
homerecommend,
fashion,
tabcontrol,
goodslist,
scroll,
 },
//  data用于存储请求过来的数据
 data() {
   return {
     banners: [],
     recommends: [],
     goods: {
        'pop' : {page: 0 , list: []},
        'new' : {page: 0 , list: []},
        'sell' : {page: 0 , list: []}
     },
     types: ['pop','new','sell'],
     currenttype : 'pop'
   }
 },
//  当组件被创建的时候 发送网络请求 请求数据
 created() {
  //  调用请求数据的方法
  this.gethomemultidata()
  this.getgoods('pop')
  this.getgoods('new')
  this.getgoods('sell')
 },

 methods: {
  //  把数据请求封装到方法里面
   gethomemultidata() {
     gethomemultidata().then(res=> {
    this.banners = res.data.data.banner.list
    this.recommends = res.data.data.recommend.list
   })
  },
  getgoods(type) {
    let page = this.goods[type].page + 1
    getgoods(type,page).then(res=>{
    this.goods[type].list.push(...res.data.data.list)
      this.goods[type].page++
      // console.log(res)
    })
  },

  changegoods(index) {
   this.currenttype = this.types[index]
  }
 }

}
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.homenav {
  background-color: var( --color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  
  z-index: 10;
}
.tabcontrol{
  position: sticky;
  top: 44px;
  background-color: #fff;
  z-index: 9;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>