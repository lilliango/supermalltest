<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends" :key="index" class="item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
name: 'homerecommend',
props: {
  recommends: {
    type: Array,
    default() {
      return []
    }
  }
}
}
</script>

<style>
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 14px;
  padding: 15px 0 15px;
  border-bottom: 10px solid #eee;
}
.item {
  flex: 1;
}
.item img {
  width: 70px;
  height: 70px;
  /* margin-bottom: 10px; */
  vertical-align: middle;
}

</style>