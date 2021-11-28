<template>
<div class="category">
  <navbar class="navbar"><template v-slot:center>商品分类</template></navbar>
  <leftbar :bardata="leftbardata" class="left"></leftbar>
  <div class="right">
  <!-- 复制的tabcontrol 平时隐藏， 当滚到原tabcontrol的offsetTop值时 让这个copy版显示 -->
  <tabcontrol :titles='["新款","热销","流行"]'  @tbclick='tbclick' 
  ref="tabcontrol2" class="copytabcontrol" v-show="iscopyshow"></tabcontrol>
  <!-- 监听滚动事件 千万不要再忘记传probeType -->
  <scroll class="content" ref="scroll" :probe-type-num='3' @srcoll='contentsrcoll'>
      <topimgs :imgs='topimg' @toploadimg='toploadimg'></topimgs>
      <tabcontrol :titles='["新款","热销","流行"]'  @tbclick='tbclick' ref="tabcontrol1"></tabcontrol>
      <goodslist :goods='goods[currenttab]'></goodslist>
  </scroll>
  </div>
</div>
</template>

<script>
import navbar from 'components/common/navbar/navbar.vue'
import leftbar from './childcomps/leftbar.vue'
import topimgs from './childcomps/topimgs.vue'
import scroll from '../../components/common/scroll/scroll.vue'
import tabcontrol from 'components/current/tabcontrol/tabcontrol.vue'
import goodslist from 'components/current/goods/goodslist'

import {getleftbar,gettopimg,getgoods} from 'network/categoryquest'


export default {
name: 'category',
components: {
  navbar,
  leftbar,
  topimgs,
  scroll,
tabcontrol,
goodslist,
// goods
},
data() {
  return {
    leftbardata: [],
    topimg: [],
    goods: {
     'new': [],
     'sell': [],
     'pop': []
    },
    tab: ['new','sell','pop'],
    currenttab: 'new',
    taboffsettop: 0,
    iscopyshow: false,
  }
},
created() {
  // 获取侧边导航栏数据
  getleftbar().then(res => {
    this.leftbardata = res.data.data.category.list
  })
  // 获取上部图片数据
   gettopimg().then(res => {
    this.topimg = res.data.data.list
     })
  // 获取tabcontrol下面的数据
   this.getgoods('new')
   this.getgoods('sell')
   this.getgoods('pop') 
},
methods: {
  // 点击tabcontrol里面的哪个类别 让currenttab等于tab里当前点击的类别索引值对应的数据
tbclick(index) {
  this.currenttab = this.tab[index]
  // 让两个tabcontrol点击保持一致
  this.$refs.tabcontrol2.currentindex = index
  this.$refs.tabcontrol1.currentindex = index
 },
//  根据传入类型参数获取对应数据并储存的函数
 getgoods(type) {
 getgoods(type).then(res=> {
    this.goods[type].push(...res.data)
  })
 },
//  上部图片加载完成 获取tabcontrol的offsetTop
toploadimg() {
 this.taboffsettop = this.$refs.tabcontrol1.$el.offsetTop
},
// 监听scroll滚动
contentsrcoll(position) {
 this.iscopyshow = -position.y >= this.taboffsettop
}
},
}
</script>

<style scoped>
.category {
  height: 100vh;
  position: relative;
  z-index: 999;
}
.navbar {
  background-color: rgb(255, 180, 180);
  font-size: 18px;
  color: #fff;
}
.right {
  position: absolute;
  width: 70%;
  height: calc(100% - 44px);
  top: 44px;
  left: 30%;
  background-color: #fff;
}
.content {
  height: 100%;
  overflow: hidden;
}
.copytabcontrol {
  background-color: #fff;
}

</style>