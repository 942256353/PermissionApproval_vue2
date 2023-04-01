<template>
  <div>
    <div ref="map" :style="style"></div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import chinaMap from "@/assets/json/china.json";
import { getMap } from "@/api/api";
export default {
  props: {
    height: {
      type: String,
      default: "500px",
    },
    width: {
      type: String,
      default: "100%",
    },
  },
  data() {
    return {
      lists: [],
      title: "企业员工分布",
      High: "高",
      Low: "低",
    };
  },
  async mounted() {
    let res = await getMap();
    let { code, data } = res.data;
    if (code === 20000) {
      this.lists = data;
    }
    this.initMap();
  },
  watch: {
    "$i18n.locale"(newValue, oldValue) {
      this.title = this.$t("title8");
      this.High = this.$t("High");
      this.Low = this.$t("Low");
      this.initMap();
    },
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
    initMap() {
      //响应式
      let myChart = echarts.init(this.$refs.map);
      echarts.registerMap("china", chinaMap);
      let option = {
        title: {
          text: this.title,
          left: "center",
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {},
            dataView:{}
          },
        },
        geo: {
          show: true,
          map: "china",
          label: {
            show: true,
            color: "#f60",
            fontSize: 12,
          },
          itemStyle: {
            areaColor: "#00cccc",
          },
          data: this.lists,
        },
        series: [
          {
            type: "map",
            mapType: "china",
            label: {
              show: true,
              color: "#f60",
              fontSize: 10,
            },
            itemStyle: {
              areaColor: "#00cccc",
            },
            data: this.lists,
          },
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            symbol: "circle",
            symbolSize: function (v) {
              return v[2];
            },
            itemStyle: {
              color: "#99ff66",
            },
            label: {
              show: true,
              formatter: "{b}",
              position: "right",
            },
            data: [
              { name: "广州", value: [113.23, 23.16, 10] },
              { name: "西宁", value: [101.74, 36.56, 15] },
              { name: "武汉", value: [114.31, 30.52, 10] },
            ],
            visualMap: false,
          },
        ],
        visualMap: {
          min: 1,
          max: 500,
          text: [this.High, this.Low],
          realtime: false,
          calculable: true,
          inRange: {
            color: ["lightskyblue", "yellow", "orangered"],
          },
          seriesIndex: 0,
        },
      };
      myChart.setOption(option);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
  },
};
</script>
<style scoped>
</style>
