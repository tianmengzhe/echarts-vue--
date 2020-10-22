<!-- 商家发布模块（地图+散点图） -->
<template>
  <div class="con-container" @dblclick="upChartMap('china')">
    <div class="con-chart" ref="chart"></div>
  </div>
</template>

<script>
import { getProvinceMapInfo } from "common/map_utils";
import { getMap, getMapJSON } from "network/chart";
export default {
  name: "Trend",
  data() {
    return {
      char: null,
      data: null,
      mapData: {},
    };
  },
   created(){
    this.$socket.addCallback('mapData', this.getData)
  },
  computed: {},
  async mounted() {
    this.initChart();
    // 请求数据
    if(this.$isSocket){
      this.$socket.send({ action:'getData',socketType:'mapData',chartName:'map',value:'' })
    }else{
      await this.getData()
    }
    
    this.screenAdapter();
    window.addEventListener("resize", this.screenAdapter);
  },
  destroyed() {
    this.$socket.remove('mapData')
    window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    async getData(sdata){
       if(this.$isSocket){
        this.data = sdata;
      }else{
        let { data } = await getMap();
        this.data = data;
      }
      this.upChart();
    },
    // 初始化
    async initChart() {
      this.char = this.$echarts.init(this.$refs.chart, "chalk");

      // 获取中国地图矢量数据 注册地图数据 配置geo
      let { data } = await getMapJSON("china.json");
      this.$echarts.registerMap("china", data);
      // 初始配置
      const initOption = {
        title: {
          text: "▏商家发布",
          left: 20,
          top: 20,
        },
        legend: {
          left: "5%",
          bottom: "5%",
          orient: "vertical",
        },
        geo: {
          type: "map",
          map: "china",
          top: "5%",
          bottom: "5%",
          itemStyle: {
            areaColor: "#2E72bF",
            borderColor: "#333",
          },
        },
      };
      this.char.setOption(initOption);

      // 地图点击
      this.char.on("click", async (e) => {
        let key = getProvinceMapInfo(e.name).key;
        if (key) {
          if (!this.mapData[key]) { // 避免重复请求
            this.mapData[key] = true;
            let { data } = await getMapJSON(`province/${key}.json`);
            this.$echarts.registerMap(key, data);
          }
          this.upChartMap(key);
        }
      });
    },
    upChartMap(map) {
      const Option = { geo: { map } };
      this.char.setOption(Option);
    },
    // 更新图表
    upChart() {
      const legendArr = [];
      const seriesArr = this.data.map(({ name, children }) => {
        legendArr.push(name);
        return {
          type: "effectScatter", // 涟漪效果
          rippleEffect: {
            scale: 5,
            brushType: "stroke", // 空心
          },
          name,
          data: children,
          coordinateSystem: "geo", // 使用地图坐标系统
        };
      });
      const dataOptions = {
        legend: {
          data: legendArr,
        },
        series: seriesArr,
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
          itemWidth: titleSize / 2,
          itemHeight: titleSize / 2,
          itemGap: titleSize / 2, // 间隔
          textStyle: {
            fontSize: titleSize / 2,
          },
        },
      };
      this.char.setOption(adapterOption);
      this.char.resize();
    },
  },
};
</script>

<style lang="less" scoped>
</style>