<template>
  <div class="content">
    <div class="content-row">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="16" :lg="16">
          <div class="grid-content bg-gray-light">
            <!-- <Chart height="250px"/> -->
            <el-row :gutter="10" class="row-class">
              <el-col :xs="24" :sm="8" :md="8" :lg="8"
                ><Card
                  background="#a7e0fd"
                  :endVal="option1.series[0].data[0]"
                  :title="$t('title2')"
              /></el-col>
              <el-col :xs="24" :sm="8" :md="8" :lg="8"
                ><Card
                  background="#9ae990"
                  :endVal="option1.series[0].data[2]"
                  :title="$t('title3')"
              /></el-col>
              <el-col :xs="24" :sm="8" :md="8" :lg="8"
                ><Card
                  background="#f1cc35"
                  :endVal="option1.series[0].data[4]"
                  :title="$t('title4')"
              /></el-col>
              <el-col :xs="24" :sm="8" :md="8" :lg="8"
                ><Card
                  background="#f7a888"
                  :endVal="option1.series[0].data[6]"
                  :title="$t('title5')"
              /></el-col>
              <el-col :xs="24" :sm="8" :md="8" :lg="8"
                ><Card
                  background="#79d4ce"
                  :endVal="option1.series[0].data[8]"
                  :title="$t('title6')"
              /></el-col>
              <el-col :xs="24" :sm="8" :md="8" :lg="8"
                ><Card
                  background="#e6adad"
                  :endVal="option1.series[0].data[10]"
                  :title="$t('title7')"
              /></el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8">
          <div class="grid-content bg-gray-light">
            <Chart height="250px" :option="option" />
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="content-row">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="8" :lg="8">
          <div class="grid-content bg-gray-light">
            <Chart :option="option1" height="300px" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8">
          <div class="grid-content bg-gray-light">
            <Chart :option="option2" height="300px" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8">
          <div class="grid-content bg-gray-light">
            <Chart :option="option3" height="300px" />
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="content-row">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="8" :lg="8">
          <div class="grid-content bg-gray-light">
            <Chart :option="option4" height="300px" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="16" :lg="16">
          <div class="grid-content bg-gray-light">
            <Map height="300px" />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { Chart, Map, Card } from "./components";
