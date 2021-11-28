<template>
  <div class="bottom">
    <div class="b-other ">
      <div class="ficon icon"></div>
      <div>客服</div>
    </div>
    <div class="b-other">
      <div class="sicon icon"></div>
      <div>店铺</div>
    </div>
    <div class="b-other">
      <div class="ticon icon"></div>
      <div>收藏</div>
    </div>
    <div class="car" @click="addtocart">
      加入购物车
    </div>
    <div class="buy">
      购买
    </div>
  </div>
</template>

<script >
export default {
name: 'bottom',
methods: {
  addtocart() {
    this.$emit('addcart')
  }
}
}
</script>

<style scoped>
.bottom {
  display: flex;
  position: fixed;
  width: 100%;
  height: 50px;
  background-color: #fff;
  text-align: center;
}
.b-other {
 flex: 1;
}
.car {
  width: 100px;
  line-height: 50px;
  background-color: rgb(240, 203, 104);
}
.buy {
  width: 80px;
  line-height: 50px;
  background-color: rgb(252, 85, 163);
  color: #fff;
}
.icon {
  margin: 4px 30px 3px;
  width: 22px;
  height: 22px;
  background: url('~assets/img/detail/detail_bottom.png') 0 0/100%;
}
.ficon {
  background-position: 0 -53px;
}
.sicon {
  background-position: 0 -98px;
}
</style>