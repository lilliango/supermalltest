<template>
    <img src="~assets/img/cart/tick.svg" alt="" class="checkbutton" :class="{ischeck: ischecked}">
  
</template>

<script>
export default {
name: 'checkbutton',
props: {
  ischecked: {
    type: Boolean,
    default: false
  },
  },
}

</script>

<style scoped>
.checkbutton {
  border-radius: 50%;
  border: 2px solid #aaa;
  width: 20px;
  height: 20px;
}
.ischeck {
  background-color: red;
  border-color: red;
}
</style>