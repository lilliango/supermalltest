<template>
  <div class="commentinfo" v-if="Object.keys(commentinfo).length != 0">
   <div class="com-head">
     <span class="left">用户评价</span>
     <span class="right">更多></span>
   </div>
  <div class="info-user">
    <img :src="commentinfo.user.avatar" alt="">
    <span>{{commentinfo.user.uname}}</span>
  </div>
  <div class="info-detail">
    <p>{{commentinfo.content}}</p>
    <div class="info-other">
      <span>{{commentinfo.created | dateform }}</span>
      <span>{{commentinfo.style}}</span>
    </div>
    <div class="info-img">
      <img v-for="(item,index) in commentinfo.images" :key="index"  :src="item" alt="">
    </div>
  </div>
  </div>
</template>

<script>
export default {
name: 'commentinfo',
props: {
  commentinfo: {
    type: Object,
    default() {
      return {}
    }
  }
},
filters: {
  dateform(value) {
    const date = new Date(value  * 1000)
    let y = date.getFullYear()
    let M = date.getMonth() + 1
    M = M < 10 ? ('0' + M) : M
    let d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    let h = date.getHours()
    h = h < 10 ? ('0' + h) : h
    let min = date.getMinutes()
    min = min < 10 ? ('0' + min) : min
    let sec = date.getSeconds()
    sec = sec < 10 ? ('0' + sec) : sec 
    return y + '-' + M + '-' + d + '    ' + h + ':' + min  + ':' + sec
  }
}
}
</script>

<style scoped>
.commentinfo{
  border-bottom: 4px solid rgb(196, 193, 193,0.3);
}
.com-head {
  font-size: 16px;
  height: 48px;
  line-height: 48px;
  border-bottom: 2px solid rgb(172, 169, 169,0.2);
  margin: 0 8px;
}
.com-head .left {
   display: flex;
   width: 80px;
 justify-content: flex-start;
}
.com-head .right {
   display: flex;
  justify-self: flex-end;
}
.info-user img {
  width: 45px;
  height: 45px;
  vertical-align: middle;
  margin-right: 8px;
}
.info-user{
  padding: 15px 8px;
}
.info-detail {
  padding: 0 8px;
}
.info-other{
  margin-left: 0;
}
.info-other span {
  margin-right: 8px;
}
.info-img {
  width: 100%;
  /* height: 100px; */
  margin-bottom: 15px;
}
.info-img img {
  width: 90px;
  height: 90px;
  margin-right: 5px;
}
</style>