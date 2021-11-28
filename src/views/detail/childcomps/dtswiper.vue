<template>
   <swiper>
      <swiperitem v-for="(item, index) in topimg" :key="index" class="swiperit">
      <a :href="item.link">
        <img :src="item" alt="" >
      </a>
    </swiperitem>
   </swiper>
</template>

<script>
import {swiper,swiperitem} from 'components/common/swiper/index'
export default {
name: 'dtswiper',
components: {
  swiper,
  swiperitem
},
props: {
  topimg: {
    type: Array,
    default() {
      return []
    }
  }
}
}
</script>

<style>
.swiperit{
  height: 300px;
  overflow: hidden;

}
.swiperit img {
  width: 100%;
}
</style>