import * as echarts from "echarts";
export default {
  components: {
    Chart,
    Map,
    Card,
  },
  data() {
    return {
      option: {
        title: {
          text: this.$t("title1"),
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          top: "12%",
          right: "4%",
          bottom: "5%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: [
              "2000",
              "2002",
              "2004",
              "2006",
              "2008",
              "2010",
              "2012",
              "2014",
              "2016",
              "2018",
              "2020",
              "2022",
            ],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "60%",
            data: [100, 140, 180, 220, 260, 300, 340, 380, 420, 460, 500, 540],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  1,
                  0,
                  0,
                  [
                    {
                      offset: 0,
                      color: "#57D3CB", // 0% 处的颜色
                    },
                    {
                      offset: 0.6,
                      color: "#85ccc7", // 60% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#cae9e7", // 100% 处的颜色
                    },
                  ],
                  false
                ),
              },
            },
            label: {
              show: true,
              position: "top",
            },
            labelLine: {
              lineStyle: {
                type: "dashed",
                width: 2,
              },
            },
            showBackground: true,
            backgroundStyle: {
              color: "rgba(240, 240, 240, 0.959)",
            },
          },
        ],
      },
      option1: {
        title: {
          text: this.$t("title10"),
          left: "center",
        },
        tooltip: {
          show: true,
        },
        xAxis: {
          type: "category",
          data: this.$t("nation"),
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [678, 43, 553, 234, 198, 55, 143, 243, 254, 68, 112, 34],
            type: "line",
            symbol: "triangle",
            symbolSize: 5,
            lineStyle: {
              color: "#5470C6",
              width: 2,
              type: "dashed",
            },
            label: {
              show: true,
              position: "top",
            },
            itemStyle: {
              borderWidth: 1,
              borderColor: "#EE6666",
              color: "yellow",
            },
          },
        ],
      },
      option2: {
        title: {
          text: this.$t("title9"),
          left: "center",
        },
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%",
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {},
          },
        },
        series: [
          {
            name: "Pressure",
            type: "gauge",
            progress: {
              show: true,
            },
            axisLine: {
              lineStyle: {
                color: [[1, "rgb(206, 204, 204)"]],
              },
            },
            detail: {
              valueAnimation: true,
              formatter: "{value} %",
            },
            data: [
              {
                value: 0,
                name: "SCORE",
              },
            ],
          },
        ],
      },
      option3: {
        title: {
          text: this.$t("title11"),
          left: "center",
        },
        tooltip: {
          show: true,
          formatter: "{b}<br />{c}({d}%)",
        },
        legend: {
          left: "top",
          orient: "vertical",
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: [30, 120],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: ["40%", "35%"],
            },
            data: [
              { value: 15, name: "rose 3" },
              { value: 30, name: "rose 4" },
              { value: 26, name: "rose 5" },
              { value: 23, name: "rose 6" },
              { value: 22, name: "rose 7" },
            ],
          },
        ],
      },
      option4: {
        title: {
          text: this.$t("title12"),
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none",
          },
          formatter: function (params) {
            return params[0].name + ": " + params[0].value;
          },
        },
        grid: {
          left: "6%",
          top: "10%",
          right: "6%",
          bottom: "5%",
          containLabel: true,
        },
        xAxis: {
          data: [
            "飞机",
            "高铁",
            "公交车",
            "私家车",
            "电动车",
            "单车",
            "跑步",
            "步行",
          ],
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            color: "#fff",
          },
        },
        yAxis: {
          splitLine: { show: false },
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: { show: false },
        },
        color: ["rgb(68, 209, 209)"],
        label: {
          show: true,
          position: "bottom",
        },
        series: [
          {
            name: "hill",
            type: "pictorialBar",
            barCategoryGap: "-130%",
            // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
            symbol:
              "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
            itemStyle: {
              opacity: 0.5,
            },
            emphasis: {
              itemStyle: {
                opacity: 1,
              },
            },
            data: [123, 60, 25, 18, 12, 9, 2, 1],
            z: 10,
            label: {
              show: true,
              position: "bottom",
              formatter: "{b}",
            },
          },
        ],
      },
    };
  },
  created() {},
  computed: {
    getWsMsg() {
      return this.$store.state.socket.orderWebSocketMsg;
    },
  },
  mounted() {
    if (this.socketApi.wsConnectionOrder.$wsOrder == null) {
      this.socketApi.wsConnectionOrder.initWebSocket();
    }
  },
  watch: {
    "$i18n.locale"(newValue, oldValue) {
      this.option.title.text = this.$t("title1");
      this.option1.title.text = this.$t("title10");
      this.option2.title.text = this.$t("title9");
      this.option3.title.text = this.$t("title11");
      this.option4.title.text = this.$t("title12");
      this.option1.xAxis.data = this.$t("nation");
    },
    getWsMsg(newValue, oldValue) {
      // console.log('newValue',newValue)
      this.init(newValue);
    },
  },
  methods: {
    init(res) {
      let { optionData, option2Data, option3Data, option4Data } = res;
      this.option.series[0].data = optionData;
      this.option1.series[0].data = optionData;
      this.option2.series[0].data = option2Data;
      this.option3.series[0].data = option3Data;
      this.option4.series[0].data = option4Data;
    },
    // openWebSocket() {
    //   //连接WebSocket
    //   let socket = new WebSocket("ws://localhost:3002");
    //   socket.onmessage = (e) => {
    //     if (e) {
    //       let res = JSON.parse(e.data);
    //       console.log(res);
    //       let {optionData,option2Data,option3Data,option4Data} = res;
    //       this.option.series[0].data = optionData;
    //       this.option1.series[0].data = optionData;
    //       this.option2.series[0].data = option2Data;
    //       this.option3.series[0].data = option3Data;
    //       this.option4.series[0].data = option4Data;
    //     }
    //   };
    //   socket.onclose = ()=>{
    //     this.$message.error("WebSocket连接断开");
    //   }
    // },
  },
};
</script>
<style scoped>
.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-gray-light {
  background: #faf7f7;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-class {
  padding: 0 10px;
}
</style>
