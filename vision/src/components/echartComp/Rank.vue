<!-- 销量排行模块（柱状图） -->
<template>
  <div class="con-container">
    <div class="con-chart" ref="chart"></div>
  </div>
</template>

<script>
import { themeMixin } from 'common/mixin'
import { getRank } from "network/chart";
export default {
  name: "Rank",
  data() {
    return {
      char: null,
      data: [],
      timer: null,
      zoomObj: { start: 0, end: 9 },
    };
  },
   mixins:[ themeMixin ],
  created() {
    this.$socket.addCallback("rankData", this.getData);
  },
  async mounted() {
    this.initChart();
    if (this.$isSocket) {
      this.$socket.send({
        action: "getData",
        socketType: "rankData",
        chartName: "rank",
        value: "",
      });
    } else {
      await this.getData();
    }
    this.initerVal();
    this.screenAdapter();
    window.addEventListener("resize", this.screenAdapter);
  },
  destroyed() {
    this.$socket.remove("rankData");
    clearInterval(this.timer);
    window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    async getData(sdata) {
      if (this.$isSocket) {
        this.data = sdata;
      } else {
        let { data } = await getRank();
        this.data = data;
      }
      this.data = this.data.sort((a, b) => b.value - a.value); // 大到小
      this.upChart();
    },
    // 初始化
    initChart() {
      this.char = this.$echarts.init(this.$refs.chart, this.theme);
      const colorArr = [
        ["#0BA82C", "#4FF778"],
        ["#2E72BF", "#23E5E5"],
        ["#5052EE", "#AB6EE5"],
      ];
      // 初始配置
      const initOption = {
        title: {
          text: "▏地区销量排行图表",
          left: 20,
          top: 20,
        },
        grid: {
          top: "30%",
          left: "3%",
          right: "6%",
          bottom: "3%",
          containLabel: true, // 距离包含坐标轴上的文字
        },
        dataZoom: { show: false },
        yAxis: { type: "value" },
        xAxis: { type: "category" },
        tooltip: { show: true },
        series: [
          {
            type: "bar",
            label: {
              show: true,
              position: "top",
              color: "#fff",
            },
            itemStyle: {
              // 渐变颜色
              color: (arg) => {
                let index = 2;
                if (arg.value > 200) index = 1;
                if (arg.value > 300) index = 0;
                return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: colorArr[index][0] },
                  { offset: 1, color: colorArr[index][1] },
                ]);
              },
            },
          },
        ],
      };
      this.char.setOption(initOption);

      // 鼠标移入停止 移出继续 更新数据
      this.char.on("mouseover", () => {
        clearInterval(this.timer);
      });
      this.char.on("mouseout", () => {
        this.initerVal();
      });
    },
    initerVal() {
      this.timer && clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.zoomObj.start++;
        this.zoomObj.end++;
        if (this.zoomObj.end > this.data.length - 1) {
          this.zoomObj.start = 0;
          this.zoomObj.end = 9;
        }
        this.upChart();
      }, 3000);

      // 平移动画 不断改变区域缩放的 起始值和结束值
    },
    // 更新图表
    upChart() {
      let provinceArr = [],
        valueArr = [];
      this.data.forEach(({ name, value }) => {
        provinceArr.push(name);
        valueArr.push(value);
      });
      const dataOptions = {
        dataZoom: {
          startValue: this.zoomObj.start,
          endValue: this.zoomObj.end,
        },
        xAxis: { data: provinceArr },
        series: [{ data: valueArr }],
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
        series: [
          {
            barWidth: titleSize,
            itemStyle: {
              barBorderRadius: [titleSize / 2, titleSize / 2, 0, 0],
            },
          },
        ],
      };
      this.char.setOption(adapterOption);
      this.char.resize();
    },
  },
};
</script>

<style scoped>
</style>