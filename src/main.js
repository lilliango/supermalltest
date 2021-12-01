import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入toast文件的index.js
import toast from 'components/common/toast'
import Fastclick from 'fastclick'
import  VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue()
// 安装自己封装的toast插件
Vue.use(toast)
// 解决300毫秒延迟
Fastclick.attach(document.body)
// 使用图片懒加载
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/profile/lazy.gif')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
