import Vue from 'vue'
import VueRouter from 'vue-router'
const SellerPage = ()=>import('views/seller/SellerPage')
const Seller = ()=>import('views/seller/Seller')
Vue.use(VueRouter)

const routes = [
  {path: '/SellerPage', component: SellerPage}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
