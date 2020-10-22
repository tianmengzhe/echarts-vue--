<!-- 热销商品占比模块（饼图） -->
<template>
  <div class="con-container noselect">
    <div class="con-chart" ref="chart"></div>
    <span class="iconfont left" @click="sub" :style="{ fontSize: size }"
      >&#xe6ef;</span
    >
    <span class="iconfont right" @click="add" :style="{ fontSize: size }"
      >&#xe6ed;</span
    >
    <span class="name" :style="{ fontSize: size }">{{ title }}</span>
  </div>
</template>

<script>
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
  async mounted() {
    this.initChart();
    let { data } = await getHot();
    this.data = data;
    console.log(data);
    this.upChart();
    this.screenAdapter();
    window.addEventListener("resize", this.screenAdapter);
  },
  destroyed() {
    window.removeEventListener("resize", this.screenAdapter);
  },
  computed: {
    title() {
      return this.data ? this.data[this.cindex].name : "";
    },
    size() {
      return this.fSize + "px";
    },
  },
  methods: {
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
      this.char = this.$echarts.init(this.$refs.chart, "chalk");

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
          top: "12%",
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
          textStyle: { fontSize: titleSize / 2 },
        },
        legend: {
          itemWidth: titleSize / 2,
          itemHeight: titleSize / 2,
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
  top: 50%;
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