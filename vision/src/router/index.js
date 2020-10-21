import Vue from 'vue'
import VueRouter from 'vue-router'
const SellerPage = ()=>import('views/seller/SellerPage')
const Seller = ()=>import('views/seller/Seller')
const TrendPage = ()=>import('views/trend/TrendPage')
const Trend = ()=>import('views/trend/Trend')

Vue.use(VueRouter)

const routes = [
  {path: '/SellerPage', component: SellerPage},
  {path: '/TrendPage', component: TrendPage}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
