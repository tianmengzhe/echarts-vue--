import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 连接webScoket
import SocketServer from './network/socket_server'
SocketServer.Instance.connect()
Vue.prototype.$socket = SocketServer.Instance // this.$socket


// import axios from 'axios'
// // 配置基本路径
// axios.defaults.baseURL = 'http://127.0.0.1:3000/api/'
// // 挂载到Vue原型上 this.$http访问
// Vue.prototype.$http = axios
// 单独封装axios



// 引入全景css
import 'assets/css/global.css'
// 字体文件
import 'assets/font/iconfont.css'

// 将全局的echarts对象挂载到Vue的原型对象上
Vue.prototype.$echarts = window.echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')