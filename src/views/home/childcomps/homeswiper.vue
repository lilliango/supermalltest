<template>
  <swiper>
    <swiperitem v-for="(item, id) in banners" :key="id">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
    </swiperitem>
  </swiper>
</template>

<script>
  import {swiper, swiperitem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      swiper,
      swiperitem
    }
  }
</script>

<style scoped>

</style>