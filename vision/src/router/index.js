import Vue from 'vue'
import VueRouter from 'vue-router'


const SellerPage = () => import('views/seller/SellerPage')
const TrendPage = () => import('views/trend/TrendPage')
const MapPage = () => import('views/map/MapPage')
const RankPage = () => import('views/rank/RankPage')
const HotPage = () => import('views/hot/HotPage')
const StockPage = () => import('views/stock/StockPage')
const Home = () => import('views/home/Home')


Vue.use(VueRouter)


const routes = [
  { path: '/', redirect:'/Home'},
  { path: '/SellerPage',name:'sellerPage', component: SellerPage },
  { path: '/TrendPage',name:'trendPage', component: TrendPage },
  { path: '/MapPage',name:'mapPage', component: MapPage },
  { path: '/RankPage',name:'rankPage', component: RankPage },
  { path: '/HotPage',name:'hotPage', component: HotPage },
  { path: '/StockPage',name:'stockPage', component: StockPage },
  { path: '/Home',name:'home', component: Home }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
