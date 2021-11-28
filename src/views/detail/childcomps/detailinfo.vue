<template>
  <div v-if="Object.keys(detailinfo).length != 0" class="goods-dtinfo">
    <div class="desc">{{detailinfo.desc}}</div>
    <div class="end"></div>
    <div v-for="(item,index) in detailinfo.detailImage" :key="index" class="maininfo">
      <div class="info-key">{{item.key}}</div>
      <img v-for="(itm,ind) in item.list " :key="ind" :src="itm" alt="" @load='dtinnfoimgload'>
    </div>
  </div>
</template>

<script>
export default {
name : "detailinfo",
props: {
  detailinfo: {
    type: Object,
    default() {
      return {}
    }
  }
},
methods: {
  dtinnfoimgload() {
    this.$emit('dtimgload')
  }
}
}
</script>

<style>
.goods-dtinfo {
   border-bottom: 4px solid rgba(214, 211, 211, 0.3); 
}
.desc {
  padding: 20px 8px;
}
.end {
  margin-left: 210px;
  width: 150px;
  border-bottom:  2px dotted rgb(77, 74, 74);
}
.maininfo {
  width: 100%;
}
.maininfo .info-key {
  width: 100px;
  padding: 10px 8px;
}
.maininfo img {
  width: 100%;
}
</style>