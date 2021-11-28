<template>
<!-- 监听item点击事件跳转路由 -->
  <div class="baritem" @click="itemclick">
    <div v-if="isActive">
      <slot name="iconactive"></slot>
    </div>
    <div v-else>
      <slot name="icon"></slot>
    </div>
    <!-- 动态绑定样式 -->
  <div :style="activestyle">
    <!-- 具名插槽在模板里面的部分 -->
     <slot name="text"></slot>
  </div>
  </div>
</template>

<script>
export default {
name: 'TabBarItem',
// 点击哪个item就把对应的path传过来
props: {
  path:String,
  // 将用户设置的颜色传进来
  activecolor: {
    type: String,
    // 如果用户没有传就用默认的pink色
    default: 'pink'
  }
},
// data() {
//   return{
//     isActive: false
//   }
// },
//动态决定item颜色改变
computed: {
  isActive() {
    // 当点击的item的path在活跃路由里面时为true
    return this.$route.path.indexOf(this.path) !== -1
  },
  // 当前路由处于活跃时，也就是上面的isActive为true时，返回一个根据传入的用户设置的颜色设置字体颜色的style样式
  activestyle() {
  return this.isActive? {color: this.activecolor} : {}
  }
},
methods: {
  itemclick() {
    this.$router.push(this.path)
  }
}
}
</script>

<style>
.baritem {
 flex: 1;
 text-align: center;
 padding-bottom: 8px;
}
.baritem img {
  width: 24px;
  height: 24px;
  margin-top: 8px;
}
/* .active {
  color: red;
} */
</style>