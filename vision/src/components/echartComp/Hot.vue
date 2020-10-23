<!-- 热销商品占比模块（饼图） -->
<template>
  <div class="con-container noselect">
    <div class="con-chart" ref="chart"></div>
    <span class="iconfont left" @click="sub" :style="conStyle">&#xe6ef;</span>
    <span class="iconfont right" @click="add" :style="conStyle">&#xe6ed;</span>
    <span class="name" :style="conStyle">{{ title }}</span>
  </div>
</template>

<script>

// 在热刷新时数据加载失败   destroyed 比 created 后执行

import { themeMixin } from 'common/mixin'
// import { mapState } from 'vuex'
import { getHot } from "network/chart";
export default {
  name: "Rank",
  data() {
    return {
      char: null,
      data: null,
      cindex: 0,
      fSize: 50,
    };
  },
  mixins:[ themeMixin ],
  computed: {
    // ...mapState(['theme']),
    conStyle(){
      return {
        fontSize: this.fSize + "px",
        color: this.theme == 'chalk' ? '#fff':'#000'
      }
    },
    title() {
      return this.data ? this.data[this.cindex].name : "";
    } 
  },
  // watch:{
  //   theme(){
  //     console.log('主题切换了') 
  //     if(this.char){
  //       this.char.dispose() // 销毁单前图表
  //       this.initChart() // 重新以新的主题名称初始化图表
  //       this.screenAdapter() // 更新屏幕适配
  //       this.upChart() // 更新图表的展示
  //     }
  //   }
  // }, 
  created(){
    console.log('created') 
    this.$socket.addCallback('hotData', this.getData)
  },
  async mounted() {
    this.initChart();
    // 请求数据
    if(this.$isSocket){
      this.$socket.send({ action:'getData',socketType:'hotData',chartName:'hotproduct',value:'' })
    }else{
      await this.getData()
    }
    this.screenAdapter();
    window.addEventListener("resize", this.screenAdapter);
  },
  destroyed() {
     console.log('destroyed---', )  
    this.$socket.remove('hotData');
    window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    async getData(sdata){
      if(this.$isSocket){
        this.data = sdata;
      }else{
        let { data } = await getHot();
        this.data = data;
      }
      this.upChart();
    },
    sub() {
      this.cindex--;
      this.upChart();
    },
    add() {
      this.cindex++;
      this.upChart();
    },
    // 初始化
    initChart() {
      this.char = this.$echarts.init(this.$refs.chart, this.theme);

      // 初始配置
      const initOption = {
        title: {
          text: "▏热销商品占比",
          left: 20,
          top: 20,
        },
        grid: {
          top: "20%",
          left: "3%",
          right: "6%",
          bottom: "3%",
          containLabel: true, // 距离包含坐标轴上的文字
        },
        legend: {
          top: "15%",
          icon: "circle",
        },
        tooltip: {
          formatter: (arg) => {
            let dat = arg.data.children;
            let total = dat.reduce((prev, item) => prev + item.value, 0);
            let str = "";
            dat.forEach(({ name, value }) => {
              str += `${name}: ${Math.floor((value / total) * 100)}% <br>`;
            });
            return str;
          },
        },
        series: [
          {
            type: "pie",
            label: { show: false },
            center: ["50%", "60%"],
            emphasis: {
              label: { show: true },
              labelLine: { show: false },
            },
          },
        ],
      };
      this.char.setOption(initOption);
    },

    // 更新图表
    upChart() {
      let lent = this.data.length - 1;
      this.cindex = this.cindex > lent ? 0 : this.cindex;
      this.cindex = this.cindex < 0 ? lent : this.cindex;
      let legenddata = [];
      let seriesData = this.data[this.cindex].children.map(
        ({ name, value, children }) => {
          legenddata.push(name);
          return { name, value, children };
        }
      );
      const dataOptions = {
        legend: { data: legenddata },
        series: [{ data: seriesData }],
      };
      this.char.setOption(dataOptions);
    },
    // 屏幕适配
    screenAdapter() {
      const w = this.$refs.chart.offsetWidth;
      const titleSize = (w / 100) * 3.6; // 标题大小
      // 和分辨率相关的配置
      const adapterOption = {
        title: {
          textStyle: { fontSize: titleSize },
        },
        legend: {
          itemWidth: titleSize ,
          itemHeight: titleSize ,
          itemGap: titleSize / 2,
          textStyle: { fontSize: titleSize / 2 },
        },
        series: [{ radius: titleSize * 4.5 }],
      };
      this.fSize = titleSize;
      this.char.setOption(adapterOption);
      this.char.resize();
    },
  },
};
</script>

<style lang="less" scoped>
.left,
.right {
  position: absolute;
  top: 60%;
  transform: translateY(-50%);
  cursor: pointer;
  color: white;
}
.left {
  left: 10%;
}
.right {
  right: 10%;
}
.name {
  position: absolute;
  left: 80%;
  bottom: 20px;
  color: white;
}
</style>