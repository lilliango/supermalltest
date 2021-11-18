<template>
  <div class="backtop">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
name: 'backtop'
}
</script>

<style>
.backtop {
  position: fixed;
  right: 10px;
  bottom: 50px;
  z-index: 10;
}
.backtop img {
  width: 60px;
  height: 60px;
}
</style>