<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
export default {
name : 'scroll',
data() {
  return {
    scroll: null
  }
},
props: {
 probeTypeNum : {
   type: Number,
   default() {
     return 0
   }
 },
 pullUpLoad : {
   type: Boolean,
   default: false
 }
},
mounted() {
  // 创建better-scroll对象并保存
  this.scroll = new Bscroll(this.$refs.wrapper,{
    // 安装的最新版需要添加这个属性，才能顺利滑动
    observeDOM: true,
    // scroll里面的元素可以监听点击事件（button设不设置都行）
    click: true,
    // 使用scroll组件时父传值 一般是是3，动态决定是否实时监听，监听滚动位置时需要
    probeType: this.probeTypeNum,
    // 动态决定是否监听上拉加载
    pullUpLoad: this.pullUpLoad,
  })
  // 实时监听滚动位置
  this.scroll.on('scroll',position=> {
    // 把滚动事件和位置传出去，父组件使用时监听自定义事件且可以得到position的值
    this.$emit('srcoll',position)
    // 
  })
  // 监听滚动到底部上拉,传出自定义事件，监听到上拉事件后可以执行获取数据的方法（上拉加载更多）
  if(this.pullUpLoad) {
    this.scroll.on('pullingUp',()=>{
    this.$emit('pullingUp')
  })
  }
},
methods: {
  // 封装scrollTo方法
  scrollTo(x,y,time) {
    // better-scroll的滚动到某个位置的方法，参数：x,y,滚动时间
      this.scroll && this.scroll.scrollTo(x,y,time)
  },
  // 封装完成上拉函数
  finishPullUp() {
   this.scroll && this.scroll.finishPullUp()
  },
  // 封装刷新函数
  refresh() {
    this.scroll && this.scroll.refresh
  },
  // 封装获取滚动到的y值的方法
  getscrollY() {
    return this.scroll? this.scroll.y : 0
  }
}
}
</script>

<style scoped>

</style>