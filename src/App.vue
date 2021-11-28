<template>
  <div id="app">
    <!-- 点击商品到详情页，每个商品都是不同的，所以要把detail页面排除到keep-alive外 -->
    <keep-alive exclude="detail">
      <router-view/>
    </keep-alive>
    <maintabbar/>
  </div>
</template>

<script>
import maintabbar from 'components/current/maintabbar/maintabbar'
export default {
  name: 'app',
  components: {
   maintabbar
  }
}
</script>


<style>
@import 'assets/css/base.css';
</style>
