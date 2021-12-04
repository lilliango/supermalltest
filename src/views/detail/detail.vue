<template>
  <div class="ddetail">
    <dtnav class="dtnav" @navclick='navclick' ref="dtnav"></dtnav>
    <scroll class="content" ref="scroll" @srcoll='dtcontentscroll' :probeTypeNum='3'>
    <dtswiper :topimg="topimg"></dtswiper>
    <dtbaseinfo :goods="goods "></dtbaseinfo>
    <dtshop :shop="shop"></dtshop>
    <detailinfo :detailinfo='detailinfo' @dtimgload='dtimgload'></detailinfo>
    <goodsparams :goodsparams='goodsparams' ref="goodsparams"/>
    <commentinfo :commentinfo='commentinfo' ref="commentinfo"/>
    <!-- 直接使用之前封装的godslist，但是要主要goodsitem里面图片展示的方法 -->
    <goodslist :goods='recommends' class="recommends" ref="recommends"/>
    </scroll>
    <backtop @click.native="backtotop" v-show="isShowbt"></backtop>
    <bottom @addcart='adddtocart'/>
    <!-- <toast :message='message' :istoastshow='istoastshow'></toast> -->
  </div>
</template>

<script>
import dtnav from './childcomps/dtnav.vue'
import dtswiper from './childcomps/dtswiper.vue'
import dtbaseinfo from './childcomps/dtbaseinfo.vue'
import dtshop from './childcomps/dtshop.vue'
import detailinfo from './childcomps/detailinfo.vue'
import scroll from 'components/common/scroll/scroll'
import goodsparams from './childcomps/goodsparams.vue'
import commentinfo from './childcomps/commentinfo.vue'
import goodslist from 'components/current/goods/goodslist'
import bottom from './childcomps/bottom.vue'

import {getdetaildata,Goods,getrecom} from 'network/detailrequest'
import {itemlistenermixin,backtopmixin} from 'commonjsfile/mixin'
import {debounce} from 'commonjsfile/utils'
import {mapActions} from 'vuex'
// import toast from 'components/common/toast/toast'


export default {
name: 'detail',
components: {
  dtnav,
  dtswiper,
 dtbaseinfo,
 dtshop,
 detailinfo,
goodsparams,
commentinfo,
goodslist,
bottom,
 scroll,
//  toast
},
data() {
  return{
    id: null,
    topimg: [],
    goods: {},
    shop: {},
    detailinfo: {},
    goodsparams: {},
    commentinfo: {},
    recommends: [],
    themeTopYs: [],
    getThemeTopY: null,
    currentindex: 0,
    // istoastshow: false ,
    // message: ''
  }
},
mixins: [itemlistenermixin,backtopmixin],
created() {
  // 保存路由跳转过来所携带的id参数
  this.id = this.$route.params.id
  // 发送网络请求传入id参数（点击不同商品会传入不同的id，则会请求过来不同的数据）
  getdetaildata(this.id).then(res => {
    // console.log(res);
    // 轮播图数据
    const data = res.data.result
    this.topimg = data.itemInfo.topImages
    // 商品信息数据，把获取的数据传入一个对象里面（对象里已经对数据进行处理）
    this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
    // 店铺信息
    this.shop = data.shopInfo
    // 商品详情信息
    this.detailinfo = data.detailInfo
    // 商品参数信息
    this.goodsparams = data.itemParams
    // 评论信息
    if (data.rate.cRate != 0) {
      this.commentinfo = data.rate.list[0]
    }
})
 //  发送获取详情页推荐的请求
  getrecom().then(res=> {
    this.recommends = res.data.data.list
  })
  // 给获取元素offsetTop设置防抖
  this.getThemeTopY = debounce(()=> {
    this.themeTopYs = []
    this.themeTopYs.push(0)
    this.themeTopYs.push(this.$refs.goodsparams.$el.offsetTop)
    this.themeTopYs.push(this.$refs.commentinfo.$el.offsetTop)
    this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
  },200)
},
mounted() {
},
destroyed() {
  this.$bus.$off('goodsitemimgload',this.itemimglistener)
},
methods: {
  // 图片加载完成
  dtimgload() {
    // 混入里面已经定义好的刷新函数
   this.refresh()
  // 当图片加载完成后获取的值是正确的，但是图片加载完成事件会使他频繁调用所以也需要加入防抖中，然后在这边调用
  this.getThemeTopY()
  },
  // 导航栏点击 滚动到对应位置
  navclick(index) {
   this.$refs.scroll.scrollTo(0,-this.themeTopYs[index] ,500)
  },
  // 监听内容滚动位置
  dtcontentscroll(position) {
    this.isShowbt = -position.y > 1000
    // 获取滚动的y值
  let positionY = -position.y
 
  let length = this.themeTopYs.length
  // 遍历themeTopY，和元素的offsetTop作比较
  for(let i = 0; i < length;i++) {
    // 前三个需要判断 positionY大于等于上面元素的offsetTop 小于下面元素的offsetTop，最后一个只用判断positionY大于等于推荐商品的offsetTop
    // 因为滚动事件很频繁触发，所以需要一个变量currentindex
    if(this.currentindex !== i && 
    ((i < length - 1 && positionY>= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || 
    (i === length - 1 && positionY>= this.themeTopYs[i]))){
      this.currentindex = i
      this.$refs.dtnav.currentindex = i
    }
  }
  },
  // 加入购物车
  ...mapActions(['addcart']), // 引入mapActions 映射到组件中 就可以直接通过this.方法名使用
  adddtocart() {
    // 获取商品信息
    let productsinfo = {}
    productsinfo.img = this.topimg[0];
    productsinfo.title = this.goods.title;
    productsinfo.desc = this.goods.desc;
    productsinfo.price = this.goods.realPrice;
    productsinfo.id = this.id;
    productsinfo.count = 1;
    // 将商品加入vuex,actions返回promis函数 可以使外部监听到vuex里面的数据 应该在这里then监听商品添加成功
    // this.$store.dispatch('addcart',productsinfo).then(res => console.log(res))
    this.addcart(productsinfo).then(res => {
      // this.message = res;
      // this.istoastshow = true;
      // setTimeout(()=> {
      //   this.istoastshow = false
      // },1000)
      this.$toast.show(res)
    })
  }
}
}
</script>

<style scoped>
.ddetail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  /* padding-top: 44px; */
  height: 100vh;
}
.dtnav {
  position: relative;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.content {
  height: calc(100% - 44px - 50px);
  overflow: hidden;
}
.recommends {
  margin-top: 15px;
}
</style>