<template>
  <div id="tabbar">
    <slot></slot>
  </div>
</template>

<script>
export default {
 name: 'TabBar'
}
</script>

<style>
#tabbar {
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
 background-color: #f6f6f6;
 position: fixed;
 left: 0;
 bottom: 0;
 right: 0;
 box-shadow: 0 -1px 1px rgba(10,10,10,0.1);
}
/* 样式之间不能加分号 */

</style>