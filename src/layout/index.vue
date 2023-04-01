<template>
  <div class="app-wrapper">
    <el-container>
      <el-aside width="200" class="aside">
        <Sidebar :isCollapse="isCollapse"
      /></el-aside>
      <el-container>
        <el-header>
          <Header :isCollapse.sync="isCollapse"/>
        </el-header>
        <el-main>
          <Main />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { Header, Sidebar, Main } from "./components";
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  components: {
    Header,
    Sidebar,
    Main,
  },
};
</script>
<style scoped></style>
