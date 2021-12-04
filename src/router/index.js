import Vue from 'vue'
import VueRouter from 'vue-router'
const home = ()=> import('@/views/home/home')
const category = ()=> import('@/views/category/category')
const cart = ()=> import('@/views/cart/cart')
const profile = ()=> import('@/views/profile/profile')
const detail = ()=> import('@/views/detail/detail')

Vue.use(VueRouter)
// push和replace方法是VueRouter原型对象上的,重写这两个方法
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写VueRouter.prototype身上的push方法了
VueRouter.prototype.push = function(location, resolve, reject) {
  //第一个形参：路由跳转的配置对象（query|params）  
  //第二个参数：undefined|箭头函数（成功的回调）
  //第三个参数:undefined|箭头函数（失败的回调）
  if (resolve && reject) {
    //push方法传递第二个参数|第三个参数（箭头函数）
    //originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
    originPush.call(this, location, resolve, reject);
  } else {
    //push方法没有传第二个参数|第三个参数
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
//重写VueRouter.prototype身上的replace方法了
VueRouter.prototype.replace = function(location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

const routes = [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/category',
      component: category
    },
    {
      path: '/cart',
      component: cart
    },
  
    {
      path: '/profile',
      component: profile
    },
    {
      path: '/detail/:id',
      component: detail
    },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
