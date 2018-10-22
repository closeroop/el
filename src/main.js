// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/stylus/reset.css'
import './assets/stylus/index.styl'
import fastClick from 'fastclick' // 优化移动端300ms点击延迟的插件
import 'babel-polyfill' // 解决移动端promise问题

Vue.config.productionTip = false
fastClick.attach(document.body)
let app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
