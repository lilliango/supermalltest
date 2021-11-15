<template>
  <div id="app">
    <router-view/>
    <maintabbar/>
  </div>
</template>

<script>
import maintabbar from 'components/current/maintabbar/maintabbar'
export default {
  name: 'app',
  components: {
   maintabbar
  }
}
</script>


<style>
@import 'assets/css/base.css';
</style>
