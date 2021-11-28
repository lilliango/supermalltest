<template>
  <div class="goodsitem" @click="goddsitemclick">
    <!-- 图片使用懒加载 -->
    <img v-lazy ="showimg" alt="" @load="imgload">
    <div class="goodsinfo">
      <p>{{goodsitem.title}}</p>
      <span class="price">￥{{goodsitem.price}}</span>
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
},
computed:{
 showimg() {
   return  this.goodsitem.img || this.goodsitem.image || this.goodsitem.show.img
 }
},
methods: {
  // 监听图片加载完成，加载完成后发送一个事件，在homevue里面监听图片加载完成调用sroll组件scroll实例的刷新
  imgload() {
    // 事件总线，像事件总线发送自定义事件，在另外组件监听
    this.$bus.$emit('goodsitemimgload')
  },
  // 监听每个商品的点击，跳转到详情页，并且把里面的iid参数传过去
  goddsitemclick() {
    this.$router.push('/detail/' + this.goodsitem.iid)
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