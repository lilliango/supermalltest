<template>
   <div class="goodslist">
    <goodsitem v-for="(item,index) in goods" :key="index" :goodsitem="item"></goodsitem>
  </div>
</template>

<script>
import goodsitem from './goodsitem.vue'
export default {
name: 'goodslist',
components: {
  goodsitem,
},
props: {
  goods: {
    type: Array,
    default() {
      return []
    }
  }
}
}
</script>

<style>
.goodslist{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  
}
</style>