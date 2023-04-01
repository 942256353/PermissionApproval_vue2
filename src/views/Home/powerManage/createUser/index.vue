<template>
  <div class="about">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h4>创建员工与审批员</h4>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="用户名" prop="account">
          <el-input
            v-model="ruleForm.account"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="password2">
          <el-input
            type="password"
            v-model="ruleForm.password2"
            autocomplete="off"
            placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item label="权限分配" prop="role_id">
          <el-radio-group v-model="ruleForm.role_id" size="small">
            <el-radio label="2" border>员工</el-radio>
            <el-radio label="3" border>审批管理员</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="审批权限分配"
          prop="permission"
          v-show="ruleForm.role_id == 3"
        >
          <el-checkbox-group v-model="ruleForm.permission" size="medium">
            <el-checkbox-button
              v-for="v in options"
              :label="v.value"
              :key="v.value"
              >{{ v.name }}</el-checkbox-button
            >
          </el-checkbox-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" v-no-more-click
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
  
<script>
import { createPermission } from "@/api/api";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        account: "",
        password: "",
        password2: "",
        role_id: "2", //员工2  审批管理员3
        permission: [], //审批权限分配 一审 二审 三审
      },
      rules: {
        account: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 18, message: "长度在3到18位", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在6到18位", trigger: "blur" },
        ],
        password2: [
          { required: true, validator: validatePass, trigger: "blur" },
          { min: 6, max: 18, message: "长度在6到18位", trigger: "blur" },
        ],
        role_id: [
          { required: true, message: "请选择权限分配", trigger: "change" },
        ],
      },
      options: [
        { value: "one", name: "一审" },
        { value: "two", name: "二审" },
        { value: "end", name: "终审" },
      ],
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.ruleForm['permission'] =  this.ruleForm['permission'].join(',');
          let res = await createPermission(this.ruleForm);
          let { code, msg } = res.data;
          if (code === 20000) {
            this.$notify({
              title: "提交成功",
              message: msg,
              type: "success",
              duration: 2000,
            });
            this.$router.push("/powerManage/userLists");
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
  