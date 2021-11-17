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
mounted() {
  this.scroll = new Bscroll(this.$refs.wrapper,{
    // 安装的最新版需要添加这个属性
    observeDOM: true,
  })
}
}
</script>

<style scoped>

</style>