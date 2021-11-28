<template>
  <div class="botttombar">
  <checkbutton class="butt" :ischecked='allchecked' @click.native="allcheckclick"></checkbutton>
  <span class="select">全选</span>
  <span class="totalprice">合计:{{totalprice}}</span>
  <span class="tobuy" @click="buyclick">去结算({{totalcount}})</span>
  </div>
</template>

<script>
import checkbutton from 'components/common/checkbutton/checkbutton'
export default {
name: 'cartbottombar',
components: {
  checkbutton,
},
computed: {
  totalprice() {
    // 总价格是 购物车中所有选中商品的单价x数量 之和，
    // filter 返回是选中状态的商品组成的数组
   return '￥' + this.$store.getters.cartlist.filter(item=> {
     return item.checked === true
    //  然后reduce 对选中状态的商品的总价进行累加
   }).reduce((pre,item)=> {
     return pre + item.price * item.count
   },0).toFixed(2)
  },
  totalcount() {
    return this.$store.getters.cartlist.filter(item=> {
     return item.checked === true
   }).reduce((pre,item)=> {
     return pre + item.count
   },0)
  },
  // 商品全部选中，allchecked变成true 则全选也选中，有一个商品不选中，全选不选中
  allchecked() {
      // 因为购物车里面没有数据的时候会返回true 所以要先判断购物车是否有数据  没有数据直接为false
    // 购物车中如果可以找到有为未选中状态的商品，则将返回值取反后为false，找不到返回值取反后为true
    if(this.$store.getters.cartlist.length !== 0) {
      return !this.$store.getters.cartlist.find(item => {return item.checked === false})
    }else {
      return false
    }
  }
},
methods: {
  // 全选按钮点击事件
  allcheckclick() {
    // 商品全部选中时，点击后全不选中
    if(this.allchecked) {
    //  让所有商品的选中状态为false
    this.$store.getters.cartlist.forEach(item => {
      item.checked = false
    })
    }else{
    this.$store.getters.cartlist.forEach(item => {
      item.checked = true
    })
    }
  },
  // 当没有商品被选中时点击去结算按钮 会弹出提示框
  buyclick() {
    if(!this.$store.getters.cartlist.find(item => {return item.checked === true})) {
      this.$toast.show('请选择商品!')
    }
  }
}
}
</script>

<style>
.botttombar {
  height: 50px;
  width: 100%;
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
  z-index: 999;
  /* bottom:150px; */
  background-color: #fff;
  box-shadow: 0 -2px rgba(100, 100, 100, 0.1);
}
.botttombar  .butt {
  margin-top: 15px;
  margin-left: 10px;
}
.select {
  position: absolute;
  top: 18px;
  left: 33px;
}
.totalprice {
  position: absolute;
  top: 18px;
  left: 85px;
}
.botttombar .tobuy {
display: inline-block;
position: absolute;
top: 0;
right: 0;
height: 50px;
width: 120px;
text-align: center;
line-height: 50px;
background-color: rgb(253, 99, 78);
color: #fff;
}
</style>