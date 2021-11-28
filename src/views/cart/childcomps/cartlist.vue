<template>
  <div class="cartlist">
  <!-- <scroll class="content" ref="scroll"> -->
  <cartlistitem v-for="(item ,index) in cartlist" :key="index" :iteminfo='item'></cartlistitem>
  <!-- </scroll> -->
  </div>
</template>

<script>
import  {mapGetters} from 'vuex'
import scroll from 'components/common/scroll/scroll'
import cartlistitem from './cartlistitem.vue'
export default {
name: 'cartlist',
components: {
  scroll,
  cartlistitem,
},
computed: {
  ...mapGetters(['cartlist'])
},
// activated() {
//  this.$refs.sroll.refresh()
// }
}
</script>

<style scoped>
/* // .cartlist {
//   height:100%;
// } */
.cartlist {
  height: calc(100% - 100px);
  /* overflow: hidden; */

}

</style>