<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="visible"
      width="30%"
      :before-close="cancel"
    >
      <slot>
        <p>内容</p>
      </slot>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-no-more-click  @click="confirm">{{btnTitle}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    dialogTitle:{
        type:String,
        default:"标题"
    },
    btnTitle:{
        type:String,
        default:"确定"
    },
    visible:{
        type:Boolean,
        default:false
    }
  },
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {
    confirm(){
        this.$emit("confirm");
    },
    cancel(){
        this.$emit("update:visible",false);
    }

  },
};
</script>
<style scoped>
</style>
