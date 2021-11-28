<template>
  <div class="item">
    <checkbutton :ischecked ="iteminfo.checked" @click.native ="btnclick" class="btn"></checkbutton>
   <div class="img it">
      <img :src ="iteminfo.img" alt="">
   </div>
   <div class="item-info it">
     <div class="title">{{iteminfo.title}}</div>
     <div class="desc">{{iteminfo.desc}}</div>
     <div class="item-info-bottom">
       <span class="price">￥{{iteminfo.price}}</span>
       <span class="count">x{{iteminfo.count}}</span>
     </div>
   </div>
  </div>
</template>

<script>
import checkbutton from 'components/common/checkbutton/checkbutton'
export default {
name: 'cartlistitem',
props: {
  iteminfo: {
    type: Object,
    defualt() {
      return {}
    }
  }
},
components: {
  checkbutton,
},
methods: {
  btnclick() {
    this.iteminfo.checked = !this.iteminfo.checked 
  }
}
}
</script>

<style scoped>
.item {
  padding: 15px 10px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.3);
  display: flex;
}
.btn {
   margin-top: 70px;
  margin-right: 5px;
}
.it {
  flex: 1;
} 
.img img {
  width: 100px;
  height: 150px;
  border-radius: 15px;
}
.title ,.desc {
  width: 220px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 10px;
  padding: 0;
}
.title {
  font-size: 18px;
  color: black;
  margin-bottom: 10px;
}
.item-info-bottom {
  display: flex;
   justify-content: space-between;
  margin: 20px 15px 0 10px;
  font-size: 18px;
}
.price {
  color: rgb(255, 67, 67);
}
</style>