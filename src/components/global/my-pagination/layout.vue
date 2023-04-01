<template>
  <div class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="curPage"
      :page-sizes="pageSizes"
      :page-size.sync="curSize"
      :layout="layout"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
  <script>
export default {
  name: "my-pagination",
  props: {
    total: {
      require: true,
      type: Number,
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 40],
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
    page: {
      //页码
      type: Number,
      default: 1,
    },
    sizes: {
      //页数
      type: Number,
      default: 10,
    },
  },
  data() {
    return {};
  },
  computed: {
    curPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
      },
    },
    curSize: {
      get() {
        return this.sizes;
      },
      set(val) {
        this.$emit("update:sizes", val);
      },
    },
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$emit("action");
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$emit("action");
    },
  },
};
</script>
  <style scoped>
</style>
  