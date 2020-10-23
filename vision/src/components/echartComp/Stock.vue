<!--库存与销量模块（圆环饼图） -->
<template>
  <div class="con-container">
    <div class="con-chart" ref="chart"></div>
  </div>
</template>

<script>
import { themeMixin } from 'common/mixin'
import { getStock } from "network/chart";
export default {
  name: "Stock",
  data() {
    return {
      char: null,
      data: null,
      showData: null,
      timer: null,
      currentpage: 1,
      totalPage: 1,
    };
  },
  mixins:[ themeMixin ],
  created() {
    this.$socket.addCallback("stockData", this.getData);
  },
  async mounted() {
    console.log('mounted')
    this.initChart();
    if (this.$isSocket) {
      // 请求数据
      this.$socket.send({
        action: "getData", 
        socketType: "stockData",
        chartName: "stock",
        value: "",
      });
    } else {
      await this.getData();
    }
    
    this.initerVal(); 
    window.addEventListener("resize", this.screenAdapter);
  },
  destroyed() {
    this.$socket.remove("stockData");
    clearInterval(this.timer);
    window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    async getData(sdata) {
      if (this.$isSocket) {
        this.data = sdata;
      } else {
        let { data } = await getStock();
        this.data = data;
      }
      this.totalPage = Math.ceil(this.data.length / 5);
      this.upChart();
      this.screenAdapter();
    },
    // 初始化
    initChart() {
      this.char = this.$echarts.init(this.$refs.chart, this.theme);
      // 初始配置
      const initOption = {
        title: {
          text: "▏库存和销量分析",
          left: 20,
          top: 20,
        },
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
        this.currentpage++;
        this.currentpage =
          this.currentpage > this.totalPage ? 1 : this.currentpage;
        this.upChart();
      }, 3000);
    },
    // 更新图表
    upChart() {
      const centerArr = [
        ["18%", "40%"],
        ["50%", "40%"],
        ["82%", "40%"],
        ["34%", "75%"],
        ["66%", "75%"],
      ];
      const colorArr = [
        ["#4FF778", "#0BA82C"],
        ["#E5DD45", "#E8811C"],
        ["#E8821C", "#E55445"],
        ["#5052EE", "#AB6EE5"],
        ["#23E5E5", "#2E72BF"],
      ];
      let serArr = [];
      let start = (this.currentpage - 1) * 5;
      let end = this.currentpage * 5;
      this.showData = this.data.slice(start, end);
      this.showData.forEach(({ name, value, sales, stock }, i) => {
        serArr.push({
          type: "pie",
          center: centerArr[i], //位置
          data: [
            {
              value: sales, // 销量
              name: name + "\n\n" + sales,
              itemStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  { offset: 0, color: colorArr[i][0] },
                  { offset: 1, color: colorArr[i][1] },
                ]),
              },
            },
            {
              value: stock, // 库存
              itemStyle: { color: "#333845" },
            },
          ],
          hoverAnimation: false, //关闭鼠标移入饼图的效果
          labelLine: { show: false }, // 隐藏指示线
          label: {
            show: true,
            position: "center",
            color: colorArr[i][0],
          },
        });
      });
      const dataOptions = {
        series: serArr,
      };
      this.char.setOption(dataOptions);
    },
    // 屏幕适配
    screenAdapter() {
      const w = this.$refs.chart.offsetWidth;
      const titleSize = (w / 100) * 3.6; // 标题大小
      let seriesArr = this.showData.map(() => ({
        type: "pie",
        radius: [titleSize * 3, titleSize * 2.8],
        label: { fontSize: titleSize / 2 },
      }));

      // 和分辨率相关的配置
      const adapterOption = {
        title: {
          textStyle: { fontSize: titleSize },
        },
        series: seriesArr,
      };
      this.char.setOption(adapterOption);
      this.char.resize();
    },
  },
};
</script>

<style scoped>
</style>