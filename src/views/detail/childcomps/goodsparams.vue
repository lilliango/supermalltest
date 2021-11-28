<template>
  <div class="goodsparams" v-if="Object.keys(goodsparams).length != 0">
  <table class="rule">
    <tr v-for="(item,index) in goodsparams.rule.tables[0]" :key="index">
      <td v-for="(itm,ind) in item" :key="ind">{{itm}}</td>
    </tr>
  </table>
  <div class="middle"></div>
  <table class="info">
    <tr v-for="(item,index) in goodsparams.info.set " :key="index">
      <td class="info-key">{{item.key}}</td>
      <td class="info-value">{{item.value}}</td>
    </tr>
  </table>
  <div class="info-img" v-if="goodsparams.info.image">
    <img :src="goodsparams.info.image[0]" alt="">
  </div>
  </div>
</template>

<script>
export default {
name : 'goodsparams',
props: {
  goodsparams: {
    type: Object,
    default() {
      return {}
    }
  }
}
}
</script>

<style>
.goodsparams {
  padding: 20px 15px;
  font-size: 14px;
   border-bottom: 4px solid rgb(196, 193, 193,0.3);
}
/* .rule {
  /* margin-left: 8px; */
 
/* } */ 
.middle {
   border-bottom: 2px solid rgb(196, 193, 193,0.5);
}
.rule,.info {
  width: 100%;
  border-collapse: collapse;
}
.goodsparams table tr {
  height: 46px;
}
.goodsparams table tr td {
  border-bottom: 1px solid rgba(100,100,100,0.1);
}
.info-key {
  /* 当value内容多的时候会挤到 所以给固定宽度 */
  width: 60px;
}
.info-value {
  padding-left: 30px;
  color: var(--color-high-text);
}
</style>