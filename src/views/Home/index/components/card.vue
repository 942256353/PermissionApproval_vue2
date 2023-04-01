<template>
  <el-card shadow="always" class="card" :style="style">
    <p>{{ title }}</p>
    <countTo
      class="countTo"
      :startVal="startVal"
      :endVal="endVal"
      :duration="3000"
    ></countTo>
  </el-card>
</template>
<script>
import countTo from "vue-count-to";
export default {
  components: { countTo },
  props: {
    title: {
      type: String,
      default: "卡片标题",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100%",
    },
    color: {
      type: String,
      default: "#FFF",
    },
    background:{
        type: String,
        default: "#59D249",
    },
    endVal:{
      type:Number,
      default:2017
    }
  },
  data() {
    return {
      startVal: 0,
    };
  },
  created() {},
  computed: {
    style() {
      return {
        width: this.width,
        color: this.color,
        height: this.height,
        background:this.background
      };
    },
    styleCountTo() {
        return {
            color: this.color,
        }
    }
  },
  methods: {},
};
</script>
<style scoped>
.card {
  text-align: center;
  margin-top: 20px;
  border-radius: 10px;
}
.card p {
    font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
}
.countTo {
  font-size: 20px;
  font-weight: bolder;
 
}
</style>
