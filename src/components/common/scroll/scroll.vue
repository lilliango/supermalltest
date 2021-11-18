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
   type: Boolean
 }
},
mounted() {
  // 创建better-scroll对象并保存
  this.scroll = new Bscroll(this.$refs.wrapper,{
    // 安装的最新版需要添加这个属性，才能顺利滑动
    observeDOM: true,
    // scroll里面的元素可以监听点击事件（button设不设置都行）
    click: true,
    // 使用scroll组件时父传值，动态决定是否实时监听，监听滚动位置时必须写这个属性未true
    probeType: this.probeTypeNum,
    // 动态决定是否监听上拉加载
    pullUpLoad: this.pullUpLoad,
  })
  // 实时监听滚动位置
  this.scroll.on('scroll',position=> {
    // 把滚动事件和位置传出去，父组件使用时监听自定义事件且可以得到position的值
    this.$emit('srcoll',position)
  })
  // 监听上拉
  this.scroll.on('pullingUp',()=>{
    this.$emit('pullingUp')

  })
},
methods: {
  // 封装scrollTo方法
  scrollTo(x,y,time=500) {
    // better-scroll的滚动到某个位置的方法，参数：x,y,滚动时间
      this.scroll.scrollTo(x,y,time)
  }
}
}
</script>

<style scoped>

</style>