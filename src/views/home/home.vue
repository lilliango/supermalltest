<template>
  <div id="home">

  <navbar class="homenav"><template v-slot:center>购物街</template></navbar>
  <scroll class="content" 
  ref="scroll" :probe-type-num='3' :pull-up-load='true' @srcoll="contentscroll" @pullingUp='loadmore'>
  <home-swiper :banners="banners"></home-swiper>
  <homerecommend :recommends="recommends"></homerecommend>
  <fashion></fashion>
  <tabcontrol :titles='["流行","新款","精选"]' class="tabcontrol" @tbclick='changegoods'></tabcontrol>
  <goodslist :goods='goods[currenttype].list'></goodslist>
  </scroll>
  <!-- 监听组件的原生事件时，要加上.native -->
  <backtop @click.native="backtotop" v-show="isShowbt"></backtop>
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
import backtop from 'components/current/backtop/backtop'

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
backtop,
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
     currenttype : 'pop',
     isShowbt: false,
   }
 },
//  当组件被创建的时候 发送网络请求 请求数据
 created() {
  //  调用请求数据的方法
  this.gethomemultidata()
  this.getgoods('pop')
  this.getgoods('new')
  this.getgoods('sell')
  // 监听事件总线的自定义事件($bus本身是undefined，要在main.js里面写Vue.prototype.$bus = new Vue(),在vue原型上定义$bus且赋值weivue实例)
  this.$bus.$on('goodsitemimgload',()=>{
    // 图片加载完成后刷新scrollHeight，可以解决scroll滚动时高度（scrollHeight）没有把图片计算进去而造成下拉不动
   this.$refs.scroll.scroll.refresh()
  })
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
      // 加载数据完成后，为了可以继续上拉加载,调用scroll对象里面的以下方法
     this.$refs.scroll.scroll.finishPullUp()
    })
  },


  changegoods(index) {
   this.currenttype = this.types[index]
  },
  backtotop() {
  //  通过ref属性拿到scroll组件，然后拿到组件里面的scroll对象然后调用里面的scrollTo方法
  // scroll.vue里面封装了scrollTo方法，直接拿到组件对象调用封装好的scrollTo方法
    this.$refs.scroll.scrollTo(0,0)
 },
//  当滚动到-y值大于1000时 显示backtop按钮
  contentscroll(position) {
    // 主要position.y是负数
   this.isShowbt = -position.y > 1000
  },
  // 加载更多
  loadmore() {
    // 调用获取对应数据的方法
   this.getgoods(this.currenttype)
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