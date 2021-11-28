<template>
  <swiper>
    <swiperitem v-for="(item, id) in banners" :key="id" class="swiperit">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgload">
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
    data() {
      return {
       isload: true
      }
    },
    components: {
      swiper,
      swiperitem
    },
    methods: {
      imgload() {
        if(this.isload) {
          this.$emit('swiperimgload')
        }
        this.isload = false
      }
    }
  }
</script>

<style scoped>
.swiperit img {
  width: 100%;
}
</style>