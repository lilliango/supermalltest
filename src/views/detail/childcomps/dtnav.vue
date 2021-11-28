<template>
  <div>
    <navbar class="navbar">
      <template v-slot:left>
        <img src="~assets/img/common/back.svg" alt="" class="back" @click="backclick">
      </template>
      <template v-slot:center>
        <span v-for="(item,index) in titles" :key="index" 
        class="titles" 
        :class="{activeclass:currentindex === index}" @click="titleclick(index)">{{item}}</span>
      </template>
    </navbar>
  </div>
</template>

<script>
import navbar from 'components/common/navbar/navbar'
export default {
name: 'dtnav',
components: {
  navbar
},
data() {
  return {
    titles: ['商品','参数','评论','推荐'],
    currentindex : 0,
  }
},
methods: {
  // 点击哪个把哪个的index赋值给currentindex，用于绑定类的判断 改变颜色
  titleclick(index) {
   this.currentindex = index
  //  传出一个导航栏点击事件，用于 点击滚动到对应内容
   this.$emit('navclick',index)
  },
  // 返回图片点击事件
  backclick() {
    this.$router.back()
  }
}
}
</script>

<style>
.navbar {
  background-color: #fff;
}
.back {
  margin: 11px 12px;
}
.titles {
  margin:0 15px;
  font-size: 16px;
}
.activeclass{
  color: var(--color-high-text) ;
}
</style>