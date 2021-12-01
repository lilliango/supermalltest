<template>
  <div class="leftbar">
     <div v-for="(item,index) in bardata" :key="index" 
     @click="barclick(index,item.maitKey,item.miniWallkey)" 
     :class="{ispink:currentindex === index}">{{item.title}}</div>
  </div>
</template>

<script>
export default {
name: 'leftbar',
data(){
 return {
   currentindex: 0
 }
},
props: {
  bardata: {
    type: Array,
    default() {
      return []
    }
  },
},
methods: {
  barclick(index,maitKey,miniWallkey) {
    this.currentindex = index
    // 发送点击的自定义事件，且把这两个参数的数据传过去
    this.$emit('leftbarclick',maitKey,miniWallkey)
    // console.log(maitKey,miniWallkey)
  }
}
}
</script>

<style scoped>
.leftbar {
background-color: rgb(243, 240, 240);
width: 20%;
height: calc(100% - 44px);
display: flex;
flex-direction: column;
font-size: 14px;
}
.leftbar div{
  flex: 1;
  justify-content: center;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(251, 248, 248);

}
.ispink {
  background-color: pink;
  color: #fff;
}
</style>