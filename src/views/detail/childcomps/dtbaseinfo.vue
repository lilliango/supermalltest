<template>
<div class="goods-info">
<div class="info-title">{{goods.title}}</div>
<div class="info-price">
  <span class="nprice">{{goods.newPrice}}</span>
  <span class="oprice">{{goods.oldPrice}}</span>
  <span class="disc" v-if="goods.discount">{{goods.discount}}</span>
</div>
<div class="info-other">
  <span class="sellnum">{{goods.columns[0]}}</span>
  <span class="colect">{{goods.columns[1]}}</span>
  <span class="serve">{{goods.services[goods.services.length - 3].name}}</span>
</div>
<div class="info-services">
  <span class="info-service-item">
    <img :src="goods.services[goods.services.length - 2].icon" alt="">
    <span>{{goods.services[goods.services.length - 2].name}}</span>
  </span>
  <span class="info-service-item">
    <img :src="goods.services[goods.services.length - 1].icon" alt="">
    <span>{{goods.services[goods.services.length - 1].name}}</span>
  </span>
</div>
</div>
</template>

<script>
export default {
name: 'dtbaseinfo',
props: {
  goods: {
    type: Object,
    default() {
      return {}
    }
  }
}
}
</script>

<style>
.goods-info {
  border-bottom: 4px solid rgb(235, 231, 231,0.6);
}
.info-title{
  font-size: 18px;
  padding: 8px;
}
.info-price{
  margin: 10px 8px;
  position: relative;
}
.info-price span {
  margin-right: 4px;
}
.info-price .nprice {
  font-size: 22px;
  color: var(--color-high-text);
}
.info-price .oprice {
  color: rgb(201, 198, 198);
  font-size: 12px;
  text-decoration: line-through;
}
.info-price .disc {
  position: absolute;
  top: -3px;
  background-color: var(--color-high-text);
  border-radius: 8px;
  padding: 3px 4px;
  font-size: 14px;
  color: #fff;
}
.info-other {
  position: relative;
  margin: 20px 8px 12px;
  padding-bottom: 5px;
  font-size: 12px;
  color: rgb(194, 187, 187);
  border-bottom: 1px solid rgba(199, 196, 196, 0.5);
}
.colect {
position: absolute;
left: 150px;
}
.serve {
position: absolute;
right: 0;
}
.info-services {
  font-size: 16px;
  margin: 18px 8px;
  display: flex;
  justify-content: space-between;
}
.info-service-item img {
  width: 14px;
  height: 14px;
  /* vertical-align: middle; */
}

</style>