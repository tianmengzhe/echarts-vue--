<!-- 商家销量趋势图表 -->
<template>
  <div class="con-container">
    <div class="title noselect" :style="conStyle">
      <span> ▏{{ title }}</span>
      <span
        class="iconfont title-icon"
        :style="conStyle"
        @click="showChoice = !showChoice"
        >&#xe6eb;</span >
      <ul class="select-con" v-show="showChoice">
        <li
          v-for="item in types"
          :key="item.key"
          class="select-item"
          @click="typeClick(item.key)"
        >
          {{ item.text }}
        </li>
      </ul>
    </div>
    <div class="con-chart" ref="chart"></div>
  </div>
</template>

<script>
import { themeMixin } from 'common/mixin'
import { getTrend } from "network/chart";
export default {
  name: "Trend",
  data() {
    return {
      char: null,
      data: null,
      type:'map',
      size: 0,
      showChoice: false
    };
  },
  mixins:[ themeMixin ],
  created(){
    this.$socket.addCallback('trendData', this.getData)
  },
  computed:{
    types(){
      return this.data ? this.data.type.filter(item=>item.key !== this.type) : []
    },
    title(){
      let obj = this.data ? this.data[this.type] : ''
      return obj ? obj.title : ''
    },
    conStyle(){
      return {
        fontSize: this.size+'px'
      }
    }
  },
  async mounted() {
    this.initChart();
    // 请求数据
    if(this.$isSocket){
      this.$socket.send({ action:'getData',socketType:'trendData',chartName:'trend',value:'' })
    }else{
      await this.getData()
    }
    this.screenAdapter();
    window.addEventListener("resize", this.screenAdapter);
  },
  destroyed() {
    this.$socket.remove('trendData') // 组件销毁 取消回调函数
    window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    // sdata 通过socket服务端发送过来的数据
    async getData(sdata){
      if(this.$isSocket){
        this.data = sdata;
      }else{
        let { data } = await getTrend();
        this.data = data;
      }
      console.log('Trend',this.data )
      this.upChart();
    },
    // 初始化
    initChart() {
      this.char = this.$echarts.init(this.$refs.chart, this.theme);
      // 初始配置 
      const initOption = {
        grid: {
          left: "3%",
          top: "35%",
          right: "4%",
          bottom: "1%",
          containLabel: true, // 距离包含坐标轴上的文字
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          left: 20,
          top: "15%",
          icon: "circle",
        },
        xAxis: { type: "category", boundaryGap: false },
        yAxis: { type: "value" },
      };
      this.char.setOption(initOption);
    },
    // 更新图表
    upChart() {
      // 半透明
      const colorArr1 = [
        "rgba(11, 168, 44, 0.5)",
        "rgba(44, 110, 255, 0.5)",
        "rgba(22, 242, 217, 0.5)",
        "rgba(254, 33, 30, 0.5)",
        "rgba(250, 105, 0, 0.5)",
      ];
      // 全透明
      const colorArr2 = [
        "rgba(11, 168, 44, 0)",
        "rgba(44, 110, 255, 0)",
        "rgba(22, 242, 217, 0)",
        "rgba(254, 33, 30, 0)",
        "rgba(250, 105, 0, 0)",
      ];
      const { common } = this.data;
      const xdata = common.month; // 类目轴数据
      const legendData = []; // 图例数据
      const showData = this.data[this.type].data.map(({ data, name }, index) => {
        // series
        legendData.push(name);
        return {
          name, data, type: "line", stack: this.type,
          areaStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: colorArr1[index] },
              { offset: 1, color: colorArr2[index] },
            ]),
          },
        }; // stack堆叠
      });

      const dataOptions = {
        legend: { data: legendData },
        xAxis: { data: xdata },
        series: showData,
      };

      this.char.setOption(dataOptions);
    },
    // 屏幕适配
    screenAdapter() {
      const w = this.$refs.chart.offsetWidth
      const titleSize = w / 100 * 3.6; // 标题大小

      // 和分辨率相关的配置
      const adapterOption = {
        legend:{
          itemWidth: titleSize,
          itemHeight: titleSize,
          itemGap: titleSize,
          textStyle:{
            fontSize: titleSize/2
          }
        }
      };
      this.char.setOption(adapterOption);
      this.char.resize();

      // 标题大小适配 
      this.size = titleSize

    },
    typeClick(key){
      this.type = key
      this.showChoice = !this.showChoice
      this.upChart()
    }
  },
};
</script>

<style lang="less" scoped>
.title {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  color: white;

  .title-icon {
    margin-left: 10px;
    cursor: pointer;
  }
  .select-item {
    cursor: pointer;
    padding-left: 1.5rem;
    background-color: #222733;
  }
}
</style>