<template>
  <div class="tabcontrol">
  <div class='item' 
  v-for="(item,index) in titles" :key="index" 
  :class="{activestyle: index === currentindex}"  @click="itemchange(index)" >
    <span >{{item}}</span>
  </div>
  </div>
</template>

<script>
export default {
name: 'tabcontrol',
props: {
  titles: {
    type: Array,
    default() {
      return []
    }
  }
},
data() {
  return {
    currentindex: 0
  }
},
methods: {
  itemchange(index) {
    this.currentindex = index
    this.$emit('tbclick',index)
  }
}
}
</script>

<style>
.tabcontrol {
  display: flex;
  text-align: center
}
.activestyle {
  color: var(--color-high-text);
}
.activestyle span {
  border-bottom: 2px solid var(--color-tint);
  padding: 5px 4px;
}

.item {
  flex:1;
 line-height: 40px;

}
</style>