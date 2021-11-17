<template>
  <div class="goodsitem">
    <img :src="goodsitem.show.img" alt="">
    <div class="goodsinfo">
      <p>{{goodsitem.title}}</p>
      <span class="price">{{goodsitem.price}}</span>
      <span class="collect">{{goodsitem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
name: 'goodsitem',
props: {
  goodsitem: {
    type: Object,
    default() {
      return {}
    }
  }
}
}
</script>

<style>
.goodsitem{
  position: relative;
  padding-bottom: 40px;
  width: 47%;
}
.goodsitem img {
  width: 100%;
  border-radius: 5px;
}
.goodsinfo{
  position: absolute;
  right: 0;
  left: 0;
  bottom: 5px;
  font-size: 12px;
  text-align: center;
  overflow: hidden;

}
.goodsinfo p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 3px;
}
.price {
  color: var(--color-tint);
  margin-right: 25px;
}
.goodsinfo .collect{
  position: relative;
}
.goodsinfo .collect::before {
content: '';
position: absolute;
left: -15px;
top:-2px;
width: 14px;
height: 14px;
background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
}

</style>