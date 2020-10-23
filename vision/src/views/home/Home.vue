<template>
  <div class="screen-container">

     <home-header :logoSrc="logoSrc" :headerSrc="headerSrc"  :themeSrc="themeSrc" @themeChange="themeChange"/>

     <div class="screen-body">
      <section class="screen-left">
        <div id="left-top" :class="fullScreenStatus.trend ? 'fullscreen' : ''">
          <!-- 销量趋势图表  -->
          <Trend ref="trend"/>
          <div class="resize" @click="resizeClick('trend')"><span class="iconfont" :class="fullScreenStatus.trend ?'icon-compress-alt':'icon-expand-alt'"></span></div>
        </div>
        <div id="left-bottom" :class="fullScreenStatus.seller ? 'fullscreen' : ''">
          <!-- 商家销售金额图表 -->
          <Seller ref="seller"/>
          <div class="resize" @click="resizeClick('seller')"><span class="iconfont" :class="fullScreenStatus.seller ?'icon-compress-alt':'icon-expand-alt'"></span></div>
        </div>
      </section>
      <section class="screen-middle">
        <div id="middle-top" :class="fullScreenStatus.map ? 'fullscreen' : ''">
          <!-- 商家分布图表 -->
          <Map ref="map"/>
          <div class="resize" @click="resizeClick('map')"><span class="iconfont" :class="fullScreenStatus.map ?'icon-compress-alt':'icon-expand-alt'"></span></div>
        </div>
        <div id="middle-bottom" :class="fullScreenStatus.rank ? 'fullscreen' : ''">
          <!-- 地区销量排行图表 -->
          <Rank ref="rank"/>
          <div class="resize" @click="resizeClick('rank')"><span class="iconfont" :class="fullScreenStatus.rank ?'icon-compress-alt':'icon-expand-alt'"></span></div>
        </div>
      </section>
      <section class="screen-right">
        <div id="right-top" :class="fullScreenStatus.hot ? 'fullscreen' : ''">
          <!-- 热销商品占比图表 -->
          <Hot ref="hot"/>
          <div class="resize" @click="resizeClick('hot')"><span class="iconfont" :class="fullScreenStatus.hot ?'icon-compress-alt':'icon-expand-alt'"></span></div>
        </div>
        <div id="right-bottom" :class="fullScreenStatus.stock ? 'fullscreen' : ''">
          <!-- 库存销量分析图表 -->
         <Stock ref="stock"/>
         <div class="resize" @click="resizeClick('stock')"><span class="iconfont" :class="fullScreenStatus.stock ?'icon-compress-alt':'icon-expand-alt'"></span></div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Trend from 'components/echartComp/Trend'
import Hot from 'components/echartComp/Hot'
import Map from 'components/echartComp/Map'
import Rank from 'components/echartComp/Rank'
import Seller from 'components/echartComp/Seller'
import Stock from 'components/echartComp/Stock'


import HomeHeader from './child/HomeHeader'

import { mapState } from 'vuex'
import { getThemeValue } from 'common/theme_utils'
export default {
  name: 'home',
  components:{
    HomeHeader,
    Trend,Hot,Map,Rank,Seller,Stock
  },
  computed: {
    logoSrc () {
      return '/static/img/logo_dark.png'
    },
    headerSrc () {
      return '/static/img/header_border_dark.png'
    },
    themeSrc () {
      return '/static/img/qiehuan_dark.png'
    },
   
  },
  data() { 
    return {
      // 定义每一个图表的全屏状态
      fullScreenStatus: {
        trend: false,
        seller: false,
        map: false,
        rank: false,
        hot: false,
        stock: false
      }
    }
  },
  created(){
    this.$socket.addCallback('fullScreen', this.fullScreen)
  },
  destroyed(){
    this.$socket.remove('fullScreen')
  },
  methods:{
    resizeClick(type){

      // 全屏
      // this.fullScreenStatus[type] = !this.fullScreenStatus[type]
      // this.$nextTick(()=>{
      //   this.$refs[type].screenAdapter()
      // })

      // 同步到其它浏览器
      this.$socket.send({
          action:'fullScreen',
          socketType: 'fullScreen',
          chartName: type,
          value: !this.fullScreenStatus[type]
      })
    },
    fullScreen(data){ //全屏处理
      console.log('full',data)
      this.fullScreenStatus[data.chartName] = data.value
      this.$nextTick(()=>{
        this.$refs[data.chartName].screenAdapter()
      })
    },
    themeChange(){
      // 主题切换
    }

  }
 }
</script>

<style lang="less" scoped>
// 全屏样式的定义
.fullscreen {
  position: fixed!important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  z-index: 100;
}

.screen-container {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  background-color: #161522;
  color: #fff;
  box-sizing: border-box;
}
.screen-body {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 30px;
  .screen-left {
    height: 100%;
    width: 27.6%;
    #left-top {
      height: 53%;
      position: relative;
    }
    #left-bottom {
      height: 31%;
      margin-top: 25px;
      position: relative;
    }
  }
  .screen-middle {
    height: 100%;
    width: 41.5%;
    margin-left: 1.6%;
    margin-right: 1.6%;
    #middle-top {
      width: 100%;
      height: 56%;
      position: relative;
    }
    #middle-bottom {
      margin-top: 25px;
      width: 100%;
      height: 28%;
      position: relative;
    }
  }
  .screen-right {
    height: 100%;
    width: 27.6%;
    #right-top {
      height: 46%;
      position: relative;
    }
    #right-bottom {
      height: 38%;
      margin-top: 25px;
      position: relative;
    }
  }
}
.resize {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}


</style>