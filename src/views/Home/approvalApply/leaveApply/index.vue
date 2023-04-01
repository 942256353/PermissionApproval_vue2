<template>
  <div class="about">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h4>请假申请</h4>
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

        <el-form-item label="请假天数" prop="leave_days">
          <el-input-number
            v-model="ruleForm.leave_days"
            :min="1"
            :max="100"
            label="请假天数"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="请假原因" prop="leave_reason">
          <el-input
            type="textarea"
            placeholder="请输入请假原因"
            v-model="ruleForm.leave_reason"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" v-no-more-click
            >立即申请</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getEmployee, submitLeaveApply } from "@/api/api";
export default {
  data() {
    return {
      user: [],
      ruleForm: {
        applicant: "",
        created: "",
        leave_days : 1,
        leave_reason: "",
      },
      rules: {
        applicant: [
          { required: true, message: "请选择申请人", trigger: "change" },
        ],
        created: [
          { required: true, message: "请选择申请时间", trigger: "blur" },
        ],
        leave_days: [
          { required: true, message: "请选择请假天数", trigger: "blur" },
        ],
        leave_reason: [
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
          let res = await submitLeaveApply(this.ruleForm);
          let { code, msg } = res.data;
          if (code === 20000) {
            this.$notify({
              title: "提交成功",
              message: msg,
              type: "success",
              duration:2000
            });
            this.$router.push('/approvalManage/leaveManage');
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


