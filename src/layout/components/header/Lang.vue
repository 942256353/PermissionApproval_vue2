<template>
  <el-dropdown @command="switchLang">
    <el-button type="primary" size="mini">
      {{$t("lang")}}<i class="el-icon-arrow-down el-icon--right"></i>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh">中文</el-dropdown-item>
      <el-dropdown-item command="en">en</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
export default {
  data() {
    return {
      titie:''
    };
  },
  created() {},
  computed: {},
  methods: {
    switchLang(type){
       this.$i18n.locale = type; 
    }
  }
};
</script>
<style scoped>
</style>
