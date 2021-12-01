<template>
<div class="category">
  <!-- 顶部 -->
  <navbar class="navbar"><template v-slot:center>商品分类</template></navbar>
  <!-- 左侧 -->
  <leftbar :bardata="leftbardata" class="left" @leftbarclick='leftbarclick'></leftbar>
  <!-- 右侧 -->
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
    maitKey: 3627,
    miniWallkey: 10062603,
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
  // 获取左侧第一栏 上部图片数据
   gettopimg(this.maitKey).then(res => {
    this.topimg = res.data.data.list
     })
  // 获取左侧第一栏 的tabcontrol下面的数据 一开始使用push是不行的，要用=赋值  ...res.data是因为一开始使用push，res.data是数组
   getgoods(this.miniWallkey,'new').then(res =>this.goods['new'] = [...res.data])
   getgoods(this.miniWallkey,'sell').then(res =>this.goods['sell'] = res.data)
   getgoods(this.miniWallkey,'pop').then(res =>this.goods['pop']= res.data)
},
methods: {
  // 左侧导航栏点击，传入从leftbar页面对应参数，通过点击获取的不同参数获取不同数据展示
  leftbarclick(maitKey,miniWallkey) {
    // 根据点击时获取的maitkey获取不同数据 并保存
     gettopimg(maitKey).then(res => {
    this.topimg = res.data.data.list
     })
    //  根据点击时获取的miniWallkey,和type获取不同数据
     getgoods(miniWallkey,'new').then(res=> {
    this.goods['new'] = res.data
  })
   getgoods(miniWallkey,'sell').then(res=> {
    this.goods['sell'] = res.data
  })
   getgoods(miniWallkey,'pop').then(res=> {
    this.goods['pop'] = res.data
  })
  //  this.maitKey = maitKey
  //  this.miniWallkey = miniWallkey
  //  this.index = index
  //  console.log(maitKey,miniWallkey )
  },
  // 点击tabcontrol里面的哪个类别 让currenttab等于tab里当前点击的类别索引值对应的数据
tbclick(index) {
  this.currenttab = this.tab[index]
  // 让两个tabcontrol点击保持一致
  this.$refs.tabcontrol2.currentindex = index
  this.$refs.tabcontrol1.currentindex = index
 },
//  根据传入类型参数获取对应数据并储存的函数
//  getgoods(type) {
//  getgoods(miniWallkey,type).then(res=> {
//     this.goods[type].push(...res.data)
//   })
//  },
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
  width: 80%;
  height: calc(100% - 44px);
  top: 44px;
  left: 20%;
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