<template>
  <div>
    <div ref="chart" :style="style"></div>
  </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  props: {
    height: {
      type: String,
      default: "100%",
    },
    width: {
      type: String,
      default: "100%",
    },
    option: {
      type: Object,
      default: () => ({
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
          },
        ],
      }),
    },
  },
  data() {
    return {
      myChart: null,
    };
  },
  mounted() {
    //响应式
    this.init(this.option);
    window.addEventListener("resize", () => {
      this.myChart.resize();
    });
  },
  computed: {
    style() {
      return {
        width: this.width,
        height: this.height,
      };
    },
  },
  methods: {
    init(option) {
      this.myChart = echarts.getInstanceByDom(this.$refs.chart);
      if (!this.myChart) {
        this.myChart = echarts.init(this.$refs.chart);
      }
      this.myChart.setOption(option);
    },
  },
  watch: {
    option: {
      handler(newValue, oldValue) {
        this.init(newValue);
      },
      deep: true,
    },
  },
};
</script>
<style scoped></style>
