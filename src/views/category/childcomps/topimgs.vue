<template>
  <div class="topimgs">
 <img :src="item.image" alt="" v-for="(item,index) in imgs" :key="index" @load="topimgload">
  </div>
</template>

<script>
export default {
name: 'topimgs',
data() {
  return {
    num:1
  }
},
props: {
  imgs: {
    type: Array,
    default() {
      return []
    }
  }
},
methods: {
  topimgload () {
    if(this.num){
    this.$emit('toploadimg')
    this.num = 0
    }
  }
}
}
</script>

<style scoped>
.topimgs img {
  margin: 8px 15px;
  width: 70px;
  height: 70px;
}
</style>