<template>
<div class="shop-info">
 <div class="shop-top">
   <img :src="shop.shopLogo" alt="">
   <span>{{shop.name}}</span>
 </div>
 <div class="shop-middle">
   <div class="shop-middle-left shop-middle-item">
     <div class="info-sells">
       <div class="sells-count">
         {{shop.cSells | showcount}}
       </div>
       <div class="sells-text">总销量</div>
     </div>
     <div class="all-goods">
       <div class="goods-acount">
         {{shop.cGoods}}
       </div>
       <div class="goods-text">全部宝贝</div>
     </div>
   </div>
   <div class="shop-middle-right shop-middle-item">
     <table class="tbinfo" cellspacing= 10>
       <tr v-for="(item,index) in shop.score" :key="index">
         <td>{{item.name}}</td>
         <td :class="{bettercolor:item.isBetter}" class="normalcolor">{{item.score}}</td>
         <td :class="{betterstyle: item.isBetter}" class="normalstyle">{{item.isBetter? '高' :'低'}}</td>
       </tr>
     </table>
   </div>
 </div>
 <div class="shop-end">
   <a href=""><span>进店逛逛</span></a>
 </div>
</div>
</template>

<script>
export default {
name : 'dtshop',
props: {
  shop: {
    type: Object,
    defualt() {
      return {}
    }
  }
},
 filters: {
    showcount(value) {
     if(value < 10000) return value;
     return (value/10000).toFixed(1) + '万'
    }
  },
}
</script>

<style>
.shop-info {
  padding-top: 25px;
  padding-bottom: 25px;
  border-bottom: 2px solid rgba(199, 196, 196, 0.5);
}
.shop-top img {
  margin-left: 8px;
 width: 60px;
 height: 60px;
 border: 1px solid rgba(209, 204, 204, 0.9);
 border-radius: 30px;
 vertical-align: middle;
}
.shop-top span {
  margin-left: 10px;
  font-size: 18px;
  color: #666;
}
.shop-middle {
  display: flex;
  font-size: 14px;
}
.shop-middle-item {
  flex: 1;
}
.shop-middle-left {
  display: flex;
  padding-top: 10px;
  padding-right: 20px;
  border-right: 2px solid rgb(216, 212, 212);
}
.info-sells, .all-goods {
  flex: 1;
  text-align: center;
  margin: 20px 6px;
}
.sells-count ,.goods-acount {
  font-size: 20px;
  margin-bottom: 6px;
}
.shop-middle-right {
  margin-left: 30px;
}
.tbinfo {
  text-align: center;
}
.normalstyle {
  background-color: green;
  padding: 2px;
  color: #fff; 
}
.normalcolor {
  color: green;
}
.bettercolor {
  color: red;
}
.betterstyle{
  background-color: red;
}
.shop-end span {
  display: block;
  width: 150px;
  height: 30px;
  background-color: rgb(241, 239, 239);
  font-size: 14px;
  line-height: 30px;
  text-align: center;
  border-radius: 15px;
  margin-top: 10px;
  margin-left: 110px;
}
</style>