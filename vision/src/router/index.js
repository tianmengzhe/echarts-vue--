import Vue from 'vue'
import VueRouter from 'vue-router'


const SellerPage = () => import('views/seller/SellerPage')
const TrendPage = () => import('views/trend/TrendPage')
const MapPage = () => import('views/map/MapPage')
const RankPage = () => import('views/rank/RankPage')
const HotPage = () => import('views/hot/HotPage')
const StockPage = () => import('views/stock/StockPage')

const Seller = () => import('views/seller/Seller')
const Trend = () => import('views/trend/Trend')
const Map = () => import('views/map/Map')
const Rank = () => import('views/rank/Rank')
const Hot = () => import('views/hot/Hot')
const Stock = () => import('views/stock/Stock')

Vue.use(VueRouter)


const routes = [
  { path: '/SellerPage', component: SellerPage },
  { path: '/TrendPage', component: TrendPage },
  { path: '/MapPage', component: MapPage },
  { path: '/RankPage', component: RankPage },
  { path: '/HotPage', component: HotPage },
  { path: '/StockPage', component: StockPage }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
