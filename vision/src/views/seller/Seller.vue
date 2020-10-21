<!-- 商家效率横向柱状图 -->
<template>
  <div class="con-container">
    <div class="con-chart" ref="chart"></div>
  </div>
</template>

<script>
import { getSeller } from "network/chart";
export default {
  name: "Seller",
  data() {
    return {
      char: null,
      data: [],
      currentpage: 1, // 单前页数
      totalPage: 0, // 一共有多少页
      timer: null,
    };
  },
  async mounted() {
    this.initChart();
    let { data } = await getSeller();
    this.data = data.sort((a, b) => a.value - b.value); // 小到大
    // 每5个元素显示一页
    this.totalPage = Math.ceil(this.data.length / 5);
    this.upChart();
    this.initerVal();
    this.screenAdapter()
    window.addEventListener('resize',this.screenAdapter)
  },
  destroyed() {
    clearInterval(this.timer);
    window.removeEventListener('resize',this.screenAdapter)
  },
  methods: {
    // 初始化
    initChart() {
      this.char = this.$echarts.init(this.$refs.chart, 'chalk');

      // 初始配置
      const initOption = {
        title:{
          text:'▏商家销售统计',
          left: 20,
          top: 20,
        },
        grid:{
          top: '20%',
          left: '3%',
          right: '6%',
          bottom: '3%',
          containLabel: true, // 距离包含坐标轴上的文字
        },
        yAxis: {
          type: "category",
        },
        xAxis: {
          type: "value",
        },
        tooltip:{
          trigger: 'axis',
          axisPointer: { // 柱hover背景
            type: 'line',
            z: 0,
            lineStyle: {
              color: '#2D3443'
            }
          }
        },
        series: [
          {
            type: "bar",
            label:{
              show:true,
              position:'right',
              color: '#fff'
            },
            itemStyle:{
              // 渐变颜色
              color: new this.$echarts.graphic.LinearGradient( 0, 0, 1, 0,[
                { offset: 0, color:'#5052EE'},
                { offset: 1, color:'#AB6EE5'}
              ])
            }
          },
        ],
      }
      this.char.setOption(initOption);

      // 鼠标移入停止 移出继续 更新数据
      this.char.on('mouseover', ()=>{ clearInterval(this.timer);})
      this.char.on('mouseout', ()=>{ this.initerVal() })
    },
    initerVal() {
      this.timer && clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.currentpage++
        this.currentpage = this.currentpage > this.totalPage ? 1 : this.currentpage
        this.upChart()
      }, 3000);
    },
    // 更新图表
    upChart() {
      let ydata = [], xdata = [];
      let start = (this.currentpage - 1) * 5;
      let end = this.currentpage * 5;
      let showData = this.data.slice(start, end);
      showData.forEach(({ name, value }) => {
        ydata.push(name);
        xdata.push(value);
      });
      const dataOptions = {
        yAxis: { data: ydata },
        series: [{ data: xdata }],
      };

      // 完整配置
      let defaultOption =  {
        title:{
          text:'▏商家销售统计',
          textStyle:{
            fontSize: 66,
          },
          left: 20,
          top: 20,
        },
        
        grid:{
          top: '20%',
          left: '3%',
          right: '6%',
          bottom: '3%',
          containLabel: true, // 距离包含坐标轴上的文字
        },
        yAxis: {
          type: "category",
          data: ydata
        },
        xAxis: {
          type: "value",
        },
        tooltip:{
          trigger: 'axis',
          axisPointer: { // 柱hover背景
            type: 'line',
            z: 0,
            lineStyle: {
              width: 66,
              color: '#2D3443'
            }
          }
        },
        series: [
          {
            type: "bar",
            barWidth: '50%',
            data: xdata,
            label:{
              show:true,
              position:'right',
              color: '#fff'
            },
            itemStyle:{
              barBorderRadius:[0, 150, 150, 0],
              // 渐变颜色
              color: new this.$echarts.graphic.LinearGradient( 0, 0, 1, 0,[
                { offset: 0, color:'#5052EE'},
                { offset: 1, color:'#AB6EE5'}
              ])
            }
          },
        ],
      }
      this.char.setOption(dataOptions);
    },
    // 屏幕适配 
    screenAdapter(){
      const w = this.$refs.chart.offsetWidth
      const titleSize = w / 100 * 3.6; // 标题大小
      // 和分辨率相关的配置
      const adapterOption = {
        title:{
          textStyle:{ fontSize: titleSize }
        },
        tooltip:{
          axisPointer: { // 柱hover背景
            lineStyle: { width: titleSize }
          }
        },
        series: [{
          barWidth: titleSize,
          itemStyle:{
            barBorderRadius:[0, titleSize/2, titleSize/2, 0],
          }
        }]
      }
      this.char.setOption(adapterOption);
      this.char.resize()
    }
  },
};
</script>

<style scoped>
</style>