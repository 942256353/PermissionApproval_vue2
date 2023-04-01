<template>
  <div class="about">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h4>办公申请</h4>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="申请人" prop="applicant">
          <el-select
            v-model="ruleForm.applicant"
            placeholder="请选择申请人"
            style="width: 100%"
          >
            <el-option
              v-for="v in user"
              :key="v.id"
              :label="v.account"
              :value="v.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="申请时间" prop="created">
          <el-date-picker
            v-model="ruleForm.created"
            style="width: 100%"
            type="datetime"
            placeholder="请选择申请时间"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="申请商品" prop="apply_goods">
          <el-select
            v-model="ruleForm.apply_goods"
            placeholder="请选择申请商品"
            style="width: 100%"
          >
            <el-option
              v-for="v in office"
              :key="v.key"
              :label="v.goodsName"
              :value="v.key"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="申请数量" prop="apply_goods_num">
          <el-input-number
            v-model="ruleForm.apply_goods_num"
            :min="1"
            :max="100"
            label="申请数量"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="申请原因" prop="apply_reason">
          <el-input
            type="textarea"
            placeholder="请输入申请原因"
            v-model="ruleForm.apply_reason"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" v-no-more-click   @click="submitForm('ruleForm')" 
            >立即申请</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { office } from "@/utils/selectData"; //公共数据
import { getEmployee, submitOfficeApply } from "@/api/api";
export default {
  data() {
    return {
      office,
      user: [],
      ruleForm: {
        applicant: "",
        created: "",
        apply_goods: "",
        apply_goods_num: 1,
        apply_reason: "",
      },
      rules: {
        applicant: [
          { required: true, message: "请选择申请人", trigger: "change" },
        ],
        created: [
          { required: true, message: "请选择申请时间", trigger: "blur" },
        ],
        apply_goods: [
          { required: true, message: "请选择申请商品", trigger: "change" },
        ],
        apply_goods_num: [
          { required: true, message: "请选择申请数量", trigger: "blur" },
        ],
        apply_reason: [
          { required: true, message: "请输入申请原因", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.getEmployeeData();
  },
  methods: {
    async getEmployeeData() {
      let res = await getEmployee();
      let { code, data } = res.data;
      if (code === 20000) {
        this.user = data;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await submitOfficeApply(this.ruleForm);
          let { code, msg } = res.data;
          if (code === 20000) {
            this.$notify({
              title: "提交成功",
              message: msg,
              type: "success",
              duration:2000
            });
            this.$router.push('/approvalManage/officeManage');
          } else {
            this.$notify.error({
              title: "提交失败",
              message: msg,
            });
          }
        } else {
          this.$notify({
            title: "温馨提示",
            message: "请完善表单信息",
            type: "warning",
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>


