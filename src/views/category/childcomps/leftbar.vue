<template>
  <div class="leftbar">
     <div v-for="(item,index) in bardata" :key="index" 
     @click="barclick(index)" 
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
  barclick(index) {
    this.currentindex = index
  }
}
}
</script>

<style scoped>
.leftbar {
background-color: rgb(243, 240, 240);
width: 30%;
height: calc(100% - 44px);
display: flex;
flex-direction: column;
}
.leftbar div{
  flex: 1;
  justify-content: center;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(223, 220, 220);

}
.ispink {
  background-color: pink;
  color: #fff;
}
</style>