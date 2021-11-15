<template>
  <div>
    <tab-bar>
    <!-- 每个item设置path属性传入路径 -->
      <tab-bar-item path='/home' activecolor="pink">
      <!-- 具名插槽在组件里面的部分 -->
      <!-- 不活跃时的图片 -->
        <template v-slot:icon>
         <img src="~assets/img/tabbar/home.svg" alt="">
        </template>
        <!-- 活跃时图片 -->
        <template v-slot:iconactive>
          <img src="~assets/img/tabbar/home_active.svg" alt="">
        </template>
        <template v-slot:text>
          首页
        </template>
      </tab-bar-item>

      <tab-bar-item path='/category' activecolor="skyblue">
      <template v-slot:icon>
         <img src="~assets/img/tabbar/category.svg" alt="">
        </template>
        <template v-slot:iconactive>
          <img src="~assets/img/tabbar/category_active.svg" alt="">
        </template>
        <template v-slot:text>
          分类
        </template>
      </tab-bar-item>

      <tab-bar-item path='/cart' activecolor="green">
      <template v-slot:icon>
         <img src="~assets/img/tabbar/shopcart.svg" alt="">
        </template>
        <template v-slot:iconactive>
          <img src="~assets/img/tabbar/shopcart_active.svg" alt="">
        </template>
        <template v-slot:text>
          购物车
        </template>
      </tab-bar-item>

      <tab-bar-item path='/profile' activecolor="purple">
      <template v-slot:icon>
         <img src="~assets/img/tabbar/profile.svg" alt="">
        </template>
        <template v-slot:iconactive>
          <img src="~assets/img/tabbar/profile_active.svg" alt="">
        </template>
        <template v-slot:text>
          我的
        </template>
      </tab-bar-item>
    </tab-bar>
  </div>
    
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar.vue'
import TabBarItem from 'components/common/tabbar/TabBarItem.vue'
export default {
name: 'maintabbar',
components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style>

</style>