<template>
  <div class="cart">
    <!-- 导航 -->
    <navbar class="nav">
      <template v-slot:center>
        购物车({{cartlength}})
      </template>
    </navbar>
    <!-- 购物车商品 -->
    <cartlist></cartlist>
    <!-- 底部 -->
    <cartbottombar/>
    <!-- 如果没有加购任何商品显示 -->
    <div class="bgc" v-show="cartlength === 0">购物车空空如也~</div>
  </div>
</template>

<script>
import navbar from 'components/common/navbar/navbar.vue'
import cartlist from './childcomps/cartlist.vue'
import cartbottombar from './childcomps/cartbottombar.vue'
// 引入mapGetters
import {mapGetters} from 'vuex'

export default {
  name: 'cart',
  components: { 
    navbar,
    cartlist ,
    cartbottombar,
    },
  computed: {
    // 可以直接把store里面的getters映射为组件里面的计算属性
  ...mapGetters(['cartlength'])
    }
}

</script>

<style scoped>
.cart {
height: 100%;
padding-top: 50px;
padding-bottom: 100px;
}
.nav {
  position: fixed;
  top: 0;
  background-color: rgb(252, 129, 150);
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  color: #fff;
}
.bgc{
  font-size: 24px;
  position: absolute;
  top: 300px;
  left: 120px;
  color: rgb(245, 185, 185);
}
</style>