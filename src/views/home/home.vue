<template>
  <div id="home">

  <navbar class="homenav"><template v-slot:center>购物街</template></navbar>
  <!-- 把tabcontrol复制一份到这里，当下面滚动到一定位置后让这个tabcontrol显示 -->
  <tabcontrol :titles='["流行","新款","精选"]' class="copytabcontrol" v-show="istabcontrolshow" @tbclick='changegoods' ref="tabcontrol1"></tabcontrol>
  <scroll class="content" 
  ref="scroll" :probe-type-num='3' :pull-up-load='true' @srcoll="contentscroll" @pullingUp='loadmore'>
  <home-swiper :banners="banners" @swiperimgload='swiperimgload'></home-swiper>
  <homerecommend :recommends="recommends"></homerecommend>
  <fashion></fashion>
  <tabcontrol :titles='["流行","新款","精选"]' class="tabcontrol" @tbclick='changegoods' ref="tabcontrol2"></tabcontrol>
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
// import {debounce} from 'commonjsfile/utils'
import {itemlistenermixin} from 'commonjsfile/mixin'


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
     tabcontroloffsetTop : 0,
    //  istabFixed: false,
    istabcontrolshow: false,
    // 保存离开home页面前滚动的位置
    saveY: 0,
   }
 },
//  混入  不同组件之间复用相同的代码
mixins: [itemlistenermixin],
//  当组件被创建的时候 发送网络请求 请求数据
 created() {
  //  调用请求数据的方法
  this.gethomemultidata()
  this.getgoods('pop')
  this.getgoods('new')
  this.getgoods('sell')
 },
 mounted() {
  //  将refresh函数传入debounce函数，变量接收防抖函数返回的新函数（以便调用）
    //  this.$refs.scroll.refresh() 
  //  会频繁刷新，所以需要传入到防抖函数中
  // const refresh = debounce(this.$refs.scroll.refresh,200)
  // 监听事件总线的自定义事件($bus本身是undefined，要在main.js里面写Vue.prototype.$bus = new Vue(),在vue原型上定义$bus且赋值weivue实例)
  // this.itemimglistener = ()=>{  refresh()}
  // this.$bus.$on('goodsitemimgload',this.itemimglistener)
    // 图片加载完成后刷新scrollHeight，refresh可以解决scroll滚动时高度（scrollHeight）没有把图片计算进去而造成下拉不动
 },
//  回来时跳到之前离开时保存的位置
 activated() {
    // 最好先进行刷新
  // this.$refs.scroll.refresh()
  this.$refs.scroll.scrollTo(0,this.saveY,0)
   this.$refs.scroll.refresh()
 
 },
//  离开前保存滚动到的位置
 deactivated() {
  this.saveY = this.$refs.scroll.getscrollY()
  // 离开页面时 取消监听
  this.$bus.$off('goodsitemimgload',this.itemimglistener)
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
     this.$refs.scroll.finishPullUp()
    })
  },

// 点击tabcontrol切换当前的类型，以便根据当前类型获取goods数据
  changegoods(index) {
   this.currenttype = this.types[index]
  //  点击两个tabcontrol 让他们的当前点击index的保持一致 
   this.$refs.tabcontrol1.currentindex = index
   this.$refs.tabcontrol2.currentindex = index
  },
  // 点击回到顶部
  backtotop() {
  //  通过ref属性拿到scroll组件，然后拿到组件里面的scroll对象然后调用里面的scrollTo方法
  // scroll.vue里面封装了scrollTo方法，直接拿到组件对象调用封装好的scrollTo方法
    this.$refs.scroll.scrollTo(0,0,300)
 },
//  监听scroll滚动的位置
  contentscroll(position) {
    // 当滚动到-y值大于1000时 显示backtop按钮
   this.isShowbt = -position.y > 1000
  // 当滚动位置-y> tabcontrol的offsetTop值时 给tabcontrol固定定位  但是这个方法会导致固定定位受到Bcroll里面的transform的影响并不会固定在那个位置
  //  this.istabFixed = -position.y > this.tabcontroloffsetTop
  // 解决方法：copy一份tabcontrol到nav下面，添加相对定位设置z-index，添加v-show,平时隐藏，当滚动到大于offsetTop时显示出来
   this.istabcontrolshow = -position.y > this.tabcontroloffsetTop
  },
  // 上拉加载更多
  loadmore() {
    // 调用获取对应数据的方法
   this.getgoods(this.currenttype)
  },
  // 监听轮播图图片加载完成，加载完成后获取tabcontrol的offsetTop值,如果直接获取offsetTop是不准确的，因为图片没有加载完成
  swiperimgload() {
    // 获取 tabcontrol组件里面元素的的offsetTop,并保存到data里面(所有组件都有$el属性 可以获取内部元素)
  this.tabcontroloffsetTop = this.$refs.tabcontrol2.$el.offsetTop
  }
 }
}
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.homenav {
  background-color: var( --color-tint);
  color: #fff;
  /* 原生滚动时需要，但是下面的用了Bscroll滚动不会影响导航栏 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  
  z-index: 10; */
}
.tabcontrol{
  background-color: #fff;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.copytabcontrol {
  position: relative;
  z-index: 9;
}
</style>