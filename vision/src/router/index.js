import Vue from 'vue'
import VueRouter from 'vue-router'
const SellerPage = ()=>import('views/seller/SellerPage')
const Seller = ()=>import('views/seller/Seller')
const TrendPage = ()=>import('views/trend/TrendPage')
const Trend = ()=>import('views/trend/Trend')
const MapPage = ()=>import('views/map/MapPage')
const Map = ()=>import('views/map/Map')
const RankPage = ()=>import('views/rank/RankPage')
const Rank = ()=>import('views/rank/Rank')
const HotPage = ()=>import('views/hot/HotPage')
const Hot = ()=>import('views/hot/Hot')

Vue.use(VueRouter)

const routes = [
  {path: '/SellerPage', component: SellerPage},
  {path: '/TrendPage', component: TrendPage},
  {path: '/MapPage', component: MapPage},
  {path: '/RankPage', component: RankPage},
  {path: '/HotPage', component: HotPage}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
