<template>
    <div style="display: inline-block">
      <el-tooltip
        v-if="isFullscreen"
        content="缩放"
        placement="bottom"
        effect="dark"
      >
        <i
          class="fa fa-compress"
          style="vertical-align: middle; cursor: pointer"
          @click="click"
        ></i>
      </el-tooltip>
      <el-tooltip
        v-if="!isFullscreen"
        content="全屏"
        placement="bottom"
        effect="dark"
      >
        <i
          class="el-icon-full-screen"
          style="vertical-align: middle; cursor: pointer"
          @click="click"
        ></i>
      </el-tooltip>
    </div>
  </template>
  
  <script>
  import screenfull from "screenfull";//安装最新版本 就是在这里报的错 降低版本就好了
  export default {
    name: "Screenfull",
    data() {
      return {
        isFullscreen: false,
      };
    },
    mounted() {
      this.init();
    },
    beforeDestroy() {
      this.destroy();
    },
    methods: {
      click() {
        const element = document.querySelector('.el-main .content'); //指定全屏区域元素
        if (!screenfull.isEnabled) {
          this.$message({
            message: "浏览器不支持",
  
            type: "warning",
          });
  
          return false;
        } else {
          screenfull.request(element);
        }
        screenfull.toggle();
      },
      change() {
        this.isFullscreen = screenfull.isFullscreen;
      },
      init() {
        screenfull.on("change", this.change);
      },
      destroy() {
        if (screenfull.enabled) {
          screenfull.off("change", this.change);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .screenfull-svg {
    display: inline-block;
    cursor: pointer;
    fill: #5a5e66;
    width: 20px;
    height: 20px;
    vertical-align: 10px;
  }
  </style>
  
  